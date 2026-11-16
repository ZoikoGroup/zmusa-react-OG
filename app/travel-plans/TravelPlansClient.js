"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Smartphone,
  Calendar,
  Tag,
  Headphones,
  Search,
  AlertTriangle,
  ChevronRight,
  Clock,
  Signal,
  MessageSquare,
  Wifi,
  Globe,
  Layers,
  Sparkles,
  BarChart2,
  PhoneCall,
  Check,
  X,
  Plus,
  Minus,
  ShieldCheck,
} from "lucide-react";
import styles from "./TravelPlans.module.css";

const travelPasses = [
  {
    id: "daily-adventure",
    name: "Daily Adventure Pass",
    tagline: "For short trips and weekend getaways.",
    durationTag: "24 hours",
    image: "/img/Travel-Plans/tp2.png",
    accentColor: "#10B981",
    price: "$7.50",
    priceUnit: "/day*",
    badge: "Price under review",
    specs: [
      {
        icon: Calendar,
        label: "Validity:",
        value: "24 hours (start trigger being confirmed)",
      },
      {
        icon: Signal,
        label: "Data:",
        value: "Allowance being confirmed",
      },
      {
        icon: MessageSquare,
        label: "Calls & texts:",
        value: "Varies by destination",
      },
      {
        icon: Wifi,
        label: "Hotspot:",
        value: "being confirmed",
      },
      {
        icon: Globe,
        label: "Destinations:",
        value: "check your destination",
      },
      {
        icon: Smartphone,
        label: "SIM / eSIM:",
        value: "check your phone",
      },
    ],
  },
  {
    id: "voyager-pass",
    name: "Voyager Pass",
    tagline: "For week-long trips and multi-stop travel.",
    durationTag: "7 days",
    image: "/img/Travel-Plans/tp3.png",
    accentColor: "#E5195E",
    price: "$16",
    priceUnit: "total / day*",
    badge: "Price under review",
    specs: [
      {
        icon: Calendar,
        label: "Validity:",
        value: "7 days",
      },
      {
        icon: Signal,
        label: "Data:",
        value: "2 GB for 7 days (published)",
      },
      {
        icon: MessageSquare,
        label: "Calls & texts:",
        value: "Varies by destination",
      },
      {
        icon: Wifi,
        label: "Hotspot:",
        value: "being confirmed",
      },
      {
        icon: Globe,
        label: "Destinations:",
        value: "check your destination",
      },
      {
        icon: Smartphone,
        label: "SIM / eSIM:",
        value: "check your phone",
      },
    ],
  },
  {
    id: "daily-explorer",
    name: "Daily Explorer Pass",
    tagline: "More data for longer trips and remote work.",
    durationTag: "14 days",
    image: "/img/Travel-Plans/tp5.png",
    accentColor: "#E5195E",
    price: "$52",
    priceUnit: "total / day*",
    badge: "Price under review",
    specs: [
      {
        icon: Calendar,
        label: "Validity:",
        value: "14 days",
      },
      {
        icon: Signal,
        label: "Data:",
        value: "15 GB for 14 days (published)",
      },
      {
        icon: MessageSquare,
        label: "Calls & texts:",
        value: "Varies by destination",
      },
      {
        icon: Wifi,
        label: "Hotspot:",
        value: "being confirmed",
      },
      {
        icon: Globe,
        label: "Destinations:",
        value: "check your destination",
      },
      {
        icon: Smartphone,
        label: "SIM / eSIM:",
        value: "check your phone",
      },
    ],
  },
  {
    id: "global-connect",
    name: "Global Connect",
    tagline: "Our broadest travel option: varies by destination.",
    durationTag: "Varies",
    image: "/img/Travel-Plans/tp6.png",
    accentColor: "#7C3AED",
    price: "From $65",
    priceUnit: "varies by country*",
    badge: "Price under review",
    specs: [
      {
        icon: Calendar,
        label: "Validity:",
        value: "Varies by destination",
      },
      {
        icon: Signal,
        label: "Data:",
        value: "Varies by destination",
      },
      {
        icon: MessageSquare,
        label: "Calls & texts:",
        value: "Varies by destination",
      },
      {
        icon: Wifi,
        label: "Hotspot:",
        value: "being confirmed",
      },
      {
        icon: Globe,
        label: "Destinations:",
        value: "check your destination",
      },
      {
        icon: Smartphone,
        label: "SIM / eSIM:",
        value: "check your phone",
      },
    ],
  },
];

