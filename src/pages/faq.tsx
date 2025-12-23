import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

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

// FAQ Data
const faqData = [
  {
    category: 'General',
    icon: '📦',
    color: 'violet',
    questions: [
      {
        q: 'What Unreal Engine versions are supported?',
        a: 'We target UE 5.3 and later. Check release notes on the blog for exact compatibility per release. Legacy versions may support older UE5.x releases.',
      },
      {
        q: 'Does NextGen replace Legacy?',
        a: 'No. Legacy is actively maintained and optimized for mid-range GPUs. NextGen introduces new architectures (FFT waves, C++ QuadTree) for high-end systems. Choose based on your project needs.',
      },
      {
        q: 'Can I use these plugins in commercial projects?',
        a: 'Yes! All plugins purchased from FAB include a commercial license. You can ship games and sell products using our water systems.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Refund policies are handled by Epic Games / FAB. Please contact their support for refund requests within the eligible window.',
      },
    ],
  },
  {
    category: 'Technical',
    icon: '⚙️',
    color: 'cyan',
    questions: [
      {
        q: 'How do I install the plugins?',
        a: 'Download from FAB, extract to your project\'s Plugins folder, and enable in the Plugins menu. See our setup guides for detailed instructions.',
      },
      {
        q: 'Why is my ocean not rendering?',
        a: 'Check that: (1) The plugin is enabled, (2) You\'ve added the Ocean actor to your level, (3) Your project has Lumen or similar lighting enabled, (4) Post-process volume is configured.',
      },
      {
        q: 'Does buoyancy work with physics actors?',
        a: 'Yes! Our buoyancy system supports both Blueprint and C++ actors. Add the Buoyancy component and configure mass, pontoons, and drag settings.',
      },
      {
        q: 'Can I use multiple ocean instances?',
        a: 'Oceanology supports one primary ocean per level. For multiple water bodies, use Riverology for rivers/lakes alongside Oceanology for the main ocean.',
      },
      {
        q: 'How do I optimize performance?',
        a: 'Reduce tessellation distance, lower FFT resolution, disable features you don\'t need (caustics, foam), and use LOD settings appropriate for your target hardware.',
      },
    ],
  },
  {
    category: 'Multiplayer',
    icon: '🌐',
    color: 'emerald',
    questions: [
      {
        q: 'Do the plugins support multiplayer?',
        a: 'Yes! Wave simulation is deterministic and synchronized across clients. Buoyancy and swimming work with replicated actors.',
      },
      {
        q: 'How is wave state synchronized?',
        a: 'Waves use a shared time seed — all clients calculate the same wave positions. No network traffic is needed for wave sync.',
      },
    ],
  },
  {
    category: 'Support',
    icon: '💬',
    color: 'orange',
    questions: [
      {
        q: 'How do I report a bug?',
        a: 'Open a thread in #support on Discord with: plugin version, UE version, steps to reproduce, and any error logs or screenshots.',
      },
      {
        q: 'How do I request a feature?',
        a: 'Post in #feature-requests on Discord. We review community suggestions regularly and prioritize based on demand and feasibility.',
      },
      {
        q: 'What\'s the response time for support?',
        a: 'We aim to respond within 24-48 hours. Priority support is available to verified @EPIC GAMES members via Linked Roles.',
      },
    ],
  },
];

// Accordion Item Component
function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
      <button className="accordion-header" onClick={onClick}>
        <span>{question}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="accordion-body">
        <p>{answer}</p>
      </div>
    </div>
  );
}

// FAQ Category Component
function FAQCategory({
  category,
  icon,
  color,
  questions,
}: {
  category: string;
  icon: string;
  color: string;
  questions: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`faq-category ${color}`}>
      <div className="faq-category-header">
        <span className="faq-category-icon">{icon}</span>
        <h3 className="faq-category-title">{category}</h3>
      </div>
      <div className="accordion-container">
        {questions.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.q}
            answer={item.a}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function FAQ(): JSX.Element {
  useReveal();

  // Generate JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.flatMap((cat) =>
      cat.questions.map((q) => ({
        '@type': 'Question',
        name: q.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.a,
        },
      }))
    ),
  };

  return (
    <Layout
      title="FAQ"
      description="Frequently asked questions about Oceanology, Riverology, and Galidar Studio plugins."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ========== HERO ========== */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span>Help Center</span>
          </div>
          <h1 className="page-hero-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="page-hero-subtitle">
            Quick answers to common questions about our water simulation plugins. 
            Can't find what you're looking for? Ask on Discord!
          </p>
        </div>
      </section>

      {/* ========== FAQ CATEGORIES ========== */}
      <section className="faq-section reveal">
        <div className="faq-grid">
          {faqData.map((cat) => (
            <FAQCategory
              key={cat.category}
              category={cat.category}
              icon={cat.icon}
              color={cat.color}
              questions={cat.questions}
            />
          ))}
        </div>
      </section>

      {/* ========== STILL NEED HELP ========== */}
      <section className="page-cta reveal">
        <div className="page-cta-card">
          <h3>Still Have Questions?</h3>
          <p>Our community is here to help. Join Discord or check the documentation.</p>
          <div className="page-cta-buttons">
            <a
              href="https://discord.gg/VHJGBDR2as"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              💬 Ask on Discord
            </a>
            <a href="/oceanology-nextgen/" className="btn btn-secondary">
              📖 Browse Docs
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
