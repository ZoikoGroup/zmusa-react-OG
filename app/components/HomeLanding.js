"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Hash,
  ArrowLeftRight,
  KeyRound,
  Headphones,
  Signal,
  PawPrint,
  Music,
  CircleCheck,
  FileText,
  MapPin,
  Smartphone,
  CardSim,
  Zap,
  ExternalLink,
  Phone,
  Briefcase,
  Globe,
  TriangleAlert,
  Minus,
  Plus,
} from "lucide-react";
import { openPlanPurchaseModal } from "./Header";
import styles from "./HomeLanding.module.css";

const IMG = "/img/home";
const COVERAGE_MAP_URL = "https://mvnoc.ai/coverage-map";

const quickLinks = [
  { icon: Hash, title: "Compare Plans", sub: "Find the right plan", href: "/wireless-plans" },
  { icon: ArrowLeftRight, title: "Bring Your Phone", sub: "Check it works with us", href: "/byod-plans" },
  { icon: KeyRound, title: "Keep My Number", sub: "Switch without losing it", href: "/switch" },
  { icon: Headphones, title: "Get Support", sub: "Help, any time", href: "/support" },
];

// Display content for the three core plans. "match" is used to find the same
// plan in the existing plans feed so "Buy this plan" opens the existing checkout modal.
const corePlans = [
  {
    key: "lite",
    match: "lite",
    name: "ZoikoLite",
    tagline: "For light users",
    price: 15,
    accent: "lite",
    features: ["5GB premium data, then reduced speeds", "2GB mobile hotspot", "eSIM or physical SIM"],
  },
  {
    key: "core",
    match: "core",
    name: "ZoikoCore",
    tagline: "Everyday balance",
    price: 25,
    accent: "core",
    features: ["10GB premium data, then reduced speeds", "4GB mobile hotspot", "eSIM or physical SIM"],
  },
  {
    key: "max",
    match: "max",
    name: "ZoikoMax",
    tagline: "Our biggest allowances",
    price: 50,
    accent: "max",
    features: ["20GB premium data, then reduced speeds", "10GB mobile hotspot", "eSIM or physical SIM"],
  },
];

const DATA_OPTIONS = [
  { id: "light", label: "Light", plan: "lite" },
  { id: "moderate", label: "Moderate", plan: "core" },
  { id: "heavy", label: "Heavy", plan: "max" },
  { id: "unsure", label: "Not sure", plan: null },
];

const SIM_OPTIONS = [
  { id: "esim", label: "eSIM" },
  { id: "physical", label: "Physical SIM" },
  { id: "unsure", label: "Not sure" },
];

const switchSteps = [
  { icon: MapPin, title: "Check coverage", desc: "See estimated coverage for your ZIP code.", href: "#coverage" },
  { icon: Smartphone, title: "Check your phone", desc: "Confirm your phone works with its IMEI.", href: "/check-compatibility" },
  { icon: Hash, title: "Choose a plan", desc: "Pick the plan that fits your usage.", href: "#plans" },
  { icon: CardSim, title: "Get a SIM or eSIM", desc: "Choose the SIM type your phone supports.", href: "/esim" },
  { icon: KeyRound, title: "Keep your number", desc: "Check eligibility and transfer securely.", href: "/switch" },
  { icon: Zap, title: "Activate", desc: "Turn on your line and check its status.", href: "/activate" },
];

const shopCards = [
  {
    img: `${IMG}/home-shop-smartphones.webp`,
    alt: "A lineup of the latest smartphones",
    title: "Smartphones",
    desc: "The latest phones, ready for our network.",
    cta: "Shop phones",
    href: "/shop-phones",
  },
  {
    img: `${IMG}/home-shop-accessories.webp`,
    alt: "Phone cases, chargers and accessories on a desk",
    title: "Accessories",
    desc: "Cases, chargers and protection.",
    cta: "Shop accessories",
    href: "/accessories",
  },
  {
    img: `${IMG}/home-shop-audio.webp`,
    alt: "On-ear headphones",
    title: "Audio",
    desc: "Earbuds and headphones for every playlist.",
    cta: "Shop audio",
    href: "/accessories",
  },
];

