"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Search,
  Info,
  Music,
  PawPrint,
  Users,
  Video,
  Clock,
  MapPin,
  Ticket,
  Sparkles,
  Gift,
  Monitor,
  CheckCircle2,
  Bell,
  Check,
} from "lucide-react";
import styles from "./EventsAndExperiences.module.css";

const EVENTS_DATA = [
  {
    id: "open-mic-night",
    month: "NOV",
    day: "20",
    dow: "FRI",
    monthYear: "November 2026",
    typeLabel: "Community event",
    typeStyle: "pillCommunity",
    statusLabel: "Scheduled",
    statusStyle: "statusScheduled",
    isCanceled: false,
    title: "Open mic night for local creators",
    timeText: "7:00 PM CT · venue time",
    locationText: "[Venue name], Austin, TX",
    city: "Austin, TX",
    organizer: "Organized by [Approved organizer]",
    topic: "Music",
    format: "In person",
    image: "/img/events-and-experiences/event-open-mic.png",
  },
  {
    id: "cleanup-morning",
    month: "NOV",
    day: "29",
    dow: "SUN",
    monthYear: "November 2026",
    typeLabel: "Community event",
    typeStyle: "pillCommunity",
    statusLabel: "Canceled",
    statusStyle: "statusCanceled",
    isCanceled: true,
    title: "[Neighborhood clean-up morning]",
    timeText: "9:00 AM CT · venue time",
    locationText: "[Park name], Austin, TX",
    city: "Austin, TX",
    organizer: "Organized by [Community group]",
    topic: "Community",
    format: "In person",
    image: "/img/events-and-experiences/event-cleanup-morning.png",
  },
  {
    id: "shelter-open-day",
    month: "DEC",
    day: "06",
    dow: "SUN",
    monthYear: "December 2026",
    typeLabel: "Community event",
    typeStyle: "pillCommunity",
    statusLabel: "Scheduled",
    statusStyle: "statusScheduled",
    isCanceled: false,
    title: "[Shelter open day and adoption meet]",
    timeText: "11:00 AM ET · venue time",
    locationText: "[Partner shelter], Orlando, FL",
    city: "Orlando, FL",
    organizer: "Organized by [Approved shelter partner]",
    topic: "Animal welfare",
    format: "In person",
    image: "/img/events-and-experiences/event-shelter-open-day.png",
  },
  {
    id: "concert-in-park",
    month: "DEC",
    day: "13",
    dow: "SUN",
    monthYear: "December 2026",
    typeLabel: "Partner tickets",
    typeStyle: "pillPartner",
    statusLabel: "Scheduled",
    statusStyle: "statusScheduled",
    isCanceled: false,
    title: "[Community concert in the park]",
    timeText: "6:30 PM PT · venue time",
    locationText: "[Park amphitheater], Sacramento, CA",
    city: "Sacramento, CA",
    organizer: "Organized by [Event organizer]",
    topic: "Music",
    format: "In person",
    image: "/img/events-and-experiences/event-park-concert.png",
  },
  {
    id: "presale-access-show",
    month: "JAN",
    day: "09",
    dow: "SAT",
    monthYear: "January 2027",
    typeLabel: "Customer offer",
    typeStyle: "pillOffer",
    statusLabel: "Scheduled",
    statusStyle: "statusScheduled",
    isCanceled: false,
    title: "Presale access for an upcoming show",
    timeText: "8:00 PM CT · venue time",
    locationText: "[Concert venue], Austin, TX",
    city: "Austin, TX",
    organizer: "Organized by [Promoter]",
    topic: "Music",
    format: "In person",
    image: "/img/events-and-experiences/event-presale-show.png",
  },
  {
    id: "live-qa-rescue-pets",
    month: "JAN",
    day: "18",
    dow: "MON",
    monthYear: "January 2027",
    typeLabel: "Online event",
    typeStyle: "pillOnline",
    statusLabel: "Scheduled",
    statusStyle: "statusScheduled",
    isCanceled: false,
    title: "Live Q&A: caring for rescue pets",
    timeText: "5:00 PM ET · venue time",
    locationText: "Online · [host platform]",
    city: "Online",
    organizer: "Organized by [Approved host]",
    topic: "Online events",
    format: "Online",
    image: "/img/events-and-experiences/event-live-qa.png",
  },
  {
    id: "benefit-night",
    month: "FEB",
    day: "07",
    dow: "SUN",
    monthYear: "February 2027",
    typeLabel: "Giveaway",
    typeStyle: "pillGiveaway",
    statusLabel: "Postponed",
    statusStyle: "statusPostponed",
    isCanceled: false,
    title: "[Animal-welfare benefit night]",
    timeText: "7:30 PM PT · venue time",
    locationText: "[Venue name], Sacramento, CA",
    city: "Sacramento, CA",
    organizer: "Organized by [Charity partner]",
    topic: "Animal welfare",
    format: "In person",
    image: "/img/events-and-experiences/event-benefit-night.png",
  },
];

