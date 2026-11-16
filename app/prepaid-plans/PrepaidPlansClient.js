"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Signal,
  MessageSquare,
  Wifi,
  Globe,
  Smartphone,
  Layers,
  ChevronRight,
  CreditCard,
  Calendar,
  FileText,
  ShieldCheck,
  Tag,
  RefreshCw,
  Headphones,
  BarChart2,
  Phone,
  Plus,
  Minus,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Plane,
} from "lucide-react";
import styles from "./PrepaidPlans.module.css";

const plansCategories = [
  { id: "prepaid", label: "Prepaid Plans", active: true },
  { id: "postpaid", label: "Postpaid Plans", href: "/postpaid-plans" },
  { id: "business", label: "Business Plans", href: "/business-plans" },
  { id: "travel", label: "Travel Plans", href: "/travel-plans" },
];

const standardPlans = [
  {
    id: "zoiko-flex",
    name: "Zoiko Flex",
    badgeColor: "#16A34A",
    price: 13,
    period: "/mo",
    tagline: "A simple, affordable plan for everyday essentials.",
    image: "/img/Prepaid-Plans/pp2.png",
    data: "6GB premium-speed data, then reduced speeds",
    talkText: "see plan details",
    hotspot: "1GB mobile hotspot",
    countries: "Calls to 70+ countries* (list being verified)",
    sim: "SIM or eSIM",
  },
  {
    id: "zoiko-essentials",
    name: "Zoiko Essentials",
    badgeColor: "#EA580C",
    price: 20,
    period: "/mo",
    tagline: "More data and calling for your connected life.",
    image: "/img/Prepaid-Plans/pp3.png",
    data: "6GB premium-speed data, then reduced speeds",
    talkText: "see plan details",
    hotspot: "3GB mobile hotspot",
    countries: "Calls to 100+ countries* (list being verified)",
    sim: "SIM or eSIM",
  },
  {
    id: "zoiko-unlimited-one",
    name: "Zoiko Unlimited One",
    badgeColor: "#E11D48",
    price: 30,
    period: "/mo",
    tagline: "Extra flexibility for work, play and travel.",
    image: "/img/Prepaid-Plans/pp4.png",
    data: "12GB premium-speed data, then reduced speeds",
    talkText: "see plan details",
    hotspot: "5GB mobile hotspot",
    countries: "Calls to 120+ countries* (list being verified)",
    sim: "SIM or eSIM",
  },
];

const widePlans = [
  {
    id: "zoiko-unlimited-plus",
    name: "Zoiko Unlimited Plus",
    badgeColor: "#6366F1",
    price: 45,
    period: "/mo",
    tagline: "More premium data and hotspot for heavy users.",
    image: "/img/Prepaid-Plans/pp5.png",
    data: "20GB premium-speed data, then reduced speeds",
    talkText: "see plan details",
    hotspot: "12GB mobile hotspot",
    countries: "Calls to 200+ countries* (list being verified)",
    sim: "SIM or eSIM",
  },
  {
    id: "zoiko-premium-unlimited",
    name: "Zoiko Premium Unlimited",
    badgeColor: "#2563EB",
    price: 55,
    period: "/mo",
    tagline: "Our most complete prepaid plan, with the most hotspot.",
    image: "/img/Prepaid-Plans/pp6.png",
    data: "32GB premium-speed data, then reduced speeds",
    talkText: "see plan details",
    hotspot: "22GB mobile hotspot",
    countries: "Calls to 220+ countries* (list being verified)",
    sim: "SIM or eSIM",
  },
];

const quickChecks = [
  {
    id: "bring-phone",
    title: "Bring your phone",
    desc: "Check your phone works before you switch.",
    linkText: "Check compatibility →",
    href: "/check-compatibility",
    image: "/img/Prepaid-Plans/pp9.png",
  },
  {
    id: "check-coverage",
    title: "Check coverage",
    desc: "See estimated coverage for your ZIP code.",
    linkText: "Check coverage →",
    href: "#coverage",
    image: "/img/Prepaid-Plans/pp10.png",
  },
  {
    id: "keep-number",
    title: "Keep your number",
    desc: "Switch without losing your number.",
    linkText: "Keep my number →",
    href: "#transfer",
    image: "/img/Prepaid-Plans/pp11.jpg",
  },
];

