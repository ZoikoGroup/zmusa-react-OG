"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Smartphone,
  Briefcase,
  Plane,
  Signal,
  Phone,
  Wifi,
  Globe,
  CardSim,
  CalendarDays,
  Layers,
  CircleCheck,
  CreditCard,
  FileText,
  ShieldCheck,
  TriangleAlert,
  Tag,
  ArrowLeftRight,
  Headphones,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { openPlanPurchaseModal } from "../components/Header";
import styles from "./PostpaidPlans.module.css";

const IMG = "/img/postpaid-plans";
const COVERAGE_MAP_URL = "https://mvnoc.ai/coverage-map";
const MAX_COMPARE = 3;

const planTabs = [
  { label: "Prepaid Plans", href: "/prepaid-plans", icon: Smartphone },
  { label: "Postpaid Plans", href: "/postpaid-plans", icon: Smartphone, active: true },
  { label: "Business Plans", href: "/business-deals", icon: Briefcase },
  { label: "Travel Plans", href: "/travel-plans", icon: Plane },
];

// Display content from the approved design. `match` finds the same plan in the
// existing postpaid plans feed so the buttons use the existing checkout flow.
const plans = [
  {
    key: "lite",
    match: "lite",
    name: "Zoiko Lite",
    price: 15,
    blurb: "The essential postpaid plan for everyday wireless.",
    data: "5GB",
    hotspot: "2GB",
    tone: "green",
    img: `${IMG}/postpaid-plan-lite.webp`,
    alt: "Woman smiling at her phone at a desk",
  },
  {
    key: "core",
    match: "core",
    name: "Zoiko Core",
    price: 25,
    blurb: "A great balance of data, features and value.",
    data: "10GB",
    hotspot: "4GB",
    tone: "orange",
    img: `${IMG}/postpaid-plan-core.webp`,
    alt: "Couple laughing while taking a selfie",
  },
  {
    key: "max",
    match: "max",
    name: "Zoiko Max",
    price: 50,
    blurb: "More premium data, more freedom to enjoy.",
    data: "20GB",
    hotspot: "10GB",
    tone: "pink",
    img: `${IMG}/postpaid-plan-max.webp`,
    alt: "Two colleagues working together in an office",
  },
  {
    key: "infinity",
    match: "infinity",
    name: "Zoiko Infinity",
    price: 65,
    blurb: "A premium experience with more of what you love.",
    data: "30GB",
    hotspot: "15GB",
    tone: "orange",
    wide: true,
    img: `${IMG}/postpaid-plan-infinity.webp`,
    alt: "Group of professionals using their phones outdoors",
  },
  {
    key: "supreme",
    match: "supreme",
    name: "Zoiko Supreme Unlimited",
    price: 72,
    blurb: "Our most complete plan, with the most premium data.",
    data: "35GB",
    hotspot: "25GB",
    tone: "green",
    wide: true,
    img: `${IMG}/postpaid-plan-supreme.webp`,
    alt: "Business team in a meeting",
  },
];

const explainCards = [
  {
    icon: CalendarDays,
    title: "Minimum term",
    desc: "The length of your agreement, shown before you commit.",
  },
  {
    icon: CreditCard,
    title: "Due today",
    desc: "Any activation or SIM fees, confirmed in your quote.",
  },
  {
    icon: FileText,
    title: "Your monthly bill",
    desc: "Your plan price per line, plus taxes and fees, billed after each month of service.",
  },
  {
    icon: Smartphone,
    title: "Phones are separate",
    desc: "Any phone installment plan is a separate agreement, shown on its own.",
  },
];

const quickChecks = [
  {
    img: `${IMG}/postpaid-check-phone.webp`,
    alt: "Friends comparing their phones",
    title: "Bring your phone",
    desc: "Check your phone works before you switch.",
    cta: "Check compatibility",
    href: "/check-compatibility",
  },
  {
    img: `${IMG}/postpaid-check-coverage.webp`,
    alt: "Traveler smiling at his phone while holding a map",
    title: "Check coverage",
    desc: "See estimated coverage for your ZIP code.",
    cta: "Check coverage",
    href: COVERAGE_MAP_URL,
    external: true,
  },
  {
    img: `${IMG}/postpaid-check-number.webp`,
    alt: "Woman using her phone on a city street",
    title: "Keep your number",
    desc: "Switch without losing your number.",
    cta: "Keep my number",
    href: "/switch",
  },
];

