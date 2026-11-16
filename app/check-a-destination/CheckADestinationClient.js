"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Plane,
  Search,
  Plus,
  Minus,
  X,
  Wifi,
  AlertTriangle,
  Globe,
  Headphones,
  ArrowRight,
  Check,
} from "lucide-react";
import { roamingRates } from "../utils/roamingRates";
import { internationalCountries } from "../utils/internationalCountries";
import styles from "./CheckADestination.module.css";

const IMG = "/img/check-a-destination";
const MAX_STOPS = 4;

const PLANS = ["Zoiko Lite", "Zoiko Core", "Zoiko Max", "Family & Multi-Line", "Prepaid", "Not sure"];

const MODES = [
  {
    id: "calling",
    title: "Calling from the U.S.",
    sub: "Call or text another country",
    icon: Phone,
  },
  {
    id: "abroad",
    title: "Traveling abroad",
    sub: "Use my line outside the U.S.",
    icon: Plane,
  },
];

// Search words that point at special (non-country) networks in the rate table.
const ALIASES = {
  cruise: "Maritime Services",
  ship: "Maritime Services",
  maritime: "Maritime Services",
  flight: "Airline Services",
  plane: "Airline Services",
  airline: "Airline Services",
  "in-flight": "Airline Services",
  uk: "United Kingdom",
};

const resultCards = [
  {
    key: "calling",
    img: `${IMG}/cad-result-calling-us.webp`,
    alt: "Man on a phone call at his office desk",
    title: "Calling from the U.S.",
    desc: "Minutes and rates for mobile and landline numbers, by plan.",
  },
  {
    key: "abroad",
    img: `${IMG}/cad-result-abroad.webp`,
    alt: "Woman on a phone call overlooking a city at night",
    title: "Using your line abroad",
    desc: "Data, calls and texts while you're in another country.",
  },
  {
    key: "cruise",
    img: `${IMG}/cad-result-cruise.webp`,
    alt: "Traveler taking a selfie at an airport",
    title: "Cruises and flights",
    desc: "At-sea and in-flight networks are priced separately.",
  },
];

const travelTips = [
  {
    img: `${IMG}/cad-tip-wifi.webp`,
    alt: "Phone showing connected network lines over a city",
    tag: "SETTINGS",
    icon: Wifi,
    title: "Data roaming & Wi-Fi calling",
    desc: "Turn data roaming on only when you need it, and use Wi-Fi calling where it's supported.",
    href: "/wi-fi-calling",
  },
  {
    img: `${IMG}/cad-tip-emergency.webp`,
    alt: "Phone keypad dialing an emergency number",
    tag: "SAFETY",
    icon: AlertTriangle,
    title: "Local emergency numbers",
    desc: "911 may not work abroad. Each result shows the local number to save.",
    href: "/911-e911-disclosure",
  },
  {
    img: `${IMG}/cad-tip-usage.webp`,
    alt: "Woman smiling at her phone in front of a world map",
    tag: "TIPS",
    icon: Globe,
    title: "International usage tips",
    desc: "Save data with offline maps, low-data mode and daily usage checks.",
    href: "/international-usage-tips",
  },
  {
    img: `${IMG}/cad-tip-support.webp`,
    alt: "Support agent wearing a headset",
    tag: "HELP",
    icon: Headphones,
    title: "Talk to us before you travel",
    desc: "Call 800-988-8116 and we'll go through your trip with you.",
    href: "tel:8009888116",
  },
];

const faqs = [
  {
    q: "What's the difference between calling and roaming?",
    a: "International calling is calling another country from the U.S. Roaming is using your Zoiko line while you're outside the U.S. They have different rates.",
  },
  {
    q: 'Why does it say "Rate unavailable"?',
    a: "We only show rates that have been approved and published. If a destination or network isn't in our published rates, we show \"Rate unavailable\" instead of guessing. Call us before you travel and we'll check for you.",
  },
  {
    q: 'Is "Unknown" the same as free?',
    a: "No. Unknown means we don't have an approved rate to show you. We never display it as $0.00, and you shouldn't assume usage there is free.",
  },
  {
    q: "Do cruises and flights use my roaming rates?",
    a: "No. At-sea and in-flight networks are priced separately from country roaming and are often much higher. Search \"cruise\" or \"flight\" to see those rates.",
  },
  {
    q: "Can I buy a travel pass here?",
    a: "Not on this page. This tool shows rates only. See our travel plans for passes available for your destination.",
    link: { href: "/travel-plans", text: "View travel plans" },
  },
  {
    q: "Why should I check my own line?",
    a: "Your plan, add-ons and line settings can change what applies to you. Signed-in account owners can see what's confirmed for each line.",
  },
  {
    q: "Will 911 work abroad?",
    a: "Don't assume it will. Save your destination's local emergency number before you go, and use it or another available way to reach local services.",
  },
];

