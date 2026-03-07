import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

// Reveal Animation Hook
const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// Video Carousel Hook - Exact port of VideoCarousel class
const useVideoCarousel = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const videos = [
      { id: 'phbtoA2suOM' },
      { id: 'bEFE8SfELI8' },
      { id: 'tfzZhOihcC8' }
    ];
    const total = videos.length;

    const config = {
      resolution: 1200,
      autoplayDuration: 6000,
      slideWidth: 83
    };

    const state = {
      current: 0,
      isPlaying: false,
      isAnimating: false,
      isDragging: false,
      progress: 0
    };

    const players: any[] = [];
    let timers: any = {};
    const drag: any = {};

    // ========== RENDER ==========
    const slides = videos.map((v, i) => `
      <div class="carousel__slide ${i === 0 ? 'carousel__slide--active' : i === 1 ? 'carousel__slide--next' : i === total - 1 ? 'carousel__slide--prev' : ''}" data-index="${i}">
        <div class="carousel__video" data-id="${v.id}">
          <div id="player-${i}"></div>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="carousel__viewport">
        <div class="carousel__track">${slides}</div>
      </div>
      <div class="carousel__indicators">
        ${videos.map((_, i) => `<button class="carousel__indicator ${i === 0 ? 'carousel__indicator--active' : ''}" data-index="${i}"></button>`).join('')}
      </div>
      <div class="carousel__progress">
        ${videos.map((_, i) => `<div class="carousel__progress-bar ${i === 0 ? 'carousel__progress-bar--active' : ''}"><div class="carousel__progress-fill"></div></div>`).join('')}
      </div>
      <div class="carousel__status">Cargando...</div>
    `;

    // ========== CACHE ==========
    const el = {
      track: container.querySelector('.carousel__track') as HTMLElement,
      slides: () => container.querySelectorAll('.carousel__slide'),
      indicators: container.querySelectorAll('.carousel__indicator'),
      progressBars: container.querySelectorAll('.carousel__progress-bar'),
      progressFills: container.querySelectorAll('.carousel__progress-fill'),
      status: container.querySelector('.carousel__status') as HTMLElement
    };

    // ========== SET RESOLUTION ==========
    const setResolution = (resolution: number) => {
      config.resolution = resolution;
      container.style.maxWidth = `${resolution}px`;
    };

    // ========== THUMBNAILS ==========
    const loadThumbnails = () => {
      container.querySelectorAll('.carousel__video').forEach((e: any) => {
        e.style.backgroundImage = `url(https://img.youtube.com/vi/${e.dataset.id}/maxresdefault.jpg)`;
      });
    };

    // ========== STATUS ==========
    const setStatus = (text: string, playing: boolean) => {
      el.status.textContent = text;
      el.status.classList.toggle('carousel__status--playing', playing);
    };

    // ========== SLIDE CLASSES ==========
    const updateSlideClasses = () => {
      const { current } = state;
      const prev = (current - 1 + total) % total;
      const next = (current + 1) % total;
      el.slides().forEach((slide: any) => {
        const i = +slide.dataset.index;
        slide.classList.remove('carousel__slide--active', 'carousel__slide--prev', 'carousel__slide--next');
        if (i === current) slide.classList.add('carousel__slide--active');
        else if (i === prev) slide.classList.add('carousel__slide--prev');
        else if (i === next) slide.classList.add('carousel__slide--next');
      });
    };

    // ========== UI UPDATE ==========
    const resetProgress = () => {
      state.progress = 0;
      el.progressFills.forEach((f: any) => f.style.width = '0');
    };

    const updateUI = () => {
      el.indicators.forEach((ind, i) => ind.classList.toggle('carousel__indicator--active', i === state.current));
      el.progressBars.forEach((bar, i) => bar.classList.toggle('carousel__progress-bar--active', i === state.current));
      resetProgress();
    };

    // ========== VIDEO CONTROL ==========
    const pauseInactiveVideos = () => {
      players.forEach((p, i) => i !== state.current && p?.pauseVideo?.());
    };

    // ========== NAVIGATION ==========
    const navigate = (direction: number) => {
      state.isAnimating = true;
      pauseInactiveVideos();
      el.track.classList.add('carousel__track--animating');
      el.track.style.transform = `translateX(${-direction * config.slideWidth}%)`;
      state.current = (state.current + direction + total) % total;
      updateUI();
      if (!state.isPlaying) restartAutoplay();
    };

    const onTransitionEnd = () => {
      if (!state.isAnimating) return;
      const track = el.track;
      const slides = el.slides();
      track.classList.remove('carousel__track--animating');
      track.style.transform.includes('-') ? track.appendChild(slides[0]) : track.prepend(slides[slides.length - 1]);
      track.style.transform = '';
      updateSlideClasses();
      state.isAnimating = false;
    };

    const next = () => {
      if (state.isAnimating) return;
      navigate(1);
    };

    const prev = () => {
      if (state.isAnimating) return;
      navigate(-1);
    };

    const goTo = (targetIndex: number) => {
      if (targetIndex === state.current || state.isAnimating) return;
      const diff = targetIndex - state.current;
      if (Math.abs(diff) > 1) {
        const slides = Array.from(el.slides());
        const target = slides.find((s: any) => +s.dataset.index === targetIndex);
        const current = slides.find((s: any) => +s.dataset.index === state.current);
        if (target && current) {
          diff > 0 ? current.after(target) : current.before(target);
        }
      }
      state.current = targetIndex;
      navigate(diff > 0 ? 1 : -1);
    };

    // ========== AUTOPLAY ==========
    const tick = () => {
      if (state.isPlaying) return;
      state.progress += 100;
      (el.progressFills[state.current] as HTMLElement).style.width = `${(state.progress / config.autoplayDuration) * 100}%`;
      if (state.progress >= config.autoplayDuration) next();
    };

    const startAutoplay = () => {
      if (timers.autoplay || state.isPlaying) return;
      resetProgress();
      timers.progress = setInterval(tick, 100);
      timers.autoplay = true;
      setStatus('Autoplay activo', false);
    };

    const stopAutoplay = () => {
      clearInterval(timers.progress);
      timers = {};
    };

    const restartAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    // ========== YOUTUBE API ==========
    const onPlayerState = (event: any, index: number) => {
      if (index !== state.current) return;
      const YT = (window as any).YT;
      if (event.data === YT.PlayerState.PLAYING) {
        state.isPlaying = true;
        stopAutoplay();
        setStatus('Reproduciendo', true);
      } else if (event.data === YT.PlayerState.PAUSED) {
        state.isPlaying = false;
        startAutoplay();
        setStatus('Pausado — autoplay activo', false);
      } else if (event.data === YT.PlayerState.ENDED) {
        state.isPlaying = false;
        setStatus('Siguiente...', false);
        setTimeout(next, 1000);
      }
    };

    const initPlayers = () => {
      const YT = (window as any).YT;
      videos.forEach((video, i) => {
        players[i] = new YT.Player(`player-${i}`, {
          videoId: video.id,
          playerVars: { rel: 0, modestbranding: 1 },
          events: { onStateChange: (e: any) => onPlayerState(e, i) }
        });
      });
      setTimeout(startAutoplay, 1000);
    };

    const loadYouTubeAPI = () => {
      if ((window as any).YT?.Player) return initPlayers();
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
      (window as any).onYouTubeIframeAPIReady = initPlayers;
    };

    // ========== DRAG ==========
    const dragStart = (e: any) => {
      if (state.isPlaying || state.isAnimating) return;
      state.isDragging = true;
      drag.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      drag.currentX = 0;
      el.track.classList.add('carousel__track--dragging');
      stopAutoplay();
    };

    const dragMove = (e: any) => {
      if (!state.isDragging) return;
      e.preventDefault();
      const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      drag.currentX = ((x - drag.startX) / el.track.parentElement!.offsetWidth) * 100;
      el.track.style.transform = `translateX(${drag.currentX}%)`;
    };

    const dragEnd = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      el.track.classList.remove('carousel__track--dragging');
      if (drag.currentX < -10) next();
      else if (drag.currentX > 10) prev();
      else el.track.style.transform = '';
      if (!state.isPlaying) startAutoplay();
    };

    // ========== BIND EVENTS ==========
    el.indicators.forEach(btn => {
      btn.addEventListener('click', () => goTo(+(btn as HTMLElement).dataset.index!));
    });

    el.track.addEventListener('mousedown', dragStart);
    el.track.addEventListener('mousemove', dragMove);
    el.track.addEventListener('mouseup', dragEnd);
    el.track.addEventListener('mouseleave', dragEnd);
    el.track.addEventListener('touchstart', dragStart, { passive: true });
    el.track.addEventListener('touchmove', dragMove, { passive: false });
    el.track.addEventListener('touchend', dragEnd);
    el.track.addEventListener('transitionend', onTransitionEnd);

    // ========== INIT ==========
    setResolution(1200);
    loadThumbnails();
    loadYouTubeAPI();
    updateSlideClasses();

    return () => stopAutoplay();
  }, [containerRef]);
};

