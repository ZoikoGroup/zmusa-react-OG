"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./about.module.css";

const QUICK_JUMP_ITEMS = [
  {
    id: "mission-vision",
    title: "Mission & Vision",
    subtitle: "Jump to section",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4.2" ry="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    id: "what-makes-us-different",
    title: "What Makes Us Different",
    subtitle: "Jump to section",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <line x1="6" y1="19" x2="6" y2="13" />
        <line x1="12" y1="19" x2="12" y2="9" />
        <line x1="18" y1="19" x2="18" y2="5" />
      </svg>
    ),
  },
  {
    id: "our-community",
    title: "Our Community",
    subtitle: "Jump to section",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 20.5s-7.5-4.7-7.5-10.4A4.3 4.3 0 0 1 12 6.8a4.3 4.3 0 0 1 7.5 3.3c0 5.7-7.5 10.4-7.5 10.4Z" />
      </svg>
    ),
  },
  {
    id: "story-values-commitment",
    title: "Story, Values & Commitment",
    subtitle: "Jump to section",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 6.5C9.8 5 6.8 4.8 4 5.8v12.4c2.8-1 5.8-.8 8 .7m0-12.4c2.2-1.5 5.2-1.7 8-.7v12.4c-2.8-1-5.8-.8-8 .7m0-12.4v12.4" />
      </svg>
    ),
  },
];

const PROBLEMS_SOLVED = [
  {
    tag: "PRICING",
    title: "Wireless costs that are hard to understand.",
    description:
      "Customers should be able to compare prices, taxes, fees, data allowances, and usage terms before they buy—not discover important details afterward.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3v18M16 7.5a3.5 3.5 0 0 0-3.5-2.5h-1a3 3 0 0 0 0 6h1a3 3 0 0 1 0 6h-1A3.5 3.5 0 0 1 8 15" />
      </svg>
    ),
  },
  {
    tag: "SWITCHING",
    title: "Switching that feels unnecessarily complicated.",
    description:
      "Uncertainty about coverage, device compatibility, SIM activation, and keeping a phone number can make changing providers stressful.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 7l3 3-3 3" />
        <path d="M4 10h16" />
        <path d="M7 17l-3-3 3-3" />
        <path d="M20 14H4" />
      </svg>
    ),
  },
  {
    tag: "FIT",
    title: "Plans that don't fit real life.",
    description:
      "Individuals, families, small businesses, and people with international connections need different levels of data, flexibility, and support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 18a5.5 5.5 0 0 1 11 0" />
        <circle cx="17.5" cy="9.5" r="2.2" />
        <path d="M15.5 18a4 4 0 0 1 5 0" />
      </svg>
    ),
  },
  {
    tag: "RELATIONSHIP",
    title: "A mobile experience that feels impersonal.",
    description:
      "Wireless service is essential, but the relationship with a provider should be built on more than a monthly payment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 19.5s-7-4.4-7-9.8A4 4 0 0 1 12 7.2a4 4 0 0 1 7 2.5c0 5.4-7 9.8-7 9.8Z" />
      </svg>
    ),
  },
];

const PLAN_FAMILIES = [
  { label: "PLAN FAMILY", name: "ZoikoLite", accentClass: styles.accentOrange },
  { label: "PLAN FAMILY", name: "ZoikoCore", accentClass: styles.accentMagenta },
  { label: "PLAN FAMILY", name: "ZoikoMax", accentClass: styles.accentPurple },
];

const SWITCH_STEPS = [
  {
    step: "01",
    title: "Check coverage",
    description: "Check estimated coverage by ZIP code.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 21s7-5.7 7-11.5A7 7 0 0 0 5 9.5C5 15.3 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Confirm compatibility",
    description: "Confirm your device is compatible.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.6-3 8.1-7 9-4-.9-7-4.4-7-9V6l7-3Z" />
        <path d="M9.5 12l1.8 1.8 3.4-3.6" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Bring your phone",
    description: "Bring an eligible phone.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "SIM or eSIM",
    description: "Choose a physical SIM or eSIM.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M6 3h8l4 4v14H6V3Z" />
        <rect x="9" y="11" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Keep your number",
    description: "Transfer your number when eligible.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="8" cy="15" r="3.5" />
        <path d="M11.2 12.8L20 4" />
        <path d="M17 7l2.5 2.5" />
        <path d="M14.5 9.5L17 12" />
      </svg>
    ),
  },
];