const normalize = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

function findRoaming(name) {
  const n = normalize(name);
  return roamingRates.find((r) => normalize(r.destination) === n) || null;
}

function findCalling(name) {
  const n = normalize(name);
  const landline = internationalCountries.find((c) => normalize(c.destination) === n);
  const mobile = internationalCountries.find(
    (c) => normalize(c.destination) === `${n} - cellular`
  );
  if (!landline && !mobile) return null;
  return { landline: landline?.minutes ?? null, mobile: mobile?.minutes ?? null };
}

// Turns what the user typed into a known destination name (or keeps it as typed).
function resolveDestination(input, allNames) {
  const n = normalize(input);
  if (!n) return "";
  if (ALIASES[n]) return ALIASES[n];
  const exact = allNames.find((d) => normalize(d) === n);
  if (exact) return exact;
  const starts = allNames.filter((d) => normalize(d).startsWith(n));
  if (starts.length === 1) return starts[0];
  return input.trim();
}

const rateValue = (v) => {
  if (v === undefined || v === null || String(v).trim() === "") return null;
  return String(v).replace(/\$\s+/, "$");
};

const parseRate = (v) => {
  const num = parseFloat(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : null;
};

export default function CheckADestinationClient() {
  const [mode, setMode] = useState("");
  const [destination, setDestination] = useState("");
  const [plan, setPlan] = useState("");
  const [formError, setFormError] = useState("");
  const [result, setResult] = useState(null);

  const [stopInput, setStopInput] = useState("");
  const [stops, setStops] = useState([]);
  const [stopError, setStopError] = useState("");

  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const resultsRef = useRef(null);
  const formRef = useRef(null);

  const allNames = useMemo(() => {
    const set = new Set(roamingRates.map((r) => r.destination));
    internationalCountries.forEach((c) => set.add(c.destination.replace(/ - Cellular$/i, "")));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const roamingNames = useMemo(() => roamingRates.map((r) => r.destination), []);

  const runCheck = (nextMode, nextDestination) => {
    if (!nextMode) {
      setFormError("Choose what you're doing: calling from the U.S. or traveling abroad.");
      return;
    }
    if (!nextDestination.trim()) {
      setFormError("Enter a country, territory or \"cruise\".");
      return;
    }
    setFormError("");

    const name = resolveDestination(nextDestination, allNames);
    if (nextMode === "calling") {
      setResult({ mode: "calling", name, plan, data: findCalling(name) });
    } else {
      setResult({ mode: "abroad", name, plan, data: findRoaming(name) });
    }

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCheck(mode, destination);
  };

  const handleResultCard = (key) => {
    if (key === "cruise") {
      setMode("abroad");
      setDestination("Maritime Services");
      runCheck("abroad", "Maritime Services");
      return;
    }
    setMode(key);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const addStop = (e) => {
    e.preventDefault();
    if (!stopInput.trim()) {
      setStopError("Choose a destination to add.");
      return;
    }
    if (stops.length >= MAX_STOPS) {
      setStopError(`You can add up to ${MAX_STOPS} stops.`);
      return;
    }
    const name = resolveDestination(stopInput, roamingNames);
    if (stops.some((s) => normalize(s.name) === normalize(name))) {
      setStopError(`${name} is already on your trip.`);
      return;
    }
    setStops((prev) => [...prev, { name, data: findRoaming(name) }]);
    setStopInput("");
    setStopError("");
  };

  const removeStop = (name) => {
    setStops((prev) => prev.filter((s) => s.name !== name));
    setStopError("");
  };

  const tripSummary = useMemo(() => {
    if (!stops.length) return null;
    const missing = stops.filter((s) => !s.data);
    if (missing.length) return { ok: false, missing: missing.length };
    const max = (key) =>
      stops.reduce((acc, s) => {
        const v = parseRate(s.data[key]);
        return v !== null && (acc === null || v > acc) ? v : acc;
      }, null);
    return { ok: true, mb: max("per_mb"), min: max("per_minute"), sms: max("per_sms") };
  }, [stops]);

  const fmt = (n) => (n === null ? "Rate unavailable" : `$${n.toFixed(2)}`);

  const renderResult = () => {
    if (!result) return null;
    const { mode: rMode, name, data, plan: rPlan } = result;
    const isCalling = rMode === "calling";
    const fullTableHref = isCalling ? "/international-calling-country-list" : "/roaming-rates";

    return (
      <div className={styles.resultPanel} aria-live="polite">
        <div className={styles.resultHead}>
          <div>
            <span className={styles.resultEyebrow}>
              {isCalling ? "CALLING FROM THE U.S." : "USING YOUR LINE ABROAD"}
            </span>
            <h3 className={styles.resultTitle}>{name}</h3>
            {rPlan && <p className={styles.resultPlan}>Plan: {rPlan}</p>}
          </div>
          <span className={data ? styles.statusOk : styles.statusUnknown}>
            {data ? <Check size={13} strokeWidth={2.6} /> : <AlertTriangle size={13} strokeWidth={2.4} />}
            {data ? "Approved rate" : "Rate unavailable"}
          </span>
        </div>

        {data && isCalling && (
          <div className={styles.rateGrid}>
            <div className={styles.rateBox}>
              <span className={styles.rateLabel}>Landline numbers</span>
              <span className={styles.rateValue}>
                {data.landline !== null ? `${data.landline} min` : "Rate unavailable"}
              </span>
              <span className={styles.rateNote}>Included international minutes</span>
            </div>
            <div className={styles.rateBox}>
              <span className={styles.rateLabel}>Mobile numbers</span>
              <span className={styles.rateValue}>
                {data.mobile !== null ? `${data.mobile} min` : "Rate unavailable"}
              </span>
              <span className={styles.rateNote}>Included international minutes</span>
            </div>
          </div>
        )}

        {data && !isCalling && (
          <div className={styles.rateGrid}>
            <div className={styles.rateBox}>
              <span className={styles.rateLabel}>Data</span>
              <span className={styles.rateValue}>{rateValue(data.per_mb) ?? "Rate unavailable"}</span>
              <span className={styles.rateNote}>per MB · billed in {data.rounding_mb}</span>
            </div>
            <div className={styles.rateBox}>
              <span className={styles.rateLabel}>Calls</span>
              <span className={styles.rateValue}>{rateValue(data.per_minute) ?? "Rate unavailable"}</span>
              <span className={styles.rateNote}>per minute · billed per {data.rounding_minute}</span>
            </div>
            <div className={styles.rateBox}>
              <span className={styles.rateLabel}>Texts</span>
              <span className={styles.rateValue}>{rateValue(data.per_sms) ?? "Rate unavailable"}</span>
              <span className={styles.rateNote}>per SMS</span>
            </div>
          </div>
        )}

        {!data && (
          <p className={styles.resultUnknownText}>
            We don&apos;t have an approved {isCalling ? "calling" : "roaming"} rate for &ldquo;{name}&rdquo;.
            We never show unknown rates as $0.00, so please don&apos;t assume it&apos;s free. Check the
            spelling, or call <a href="tel:8009888116">800-988-8116</a> before you{" "}
            {isCalling ? "call" : "travel"}.
          </p>
        )}

        <div className={styles.resultFoot}>
          <span>
            Source: Zoiko Mobile published {isCalling ? "international calling" : "roaming"} rates.
            {data && " What applies to your line can depend on your plan and add-ons."}
          </span>
          <Link href={fullTableHref} className={styles.resultLink}>
            See full table <ArrowRight size={13} strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
            <h1 className={styles.heroTitle}>
              Check a <span className={styles.heroTitleAccent}>destination.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              See what applies to your plan when you call another country from the U.S., or use your
              Zoiko line abroad. We show only approved rates, with their source.
            </p>

            <form ref={formRef} className={styles.checkCard} onSubmit={handleSubmit} noValidate>
              <fieldset className={styles.fieldset}>
                <legend className={styles.stepLabel}>
                  <span className={styles.stepNum}>1</span> WHAT ARE YOU DOING?
                </legend>
                <div className={styles.modeGrid}>
                  {MODES.map((m) => {
                    const Icon = m.icon;
                    const active = mode === m.id;
                    return (
                      <label
                        key={m.id}
                        className={`${styles.modeOption} ${active ? styles.modeOptionActive : ""}`}
                      >
                        <input
                          type="radio"
                          name="mode"
                          value={m.id}
                          checked={active}
                          onChange={() => {
                            setMode(m.id);
                            setFormError("");
                          }}
                          className={styles.modeRadio}
                        />
                        <span className={m.id === "calling" ? styles.modeIconPink : styles.modeIconGreen}>
                          <Icon size={15} strokeWidth={2.2} />
                        </span>
                        <span>
                          <span className={styles.modeTitle}>{m.title}</span>
                          <span className={styles.modeSub}>{m.sub}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className={styles.fieldsRow}>
                <div className={styles.field}>
                  <label htmlFor="cad-destination" className={styles.stepLabel}>
                    <span className={styles.stepNum}>2</span> DESTINATION
                  </label>
                  <div className={styles.inputWrap}>
                    <Search size={14} strokeWidth={2.2} className={styles.inputIcon} />
                    <input
                      id="cad-destination"
                      type="text"
                      list="cad-destinations"
                      autoComplete="off"
                      placeholder={'Country, territory or "cruise"'}
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                        setFormError("");
                      }}
                      className={styles.textInput}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="cad-plan" className={styles.stepLabel}>
                    <span className={styles.stepNum}>3</span> YOUR PLAN
                  </label>
                  <select
                    id="cad-plan"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="">Choose a plan</option>
                    {PLANS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <datalist id="cad-destinations">
                {allNames.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>

              {formError && (
                <p className={styles.formError} role="alert">
                  {formError}
                </p>
              )}

              <button type="submit" className={styles.primaryBtn}>
                <Search size={14} strokeWidth={2.4} />
                <span>Check destination</span>
              </button>
            </form>
          </div>

          <div className={styles.heroCollage}>
            <img
              src={`${IMG}/cad-hero-main.webp`}
              alt="Woman smiling at her phone on a city street with a red double-decker bus"
              className={styles.heroMainImg}
            />
            <img
              src={`${IMG}/cad-hero-friends.webp`}
              alt="Two colleagues looking at a phone together"
              className={styles.heroSmallImg}
            />
            <div className={styles.ruleCard}>
              <span className={styles.ruleEyebrow}>OUR RULE</span>
              <p className={styles.ruleText}>Unknown is never shown as $0.00.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section ref={resultsRef} className={styles.resultsSection} id="result">
        <div className={styles.container}>
          <h2 className={styles.resultsHeading}>
            {result ? "Your result" : "Your result will appear here"}
          </h2>

          {renderResult()}

          <div className={styles.resultCards}>
            {resultCards.map((c) => (
              <button
                key={c.key}
                type="button"
                className={styles.resultCard}
                onClick={() => handleResultCard(c.key)}
              >
                <img src={c.img} alt={c.alt} className={styles.resultCardImg} />
                <span className={styles.resultCardBody}>
                  <span className={styles.resultCardTitle}>{c.title}</span>
                  <span className={styles.resultCardDesc}>{c.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MULTI-STOP */}
      <section className={styles.multiSection}>
        <div className={`${styles.container}`}>
          <span className={styles.eyebrowLight}>MULTI-STOP TRIP</span>
          <h2 className={styles.multiHeading}>Going to more than one place?</h2>
          <p className={styles.multiSubtitle}>
            Each destination is checked on its own. We only show a trip total when every stop has an
            approved rate.
          </p>

          <div className={styles.multiGrid}>
            <div className={styles.tripCard}>
              <form onSubmit={addStop}>
                <label htmlFor="cad-stop" className={styles.tripLabel}>
                  Add a stop
                </label>
                <div className={styles.tripInputRow}>
                  <input
                    id="cad-stop"
                    type="text"
                    list="cad-roaming-destinations"
                    autoComplete="off"
                    placeholder="Choose a destination"
                    value={stopInput}
                    onChange={(e) => {
                      setStopInput(e.target.value);
                      setStopError("");
                    }}
                    className={styles.tripInput}
                    disabled={stops.length >= MAX_STOPS}
                  />
                  <button
                    type="submit"
                    className={styles.addBtn}
                    disabled={stops.length >= MAX_STOPS}
                  >
                    <Plus size={14} strokeWidth={2.6} />
                    <span>Add</span>
                  </button>
                </div>
                <datalist id="cad-roaming-destinations">
                  {roamingNames.map((d) => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </form>

              {stopError ? (
                <p className={styles.tripError} role="alert">
                  {stopError}
                </p>
              ) : (
                <p className={styles.tripHint}>
                  Add up to {MAX_STOPS} stops to see each destination&apos;s status.
                </p>
              )}

              {stops.length > 0 && (
                <ul className={styles.stopList}>
                  {stops.map((s, i) => (
                    <li key={s.name} className={styles.stopItem}>
                      <span className={styles.stopIndex}>{i + 1}</span>
                      <span className={styles.stopName}>{s.name}</span>
                      <span className={s.data ? styles.stopOk : styles.stopUnknown}>
                        {s.data ? "Approved" : "Rate unavailable"}
                      </span>
                      <button
                        type="button"
                        className={styles.stopRemove}
                        onClick={() => removeStop(s.name)}
                        aria-label={`Remove ${s.name}`}
                      >
                        <X size={13} strokeWidth={2.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className={styles.tripTotal}>
                <span className={styles.tripTotalLabel}>Trip total</span>
                <span className={styles.tripTotalValue}>
                  {!tripSummary && "Add a stop"}
                  {tripSummary && !tripSummary.ok &&
                    `Unavailable · ${tripSummary.missing} stop${tripSummary.missing > 1 ? "s" : ""} without an approved rate`}
                  {tripSummary && tripSummary.ok &&
                    `Up to ${fmt(tripSummary.mb)}/MB · ${fmt(tripSummary.min)}/min · ${fmt(tripSummary.sms)}/SMS`}
                </span>
              </div>
            </div>

            <div className={styles.multiImgWrap}>
              <img
                src={`${IMG}/cad-multi-stop.webp`}
                alt="Traveler in sunglasses checking his phone outside an airport"
                className={styles.multiImg}
              />
              <div className={styles.borderNote}>
                <span className={styles.borderNoteTitle}>Crossing borders?</span>
                <span className={styles.borderNoteText}>
                  Your phone may connect to a neighboring country&apos;s network near a border. Each
                  country&apos;s rate applies.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MY LINE */}
      <section className={styles.lineSection}>
        <div className={`${styles.container} ${styles.lineGrid}`}>
          <div>
            <span className={styles.eyebrow}>MY LINE</span>
            <h2 className={styles.sectionHeading}>Check your own line.</h2>
            <p className={styles.sectionText}>
              Signed-in account owners can see what&apos;s confirmed for each line. Changes that cost
              money need a separate confirmation and aren&apos;t available yet.
            </p>
            <Link href="/login" className={styles.pillBtn}>
              Sign in (preview)
            </Link>
          </div>
          <img
            src={`${IMG}/cad-my-line.webp`}
            alt="Person using a smartphone at a wooden table"
            className={styles.lineImg}
          />
        </div>
      </section>

      {/* TRAVEL READY */}
      <section className={styles.tipsSection}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>BEFORE YOU GO</span>
          <h2 className={styles.sectionHeading}>Travel-ready in a few minutes.</h2>
          <div className={styles.tipsGrid}>
            {travelTips.map((t) => {
              const Icon = t.icon;
              const inner = (
                <>
                  <img src={t.img} alt={t.alt} className={styles.tipImg} />
                  <span className={styles.tipBody}>
                    <span className={styles.tipTag}>
                      <Icon size={11} strokeWidth={2.4} /> {t.tag}
                    </span>
                    <span className={styles.tipTitle}>{t.title}</span>
                    <span className={styles.tipDesc}>{t.desc}</span>
                  </span>
                </>
              );
              return t.href.startsWith("tel:") ? (
                <a key={t.title} href={t.href} className={styles.tipCard}>
                  {inner}
                </a>
              ) : (
                <Link key={t.title} href={t.href} className={styles.tipCard}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div>
            <span className={styles.eyebrow}>FAQS</span>
            <h2 className={styles.sectionHeading}>Destination questions.</h2>
            <img
              src={`${IMG}/cad-faq.webp`}
              alt="Woman smiling at her phone with city lights behind her"
              className={styles.faqImg}
            />
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
                    <span
                      className={`${styles.faqToggle} ${isOpen ? styles.faqToggleOpen : ""}`}
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus size={12} strokeWidth={2.6} /> : <Plus size={12} strokeWidth={2.6} />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className={styles.faqAnswer}>
                      {item.a}
                      {item.link && (
                        <>
                          {" "}
                          <Link href={item.link.href} className={styles.faqLink}>
                            {item.link.text}
                          </Link>
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
    </div>
  );
}