const faqs = [
  {
    q: "What does postpaid mean?",
    a: "You're billed each month for service you've used, rather than paying in advance. The monthly price, taxes and fees appear on your bill.",
  },
  {
    q: "Is there a contract?",
    a: "Your minimum term is shown in each plan's details and in your quote, so you'll see it before you commit.",
  },
  {
    q: "What happens after my premium data?",
    a: "You can keep using data, but speeds may be reduced until your next billing month.",
  },
  {
    q: "Does hotspot use count toward my data?",
    a: "Yes. Mobile hotspot uses your premium data allowance.",
  },
  {
    q: "Do I need a credit check?",
    a: "If any eligibility check applies to your order, we'll tell you before you commit. Call us if you'd like to know more first.",
  },
  {
    q: "Can I finance a phone?",
    a: "Any phone installment plan is a separate agreement from your service plan, and it's shown on its own.",
    link: { href: "/shop-phones", text: "Shop phones" },
  },
  {
    q: "Can I keep my number?",
    a: "In most cases, yes. Check eligibility and transfer your number when you activate. Don't cancel your old service until the transfer is complete.",
    link: { href: "/switch", text: "Keep your number" },
  },
];

const trustItems = [
  { icon: CalendarDays, title: "Term shown upfront", desc: "Minimum term and fees before you commit." },
  { icon: Tag, title: "Clear pricing", desc: "Price per line, plus taxes and fees." },
  { icon: ArrowLeftRight, title: "Easy switching", desc: "Keep your number and switch in a few steps." },
  { icon: Headphones, title: "Real support", desc: "Help from our U.S.-based team." },
  { icon: Signal, title: "Broadband Facts", desc: "A label for every plan." },
];

const normalize = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

