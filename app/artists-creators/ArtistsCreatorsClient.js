"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  User,
  Sliders,
  PenTool,
  GraduationCap,
  Video,
  ChevronDown,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import styles from "./ArtistsCreators.module.css";

const roleCategories = [
  { id: "performers", label: "Performers", count: "2 profiles", icon: User },
  { id: "producers", label: "Producers", count: "1 profile", icon: Sliders },
  { id: "songwriters", label: "Songwriters", count: "1 profile", icon: PenTool },
  { id: "educators", label: "Educators", count: "1 profile", icon: GraduationCap },
  { id: "visual-video", label: "Visual & video", count: "1 profile", icon: Video },
];

const creatorsData = [
  {
    id: "ethan-brooks",
    name: "Ethan Brooks",
    role: "Performers",
    roleBadge: "PERFORMERS",
    genreRole: "Folk · Singer-songwriter",
    bio: "A performer who plays local venues and community nights.",
    tags: ["Local scene", "Animal causes"],
    img: "/img/Artists-Creators/ac4.png",
    sample: true,
  },
  {
    id: "noah-williams",
    name: "Noah Williams",
    role: "Producers",
    roleBadge: "PRODUCERS",
    genreRole: "Electronic · Producer",
    bio: "A producer building tracks for local artists.",
    tags: ["New release"],
    img: "/img/Artists-Creators/ac5.png",
    sample: true,
  },
  {
    id: "marcus-reed",
    name: "Marcus Reed",
    role: "Educators",
    roleBadge: "EDUCATORS",
    genreRole: "Music teacher · Guitar",
    bio: "An educator who teaches community music classes.",
    tags: ["Teaching"],
    img: "/img/Artists-Creators/ac6.png",
    sample: true,
  },
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    role: "Songwriters",
    roleBadge: "SONGWRITERS",
    genreRole: "Pop · Songwriter",
    bio: "A songwriter writing about everyday resilience.",
    tags: ["Livestreams"],
    img: "/img/Artists-Creators/ac7.png",
    sample: true,
  },
  {
    id: "daniel-carter",
    name: "Daniel Carter",
    role: "Performers",
    roleBadge: "PERFORMERS",
    genreRole: "Jazz · Vocals",
    bio: "A vocalist who performs at community events.",
    tags: ["Teaching", "Local scene"],
    img: "/img/Artists-Creators/ac8.png",
    sample: true,
  },
  {
    id: "maya-thompson",
    name: "Maya Thompson",
    role: "Visual & video",
    roleBadge: "VISUAL & VIDEO",
    genreRole: "Music video · Photography",
    bio: "A visual creator filming live sets and portraits.",
    tags: ["Animal causes"],
    img: "/img/Artists-Creators/ac9.png",
    sample: true,
  },
];

const featureSteps = [
  {
    step: 1,
    title: "Nominate or apply",
    description:
      "Creators share interest, or our editors find them through community events.",
  },
  {
    step: 2,
    title: "Editorial review",
    description:
      "Our team reviews the creator's work and story. There's no monthly quota or guaranteed selection.",
  },
  {
    step: 3,
    title: "Permission & rights",
    description:
      "Identity, photo, music and quote permissions are confirmed in writing.",
  },
  {
    step: 4,
    title: "Creator review",
    description:
      "The creator or their manager reviews the profile before it goes live.",
  },
  {
    step: 5,
    title: "Published & maintained",
    description:
      "Profiles are dated, reviewed and updated. Creators can ask for changes or removal anytime.",
  },
];

const musicHubBenefits = [
  {
    id: "musician-discount",
    title: "Musician &\nstudent discount",
    badge: "Terms being verified",
    description: "Savings on plans for eligible musicians and students.",
  },
  {
    id: "streaming-trial",
    title: "Music streaming\ntrial",
    badge: "Terms being verified",
    description: "A trial of a partner music service.",
  },
  {
    id: "data-treatment",
    title: "Music data\ntreatment",
    badge: "Terms being verified",
    description: "How music streaming uses your plan data.",
  },
  {
    id: "cloud-storage",
    title: "Cloud storage &\ncreative apps",
    badge: "Terms being verified",
    description: "Storage space and creative software for creators.",
  },
  {
    id: "musician-spotlight",
    title: "Musician\nSpotlight",
    badge: "Terms being verified",
    description: "A recurring editorial feature for creators.",
  },
];