export default function Home(): JSX.Element {
  useReveal();
  const carouselRef = useRef<HTMLDivElement>(null);
  useVideoCarousel(carouselRef);

  return (
    <Layout title="Galidar Studio" description="Professional water simulation plugins for Unreal Engine 5.">
      
      {/* ========== HERO ========== */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Trusted by 10,000+ developers since 2019</span>
          </div>
          <h1 className="hero-title">Create Stunning<br />Water Worlds</h1>
          <p className="hero-subtitle">
            Professional ocean, river, and water simulation plugins for Unreal Engine 5. 
            Production-ready. Multiplayer-compatible. Cinematic quality.
          </p>
          <div className="hero-cta">
            <a href="https://www.fab.com/sellers/Galidar" target="_blank" rel="noopener" className="btn btn-primary">
              🛒 Browse All Products
            </a>
            <Link to="/oceanology-nextgen/" className="btn btn-secondary">
              📖 View Documentation
            </Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <div className="stats-strip reveal">
        <div className="stat-item">
          <div className="stat-value">6K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">7+</div>
          <div className="stat-label">Years of Updates</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">🏆</div>
          <div className="stat-label">Premier UE5 Plugins</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">24/7</div>
          <div className="stat-label">Discord Support</div>
        </div>
      </div>

      {/* ========== BIG ANNOUNCEMENT ========== */}
      <section className="bento-section reveal" style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(6, 182, 212, 0.04) 50%, rgba(251, 191, 36, 0.04) 100%)',
        borderTop: '1px solid rgba(139, 92, 246, 0.25)',
        borderBottom: '1px solid rgba(6, 182, 212, 0.15)',
      }}>
        <div className="section-header">
          <div className="section-label" style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(251, 146, 60, 0.15))',
            borderColor: 'rgba(251, 191, 36, 0.5)',
            color: '#fbbf24',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}>
            🚀 Big Announcement
          </div>
          <h2 className="section-title">The Future of Water Simulation Is Almost Here</h2>
          <p className="section-desc" style={{ maxWidth: '680px' }}>
            After years of community feedback and development, we're completely restructuring our product lineup.
            New names, a unified architecture, and features that redefine what's possible — coming soon.
          </p>
        </div>

        {/* Product transformation grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem',
          maxWidth: '1100px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>

          {/* Legacy → Lite */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.05)',
            border: '2px solid rgba(6, 182, 212, 0.35)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1.25rem',
            position: 'relative' as const,
            transition: 'border-color 0.3s, transform 0.3s',
          }}>
            <div style={{
              position: 'absolute' as const,
              top: '-0.75rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--cyan), #0891b2)',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.3rem 1rem',
              borderRadius: '20px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
            }}>
              NEW 6.0
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.5, marginBottom: '0.5rem' }}>
                Oceanology Legacy
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--cyan)' }}>Oceanology Lite</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, flex: 1 }}>
              Ocean + Lakes with optimized Gerstner waves. The performance champion — wide hardware support and broad compatibility.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'rgba(6, 182, 212, 0.85)', padding: '0.65rem 1rem', background: 'rgba(6, 182, 212, 0.08)', borderRadius: '10px', borderLeft: '3px solid rgba(6, 182, 212, 0.4)' }}>
              Existing customers get automatic update
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
              <span className="tag tag-cyan">GTX 1080+</span>
              <span className="tag tag-emerald">Performance</span>
            </div>
          </div>

          {/* NextGen → Pro (highlighted) */}
          <div style={{
            background: 'rgba(139, 92, 246, 0.07)',
            border: '2px solid rgba(139, 92, 246, 0.35)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1.25rem',
            position: 'relative' as const,
            transition: 'border-color 0.3s, transform 0.3s',
          }}>
            <div style={{
              position: 'absolute' as const,
              top: '-0.75rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--violet), var(--fuchsia))',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.3rem 1rem',
              borderRadius: '20px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
            }}>
              NEW 2.0
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.5, marginBottom: '0.5rem' }}>
                Oceanology NextGen
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--violet)' }}>Oceanology Pro</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, flex: 1 }}>
              The complete water package. Ocean + Lakes + <strong>Rivers</strong> + Breaking Waves. Three wave modes: Gerstner, Spectral, and FFT.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'rgba(139, 92, 246, 0.85)', padding: '0.65rem 1rem', background: 'rgba(139, 92, 246, 0.08)', borderRadius: '10px', borderLeft: '3px solid rgba(139, 92, 246, 0.4)' }}>
              Free upgrade for all NextGen customers
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
              <span className="tag tag-violet">RTX 3080+</span>
              <span className="tag tag-fuchsia">All Waves</span>
              <span className="tag tag-cyan">Rivers</span>
            </div>
          </div>

          {/* Riverology 3.0 */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.05)',
            border: '2px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1.25rem',
            position: 'relative' as const,
            transition: 'border-color 0.3s, transform 0.3s',
          }}>
            <div style={{
              position: 'absolute' as const,
              top: '-0.75rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--emerald), #047857)',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.3rem 1rem',
              borderRadius: '20px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
            }}>
              NEW 3.0
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--emerald)' }}>Riverology</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65, flex: 1 }}>
              Rivers + Lakes with <strong>exclusive features</strong> not in Pro. The definitive river solution, now on the unified architecture.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'rgba(16, 185, 129, 0.85)', padding: '0.65rem 1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px', borderLeft: '3px solid rgba(16, 185, 129, 0.4)' }}>
              Existing customers get architecture benefits
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
              <span className="tag tag-emerald">Exclusive</span>
              <span className="tag tag-violet">River Focus</span>
            </div>
          </div>
        </div>

        {/* Key announcement highlights — 2x2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div className="feature-card fuchsia">
            <div className="product-icon fuchsia">🎛️</div>
            <div>
              <h4 className="feature-card-title">Multi-Wave System</h4>
              <p className="feature-card-desc">Choose Gerstner, Spectral Gerstner, or FFT per water body — all in the same project.</p>
            </div>
          </div>
          <div className="feature-card violet">
            <div className="product-icon violet">🔄</div>
            <div>
              <h4 className="feature-card-title">Synchronized Updates</h4>
              <p className="feature-card-desc">Unified codebase — every fix and improvement reaches Lite and Pro at the same time.</p>
            </div>
          </div>
          <div className="feature-card cyan">
            <div className="product-icon cyan">🗳️</div>
            <div>
              <h4 className="feature-card-title">You Choose the Sales</h4>
              <p className="feature-card-desc">Vote in Discord polls to decide which product gets the next FAB Store discount.</p>
            </div>
          </div>
          <div className="feature-card emerald">
            <div className="product-icon emerald">🎁</div>
            <div>
              <h4 className="feature-card-title">No Re-Purchase Needed</h4>
              <p className="feature-card-desc">All existing customers receive their product's upgrade automatically. You're covered.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link to="/roadmap/product-rebranding-announcement" className="btn btn-primary">
            📋 Read the Full Announcement
          </Link>
          <a href="https://discord.gg/VHJGBDR2as" target="_blank" rel="noopener" className="btn btn-secondary">
            💬 Join the Conversation
          </a>
        </div>
      </section>

      {/* ========== WATER PLUGINS ========== */}
      <section className="bento-section reveal">
        <div className="section-header">
          <div className="section-label">Current Products</div>
          <h2 className="section-title">Available Now on FAB</h2>
          <p className="section-desc">Production-ready water systems trusted by developers worldwide. Evolving into Pro, Lite & Riverology soon.</p>
        </div>

        <div className="products-grid">
          {/* Oceanology NextGen */}
          <div className="product-card violet">
            <img className="product-card-bg" src={useBaseUrl("/img/landing/oceanology-nextgen.png")} alt="" />
            <div className="product-card-overlay"></div>
            <div className="product-card-content">
              <div className="product-icon violet">🌊</div>
              <h3 className="product-card-title">Oceanology NextGen</h3>
              <p className="product-card-desc">
                The ultimate ocean simulation. Hybrid FFT + Gerstner waves, coastline physics, and cinematic underwater effects.
              </p>
              <div className="product-tags">
                <span className="tag tag-violet">UE5</span>
                <span className="tag tag-cyan">Multiplayer</span>
                <span className="tag tag-fuchsia">Cinematics</span>
              </div>
              <div className="product-card-actions">
                <a href="https://www.fab.com/listings/87c9af41-62b7-4e70-98e3-fc72eff016ab" target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                  Get on Fab
                </a>
                <Link to="/oceanology-nextgen/" className="btn btn-secondary btn-sm">
                  Docs
                </Link>
              </div>
            </div>
          </div>

          {/* Oceanology Legacy */}
          <div className="product-card cyan">
            <img className="product-card-bg" src={useBaseUrl("/img/landing/oceanology-legacy.png")} alt="" />
            <div className="product-card-overlay"></div>
            <div className="product-card-content">
              <div className="product-icon cyan">⚡</div>
              <h3 className="product-card-title">Oceanology Legacy</h3>
              <p className="product-card-desc">
                Optimized ocean for games. Proven Gerstner waves with excellent performance on mid-range GPUs.
              </p>
              <div className="product-tags">
                <span className="tag tag-cyan">UE5</span>
                <span className="tag tag-emerald">Optimized</span>
                <span className="tag tag-orange">Game Ready</span>
              </div>
              <div className="product-card-actions">
                <a href="https://www.fab.com/listings/1cd1f62e-0fa3-48bf-bc60-f0e06010fce3" target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                  Get on Fab
                </a>
                <Link to="/oceanology-legacy/" className="btn btn-secondary btn-sm">
                  Docs
                </Link>
              </div>
            </div>
          </div>

          {/* Riverology */}
          <div className="product-card emerald">
            <img className="product-card-bg" src={useBaseUrl("/img/landing/riverology.png")} alt="" />
            <div className="product-card-overlay"></div>
            <div className="product-card-content">
              <div className="product-icon emerald">🏞️</div>
              <h3 className="product-card-title">Riverology</h3>
              <p className="product-card-desc">
                Spline-based river generation with flow physics, buoyancy, and real-time shallow water effects.
              </p>
              <div className="product-tags">
                <span className="tag tag-emerald">UE5</span>
                <span className="tag tag-violet">Splines</span>
                <span className="tag tag-cyan">Open World</span>
              </div>
              <div className="product-card-actions">
                <a href="https://www.fab.com/listings/36933ae4-eb48-4395-951b-6357e0ff2c17" target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                  Get on Fab
                </a>
                <Link to="/riverology/" className="btn btn-secondary btn-sm">
                  Docs
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Water Plugins Feature Cards */}
        <div className="features-grid">
          <div className="feature-card fuchsia">
            <div className="product-icon fuchsia">🎮</div>
            <div>
              <h4 className="feature-card-title">Multiplayer Ready</h4>
              <p className="feature-card-desc">Fully replicated water interactions, buoyancy, and swimming for online games.</p>
            </div>
          </div>
          <div className="feature-card orange">
            <div className="product-icon orange">🎬</div>
            <div>
              <h4 className="feature-card-title">Cinematic Quality</h4>
              <p className="feature-card-desc">Movie-grade underwater effects, caustics, and volumetric lighting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ENVIRONMENT PACKS ========== */}
      <section className="bento-section reveal">
        <div className="section-header">
          <div className="section-label" style={{background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(251, 191, 36, 0.2))', borderColor: 'rgba(251, 146, 60, 0.4)', color: 'var(--orange)'}}>
            Environment Packs
          </div>
          <h2 className="section-title">Complete Worlds</h2>
          <p className="section-desc">Ready-to-use environments that complement your water systems.</p>
        </div>

        <div className="products-grid" style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
          {/* Cretaceous */}
          <div className="product-card orange">
            <img className="product-card-bg" src={useBaseUrl("/img/landing/cretaceous.png")} alt="" />
            <div className="product-card-overlay"></div>
            <div className="product-card-content">
              <div className="product-icon orange">🌲</div>
              <h3 className="product-card-title">Cretaceous</h3>
              <p className="product-card-desc">
                Majestic redwood forests with lush undergrowth. Photogrammetry assets optimized for UE5 open worlds.
              </p>
              <div className="product-tags">
                <span className="tag tag-orange">UE5</span>
                <span className="tag tag-emerald">Photogrammetry</span>
                <span className="tag tag-violet">Open World</span>
              </div>
              <div className="product-card-actions">
                <a href="https://www.fab.com/listings/79a9eff3-e874-42dc-a11f-f1f4f4555d9a" target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                  Get on Fab
                </a>
              </div>
            </div>
          </div>

          {/* Forest Blizzard */}
          <div className="product-card cyan">
            <img className="product-card-bg" src={useBaseUrl("/img/landing/forest-blizzard.png")} alt="" />
            <div className="product-card-overlay"></div>
            <div className="product-card-content">
              <div className="product-icon cyan">❄️</div>
              <h3 className="product-card-title">Forest Blizzard</h3>
              <p className="product-card-desc">
                Photoreal Aleppo pine forests with World Partition support and dynamic snow generation.
              </p>
              <div className="product-tags">
                <span className="tag tag-cyan">UE5</span>
                <span className="tag tag-fuchsia">World Partition</span>
                <span className="tag tag-violet">Dynamic Snow</span>
              </div>
              <div className="product-card-actions">
                <a href="https://www.fab.com/listings/e8f0438b-4c2e-41a7-817e-14402f2b2b04" target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                  Get on Fab
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Environment Packs Feature Cards */}
        <div className="features-grid">
          <div className="feature-card emerald">
            <div className="product-icon emerald">📸</div>
            <div>
              <h4 className="feature-card-title">Photogrammetry Assets</h4>
              <p className="feature-card-desc">Ultra-realistic 3D scanned vegetation and terrain for AAA-quality environments.</p>
            </div>
          </div>
          <div className="feature-card violet">
            <div className="product-icon violet">🗺️</div>
            <div>
              <h4 className="feature-card-title">World Partition Ready</h4>
              <p className="feature-card-desc">Optimized for massive open worlds with streaming and level instancing support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WAVE FORGE STUDIO ========== */}
      <section className="bento-section reveal">
        <div className="section-header">
          <div className="section-label" style={{background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))', borderColor: 'rgba(139, 92, 246, 0.4)', color: 'var(--violet)'}}>
            🆕 New Tool
          </div>
          <h2 className="section-title">Wave Forge Studio</h2>
          <p className="section-desc">Professional breaking wave profile editor for Oceanology Pro 2.0 and compatible plugins.</p>
        </div>

        <div className="wave-forge-showcase">
          <div className="wave-forge-content">
            <div className="wave-forge-badge">Coming Soon</div>
            <h3 className="wave-forge-title">Create Custom Breaking Waves</h3>
            <p className="wave-forge-desc">
              Design physics-accurate surf wave animations with our WebGPU-powered spline editor. 
              Export directly to Unreal Engine for use in games, cinematics, architectural visualization, and more.
            </p>
            
            <div className="wave-forge-features">
              <div className="wave-forge-feature">
                <span className="wave-forge-feature-icon">🌊</span>
                <div>
                  <strong>21-Spline System</strong>
                  <span>Complete wave lifecycle from swell to wash</span>
                </div>
              </div>
              <div className="wave-forge-feature">
                <span className="wave-forge-feature-icon">🎬</span>
                <div>
                  <strong>Real-Time Preview</strong>
                  <span>Instant 3D visualization with WebGPU rendering</span>
                </div>
              </div>
              <div className="wave-forge-feature">
                <span className="wave-forge-feature-icon">📤</span>
                <div>
                  <strong>Multiple Export Formats</strong>
                  <span>16-bit HDR textures, HLSL, LUA, JSON, C++</span>
                </div>
              </div>
              <div className="wave-forge-feature">
                <span className="wave-forge-feature-icon">🎮</span>
                <div>
                  <strong>Commercial License</strong>
                  <span>Use in games, films, architecture & more</span>
                </div>
              </div>
            </div>

            <div className="wave-forge-pricing">
              <span className="wave-forge-pricing-label">Subscription-based access</span>
              <span className="wave-forge-pricing-note">Create unlimited wave profiles for your projects</span>
            </div>

            <div className="wave-forge-actions">
              <a href="https://waveforgestudio.galidarreset.workers.dev" target="_blank" rel="noopener" className="btn btn-primary btn-lg">
                🚀 Launch Wave Forge Studio
              </a>
              <Link to="/roadmap/wave-forge-studio-announcement" className="btn btn-secondary">
                📖 Learn More
              </Link>
            </div>
          </div>
          <div className="wave-forge-preview">
            <img src={useBaseUrl("/img/landing/wave-forge-studio.png")} alt="Wave Forge Studio Interface" />
            <div className="wave-forge-preview-overlay">
              <span>WebGPU • 16-bit HDR • Real-Time</span>
            </div>
          </div>
        </div>

        {/* Wave Forge Feature Cards */}
        <div className="features-grid">
          <div className="feature-card violet">
            <div className="product-icon violet">🔧</div>
            <div>
              <h4 className="feature-card-title">Oceanology Pro 2.0 Compatible</h4>
              <p className="feature-card-desc">Seamlessly integrates with Oceanology Pro breaking wave system.</p>
            </div>
          </div>
          <div className="feature-card cyan">
            <div className="product-icon cyan">🌐</div>
            <div>
              <h4 className="feature-card-title">Browser-Based</h4>
              <p className="feature-card-desc">No installation required. Works on any modern browser with WebGPU support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VIDEOS ========== */}
      <section className="bento-section reveal">
        <div className="section-header">
          <div className="section-label" style={{background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.2), rgba(244, 114, 182, 0.2))', borderColor: 'rgba(251, 113, 133, 0.4)', color: 'var(--rose)'}}>
            Showcase
          </div>
          <h2 className="section-title">See It In Action</h2>
          <p className="section-desc">Watch trailers and tutorials showcasing our plugins.</p>
        </div>
      </section>
      
      {/* Video Carousel - Full Width */}
      <section className="video-section">
        <div className="video-carousel" id="videoCarousel" ref={carouselRef}></div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section reveal">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Create Amazing Water?</h2>
          <p className="section-desc" style={{maxWidth: '500px', margin: '0 auto'}}>
            Join thousands of developers. Get started with our documentation or join our Discord community.
          </p>
          <div className="cta-buttons">
            <Link to="/oceanology-nextgen/" className="btn btn-primary">📖 Documentation</Link>
            <a href="https://discord.gg/VHJGBDR2as" target="_blank" rel="noopener" className="btn btn-secondary">💬 Join Discord</a>
            <Link to="/linked-roles" className="btn btn-secondary">✓ Verify Purchase</Link>
            <Link to="/showcase" className="btn btn-secondary">🎨 Showcase</Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
