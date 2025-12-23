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

// Step Card Component
function StepCard({
  number,
  title,
  children,
  accentColor = 'violet',
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <div className={`step-card ${accentColor}`}>
      <div className="step-number">{number}</div>
      <div className="step-content">
        <h3 className="step-title">{title}</h3>
        <div className="step-body">{children}</div>
      </div>
    </div>
  );
}

// Info Card Component
function InfoCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="info-card">
      <div className="info-card-icon">{icon}</div>
      <h4 className="info-card-title">{title}</h4>
      <div className="info-card-body">{children}</div>
    </div>
  );
}

export default function LinkedRoles(): JSX.Element {
  useReveal();

  return (
    <Layout
      title="Linked Roles"
      description="How to link your Epic Games account to Discord and claim the @EPIC GAMES role."
    >
      {/* ========== HERO ========== */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span>Discord Verification</span>
          </div>
          <h1 className="page-hero-title">
            <span className="gradient-text">Linked Roles</span>
          </h1>
          <p className="page-hero-subtitle">
            Verify your Epic Games account to unlock exclusive channels and priority support 
            in our Discord community.
          </p>
        </div>
      </section>

      {/* ========== WHY VERIFY ========== */}
      <section className="content-section reveal">
        <div className="section-header">
          <h2 className="section-title">Why Verify?</h2>
          <p className="section-desc">
            Discord Linked Roles help us confirm you own an Epic Games account, unlocking special features.
          </p>
        </div>

        <div className="info-grid">
          <InfoCard icon="🔓" title="Unlock Channels">
            Access exclusive support and showcase channels only available to verified members.
          </InfoCard>
          <InfoCard icon="⚡" title="Priority Support">
            Get faster responses and dedicated help from our team.
          </InfoCard>
          <InfoCard icon="🎮" title="Community Features">
            Participate in beta tests, polls, and special community events.
          </InfoCard>
        </div>
      </section>

      {/* ========== STEPS ========== */}
      <section className="content-section reveal">
        <div className="section-header">
          <h2 className="section-title">Setup Guide</h2>
          <p className="section-desc">
            Follow these steps to link your accounts and claim your role.
          </p>
        </div>

        <div className="steps-container">
          <StepCard number={1} title="Link Epic Games to Discord" accentColor="violet">
            <ol className="step-list">
              <li>
                Open the official Epic guide:{' '}
                <a
                  href="https://www.epicgames.com/help/en-US/account-c-202300000001645/connected-accounts-c-202300000001754/how-do-i-link-my-discord-account-to-my-epic-games-account-a202300000012834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-highlight"
                >
                  Link Discord to Epic Games →
                </a>
              </li>
              <li>Sign in to your <strong>Epic Games</strong> account when prompted</li>
              <li>Authorize <strong>Discord</strong> to connect to Epic Games</li>
              <li>
                Confirm you can see <strong>Epic Games</strong> under{' '}
                <code>Discord → User Settings → Connections</code>
              </li>
            </ol>
          </StepCard>

          <StepCard number={2} title="Claim @EPIC GAMES Role" accentColor="cyan">
            <ol className="step-list">
              <li>In Discord, click the <strong>server name</strong> at the top-left</li>
              <li>Select <strong>Linked Roles</strong> from the menu</li>
              <li>Choose <strong>@EPIC GAMES</strong> and start verification</li>
              <li>Discord checks your Epic connection and assigns the role</li>
            </ol>
          </StepCard>

          <StepCard number={3} title="Start Using Features" accentColor="emerald">
            <p>
              Once verified, you'll have access to:
            </p>
            <ul className="feature-list">
              <li>🎯 <strong>#verified-support</strong> — Priority help channel</li>
              <li>🖼️ <strong>#showcase</strong> — Share your projects</li>
              <li>🧪 <strong>#beta-testing</strong> — Early access to updates</li>
            </ul>
          </StepCard>
        </div>
      </section>

      {/* ========== TROUBLESHOOTING ========== */}
      <section className="content-section reveal">
        <div className="section-header">
          <h2 className="section-title">Troubleshooting</h2>
        </div>

        <div className="troubleshoot-grid">
          <div className="troubleshoot-item">
            <h4>Can't find Linked Roles?</h4>
            <p>
              Make sure you're clicking the <strong>server menu</strong> (top-left, next to the 
              channel list) — not the channel settings.
            </p>
          </div>
          <div className="troubleshoot-item">
            <h4>Role won't apply?</h4>
            <p>
              Check <code>Discord → Settings → Connections</code> and ensure your Epic Games 
              connection is present and active.
            </p>
          </div>
          <div className="troubleshoot-item">
            <h4>Need to re-link?</h4>
            <p>
              You can unlink and re-authorize from your Epic Games account settings at any time.
            </p>
          </div>
          <div className="troubleshoot-item">
            <h4>Still stuck?</h4>
            <p>
              Ask in <strong>#support</strong> on Discord — describe what you tried (no personal data).
            </p>
          </div>
        </div>
      </section>

      {/* ========== RESOURCES ========== */}
      <section className="content-section reveal">
        <div className="resources-card">
          <h3>📚 Official Documentation</h3>
          <div className="resources-links">
            <a
              href="https://support.discord.com/hc/en-us/articles/10388356626711"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              <span>Admin Setup Guide</span>
              <span>→</span>
            </a>
            <a
              href="https://support.discord.com/hc/en-us/articles/8063233404823"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              <span>Member Verification Flow</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="page-cta reveal">
        <div className="page-cta-card">
          <h3>Ready to Get Verified?</h3>
          <p>Join our Discord community and claim your @EPIC GAMES role today.</p>
          <a
            href="https://discord.gg/VHJGBDR2as"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Join Discord Server
          </a>
        </div>
      </section>
    </Layout>
  );
}