const faqData = [
  {
    id: 1,
    question: "Do I need to be a Zoiko customer to be featured?",
    answer:
      "No. Profiles are editorial features. Being featured never depends on having a Zoiko plan.",
  },
  {
    id: 2,
    question: "Does being featured mean the creator endorses Zoiko?",
    answer:
      "No. Features are purely editorial spotlights to celebrate community creators. They are not paid sponsorships or brand endorsements.",
  },
  {
    id: 3,
    question: "Can I listen to music here?",
    answer:
      "Yes, profile pages include links to public tracks, streams, and releases shared with the artist's permission.",
  },
  {
    id: 4,
    question: "Is there a monthly Musician Spotlight?",
    answer:
      "We regularly curate and spotlight creators through our community newsletter and music hub features as terms are verified.",
  },
  {
    id: 5,
    question: "Are musician discounts available?",
    answer:
      "Musician and student plan discounts are currently in the verification stage and will be published once partner terms are finalized.",
  },
  {
    id: 6,
    question: "How do I change or remove my profile?",
    answer:
      "Featured creators or their managers can use the Creators & managers form on this page or email us directly. Removal requests are prioritized immediately.",
  },
];

export default function ArtistsCreatorsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  // FAQ Accordion State (first item open by default)
  const [openFaq, setOpenFaq] = useState(1);

  // Creators & Managers Form State
  const [formProfile, setFormProfile] = useState("");
  const [formRequest, setFormRequest] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter and sort creators
  const filteredCreators = useMemo(() => {
    return creatorsData
      .filter((creator) => {
        // Search term filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchName = creator.name.toLowerCase().includes(term);
          const matchGenre = creator.genreRole.toLowerCase().includes(term);
          const matchBio = creator.bio.toLowerCase().includes(term);
          const matchTags = creator.tags.some((t) =>
            t.toLowerCase().includes(term)
          );
          if (!matchName && !matchGenre && !matchBio && !matchTags) {
            return false;
          }
        }

        // Role filter
        if (selectedRole !== "all") {
          if (
            creator.role.toLowerCase() !== selectedRole.toLowerCase() &&
            creator.roleBadge.toLowerCase() !== selectedRole.toLowerCase()
          ) {
            return false;
          }
        }

        // Tag filter
        if (selectedTag !== "all") {
          if (!creator.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "az") {
          return a.name.localeCompare(b.name);
        }
        if (sortOrder === "za") {
          return b.name.localeCompare(a.name);
        }
        return 0; // default order
      });
  }, [searchTerm, selectedRole, selectedTag, sortOrder]);

  const handleRoleCardClick = (roleLabel) => {
    if (selectedRole.toLowerCase() === roleLabel.toLowerCase()) {
      setSelectedRole("all");
    } else {
      setSelectedRole(roleLabel);
      const directoryEl = document.getElementById("creator-directory");
      if (directoryEl) {
        directoryEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleToggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormProfile("");
      setFormRequest("");
      setFormDetails("");
      setFormEmail("");
    }, 4000);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* =========================================================
          MOBILE-ONLY BANNER & BREADCRUMB
         ========================================================= */}
      <div className={`${styles.mobileNoticeBanner} ${styles.mobileOnly}`}>
        Design preview: creator profiles below are placeholder layouts, not real artists or endorsements.
      </div>

      <div className={`${styles.mobileBreadcrumbsWrapper} ${styles.mobileOnly}`}>
        <div className={styles.mobileBreadcrumbs}>
          <span>Home</span>
          <span className={styles.breadcrumbDivider}>/</span>
          <span>Community</span>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>Artists &amp; Creators</span>
        </div>
      </div>

      {/* =========================================================
          HERO SECTION
         ========================================================= */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          {/* Left Column: Content */}
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIcon}>♫</span>
              <span>THE ANIMAL &amp; MUSIC LOVING NETWORK</span>
              <span className={styles.eyebrowArrow}>↗</span>
            </div>

            <h1 className={styles.heroTitle}>
              Meet the artists and<br />
              creators{" "}
              <span className={styles.gradientText}>shaping our</span><br />
              <span className={styles.gradientText}>community.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Explore published profiles, creative journeys and links shared with
              permission.
            </p>

            <div className={styles.heroActions}>
              <a href="#creator-directory" className={styles.btnPrimary}>
                <Search size={16} strokeWidth={2.5} />
                <span>Browse creators</span>
              </a>
              <a href="#how-chosen" className={styles.btnSecondary}>
                How features are chosen
              </a>
            </div>

            <div className={styles.noticePill}>
              <span className={styles.noticeIconCircle}>ⓘ</span>
              <span className={styles.noticeText}>
                Profiles are editorial features. Availability of discounts and
                program benefits depends on the published offer terms.
              </span>
            </div>
          </div>

          {/* Right Column: Media Collage (DESKTOP) */}
          <div className={`${styles.heroCollage} ${styles.desktopOnly}`}>
            <div className={styles.collageTopRow}>
              {/* Main Producer photo */}
              <div className={styles.collageImgMainWrapper}>
                <Image
                  src="/img/Artists-Creators/ac1.png"
                  alt="Producer at synthesizer"
                  width={387}
                  height={346}
                  className={styles.collageImgMain}
                  priority
                />
              </div>

              {/* Guitarist photo */}
              <div className={styles.collageImgSecondaryWrapper}>
                <Image
                  src="/img/Artists-Creators/ac2.png"
                  alt="Guitarist performing"
                  width={232}
                  height={227}
                  className={styles.collageImgSecondary}
                  priority
                />
              </div>
            </div>

            {/* Overlapping Plum Card */}
            <div className={styles.collagePlumCard}>
              <div className={styles.plumCardContent}>
                <div className={styles.plumMusicBadge}>
                  <span>♫</span>
                </div>
                <h3 className={styles.plumCardTitle}>
                  Creator stories, told with permission
                </h3>
                <p className={styles.plumCardSubtitle}>
                  Editorial features, never endorsements.
                </p>
              </div>
              <div className={styles.plumCardGraphic}>
                <Image
                  src="/img/Artists-Creators/ac3.png"
                  alt="Microphone graphic"
                  width={297}
                  height={195}
                  className={styles.plumMicrophoneImg}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Media Collage (MOBILE ONLY) */}
          <div className={`${styles.mobileHeroCollage} ${styles.mobileOnly}`}>
            <div className={styles.mobileCollageTopRow}>
              {/* Acoustic Guitar */}
              <div className={styles.mobileCollageGuitarWrapper}>
                <Image
                  src="/img/Artists-Creators/ac14.png"
                  alt="Acoustic guitar in garden"
                  width={206}
                  height={282}
                  className={styles.mobileCollageImg}
                />
              </div>

              {/* Studio Monitors / Wooden Speakers */}
              <div className={styles.mobileCollageSpeakersWrapper}>
                <Image
                  src="/img/Artists-Creators/ac15.png"
                  alt="Wooden studio monitors"
                  width={124}
                  height={185}
                  className={styles.mobileCollageImg}
                />
              </div>
            </div>

            {/* Mobile Plum Card with Microphone */}
            <div className={styles.mobilePlumCard}>
              <div className={styles.mobilePlumContent}>
                <div className={styles.plumMusicBadge}>
                  <span>♫</span>
                </div>
                <h3 className={styles.mobilePlumTitle}>
                  Creator stories,<br />told with<br />permission
                </h3>
                <p className={styles.mobilePlumSubtitle}>
                  Editorial features, never endorsements.
                </p>
              </div>
              <div className={styles.mobilePlumGraphic}>
                <Image
                  src="/img/Artists-Creators/ac16.png"
                  alt="Microphone illustration"
                  width={158}
                  height={159}
                  className={styles.mobileMicrophoneImg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BROWSE BY ROLE SECTION
         ========================================================= */}
      <section className={styles.browseRoleSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.browseRoleHeading}>Browse by role</h2>

          <div className={styles.roleGrid}>
            {roleCategories.map((item) => {
              const IconComp = item.icon;
              const isSelected =
                selectedRole.toLowerCase() === item.label.toLowerCase();
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleRoleCardClick(item.label)}
                  className={`${styles.roleCard} ${
                    isSelected ? styles.roleCardActive : ""
                  }`}
                >
                  <div className={styles.roleIconCircle}>
                    <IconComp size={18} strokeWidth={2.2} />
                  </div>
                  <div className={styles.roleInfo}>
                    <div className={styles.roleName}>{item.label}</div>
                    <div className={styles.roleCount}>{item.count}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          CREATOR DIRECTORY ("FIND A CREATOR")
         ========================================================= */}
      <section id="creator-directory" className={styles.directorySection}>
        <div className={styles.sectionContainer}>
          <div className={styles.directoryHeader}>
            <span className={styles.directoryEyebrow}>CREATOR DIRECTORY</span>
            <h2 className={styles.directoryTitle}>Find a creator.</h2>
            <p className={styles.directorySubtitle}>
              Only published profiles appear here, each shared with the creator&apos;s
              permission.
            </p>
          </div>

          {/* Filters Bar */}
          <div className={styles.filtersBar}>
            {/* Search Input */}
            <div className={styles.searchGroup}>
              <label htmlFor="creatorSearch" className={styles.filterLabel}>
                Search by name or genre
              </label>
              <div className={styles.searchInputWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  id="creatorSearch"
                  type="text"
                  placeholder="e.g. Folk, producer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="roleSelect" className={styles.filterLabel}>
                Role
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="roleSelect"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All roles</option>
                  <option value="Performers">Performers</option>
                  <option value="Producers">Producers</option>
                  <option value="Songwriters">Songwriters</option>
                  <option value="Educators">Educators</option>
                  <option value="Visual & video">Visual &amp; video</option>
                </select>
                <ChevronDown size={14} className={styles.selectChevron} />
              </div>
            </div>

            {/* Story Tag Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="tagSelect" className={styles.filterLabel}>
                Story tag
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="tagSelect"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All tags</option>
                  <option value="Local scene">Local scene</option>
                  <option value="Animal causes">Animal causes</option>
                  <option value="New release">New release</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Livestreams">Livestreams</option>
                </select>
                <ChevronDown size={14} className={styles.selectChevron} />
              </div>
            </div>

            {/* Sort Order */}
            <div className={styles.filterGroup}>
              <label htmlFor="sortSelect" className={styles.filterLabel}>
                Sort
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="sortSelect"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="default">Editor&apos;s order</option>
                  <option value="az">Name: A to Z</option>
                  <option value="za">Name: Z to A</option>
                </select>
                <ChevronDown size={14} className={styles.selectChevron} />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className={styles.resultsCount}>
            {filteredCreators.length} published profiles
          </div>

          {/* Cards Grid */}
          <div className={styles.cardsGrid}>
            {filteredCreators.map((creator) => (
              <div key={creator.id} className={styles.creatorCard}>
                {/* Image Container with Badges */}
                <div className={styles.cardImageContainer}>
                  <Image
                    src={creator.img}
                    alt={creator.name}
                    width={313}
                    height={230}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardBadges}>
                    <span className={styles.badgeRole}>{creator.roleBadge}</span>
                    <span className={styles.badgeSample}>Sample</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardName}>{creator.name}</h3>
                  <div className={styles.cardGenre}>{creator.genreRole}</div>
                  <p className={styles.cardBio}>{creator.bio}</p>

                  <div className={styles.cardTags}>
                    {creator.tags.map((tag) => (
                      <span key={tag} className={styles.tagPill}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button type="button" className={styles.btnViewProfile}>
                    View profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCreators.length === 0 && (
            <div className={styles.noResults}>
              <p>No published profiles match your current search and filters.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRole("all");
                  setSelectedTag("all");
                }}
                className={styles.btnResetFilters}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          HOW A CREATOR GETS FEATURED SECTION
         ========================================================= */}
      <section id="how-chosen" className={styles.howFeaturedSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.howFeaturedGrid}>
            {/* Left Column: Process Steps */}
            <div className={styles.howFeaturedContent}>
              <div className={styles.howFeaturedBadge}>
                <span>HOW FEATURES WORK</span>
              </div>
              <h2 className={styles.howFeaturedTitle}>
                How a creator gets featured.
              </h2>
              <p className={styles.howFeaturedSubtitle}>
                Features are editorial and never guaranteed. Being featured doesn&apos;t
                mean a creator is sponsored by or endorses Zoiko.
              </p>

              <div className={styles.stepsList}>
                {featureSteps.map((stepItem) => (
                  <div key={stepItem.step} className={styles.stepItem}>
                    <div
                      className={`${styles.stepNumberCircle} ${
                        stepItem.step === 1 ? styles.stepNumberPrimary : styles.stepNumberDark
                      }`}
                    >
                      {stepItem.step}
                    </div>
                    <div className={styles.stepContent}>
                      <h3 className={styles.stepTitle}>{stepItem.title}</h3>
                      <p className={styles.stepDescription}>
                        {stepItem.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Composition (DESKTOP) */}
            <div className={`${styles.howFeaturedMedia} ${styles.desktopOnly}`}>
              {/* Tall Studio Photo */}
              <div className={styles.mediaTallWrapper}>
                <Image
                  src="/img/Artists-Creators/ac10.png"
                  alt="Creator in studio with headphones"
                  width={316}
                  height={440}
                  className={styles.mediaTallImg}
                />
              </div>

              {/* Right Stack: Sunset Festival Illustration + Rights Card */}
              <div className={styles.mediaRightStack}>
                <div className={styles.mediaFestivalWrapper}>
                  <Image
                    src="/img/Artists-Creators/ac11.png"
                    alt="Festival crowd and sunset"
                    width={316}
                    height={267}
                    className={styles.mediaFestivalImg}
                  />
                </div>

                <div className={styles.rightsCard}>
                  <span className={styles.rightsEyebrow}>
                    CREATORS KEEP THEIR RIGHTS
                  </span>
                  <p className={styles.rightsText}>
                    Featuring you never transfers your music or image to Zoiko.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Composition (MOBILE ONLY) */}
            <div className={`${styles.mobileHowFeaturedMedia} ${styles.mobileOnly}`}>
              {/* Over-ear Headphones Photo */}
              <div className={styles.mobileMediaHeadphonesWrapper}>
                <Image
                  src="/img/Artists-Creators/ac17.png"
                  alt="Studio headphones"
                  width={164}
                  height={440}
                  className={styles.mobileMediaImg}
                />
              </div>

              {/* Right Stack: Sunset Festival Illustration + Rights Card */}
              <div className={styles.mobileMediaRightStack}>
                <div className={styles.mobileFestivalWrapper}>
                  <Image
                    src="/img/Artists-Creators/ac18.png"
                    alt="Festival crowd at sunset"
                    width={164}
                    height={238}
                    className={styles.mobileMediaImg}
                  />
                </div>

                <div className={styles.rightsCard}>
                  <span className={styles.rightsEyebrow}>
                    CREATORS KEEP THEIR RIGHTS
                  </span>
                  <p className={styles.rightsText}>
                    Featuring you never transfers your music or image to Zoiko.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MUSIC HUB BENEFITS SECTION
         ========================================================= */}
      <section className={styles.benefitsSection}>
        {/* Subtle Vinyl Turntable Background Graphic */}
        <div className={styles.benefitsVinylBg}>
          <Image
            src="/img/Artists-Creators/ac12.png"
            alt="Vinyl turntable background"
            width={400}
            height={440}
            className={styles.benefitsVinylImg}
          />
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.benefitsHeader}>
            <div className={styles.benefitsEyebrow}>
              <span>MUSIC HUB BENEFITS</span>
            </div>
            <h2 className={styles.benefitsTitle}>
              Perks, kept separate and honest.
            </h2>
            <p className={styles.benefitsSubtitle}>
              Music Hub benefits are separate from creator profiles. Each one
              becomes available only once its terms are confirmed.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className={styles.benefitsGrid}>
            {musicHubBenefits.map((benefit) => (
              <div key={benefit.id} className={styles.benefitCard}>
                <div className={styles.benefitCardHeader}>
                  <h3 className={styles.benefitCardTitle}>
                    {benefit.title.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < benefit.title.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>
                  <span className={styles.benefitBadge}>{benefit.badge}</span>
                </div>
                <p className={styles.benefitDescription}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.benefitsFooterNote}>
            Being featured never requires being a Zoiko customer, and benefits never
            depend on being featured.
          </div>
        </div>
      </section>

      {/* =========================================================
          WANT TO BE FEATURED? SECTION
         ========================================================= */}
      <section className={styles.wantFeaturedSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.wantFeaturedGrid}>
            {/* Left Column: Info & Creator Studio Photo */}
            <div className={styles.wantFeaturedLeft}>
              <div className={styles.wantFeaturedBadge}>
                <span>HOW TO BE CONSIDERED</span>
              </div>
              <h2 className={styles.wantFeaturedTitle}>
                Want to be featured?
              </h2>
              <p className={styles.wantFeaturedSubtitle}>
                Tell us about your work. Being considered doesn&apos;t guarantee a feature,
                event, discount or partnership.
              </p>

              {/* Creator Studio Photo */}
              <div className={styles.wantFeaturedImgWrapper}>
                <Image
                  src="/img/Artists-Creators/ac13.png"
                  alt="Young creator in recording studio"
                  width={618}
                  height={348}
                  className={`${styles.wantFeaturedImg} ${styles.desktopOnly}`}
                />
                <Image
                  src="/img/Artists-Creators/ac20.png"
                  alt="Creators collaborating with smartphone"
                  width={342}
                  height={193}
                  className={`${styles.wantFeaturedImg} ${styles.mobileOnly}`}
                />
              </div>

              {/* Privacy & Safety Bullet Points */}
              <div className={styles.safetyBullets}>
                <div className={styles.safetyBulletItem}>
                  <ShieldCheck size={18} className={styles.safetyIcon} />
                  <span>
                    We only ask for your stage name, email, role and one public link.
                  </span>
                </div>
                <div className={styles.safetyBulletItem}>
                  <ShieldCheck size={18} className={styles.safetyIcon} />
                  <span>Never send rights documents or passwords here.</span>
                </div>
                <div className={styles.safetyBulletItem}>
                  <ShieldCheck size={18} className={styles.safetyIcon} />
                  <span>
                    Your interest stays private. We don&apos;t list who has applied.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Card */}
            <div className={styles.wantFeaturedRight}>
              <div className={styles.contactCard}>
                <span className={styles.contactCardEyebrow}>
                  INTEREST FORM NOT OPEN YET
                </span>
                <h3 className={styles.contactCardTitle}>
                  Get in touch with our editors
                </h3>
                <p className={styles.contactCardSubtitle}>
                  Our interest form isn&apos;t open yet. You can email our community
                  editors with a short note and one link to your work.
                </p>

                <a
                  href="mailto:editors@zoikomobile.com?subject=Creator%20Feature%20Interest"
                  className={styles.btnEmailEditors}
                >
                  Email our editors
                </a>

                <div className={styles.contactAddressHook}>
                  Address: [convert creators hook]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQS & CREATORS/MANAGERS SECTION
         ========================================================= */}
      <section className={styles.faqsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.faqsGrid}>
            {/* Left Column: Questions from fans and creators */}
            <div className={styles.faqsLeft}>
              <div className={styles.faqsBadge}>
                <span>FAQS</span>
              </div>
              <h2 className={styles.faqsTitle}>
                Questions from fans and creators.
              </h2>

              <div className={styles.accordionList}>
                {faqData.map((faq) => {
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
                        onClick={() => handleToggleFaq(faq.id)}
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

            {/* Right Column: Creators & Managers Form Card */}
            <div className={styles.faqsRight}>
              <div className={styles.managersCard}>
                <h3 className={styles.managersTitle}>Creators &amp; managers</h3>
                <p className={styles.managersSubtitle}>
                  Featured on this page? Request a correction, an update or removal
                  of your profile. We act on removal requests first, then review.
                </p>

                <form onSubmit={handleFormSubmit} className={styles.managersForm}>
                  {/* Profile field */}
                  <div className={styles.formGroup}>
                    <label htmlFor="formProfile" className={styles.formLabel}>
                      Profile
                    </label>
                    <input
                      id="formProfile"
                      type="text"
                      placeholder="Choose a profile"
                      value={formProfile}
                      onChange={(e) => setFormProfile(e.target.value)}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  {/* Request field */}
                  <div className={styles.formGroup}>
                    <label htmlFor="formRequest" className={styles.formLabel}>
                      Request
                    </label>
                    <input
                      id="formRequest"
                      type="text"
                      placeholder="Correct details or credits"
                      value={formRequest}
                      onChange={(e) => setFormRequest(e.target.value)}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  {/* Details field */}
                  <div className={styles.formGroup}>
                    <label htmlFor="formDetails" className={styles.formLabel}>
                      Details
                    </label>
                    <textarea
                      id="formDetails"
                      rows={3}
                      value={formDetails}
                      onChange={(e) => setFormDetails(e.target.value)}
                      className={styles.formTextarea}
                      required
                    />
                  </div>

                  {/* Your email field */}
                  <div className={styles.formGroup}>
                    <label htmlFor="formEmail" className={styles.formLabel}>
                      Your email
                    </label>
                    <input
                      id="formEmail"
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className={styles.btnSubmitRequest}>
                    {formSubmitted ? "Request submitted ✓" : "Send request"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile Photo Credits Footnote */}
          <div className={`${styles.mobilePhotoCredits} ${styles.mobileOnly}`}>
            <span>•</span>
            <span>Photo credits</span>
          </div>
        </div>
      </section>
    </div>
  );
}