function PlanFeatures({ plan }) {
  const rows = [
    { icon: Signal, label: `${plan.data} premium data,`, rest: " then reduced speeds" },
    { icon: Phone, label: "Talk & text:", link: "see plan details" },
    { icon: Wifi, label: `${plan.hotspot} mobile hotspot`, rest: " (uses premium data)" },
    { icon: Globe, label: "International:", link: "see plan details" },
    { icon: CardSim, label: "SIM or eSIM", rest: " (check your phone)" },
    { icon: CalendarDays, label: "Term:", link: "see plan details" },
  ];
  return (
    <ul className={styles.features}>
      {rows.map((r) => {
        const Icon = r.icon;
        return (
          <li key={r.label}>
            <Icon size={17} strokeWidth={2} className={styles[`icon_${plan.tone}`]} />
            <span>
              <strong>{r.label}</strong>
              {r.rest}
              {r.link && <span className={styles.featureLink}> {r.link}</span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function PostpaidPlansClient() {
  const [apiPlans, setApiPlans] = useState([]);
  const [compare, setCompare] = useState([]);
  const [compareMsg, setCompareMsg] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const compareRef = useRef(null);

  // Same read-only request the previous postpaid page made.
  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) return;
    let cancelled = false;
    fetch(`${API_BASE_URL}/api/v1/plans/postpaid-plans`)
      .then((res) => res.json())
      .then((result) => {
        if (!cancelled && result?.success && Array.isArray(result.data)) setApiPlans(result.data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const findApiPlan = (plan) => {
    const name = normalize(plan.name);
    return (
      apiPlans.find((p) => normalize(p.title) === name) ||
      apiPlans.find((p) => normalize(p.title).includes(plan.match)) ||
      null
    );
  };

  const detailsHref = (plan) => {
    const apiPlan = findApiPlan(plan);
    return apiPlan?.slug ? `/plans/${apiPlan.slug}` : "/wireless-plans";
  };

  const choosePlan = (plan) => {
    const apiPlan = findApiPlan(plan);
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
    setCompareMsg("");
    setCompare((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= MAX_COMPARE) {
        setCompareMsg(`You can compare up to ${MAX_COMPARE} plans. Untick one to add another.`);
        return prev;
      }
      return [...prev, key];
    });
  };

  useEffect(() => {
    if (compare.length < 2) setShowCompare(false);
  }, [compare]);

  const openCompare = () => {
    if (compare.length < 2) {
      setCompareMsg("Select at least 2 plans to compare.");
      return;
    }
    setShowCompare(true);
    requestAnimationFrame(() => compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const comparedPlans = plans.filter((p) => compare.includes(p.key));

  const renderPlanCard = (plan) => {
    const checked = compare.includes(plan.key);
    return (
      <article key={plan.key} className={`${styles.planCard} ${plan.wide ? styles.planCardWide : ""}`}>
        <div className={styles.planImgWrap}>
          <img src={plan.img} alt={plan.alt} className={styles.planImg} />
          <span className={`${styles.planBadge} ${styles[`badge_${plan.tone}`]}`}>{plan.name}</span>
        </div>

        <div className={styles.planBody}>
          <div className={styles.planMain}>
            <div className={styles.planPriceRow}>
              <p className={styles.planPrice}>
                <span>${plan.price}</span>/mo
              </p>
              <p className={styles.planBlurb}>{plan.blurb}</p>
            </div>

            {!plan.wide && <PlanFeatures plan={plan} />}

            <div className={styles.planMeta}>
              <label className={styles.compareCheck}>
                <input type="checkbox" checked={checked} onChange={() => toggleCompare(plan.key)} />
                Compare
              </label>
              <Link href="/consumer-information" className={styles.factsLink}>
                Broadband Facts
              </Link>
            </div>

            <div className={styles.planActions}>
              <Link href={detailsHref(plan)} className={styles.btnOutline}>
                View plan details
              </Link>
              <button type="button" className={styles.btnChoose} onClick={() => choosePlan(plan)}>
                Choose plan
              </button>
            </div>
          </div>

          {plan.wide && (
            <div className={styles.planSide}>
              <PlanFeatures plan={plan} />
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <svg
          className={styles.heroArcs}
          viewBox="0 0 60 440"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* magenta band from the top edge */}
          <path d="M0,0 H51 C38,80 24,160 18,232 C17,236 14,236 12,232 L0,232 Z" fill="#cc1660" />
          {/* orange band, lower */}
          <path d="M6,160 C14,190 19,230 18,275 C17,335 10,392 0,440 L0,160 Z" fill="#f19021" />
          <path d="M0,300 L17,300 C16,350 9,400 0,440 Z" fill="#d98d24" />
          {/* green band, middle */}
          <path d="M0,38 C7,100 12,170 11,235 C10,280 5,310 0,332 Z" fill="#2e8a64" />
          <path d="M0,115 C8,160 11,205 10,248 C9,285 5,312 0,332 Z" fill="#35985a" />
        </svg>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <p className={styles.heroKicker}>
            Wireless that moves you.
            <span className={styles.heroKickerLine} aria-hidden="true" />
          </p>
          <h1 className={styles.heroTitle}>Postpaid Plans</h1>
          <p className={styles.heroTagline}>
            The <span className={styles.accentAmber}>Animal</span> &amp;{" "}
            <span className={styles.accentPink}>Music</span> Loving Network.&trade;
          </p>
          <p className={styles.heroText}>
            Monthly wireless, billed after you use it, with clear terms before you commit.
          </p>
          <div className={styles.heroActions}>
            <a href="#plans" className={styles.btnHeroPrimary}>
              Compare postpaid plans <ChevronRight size={18} strokeWidth={2.4} />
            </a>
            <Link href="/byod-plans" className={styles.btnHeroOutline}>
              Bring your phone <ChevronRight size={18} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className={styles.container}>
        <nav className={styles.tabs} aria-label="Plan types">
          {planTabs.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.label}
                href={t.href}
                className={`${styles.tab} ${t.active ? styles.tabActive : ""}`}
                aria-current={t.active ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={2} />
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* PLANS */}
      <section id="plans" className={styles.plansSection}>
        <div className={styles.container}>
          <div className={styles.planGrid3}>{plans.filter((p) => !p.wide).map(renderPlanCard)}</div>
          <div className={styles.planGrid2}>{plans.filter((p) => p.wide).map(renderPlanCard)}</div>

          <p className={styles.planNote}>
            Prices are per line, per month, before taxes and fees, and reflect our published plans as of
            November 12, 2026. After your premium data, speeds may be reduced. Hotspot use counts toward
            premium data. Contract terms, talk &amp; text and international details are shown in each
            plan&apos;s details before you commit.
          </p>

          <div className={styles.compareBar}>
            <div className={styles.compareBarTitle}>
              <Layers size={26} strokeWidth={1.8} />
              <span>Compare Plans</span>
            </div>
            <p className={styles.compareBarText}>
              {compareMsg || "Select up to 3 plans to compare data, hotspot, price and terms side by side."}
            </p>
            <button
              type="button"
              className={`${styles.compareBarBtn} ${compare.length >= 2 ? styles.compareBarBtnReady : ""}`}
              onClick={openCompare}
            >
              Compare Selected ( {compare.length} /{MAX_COMPARE}) <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          </div>

          {showCompare && comparedPlans.length >= 2 && (
            <div ref={compareRef} className={styles.comparePanel}>
              <div className={styles.comparePanelHead}>
                <h2>Compare plans</h2>
                <button type="button" onClick={() => setShowCompare(false)} aria-label="Close comparison">
                  <X size={18} strokeWidth={2.4} />
                </button>
              </div>
              <div className={styles.compareTableWrap}>
                <table className={styles.compareTable}>
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className={styles.srOnly}>Feature</span>
                      </th>
                      {comparedPlans.map((p) => (
                        <th key={p.key} scope="col">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Price</th>
                      {comparedPlans.map((p) => (
                        <td key={p.key}>${p.price}/mo per line</td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Premium data</th>
                      {comparedPlans.map((p) => (
                        <td key={p.key}>{p.data}, then reduced speeds</td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Mobile hotspot</th>
                      {comparedPlans.map((p) => (
                        <td key={p.key}>{p.hotspot} (uses premium data)</td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Talk, text &amp; term</th>
                      {comparedPlans.map((p) => (
                        <td key={p.key}>See plan details</td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className={styles.srOnly}>Actions</span>
                      </th>
                      {comparedPlans.map((p) => (
                        <td key={p.key}>
                          <button type="button" className={styles.btnChooseSm} onClick={() => choosePlan(p)}>
                            Choose plan
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className={styles.comparePanelNote}>Prices before taxes and fees.</p>
            </div>
          )}
        </div>
      </section>

      {/* PLAN FIT + USAGE REVIEW */}
      <section className={styles.helpersSection}>
        <div className={`${styles.container} ${styles.helpersGrid}`}>
          <div className={styles.fitCard}>
            <div className={styles.fitVisual} aria-hidden="true">
              <div className={styles.fitPhone}>
                <span className={styles.fitZ}>Z</span>
                <span>
                  Zoiko
                  <br />
                  Plan Fit
                </span>
              </div>
            </div>
            <div className={styles.fitBody}>
              <h2 className={styles.fitTitle}>Zoiko Plan Fit</h2>
              <p className={styles.fitSub}>Find the right plan for your life, in minutes.</p>
              <ul className={styles.checkList}>
                <li>
                  <CircleCheck size={17} strokeWidth={2} /> Suggestions based on your needs, with clear reasons.
                </li>
                <li>
                  <CircleCheck size={17} strokeWidth={2} /> Can suggest a cheaper plan, or that you keep your
                  current one.
                </li>
                <li>
                  <CircleCheck size={17} strokeWidth={2} /> No account number, PIN or phone ID needed.
                </li>
              </ul>
              <Link href="/#plans" className={styles.btnPill}>
                Find my plan <ChevronRight size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          <div className={styles.reviewCard}>
            <div className={styles.usageMock} aria-hidden="true">
              <strong>Your recent usage</strong>
              <small>Sign in to see your usage</small>
              {["Data", "Talk", "Text"].map((k) => (
                <div key={k} className={styles.usageRow}>
                  <span>
                    {k}
                    <em>—</em>
                  </span>
                  <i />
                </div>
              ))}
            </div>
            <div className={styles.reviewBody}>
              <h2 className={styles.reviewTitle}>Usage-based plan review</h2>
              <p className={styles.fitSub}>Signed in? Let&apos;s see if there&apos;s a better plan for you.</p>
              <ul className={`${styles.checkList} ${styles.checkListGreen}`}>
                <li>
                  <CircleCheck size={17} strokeWidth={2} /> Review your real usage against your current plan.
                </li>
                <li>
                  <CircleCheck size={17} strokeWidth={2} /> See savings only when we can confirm them.
                </li>
                <li>
                  <CircleCheck size={17} strokeWidth={2} /> Keep, switch or downgrade. Your choice, with no
                  changes until you confirm.
                </li>
              </ul>
              <Link href="/login" className={styles.btnPill}>
                Sign in to review <ChevronRight size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLAINED */}
      <section className={styles.explainSection}>
        <div className={`${styles.container} ${styles.explainGrid}`}>
          <div>
            <span className={styles.eyebrow}>POSTPAID, EXPLAINED</span>
            <h2 className={styles.h2}>Know exactly what you&apos;re signing up for.</h2>
            <p className={styles.lead}>
              Postpaid means you&apos;re billed monthly for service you&apos;ve used. Here&apos;s what
              you&apos;ll always see before you commit.
            </p>
            <div className={styles.explainCards}>
              {explainCards.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className={styles.explainCard}>
                    <span className={styles.explainIcon}>
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <strong>{c.title}</strong>
                    <p>{c.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.explainVisual}>
            <img
              src={`${IMG}/postpaid-explained.webp`}
              alt="Close-up of hands using a smartphone"
              className={styles.explainImg}
            />
            <div className={styles.explainNote}>
              <ShieldCheck size={20} strokeWidth={2} />
              <div>
                <strong>Nothing changes until you confirm.</strong>
                <span>
                  Choosing a plan opens a review with your quote and terms. We never start service or charge
                  you from this page.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CHECKS */}
      <section className={styles.checksSection}>
        <div className={styles.container}>
          <div className={styles.centerHead}>
            <span className={styles.eyebrow}>GET READY TO SWITCH</span>
            <h2 className={styles.h2}>Three quick checks before you choose.</h2>
          </div>
          <div className={styles.checksGrid}>
            {quickChecks.map((c) => {
              const inner = (
                <>
                  <img src={c.img} alt={c.alt} className={styles.checkImg} />
                  <span className={styles.checkBody}>
                    <span className={styles.checkTitle}>{c.title}</span>
                    <span className={styles.checkDesc}>{c.desc}</span>
                    <span className={styles.checkCta}>{c.cta} →</span>
                  </span>
                </>
              );
              return c.external ? (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className={styles.checkCard}>
                  {inner}
                </a>
              ) : (
                <Link key={c.title} href={c.href} className={styles.checkCard}>
                  {inner}
                </Link>
              );
            })}
          </div>
          <p className={styles.warnBar}>
            <TriangleAlert size={18} strokeWidth={2} />
            <span>
              <strong>Don&apos;t cancel your old service</strong> until your number transfer is complete.
            </span>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div>
            <span className={styles.eyebrow}>QUESTIONS</span>
            <h2 className={styles.h2}>Postpaid questions, answered.</h2>
            <div className={styles.supportCard}>
              <img src={`${IMG}/postpaid-faq-support.webp`} alt="Smiling support agent wearing a headset" />
              <div className={styles.supportBody}>
                <strong>Not sure which plan?</strong>
                <p>Talk to our team. We&apos;ll recommend what fits, even if it costs less.</p>
                <a href="tel:8009888116" className={styles.btnWhite}>
                  <Phone size={16} strokeWidth={2.2} /> 800-988-8116
                </a>
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

      {/* TRUST STRIP */}
      <section className={styles.trustSection}>
        <div className={`${styles.container} ${styles.trustGrid}`}>
          {trustItems.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className={styles.trustItem}>
                <Icon size={24} strokeWidth={1.8} />
                <div>
                  <strong>{t.title}</strong>
                  <span>{t.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
