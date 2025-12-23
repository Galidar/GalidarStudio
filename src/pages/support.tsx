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

// Support Option Card
function SupportOption({
  icon,
  title,
  description,
  features,
  buttonText,
  buttonHref,
  isExternal = false,
  accentColor = 'violet',
  recommended = false,
}: {
  icon: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  isExternal?: boolean;
  accentColor?: string;
  recommended?: boolean;
}) {
  return (
    <div className={`support-option ${accentColor} ${recommended ? 'recommended' : ''}`}>
      {recommended && <div className="recommended-badge">Recommended</div>}
      <div className="support-option-icon">{icon}</div>
      <h3 className="support-option-title">{title}</h3>
      <p className="support-option-desc">{description}</p>
      <ul className="support-option-features">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      {isExternal ? (
        <a
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {buttonText}
        </a>
      ) : (
        <Link to={buttonHref} className="btn btn-primary">
          {buttonText}
        </Link>
      )}
    </div>
  );
}

// Checklist Item
function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="checklist-item">
      <span className="checklist-check">✓</span>
      <span>{children}</span>
    </div>
  );
}

export default function Support(): JSX.Element {
  useReveal();

  return (
    <Layout
      title="Support"
      description="Get help with Oceanology, Riverology, and other Galidar Studio plugins."
    >
      {/* ========== HERO ========== */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span>We're Here to Help</span>
          </div>
          <h1 className="page-hero-title">
            <span className="gradient-text">Support</span> Center
          </h1>
          <p className="page-hero-subtitle">
            Choose the support option that fits your needs. We're committed to helping you 
            create amazing water simulations.
          </p>
        </div>
      </section>

      {/* ========== SUPPORT OPTIONS ========== */}
      <section className="content-section reveal">
        <div className="support-options-grid">
          <SupportOption
            icon="🔍"
            title="Self-Service"
            description="Find answers instantly using our documentation and search."
            features={[
              'Search docs (Cmd/Ctrl + K)',
              'Browse setup guides',
              'Check the FAQ',
              'Read release notes',
            ]}
            buttonText="Browse Documentation"
            buttonHref="/oceanology-nextgen/"
            accentColor="cyan"
          />

          <SupportOption
            icon="💬"
            title="Community Support"
            description="Get help from our active Discord community and team."
            features={[
              'Real-time chat support',
              'Community knowledge',
              '24/7 availability',
              'Screenshots & screen sharing',
            ]}
            buttonText="Join Discord"
            buttonHref="https://discord.gg/VHJGBDR2as"
            isExternal
            accentColor="violet"
            recommended
          />

          <SupportOption
            icon="🎫"
            title="Ticket Support"
            description="Open a private ticket for complex issues or sensitive data."
            features={[
              'Private communication',
              'File attachments',
              'Issue tracking',
              'Priority for verified members',
            ]}
            buttonText="Open Ticket on Discord"
            buttonHref="https://discord.gg/VHJGBDR2as"
            isExternal
            accentColor="emerald"
          />
        </div>
      </section>

      {/* ========== BEFORE OPENING TICKET ========== */}
      <section className="content-section reveal">
        <div className="section-header">
          <h2 className="section-title">Before Opening a Ticket</h2>
          <p className="section-desc">
            Please prepare the following information to help us resolve your issue faster.
          </p>
        </div>

        <div className="checklist-card">
          <div className="checklist-grid">
            <div className="checklist-column">
              <h4>Required Information</h4>
              <ChecklistItem>
                <strong>Plugin name</strong> — Which product are you using?
              </ChecklistItem>
              <ChecklistItem>
                <strong>Plugin version</strong> — Check in Plugins menu
              </ChecklistItem>
              <ChecklistItem>
                <strong>Unreal Engine version</strong> — e.g., 5.3.2
              </ChecklistItem>
              <ChecklistItem>
                <strong>Steps to reproduce</strong> — What triggers the issue?
              </ChecklistItem>
            </div>
            <div className="checklist-column">
              <h4>Helpful Extras</h4>
              <ChecklistItem>
                <strong>Screenshots</strong> — Visual context helps
              </ChecklistItem>
              <ChecklistItem>
                <strong>Error logs</strong> — Output Log contents
              </ChecklistItem>
              <ChecklistItem>
                <strong>Order ID</strong> — From{' '}
                <a
                  href="https://www.epicgames.com/account/transactions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Epic Transactions
                </a>
              </ChecklistItem>
              <ChecklistItem>
                <strong>@EPIC GAMES role</strong> —{' '}
                <Link to="/linked-roles">Get verified</Link>
              </ChecklistItem>
            </div>
          </div>
        </div>
      </section>

      {/* ========== RESPONSE TIMES ========== */}
      <section className="content-section reveal">
        <div className="section-header">
          <h2 className="section-title">Response Times</h2>
        </div>

        <div className="response-times-grid">
          <div className="response-time-card">
            <div className="response-time-value">24-48h</div>
            <div className="response-time-label">Standard Support</div>
            <p>General questions via Discord #support</p>
          </div>
          <div className="response-time-card priority">
            <div className="response-time-value">12-24h</div>
            <div className="response-time-label">Priority Support</div>
            <p>For verified @EPIC GAMES members</p>
          </div>
          <div className="response-time-card urgent">
            <div className="response-time-value">ASAP</div>
            <div className="response-time-label">Critical Issues</div>
            <p>Editor crashes, regressions, security</p>
          </div>
        </div>

        <div className="info-note">
          <span className="info-note-icon">ℹ️</span>
          <p>
            We work across time zones. Tickets may auto-close after inactivity — 
            reply to keep them open or reopen later if needed.
          </p>
        </div>
      </section>

      {/* ========== SECURITY ========== */}
      <section className="content-section reveal">
        <div className="security-card">
          <div className="security-icon">🔒</div>
          <h3>Security Issues</h3>
          <p>
            For security vulnerabilities or sensitive issues, please contact a moderator 
            directly on Discord. Do not post security issues in public channels.
          </p>
        </div>
      </section>

      {/* ========== QUICK LINKS ========== */}
      <section className="content-section reveal">
        <div className="section-header">
          <h2 className="section-title">Quick Links</h2>
        </div>

        <div className="quick-links-grid">
          <Link to="/faq" className="quick-link-card">
            <span className="quick-link-icon">❓</span>
            <span className="quick-link-title">FAQ</span>
            <span className="quick-link-arrow">→</span>
          </Link>
          <Link to="/linked-roles" className="quick-link-card">
            <span className="quick-link-icon">🔗</span>
            <span className="quick-link-title">Linked Roles</span>
            <span className="quick-link-arrow">→</span>
          </Link>
          <Link to="/community" className="quick-link-card">
            <span className="quick-link-icon">👥</span>
            <span className="quick-link-title">Community</span>
            <span className="quick-link-arrow">→</span>
          </Link>
          <Link to="/blog" className="quick-link-card">
            <span className="quick-link-icon">📰</span>
            <span className="quick-link-title">Blog & Updates</span>
            <span className="quick-link-arrow">→</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
