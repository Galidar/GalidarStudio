import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import type { ProductChangelog } from '../data/changelog-types';
import nextgenChangelog from '../data/changelog-nextgen';
import legacyChangelog from '../data/changelog-legacy';
import riverologyChangelog from '../data/changelog-riverology';

/* ─────────────────────────────────────────────
   Product registry — add new products here.
   Future: import proChangelog from '../data/changelog-pro';
   Future: import liteChangelog from '../data/changelog-lite';
   Future: import river3Changelog from '../data/changelog-river3';
   ───────────────────────────────────────────── */

let changelogs: ProductChangelog[] = [
  nextgenChangelog,
  legacyChangelog,
  riverologyChangelog,
  // Future products go here:
  // proChangelog,
  // liteChangelog,
  // river3Changelog,
];

/* ─────────────────────────────────────────────
   Styles
   ───────────────────────────────────────────── */

let styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg-dark)',
    position: 'relative',
    overflow: 'hidden',
  },
  meshBg: {
    position: 'fixed',
    inset: 0,
    background: 'var(--mesh-1)',
    opacity: 0.4,
    pointerEvents: 'none',
    zIndex: 0,
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '60px 24px 120px',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: 64,
  },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: 99,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    marginBottom: 16,
    background: 'rgba(139, 92, 246, 0.15)',
    color: '#a78bfa',
    border: '1px solid rgba(139, 92, 246, 0.3)',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 800,
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #22d3ee 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 12px',
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: 17,
    color: 'var(--text-gray)',
    maxWidth: 560,
    margin: '0 auto',
    lineHeight: 1.6,
  },
  tabs: {
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 48,
    flexWrap: 'wrap' as const,
  },
  tab: {
    padding: '10px 24px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'var(--bg-card)',
    color: 'var(--text-gray)',
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: "'Sora', system-ui, sans-serif",
  },
  tabActive: {
    background: 'rgba(139, 92, 246, 0.15)',
    borderColor: 'rgba(139, 92, 246, 0.4)',
    color: '#a78bfa',
  },
  timeline: {
    position: 'relative' as const,
    paddingLeft: 32,
  },
  timelineLine: {
    position: 'absolute' as const,
    left: 7,
    top: 0,
    bottom: 0,
    width: 2,
    background: 'linear-gradient(180deg, rgba(139,92,246,0.4) 0%, rgba(34,211,238,0.2) 50%, transparent 100%)',
  },
  entry: {
    position: 'relative' as const,
    marginBottom: 40,
  },
  dot: {
    position: 'absolute' as const,
    left: -29,
    top: 8,
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: '3px solid',
    background: 'var(--bg-dark)',
    zIndex: 2,
  },
  card: {
    background: 'var(--bg-card)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '28px 28px 24px',
    transition: 'all 0.3s',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
    flexWrap: 'wrap' as const,
  },
  versionBadge: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
  },
  tagLatest: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    background: 'rgba(52, 211, 153, 0.15)',
    color: '#34d399',
    border: '1px solid rgba(52, 211, 153, 0.3)',
  },
  tagMajor: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    background: 'rgba(139, 92, 246, 0.15)',
    color: '#a78bfa',
    border: '1px solid rgba(139, 92, 246, 0.3)',
  },
  entryTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: 'var(--text-white)',
    margin: '4px 0 2px',
  },
  entryDate: {
    fontSize: 13,
    color: 'var(--text-muted)',
    marginBottom: 16,
  },
  highlights: {
    margin: '0 0 20px',
    padding: '16px 20px',
    borderRadius: 12,
    background: 'rgba(139, 92, 246, 0.06)',
    border: '1px solid rgba(139, 92, 246, 0.12)',
    listStyle: 'none',
  },
  highlightItem: {
    padding: '4px 0',
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 1.5,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'var(--text-muted)',
    marginTop: 16,
    marginBottom: 8,
  },
  changeList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  changeItem: {
    position: 'relative' as const,
    paddingLeft: 18,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 14,
    color: 'var(--text-gray)',
    lineHeight: 1.55,
  },
  changeBullet: {
    position: 'absolute' as const,
    left: 0,
    top: 10,
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'rgba(139, 92, 246, 0.5)',
  },
};

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */

export default function Changelog() {
  let [activeProduct, setActiveProduct] = useState(0);
  let product = changelogs[activeProduct];

  useEffect(() => {
    document.querySelectorAll('.cl-card').forEach((el: Element) => {
      let htmlEl = el as HTMLElement;
      htmlEl.addEventListener('mouseenter', () => {
        htmlEl.style.borderColor = 'rgba(139, 92, 246, 0.2)';
        htmlEl.style.transform = 'translateY(-2px)';
        htmlEl.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.08)';
      });
      htmlEl.addEventListener('mouseleave', () => {
        htmlEl.style.borderColor = 'rgba(255,255,255,0.06)';
        htmlEl.style.transform = 'translateY(0)';
        htmlEl.style.boxShadow = 'none';
      });
    });
  }, [activeProduct]);

  return (
    <Layout title="Changelog" description="Complete version history for Oceanology plugins">
      <div style={styles.page}>
        <div style={styles.meshBg} />
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.badge}>Version History</span>
            <h1 style={styles.title}>Changelog</h1>
            <p style={styles.subtitle}>
              Track every update, fix, and feature across all Oceanology products.
              From the first wave to the latest build.
            </p>
          </div>

          {/* Product Tabs */}
          <div style={styles.tabs}>
            {changelogs.map((cl, i) => (
              <button
                key={cl.product}
                onClick={() => setActiveProduct(i)}
                style={{
                  ...styles.tab,
                  ...(activeProduct === i ? { ...styles.tabActive, borderColor: cl.accent + '66', color: cl.accent, background: cl.accent + '18' } : {}),
                }}
              >
                {cl.icon} {cl.product}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div style={styles.timeline}>
            <div style={styles.timelineLine} />

            {product.entries.map((entry, i) => (
              <div key={entry.version} style={styles.entry}>
                <div
                  style={{
                    ...styles.dot,
                    borderColor: entry.tag === 'latest' ? '#34d399' : product.accent,
                    boxShadow: entry.tag === 'latest' ? '0 0 12px rgba(52,211,153,0.4)' : 'none',
                  }}
                />

                <div className="cl-card" style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={{ ...styles.versionBadge, color: product.accent }}>
                      v{entry.version}
                    </span>
                    {entry.tag === 'latest' && <span style={styles.tagLatest}>Latest</span>}
                    {entry.tag === 'major' && <span style={styles.tagMajor}>Major</span>}
                  </div>

                  <div style={styles.entryTitle}>{entry.title}</div>
                  <div style={styles.entryDate}>{entry.date}</div>

                  {entry.highlights && (
                    <ul style={styles.highlights}>
                      {entry.highlights.map((h, hi) => (
                        <li key={hi} style={styles.highlightItem}>
                          &#x2728; {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.sections.map((section, si) => (
                    <div key={si}>
                      <div style={styles.sectionHeading}>{section.heading}</div>
                      <ul style={styles.changeList}>
                        {section.items.map((item, ii) => (
                          <li key={ii} style={styles.changeItem}>
                            <span style={styles.changeBullet} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