const FAQS_DATA = [
  {
    id: 1,
    question: "Is a listed event a ticket?",
    answer:
      "No. A listing shows what’s happening, who runs it and how to take part. Tickets, if any, come from the named seller.",
  },
  {
    id: 2,
    question: "Are Zoiko customers guaranteed tickets?",
    answer:
      "No. Customer offers and presales depend on availability, venue capacity, and line eligibility.",
  },
  {
    id: 3,
    question: "What time is the event?",
    answer:
      "All event times are displayed in the local time zone of the venue, or the stated time zone for online events.",
  },
  {
    id: 4,
    question: "What if an event is canceled or postponed?",
    answer:
      "We update the status badge on the listing as soon as the organizer notifies us. For ticket refunds, please contact the named ticket seller.",
  },
  {
    id: 5,
    question: "Can I enter giveaways here?",
    answer:
      "When a giveaway is active, official rules, eligibility criteria, and entry dates approved by Legal will be linked directly on the listing.",
  },
  {
    id: 6,
    question: "Can I suggest an event?",
    answer:
      "Yes! Venues, shelters, rescues, and music organizers can submit an event proposal through our Get Involved page.",
  },
];

export default function EventsAndExperiencesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All topics");
  const [selectedDate, setSelectedDate] = useState("Any date");
  const [selectedLocation, setSelectedLocation] = useState("Anywhere");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [hideCanceled, setHideCanceled] = useState(false);

  // Event updates subscription state
  const [subTopics, setSubTopics] = useState(["Music", "Animal welfare"]);
  const [subEmail, setSubEmail] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  // FAQ state (1st open by default)
  const [openFaq, setOpenFaq] = useState(1);

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBrowseTopicClick = (topicName) => {
    setSelectedTopic((prev) => (prev === topicName ? "All topics" : topicName));
    const el = document.getElementById("upcoming-events");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSubTopic = (topic) => {
    setSubTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    setSubSuccess(true);
    setTimeout(() => {
      setSubEmail("");
      setSubSuccess(false);
    }, 4000);
  };

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((ev) => {
      if (hideCanceled && ev.isCanceled) return false;
      if (selectedTopic !== "All topics" && ev.topic !== selectedTopic) {
        return false;
      }
      if (selectedDate !== "Any date" && ev.monthYear !== selectedDate) {
        return false;
      }
      if (selectedLocation !== "Anywhere" && ev.city !== selectedLocation) {
        return false;
      }
      if (selectedFormat !== "All" && ev.format !== selectedFormat) {
        return false;
      }
      const q = searchQuery.trim().toLowerCase();
      if (
        q &&
        !ev.title.toLowerCase().includes(q) &&
        !ev.locationText.toLowerCase().includes(q) &&
        !ev.organizer.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [
    searchQuery,
    selectedTopic,
    selectedDate,
    selectedLocation,
    selectedFormat,
    hideCanceled,
  ]);

  return (
    <div className={styles.pageWrapper}>
      {/* ===================================================
          1. HERO SECTION
          =================================================== */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            {/* Left Column */}
            <div className={styles.heroLeft}>
              <div className={styles.heroPill}>
                <Calendar size={15} />
                <span>Events &amp; Experiences</span>
              </div>

              <h1 className={styles.heroTitle}>
                Music, animals and
                <br />
                community,{" "}
                <span className={styles.heroTitleAccent}>
                  in person
                  <br />
                  and online.
                </span>
              </h1>

              <p className={styles.heroSubtitle}>
                Find community events connected to the music and animal-welfare
                causes we care about. Every listing shows who runs it, when and
                where.
              </p>

              <div className={styles.heroCtaRow}>
                <a
                  href="#upcoming-events"
                  onClick={(e) => scrollToSection(e, "upcoming-events")}
                  className={styles.findEventsBtn}
                >
                  <Search size={16} />
                  <span>Find events</span>
                </a>
                <a
                  href="#how-listings-work"
                  onClick={(e) => scrollToSection(e, "how-listings-work")}
                  className={styles.howListingsLink}
                >
                  How event listings work
                </a>
              </div>

              <div className={styles.goodToKnowCard}>
                <Info size={16} className={styles.goodToKnowIcon} />
                <div className={styles.goodToKnowContent}>
                  <span className={styles.goodToKnowTitle}>Good to know</span>
                  Each event depends on approval, eligibility and availability.
                  A listing isn’t a ticket, and customer offers apply only where
                  an event says so.
                </div>
              </div>
            </div>

            {/* Right Collage */}
            <div className={styles.heroCollage}>
              <div className={styles.heroMainPhotoWrap}>
                <img
                  src="/img/events-and-experiences/hero-drummer-dog.png"
                  alt="Drummer with poodle at live studio drum kit"
                />
              </div>

              {/* Floating Calendar Card 1: NOV 14 */}
              <div className={`${styles.calCard} ${styles.calCardNov}`}>
                <div className={styles.calCardHeader}>NOV</div>
                <div className={styles.calCardDateRow}>
                  <span className={styles.calCardDayNum}>14</span>
                  <div className={styles.calCardDayMeta}>
                    <span>FRI</span>
                    <span>Live music</span>
                  </div>
                </div>
                <div className={styles.calCardImgWrap}>
                  <img
                    src="/img/events-and-experiences/hero-cal-nov14.png"
                    alt="Live music acoustic guitar"
                  />
                </div>
              </div>

              {/* Floating Calendar Card 2: DEC 06 */}
              <div className={`${styles.calCard} ${styles.calCardDec}`}>
                <div className={styles.calCardHeader}>DEC</div>
                <div className={styles.calCardDateRow}>
                  <span className={styles.calCardDayNum}>06</span>
                  <div className={styles.calCardDayMeta}>
                    <span>SAT</span>
                    <span>Shelter day</span>
                  </div>
                </div>
                <div className={styles.calCardImgWrap}>
                  <img
                    src="/img/events-and-experiences/hero-cal-dec06.png"
                    alt="Volunteers with rescue dogs"
                  />
                </div>
              </div>

              {/* Floating Calendar Card 3: JAN 18 */}
              <div className={`${styles.calCard} ${styles.calCardJan}`}>
                <div className={styles.calCardHeader}>JAN</div>
                <div className={styles.calCardDateRow}>
                  <span className={styles.calCardDayNum}>18</span>
                  <div className={styles.calCardDayMeta}>
                    <span>SUN</span>
                    <span>Online</span>
                  </div>
                </div>
                <div className={styles.calCardImgWrap}>
                  <img
                    src="/img/events-and-experiences/hero-cal-jan18.png"
                    alt="People joining an online event"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. BROWSE BY TOPIC
          =================================================== */}
      <section className={styles.browseTopicSection}>
        <div className={styles.container}>
          <h2 className={styles.browseHeading}>Browse by topic</h2>

          <div className={styles.browseTopicGrid}>
            {[
              { name: "Music", count: "3 events", Icon: Music },
              { name: "Animal welfare", count: "2 events", Icon: PawPrint },
              { name: "Community", count: "2 events", Icon: Users },
              { name: "Online events", count: "1 event", Icon: Video },
            ].map(({ name, count, Icon }) => {
              const isActive = selectedTopic === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleBrowseTopicClick(name)}
                  className={`${styles.browseTopicCard} ${
                    isActive ? styles.browseTopicCardActive : ""
                  }`}
                >
                  <div className={styles.topicIconSquare}>
                    <Icon size={32} />
                  </div>
                  <div className={styles.topicCardInfo}>
                    <span className={styles.topicCardName}>{name}</span>
                    <span className={styles.topicCardSub}>{count}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          3. UPCOMING EVENTS
          =================================================== */}
      <section id="upcoming-events" className={styles.upcomingSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>Upcoming events</div>
            <h2 className={styles.sectionTitle}>
              Find an event near you, or online.
            </h2>
            <p className={styles.sectionSubtitle}>
              Times are shown in each venue’s local time.
            </p>
          </div>

          {/* Filter Toolbar */}
          <div className={styles.filterToolbar}>
            <div className={`${styles.filterGroup} ${styles.filterGroupSearch}`}>
              <label htmlFor="event-search" className={styles.filterLabel}>
                Search
              </label>
              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  id="event-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Event, venue or city"
                  className={styles.searchInput}
                />
              </div>
            </div>

            <div className={`${styles.filterGroup} ${styles.filterGroupSelect}`}>
              <label htmlFor="event-topic" className={styles.filterLabel}>
                Topic
              </label>
              <select
                id="event-topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className={styles.selectControl}
              >
                <option value="All topics">All topics</option>
                <option value="Music">Music</option>
                <option value="Animal welfare">Animal welfare</option>
                <option value="Community">Community</option>
                <option value="Online events">Online events</option>
              </select>
            </div>

            <div className={`${styles.filterGroup} ${styles.filterGroupSelect}`}>
              <label htmlFor="event-when" className={styles.filterLabel}>
                When
              </label>
              <select
                id="event-when"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.selectControl}
              >
                <option value="Any date">Any date</option>
                <option value="November 2026">November 2026</option>
                <option value="December 2026">December 2026</option>
                <option value="January 2027">January 2027</option>
                <option value="February 2027">February 2027</option>
              </select>
            </div>

            <div className={`${styles.filterGroup} ${styles.filterGroupSelect}`}>
              <label htmlFor="event-location" className={styles.filterLabel}>
                Location
              </label>
              <select
                id="event-location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={styles.selectControl}
              >
                <option value="Anywhere">Anywhere</option>
                <option value="Austin, TX">Austin, TX</option>
                <option value="Orlando, FL">Orlando, FL</option>
                <option value="Sacramento, CA">Sacramento, CA</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Format</span>
              <div className={styles.formatSegment}>
                {["All", "In person", "Online"].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`${styles.formatBtn} ${
                      selectedFormat === fmt ? styles.formatBtnActive : ""
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <label className={styles.hideCanceledLabel}>
              <input
                type="checkbox"
                checked={hideCanceled}
                onChange={(e) => setHideCanceled(e.target.checked)}
                className={styles.hideCanceledCheckbox}
              />
              <span>Hide canceled</span>
            </label>
          </div>

          <div className={styles.eventsCountLine}>
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1 ? "event" : "events"}, soonest first
          </div>

          {/* 4-Column Events Grid */}
          <div className={styles.eventsGrid}>
            {filteredEvents.map((ev) => (
              <article
                key={ev.id}
                className={`${styles.eventCard} ${
                  ev.isCanceled ? styles.eventCardCanceled : ""
                }`}
              >
                <div className={styles.eventMediaWrap}>
                  <img src={ev.image} alt={ev.title} />
                  <div className={styles.eventDateBadge}>
                    <span className={styles.eventDateMonth}>{ev.month}</span>
                    <span className={styles.eventDateNum}>{ev.day}</span>
                    <span className={styles.eventDateDow}>{ev.dow}</span>
                  </div>
                  <span className={styles.eventSampleTag}>Sample</span>
                </div>

                <div className={styles.eventBody}>
                  <div className={styles.eventPillsRow}>
                    <span
                      className={`${styles.typePill} ${styles[ev.typeStyle]}`}
                    >
                      {ev.typeLabel}
                    </span>
                    <span
                      className={`${styles.typePill} ${styles[ev.statusStyle]}`}
                    >
                      {ev.statusLabel}
                    </span>
                  </div>

                  <h3
                    className={`${styles.eventTitle} ${
                      ev.isCanceled ? styles.eventTitleStrike : ""
                    }`}
                  >
                    {ev.title}
                  </h3>

                  <div className={styles.eventInfoLine}>
                    <Clock size={14} className={styles.eventInfoIcon} />
                    <span>{ev.timeText}</span>
                  </div>

                  <div className={styles.eventInfoLine}>
                    <MapPin size={14} className={styles.eventInfoIcon} />
                    <span>{ev.locationText}</span>
                  </div>

                  <div className={styles.eventOrganizer}>{ev.organizer}</div>

                  <button
                    type="button"
                    onClick={(e) => scrollToSection(e, "how-listings-work")}
                    className={styles.viewDetailsBtn}
                  >
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          4. HOW EVENT LISTINGS WORK (5 KINDS)
          =================================================== */}
      <section id="how-listings-work" className={styles.fiveKindsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>How event listings work</div>
            <h2 className={styles.sectionTitle}>
              Five kinds of event, never mixed up.
            </h2>
            <p className={styles.sectionSubtitle}>
              Every listing is labeled with its type, so you know what you can
              and can’t do.
            </p>
          </div>

          <div className={styles.fiveKindsGrid}>
            <div className={styles.kindCard}>
              <div className={styles.kindIconBox}>
                <Calendar size={20} />
              </div>
              <h3 className={styles.kindTitle}>Community event</h3>
              <p className={styles.kindDesc}>
                A listed event with its schedule and organizer. Just show up, or
                follow the organizer’s instructions.
              </p>
              <span className={styles.kindTagPill}>Read-only</span>
            </div>

            <div className={styles.kindCard}>
              <div className={styles.kindIconBox}>
                <Ticket size={20} />
              </div>
              <h3 className={styles.kindTitle}>Partner tickets</h3>
              <p className={styles.kindDesc}>
                Tickets sold by a named third-party seller, with fees and terms
                shown before you leave our site.
              </p>
              <span className={styles.kindTagPill}>Coming later</span>
            </div>

            <div className={styles.kindCard}>
              <div className={styles.kindIconBox}>
                <Sparkles size={20} />
              </div>
              <h3 className={styles.kindTitle}>Customer offer</h3>
              <p className={styles.kindDesc}>
                An early-access or presale offer for eligible Zoiko lines. We
                check your line securely.
              </p>
              <span className={styles.kindTagPill}>Eligibility checked</span>
            </div>

            <div className={styles.kindCard}>
              <div className={styles.kindIconBox}>
                <Gift size={20} />
              </div>
              <h3 className={styles.kindTitle}>Giveaway</h3>
              <p className={styles.kindDesc}>
                A prize draw with official rules, eligibility and entry dates,
                approved by Legal.
              </p>
              <span className={styles.kindTagPill}>Coming later</span>
            </div>

            <div className={styles.kindCard}>
              <div className={styles.kindIconBox}>
                <Monitor size={20} />
              </div>
              <h3 className={styles.kindTitle}>Online event</h3>
              <p className={styles.kindDesc}>
                Hosted online, with the time zone, platform and accessibility
                details.
              </p>
              <span className={styles.kindTagPill}>Link sent privately</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          5. ORGANIZERS & PARTNERS (DARK PURPLE)
          =================================================== */}
      <section className={styles.organizersSection}>
        <img
          src="/img/events-and-experiences/organizers-bg.png"
          alt=""
          aria-hidden="true"
          className={styles.organizersBg}
        />
        <div className={styles.container}>
          <div className={styles.organizersGrid}>
            <div className={styles.organizersLeft}>
              <div>
                <div className={`${styles.eyebrow} ${styles.eyebrowPink}`}>
                  Organizers &amp; partners
                </div>
                <h2 className={`${styles.sectionTitle} ${styles.titleWhite}`}>
                  Want to run an event with us?
                </h2>
                <p
                  className={`${styles.sectionSubtitle} ${styles.subtitleLight}`}
                >
                  Venues, shelters, rescues and music organizers can get in
                  touch. Every event is reviewed before it’s listed.
                </p>
              </div>

              <div className={styles.organizersCheckList}>
                {[
                  "Confirmed organizer, venue and date",
                  "Accessibility and age information",
                  "Rights for any music, photos and names",
                  "Clear cancellation and support contacts",
                ].map((item) => (
                  <div key={item} className={styles.organizersCheckItem}>
                    <CheckCircle2
                      size={16}
                      className={styles.organizersCheckIcon}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/get-involved" className={styles.organizersCtaBtn}>
                Get in touch via Get Involved
              </Link>
            </div>

            <div className={styles.organizersBento}>
              <div className={styles.bentoTall}>
                <img
                  src="/img/events-and-experiences/organizer-coordinator.png"
                  alt="Event coordinator reviewing venue checklist"
                />
              </div>
              <div className={styles.bentoSmall}>
                <img
                  src="/img/events-and-experiences/organizer-tablet-check.png"
                  alt="Venue staff confirming guest list on tablet"
                />
              </div>
              <div className={styles.bentoSmall}>
                <img
                  src="/img/events-and-experiences/organizer-team-meeting.png"
                  alt="Partner organizers collaborating around laptop"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          6. EVENT UPDATES BANNER
          =================================================== */}
      <section className={styles.updatesSection}>
        <div className={styles.container}>
          <div className={styles.updatesBanner}>
            <div className={styles.updatesLeft}>
              <div className={styles.updatesEyebrow}>
                <Bell size={15} />
                <span>Event updates</span>
              </div>
              <h2 className={styles.updatesTitle}>
                Hear about new events first
              </h2>
              <p className={styles.updatesSubtitle}>
                Choose your topics. We only email about approved events.
                Unsubscribe anytime.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className={styles.updatesFormCard}>
              <div>
                <div
                  className={styles.updatesFieldLabel}
                  style={{ marginBottom: "8px" }}
                >
                  Topics
                </div>
                <div className={styles.updatesTopicPills}>
                  {[
                    "Music",
                    "Animal welfare",
                    "Community",
                    "Online events",
                  ].map((topic) => {
                    const checked = subTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleSubTopic(topic)}
                        className={`${styles.updatesTopicPill} ${
                          checked ? styles.updatesTopicPillActive : ""
                        }`}
                      >
                        <span
                          className={`${styles.pillCheckboxBox} ${
                            checked ? styles.pillCheckboxBoxActive : ""
                          }`}
                        >
                          {checked && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span>{topic}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="updates-email"
                  className={styles.updatesFieldLabel}
                  style={{ display: "block", marginBottom: "6px" }}
                >
                  Email address
                </label>
                <div className={styles.updatesEmailRow}>
                  <input
                    id="updates-email"
                    type="email"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={styles.updatesEmailInput}
                    required
                  />
                  <button type="submit" className={styles.updatesSubscribeBtn}>
                    {subSuccess ? "Subscribed!" : "Subscribe"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===================================================
          7. FAQS SECTION
          =================================================== */}
      <section className={styles.faqsSection}>
        <div className={styles.container}>
          <div className={styles.faqsGrid}>
            {/* Left Support Card Column */}
            <div className={styles.faqsLeft}>
              <div>
                <div className={styles.eyebrow}>FAQs</div>
                <h2 className={styles.sectionTitle}>Event questions.</h2>
              </div>

              <div className={styles.faqSupportCard}>
                <div className={styles.faqSupportImgWrap}>
                  <img
                    src="/img/events-and-experiences/faq-support-agent.png"
                    alt="Zoiko Mobile customer support representative"
                  />
                </div>
                <div className={styles.faqSupportBody}>
                  <h3 className={styles.faqSupportTitle}>
                    Questions about a ticket?
                  </h3>
                  <p className={styles.faqSupportText}>
                    For tickets, refunds and venue questions, contact the seller
                    or organizer shown on the event. For Zoiko offers, call
                    800-988-8116.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Accordion Column */}
            <div className={styles.accordionList}>
              {FAQS_DATA.map((faq) => {
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
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className={styles.accordionTrigger}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span
                        className={`${styles.accordionIconCircle} ${
                          isOpen ? styles.accordionIconCircleOpen : ""
                        }`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className={styles.accordionContent}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