const TRANSPARENCY_CARDS = [
  {
    topBarClass: styles.topBarOrange,
    badgeClass: styles.badgePink,
    title: "What a plan costs",
    subtitle: "Clear before you buy",
    points: [
      "What a plan costs, explained up front",
      "Applicable prices and terms shown before purchase",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3v18M16 7.5a3.5 3.5 0 0 0-3.5-2.5h-1a3 3 0 0 0 0 6h1a3 3 0 0 1 0 6h-1A3.5 3.5 0 0 1 8 15" />
      </svg>
    ),
  },
  {
    topBarClass: styles.topBarMagenta,
    badgeClass: styles.badgeRose,
    title: "Data & hotspot",
    subtitle: "How allowances work",
    points: [
      "How premium data allowances work",
      "How hotspot allowances work",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <line x1="6" y1="19" x2="6" y2="13" />
        <line x1="12" y1="19" x2="12" y2="9" />
        <line x1="18" y1="19" x2="18" y2="5" />
      </svg>
    ),
  },
  {
    topBarClass: styles.topBarPurple,
    badgeClass: styles.badgeLavender,
    title: "Calling vs. roaming",
    subtitle: "Know the difference",
    points: [
      "International calling, explained",
      "How it differs from roaming",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4.2" ry="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
];

const CORE_VALUES = [
  {
    title: "Animals",
    description: "Inspire our commitment to compassion and responsible animal welfare.",
    cardClass: styles.valueCardPink,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="7.5" cy="9.5" r="1.5" />
        <circle cx="11" cy="7.5" r="1.5" />
        <circle cx="14.5" cy="7.5" r="1.5" />
        <circle cx="17.5" cy="10" r="1.5" />
        <path d="M12 12.2c-2.6 0-4.6 1.8-4.6 4 0 1.4 1.1 2.3 2.4 2.3 1 0 1.6-.4 2.2-.4s1.2.4 2.2.4c1.3 0 2.4-.9 2.4-2.3 0-2.2-2-4-4.6-4Z" />
      </svg>
    ),
  },
  {
    title: "Music",
    description: "Inspires our support for creativity, artists, and experiences that bring people together.",
    cardClass: styles.valueCardPurple,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 18V6l10-2v12" />
        <circle cx="6.5" cy="18" r="2.5" />
        <circle cx="16.5" cy="16" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Nature",
    description: "Reminds us to make thoughtful choices about technology, resource use, and our wider responsibilities.",
    cardClass: styles.valueCardOrange,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M19 5c-7.5 0-13 4.5-13 12 0 1 .2 2 .5 2.8 1.4.2 2.8.2 4.2 0 6.3-1 10.3-6.2 10.3-12.8 0-.7-.6-2-2-2Z" />
        <path d="M6.5 17.5L14 10" />
      </svg>
    ),
  },
];

