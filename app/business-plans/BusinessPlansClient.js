"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Tag,
  BarChart2,
  FileText,
  Headphones,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Layers,
  Signal,
  Wifi,
  MessageSquare,
  Globe,
  Sparkles,
  Check,
  X,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowLeftRight,
  Trash2,
  Plus,
  Minus,
  Smartphone,
  User,
  Phone,
  AlertTriangle,
  CheckCircle,
  Info,
  MapPin,
} from "lucide-react";
import styles from "./BusinessPlans.module.css";

const businessPlans = [
  {
    id: "business-starter",
    name: "Business Starter",
    tagline: "Essential wireless for small teams.",
    price: 35,
    unit: "/ line per month",
    image: "/img/Business-Plans/bp2.png",
    specs: [
      {
        icon: Signal,
        label: "Premium data:",
        value: "15 GB per line, then speeds may reduce",
      },
      {
        icon: Wifi,
        label: "Mobile hotspot:",
        value: "10 GB per line",
      },
      {
        icon: MessageSquare,
        label: "Talk & text:",
        value: "see plan details",
      },
      {
        icon: Globe,
        label: "International:",
        value: "check destinations",
      },
      {
        icon: Users,
        label: "Team administration:",
        value: "being confirmed",
      },
      {
        icon: Headphones,
        label: "Support:",
        value: "account manager being confirmed",
      },
    ],
  },
  {
    id: "business-advanced",
    name: "Business Advanced",
    tagline: "More data for growing, collaborating teams.",
    price: 67,
    unit: "/ line per month",
    image: "/img/Business-Plans/bp3.png",
    specs: [
      {
        icon: Signal,
        label: "Premium data:",
        value: "35 GB per line, then speeds may reduce",
      },
      {
        icon: Wifi,
        label: "Mobile hotspot:",
        value: "20 GB per line",
      },
      {
        icon: MessageSquare,
        label: "Talk & text:",
        value: "see plan details",
      },
      {
        icon: Globe,
        label: "International:",
        value: "check destinations",
      },
      {
        icon: Users,
        label: "Team administration:",
        value: "being confirmed",
      },
      {
        icon: Headphones,
        label: "Support:",
        value: "hours being confirmed",
      },
    ],
  },
  {
    id: "business-infinite",
    name: "Business Infinite",
    tagline: "Our most complete plan for high-demand teams.",
    price: 74,
    unit: "/ line per month",
    image: "/img/Business-Plans/bp4.png",
    specs: [
      {
        icon: Signal,
        label: "Premium data:",
        value: '"Unlimited"* per line (policy being confirmed)',
      },
      {
        icon: Wifi,
        label: "Mobile hotspot:",
        value: "30 GB per line",
      },
      {
        icon: MessageSquare,
        label: "Talk & text:",
        value: "see plan details",
      },
      {
        icon: Globe,
        label: "International:",
        value: "check destinations",
      },
      {
        icon: Users,
        label: "Team administration:",
        value: "being confirmed",
      },
      {
        icon: Headphones,
        label: "Support:",
        value: "hours being confirmed",
      },
    ],
  },
];

const buyingSteps = [
  {
    step: "01",
    title: "Explore",
    description: "See the three plans and what each includes.",
    icon: Tag,
    isDark: false,
  },
  {
    step: "02",
    title: "Compare",
    description: "Line up data, hotspot, support and terms.",
    icon: ArrowLeftRight,
    isDark: false,
  },
  {
    step: "03",
    title: "Estimate",
    description: "Model your team's lines and monthly cost.",
    icon: Calculator,
    isDark: false,
  },
  {
    step: "04",
    title: "Verify",
    description: "We confirm your business and authorized buyer.",
    icon: ShieldCheck,
    isDark: false,
  },
  {
    step: "05",
    title: "Review terms",
    description: "See your verified quote, taxes and agreement.",
    icon: FileText,
    isDark: false,
  },
  {
    step: "06",
    title: "Activate",
    description: "Lines go live once our partner confirms them.",
    icon: CheckCircle2,
    isDark: true,
  },
];

const comparisonFeatures = [
  {
    name: "Price per line",
    starter: "$35/mo",
    advanced: "$67/mo",
    infinite: "$74/mo",
    isDifferent: true,
  },
  {
    name: "Premium data",
    starter: "15 GB per line, then speeds may reduce",
    advanced: "35 GB per line, then speeds may reduce",
    infinite: (
      <>
        &ldquo;Unlimited&rdquo;* <span className={styles.amberText}>(policy being confirmed)</span>
      </>
    ),
    isDifferent: true,
  },
  {
    name: "Mobile hotspot",
    starter: "10 GB per line",
    advanced: "20 GB per line",
    infinite: "30 GB per line",
    isDifferent: true,
  },
  {
    name: "Talk & text",
    starter: <span className={styles.amberText}>Being confirmed</span>,
    advanced: <span className={styles.amberText}>Being confirmed</span>,
    infinite: <span className={styles.amberText}>Being confirmed</span>,
    isDifferent: false,
  },
  {
    name: "International calling",
    starter: "Check destinations",
    advanced: "Check destinations",
    infinite: "Check destinations",
    isDifferent: false,
  },
  {
    name: "Team administration",
    starter: <span className={styles.amberText}>Being confirmed</span>,
    advanced: <span className={styles.amberText}>Being confirmed</span>,
    infinite: <span className={styles.amberText}>Being confirmed</span>,
    isDifferent: false,
  },
  {
    name: "Support",
    starter: (
      <>
        Account manager &amp; support: <span className={styles.amberText}>being confirmed</span>
      </>
    ),
    advanced: (
      <span className={styles.amberText}>Business support hours being confirmed</span>
    ),
    infinite: (
      <span className={styles.amberText}>Business support hours being confirmed</span>
    ),
    isDifferent: true,
  },
  {
    name: "Devices & extras",
    starter: (
      <>
        Dedicated business support &amp; account manager{" "}
        <span className={styles.amberText}>(eligibility being confirmed)</span>
      </>
    ),
    advanced: (
      <>
        Bring your own devices, or financing options{" "}
        <span className={styles.amberText}>(terms being confirmed)</span>
      </>
    ),
    infinite: (
      <>
        Zoiko Protect, optional at $9.99 per device per month{" "}
        <span className={styles.amberText}>(terms being confirmed)</span>
      </>
    ),
    isDifferent: true,
  },
  {
    name: "Taxes & fees",
    starter: "In your verified quote",
    advanced: "In your verified quote",
    infinite: "In your verified quote",
    isDifferent: false,
  },
  {
    name: "Agreement terms",
    starter: <span className={styles.amberText}>Being confirmed</span>,
    advanced: <span className={styles.amberText}>Being confirmed</span>,
    infinite: <span className={styles.amberText}>Being confirmed</span>,
    isDifferent: false,
  },
];

