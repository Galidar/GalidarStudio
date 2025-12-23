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
        a: 'All plugins are continuously updated to support the latest UE5.x release. We maintain compatibility with the current engine version as our primary focus. Previous engine versions remain functional but are not actively maintained due to significant engine-level changes between releases.',
      },
      {
        q: 'Does NextGen replace Legacy?',
        a: 'No. Both products serve different use cases. Legacy is optimized for broad hardware compatibility and consistent performance across mid-range GPUs. NextGen leverages advanced rendering techniques (FFT spectral waves, GPU QuadTree tessellation) for high-end systems and cinematic applications. Select based on your target hardware and visual requirements.',
      },
      {
        q: 'Can I use these plugins in commercial projects?',
        a: 'Yes. All plugins purchased through FAB include a full commercial license. You may ship games, simulations, and commercial products using our water systems without additional licensing fees.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Refund policies are managed by Epic Games through the FAB marketplace. Please contact their support team for refund requests within the applicable eligibility window.',
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
        a: 'Download from FAB, extract to your project\'s Plugins directory, and enable via the Plugins menu in Unreal Editor. Refer to our setup documentation for detailed integration instructions.',
      },
      {
        q: 'Why is my ocean not rendering?',
        a: 'Verify the following: (1) Plugin is enabled in Project Settings, (2) Ocean actor is placed in your level, (3) Lumen or compatible global illumination is configured, (4) Post-process volume is present with appropriate settings.',
      },
      {
        q: 'Does buoyancy work with physics actors?',
        a: 'Yes. Our buoyancy system fully supports both Blueprint and C++ physics actors. Attach the Buoyancy component and configure mass distribution, pontoon placement, and drag coefficients for realistic water interaction.',
      },
      {
        q: 'Can I use multiple ocean instances?',
        a: 'Oceanology supports one primary ocean per level for optimal performance. For projects requiring multiple water bodies, combine Oceanology (ocean) with Riverology (rivers, lakes) for seamless multi-body water environments.',
      },
      {
        q: 'How do I optimize performance?',
        a: 'Key optimization parameters include: tessellation distance, FFT resolution, LOD bias settings, and selective feature toggling (caustics, foam, subsurface scattering). Consult the performance documentation for hardware-specific recommendations.',
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
        a: 'Yes. Wave simulation is fully deterministic and synchronized across all clients. Buoyancy physics and swimming mechanics are designed for replicated actor support in networked environments.',
      },
      {
        q: 'How is wave state synchronized?',
        a: 'Waves utilize a shared time seed ensuring all clients compute identical wave positions independently. This approach eliminates network bandwidth overhead for wave synchronization.',
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
        a: 'Submit a detailed report in #support on our Discord server. Include: plugin version, Unreal Engine version, reproduction steps, and relevant logs or screenshots.',
      },
      {
        q: 'How do I request a feature?',
        a: 'Post feature requests in #feature-requests on Discord. We evaluate community suggestions regularly and prioritize based on technical feasibility and demand.',
      },
      {
        q: 'What\'s the response time for support?',
        a: 'Standard support response time is 24-48 hours. Priority support with expedited response is available to verified @EPIC GAMES members through our Linked Roles system.',
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