const faqs = [
  {
    q: "Will Zoiko Mobile work where I live?",
    a: "Check your ZIP code above. Coverage maps are estimates from our partner network, and indoor coverage can vary.",
  },
  {
    q: "Can I keep my phone?",
    a: "Most unlocked phones work on our network. Check your phone with its IMEI before you switch.",
    link: { href: "/check-compatibility", text: "Check compatibility" },
  },
  {
    q: "Can I keep my number?",
    a: "In most cases, yes. Check eligibility and transfer your number when you activate. Don't cancel your old service until the transfer is complete.",
    link: { href: "/switch", text: "Keep your number" },
  },
  {
    q: "What happens after my premium data runs out?",
    a: "You can keep using data at reduced speeds until your plan renews. Hotspot use counts toward your premium data.",
  },
  {
    q: "How do I activate?",
    a: "Insert your SIM or install your eSIM, then follow the activation steps. You can track your activation status online.",
    link: { href: "/activate", text: "Activate now" },
  },
  {
    q: "How does billing work?",
    a: "Plan prices are per line, per month, plus taxes and fees. You can review your plan and charges in your account.",
    link: { href: "/dashboard", text: "Manage my account" },
  },
  {
    q: "What's the difference between international calling and roaming?",
    a: "International calling is calling another country from the U.S. Roaming is using your Zoiko line while you're outside the U.S. They have different rates.",
    link: { href: "/check-a-destination", text: "Check a destination" },
  },
];

const normalize = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

