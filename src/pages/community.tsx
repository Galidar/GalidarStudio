import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

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

// Community Link Card
function CommunityCard({
  icon,
  title,
  description,
  href,
  isExternal = false,
  accentColor = 'violet',
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
  accentColor?: string;
}) {
  const content = (
    <div className={`community-card ${accentColor}`}>
      <div className="community-card-icon">{icon}</div>
      <h3 className="community-card-title">{title}</h3>
      <p className="community-card-desc">{description}</p>
      <span className="community-card-arrow">→</span>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="community-card-link">
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className="community-card-link">
      {content}
    </Link>
  );
}

// Stats Component
function CommunityStats() {
  return (
    <div className="community-stats">
      <div className="community-stat">
        <span className="community-stat-value">6,000+</span>
        <span className="community-stat-label">Discord Members</span>
      </div>
      <div className="community-stat">
        <span className="community-stat-value">10,000+</span>
        <span className="community-stat-label">Plugin Users</span>
      </div>
      <div className="community-stat">
        <span className="community-stat-value">24/7</span>
        <span className="community-stat-label">Community Support</span>
      </div>
    </div>
  );
}

export default function Community(): JSX.Element {
  useReveal();

  return (
    <Layout title="Community" description="Join the Galidar Studio community">
      
      {/* ========== HERO ========== */}
      <section className="community-hero">
        <div className="community-hero-content">
          <div className="hero-badge">
            <span>Join Our Community</span>
          </div>
          <h1 className="community-hero-title">
            Connect with <span className="gradient-text">Developers</span>
          </h1>
          <p className="community-hero-subtitle">
            Join thousands of game developers using Oceanology and Riverology. 
            Get help, share your projects, and stay updated on the latest features.
          </p>
          <CommunityStats />
        </div>
      </section>

      {/* ========== COMMUNITY LINKS ========== */}
      <section className="community-section reveal">
        <div className="section-header">
          <h2 className="section-title">Get Connected</h2>
          <p className="section-desc">
            Multiple ways to engage with our community and get the support you need.
          </p>
        </div>

        <div className="community-grid">
          <CommunityCard
            icon="💬"
            title="Discord Server"
            description="Join our official Discord for real-time help, showcases, and announcements."
            href="https://discord.gg/VHJGBDR2as"
            isExternal
            accentColor="violet"
          />
          <CommunityCard
            icon="🔗"
            title="Linked Roles"
            description="Verify your Epic Games account to unlock exclusive channels and priority support."
            href="/linked-roles"
            accentColor="cyan"
          />
          <CommunityCard
            icon="📖"
            title="Documentation"
            description="Comprehensive guides for setup, features, and troubleshooting all plugins."
            href="/oceanology-nextgen/"
            accentColor="emerald"
          />
          <CommunityCard
            icon="🛒"
            title="FAB Store"
            description="Browse and purchase our plugins directly from the Epic Games FAB marketplace."
            href="https://www.fab.com/sellers/galidar"
            isExternal
            accentColor="orange"
          />
          <CommunityCard
            icon="🎥"
            title="Showcase"
            description="See amazing projects built with our water simulation systems."
            href="/showcase"
            accentColor="fuchsia"
          />
          <CommunityCard
            icon="❓"
            title="FAQ"
            description="Quick answers to common questions about installation, compatibility, and features."
            href="/faq"
            accentColor="cyan"
          />
        </div>
      </section>

      {/* ========== DISCORD WIDGET ========== */}
      <section className="community-discord reveal">
        <div className="discord-container">
          <div className="discord-info">
            <div className="discord-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <h3 className="discord-title">Join Our Discord</h3>
            <p className="discord-desc">
              Connect with fellow developers, get real-time support, share your projects, 
              and stay updated on the latest releases and features.
            </p>
            <a
              href="https://discord.gg/VHJGBDR2as"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Join Discord Server
            </a>
          </div>
          <div className="discord-widget">
            <iframe
              src="https://discord.com/widget?id=654364478493687819&theme=dark"
              width="350"
              height="450"
              allowTransparency={true}
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              title="Discord Widget"
            />
          </div>
        </div>
      </section>

      {/* ========== DOCUMENTATION CTA ========== */}
      <section className="community-docs reveal">
        <div className="section-header">
          <h2 className="section-title">Explore Documentation</h2>
          <p className="section-desc">
            Comprehensive guides for all our water simulation plugins.
          </p>
        </div>

        <div className="docs-grid">
          <Link to="/oceanology-nextgen/" className="docs-card violet">
            <div className="docs-card-icon">🌊</div>
            <h4>Oceanology NextGen</h4>
            <p>Advanced FFT waves, coastlines, and C++ quadtree tessellation.</p>
          </Link>
          <Link to="/oceanology-legacy/" className="docs-card cyan">
            <div className="docs-card-icon">🌀</div>
            <h4>Oceanology Legacy</h4>
            <p>Optimized Gerstner waves for mid-range GPUs.</p>
          </Link>
          <Link to="/riverology/" className="docs-card emerald">
            <div className="docs-card-icon">🏞️</div>
            <h4>Riverology</h4>
            <p>Spline-based rivers with flow physics and buoyancy.</p>
          </Link>
        </div>
      </section>

    </Layout>
  );
}