const statusSteps = [
  {
    step: "1",
    title: "Pass chosen",
    desc: "You pick a pass after checking your destination.",
    color: "#E5195E",
  },
  {
    step: "2",
    title: "Activation pending",
    desc: "We ask our network partner to add your pass.",
    color: "#BE185D",
  },
  {
    step: "3",
    title: "Active",
    desc: "Confirmed by our network partner, with start and end dates.",
    color: "#10B981",
  },
  {
    step: "4",
    title: "Ended or used up",
    desc: "We'll tell you when your pass expires or data runs out.",
    color: "#7C3AED",
  },
];

const travelBadges = [
  {
    icon: Globe,
    title: "Destination check",
    desc: "Coverage confirmed per country",
  },
  {
    icon: Smartphone,
    title: "eSIM or SIM",
    desc: "Where your phone supports it",
  },
  {
    icon: Calendar,
    title: "Clear dates",
    desc: "When a pass starts and ends",
  },
  {
    icon: Tag,
    title: "No surprise charges",
    desc: "Known start trigger & no charges",
  },
  {
    icon: ShieldCheck,
    title: "Your choice",
    desc: "No auto-renewals without consent",
  },
  {
    icon: Headphones,
    title: "Help abroad",
    desc: "Support before and during your trip",
  },
];

const travelFaqs = [
  {
    id: 1,
    question: "Do I need a travel pass?",
    answer:
      "Not always. Check your destination first. Your plan may already include roaming in some places.",
  },
  {
    id: 2,
    question: "When does a pass start and end?",
    answer:
      "A pass starts once your network partner confirms activation abroad, and ends precisely at the conclusion of its validity window (e.g. 24 hours, 7 days, or 14 days).",
  },
  {
    id: 3,
    question: "What happens when my pass data runs out?",
    answer:
      "When your high-speed travel pass data is reached, data access slows to reduced basic speeds or pauses according to destination network rules until another pass is added.",
  },
  {
    id: 4,
    question: "Is calling home from abroad included?",
    answer:
      "Calls back to the United States and within your visited destination are supported on eligible passes. Check destination specifics before departure.",
  },
  {
    id: 5,
    question: "Is international calling from the U.S. the same as a travel pass?",
    answer:
      "No. Calling abroad while you are in the U.S. is covered under our international calling add-ons or plan allowances. Travel passes are strictly for using your phone while physically traveling outside the U.S.",
  },
  {
    id: 6,
    question: "Can I use a travel eSIM?",
    answer:
      "Yes! If your device supports eSIM technology, you can install a digital travel pass profile alongside your physical SIM without needing to swap cards.",
  },
  {
    id: 7,
    question: "Can I get a refund if I don't travel?",
    answer:
      "Unactivated travel passes can be cancelled or refunded prior to the scheduled travel start date through your account dashboard or support.",
  },
];

