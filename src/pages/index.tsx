import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

const FabLink = ({ href, label }: { href: string; label: string }) => (
  <Link className="button button--secondary button--lg" href={href} target="_blank" rel="noopener">
    {label}
  </Link>
);

const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('is-visible', e.isIntersecting));
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

export default function Home(): JSX.Element {
  useReveal();
  return (
    <Layout title="Galidar Studio" description="Ocean and river simulation plugins for Unreal Engine — plus cinematic environment packs.">
      <header className="landing-hero">
        <div className="container">
          <h1 className="hero-title">Build Immersive Worlds</h1>
          <p className="hero-subtitle">Water simulation plugins and environment packs for Unreal Engine 5.</p>
          <div className="landing-cta">
            <FabLink href="https://www.fab.com/listings/87c9af41-62b7-4e70-98e3-fc72eff016ab" label="Get Oceanology NextGen" />
            <FabLink href="https://www.fab.com/listings/1cd1f62e-0fa3-48bf-bc60-f0e06010fce3" label="Get Oceanology Legacy" />
            <FabLink href="https://www.fab.com/listings/36933ae4-eb48-4395-951b-6357e0ff2c17" label="Get Riverology" />
            <Link className="button button--info button--lg" to="/showcase">Explore Showcase</Link>
          </div>
          <div className="wave-divider" aria-hidden="true">
            <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
              <path d="M0,30 C150,60 300,0 450,30 C600,60 750,0 900,30 C1050,60 1200,0 1350,30 L1350,60 L0,60 Z" fill="currentColor" opacity="0.08"></path>
            </svg>
          </div>
        </div>
      </header>

      <main>
        <section className="container margin-vert--lg reveal">
          <h2 className="section-title">Plugins</h2>
          <p className="section-sub">Production‑ready water simulation tools for Unreal Engine.</p>
          <div className="grid cols-3">
            <div className="card-elev">
              <img className="img" src={useBaseUrl("/img/landing/oceanology-nextgen.jpg")} alt="Oceanology NextGen ocean at sunset" />
              <div className="card-body">
                <h3 className="card-title">Oceanology NextGen</h3>
                <p className="card-desc">Hybrid spectral waves (FFT+Gerstner), coastline & shallow water simulation, and C++ quadtree tessellation for open worlds.</p>
                <div>
                  <span className="badge">UE5</span>
                  <span className="badge">Multiplayer</span>
                  <span className="badge">Cinematics</span>
                </div>
                <div style={{marginTop:'.75rem'}}>
                  <a className="button button--primary button--sm" href="https://www.fab.com/listings/87c9af41-62b7-4e70-98e3-fc72eff016ab" target="_blank" rel="noopener">Fab listing</a>
                  <Link className="button button--outline button--sm" to="/oceanology-nextgen/">Docs</Link>
                </div>
              </div>
            </div>
            <div className="card-elev">
              <img className="img" src={useBaseUrl("/img/landing/oceanology-legacy.jpg")} alt="Oceanology Legacy ship at dusk" />
              <div className="card-body">
                <h3 className="card-title">Oceanology Legacy</h3>
                <p className="card-desc">Stable, game‑focused ocean built for performance on mid‑range GPUs with proven Gerstner‑based waves.</p>
                <div><span className="badge">UE5</span><span className="badge">Game Ready</span></div>
                <div style={{marginTop:'.75rem'}}>
                  <a className="button button--primary button--sm" href="https://www.fab.com/listings/1cd1f62e-0fa3-48bf-bc60-f0e06010fce3" target="_blank" rel="noopener">Fab listing</a>
                  <Link className="button button--outline button--sm" to="/oceanology-legacy/">Docs</Link>
                </div>
              </div>
            </div>
            <div className="card-elev">
              <img className="img" src={useBaseUrl("/img/landing/riverology.jpg")} alt="Riverology mountain river" />
              <div className="card-body">
                <h3 className="card-title">Riverology</h3>
                <p className="card-desc">Spline‑based river generation with flow physics, buoyancy, and real‑time shallow water effects for open worlds.</p>
                <div><span className="badge">UE5</span><span className="badge">Open World</span></div>
                <div style={{marginTop:'.75rem'}}>
                  <a className="button button--primary button--sm" href="https://www.fab.com/listings/36933ae4-eb48-4395-951b-6357e0ff2c17" target="_blank" rel="noopener">Fab listing</a>
                  <Link className="button button--outline button--sm" to="/riverology/">Docs</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container margin-vert--lg reveal">
          <h2 className="section-title">Environment Packs</h2>
          <p className="section-sub">Ready‑to‑use worlds to complement our water stack.</p>
          <div className="grid cols-3">
            <div className="card-elev">
              <img className="img" src={useBaseUrl("/img/landing/cretaceous.jpg")} alt="Cretaceous redwood forest scene" />
              <div className="card-body">
                <h3 className="card-title">Cretaceous</h3>
                <p className="card-desc">Majestic redwoods and lush undergrowth — photogrammetry assets tuned for UE5 open worlds. (Dinosaur not included.)</p>
                <a className="button button--primary button--sm" href="https://www.fab.com/listings/79a9eff3-e874-42dc-a11f-f1f4f4555d9a" target="_blank" rel="noopener">Fab listing</a>
              </div>
            </div>
            <div className="card-elev">
              <img className="img" src={useBaseUrl("/img/landing/forest-blizzard.jpg")} alt="Forest Blizzard snowy valley" />
              <div className="card-body">
                <h3 className="card-title">Forest Blizzard</h3>
                <p className="card-desc">Photoreal Aleppo pine forests with World Partition and a snow generator for cinematic winter vistas.</p>
                <a className="button button--primary button--sm" href="https://www.fab.com/listings/e8f0438b-4c2e-41a7-817e-14402f2b2b04" target="_blank" rel="noopener">Fab listing</a>
              </div>
            </div>
            <div className="card-elev">
              <div className="card-body" style={{display:'flex',flexDirection:'column',justifyContent:'center',minHeight:'100%'}}>
                <h3 className="card-title">More coming soon</h3>
                <p className="card-desc">Follow the channel for new worlds, tips, and devlogs.</p>
                <a className="button button--outline button--sm" href="https://www.youtube.com/@developergalidar" target="_blank" rel="noopener">YouTube channel</a>
              </div>
            </div>
          </div>
        </section>

        <section className="container margin-vert--lg reveal">
          <h2 className="section-title">Featured videos</h2>
          <p className="section-sub">Trailers and shorts.</p>
          <div className="grid cols-3">
            <div className="video-frame">
              <iframe src="https://www.youtube.com/embed/phbtoA2suOM" title="Oceanology Legacy Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="video-frame">
              <iframe src="https://www.youtube.com/embed/tfzZhOihcC8" title="Riverology Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="video-frame">
              <iframe src="https://www.youtube.com/embed/7TjIL29c3vo" title="Oceanology NextGen – Short" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="video-frame">
              <iframe src="https://www.youtube.com/embed/bEFE8SfELI8" title="Forest Blizzard Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </section>

        <section className="container margin-vert--lg reveal">
          <h2 className="section-title">Get started</h2>
          <p className="section-sub">Read the docs, join Discord, and verify your Epic account to unlock support.</p>
          <div className="landing-cta" style={{justifyContent:'flex-start'}}>
            <Link className="button button--primary" to="/oceanology-nextgen/">NextGen Docs</Link>
            <Link className="button button--primary" to="/oceanology-legacy/">Legacy Docs</Link>
            <Link className="button button--primary" to="/riverology/">Riverology Docs</Link>
            <Link className="button button--secondary" to="/linked-roles">Linked Roles</Link>
            <a className="button button--secondary" href="https://discord.gg/VHJGBDR2as" target="_blank" rel="noopener">Join Discord</a>
          </div>
        </section>
      </main>
    </Layout>
  );
}