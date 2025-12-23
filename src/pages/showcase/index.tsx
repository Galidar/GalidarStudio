import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { SHOWCASE, ShowcaseItem } from '@site/src/data/showcase';
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

// Tag color mapping
const getTagColor = (tag: string): string => {
  const colors: Record<string, string> = {
    plugin: 'violet',
    environment: 'orange',
    ocean: 'cyan',
    river: 'emerald',
    fab: 'fuchsia',
  };
  return colors[tag] || 'violet';
};

// Product Card Component
function ProductCard({ item, accentColor }: { item: ShowcaseItem; accentColor: string }) {
  return (
    <div className={`product-card ${accentColor}`}>
      <img className="product-card-bg" src={useBaseUrl(item.image)} alt="" />
      <div className="product-card-overlay"></div>
      <div className="product-card-content">
        <h3 className="product-card-title">{item.title}</h3>
        <p className="product-card-desc">{item.description}</p>
        {item.tags && (
          <div className="product-tags">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={`tag tag-${getTagColor(tag)}`}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        )}
        <div className="product-card-actions">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            🛒 Get on Fab
          </a>
          {item.docsPath && (
            <Link to={item.docsPath} className="btn btn-secondary btn-sm">
              📖 Docs
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Showcase(): JSX.Element {
  useReveal();

  const plugins = SHOWCASE.filter((i) => i.tags?.includes('plugin'));
  const environments = SHOWCASE.filter((i) => i.tags?.includes('environment'));

  // Assign accent colors to plugins
  const pluginColors = ['violet', 'cyan', 'emerald'];
  // Assign accent colors to environments
  const envColors = ['orange', 'cyan'];

  return (
    <Layout title="Showcase" description="Plugins and environment packs by Galidar Studio">
      
      {/* ========== HERO ========== */}
      <section className="showcase-hero">
        <div className="showcase-hero-content">
          <div className="hero-badge">
            <span>Unreal Engine 5 Products</span>
          </div>
          <h1 className="showcase-hero-title">Our Products</h1>
          <p className="showcase-hero-subtitle">
            Explore our collection of professional water simulation plugins and 
            photogrammetry environment packs for Unreal Engine 5.
          </p>
        </div>
      </section>

      {/* ========== PLUGINS SECTION ========== */}
      <section className="bento-section reveal">
        <div className="section-header">
          <div
            className="section-label"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(232, 121, 249, 0.2))',
              borderColor: 'rgba(139, 92, 246, 0.4)',
              color: 'var(--violet)',
            }}
          >
            Water Simulation
          </div>
          <h2 className="section-title">Plugins</h2>
          <p className="section-desc">
            Professional ocean and river systems with advanced physics, multiplayer support, and cinematic quality.
          </p>
        </div>

        <div className="products-grid">
          {plugins.map((item, index) => (
            <ProductCard
              key={item.title}
              item={item}
              accentColor={pluginColors[index % pluginColors.length]}
            />
          ))}
        </div>
      </section>

      {/* ========== ENVIRONMENTS SECTION ========== */}
      <section className="bento-section reveal">
        <div className="section-header">
          <div
            className="section-label"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(251, 191, 36, 0.2))',
              borderColor: 'rgba(251, 146, 60, 0.4)',
              color: 'var(--orange)',
            }}
          >
            Environment Packs
          </div>
          <h2 className="section-title">Complete Worlds</h2>
          <p className="section-desc">
            Ready-to-use photogrammetry environments optimized for open worlds and cinematic projects.
          </p>
        </div>

        <div className="products-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {environments.map((item, index) => (
            <ProductCard
              key={item.title}
              item={item}
              accentColor={envColors[index % envColors.length]}
            />
          ))}
        </div>
      </section>

      {/* ========== COMMUNITY CTA ========== */}
      <section className="showcase-cta reveal">
        <div className="showcase-cta-card">
          <div className="showcase-cta-icon">🎨</div>
          <h3 className="showcase-cta-title">Made Something Amazing?</h3>
          <p className="showcase-cta-desc">
            If you've built a project using our tools, we'd love to feature it here! 
            Open a PR and add your showcase to <code>src/data/showcase.ts</code>.
          </p>
          <div className="showcase-cta-buttons">
            <a
              href="https://github.com/Galidar/GalidarStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Submit Your Project
            </a>
            <a
              href="https://discord.gg/VHJGBDR2as"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              💬 Join Discord
            </a>
          </div>
        </div>
      </section>

    </Layout>
  );
}