const businessFaqs = [
  {
    q: "Is there a contract?",
    a: "Agreement terms, including any minimum term or device commitments, are being confirmed and will be shown in your verified quote before you sign.",
  },
  {
    q: "How does invoicing work?",
    a: "Invoicing details and billing cycle options will be established in your verified business agreement. Monthly itemized statements are provided for all active lines.",
  },
  {
    q: "Are taxes included in the price?",
    a: "Published prices are per line before taxes and regulatory fees. All applicable local taxes and fees will be itemized clearly in your verified quote.",
  },
  {
    q: "Can we keep our numbers?",
    a: "Yes. You can port your existing business numbers to Zoiko Mobile smoothly with zero disruption to your daily operations.",
  },
  {
    q: "Which countries can we call?",
    a: "International calling and roaming options vary by destination. You can check specific country coverage and rates directly with our business sales team.",
  },
  {
    q: "What support do business customers get?",
    a: "Business customers receive dedicated support from our U.S.-based business team for expedited onboarding, account management, and line maintenance.",
  },
  {
    q: "Can we finance devices?",
    a: "Device financing and procurement options are available for eligible business accounts. Terms and device availability are reviewed during your quote process.",
  },
];

export default function BusinessPlansClient() {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const displayedFeatures = showDifferencesOnly
    ? comparisonFeatures.filter((f) => f.isDifferent)
    : comparisonFeatures;

  const toggleComparePlan = (planId) => {
    setSelectedPlans((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((id) => id !== planId);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 business plans at a time.");
        return prev;
      }
      return [...prev, planId];
    });
  };

  // Team Quote Builder State & Handlers
  const [quoteGroups, setQuoteGroups] = useState([
    { id: 1, plan: "business-starter", lines: 5, devices: "byod" },
  ]);

  const planPrices = {
    "business-starter": { name: "Business Starter", price: 35 },
    "business-advanced": { name: "Business Advanced", price: 67 },
    "business-infinite": { name: "Business Infinite", price: 74 },
  };

  const handlePlanChange = (id, newPlan) => {
    setQuoteGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, plan: newPlan } : g))
    );
  };

  const handleLinesChange = (id, delta) => {
    setQuoteGroups((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const updated = Math.max(1, Math.min(100, g.lines + delta));
          return { ...g, lines: updated };
        }
        return g;
      })
    );
  };

  const handleDevicesChange = (id, newDevices) => {
    setQuoteGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, devices: newDevices } : g))
    );
  };

  const handleAddGroup = () => {
    const nextId =
      quoteGroups.length > 0
        ? Math.max(...quoteGroups.map((g) => g.id)) + 1
        : 1;
    setQuoteGroups((prev) => [
      ...prev,
      { id: nextId, plan: "business-advanced", lines: 2, devices: "byod" },
    ]);
  };

  const handleRemoveGroup = (id) => {
    if (quoteGroups.length <= 1) return;
    setQuoteGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const totalQuoteLines = quoteGroups.reduce((acc, g) => acc + g.lines, 0);
  const totalQuoteMonthly = quoteGroups.reduce((acc, g) => {
    const p = planPrices[g.plan]?.price || 35;
    return acc + p * g.lines;
  }, 0);

  return (
    <div className={styles.pageWrapper}>
      {/* =========================================================
          HERO BANNER
         ========================================================= */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowBar} />
              <span>BUSINESS PLANS</span>
            </div>

            <h1 className={styles.heroTitle}>
              Wireless that works <br />
              for{" "}
              <span className={styles.heroTitleHighlight}>
                your business.
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Clear per-line pricing, team quotes and honest plan recommendations
              to keep your team connected and in control.
            </p>

            <div className={styles.heroActions}>
              <a href="#business-plans" className={styles.btnCompareBusiness}>
                <span>Compare Business Plans</span>
                <ChevronRight size={15} />
              </a>
              <Link href="#quote-builder" className={styles.btnBuildQuote}>
                <span>Build a Business Quote</span>
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Graphic with Businessman */}
          <div className={styles.heroImageWrapper}>
            <Image
              src="/img/Business-Plans/bp1.png"
              alt="Businessman in dark suit smiling holding smartphone in modern office"
              width={663}
              height={504}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>

        {/* Hero Bottom 5 Feature Pillars */}
        <div className={styles.heroPillarsBar}>
          <div className={styles.heroPillarsContainer}>
            <div className={styles.heroPillarItem}>
              <Users size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Team quotes</span>
                <span className={styles.pillarMuted}>Price every line</span>
              </div>
            </div>

            <div className={styles.heroPillarItem}>
              <Tag size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Per-line pricing</span>
                <span className={styles.pillarMuted}>Before taxes &amp; fees</span>
              </div>
            </div>

            <div className={styles.heroPillarItem}>
              <BarChart2 size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Usage insights</span>
                <span className={styles.pillarMuted}>Proposed for admins</span>
              </div>
            </div>

            <div className={styles.heroPillarItem}>
              <FileText size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Clear disclosures</span>
                <span className={styles.pillarMuted}>Broadband Facts per plan</span>
              </div>
            </div>

            <div className={styles.heroPillarItem}>
              <Headphones size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Business support</span>
                <span className={styles.pillarMuted}>Hours being confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MOBILE CATEGORY TABS (Strictly Mobile Only)
         ========================================================= */}
      <section className={`${styles.mobileTabsSection} ${styles.mobileOnly}`}>
        <div className={styles.mobileTabsContainer}>
          <div className={styles.mobileTabsCard}>
            <Link href="/prepaid-plans" className={styles.mobileTabLink}>
              Prepaid Plans
            </Link>
            <Link href="/postpaid-plans" className={styles.mobileTabLink}>
              Postpaid Plans
            </Link>
            <span
              className={`${styles.mobileTabLink} ${styles.mobileTabActive}`}
            >
              Business Plans
            </span>
            <Link href="/travel-plans" className={styles.mobileTabLink}>
              Travel Plans
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR BUSINESS PLANS SECTION
         ========================================================= */}
      <section id="business-plans" className={styles.businessPlansSection}>
        <div className={styles.sectionContainer}>
          {/* Section Header with Monthly / Compare Controls */}
          <div className={styles.sectionHeaderRow}>
            <div className={styles.sectionTitleBox}>
              <h2 className={styles.sectionHeading}>Our business plans</h2>
              <p className={styles.sectionSubheading}>
                Choose the right plan for your team, with clear per-line pricing.
              </p>
            </div>

            <div className={styles.headerControls}>
              <button
                type="button"
                className={styles.btnPricePerLineActive}
              >
                <RefreshCw size={13} />
                <span>Monthly price per line</span>
              </button>
              <button
                type="button"
                className={styles.btnCompareHeader}
                onClick={() => {
                  const el = document.getElementById("compare-plans-bar");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Layers size={13} />
                <span>Compare plans</span>
              </button>
            </div>
          </div>

          {/* Main Layout: 3 Plan Cards (Left) + Sidebar (Right) */}
          <div className={styles.mainPlansLayout}>
            {/* Left: 3 Business Plan Cards */}
            <div className={styles.plansGrid}>
              {businessPlans.map((plan) => {
                const isChecked = selectedPlans.includes(plan.id);
                return (
                  <div key={plan.id} className={styles.planCard}>
                    {/* Header Image */}
                    <div className={styles.cardImgWrapper}>
                      <Image
                        src={plan.image}
                        alt={plan.name}
                        width={303}
                        height={150}
                        className={styles.cardHeaderImg}
                      />
                      <svg
                        className={`${styles.cardWaveSvg} ${styles.mobileOnly}`}
                        viewBox="0 0 500 40"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,20 C150,40 350,0 500,20"
                          fill="none"
                          stroke={
                            plan.id === "business-starter"
                              ? "#10B981"
                              : plan.id === "business-advanced"
                              ? "#E5195E"
                              : "#8B5CF6"
                          }
                          strokeWidth="4"
                        />
                      </svg>
                    </div>

                    {/* Card Content Body */}
                    <div className={styles.cardBody}>
                      <h3 className={styles.planCardTitle}>{plan.name}</h3>
                      <p className={styles.planCardTagline}>{plan.tagline}</p>

                      {/* Price Row */}
                      <div className={styles.priceRow}>
                        <span className={styles.priceValue}>${plan.price}</span>
                        <span className={styles.priceUnit}>{plan.unit}</span>
                      </div>

                      {/* Specs List */}
                      <ul className={styles.specsList}>
                        {plan.specs.map((spec, sIdx) => {
                          const SpecIcon = spec.icon;
                          return (
                            <li key={sIdx} className={styles.specItem}>
                              <SpecIcon size={14} className={styles.specIcon} />
                              <span className={styles.specLabel}>
                                {spec.label}
                              </span>{" "}
                              <span className={styles.specValue}>
                                {spec.value}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Utility Row: Compare Checkbox & Broadband Facts */}
                      <div className={styles.cardUtilityRow}>
                        <label className={styles.compareCheckboxLabel}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleComparePlan(plan.id)}
                            className={styles.checkboxInput}
                          />
                          <span>Compare</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setActiveModal(plan)}
                          className={styles.broadbandFactsLink}
                        >
                          Broadband Facts
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className={styles.cardActionButtons}>
                        <button
                          type="button"
                          onClick={() => setActiveModal(plan)}
                          className={styles.btnPlanDetails}
                        >
                          Plan details
                        </button>
                        <button
                          type="button"
                          className={styles.btnBuyPlan}
                        >
                          <span>Buy this plan</span>
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Sidebar Column */}
            <aside className={styles.sidebarColumn}>
              {/* Card 1: Zoiko Plan Fit for Business */}
              <div className={styles.planFitBusinessCard}>
                <div className={styles.planFitHeaderRow}>
                  <div className={styles.planFitTitle}>
                    <Sparkles size={14} className={styles.planFitSparkle} />
                    <span>Zoiko Plan Fit for Business</span>
                  </div>
                  <span className={styles.proposedBadge}>Proposed</span>
                </div>

                <p className={styles.planFitDesc}>
                  Answer five quick questions for a recommendation with clear
                  reasons. It can also tell you to keep your current plan.
                </p>

                <ul className={styles.planFitPointsList}>
                  <li className={styles.planFitPointItem}>
                    <div className={styles.pinkCheckCircle}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span>Based on your team&apos;s needs, not upsells</span>
                  </li>
                  <li className={styles.planFitPointItem}>
                    <div className={styles.pinkCheckCircle}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span>Explains trade-offs and confidence</span>
                  </li>
                  <li className={styles.planFitPointItem}>
                    <div className={styles.pinkCheckCircle}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span>No account or personal data needed</span>
                  </li>
                </ul>

                <button type="button" className={styles.btnFindBusinessPlan}>
                  <span>Find my business plan</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Card 2: Usage review for admins */}
              <div className={styles.usageReviewCard}>
                <div className={styles.usageReviewIconBox}>
                  <BarChart2 size={18} />
                </div>
                <div className={styles.usageReviewTextBox}>
                  <div className={styles.usageReviewTitleRow}>
                    <h4 className={styles.usageReviewTitle}>
                      Usage review for admins
                    </h4>
                    <span className={styles.proposedBadgeSmall}>Proposed</span>
                  </div>
                  <p className={styles.usageReviewDesc}>
                    Authorized admins will be able to review grouped line usage and
                    see if a plan change makes sense. No changes happen without
                    your approval.
                  </p>
                </div>
              </div>

              {/* Card 3: Team Quote Builder */}
              <div id="quote-builder" className={styles.teamQuoteCard}>
                <div className={styles.teamQuoteIconBox}>
                  <Calculator size={18} />
                </div>
                <div className={styles.teamQuoteTextBox}>
                  <h4 className={styles.teamQuoteTitle}>Team Quote Builder</h4>
                  <p className={styles.teamQuoteSubtitle}>
                    Set up lines by plan and see an estimated total.
                  </p>
                </div>
                <div className={styles.teamQuoteArrowCircle}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </aside>
          </div>

          {/* Mobile Inline Compare Card (Mobile Only) */}
          <div className={`${styles.mobileCompareCard} ${styles.mobileOnly}`}>
            <div className={styles.compareBarLeft}>
              <div className={styles.compareIconBox}>
                <Layers size={18} />
              </div>
              <span className={styles.compareTitle}>Compare Plans</span>
            </div>
            <p className={styles.compareSubtitle}>
              Select up to 3 plans to compare data, hotspot, price and support
              side by side.
            </p>
            <button
              type="button"
              className={`${styles.btnCompareSelected} ${
                selectedPlans.length > 0 ? styles.btnCompareSelectedActive : ""
              }`}
              onClick={() => {
                if (selectedPlans.length === 0) {
                  alert("Please check at least 1 plan to compare.");
                }
              }}
            >
              <span>Compare selected ( {selectedPlans.length} / 3 )</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Pricing Legal Disclaimer */}
          <div className={styles.pricingDisclaimer}>
            Published prices as of Nov 12, 2026, per line per month, before taxes,
            regulatory fees and any one-time charges. After premium data, speeds may
            be reduced as set by the network partner. *&ldquo;Unlimited premium
            data&rdquo; on Business Infinite is subject to the plan&apos;s data
            policy, which is being confirmed. Your final price comes from a
            verified quote.
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW BUSINESS BUYING WORKS (6 CLEAR STEPS)
         ========================================================= */}
      <section className={styles.buyingWorksSection}>
        <div className={styles.buyingWorksContainer}>
          <div className={styles.sectionEyebrow}>HOW BUSINESS BUYING WORKS</div>
          <h2 className={styles.sectionHeading}>
            From first look to active lines, in six clear steps.
          </h2>

          <div className={styles.stepsGrid}>
            {buyingSteps.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div
                  key={idx}
                  className={`${styles.stepCard} ${
                    s.isDark ? styles.stepCardDark : ""
                  }`}
                >
                  <div className={styles.stepHeaderRow}>
                    <div
                      className={`${styles.stepIconWrap} ${
                        s.isDark ? styles.stepIconWrapDark : ""
                      }`}
                    >
                      <IconComp size={15} />
                    </div>
                    <span
                      className={`${styles.stepNumber} ${
                        s.isDark ? styles.stepNumberDark : ""
                      }`}
                    >
                      {s.step}
                    </span>
                  </div>

                  <h3
                    className={`${styles.stepTitle} ${
                      s.isDark ? styles.stepTitleDark : ""
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`${styles.stepDesc} ${
                      s.isDark ? styles.stepDescDark : ""
                    }`}
                  >
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className={styles.stepsFootnote}>
            If your request can&apos;t be quoted automatically, it goes to our
            business sales team. We never show an order as placed until it&apos;s
            authorized and confirmed.
          </p>
        </div>
      </section>

      {/* =========================================================
          BUSINESS PLAN COMPARISON TABLE
         ========================================================= */}
      <section id="business-plan-comparison" className={styles.comparisonSection}>
        <div className={styles.comparisonContainer}>
          <div className={styles.comparisonHeaderRow}>
            <div>
              <div className={styles.sectionEyebrow}>
                BUSINESS PLAN COMPARISON
              </div>
              <h2 className={styles.sectionHeading}>
                All three plans, side by side.
              </h2>
              <p className={styles.comparisonSubheading}>
                Same snapshot, same per-line basis and the same definitions for
                every plan.
              </p>
            </div>

            <label className={styles.diffOnlyToggle}>
              <input
                type="checkbox"
                checked={showDifferencesOnly}
                onChange={(e) => setShowDifferencesOnly(e.target.checked)}
                className={styles.diffCheckbox}
              />
              <span className={styles.diffLabel}>Show differences only</span>
            </label>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th className={styles.thFeature}>FEATURE</th>
                  <th className={styles.thPlan}>
                    <span className={styles.thPlanTitle}>Business Starter</span>
                    <span className={styles.thPlanPrice}>$35/line/mo</span>
                  </th>
                  <th className={styles.thPlan}>
                    <span className={styles.thPlanTitle}>Business Advanced</span>
                    <span className={styles.thPlanPrice}>$67/line/mo</span>
                  </th>
                  <th className={styles.thPlan}>
                    <span className={styles.thPlanTitle}>Business Infinite</span>
                    <span className={styles.thPlanPrice}>$74/line/mo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedFeatures.map((row, idx) => (
                  <tr key={idx} className={styles.tableRow}>
                    <td className={styles.tdFeatureName}>{row.name}</td>
                    <td className={styles.tdFeatureVal}>{row.starter}</td>
                    <td className={styles.tdFeatureVal}>{row.advanced}</td>
                    <td className={styles.tdFeatureVal}>{row.infinite}</td>
                  </tr>
                ))}
                <tr className={styles.tableActionRow}>
                  <td className={styles.tdFeatureName}></td>
                  <td className={styles.tdFeatureVal}>
                    <button
                      type="button"
                      className={styles.btnBuildQuote}
                      onClick={() => alert("Quote Builder for Business Starter")}
                    >
                      Build a quote
                    </button>
                  </td>
                  <td className={styles.tdFeatureVal}>
                    <button
                      type="button"
                      className={styles.btnBuildQuote}
                      onClick={() => alert("Quote Builder for Business Advanced")}
                    >
                      Build a quote
                    </button>
                  </td>
                  <td className={styles.tdFeatureVal}>
                    <button
                      type="button"
                      className={styles.btnBuildQuote}
                      onClick={() => alert("Quote Builder for Business Infinite")}
                    >
                      Build a quote
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.comparisonFootnote}>
            Published snapshot Nov 12, 2026. Amber values aren&apos;t verified
            yet. *Business Infinite&apos;s &ldquo;unlimited premium data&rdquo;
            isn&apos;t the same as unconditional unlimited high-speed data; its
            policy is being confirmed.
          </p>
        </div>
      </section>

      {/* =========================================================
          TEAM QUOTE BUILDER
         ========================================================= */}
      <section id="quote-builder-section" className={styles.quoteBuilderSection}>
        <div className={styles.quoteBuilderContainer}>
          <div className={styles.sectionEyebrow}>TEAM QUOTE BUILDER</div>
          <h2 className={styles.sectionHeading}>
            Set up your team and see an estimate.
          </h2>
          <p className={styles.sectionSubheading}>
            Add lines by plan. This is an estimate from published prices; a
            verified quote with taxes and fees comes from our business team.
          </p>

          <div className={styles.quoteBuilderLayout}>
            {/* Left Column: Plan groups & inputs */}
            <div className={styles.quoteBuilderLeft}>
              <div className={styles.quoteBuilderCard}>
                <div className={styles.quoteGroupHeader}>
                  <span className={styles.quoteHeaderCol}>Plan</span>
                  <span className={styles.quoteHeaderCol}>Lines</span>
                  <span className={styles.quoteHeaderCol}>Devices</span>
                  <span className={styles.quoteHeaderCol}>Monthly estimate</span>
                </div>

                <div className={styles.quoteGroupsList}>
                  {quoteGroups.map((g) => {
                    const groupPrice =
                      (planPrices[g.plan]?.price || 35) * g.lines;
                    return (
                      <div key={g.id} className={styles.quoteGroupRow}>
                        <div className={styles.quotePlanSelectWrap}>
                          <span
                            className={`${styles.mobileFieldLabel} ${styles.mobileOnly}`}
                          >
                            Plan
                          </span>
                          <select
                            value={g.plan}
                            onChange={(e) =>
                              handlePlanChange(g.id, e.target.value)
                            }
                            className={styles.quoteSelect}
                          >
                            <option value="business-starter">
                              Business Starter · $35/line
                            </option>
                            <option value="business-advanced">
                              Business Advanced · $67/line
                            </option>
                            <option value="business-infinite">
                              Business Infinite · $74/line
                            </option>
                          </select>
                        </div>

                        <div className={styles.quoteFieldColLines}>
                          <span
                            className={`${styles.mobileFieldLabel} ${styles.mobileOnly}`}
                          >
                            Lines
                          </span>
                          <div className={styles.quoteCounterWrap}>
                            <button
                              type="button"
                              className={styles.btnCounter}
                              onClick={() => handleLinesChange(g.id, -1)}
                              disabled={g.lines <= 1}
                            >
                              <Minus size={13} />
                            </button>
                            <span className={styles.counterVal}>{g.lines}</span>
                            <button
                              type="button"
                              className={styles.btnCounter}
                              onClick={() => handleLinesChange(g.id, 1)}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>

                        <div className={styles.quoteDevicesWrap}>
                          <span
                            className={`${styles.mobileFieldLabel} ${styles.mobileOnly}`}
                          >
                            Devices
                          </span>
                          <select
                            value={g.devices}
                            onChange={(e) =>
                              handleDevicesChange(g.id, e.target.value)
                            }
                            className={styles.quoteSelect}
                          >
                            <option value="byod">Bring our own phones</option>
                            <option value="new">Need new phones</option>
                            <option value="mix">Mix of both</option>
                          </select>
                        </div>

                        <div className={styles.quoteMonthlyVal}>
                          <span className={styles.quoteMonthlySmall}>
                            Monthly estimate
                          </span>
                          ${groupPrice.toFixed(2)}
                        </div>

                        {quoteGroups.length > 1 && (
                          <button
                            type="button"
                            className={styles.btnRemoveGroup}
                            onClick={() => handleRemoveGroup(g.id)}
                            title="Remove group"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className={styles.btnAddGroup}
                  onClick={handleAddGroup}
                >
                  <Plus size={14} />
                  <span>Add another plan group</span>
                </button>
              </div>

              <p className={styles.quoteMixingDisclaimer}>
                Mixing plans on one business account is being confirmed. Some
                combinations may need our sales team.
              </p>
            </div>

            {/* Right Column: Your team estimate card */}
            <div className={styles.quoteBuilderRight}>
              <div className={styles.estimateCard}>
                <div className={styles.estimateCardHeader}>
                  <Smartphone
                    size={16}
                    className={styles.estimateHeaderIcon}
                  />
                  <span className={styles.estimateCardTitle}>
                    Your team estimate
                  </span>
                </div>

                <div className={styles.estimateCardBody}>
                  <div className={styles.estimateStatusBox}>
                    <span className={styles.estimateStatusDot} />
                    <p className={styles.estimateStatusText}>
                      <strong>Estimate ready:</strong> Based on published
                      prices. A verified quote adds taxes, fees and any eligible
                      discounts.
                    </p>
                  </div>

                  <div className={styles.estimateSummaryList}>
                    {quoteGroups.map((g) => {
                      const p = planPrices[g.plan]?.name || "Business Starter";
                      const cost =
                        (planPrices[g.plan]?.price || 35) * g.lines;
                      return (
                        <div key={g.id} className={styles.estimateSummaryRow}>
                          <span className={styles.estimateItemLabel}>
                            {p} &times; {g.lines}
                          </span>
                          <span className={styles.estimateItemVal}>
                            ${cost.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}

                    <div className={styles.estimateSummaryRow}>
                      <span className={styles.estimateItemLabel}>
                        Taxes &amp; regulatory fees
                      </span>
                      <span className={styles.estimateItemMuted}>
                        In your verified quote
                      </span>
                    </div>

                    <div className={styles.estimateSummaryRow}>
                      <span className={styles.estimateItemLabel}>
                        One-time charges
                      </span>
                      <span className={styles.estimateItemMuted}>
                        In your verified quote
                      </span>
                    </div>

                    <div className={styles.estimateSummaryRow}>
                      <span className={styles.estimateItemLabel}>
                        Discounts
                      </span>
                      <span className={styles.estimateItemAmber}>
                        Only if eligible, shown in quote
                      </span>
                    </div>
                  </div>

                  <div className={styles.estimateTotalBox}>
                    <div className={styles.estimateTotalLeft}>
                      <span className={styles.estimateTotalTitle}>
                        Estimated monthly
                      </span>
                      <span className={styles.estimateTotalSubtitle}>
                        {totalQuoteLines} lines &middot; before taxes &amp; fees
                      </span>
                    </div>
                    <div className={styles.estimateTotalAmount}>
                      ${totalQuoteMonthly.toFixed(2)}
                    </div>
                  </div>

                  <p className={styles.estimateDisclaimerText}>
                    This is an estimate, not a purchasable quote. No order,
                    payment or credit check happens here.
                  </p>

                  <button
                    type="button"
                    className={styles.btnRequestQuote}
                    onClick={() =>
                      alert(
                        `Verified quote requested for ${totalQuoteLines} lines ($${totalQuoteMonthly.toFixed(
                          2
                        )}/mo). Our business sales team will contact you.`
                      )
                    }
                  >
                    Request a verified quote
                  </button>

                  <a
                    href="tel:800-588-3116"
                    className={styles.estimatePhoneLink}
                  >
                    Or talk to business sales: 800-588-3116
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOR BUSINESS ADMINS · PROPOSED
         ========================================================= */}
      <section className={styles.adminSection}>
        <div className={styles.adminContainer}>
          <div className={styles.adminHeaderRow}>
            <div>
              <div className={styles.sectionEyebrow}>
                FOR BUSINESS ADMINS &middot; PROPOSED
              </div>
              <h2 className={styles.sectionHeading}>
                Usage review and protected plan changes.
              </h2>
              <p className={styles.sectionSubheading}>
                Authorized admins can review grouped line usage and approve
                changes. Nothing changes without your approval.
              </p>
            </div>

            <button
              type="button"
              className={styles.btnAdminOutline}
              onClick={() => alert("Admin sign in (preview)")}
            >
              <User size={14} />
              <span>Admin sign in (preview)</span>
            </button>
          </div>

          <div className={styles.adminCard}>
            <div className={styles.adminImageWrap}>
              <Image
                src="/img/Business-Plans/bp5.png"
                alt="Authorized business admin reviewing usage"
                width={679}
                height={510}
                className={`${styles.adminImage} ${styles.desktopOnly}`}
              />
              <Image
                src="/img/Business-Plans/bp8.png"
                alt="Authorized business admin workspace"
                width={309}
                height={240}
                className={`${styles.adminImage} ${styles.mobileOnly}`}
              />
            </div>

            <div className={styles.adminContent}>
              <h3 className={styles.adminContentTitle}>
                Sign in as an authorized admin
              </h3>
              <p className={styles.adminContentDesc}>
                Only owners and billing or line admins can see usage. Employees
                never see each other&apos;s data, and numbers are always masked.
              </p>
              <button
                type="button"
                className={styles.btnAdminSignIn}
                onClick={() => alert("Sign in (preview)")}
              >
                Sign in (preview)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BUSINESS SUPPORT & DISCLOSURES (3 CARDS)
         ========================================================= */}
      <section className={styles.supportCardsSection}>
        <div className={styles.supportCardsContainer}>
          <div className={styles.supportCardsGrid}>
            {/* Card 1: Business Support */}
            <div className={styles.supportCard}>
              <div className={styles.supportCardImageWrap}>
                <Image
                  src="/img/Business-Plans/bp6.png"
                  alt="Business support specialist"
                  width={439}
                  height={220}
                  className={`${styles.supportCardImage} ${styles.desktopOnly}`}
                />
                <Image
                  src="/img/Business-Plans/bp9.png"
                  alt="Business support specialist"
                  width={320}
                  height={220}
                  className={`${styles.supportCardImage} ${styles.mobileOnly}`}
                />
              </div>
              <div className={styles.supportCardContent}>
                <h3 className={styles.supportCardTitle}>Business support</h3>
                <p className={styles.supportCardDesc}>
                  A U.S.-based team for plans, quotes, porting and billing.
                  Hours and account-manager eligibility are being confirmed.
                </p>
                <a
                  href="tel:800-588-3116"
                  className={styles.btnSupportCardPhone}
                >
                  <Phone size={13} />
                  <span>800-588-3116</span>
                </a>
              </div>
            </div>

            {/* Card 2: What we promise, and what we don't */}
            <div className={styles.promiseCard}>
              <h3 className={styles.promiseCardTitle}>
                What we promise, and what we don&apos;t
              </h3>
              <ul className={styles.promiseList}>
                <li className={styles.promiseItem}>
                  <CheckCircle
                    size={16}
                    className={styles.promiseGreenIcon}
                  />
                  <span>
                    Per-line prices shown before taxes and fees, with a verified
                    quote before you commit.
                  </span>
                </li>
                <li className={styles.promiseItem}>
                  <CheckCircle
                    size={16}
                    className={styles.promiseGreenIcon}
                  />
                  <span>
                    Every plan change needs an authorized admin&apos;s approval.
                  </span>
                </li>
                <li className={styles.promiseItem}>
                  <CheckCircle
                    size={16}
                    className={styles.promiseGreenIcon}
                  />
                  <span>
                    Business usage data is only visible to authorized roles.
                  </span>
                </li>
                <li className={styles.promiseItem}>
                  <AlertTriangle
                    size={16}
                    className={styles.promiseAmberIcon}
                  />
                  <span>
                    We don&apos;t promise speeds, coverage everywhere, or
                    support response times until they&apos;re verified.
                  </span>
                </li>
                <li className={styles.promiseItem}>
                  <AlertTriangle
                    size={16}
                    className={styles.promiseAmberIcon}
                  />
                  <span>
                    Discounts or savings appear only when your account is
                    eligible.
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 3: Disclosures for each plan */}
            <div className={styles.disclosuresCard}>
              <h3 className={styles.disclosuresCardTitle}>
                Disclosures for each plan
              </h3>
              <div className={styles.disclosuresList}>
                <button
                  type="button"
                  className={styles.disclosureRow}
                  onClick={() => setActiveModal(businessPlans[0])}
                >
                  <div className={styles.disclosureLeft}>
                    <FileText size={15} className={styles.disclosureIcon} />
                    <span className={styles.disclosureLabel}>
                      Broadband Facts &middot; Business Starter
                    </span>
                  </div>
                  <ChevronRight size={14} className={styles.disclosureChevron} />
                </button>

                <button
                  type="button"
                  className={styles.disclosureRow}
                  onClick={() => setActiveModal(businessPlans[1])}
                >
                  <div className={styles.disclosureLeft}>
                    <FileText size={15} className={styles.disclosureIcon} />
                    <span className={styles.disclosureLabel}>
                      Broadband Facts &middot; Business Advanced
                    </span>
                  </div>
                  <ChevronRight size={14} className={styles.disclosureChevron} />
                </button>

                <button
                  type="button"
                  className={styles.disclosureRow}
                  onClick={() => setActiveModal(businessPlans[2])}
                >
                  <div className={styles.disclosureLeft}>
                    <FileText size={15} className={styles.disclosureIcon} />
                    <span className={styles.disclosureLabel}>
                      Broadband Facts &middot; Business Infinite
                    </span>
                  </div>
                  <ChevronRight size={14} className={styles.disclosureChevron} />
                </button>

                <button
                  type="button"
                  className={styles.disclosureRow}
                  onClick={() => alert("Coverage Map Preview: 5G & 4G LTE nationwide coverage.")}
                >
                  <div className={styles.disclosureLeft}>
                    <MapPin size={15} className={styles.disclosureIcon} />
                    <span className={styles.disclosureLabel}>
                      Coverage map
                    </span>
                  </div>
                  <ChevronRight size={14} className={styles.disclosureChevron} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TWO HORIZONTAL TRUST & FEATURE BARS
         ========================================================= */}
      <section className={styles.trustBarsSection}>
        <div className={styles.trustBarsContainer}>
          {/* Top Bar: 6 Features */}
          <div className={styles.featuresBar}>
            <div className={styles.featureBarItem}>
              <Users size={18} className={styles.featureBarIcon} />
              <div className={styles.featureBarTextBox}>
                <span className={styles.featureBarTitle}>Built for teams</span>
                <span className={styles.featureBarDesc}>
                  From a few lines to a growing business.
                </span>
              </div>
            </div>

            <div className={styles.featureBarItem}>
              <Tag size={18} className={styles.featureBarIcon} />
              <div className={styles.featureBarTextBox}>
                <span className={styles.featureBarTitle}>Predictable billing</span>
                <span className={styles.featureBarDesc}>
                  Per-line pricing, shown before you commit.
                </span>
              </div>
            </div>

            <div className={styles.featureBarItem}>
              <ArrowLeftRight size={18} className={styles.featureBarIcon} />
              <div className={styles.featureBarTextBox}>
                <span className={styles.featureBarTitle}>Flexible terms</span>
                <span className={styles.featureBarDesc}>
                  Agreement terms shown in your quote.
                </span>
              </div>
            </div>

            <div className={styles.featureBarItem}>
              <BarChart2 size={18} className={styles.featureBarIcon} />
              <div className={styles.featureBarTextBox}>
                <span className={styles.featureBarTitle}>Usage control</span>
                <span className={styles.featureBarDesc}>
                  Admin tools being confirmed.
                </span>
              </div>
            </div>

            <div className={styles.featureBarItem}>
              <ShieldCheck size={18} className={styles.featureBarIcon} />
              <div className={styles.featureBarTextBox}>
                <span className={styles.featureBarTitle}>Secure accounts</span>
                <span className={styles.featureBarDesc}>
                  Role-based access for admins.
                </span>
              </div>
            </div>

            <div className={styles.featureBarItem}>
              <Headphones size={18} className={styles.featureBarIcon} />
              <div className={styles.featureBarTextBox}>
                <span className={styles.featureBarTitle}>Business support</span>
                <span className={styles.featureBarDesc}>
                  U.S.-based team, hours being confirmed.
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Trusted and transparent */}
          <div className={styles.disclosuresBar}>
            <span className={styles.disclosuresBarTitle}>
              Trusted and transparent
            </span>

            <div className={styles.disclosuresBarList}>
              <div className={styles.disclosuresBarItem}>
                <FileText size={16} className={styles.disclosuresBarIcon} />
                <div className={styles.disclosuresBarTextBox}>
                  <span className={styles.disclosuresBarItemTitle}>
                    Broadband Facts
                  </span>
                  <span className={styles.disclosuresBarItemDesc}>
                    A label for each plan
                  </span>
                </div>
              </div>

              <div className={styles.disclosuresBarItem}>
                <FileText size={16} className={styles.disclosuresBarIcon} />
                <div className={styles.disclosuresBarTextBox}>
                  <span className={styles.disclosuresBarItemTitle}>
                    Plan terms &amp; conditions
                  </span>
                  <span className={styles.disclosuresBarItemDesc}>
                    Pricing, fees and service terms
                  </span>
                </div>
              </div>

              <div className={styles.disclosuresBarItem}>
                <Tag size={16} className={styles.disclosuresBarIcon} />
                <div className={styles.disclosuresBarTextBox}>
                  <span className={styles.disclosuresBarItemTitle}>
                    Taxes &amp; regulatory fees
                  </span>
                  <span className={styles.disclosuresBarItemDesc}>
                    What&apos;s included and what may apply
                  </span>
                </div>
              </div>

              <div className={styles.disclosuresBarItem}>
                <Info size={16} className={styles.disclosuresBarIcon} />
                <div className={styles.disclosuresBarTextBox}>
                  <span className={styles.disclosuresBarItemTitle}>
                    Important disclosures
                  </span>
                  <span className={styles.disclosuresBarItemDesc}>
                    Data policy and international calling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ / QUESTIONS SECTION
         ========================================================= */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.sectionEyebrow}>QUESTIONS</div>
          <h2 className={styles.sectionHeading}>
            Business plan questions, answered.
          </h2>

          <div className={styles.faqLayout}>
            {/* Left Column: Support Sales Card */}
            <div className={styles.faqSupportCard}>
              <div className={styles.faqSupportImageWrap}>
                <Image
                  src="/img/Business-Plans/bp7.png"
                  alt="Friendly business support representative"
                  width={664}
                  height={374}
                  className={`${styles.faqSupportImage} ${styles.desktopOnly}`}
                />
                <Image
                  src="/img/Business-Plans/bp10.png"
                  alt="Friendly business support representative"
                  width={340}
                  height={192}
                  className={`${styles.faqSupportImage} ${styles.mobileOnly}`}
                />
              </div>

              <div className={styles.faqSupportContent}>
                <h3 className={styles.faqSupportTitle}>Talk to business sales</h3>
                <p className={styles.faqSupportDesc}>
                  We&apos;ll help you plan lines, devices and numbers for your
                  team.
                </p>
                <a
                  href="tel:800-588-3116"
                  className={styles.btnFaqPhone}
                >
                  <Phone size={13} />
                  <span>800-588-3116</span>
                </a>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className={styles.faqAccordionList}>
              {businessFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`${styles.faqItem} ${
                      isOpen ? styles.faqItemOpen : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={styles.faqQuestionBtn}
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? -1 : idx)
                      }
                      aria-expanded={isOpen}
                    >
                      <span className={styles.faqQuestionText}>{faq.q}</span>
                      <span
                        className={`${styles.faqToggleIcon} ${
                          isOpen ? styles.faqToggleIconOpen : ""
                        }`}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className={styles.faqAnswerBody}>
                        <p className={styles.faqAnswerText}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STICKY BOTTOM COMPARE PLANS BAR
         ========================================================= */}
      <div id="compare-plans-bar" className={styles.compareBarFixed}>
        <div className={styles.compareBarContainer}>
          <div className={styles.compareBarLeft}>
            <div className={styles.compareIconBox}>
              <Layers size={18} />
            </div>
            <span className={styles.compareTitle}>Compare Plans</span>
          </div>

          <p className={styles.compareSubtitle}>
            Select up to 3 plans to compare data, hotspot, price and support side
            by side.
          </p>

          <button
            type="button"
            className={`${styles.btnCompareSelected} ${
              selectedPlans.length > 0 ? styles.btnCompareSelectedActive : ""
            }`}
            onClick={() => {
              if (selectedPlans.length === 0) {
                alert("Please check at least 1 plan to compare.");
              }
            }}
          >
            <span>Compare selected ( {selectedPlans.length} / 3 )</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* =========================================================
          BROADBAND FACTS / PLAN DETAILS MODAL
         ========================================================= */}
      {activeModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveModal(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleRow}>
                <h3 className={styles.modalTitle}>{activeModal.name}</h3>
                <span className={styles.modalTag}>Business</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalTagline}>{activeModal.tagline}</p>

              <div className={styles.modalPriceBox}>
                <span className={styles.modalPriceValue}>
                  ${activeModal.price}
                </span>
                <span className={styles.modalPriceUnit}>
                  {activeModal.unit}
                </span>
              </div>

              <div className={styles.modalSpecsList}>
                {activeModal.specs.map((spec, idx) => (
                  <div key={idx} className={styles.modalSpecItem}>
                    <strong>{spec.label}</strong> {spec.value}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className={styles.btnModalClose}
              >
                Close
              </button>
              <button
                type="button"
                className={styles.btnModalConfirm}
                onClick={() => setActiveModal(null)}
              >
                Choose plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