const featurePillars = [
  {
    icon: CreditCard,
    title: "No annual contracts",
    desc: "Total flexibility, no long-term commitment.",
  },
  {
    icon: Tag,
    title: "Clear pricing",
    desc: "Price per line, plus taxes and fees.",
  },
  {
    icon: RefreshCw,
    title: "Easy switching",
    desc: "Keep your number and switch in a few steps.",
  },
  {
    icon: Headphones,
    title: "Real support",
    desc: "Help from our U.S.-based team.",
  },
  {
    icon: BarChart2,
    title: "Broadband Facts",
    desc: "A label for every plan.",
  },
];

const prepaidFaqs = [
  {
    id: 1,
    question: "How does prepaid work?",
    answer:
      "You pay for each month of service before you use it. Your plan renews on the same date each month.",
  },
  {
    id: 2,
    question: "Is there an annual contract?",
    answer:
      "No. Prepaid plans have no long-term contracts. You can change or cancel your service at any renewal.",
  },
  {
    id: 3,
    question: "What happens after my premium-speed data?",
    answer:
      "After your monthly allotment of high-speed data is used, unlimited data continues at standard reduced speeds until your next billing cycle.",
  },
  {
    id: 4,
    question: "Does hotspot use count toward my data?",
    answer:
      "Yes, mobile hotspot usage draws from your plan's dedicated hotspot allotment and premium-speed data pool.",
  },
  {
    id: 5,
    question: "Which countries can I call?",
    answer:
      "Included destination countries vary by plan—from 70+ up to 220+ countries. Refer to individual plan specifications for the complete verified country list.",
  },
  {
    id: 6,
    question: "Can I keep my number?",
    answer:
      "Yes! You can transfer (port) your existing mobile number during checkout. Just keep your current carrier service active until the transfer completes.",
  },
  {
    id: 7,
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can easily upgrade, downgrade, or switch your plan anytime via your online account dashboard before your next renewal date.",
  },
];