export default function HomeLanding() {
  const [lines, setLines] = useState(1);
  const [dataUse, setDataUse] = useState("");
  const [simType, setSimType] = useState("");
  const [compare, setCompare] = useState([]);
  const [apiPlans, setApiPlans] = useState([]);

  const [zip, setZip] = useState("");
  const [zipMsg, setZipMsg] = useState({ type: "", text: "" });

  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Same read-only plans request the previous home page made, used only to
  // hand the right plan to the existing purchase modal.
  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) return;
    let cancelled = false;
    fetch(`${API_BASE_URL}/api/v1/plans`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.success && Array.isArray(data.data)) setApiPlans(data.data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const findApiPlan = (match) =>
    apiPlans.find((p) => normalize(p.title).includes(`zoiko${match}`)) ||
    apiPlans.find((p) => normalize(p.title).includes(match)) ||
    null;

  const recommendedKey = DATA_OPTIONS.find((d) => d.id === dataUse)?.plan || null;
  const recommended = corePlans.find((p) => p.key === recommendedKey) || null;

  const recommendationText = useMemo(() => {
    if (!dataUse) return "";
    if (!recommended) {
      return "Not sure how much data you use? ZoikoCore is a balanced place to start, and you can change plans later.";
    }
    const lineWord = lines === 1 ? "line" : "lines";
    let text = `${recommended.name} fits ${lines} ${lineWord} with ${dataUse} data use: $${
      recommended.price * lines
    }/mo before taxes and fees.`;
    if (lines >= 3) text += " Groups of 3+ lines may get a family discount, shown on your quote.";
    if (simType === "esim") text += " Every plan works with eSIM.";
    if (simType === "physical") text += " Every plan works with a physical SIM.";
    return text;
  }, [dataUse, recommended, lines, simType]);

  const handleBuy = (plan) => {
    const apiPlan = findApiPlan(plan.match);
    if (!apiPlan) {
      window.location.href = "/wireless-plans";
      return;
    }
    openPlanPurchaseModal(
      apiPlan.title,
      apiPlan.slug,
      apiPlan.id,
      apiPlan.price,
      apiPlan.sale_price,
      apiPlan.duration_type,
      apiPlan.bq_id,
      apiPlan.plan_type
    );
  };

  const toggleCompare = (key) => {
    setCompare((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const handleZip = (e) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip.trim())) {
      setZipMsg({ type: "error", text: "Enter a 5-digit ZIP code, for example 10001." });
      return;
    }
    setZipMsg({
      type: "ok",
      text: `Opening our coverage map in a new tab. Search for ${zip.trim()} to see estimated coverage.`,
    });
    window.open(COVERAGE_MAP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.heroKicker}>
              ZOIKO MOBILE USA
              <span className={styles.heroKickerLine} aria-hidden="true" />
              <span className={styles.flag} aria-label="United States" role="img" />
            </span>
            <h1 className={styles.heroTitle}>
              Wireless that <span className={styles.heroTitleGradient}>moves you.</span>
            </h1>
            <p className={styles.heroTagline}>The Animal &amp; Music Loving Network.&trade;</p>
            <span className={styles.heroSwoosh} aria-hidden="true" />
            <p className={styles.heroPrice}>
              Plans from $15/mo per line, before taxes and fees.{" "}
              <Link href="/terms-and-conditions">See plan terms</Link>
            </p>
            <div className={styles.heroActions}>
              <Link href="#plans" className={styles.btnPrimary}>
                Compare plans <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
              <a
                href={COVERAGE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnOutlineLight}
              >
                Check coverage <ArrowRight size={16} strokeWidth={2.4} />
              </a>
            </div>
            <ul className={styles.heroPillars}>
              <li>
                <Signal size={26} strokeWidth={2} />
                <span>
                  Flexible
                  <br />
                  Wireless Plans
                </span>
              </li>
              <li>
                <PawPrint size={26} strokeWidth={2} />
                <span>
                  Supporting
                  <br />
                  Animal Welfare
                </span>
              </li>
              <li>
                <Music size={26} strokeWidth={2} />
                <span>
                  Music, Events
                  <br />
                  &amp; Exclusives
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className={styles.quickBar}>
        <div className={`${styles.container} ${styles.quickGrid}`}>
          {quickLinks.map((q) => {
            const Icon = q.icon;
            return (
              <Link key={q.title} href={q.href} className={styles.quickCard}>
                <span className={styles.quickIcon}>
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className={styles.quickText}>
                  <span className={styles.quickTitle}>{q.title}</span>
                  <span className={styles.quickSub}>{q.sub}</span>
                </span>
                <ChevronRight size={18} className={styles.quickChevron} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className={styles.plansSection}>
        <div className={styles.container}>
          <div className={styles.centerHead}>
            <span className={styles.eyebrow}>PLANS &amp; PRICING</span>
            <h2 className={styles.h2}>Find your plan in seconds.</h2>
            <p className={styles.lead}>
              Answer three quick questions. This is a guide, not a guarantee; you can see every plan
              anytime.
            </p>
          </div>

          <div className={styles.finder}>
            <div className={styles.finderGroup}>
              <span className={styles.finderLabel} id="lines-label">
                How many lines?
              </span>
              <div className={styles.stepper} role="group" aria-labelledby="lines-label">
                <button
                  type="button"
                  onClick={() => setLines((n) => Math.max(1, n - 1))}
                  disabled={lines <= 1}
                  aria-label="Remove a line"
                >
                  <Minus size={16} strokeWidth={2.6} />
                </button>
                <span aria-live="polite">{lines}</span>
                <button
                  type="button"
                  onClick={() => setLines((n) => Math.min(10, n + 1))}
                  disabled={lines >= 10}
                  aria-label="Add a line"
                >
                  <Plus size={16} strokeWidth={2.6} />
                </button>
              </div>
            </div>

            <div className={styles.finderGroup}>
              <span className={styles.finderLabel}>How much data do you use?</span>
              <div className={styles.chips}>
                {DATA_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={dataUse === o.id}
                    className={`${styles.chip} ${dataUse === o.id ? styles.chipActive : ""}`}
                    onClick={() => setDataUse(dataUse === o.id ? "" : o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.finderGroup}>
              <span className={styles.finderLabel}>SIM type</span>
              <div className={styles.chips}>
                {SIM_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={simType === o.id}
                    className={`${styles.chip} ${simType === o.id ? styles.chipActive : ""}`}
                    onClick={() => setSimType(simType === o.id ? "" : o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {recommendationText && (
              <p className={styles.finderResult} aria-live="polite">
                {recommendationText}
              </p>
            )}
          </div>

          <div className={styles.planGrid}>
            {corePlans.map((p) => {
              const isRec = recommendedKey === p.key;
              const checked = compare.includes(p.key);
              return (
                <article
                  key={p.key}
                  className={`${styles.planCard} ${styles[`accent_${p.accent}`]} ${
                    isRec ? styles.planCardRec : ""
                  }`}
                >
                  {isRec && <span className={styles.recBadge}>Recommended</span>}
                  <h3 className={styles.planName}>{p.name}</h3>
                  <p className={styles.planTagline}>{p.tagline}</p>
                  <p className={styles.planPrice}>
                    <span className={styles.planAmount}>${p.price}</span>
                    <span className={styles.planPer}>/mo per line</span>
                  </p>
                  <p className={styles.planPriceNote}>Published price · plus taxes &amp; fees</p>
                  <ul className={styles.planFeatures}>
                    {p.features.map((f) => (
                      <li key={f}>
                        <CircleCheck size={17} strokeWidth={2} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/consumer-information" className={styles.planLabel}>
                    <FileText size={14} strokeWidth={2} />
                    Broadband Facts label for {p.name}
                  </Link>
                  <div className={styles.planActions}>
                    <button type="button" className={styles.btnBuy} onClick={() => handleBuy(p)}>
                      Buy this plan
                    </button>
                    <label className={styles.compareCheck}>
                      <input type="checkbox" checked={checked} onChange={() => toggleCompare(p.key)} />
                      Compare
                    </label>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.planFoot}>
            <p>
              Prices per line, per month, before taxes and fees. After your premium data, speeds may be
              reduced. Hotspot use counts toward your data. Full terms and Broadband Facts labels on each
              plan.
            </p>
            <div className={styles.planFootActions}>
              {compare.length >= 2 ? (
                <Link href="/all-plans" className={styles.btnCompareActive}>
                  Compare {compare.length} plans
                </Link>
              ) : (
                <span className={styles.btnCompareDisabled} aria-disabled="true">
                  Select plans to compare
                </span>
              )}
              <Link href="/wireless-plans" className={styles.btnDark}>
                See all plans <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" className={styles.coverageSection}>
        <div className={`${styles.container} ${styles.twoCol}`}>
          <div>
            <span className={styles.eyebrow}>COVERAGE</span>
            <h2 className={styles.h2Left}>Check coverage where you live and work.</h2>
            <p className={styles.leadLeft}>
              Enter a ZIP code to see estimated coverage on our partner network. Coverage is predictive
              and can vary indoors and at the edges.
            </p>
            <form className={styles.zipCard} onSubmit={handleZip} noValidate>
              <label htmlFor="home-zip" className={styles.zipLabel}>
                5-digit ZIP code
              </label>
              <div className={styles.zipRow}>
                <input
                  id="home-zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder="e.g. 10001"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value.replace(/\D/g, ""));
                    setZipMsg({ type: "", text: "" });
                  }}
                  className={styles.zipInput}
                />
                <button type="submit" className={styles.btnPrimary}>
                  Check coverage
                </button>
              </div>
              {zipMsg.text && (
                <p
                  className={zipMsg.type === "error" ? styles.zipError : styles.zipOk}
                  role={zipMsg.type === "error" ? "alert" : "status"}
                >
                  {zipMsg.text}
                </p>
              )}
              <p className={styles.zipNote}>
                We use your ZIP code only to check coverage. Coverage isn&apos;t a guarantee of service,
                speed or device compatibility.
              </p>
            </form>
          </div>

          <div className={styles.coverageVisual}>
            <img
              src={`${IMG}/home-coverage.webp`}
              alt="Smiling traveler checking his phone with a map in hand"
              className={styles.coverageImg}
            />
            <span className={styles.radar} aria-hidden="true">
              <span />
              <span />
              <span />
              <i />
            </span>
            <div className={styles.coverageNote}>
              <strong>Coverage is checked separately from your phone.</strong>
              <span>Next, check your phone works on our network.</span>
              <Link href="/check-compatibility">Check compatibility →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SWITCH STEPS */}
      <section className={styles.switchSection}>
        <div className={styles.container}>
          <div className={styles.centerHead}>
            <span className={styles.eyebrow}>SWITCHING IS EASY</span>
            <h2 className={styles.h2}>Switch to Zoiko Mobile in six steps.</h2>
            <p className={styles.lead}>Keep your phone, keep your number. We&apos;ll guide you at each step.</p>
          </div>
          <ol className={styles.stepGrid}>
            {switchSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title}>
                  <Link href={s.href} className={styles.stepCard}>
                    <span className={styles.stepTop}>
                      <span className={styles.stepIcon}>
                        <Icon size={20} strokeWidth={2} />
                      </span>
                      <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <span className={styles.stepTitle}>{s.title}</span>
                    <span className={styles.stepDesc}>{s.desc}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className={styles.warnBar}>
            <p>
              <TriangleAlert size={18} strokeWidth={2} />
              <span>
                <strong>Don&apos;t cancel your old service</strong> until your number transfer is
                complete.
              </span>
            </p>
            <div className={styles.warnActions}>
              <Link href="/byod-plans" className={styles.btnPrimarySm}>
                Bring your phone
              </Link>
              <Link href="/switch" className={styles.btnOutlineAmber}>
                Keep your number
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section className={styles.shopSection}>
        <div className={styles.container}>
          <div className={styles.shopHead}>
            <div>
              <span className={styles.eyebrow}>PHONES &amp; DEVICES</span>
              <h2 className={styles.h2Left}>Need a new phone?</h2>
              <p className={styles.leadLeft}>
                Shop on our phone store. You&apos;ll see the seller, price and terms before you buy.
              </p>
            </div>
            <Link href="/shop-phones" className={styles.btnDark}>
              Shop phones <ExternalLink size={15} strokeWidth={2.2} />
            </Link>
          </div>
          <div className={styles.shopGrid}>
            {shopCards.map((c) => (
              <Link key={c.title} href={c.href} className={styles.shopCard}>
                <img src={c.img} alt={c.alt} className={styles.shopImg} />
                <span className={styles.shopBody}>
                  <span className={styles.shopTitle}>{c.title}</span>
                  <span className={styles.shopDesc}>{c.desc}</span>
                  <span className={styles.shopCta}>{c.cta} →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY */}
      <section className={styles.familySection}>
        <div className={styles.container}>
          <div className={styles.familyCard}>
            <div className={styles.familyText}>
              <span className={styles.eyebrowPinkLight}>FAMILY &amp; FRIENDS</span>
              <h2 className={styles.h2Light}>Bring your people together.</h2>
              <p>
                Groups of 3 to 10 active lines get a 20% family discount. Each person picks their own
                plan. Lines count once they&apos;re active.
              </p>
              <Link href="/multi-line-options" className={styles.btnWhite}>
                See multi-line options <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
              <small>Discount amount is calculated by our pricing service and shown on your quote.</small>
            </div>
            <img
              src={`${IMG}/home-family.webp`}
              alt="Friends smiling at a phone together at an evening party"
              className={styles.familyImg}
            />
          </div>
        </div>
      </section>

      {/* BUSINESS + INTERNATIONAL */}
      <section className={styles.splitSection}>
        <div className={`${styles.container} ${styles.splitGrid}`}>
          <div className={styles.photoCard}>
            <img src={`${IMG}/home-business.webp`} alt="Professional smiling at her phone with colleagues" />
            <div className={styles.photoCardBody}>
              <span className={styles.photoTag}>
                <Briefcase size={14} strokeWidth={2.2} /> BUSINESS
              </span>
              <h3>Wireless for your team.</h3>
              <p>Plans for small businesses and remote teams, with a dedicated sales contact.</p>
              <Link href="/business-deals" className={styles.btnWhite}>
                Explore business plans <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
          <div className={styles.photoCard}>
            <img
              src={`${IMG}/home-international.webp`}
              alt="Woman checking her phone on a city street with a red double-decker bus"
            />
            <div className={styles.photoCardBody}>
              <span className={styles.photoTag}>
                <Globe size={14} strokeWidth={2.2} /> INTERNATIONAL
              </span>
              <h3>Call abroad. Travel connected.</h3>
              <p>Calling from the U.S. and using your line abroad are different. We&apos;ll show you which applies.</p>
              <Link href="/explore-international" className={styles.btnWhite}>
                Explore international <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className={styles.communitySection}>
        <div className={styles.container}>
          <div className={styles.centerHead}>
            <span className={styles.eyebrowPinkLight}>THE ANIMAL &amp; MUSIC LOVING NETWORK.™</span>
            <h2 className={styles.h2Light}>Stay connected to what you love.</h2>
            <p className={styles.leadLight}>
              Beyond great wireless, we champion two things that bring people together: animals and
              music.
            </p>
          </div>
          <div className={styles.communityGrid}>
            <article className={styles.communityCard}>
              <img
                src={`${IMG}/home-community-animals.webp`}
                alt="Firefighter holding a rescued cat"
                className={styles.communityImg}
              />
              <div className={styles.communityBody}>
                <span className={styles.communityTagPink}>
                  <PawPrint size={15} strokeWidth={2} /> ANIMAL WELFARE
                </span>
                <h3>Helping animals thrive.</h3>
                <p>
                  See how our giving commitment works, the organizations we check first, and verified
                  stories from the field.
                </p>
                <div className={styles.communityActions}>
                  <Link href="/explore-community" className={styles.btnPrimarySm}>
                    Explore community
                  </Link>
                  <Link href="/zoiko-mobile-animal-welfare-partnership" className={styles.textLinkLight}>
                    How giving works →
                  </Link>
                </div>
              </div>
            </article>
            <article className={styles.communityCard}>
              <img
                src={`${IMG}/home-community-music.webp`}
                alt="Musician playing an acoustic guitar outdoors"
                className={styles.communityImg}
              />
              <div className={styles.communityBody}>
                <span className={styles.communityTagAmber}>
                  <Music size={15} strokeWidth={2} /> MUSIC &amp; CREATORS
                </span>
                <h3>Celebrating the people who make music.</h3>
                <p>
                  Discover featured creators, community events and Music Hub benefits as they&apos;re
                  confirmed.
                </p>
                <div className={styles.communityActions}>
                  <Link href="/music-hub" className={styles.btnWhiteSm}>
                    Visit the Music Hub
                  </Link>
                  <Link href="/music-events-perk" className={styles.textLinkLight}>
                    Events &amp; experiences →
                  </Link>
                </div>
              </div>
            </article>
          </div>
          <p className={styles.communityNote}>
            Impact figures and partners are published only once verified. Read our method in How Giving
            Works.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div>
            <span className={styles.eyebrow}>QUESTIONS</span>
            <h2 className={styles.h2Left}>Answers before you switch.</h2>
            <div className={styles.supportCard}>
              <img src={`${IMG}/home-faq-support.webp`} alt="Smiling support agent wearing a headset" />
              <div className={styles.supportBody}>
                <strong>Talk to a real person</strong>
                <p>Our U.S.-based team can help you choose, switch and activate.</p>
                <div className={styles.supportActions}>
                  <a href="tel:8009888116" className={styles.btnWhiteSm}>
                    <Phone size={15} strokeWidth={2.2} /> 800-988-8116
                  </a>
                  <Link href="/support" className={styles.textLinkLight}>
                    Help center →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.faqList}>
            {faqs.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={item.q} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
                  <button
                    type="button"
                    className={styles.faqBtn}
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <span className={`${styles.faqToggle} ${isOpen ? styles.faqToggleOpen : ""}`} aria-hidden="true">
                      {isOpen ? <Minus size={13} strokeWidth={2.8} /> : <Plus size={13} strokeWidth={2.8} />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className={styles.faqAnswer}>
                      {item.a}
                      {item.link && (
                        <>
                          {" "}
                          <Link href={item.link.href}>{item.link.text}</Link>
                        </>
                      )}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div>
              <h2>Ready when you are.</h2>
              <p>Compare plans in minutes, or talk to our team.</p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="#plans" className={styles.btnWhite}>
                Compare plans <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
              <Link href="/support" className={styles.btnOutlineLight}>
                Get support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
