"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { submitContactMessage, FORM_ERROR_MESSAGE } from "../utils/formApi";
import {
  ShieldCheck,
  PenTool,
  BarChart2,
  CheckCircle2,
  Search,
} from "lucide-react";
import styles from "./StoriesAndImpact.module.css";

const STORIES_DATA = [
  {
    id: "adoption-weekend",
    title: "[A rescue partner’s spring adoption weekend]",
    summary:
      "How volunteers and a local shelter helped animals meet new families. [Approved summary]",
    category: "Animal welfare",
    dateText: "Oct 18, 2026",
    year: "2026",
    timestamp: new Date("2026-10-18").getTime(),
    labelType: "VERIFIED CASE STUDY",
    isFeatured: true,
    image: "/img/stories-and-impact/story-adoption-weekend.png",
    secondaryImage: "/img/stories-and-impact/story-adoption-paw-care.png",
  },
  {
    id: "open-mic-night",
    title: "[An open mic night for first-time performers]",
    summary:
      "Local creators took the stage at a community night. [Approved summary]",
    category: "Music & creators",
    dateText: "Sep 30, 2026",
    year: "2026",
    timestamp: new Date("2026-09-30").getTime(),
    labelType: "EDITORIAL STORY",
    isFeatured: false,
    image: "/img/stories-and-impact/story-open-mic.png",
  },
  {
    id: "greening-park",
    title: "[Neighbors spend a morning greening the park]",
    summary: "A volunteer clean-up and planting day. [Approved summary]",
    category: "Community",
    dateText: "Aug 22, 2026",
    year: "2026",
    timestamp: new Date("2026-08-22").getTime(),
    labelType: "EDITORIAL STORY",
    isFeatured: false,
    image: "/img/stories-and-impact/story-greening-park.png",
  },
  {
    id: "foster-volunteers",
    title: "[Meet the foster volunteers behind the scenes]",
    summary:
      "The people who open their homes to animals waiting for adoption. [Approved summary]",
    category: "Animal welfare",
    dateText: "Jul 14, 2026",
    year: "2026",
    timestamp: new Date("2026-07-14").getTime(),
    labelType: "EDITORIAL STORY",
    isFeatured: false,
    image: "/img/stories-and-impact/story-foster-volunteers.png",
  },
  {
    id: "summer-concert-series",
    title: "[A summer concert series for local causes]",
    summary:
      "How a venue partner hosted community music nights. [Approved summary]",
    category: "Music & creators",
    dateText: "Dec 5, 2025",
    year: "2025",
    timestamp: new Date("2025-12-05").getTime(),
    labelType: "VERIFIED CASE STUDY",
    isFeatured: false,
    image: "/img/stories-and-impact/story-summer-concert.png",
  },
  {
    id: "team-volunteer",
    title: "[Team members share why they volunteer]",
    summary: "Short stories from our own team. [Approved summary]",
    category: "Community",
    dateText: "Nov 20, 2025",
    year: "2025",
    timestamp: new Date("2025-11-20").getTime(),
    labelType: "EDITORIAL STORY",
    isFeatured: false,
    image: "/img/stories-and-impact/story-team-volunteer.png",
  },
];

const CATEGORIES = ["All", "Animal welfare", "Music & creators", "Community"];