export default function PrepaidPlansClient() {
  const [activeTab, setActiveTab] = useState("prepaid");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [broadbandModal, setBroadbandModal] = useState(null);
  const [openFaq, setOpenFaq] = useState(1);

  const toggleComparePlan = (planId) => {
    setSelectedPlans((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((id) => id !== planId);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 plans at a time.");
        return prev;
      }
      return [...prev, planId];
    });
  };

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.pageWrapper}>
      {/* =========================================================
          HERO BANNER
         ========================================================= */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>ZOIKO MOBILE USA</span>

            <h1 className={styles.heroTitle}>Prepaid Plans</h1>

            <p className={styles.heroTagline}>Wireless that moves you.</p>

            <div className={styles.heroNetworkBadge}>
              <span className={styles.heroSparkleIcon}>✦</span>
              <span className={styles.heroNetworkText}>
                The Animal &amp; Music Loving Network.™
              </span>
              <span className={styles.heroMusicIcon}>♫</span>
            </div>

            <p className={styles.heroDescription}>
              Flexible, transparent wireless with no annual contracts.
            </p>

            {/* Checkmark Highlights */}
            <div className={styles.heroHighlights}>
              <div className={styles.highlightItem}>
                <Check size={14} className={styles.checkIcon} />
                <span>No annual contracts</span>
              </div>
              <div className={styles.highlightItem}>
                <Check size={14} className={styles.checkIcon} />
                <span>Clear, upfront pricing</span>
              </div>
              <div className={styles.highlightItem}>
                <Check size={14} className={styles.checkIcon} />
                <span>Keep your number</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className={styles.heroActions}>
              <a href="#plans-grid" className={styles.btnComparePrepaid}>
                <span>Compare prepaid plans</span>
                <ChevronRight size={15} />
              </a>
              <Link href="/check-compatibility" className={styles.btnBringPhone}>
                <span>Bring your phone</span>
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Graphic with Glowing Rings & Skyline */}
          <div className={styles.heroImageWrapper}>
            <Image
              src="/img/Prepaid-Plans/pp1.png"
              alt="Woman smiling using smartphone with London skyline at sunset"
              width={1000}
              height={500}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY TABS BAR
         ========================================================= */}
      <section className={styles.tabsSection}>
        <div className={styles.tabsContainer}>
          {/* Desktop Horizontal Tabs */}
          <div className={`${styles.tabsCard} ${styles.desktopOnly}`}>
            {plansCategories.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabBtn} ${
                  activeTab === tab.id ? styles.tabBtnActive : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile 2x2 Grid Tabs */}
          <div className={`${styles.mobileTabsCard} ${styles.mobileOnly}`}>
            <button
              type="button"
              onClick={() => setActiveTab("prepaid")}
              className={`${styles.mobileTabBtn} ${
                activeTab === "prepaid" ? styles.mobileTabBtnActive : ""
              }`}
            >
              <Smartphone size={16} />
              <span>Prepaid Plans</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("postpaid")}
              className={`${styles.mobileTabBtn} ${
                activeTab === "postpaid" ? styles.mobileTabBtnActive : ""
              }`}
            >
              <RefreshCw size={16} />
              <span>Postpaid Plans</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("business")}
              className={`${styles.mobileTabBtn} ${
                activeTab === "business" ? styles.mobileTabBtnActive : ""
              }`}
            >
              <Briefcase size={16} />
              <span>Business Plans</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("travel")}
              className={`${styles.mobileTabBtn} ${
                activeTab === "travel" ? styles.mobileTabBtnActive : ""
              }`}
            >
              <Plane size={16} />
              <span>Travel Plans</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          PLANS GRID SECTION
         ========================================================= */}
      <section id="plans-grid" className={styles.plansSection}>
        <div className={styles.sectionContainer}>
          {/* Row 1: 3 Standard Plan Cards */}
          <div className={styles.standardPlansGrid}>
            {standardPlans.map((plan) => {
              const isChecked = selectedPlans.includes(plan.id);
              return (
                <div
                  key={plan.id}
                  className={styles.planCard}
                  style={{ "--plan-color": plan.badgeColor }}
                >
                  {/* Card Header Photo & Colored Banner */}
                  <div className={styles.cardHeaderImgWrapper}>
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      width={1488}
                      height={552}
                      className={styles.cardHeaderImg}
                    />
                    <div
                      className={styles.planNameBanner}
                      style={{ backgroundColor: plan.badgeColor }}
                    >
                      {plan.name}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardBody}>
                    {/* Price and Tagline */}
                    <div className={styles.cardPriceRow}>
                      <div className={styles.priceContainer}>
                        <span className={styles.priceValue}>${plan.price}</span>
                        <span className={styles.pricePeriod}>{plan.period}</span>
                      </div>
                      <p className={styles.planTagline}>{plan.tagline}</p>
                    </div>

                    {/* Features List */}
                    <ul className={styles.featuresList}>
                      <li className={styles.featureItem}>
                        <Signal size={15} className={styles.featureIconData} />
                        <span>{plan.data}</span>
                      </li>
                      <li className={styles.featureItem}>
                        <MessageSquare
                          size={15}
                          className={styles.featureIconTalk}
                        />
                        <span>
                          Talk &amp; text:{" "}
                          <button
                            type="button"
                            onClick={() => setBroadbandModal(plan)}
                            className={styles.linkUnderline}
                          >
                            {plan.talkText}
                          </button>
                        </span>
                      </li>
                      <li className={styles.featureItem}>
                        <Wifi size={15} className={styles.featureIconHotspot} />
                        <span>{plan.hotspot}</span>
                      </li>
                      <li className={styles.featureItem}>
                        <Globe size={15} className={styles.featureIconGlobe} />
                        <span>{plan.countries}</span>
                      </li>
                      <li className={styles.featureItem}>
                        <Smartphone size={15} className={styles.featureIconSim} />
                        <span>{plan.sim}</span>
                      </li>
                    </ul>

                    {/* Card Footer: Compare Checkbox & Broadband Facts */}
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
                        onClick={() => setBroadbandModal(plan)}
                        className={styles.broadbandFactsLink}
                      >
                        Broadband Facts
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.cardActionButtons}>
                      <button
                        type="button"
                        onClick={() => setBroadbandModal(plan)}
                        className={styles.btnViewDetails}
                      >
                        View plan details
                      </button>
                      <button type="button" className={styles.btnChoosePlan}>
                        Choose plan
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: 2 Wide Plan Cards */}
          <div className={styles.widePlansGrid}>
            {widePlans.map((plan) => {
              const isChecked = selectedPlans.includes(plan.id);
              return (
                <div
                  key={plan.id}
                  className={styles.planCardWide}
                  style={{ "--plan-color": plan.badgeColor }}
                >
                  {/* Card Header Photo & Colored Banner */}
                  <div className={styles.cardHeaderImgWrapperWide}>
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      width={1488}
                      height={552}
                      className={styles.cardHeaderImg}
                    />
                    <div
                      className={styles.planNameBanner}
                      style={{ backgroundColor: plan.badgeColor }}
                    >
                      {plan.name}
                    </div>
                  </div>

                  {/* Card Body with 2 Columns */}
                  <div className={styles.cardBodyWide}>
                    {/* Left Column: Price, Tagline, Compare & CTAs */}
                    <div className={styles.cardBodyWideLeft}>
                      <div className={styles.cardPriceRowWide}>
                        <div className={styles.priceContainer}>
                          <span className={styles.priceValue}>${plan.price}</span>
                          <span className={styles.pricePeriod}>{plan.period}</span>
                        </div>
                        <p className={styles.planTaglineWide}>{plan.tagline}</p>
                      </div>

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
                          onClick={() => setBroadbandModal(plan)}
                          className={styles.broadbandFactsLink}
                        >
                          Broadband Facts
                        </button>
                      </div>

                      <div className={styles.cardActionButtons}>
                        <button
                          type="button"
                          onClick={() => setBroadbandModal(plan)}
                          className={styles.btnViewDetails}
                        >
                          View plan details
                        </button>
                        <button type="button" className={styles.btnChoosePlan}>
                          Choose plan
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Features List */}
                    <div className={styles.cardBodyWideRight}>
                      <ul className={styles.featuresList}>
                        <li className={styles.featureItem}>
                          <Signal
                            size={15}
                            className={styles.featureIconData}
                          />
                          <span>{plan.data}</span>
                        </li>
                        <li className={styles.featureItem}>
                          <MessageSquare
                            size={15}
                            className={styles.featureIconTalk}
                          />
                          <span>
                            Talk &amp; text:{" "}
                            <button
                              type="button"
                              onClick={() => setBroadbandModal(plan)}
                              className={styles.linkUnderline}
                            >
                              {plan.talkText}
                            </button>
                          </span>
                        </li>
                        <li className={styles.featureItem}>
                          <Wifi
                            size={15}
                            className={styles.featureIconHotspot}
                          />
                          <span>{plan.hotspot}</span>
                        </li>
                        <li className={styles.featureItem}>
                          <Globe size={15} className={styles.featureIconGlobe} />
                          <span>{plan.countries}</span>
                        </li>
                        <li className={styles.featureItem}>
                          <Smartphone
                            size={15}
                            className={styles.featureIconSim}
                          />
                          <span>{plan.sim}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Legal Footnote */}
          <div className={styles.pricingDisclaimer}>
            Prices are per line, per month, paid before each month of service,
            before taxes and fees, and reflect our published plans as of November
            10, 2026. After your premium-speed data, speeds may be reduced.
            Hotspot use counts toward premium data. *International destination
            counts are being verified; see each plan&apos;s details.
          </div>
        </div>
      </section>

      {/* =========================================================
          DECISION TOOLS: ZOIKO PLAN FIT & MY USAGE, MY PLAN
         ========================================================= */}
      <section className={styles.decisionToolsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.decisionToolsGrid}>
            {/* Card 1: Zoiko Plan Fit */}
            <div className={styles.planFitCard}>
              <div className={styles.planFitGraphicWrapper}>
                <Image
                  src="/img/Prepaid-Plans/pp7.png"
                  alt="Zoiko Plan Fit on smartphone"
                  width={184}
                  height={288}
                  className={styles.planFitPhoneImg}
                />
              </div>

              <div className={styles.toolCardContent}>
                <h3 className={styles.planFitHeading}>Zoiko Plan Fit</h3>
                <p className={styles.toolCardSubtitle}>
                  Find the right plan for your life, in minutes.
                </p>

                <ul className={styles.toolPointsList}>
                  <li className={styles.toolPointItem}>
                    <div className={styles.checkCirclePink}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>
                      Four quick questions: data, hotspot, calling abroad and
                      budget.
                    </span>
                  </li>
                  <li className={styles.toolPointItem}>
                    <div className={styles.checkCirclePink}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>Clear reasons, including what you&apos;d give up.</span>
                  </li>
                  <li className={styles.toolPointItem}>
                    <div className={styles.checkCirclePink}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>
                      Can suggest the cheapest fit, or that you keep your current
                      plan.
                    </span>
                  </li>
                </ul>

                <button type="button" className={styles.btnFindPlan}>
                  <span>Find my plan</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 2: My Usage, My Plan */}
            <div className={styles.myUsageCard}>
              <div className={styles.usageWidgetBox}>
                <div className={styles.usageWidgetTitle}>Your recent usage</div>
                <div className={styles.usageWidgetSubtitle}>
                  Sign in to see your usage
                </div>
                <div className={styles.usageWidgetRow}>
                  <span className={styles.usageLabel}>Data</span>
                  <span className={styles.usageBar}>
                    <span className={styles.usageBarFill} />
                  </span>
                  <span className={styles.usageDash}>—</span>
                </div>
                <div className={styles.usageWidgetRow}>
                  <span className={styles.usageLabel}>Talk</span>
                  <span className={styles.usageBar}>
                    <span className={styles.usageBarFill} />
                  </span>
                  <span className={styles.usageDash}>—</span>
                </div>
                <div className={styles.usageWidgetRow}>
                  <span className={styles.usageLabel}>Text</span>
                  <span className={styles.usageBar}>
                    <span className={styles.usageBarFill} />
                  </span>
                  <span className={styles.usageDash}>—</span>
                </div>
              </div>

              <div className={styles.toolCardContent}>
                <h3 className={styles.myUsageHeading}>My Usage, My Plan</h3>
                <p className={styles.toolCardSubtitle}>
                  Already a Zoiko customer? Review your usage and see if a
                  different plan could save you money.
                </p>

                <ul className={styles.toolPointsList}>
                  <li className={styles.toolPointItem}>
                    <div className={styles.checkCircleGreen}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>Review your real usage against your current plan.</span>
                  </li>
                  <li className={styles.toolPointItem}>
                    <div className={styles.checkCircleGreen}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>See savings only when we can confirm them.</span>
                  </li>
                  <li className={styles.toolPointItem}>
                    <div className={styles.checkCircleGreen}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>
                      Keep, switch or downgrade. Your choice, with no changes until
                      you confirm.
                    </span>
                  </li>
                </ul>

                <button type="button" className={styles.btnSignInReview}>
                  <span>Sign in to review</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PREPAID, EXPLAINED SECTION
         ========================================================= */}
      <section className={styles.prepaidExplainedSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.explainedGrid}>
            {/* Left Column: Heading, Subtitle & 2x2 Feature Cards */}
            <div className={styles.explainedContent}>
              <span className={styles.explainedEyebrow}>PREPAID, EXPLAINED</span>

              <h2 className={styles.explainedTitle}>
                Simple, upfront and in your control.
              </h2>

              <p className={styles.explainedSubtitle}>
                Prepaid means you pay for each month before you use it. Here&apos;s
                what you&apos;ll always see before you pay.
              </p>

              {/* 2x2 Grid of Feature Cards */}
              <div className={styles.explainedFeatureCardsGrid}>
                {/* Feature 1 */}
                <div className={styles.explainedCard}>
                  <div className={styles.explainedCardIcon}>
                    <CreditCard size={17} />
                  </div>
                  <h4 className={styles.explainedCardTitle}>
                    Pay before your month
                  </h4>
                  <p className={styles.explainedCardDesc}>
                    You pay for each month of service up front. No bills after you
                    use it.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className={styles.explainedCard}>
                  <div className={styles.explainedCardIcon}>
                    <Calendar size={17} />
                  </div>
                  <h4 className={styles.explainedCardTitle}>Renews monthly</h4>
                  <p className={styles.explainedCardDesc}>
                    Your plan renews on the same date each month. We show the date
                    before you pay.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className={styles.explainedCard}>
                  <div className={styles.explainedCardIcon}>
                    <FileText size={17} />
                  </div>
                  <h4 className={styles.explainedCardTitle}>Due today</h4>
                  <p className={styles.explainedCardDesc}>
                    Your first month plus any SIM or activation fees, confirmed in
                    your quote.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className={styles.explainedCard}>
                  <div className={styles.explainedCardIcon}>
                    <ShieldCheck size={17} />
                  </div>
                  <h4 className={styles.explainedCardTitle}>No annual contract</h4>
                  <p className={styles.explainedCardDesc}>
                    Change or stop your plan at renewal. Phones bought separately
                    have their own terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Graphic with Overlapping Confirm Card */}
            <div className={styles.explainedMediaWrapper}>
              <div className={styles.explainedPhotoContainer}>
                <Image
                  src="/img/Prepaid-Plans/pp8.png"
                  alt="Couple using smartphones outdoors"
                  width={600}
                  height={601}
                  className={styles.explainedCoupleImg}
                />
              </div>

              {/* Overlapping Confirm Card */}
              <div className={styles.confirmBadgeCard}>
                <div className={styles.confirmShieldIcon}>
                  <ShieldCheck size={20} />
                </div>
                <div className={styles.confirmCardContent}>
                  <h5 className={styles.confirmTitle}>
                    Nothing changes until you confirm.
                  </h5>
                  <p className={styles.confirmSubtitle}>
                    Choosing a plan opens a review with your quote and terms. We
                    never start service or charge you from this page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THREE QUICK CHECKS BEFORE YOU CHOOSE
         ========================================================= */}
      <section className={styles.quickChecksSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.quickChecksHeader}>
            <span className={styles.quickChecksEyebrow}>
              GET READY TO SWITCH
            </span>
            <h2 className={styles.quickChecksTitle}>
              Three quick checks before you<br />choose.
            </h2>
          </div>

          {/* 3 Cards Row */}
          <div className={styles.quickChecksGrid}>
            {quickChecks.map((card) => (
              <div key={card.id} className={styles.quickCheckCard}>
                <div className={styles.quickCheckImgWrapper}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={1600}
                    height={1066}
                    className={styles.quickCheckImg}
                  />
                </div>
                <div className={styles.quickCheckBody}>
                  <h3 className={styles.quickCheckCardTitle}>{card.title}</h3>
                  <p className={styles.quickCheckCardDesc}>{card.desc}</p>
                  <Link href={card.href} className={styles.quickCheckLink}>
                    {card.linkText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Warning Banner */}
          <div className={styles.alertWarningPill}>
            <AlertTriangle size={15} className={styles.alertWarningIcon} />
            <span>
              <strong>Don&apos;t cancel your old service</strong> until your number
              transfer is complete.
            </span>
          </div>

          {/* 5-Column Feature Badges Strip */}
          <div className={styles.featurePillarsStrip}>
            {featurePillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className={styles.pillarItem}>
                  <div className={styles.pillarIconBox}>
                    <IconComp size={16} />
                  </div>
                  <div className={styles.pillarText}>
                    <h5 className={styles.pillarTitle}>{pillar.title}</h5>
                    <p className={styles.pillarDesc}>{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          PREPAID QUESTIONS, ANSWERED (FAQS)
         ========================================================= */}
      <section className={styles.faqsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.faqsHeader}>
            <span className={styles.faqsEyebrow}>QUESTIONS</span>
            <h2 className={styles.faqsTitle}>Prepaid questions, answered.</h2>
          </div>

          <div className={styles.faqsGrid}>
            {/* Left Column: Support Rep Card with Call Box */}
            <div className={styles.supportCard}>
              <div className={styles.supportImgWrapper}>
                <Image
                  src="/img/Prepaid-Plans/pp12.jpg"
                  alt="Customer support specialist with headset"
                  width={900}
                  height={520}
                  className={styles.supportImg}
                />
              </div>

              <div className={styles.supportCallBox}>
                <h4 className={styles.supportCallTitle}>Not sure which plan?</h4>
                <p className={styles.supportCallSubtitle}>
                  Talk to our team. We&apos;ll recommend what fits, even if it
                  costs less.
                </p>
                <a href="tel:800-988-8116" className={styles.supportPhoneBtn}>
                  <Phone size={14} className={styles.supportPhoneIcon} />
                  <span>800-988-8116</span>
                </a>
              </div>
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className={styles.accordionContainer}>
              {prepaidFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`${styles.accordionItem} ${
                      isOpen ? styles.accordionItemOpen : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className={styles.accordionHeader}
                    >
                      <span className={styles.accordionQuestion}>
                        {faq.question}
                      </span>
                      <span
                        className={`${styles.accordionIconCircle} ${
                          isOpen
                            ? styles.accordionIconMinus
                            : styles.accordionIconPlus
                        }`}
                      >
                        {isOpen ? (
                          <Minus size={14} strokeWidth={2.5} />
                        ) : (
                          <Plus size={14} strokeWidth={2.5} />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className={styles.accordionBody}>
                        <p className={styles.accordionAnswer}>{faq.answer}</p>
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
      <div className={styles.compareBarFixed}>
        <div className={styles.compareBarContainer}>
          <div className={styles.compareBarLeft}>
            <div className={styles.compareIconBox}>
              <Layers size={18} />
            </div>
            <span className={styles.compareTitle}>Compare Plans</span>
          </div>

          <p className={styles.compareSubtitle}>
            Select up to 3 plans to compare data, hotspot, price and terms side by
            side.
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
            <span>Compare Selected ( {selectedPlans.length} / 3 )</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* =========================================================
          BROADBAND FACTS MODAL
         ========================================================= */}
      {broadbandModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setBroadbandModal(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleRow}>
                <h3 className={styles.modalTitle}>Broadband Facts</h3>
                <span
                  className={styles.modalBadge}
                  style={{ backgroundColor: broadbandModal.badgeColor }}
                >
                  {broadbandModal.name}
                </span>
              </div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setBroadbandModal(null)}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalPriceBlock}>
                <div className={styles.modalPrice}>
                  ${broadbandModal.price}
                  <span className={styles.modalPeriod}>/month</span>
                </div>
                <div className={styles.modalMonthlyDesc}>
                  Standard monthly service charge, taxes &amp; government fees
                  calculated at checkout.
                </div>
              </div>

              <div className={styles.modalSpecsList}>
                <div className={styles.modalSpecItem}>
                  <strong>Data Included:</strong> {broadbandModal.data}
                </div>
                <div className={styles.modalSpecItem}>
                  <strong>Mobile Hotspot:</strong> {broadbandModal.hotspot}
                </div>
                <div className={styles.modalSpecItem}>
                  <strong>Talk &amp; Text:</strong> Unlimited nationwide talk and
                  text included with 5G &amp; 4G LTE access.
                </div>
                <div className={styles.modalSpecItem}>
                  <strong>International Calling:</strong>{" "}
                  {broadbandModal.countries}
                </div>
                <div className={styles.modalSpecItem}>
                  <strong>Network:</strong> America&apos;s leading 5G network
                  with multi-carrier roaming.
                </div>
                <div className={styles.modalSpecItem}>
                  <strong>Contract:</strong> No annual contracts, no cancellation
                  fees.
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.btnModalClose}
                onClick={() => setBroadbandModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className={styles.btnModalChoose}
                onClick={() => setBroadbandModal(null)}
              >
                Choose {broadbandModal.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