export default function TravelPlansClient() {
  const [selectedPasses, setSelectedPasses] = useState([]);
  const [destinationSearch, setDestinationSearch] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const [connectionMethod, setConnectionMethod] = useState("zoiko-line");
  const [checkDestination, setCheckDestination] = useState("");
  const [leavingDate, setLeavingDate] = useState("");
  const [returningDate, setReturningDate] = useState("");
  const [travelerCount, setTravelerCount] = useState(1);
  const [alreadyHaveLine, setAlreadyHaveLine] = useState(false);
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const toggleComparePass = (passId) => {
    setSelectedPasses((prev) => {
      if (prev.includes(passId)) {
        return prev.filter((id) => id !== passId);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 travel passes at a time.");
        return prev;
      }
      return [...prev, passId];
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!destinationSearch.trim()) return;
    window.location.href = `/check-a-destination?q=${encodeURIComponent(
      destinationSearch.trim()
    )}`;
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
            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowBar} />
              <span>TRAVEL PLANS</span>
            </div>

            <h1 className={styles.heroTitle}>
              Stay connected <br />
              <span className={styles.heroTitleHighlight}>wherever you go.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Check your destination first, then choose the travel option that
              fits, with clear dates and trip costs before you pay.
            </p>

            <div className={styles.heroActions}>
              <Link
                href="/check-a-destination"
                className={styles.btnCheckDestination}
              >
                <MapPin size={15} />
                <span>Check a destination</span>
              </Link>
              <a href="#travel-passes" className={styles.btnCompareTravel}>
                <span>Compare travel plans</span>
                <ChevronRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Graphic with Airport Travelers */}
          <div className={styles.heroImageWrapper}>
            <Image
              src="/img/Travel-Plans/tp1.png"
              alt="Two travelers with backpacks smiling with smartphones in terminal"
              width={720}
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
              <MapPin size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Destination first</span>
                <span className={styles.pillarMuted}>Check before you buy</span>
              </div>
            </div>

            <div className={styles.heroPillarItem}>
              <Smartphone size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>eSIM or SIM</span>
                <span className={styles.pillarMuted}>Where supported</span>
              </div>
            </div>

            <div className={styles.heroPillarItem}>
              <Calendar size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Clear validity</span>
                <span className={styles.pillarMuted}>Start and end dates</span>
              </div>
            </div>

            <div className={styles.heroPillarItem}>
              <Tag size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Trip cost upfront</span>
                <span className={styles.pillarMuted}>Clear prices as verified</span>
              </div>
            </div>

            <div className={styles.heroPillarItem}>
              <Headphones size={16} className={styles.pillarIcon} />
              <div className={styles.pillarTextBox}>
                <span className={styles.pillarBold}>Help before you go</span>
                <span className={styles.pillarMuted}>Travel checklist</span>
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
            <Link href="/business-plans" className={styles.mobileTabLink}>
              Business Plans
            </Link>
            <span className={`${styles.mobileTabLink} ${styles.mobileTabActive}`}>
              Travel Plans
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR TRAVEL PLANS SECTION
         ========================================================= */}
      <section id="travel-passes" className={styles.travelPlansSection}>
        <div className={styles.sectionContainer}>
          {/* Section Header with Destination Search */}
          <div className={styles.sectionHeaderRow}>
            <div className={styles.sectionTitleBox}>
              <h2 className={styles.sectionHeading}>Our travel plans</h2>
              <p className={styles.sectionSubheading}>
                Four published travel passes. Check your destination to see which
                apply.
              </p>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className={styles.destinationSearchForm}
            >
              <MapPin size={15} className={styles.searchFormPin} />
              <input
                type="text"
                placeholder="Enter a country or destination"
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                className={styles.destinationInput}
              />
              <button
                type="submit"
                aria-label="Search destination"
                className={styles.searchSubmitBtn}
              >
                <Search size={14} />
              </button>
            </form>
          </div>

          {/* Alert Review Banner */}
          <div className={styles.reviewAlertBanner}>
            <AlertTriangle size={16} className={styles.reviewAlertIcon} />
            <span className={styles.reviewAlertText}>
              <strong>Travel prices are under review.</strong> Listed prices are
              shown as published, but billing units and trip totals are being
              confirmed. Check your destination now; you&apos;ll see a confirmed
              trip price before you can buy.
            </span>
          </div>

          {/* Main Grid: 2x2 Passes Grid (Left) + Sidebar (Right) */}
          <div className={styles.mainPlansLayout}>
            {/* Left: 2x2 Travel Pass Cards */}
            <div className={styles.passesGrid}>
              {travelPasses.map((pass) => {
                const isChecked = selectedPasses.includes(pass.id);
                return (
                  <div key={pass.id} className={styles.passCard}>
                    {/* Header Image & Duration Tag */}
                    <div className={styles.cardImgWrapper}>
                      <Image
                        src={pass.image}
                        alt={pass.name}
                        width={465}
                        height={160}
                        className={styles.cardHeaderImg}
                      />
                      <div className={styles.durationBadge}>
                        <Clock size={11} />
                        <span>{pass.durationTag}</span>
                      </div>
                      <div
                        className={styles.cardWaveAccent}
                        style={{ backgroundColor: pass.accentColor }}
                      />
                    </div>

                    {/* Card Content Body */}
                    <div className={styles.cardBody}>
                      <h3 className={styles.passCardTitle}>{pass.name}</h3>
                      <p className={styles.passCardTagline}>{pass.tagline}</p>

                      {/* Price Row */}
                      <div className={styles.priceRow}>
                        <div className={styles.priceContainer}>
                          <span className={styles.priceValue}>{pass.price}</span>
                          <span className={styles.priceUnit}>{pass.priceUnit}</span>
                        </div>
                        <span className={styles.priceReviewBadge}>
                          {pass.badge}
                        </span>
                      </div>

                      {/* Specs List */}
                      <ul className={styles.specsList}>
                        {pass.specs.map((spec, sIdx) => {
                          const SpecIcon = spec.icon;
                          return (
                            <li key={sIdx} className={styles.specItem}>
                              <SpecIcon size={14} className={styles.specIcon} />
                              <span className={styles.specLabel}>
                                {spec.label}
                              </span>
                              <span className={styles.specValue}>
                                {spec.value}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Utility Row: Compare Checkbox & Pass Terms */}
                      <div className={styles.cardUtilityRow}>
                        <label className={styles.compareCheckboxLabel}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleComparePass(pass.id)}
                            className={styles.checkboxInput}
                          />
                          <span>Compare</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setActiveModal(pass)}
                          className={styles.passTermsLink}
                        >
                          Pass terms
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className={styles.cardActionButtons}>
                        <button
                          type="button"
                          onClick={() => setActiveModal(pass)}
                          className={styles.btnPlanDetails}
                        >
                          Plan details
                        </button>
                        <Link
                          href={`/check-a-destination?pass=${pass.id}`}
                          className={styles.btnCheckDest}
                        >
                          <span>Check destination</span>
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Sidebar */}
            <aside className={styles.sidebarColumn}>
              {/* Card 1: Zoiko Plan Fit · Travel Mode */}
              <div className={styles.planFitTravelCard}>
                <div className={styles.planFitImgWrapper}>
                  <Image
                    src="/img/Travel-Plans/tp4.png"
                    alt="Zoiko Plan Fit Travel Mode"
                    width={378}
                    height={150}
                    className={styles.planFitImg}
                  />
                </div>

                <div className={styles.planFitBody}>
                  <div className={styles.planFitTitleRow}>
                    <div className={styles.planFitTitle}>
                      <Sparkles size={14} className={styles.planFitSparkle} />
                      <span>Zoiko Plan Fit · Travel Mode</span>
                    </div>
                    <span className={styles.proposedBadge}>Proposed</span>
                  </div>

                  <p className={styles.planFitDesc}>
                    Tell us about your trip for a suggestion with clear reasons.
                    It may tell you no purchase is needed.
                  </p>

                  <ul className={styles.planFitPointsList}>
                    <li className={styles.planFitPointItem}>
                      <div className={styles.pinkCheckCircle}>
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span>Trip length: date and budget needs</span>
                    </li>
                    <li className={styles.planFitPointItem}>
                      <div className={styles.pinkCheckCircle}>
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span>Checks whether your plan already covers you</span>
                    </li>
                    <li className={styles.planFitPointItem}>
                      <div className={styles.pinkCheckCircle}>
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span>Rules-based, it can&apos;t buy or activate anything</span>
                    </li>
                  </ul>

                  <button type="button" className={styles.btnFindTravelPlan}>
                    <span>Find my travel plan</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Card 2: Usage & Cost Estimator */}
              <Link href="#estimator" className={styles.sidebarNavCard}>
                <div className={styles.navIconBoxEstimator}>
                  <BarChart2 size={18} />
                </div>
                <div className={styles.navTextBox}>
                  <h4 className={styles.navTitle}>Usage &amp; cost estimator</h4>
                  <p className={styles.navSubtitle}>Rough data your trip needs.</p>
                </div>
                <ChevronRight size={16} className={styles.navArrow} />
              </Link>

              {/* Card 3: Calling Abroad from the U.S.? */}
              <Link href="/international-usage-tips" className={styles.sidebarNavCard}>
                <div className={styles.navIconBoxCalling}>
                  <PhoneCall size={18} />
                </div>
                <div className={styles.navTextBox}>
                  <h4 className={styles.navTitle}>Calling abroad from the U.S.?</h4>
                  <p className={styles.navSubtitle}>
                    That&apos;s international calling, not travel. See rates.
                  </p>
                </div>
                <ChevronRight size={16} className={styles.navArrow} />
              </Link>
            </aside>
          </div>

          {/* Pricing Legal Disclaimer */}
          <div className={styles.pricingDisclaimer}>
            *Travel prices observed on our public site on Nov 17, 2026. Billing
            units, validity rules, policy terms and fees are being confirmed.
            Travel passes are separate from international calls made from the U.S.
            Nothing can be bought on this page until the trip price is verified.
          </div>
        </div>
      </section>

      {/* =========================================================
          DESTINATION CHECK SECTION ("Where are you going?")
         ========================================================= */}
      <section className={styles.destinationCheckSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.destinationCheckHeader}>
            <span className={styles.destCheckEyebrow}>DESTINATION CHECK</span>
            <h2 className={styles.destCheckTitle}>Where are you going?</h2>
            <p className={styles.destCheckSubtitle}>
              We check your destination, dates and line before showing any travel
              option.
            </p>
          </div>

          <div className={styles.destCheckLayout}>
            {/* Left Column: Interactive Form Card */}
            <div className={styles.destCheckCard}>
              <div className={styles.formGroupTop}>
                <span className={styles.formQuestionLabel}>
                  How do you want to stay connected?
                </span>
                <div className={styles.connectionTabs}>
                  <button
                    type="button"
                    onClick={() => setConnectionMethod("zoiko-line")}
                    className={`${styles.connTabBtn} ${
                      connectionMethod === "zoiko-line"
                        ? styles.connTabBtnActive
                        : ""
                    }`}
                  >
                    Use my Zoiko line abroad
                  </button>
                  <button
                    type="button"
                    onClick={() => setConnectionMethod("travel-esim")}
                    className={`${styles.connTabBtn} ${
                      connectionMethod === "travel-esim"
                        ? styles.connTabBtnActive
                        : ""
                    }`}
                  >
                    Get a travel eSIM
                  </button>
                </div>
              </div>

              {/* Destination Input */}
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Destination</label>
                <div className={styles.inputWithPin}>
                  <input
                    type="text"
                    placeholder="Start typing a country or destination"
                    value={checkDestination}
                    onChange={(e) => setCheckDestination(e.target.value)}
                    className={styles.textInput}
                  />
                </div>
              </div>

              {/* Dates Row: Leaving & Returning */}
              <div className={styles.datesRow}>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Leaving</label>
                  <div className={styles.inputWithCalendar}>
                    <input
                      type="date"
                      value={leavingDate}
                      onChange={(e) => setLeavingDate(e.target.value)}
                      className={styles.dateInput}
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Returning</label>
                  <div className={styles.inputWithCalendar}>
                    <input
                      type="date"
                      value={returningDate}
                      onChange={(e) => setReturningDate(e.target.value)}
                      className={styles.dateInput}
                    />
                  </div>
                </div>
              </div>

              {/* Travelers (lines) Counter */}
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Travelers (lines)</label>
                <div className={styles.stepperContainer}>
                  <button
                    type="button"
                    onClick={() => setTravelerCount((c) => Math.max(1, c - 1))}
                    className={styles.stepperBtn}
                  >
                    −
                  </button>
                  <span className={styles.stepperValue}>{travelerCount}</span>
                  <button
                    type="button"
                    onClick={() => setTravelerCount((c) => c + 1)}
                    className={styles.stepperBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Existing Line Checkbox */}
              <label className={styles.haveLineCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={alreadyHaveLine}
                  onChange={(e) => setAlreadyHaveLine(e.target.checked)}
                  className={styles.checkboxInput}
                />
                <span>
                  I already have a Zoiko Mobile line (we&apos;ll check what it
                  includes)
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={() => {
                  if (!checkDestination.trim()) {
                    alert("Please enter a destination to check availability.");
                    return;
                  }
                  window.location.href = `/check-a-destination?dest=${encodeURIComponent(
                    checkDestination
                  )}&leaving=${leavingDate}&returning=${returningDate}&lines=${travelerCount}`;
                }}
                className={styles.btnCheckAvailability}
              >
                <MapPin size={15} />
                <span>Check availability</span>
              </button>
            </div>

            {/* Right Column: Visual Photo & Results Box */}
            <div className={styles.destCheckVisualWrapper}>
              <div
                className={`${styles.destCheckPhotoContainer} ${styles.desktopOnly}`}
              >
                <Image
                  src="/img/Travel-Plans/tp7.png"
                  alt="Family travelers waiting at airport gate with smartphones"
                  width={666}
                  height={420}
                  className={styles.destCheckPhoto}
                />
              </div>

              <div
                className={`${styles.destCheckPhotoContainer} ${styles.mobileOnly}`}
              >
                <Image
                  src="/img/Travel-Plans/tp13.png"
                  alt="London Tower Bridge and The Shard skyline"
                  width={350}
                  height={420}
                  className={styles.destCheckPhoto}
                />
              </div>

              <div className={styles.resultsPlaceholderCard}>
                <h4 className={styles.resultsPlaceholderTitle}>
                  Your results appear here
                </h4>
                <p className={styles.resultsPlaceholderDesc}>
                  We show which passes work for your destination, the dates they
                  cover, and whether your current plan already includes roaming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GET TRAVEL-READY IN THREE CHECKS SECTION
         ========================================================= */}
      <section className={styles.travelReadySection}>
        <div className={styles.sectionContainer}>
          <div className={styles.travelReadyHeader}>
            <span className={styles.travelReadyEyebrow}>BEFORE YOU GO</span>
            <h2 className={styles.travelReadyTitle}>
              Get travel-ready in three checks.
            </h2>
          </div>

          {/* 3 Quick Action Cards */}
          <div className={styles.threeChecksGrid}>
            <div className={styles.threeCheckCard}>
              <div className={styles.threeCheckImgWrapper}>
                <Image
                  src="/img/Travel-Plans/tp8.png"
                  alt="Checking smartphone compatibility"
                  width={438}
                  height={200}
                  className={`${styles.threeCheckImg} ${styles.desktopOnly}`}
                />
                <Image
                  src="/img/Travel-Plans/tp14.png"
                  alt="Checking smartphone compatibility"
                  width={308}
                  height={200}
                  className={`${styles.threeCheckImg} ${styles.mobileOnly}`}
                />
              </div>
              <div className={styles.threeCheckBody}>
                <h3 className={styles.threeCheckTitle}>Is your phone ready?</h3>
                <p className={styles.threeCheckDesc}>
                  Unlocked and compatible with roaming or eSIM.
                </p>
                <Link
                  href="/check-compatibility"
                  className={styles.threeCheckLink}
                >
                  Check compatibility →
                </Link>
              </div>
            </div>

            <div className={styles.threeCheckCard}>
              <div className={styles.threeCheckImgWrapper}>
                <Image
                  src="/img/Travel-Plans/tp9.png"
                  alt="Traveler reviewing tips on tablet by window"
                  width={438}
                  height={200}
                  className={`${styles.threeCheckImg} ${styles.desktopOnly}`}
                />
                <Image
                  src="/img/Travel-Plans/tp15.png"
                  alt="Traveler reviewing tips"
                  width={308}
                  height={200}
                  className={`${styles.threeCheckImg} ${styles.mobileOnly}`}
                />
              </div>
              <div className={styles.threeCheckBody}>
                <h3 className={styles.threeCheckTitle}>Know before you go</h3>
                <p className={styles.threeCheckDesc}>
                  Roaming settings, Wi-Fi calling and saving data.
                </p>
                <Link
                  href="/international-usage-tips"
                  className={styles.threeCheckLink}
                >
                  Travel usage tips →
                </Link>
              </div>
            </div>

            <div className={styles.threeCheckCard}>
              <div className={styles.threeCheckImgWrapper}>
                <Image
                  src="/img/Travel-Plans/tp10.png"
                  alt="Backpackers using smartphone navigation"
                  width={438}
                  height={200}
                  className={`${styles.threeCheckImg} ${styles.desktopOnly}`}
                />
                <Image
                  src="/img/Travel-Plans/tp16.png"
                  alt="Support specialist with headset"
                  width={308}
                  height={200}
                  className={`${styles.threeCheckImg} ${styles.mobileOnly}`}
                />
              </div>
              <div className={styles.threeCheckBody}>
                <h3 className={styles.threeCheckTitle}>Need help abroad?</h3>
                <p className={styles.threeCheckDesc}>
                  Our team can help with activation and roaming.
                </p>
                <a href="tel:800-988-8116" className={styles.threeCheckLink}>
                  Contact support →
                </a>
              </div>
            </div>
          </div>

          {/* How your travel pass status works */}
          <div className={styles.statusProcessCard}>
            <h4 className={styles.statusProcessHeading}>
              How your travel pass status works
            </h4>

            <div className={styles.statusStepsGrid}>
              {statusSteps.map((s) => (
                <div key={s.step} className={styles.statusStepItem}>
                  <div
                    className={styles.statusStepCircle}
                    style={{ backgroundColor: s.color }}
                  >
                    {s.step}
                  </div>
                  <div className={styles.statusStepTextBox}>
                    <h5 className={styles.statusStepTitle}>{s.title}</h5>
                    <p className={styles.statusStepDesc}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.statusProcessFootnote}>
              * A payment isn&apos;t the same as an active pass. The pass is
              active only when our network partner confirms it.
            </p>
          </div>

          {/* 6 Feature Badges Strip */}
          <div className={styles.travelBadgesStrip}>
            {travelBadges.map((badge, bIdx) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={bIdx} className={styles.travelBadgeItem}>
                  <div className={styles.travelBadgeIconBox}>
                    <BadgeIcon size={16} />
                  </div>
                  <div className={styles.travelBadgeTextBox}>
                    <h5 className={styles.travelBadgeTitle}>{badge.title}</h5>
                    <p className={styles.travelBadgeDesc}>{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          TRAVEL QUESTIONS, ANSWERED (FAQ SECTION)
         ========================================================= */}
      <section className={styles.travelFaqsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.travelFaqsHeader}>
            <span className={styles.travelFaqsEyebrow}>QUESTIONS</span>
            <h2 className={styles.travelFaqsTitle}>
              Travel questions, answered.
            </h2>
          </div>

          <div className={styles.travelFaqsLayout}>
            {/* Left Column / Top on Mobile: Visual Photo */}
            <div className={styles.travelFaqsMediaWrapper}>
              <Image
                src="/img/Travel-Plans/tp11.png"
                alt="Two travelers resting with backpacks on train platform"
                width={664}
                height={374}
                className={`${styles.travelFaqsImg} ${styles.desktopOnly}`}
              />
              <Image
                src="/img/Travel-Plans/tp12.png"
                alt="Sunglasses for travel"
                width={308}
                height={150}
                className={`${styles.travelFaqsImg} ${styles.mobileOnly}`}
              />
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className={styles.accordionContainer}>
              {travelFaqs.map((faq) => {
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
          STICKY BOTTOM COMPARE PASSES BAR
         ========================================================= */}
      <div className={styles.compareBarFixed}>
        <div className={styles.compareBarContainer}>
          <div className={styles.compareBarLeft}>
            <div className={styles.compareIconBox}>
              <Layers size={18} />
            </div>
            <span className={styles.compareTitle}>Compare passes</span>
          </div>

          <p className={styles.compareSubtitle}>
            Select passes to compare validity, data and terms side by side.
          </p>

          <button
            type="button"
            className={`${styles.btnCompareSelected} ${
              selectedPasses.length > 0 ? styles.btnCompareSelectedActive : ""
            }`}
            onClick={() => {
              if (selectedPasses.length === 0) {
                alert("Please check at least 1 pass to compare.");
              }
            }}
          >
            <span>Compare selected ( {selectedPasses.length} / 4 )</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* =========================================================
          PASS TERMS / DETAILS MODAL
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
                <span className={styles.modalTag}>{activeModal.durationTag}</span>
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
                  {activeModal.price}
                </span>
                <span className={styles.modalPriceUnit}>
                  {activeModal.priceUnit}
                </span>
                <span className={styles.priceReviewBadge}>
                  {activeModal.badge}
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
              <Link
                href={`/check-a-destination?pass=${activeModal.id}`}
                className={styles.btnModalConfirm}
              >
                Check destination
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