export default function StoriesAndImpactClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("All years");
  const [sortOrder, setSortOrder] = useState("Newest first");

  // Report inaccuracy form state
  const [reportType, setReportType] = useState("A story");
  const [issueSection, setIssueSection] = useState("Factual inaccuracy");
  const [whichStory, setWhichStory] = useState("[Select a story]");
  const [wrongDetails, setWrongDetails] = useState("");
  const [reportEmail, setReportEmail] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportSending, setReportSending] = useState(false);
  const [reportError, setReportError] = useState("");

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTopicClick = (category, targetId = "archive") => {
    if (category) {
      setActiveCategory(category);
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredStories = useMemo(() => {
    return STORIES_DATA.filter((story) => {
      const matchesCat =
        activeCategory === "All" || story.category === activeCategory;
      const matchesYear =
        selectedYear === "All years" || story.year === selectedYear;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.summary.toLowerCase().includes(q) ||
        story.category.toLowerCase().includes(q);
      return matchesCat && matchesYear && matchesSearch;
    }).sort((a, b) =>
      sortOrder === "Newest first"
        ? b.timestamp - a.timestamp
        : a.timestamp - b.timestamp
    );
  }, [activeCategory, selectedYear, searchQuery, sortOrder]);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!wrongDetails.trim() || !reportEmail.trim() || reportSending) return;
    setReportError("");
    setReportSending(true);
    try {
      await submitContactMessage({
        email: reportEmail,
        subject: "STORIES & IMPACT CORRECTION REPORT",
        fields: {
          Type: reportType,
          Section: issueSection,
          Story: whichStory,
          "What looks wrong": wrongDetails,
        },
      });
    } catch {
      setReportError(FORM_ERROR_MESSAGE);
      return;
    } finally {
      setReportSending(false);
    }
    setReportSubmitted(true);
    setTimeout(() => {
      setWrongDetails("");
      setReportEmail("");
    }, 4000);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ===================================================
          1. HERO SECTION
          =================================================== */}
      <section className={styles.heroSection}>
        <div className={styles.heroRadialGlow} />
        <div className={styles.heroContainer}>
          {/* Editorial Masthead Bar */}
          <div className={styles.mastheadBar}>
            <span className={styles.mastheadItem}>Zoiko Mobile Community</span>
            <span className={styles.mastheadItem}>
              Stories &amp; Impact · Issue 01
            </span>
            <span className={styles.mastheadItem}>November 2026</span>
          </div>

          <div className={styles.heroGrid}>
            {/* Left Content */}
            <div className={styles.heroLeft}>
              <h1 className={styles.heroTitle}>
                Stories <br />
                <span className={styles.heroAmpersand}>&amp;</span> impact
              </h1>

              <p className={styles.heroSubtitle}>
                Real moments from our animal-welfare and music community, told
                with care. When we report an outcome, you’ll see where it came
                from and who checked it.
              </p>

              <div className={styles.heroCtaRow}>
                <a
                  href="#archive"
                  onClick={(e) => scrollToSection(e, "archive")}
                  className={styles.primaryBtn}
                >
                  Browse stories
                </a>
                <a
                  href="#labels"
                  onClick={(e) => scrollToSection(e, "labels")}
                  className={styles.secondaryLink}
                >
                  How we label stories
                </a>
              </div>

              <div className={styles.heroVerifyNote}>
                <ShieldCheck size={16} className={styles.heroVerifyIcon} />
                <span>
                  Sources and review details appear when an outcome is reported.
                </span>
              </div>
            </div>

            {/* Right Polaroid Collage */}
            <div className={styles.polaroidStage}>
              <div className={`${styles.polaroidCard} ${styles.polaroid1}`}>
                <img
                  src="/img/stories-and-impact/hero-polaroid-animal.png"
                  alt="Cat resting in wooden shelter bed"
                />
                <span className={styles.polaroidCaption}>Animal welfare</span>
              </div>

              <div className={`${styles.polaroidCard} ${styles.polaroid2}`}>
                <img
                  src="/img/stories-and-impact/hero-polaroid-music.png"
                  alt="Acoustic guitar surrounded by autumn leaves"
                />
                <span className={styles.polaroidCaption}>
                  Music &amp; creators
                </span>
              </div>

              <div className={`${styles.polaroidCard} ${styles.polaroid3}`}>
                <img
                  src="/img/stories-and-impact/hero-polaroid-community.png"
                  alt="Community park gardening tools on grass"
                />
                <span className={styles.polaroidCaption}>Community</span>
              </div>

              <div className={`${styles.polaroidCard} ${styles.polaroid4}`}>
                <img
                  src="/img/stories-and-impact/hero-polaroid-speakers.png"
                  alt="Pair of vintage wooden speakers"
                />
                <span className={styles.polaroidCaption}>Live music</span>
              </div>

              <div className={styles.careStamp}>
                <span>told</span>
                <span>with care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. HOW WE LABEL STORIES
          =================================================== */}
      <section id="labels" className={styles.labelsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderBlock}>
            <div className={styles.eyebrow}>How we label stories</div>
            <h2 className={styles.serifHeading}>
              Three kinds of story, clearly
              <br />
              marked.
            </h2>
            <p className={styles.sectionDesc}>
              Every story carries one of these labels, so you always know what
              you’re reading.
            </p>
          </div>

          <div className={styles.labelsGrid}>
            {/* Card 1: Editorial Story */}
            <div
              className={`${styles.labelCard} ${styles.labelCardEditorial}`}
            >
              <div className={`${styles.stampBadge} ${styles.stampEditorial}`}>
                <PenTool size={15} />
                <span>EDITORIAL STORY</span>
              </div>
              <p className={styles.labelCardText}>
                A feature written by our team. It shares a moment or a person,
                not a measured result.
              </p>
              <div className={styles.labelCheckList}>
                <div
                  className={`${styles.labelCheckItem} ${styles.checkEditorial}`}
                >
                  <CheckCircle2 size={16} />
                  <span>People featured agreed</span>
                </div>
                <div
                  className={`${styles.labelCheckItem} ${styles.checkEditorial}`}
                >
                  <CheckCircle2 size={16} />
                  <span>Photos licensed</span>
                </div>
              </div>
            </div>

            {/* Card 2: Verified Case Study */}
            <div className={`${styles.labelCard} ${styles.labelCardVerified}`}>
              <div className={`${styles.stampBadge} ${styles.stampVerified}`}>
                <ShieldCheck size={15} />
                <span>VERIFIED CASE STUDY</span>
              </div>
              <p className={styles.labelCardText}>
                A story about a specific program, checked against records from
                the organization involved.
              </p>
              <div className={styles.labelCheckList}>
                <div
                  className={`${styles.labelCheckItem} ${styles.checkVerified}`}
                >
                  <CheckCircle2 size={16} />
                  <span>Facts checked</span>
                </div>
                <div
                  className={`${styles.labelCheckItem} ${styles.checkVerified}`}
                >
                  <CheckCircle2 size={16} />
                  <span>Partner approved</span>
                </div>
                <div
                  className={`${styles.labelCheckItem} ${styles.checkVerified}`}
                >
                  <CheckCircle2 size={16} />
                  <span>Period stated</span>
                </div>
              </div>
            </div>

            {/* Card 3: Approved Impact Report */}
            <div className={`${styles.labelCard} ${styles.labelCardApproved}`}>
              <div className={`${styles.stampBadge} ${styles.stampApproved}`}>
                <BarChart2 size={15} />
                <span>APPROVED IMPACT REPORT</span>
              </div>
              <p className={styles.labelCardText}>
                Official figures for a set period, approved by Finance and
                Legal, with a stated method.
              </p>
              <div className={styles.labelCheckList}>
                <div
                  className={`${styles.labelCheckItem} ${styles.checkApproved}`}
                >
                  <CheckCircle2 size={16} />
                  <span>Method published</span>
                </div>
                <div
                  className={`${styles.labelCheckItem} ${styles.checkApproved}`}
                >
                  <CheckCircle2 size={16} />
                  <span>Finance &amp; Legal approved</span>
                </div>
                <div
                  className={`${styles.labelCheckItem} ${styles.checkApproved}`}
                >
                  <CheckCircle2 size={16} />
                  <span>Corrections tracked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. EXPLORE BY TOPIC
          =================================================== */}
      <section className={styles.topicsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderBlock}>
            <div className={styles.eyebrow}>Explore by topic</div>
            <h2 className={styles.serifHeading}>
              Find the stories that matter to you.
            </h2>
          </div>

          <div className={styles.topicsGrid}>
            <button
              type="button"
              onClick={() => handleTopicClick("Animal welfare", "archive")}
              className={styles.topicCard}
            >
              <img
                src="/img/stories-and-impact/topic-animal-welfare.png"
                alt="Animal welfare sanctuary volunteers"
                className={styles.topicCardImg}
              />
              <div className={styles.topicCardOverlay} />
              <div className={styles.topicCardContent}>
                <h3 className={styles.topicCardTitle}>Animal welfare</h3>
                <span className={styles.topicCardCount}>2 stories</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleTopicClick("Music & creators", "archive")}
              className={styles.topicCard}
            >
              <img
                src="/img/stories-and-impact/topic-music-creators.png"
                alt="Live singer and guitarist performing"
                className={styles.topicCardImg}
              />
              <div className={styles.topicCardOverlay} />
              <div className={styles.topicCardContent}>
                <h3 className={styles.topicCardTitle}>Music &amp; creators</h3>
                <span className={styles.topicCardCount}>2 stories</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleTopicClick("Community", "archive")}
              className={styles.topicCard}
            >
              <img
                src="/img/stories-and-impact/topic-community.png"
                alt="Community members smiling together"
                className={styles.topicCardImg}
              />
              <div className={styles.topicCardOverlay} />
              <div className={styles.topicCardContent}>
                <h3 className={styles.topicCardTitle}>Community</h3>
                <span className={styles.topicCardCount}>2 stories</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleTopicClick(null, "impact-reports")}
              className={styles.topicCard}
            >
              <img
                src="/img/stories-and-impact/topic-impact-reports.png"
                alt="Reviewing official impact report charts"
                className={styles.topicCardImg}
              />
              <div className={styles.topicCardOverlay} />
              <div className={styles.topicCardContent}>
                <h3 className={styles.topicCardTitle}>Impact reports</h3>
                <span className={styles.topicCardCount}>
                  Coming once approved
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================
          4. THE ARCHIVE
          =================================================== */}
      <section id="archive" className={styles.archiveSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderBlock}>
            <div className={styles.eyebrow}>The archive</div>
            <h2 className={styles.serifHeading}>
              Every published story, in one
              <br />
              place.
            </h2>
          </div>

          {/* Filter & Search Bar */}
          <div className={styles.filterBar}>
            <div className={styles.filterPillsGroup}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.filterPill} ${
                    activeCategory === cat ? styles.filterPillActive : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.filterControlsRight}>
              <div
                className={`${styles.filterFieldGroup} ${styles.filterSearchGroup}`}
              >
                <label
                  htmlFor="archive-search"
                  className={styles.filterFieldLabel}
                >
                  Search
                </label>
                <div className={styles.searchInputWrapper}>
                  <Search size={16} className={styles.searchIcon} />
                  <input
                    id="archive-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stories"
                    className={styles.searchInput}
                  />
                </div>
              </div>

              <div className={styles.filterFieldGroup}>
                <label
                  htmlFor="archive-year"
                  className={styles.filterFieldLabel}
                >
                  Year
                </label>
                <select
                  id="archive-year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="All years">All years</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className={styles.filterFieldGroup}>
                <label
                  htmlFor="archive-sort"
                  className={styles.filterFieldLabel}
                >
                  Sort
                </label>
                <select
                  id="archive-sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="Newest first">Newest first</option>
                  <option value="Oldest first">Oldest first</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.archiveCountText}>
            {filteredStories.length}{" "}
            {filteredStories.length === 1 ? "story" : "stories"} ·{" "}
            {sortOrder.toLowerCase()}
          </div>

          <div className={styles.archiveGrid}>
            {filteredStories.map((story) => {
              const isVerified = story.labelType === "VERIFIED CASE STUDY";
              const showAsFeatured =
                story.isFeatured &&
                activeCategory === "All" &&
                !searchQuery.trim() &&
                selectedYear === "All years";

              return (
                <article
                  key={story.id}
                  className={`${styles.storyCard} ${
                    showAsFeatured ? styles.storyCardFeatured : ""
                  }`}
                >
                  <div className={styles.storyMediaTop}>
                    <img src={story.image} alt={story.title} />
                    <span
                      className={`${styles.storyBadgeTopLeft} ${
                        isVerified
                          ? styles.badgeVerified
                          : styles.badgeEditorial
                      }`}
                    >
                      {story.labelType}
                    </span>
                    <span className={styles.storySamplePill}>Sample</span>
                  </div>

                  <div className={styles.storyBody}>
                    <div className={styles.storyMeta}>
                      {story.category} · {story.dateText}
                    </div>
                    <h3 className={styles.storyTitle}>{story.title}</h3>
                    <p className={styles.storySummary}>{story.summary}</p>

                    {showAsFeatured && story.secondaryImage ? (
                      <div className={styles.featuredSecondImageWrap}>
                        <img
                          src={story.secondaryImage}
                          alt="Veterinary care for rescued dog"
                        />
                        <a
                          href="#corrections"
                          onClick={(e) => scrollToSection(e, "corrections")}
                          className={styles.featuredOverlayReadLink}
                        >
                          Read the story →
                        </a>
                      </div>
                    ) : (
                      <a
                        href="#corrections"
                        onClick={(e) => scrollToSection(e, "corrections")}
                        className={styles.storyReadMore}
                      >
                        Read the story →
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          5. IMPACT REPORTS (DARK PURPLE)
          =================================================== */}
      <section id="impact-reports" className={styles.impactReportsSection}>
        <img
          src="/img/stories-and-impact/impact-reports-bg.png"
          alt=""
          aria-hidden="true"
          className={styles.impactReportsBg}
        />
        <div className={styles.container}>
          <div className={styles.sectionHeaderBlock}>
            <div className={`${styles.eyebrow} ${styles.eyebrowLight}`}>
              Impact reports
            </div>
            <h2
              className={`${styles.serifHeading} ${styles.serifHeadingLight}`}
            >
              Official figures, only when
              <br />
              approved.
            </h2>
            <p className={`${styles.sectionDesc} ${styles.sectionDescLight}`}>
              Each report covers one period and follows the method in How Giving
              Works.
            </p>
          </div>

          <div className={styles.impactCardsGrid}>
            {/* Left Frosted Card */}
            <div className={styles.impactFrostedCard}>
              <h3 className={styles.impactCardHeading}>
                No approved impact report yet
              </h3>
              <p className={styles.impactCardText}>
                We’ll publish our first report here once Finance and Legal have
                approved it. There are no totals until then.
              </p>
              <div>
                <Link
                  href="/how-giving-works"
                  className={styles.impactCardLink}
                >
                  Read How Giving Works →
                </Link>
              </div>
            </div>

            {/* Right Frosted Card */}
            <div className={styles.impactFrostedCard}>
              <h3 className={styles.impactRightTitle}>Every report will show</h3>
              <div className={styles.impactCheckGrid}>
                {[
                  "Period covered",
                  "What was counted",
                  "How it was counted",
                  "Who approved it",
                  "Exclusions",
                  "Corrections",
                ].map((item) => (
                  <div key={item} className={styles.impactCheckItem}>
                    <CheckCircle2
                      size={16}
                      className={styles.impactCheckIcon}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          6. CORRECTIONS & REPORT INACCURACY FORM
          =================================================== */}
      <section id="corrections" className={styles.correctionsSection}>
        <div className={styles.container}>
          <div className={styles.correctionsGrid}>
            {/* Left Column */}
            <div className={styles.correctionsLeft}>
              <div>
                <div className={styles.eyebrow}>Corrections</div>
                <h2 className={styles.serifHeading}>
                  When we get something
                  <br />
                  wrong, we say so.
                </h2>
                <p className={styles.sectionDesc}>
                  Every correction stays visible, with the date and what
                  changed.
                </p>
              </div>

              <div className={styles.correctionLogBox}>
                <span className={styles.correctionLogTag}>
                  CORRECTION LOG · 2026
                </span>
                <span className={styles.correctionLogTitle}>
                  [Sample entry: no corrections logged yet]
                </span>
                <span className={styles.correctionLogDate}>
                  Reviewed November 6, 2026.
                </span>
              </div>

              <div className={styles.correctionsImageWrap}>
                <img
                  src="/img/stories-and-impact/corrections-headphones.png"
                  alt="Vintage studio headphones on light surface"
                />
              </div>
            </div>

            {/* Right Column: Report an inaccuracy form */}
            <div className={styles.reportFormCard}>
              <h3 className={styles.reportFormTitle}>Report an inaccuracy</h3>
              <p className={styles.reportFormSubtitle}>
                Spotted an error in a story, label or report? Tell us what looks
                wrong and we’ll check it against our records.
              </p>

              <form onSubmit={handleReportSubmit}>
                <div className={styles.formRowTwoCol}>
                  <div className={styles.formField}>
                    <label htmlFor="report-type" className={styles.formLabel}>
                      Type
                    </label>
                    <select
                      id="report-type"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="A story">A story</option>
                      <option value="A case study">A case study</option>
                      <option value="An impact report">An impact report</option>
                      <option value="A label">A label</option>
                    </select>
                  </div>

                  <div className={styles.formField}>
                    <label
                      htmlFor="report-section"
                      className={styles.formLabel}
                    >
                      Section
                    </label>
                    <select
                      id="report-section"
                      value={issueSection}
                      onChange={(e) => setIssueSection(e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="Factual inaccuracy">
                        Factual inaccuracy
                      </option>
                      <option value="Outdated detail">Outdated detail</option>
                      <option value="Missing source">Missing source</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="which-story" className={styles.formLabel}>
                    Which story?
                  </label>
                  <select
                    id="which-story"
                    value={whichStory}
                    onChange={(e) => setWhichStory(e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="[Select a story]">[Select a story]</option>
                    {STORIES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="wrong-details" className={styles.formLabel}>
                    What looks wrong?
                  </label>
                  <textarea
                    id="wrong-details"
                    value={wrongDetails}
                    onChange={(e) => setWrongDetails(e.target.value)}
                    className={styles.formTextarea}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label htmlFor="report-email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    id="report-email"
                    type="email"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    className={styles.formInput}
                    required
                  />
                </div>

                {reportSubmitted ? (
                  <div className={styles.formSuccessBanner}>
                    Thank you. Your report has been logged for review against
                    our records.
                  </div>
                ) : (
                  <>
                    {reportError && (
                      <p role="alert" style={{ color: "#d9534f", fontSize: "0.9rem", margin: "0 0 8px" }}>
                        {reportError}
                      </p>
                    )}
                    <button type="submit" className={styles.submitReportBtn} disabled={reportSending}>
                      {reportSending ? "Sending..." : "Send report"}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