const AboutUs = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      {/* 1. HERO & QUICK-JUMP STRIP */}
      <section className={styles.heroSection}>
        <div className={styles.heroBanner}>
          <img
            src="/img/about/1.png"
            alt="Friends smiling while looking at a smartphone outdoors"
            className={styles.heroBgImage}
          />
          <div className={styles.heroOverlay} />

          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroEyebrowRow}>
                <span className={styles.heroEyebrow}>ABOUT ZOIKO MOBILE</span>
                <span className={styles.heroLine} />
                <span className={styles.usFlagBadge} aria-label="United States">
                  <span className={styles.usFlagCanton} />
                  <span className={styles.usFlagStripes} />
                </span>
              </div>

              <h1 className={styles.heroTitle}>
                Wireless That
                <br />
                <span className={styles.heroGradientText}>Moves You.</span>
              </h1>

              <p className={styles.heroSubtitle}>Connections That Matter.</p>

              <div className={styles.heroTaglineBlock}>
                <span className={styles.heroTagline}>
                  THE ANIMAL &amp; MUSIC LOVING NETWORK.<sup className={styles.tm}>TM</sup>
                </span>
                <span className={styles.heroTaglineUnderline} />
              </div>

              <p className={styles.heroItalicLead}>Connecting Every Possibility.</p>

              <p className={styles.heroDescription}>
                Zoiko Mobile is a U.S. wireless provider built around a simple belief: mobile
                connectivity should be easier to understand, easier to choose, and more
                meaningful to the people who use it.
              </p>

              <div className={styles.heroActions}>
                <a href="/wireless-plans" className={styles.btnPrimaryPink}>
                  Explore Wireless Plans <span aria-hidden="true">-&gt;</span>
                </a>
                <a href="/explore-community" className={styles.btnOutlineWhite}>
                  Explore Our Community <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroWave} aria-hidden="true" />

        <div className={styles.jumpStrip}>
          <div className={styles.container}>
            <div className={styles.jumpGrid}>
              {QUICK_JUMP_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={styles.jumpCard}
                >
                  <span className={styles.jumpIconBox}>{item.icon}</span>
                  <span className={styles.jumpTextGroup}>
                    <span className={styles.jumpTitle}>{item.title}</span>
                    <span className={styles.jumpSubtitle}>{item.subtitle}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONNECTING EVERY POSSIBILITY SPLIT SHOWCASE */}
      <section className={styles.tintedSection}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div className={styles.splitTextCol}>
              <span className={styles.eyebrowPink}>ABOUT ZOIKO MOBILE</span>
              <h2 className={styles.sectionHeadingDark}>
                Connecting every
                <br />
                possibility.
              </h2>
              <p className={styles.bodyCopy}>
                We combine wireless service delivered through established network partnerships with
                flexible plan choices, straightforward information, and a distinctive community
                inspired by animals, music, and nature.
              </p>
              <p className={styles.bodyCopy}>
                Whether you&apos;re connecting with loved ones, running a business, or keeping in
                touch across borders, we&apos;re here to help you stay connected to what matters.
              </p>

              <div className={styles.buttonRow}>
                <a href="/wireless-plans" className={styles.btnSolidPink}>
                  Explore Wireless Plans
                </a>
                <a href="/explore-community" className={styles.btnSolidPlum}>
                  Explore Our Community
                </a>
              </div>
            </div>

            <div className={styles.splitMediaCol}>
              <div className={styles.roundedPhotoFrame}>
                <img
                  src="/img/about/2.png"
                  alt="Smiling woman wearing white headphones with a pet against a sunset skyline"
                  className={styles.photoCover}
                />
                <div className={styles.photoFloatingCard}>
                  <p className={styles.photoFloatingTitle}>
                    The Animal &amp; Music Loving Network.<sup className={styles.tm}>TM</sup>
                  </p>
                  <p className={styles.photoFloatingSub}>
                    Wireless service, plan choices and clear information, with a community inspired
                    by animals, music, and nature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section id="mission-vision" className={styles.whiteSection}>
        <div className={styles.container}>
          <div className={styles.centeredHeader}>
            <span className={styles.eyebrowPink}>MISSION &amp; VISION</span>
            <h2 className={styles.sectionHeadingDark}>Our mission and vision.</h2>
          </div>

          <div className={styles.twoColCards}>
            <article className={styles.missionCard}>
              <div className={`${styles.topAccentBar} ${styles.topBarMission}`} />
              <div className={styles.cardTagRow}>
                <span className={`${styles.miniBadge} ${styles.badgePink}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <ellipse cx="12" cy="12" rx="4.2" ry="9" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                  </svg>
                </span>
                <span className={styles.cardTagPink}>OUR MISSION</span>
              </div>
              <h3 className={styles.cardTitleDark}>Simpler. More transparent. More accessible.</h3>
              <hr className={styles.cardDivider} />
              <p className={styles.cardBodyMuted}>
                To make mobile connectivity simpler, more transparent, and more accessible through
                flexible wireless services, helpful customer experiences, and meaningful connections
                to the people and causes our customers value.
              </p>
            </article>

            <article className={styles.missionCard}>
              <div className={`${styles.topAccentBar} ${styles.topBarVision}`} />
              <div className={styles.cardTagRow}>
                <span className={`${styles.miniBadge} ${styles.badgeLavender}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
                    <circle cx="12" cy="12" r="2.8" />
                  </svg>
                </span>
                <span className={styles.cardTagViolet}>OUR VISION</span>
              </div>
              <h3 className={styles.cardTitleDark}>
                A trusted, purpose-led American wireless brand.
              </h3>
              <hr className={styles.cardDivider} />
              <p className={styles.cardBodyMuted}>
                To become a trusted, purpose-led American wireless brand that demonstrates how great
                connectivity, customer value, and positive community impact can thrive together.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. PROBLEMS WE'RE SOLVING & WHAT MAKES US DIFFERENT */}
      <section id="what-makes-us-different" className={styles.whiteSectionTightTop}>
        <div className={styles.container}>
          <div className={styles.centeredHeader}>
            <span className={styles.eyebrowPink}>WHY WE EXIST</span>
            <h2 className={styles.sectionHeadingDark}>The problems we&apos;re solving.</h2>
          </div>

          <div className={styles.problemsGrid}>
            {PROBLEMS_SOLVED.map((item) => (
              <article key={item.tag} className={styles.problemCard}>
                <div className={styles.problemCardHeader}>
                  <span className={`${styles.miniBadge} ${styles.badgePink}`}>{item.icon}</span>
                  <span className={styles.problemTag}>{item.tag}</span>
                </div>
                <h3 className={styles.problemTitle}>{item.title}</h3>
                <p className={styles.problemDesc}>{item.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.differenceHeader}>
            <span className={styles.eyebrowPink}>OUR DIFFERENCE</span>
            <h2 className={styles.sectionHeadingDark}>What makes Zoiko Mobile different.</h2>
          </div>

          <div className={styles.featureBannerCard}>
            <div className={styles.featureBannerLeft}>
              <div className={styles.bannerEyebrowRow}>
                <span className={styles.bannerIconBox} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="4" width="7" height="7" rx="1.5" />
                    <rect x="13" y="4" width="7" height="7" rx="1.5" />
                    <rect x="4" y="13" width="7" height="7" rx="1.5" />
                    <rect x="13" y="13" width="7" height="7" rx="1.5" />
                  </svg>
                </span>
                <span className={styles.bannerEyebrowText}>PLAN FAMILIES</span>
              </div>

              <h3 className={styles.bannerHeading}>Choices for the way you live.</h3>
              <p className={styles.bannerCopy}>
                Our ZoikoLite, ZoikoCore, and ZoikoMax plan families help customers choose around
                their usage needs. We also offer family and business options, with applicable prices
                and terms shown before purchase.
              </p>

              <div className={styles.planPillsRow}>
                {PLAN_FAMILIES.map((plan) => (
                  <div key={plan.name} className={`${styles.planPill} ${plan.accentClass}`}>
                    <span className={styles.planPillLabel}>{plan.label}</span>
                    <span className={styles.planPillName}>{plan.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.featureBannerRight}>
              <img
                src="/img/about/3.png"
                alt="Team professionals collaborating with smartphones and documents"
                className={styles.photoCover}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SWITCHING MADE CLEAR & STEP-BY-STEP JOURNEY */}
      <section className={styles.tintedSection}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div className={styles.splitTextCol}>
              <span className={styles.eyebrowPink}>SWITCHING MADE CLEAR</span>
              <h2 className={styles.sectionHeadingDark}>
                A clearer path to
                <br />
                switching.
              </h2>
              <p className={styles.bodyCopy}>
                Check estimated coverage by ZIP code, confirm device compatibility, bring an
                eligible phone, choose a physical SIM or eSIM, and transfer your number when
                eligible.
              </p>
              <p className={styles.bodyCopy}>
                Our guided journey helps customers understand each step before activating.
              </p>
            </div>

            <div className={styles.splitMediaCol}>
              <div className={styles.roundedPhotoFrame}>
                <img
                  src="/img/about/4.png"
                  alt="Person wearing sunglasses checking coverage on a phone"
                  className={styles.photoCover}
                />
                <div className={styles.photoFloatingCard}>
                  <p className={styles.photoFloatingTitle}>Estimated coverage by ZIP code.</p>
                  <p className={styles.photoFloatingSub}>
                    Coverage, speeds, and availability depend on location, device, plan, and network
                    conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.whiteSection}>
        <div className={styles.container}>
          <div className={styles.centeredHeader}>
            <span className={styles.eyebrowPink}>YOUR GUIDED JOURNEY</span>
            <h2 className={styles.sectionHeadingDark}>Switch to Zoiko Mobile, step by step.</h2>
            <p className={styles.centeredSubtitle}>Understand each step before activating.</p>
          </div>

          <div className={styles.stepsGrid}>
            {SWITCH_STEPS.map((item) => (
              <div key={item.step} className={styles.stepCard}>
                <div className={styles.stepCardTop}>
                  <span className={`${styles.miniBadge} ${styles.badgePink}`}>{item.icon}</span>
                  <span className={styles.stepNumber}>{item.step}</span>
                </div>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.deviceFeatureCard}>
            <div className={styles.deviceFeatureImageCol}>
              <img
                src="/img/about/5.png"
                alt="Assortment of modern smartphones ready for activation"
                className={styles.photoCover}
              />
            </div>
            <div className={styles.deviceFeatureBodyCol}>
              <h3 className={styles.cardTitleDark}>Bring an eligible phone.</h3>
              <p className={styles.cardBodyMuted}>
                Confirm device compatibility first, then choose the SIM type that suits you and
                transfer your number when eligible.
              </p>
              <div className={styles.chipRow}>
                <span className={styles.softChip}>Physical SIM</span>
                <span className={styles.softChip}>eSIM</span>
                <span className={styles.softChip}>Number transfer</span>
              </div>
            </div>
          </div>

          <div className={styles.amberNoticeBar}>
            <div className={styles.amberNoticeLeft}>
              <span className={styles.amberWarningIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4L2.5 20h19L12 4Z" />
                  <line x1="12" y1="10" x2="12" y2="14.5" />
                  <circle cx="12" cy="17.5" r="0.8" fill="currentColor" />
                </svg>
              </span>
              <p className={styles.amberNoticeText}>
                <strong>Understand each step before activating.</strong> Our guided journey walks you
                through it.
              </p>
            </div>
            <a href="/wireless-plans" className={styles.btnSolidPink}>
              Explore Wireless Plans
            </a>
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENCY BEFORE COMMITMENT & INTERNATIONAL */}
      <section className={styles.whiteSectionTightTop}>
        <div className={styles.container}>
          <div className={styles.centeredHeader}>
            <span className={styles.eyebrowPink}>CLEAR INFORMATION</span>
            <h2 className={styles.sectionHeadingDark}>Transparency before commitment.</h2>
            <p className={styles.centeredSubtitle}>
              We aim to explain the details that matter before you choose.
            </p>
          </div>

          <div className={styles.threeColCards}>
            {TRANSPARENCY_CARDS.map((card) => (
              <article key={card.title} className={styles.transparencyCard}>
                <div className={`${styles.topAccentBar} ${card.topBarClass}`} />
                <span className={`${styles.miniBadge} ${card.badgeClass}`}>{card.icon}</span>
                <h3 className={styles.transparencyTitle}>{card.title}</h3>
                <p className={styles.transparencySub}>{card.subtitle}</p>
                <hr className={styles.cardDivider} />
                <ul className={styles.checkList}>
                  {card.points.map((point) => (
                    <li key={point} className={styles.checkListItem}>
                      <span className={styles.checkCircle} aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3.5 8.5l3 3 6-6.5" />
                        </svg>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={styles.compareBar}>
            <p className={styles.compareBarText}>
              Specific benefits and restrictions depend on the plan selected.
            </p>
            <a href="/wireless-plans" className={styles.btnSolidPlum}>
              Compare Wireless Plans &gt;
            </a>
          </div>

          <div className={styles.internationalBanner}>
            <img
              src="/img/about/6.png"
              alt="Traveler smiling while using a smartphone abroad"
              className={styles.internationalBgImg}
            />
            <div className={styles.internationalScrim} />
            <div className={styles.internationalContent}>
              <div className={styles.internationalTagRow}>
                <span className={styles.globeMini} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <ellipse cx="12" cy="12" rx="4.2" ry="9" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                  </svg>
                </span>
                <span>INTERNATIONAL</span>
              </div>
              <h3 className={styles.internationalHeading}>
                Connections across
                <br />
                borders.
              </h3>
              <p className={styles.internationalCopy}>
                International calling and travel options help customers explore ways to stay
                connected beyond the United States, with destinations, availability, and rates
                determined by the selected service.
              </p>
              <a href="/wireless-plans" className={styles.btnWhitePill}>
                Explore Wireless Plans <span aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY BEYOND MOBILE SERVICE (DARK SHOWCASE) */}
      <section id="our-community" className={styles.darkCommunitySection}>
        <div className={styles.container}>
          <div className={styles.centeredHeaderDark}>
            <span className={styles.eyebrowLightPink}>
              THE ANIMAL &amp; MUSIC LOVING NETWORK.<sup className={styles.tm}>TM</sup>
            </span>
            <h2 className={styles.sectionHeadingWhite}>A community beyond mobile service.</h2>
            <p className={styles.subtitleLight}>
              We champion animal welfare and celebrate music and independent creators.
            </p>
          </div>

          <div className={styles.communityCardsGrid}>
            <article className={styles.communityCard}>
              <div className={styles.communityPhotoWrap}>
                <img
                  src="/img/about/7.png"
                  alt="Responder holding a rescued cat"
                  className={styles.photoCover}
                />
              </div>
              <div className={styles.communityCardBody}>
                <span className={styles.communityTagMagenta}>ANIMAL WELFARE</span>
                <h3 className={styles.communityCardTitle}>Championing animal welfare.</h3>
                <p className={styles.communityCardDesc}>
                  Supporting animal rescue and wildlife conservation initiatives, guided by our
                  commitment to compassion and responsible animal welfare.
                </p>
                <a href="/explore-community" className={styles.btnSolidPink}>
                  Explore Our Community
                </a>
              </div>
            </article>

            <article className={styles.communityCard}>
              <div className={styles.communityPhotoWrap}>
                <img
                  src="/img/about/8.png"
                  alt="Musician playing acoustic guitar outdoors"
                  className={styles.photoCover}
                />
              </div>
              <div className={styles.communityCardBody}>
                <span className={styles.communityTagGold}>MUSIC &amp; CREATORS</span>
                <h3 className={styles.communityCardTitle}>Celebrating music and creators.</h3>
                <p className={styles.communityCardDesc}>
                  We celebrate music and independent creators, supporting creativity, artists, and
                  experiences that bring people together.
                </p>
                <a href="/explore-community" className={styles.btnWhitePill}>
                  Explore Our Community
                </a>
              </div>
            </article>
          </div>

          <div className={styles.profitCommitmentBanner}>
            <div className={styles.profitMetric}>
              <span className={styles.profitUpTo}>UP TO</span>
              <span className={styles.profitNumber}>2%</span>
              <span className={styles.profitSub}>OF PROFITS</span>
            </div>
            <p className={styles.profitText}>
              <strong>Our published commitment</strong> is to direct up to 2% of profits to animal
              rescue and wildlife conservation initiatives; this is not a fixed donation from each
              bill.
            </p>
          </div>

          <p className={styles.communityFootnote}>
            Community opportunities and music benefits are described separately from wireless plan
            inclusions.
          </p>
        </div>
      </section>

      {/* 8. STORY BEHIND OUR NAME & VALUES */}
      <section id="story-values-commitment" className={styles.tintedSection}>
        <div className={styles.container}>
          <div className={styles.leftHeaderBlock}>
            <span className={styles.eyebrowPink}>OUR STORY</span>
            <h2 className={styles.sectionHeadingDark}>The story behind our name.</h2>
            <p className={styles.leadCopy}>
              Zoiko was born from an unusual meeting of ideas: telecommunications, ancient Greek,
              mathematics, music, and a love of animals and the natural world.
            </p>
          </div>

          <div className={styles.greekGrid}>
            <div className={styles.greekCard}>
              <div className={styles.greekTerm}>ζῷον</div>
              <div className={styles.greekTranslitPink}>zoion</div>
              <p className={styles.greekMeaning}>Meaning &quot;living being&quot; or &quot;animal.&quot;</p>
            </div>

            <div className={styles.greekCard}>
              <div className={styles.greekTerm}>ζωολογικός</div>
              <div className={styles.greekTranslitPink}>zoologikos</div>
              <p className={styles.greekMeaning}>Relating to animals and their study.</p>
            </div>
          </div>

          <div className={styles.formulaBanner}>
            <div className={styles.formulaLeft}>
              <span className={styles.formulaWhite}>zoi</span>
              <span className={styles.formulaMuted}>+</span>
              <span className={styles.formulaWhite}>ko</span>
              <span className={styles.formulaMuted}>=</span>
              <span className={styles.formulaHighlight}>Zoiko</span>
            </div>
            <p className={styles.formulaRight}>
              By combining &quot;zoi&quot; and &quot;ko,&quot; a new identity emerged—one intended
              to express life, connection, and harmony.
            </p>
          </div>

          <div className={styles.storyBottomGrid}>
            <div className={styles.storyTextCard}>
              <span className={`${styles.miniBadge} ${styles.badgePink}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <line x1="6" y1="19" x2="6" y2="13" />
                  <line x1="12" y1="19" x2="12" y2="9" />
                  <line x1="18" y1="19" x2="18" y2="5" />
                </svg>
              </span>
              <h3 className={styles.storyCardTitle}>Bringing the identity into wireless</h3>
              <p className={styles.storyCardDesc}>
                The concept of a mobile virtual network operator offered a way to bring that
                identity into wireless communications: work with established network partners while
                creating a distinctive service and customer experience.
              </p>
            </div>

            <div className={styles.storyMediaCard}>
              <img
                src="/img/about/9.png"
                alt="Over-ear headphones representing music in the Zoiko story"
                className={styles.storySideImg}
              />
              <div className={styles.storyMediaContent}>
                <span className={`${styles.miniBadge} ${styles.badgePink}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M9 18V6l10-2v12" />
                    <circle cx="6.5" cy="18" r="2.5" />
                    <circle cx="16.5" cy="16" r="2.5" />
                  </svg>
                </span>
                <h3 className={styles.storyCardTitle}>Music completes the story</h3>
                <p className={styles.storyCardDesc}>
                  Its ability to connect people across generations, cultures, and borders reflects
                  what Zoiko stands for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.whiteSection}>
        <div className={styles.container}>
          <div className={styles.centeredHeader}>
            <span className={styles.eyebrowPink}>OUR VALUES</span>
            <h2 className={styles.sectionHeadingDark}>
              Inspired by animals. Moved by music.
              <br />
              Mindful of nature.
            </h2>
          </div>

          <div className={styles.valuesGrid}>
            {CORE_VALUES.map((val) => (
              <div key={val.title} className={`${styles.valueCard} ${val.cardClass}`}>
                <span className={styles.valueIconBox}>{val.icon}</span>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueDesc}>{val.description}</p>
              </div>
            ))}
          </div>

          <p className={styles.valuesFooterNote}>
            These aren&apos;t add-ons to our identity. They&apos;re the values behind{" "}
            <strong>
              The Animal &amp; Music Loving Network.<sup className={styles.tm}>TM</sup>
            </strong>
          </p>
        </div>
      </section>

      {/* 9. OUR COMMITMENT & FINAL CTA BANNER */}
      <section className={styles.whiteSectionTightTop}>
        <div className={styles.container}>
          <div className={styles.leftHeaderBlock}>
            <span className={styles.eyebrowPink}>OUR COMMITMENT</span>
            <h2 className={styles.sectionHeadingDark}>Our commitment to you.</h2>
          </div>

          <div className={styles.commitmentGrid}>
            <div className={styles.commitmentPhotoCard}>
              <img
                src="/img/about/10.png"
                alt="Customer support specialist wearing a headset at a workstation"
                className={styles.commitmentImg}
              />
              <div className={styles.commitmentOverlayBar}>
                <h3 className={styles.commitmentOverlayTitle}>Our ambition is straightforward.</h3>
                <p className={styles.commitmentOverlaySub}>
                  Make every wireless interaction easier and every connection more meaningful.
                </p>
              </div>
            </div>

            <div className={styles.commitmentSideStack}>
              <div className={styles.commitmentOutlineCard}>
                <div className={styles.commitmentRowHeader}>
                  <span className={`${styles.miniBadge} ${styles.badgePink}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <h3 className={styles.commitmentSideTitle}>Trust, earned</h3>
                </div>
                <p className={styles.commitmentSideDesc}>
                  We believe trust is earned through clear information, respectful support, and
                  continual improvement.
                </p>
              </div>

              <div className={styles.commitmentOutlineCard}>
                <div className={styles.commitmentRowHeader}>
                  <span className={`${styles.miniBadge} ${styles.badgePink}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <line x1="6" y1="19" x2="6" y2="13" />
                      <line x1="12" y1="19" x2="12" y2="9" />
                      <line x1="18" y1="19" x2="18" y2="5" />
                    </svg>
                  </span>
                  <h3 className={styles.commitmentSideTitle}>Service through network partners</h3>
                </div>
                <p className={styles.commitmentSideDesc}>
                  As a mobile virtual network operator, we deliver service through network partners;
                  coverage, speeds, and availability depend on location, device, plan, and network
                  conditions.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.finalCtaBanner}>
            <div className={styles.finalCtaTextCol}>
              <h2 className={styles.finalCtaTitle}>
                Find your fit.
                <br />
                Stay connected to what matters.
              </h2>
            </div>

            <div className={styles.finalCtaActions}>
              <a href="/wireless-plans" className={styles.btnCtaWhite}>
                Compare Wireless Plans <span aria-hidden="true">-&gt;</span>
              </a>
              <a href="/explore-community" className={styles.btnCtaOutline}>
                Explore Our Community
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;