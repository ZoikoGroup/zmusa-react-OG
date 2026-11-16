"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PawPrint,
  FileText,
  BarChart2,
  Scale,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Info,
  ChevronRight,
  ArrowRight,
  Check,
  Mail,
  Send,
  CircleX,
  Heart,
} from "lucide-react";
import styles from "./HowGivingWorks.module.css";

const faqsData = [
  {
    id: 1,
    question: "Does part of my bill go to charity?",
    answer:
      "No. Our giving comes from company profit, set by an approved method. It isn’t a fixed share of your bill, calls, texts or top-ups.",
  },
  {
    id: 2,
    question: "What does “up to 2% of profits” mean?",
    answer:
      "It is a preliminary marketing statement that will be replaced by our formal giving declaration once our method is formally approved by Finance and Legal.",
  },
  {
    id: 3,
    question: "Can I donate through Zoiko?",
    answer:
      "No. We are a wireless service provider, not a charitable portal. We do not solicit donations from customers or deduct charitable gifts from your service plan.",
  },
  {
    id: 4,
    question: "Which organizations do you support?",
    answer:
      "We will list each partner organization publicly here as soon as our verification checks are complete and written permission has been obtained.",
  },
  {
    id: 5,
    question: "How will I know giving actually happened?",
    answer:
      "Every published contribution will include the reporting period, recipient organization, currency, payment source, and an evidence-backed verification record.",
  },
  {
    id: 6,
    question: "What if something you published is wrong?",
    answer:
      "We maintain an open correction policy. If any published information is incorrect, you can report it to us, and we will issue a transparent correction notice.",
  },
  {
    id: 7,
    question: "I run a nonprofit. How can I be considered?",
    answer:
      "U.S. registered 501(c)(3) animal welfare organizations can submit an introductory request through our contact form to start our three-step selection review.",
  },
];

export default function HowGivingWorksClient() {
  // FAQ accordion state (Item 1 open by default as in Figma)
  const [openFaq, setOpenFaq] = useState(1);

  // Contact form state
  const [selectedTopic, setSelectedTopic] = useState("A question");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setMessage("");
      setEmail("");
    }, 4000);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ===================================================
          1. HERO SECTION
          =================================================== */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Content */}
            <div className={styles.heroLeft}>
              <div className={styles.heroPill}>
                <PawPrint className={styles.heroPillIcon} size={14} />
                <span className={styles.heroPillText}>The Animal &amp; Music Loving Network.™</span>
              </div>

              <h1 className={styles.heroTitle}>
                How giving <span className={styles.heroTitleAccent}>works</span>
              </h1>

              <p className={styles.heroDescription}>
                We support a more compassionate world through a commitment to animal welfare, clear selection standards and evidence-led reporting.
              </p>

              <div className={styles.heroCtaGroup}>
                <Link href="/explore-community" className={styles.primaryBtn}>
                  Explore community initiatives
                </Link>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className={styles.secondaryBtn}
                >
                  Contact our team
                </a>
              </div>

              <div className={styles.heroStatusBadges}>
                <div className={styles.statusPill}>
                  <FileText className={styles.statusPillIcon} size={15} />
                  <span>Method: Being finalized</span>
                </div>
                <div className={styles.statusPill}>
                  <BarChart2 className={styles.statusPillIcon} size={15} />
                  <span>Giving report: Being prepared</span>
                </div>
              </div>
            </div>

            {/* Right Collage */}
            <div className={styles.heroRightCollage}>
              {/* Main Golden Retriever & Child Card */}
              <div className={styles.heroImageCardMain}>
                <img
                  src="/img/how-giving-works/hero-dog-child.png"
                  alt="Child sitting with golden retriever dog in grass"
                />
              </div>

              {/* Top Right Woman & Dog Card */}
              <div className={styles.heroImageCardTopRight}>
                <img
                  src="/img/how-giving-works/hero-woman-dog.png"
                  alt="Woman with rescue dog in park"
                />
              </div>

              {/* Bottom Right Person with Phone Card */}
              <div className={styles.heroImageCardBottomRight}>
                <img
                  src="/img/how-giving-works/hero-phone-glow.png"
                  alt="Person connecting via smartphone at night"
                />
              </div>

              {/* Floating Dark Purple Card */}
              <div className={styles.heroFloatingCard}>
                <div className={styles.floatingCardIconBox}>
                  <Heart size={20} />
                </div>
                <div className={styles.floatingCardTitle}>Define. Verify. Report.</div>
                <div className={styles.floatingCardSubtitle}>Every claim backed by a record.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. OUR APPROACH: DEFINE, VERIFY, REPORT
          =================================================== */}
      <section className={styles.approachSection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>Our approach</div>
          <h2 className={styles.sectionTitle}>Our approach: define, verify, report</h2>

          <div className={styles.approachGrid}>
            {/* Card 01 - Define */}
            <div className={styles.approachCard}>
              <div className={styles.approachImageWrapper}>
                <img
                  src="/img/how-giving-works/approach-define.png"
                  alt="Team defining principles around plans"
                />
                <span className={styles.approachNumberWatermark}>01</span>
              </div>
              <div className={styles.approachBody}>
                <div className={styles.approachHeaderRow}>
                  <div className={styles.approachIconBox}>
                    <Sliders size={20} />
                  </div>
                  <h3 className={styles.approachCardTitle}>Define</h3>
                </div>
                <p className={styles.approachCardDescription}>
                  How contributions are set: the company, the profit basis, the period and any exceptions.
                </p>
                <a
                  href="#define"
                  onClick={(e) => scrollToSection(e, "define")}
                  className={styles.approachReadMore}
                >
                  Read more →
                </a>
              </div>
            </div>

            {/* Card 02 - Verify */}
            <div className={styles.approachCard}>
              <div className={styles.approachImageWrapper}>
                <img
                  src="/img/how-giving-works/approach-verify.png"
                  alt="Team verifying organization documentation"
                />
                <span className={styles.approachNumberWatermark}>02</span>
              </div>
              <div className={styles.approachBody}>
                <div className={styles.approachHeaderRow}>
                  <div className={styles.approachIconBox}>
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className={styles.approachCardTitle}>Verify</h3>
                </div>
                <p className={styles.approachCardDescription}>
                  How we choose and check animal-welfare organizations before we name them.
                </p>
                <a
                  href="#verify"
                  onClick={(e) => scrollToSection(e, "verify")}
                  className={styles.approachReadMore}
                >
                  Read more →
                </a>
              </div>
            </div>

            {/* Card 03 - Report */}
            <div className={styles.approachCard}>
              <div className={styles.approachImageWrapper}>
                <img
                  src="/img/how-giving-works/approach-report.png"
                  alt="Team reviewing evidence-led reports"
                />
                <span className={styles.approachNumberWatermark}>03</span>
              </div>
              <div className={styles.approachBody}>
                <div className={styles.approachHeaderRow}>
                  <div className={styles.approachIconBox}>
                    <BarChart2 size={20} />
                  </div>
                  <h3 className={styles.approachCardTitle}>Report</h3>
                </div>
                <p className={styles.approachCardDescription}>
                  Giving reports with sources, dates and corrections, once they’re verified.
                </p>
                <a
                  href="#report"
                  onClick={(e) => scrollToSection(e, "report")}
                  className={styles.approachReadMore}
                >
                  Read more →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. SECTION 01 · DEFINE
          =================================================== */}
      <section id="define" className={styles.defineSection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>01 · Define</div>
          <h2 className={styles.sectionTitle}>How contributions are determined</h2>
          <p className={styles.sectionSubtitle}>
            Giving comes from company profit, set by an approved method. It isn’t charged to you and isn’t a share of your bill.
          </p>

          {/* 6-Step Horizontal Flow */}
          <div className={styles.stepFlowBar}>
            {/* Step 1 */}
            <div className={styles.stepFlowCard}>
              <div className={styles.stepNumberCircle}>1</div>
              <div className={styles.stepCardTitle}>Customers pay for service</div>
              <div className={styles.stepCardDesc}>Your plan pays for your wireless service.</div>
            </div>

            {/* Step 2 */}
            <div className={styles.stepFlowCard}>
              <div className={styles.stepNumberCircle}>2</div>
              <div className={styles.stepCardTitle}>Zoiko earns revenue</div>
              <div className={styles.stepCardDesc}>From running the business.</div>
            </div>

            {/* Step 3 */}
            <div className={styles.stepFlowCard}>
              <div className={styles.stepNumberCircle}>3</div>
              <div className={styles.stepCardTitle}>Profit is calculated</div>
              <div className={styles.stepCardDesc}>By Finance, for a set period.</div>
            </div>

            {/* Step 4 (Active) */}
            <div className={`${styles.stepFlowCard} ${styles.stepFlowCardActive}`}>
              <div className={`${styles.stepNumberCircle} ${styles.stepNumberCircleActive}`}>4</div>
              <div className={`${styles.stepCardTitle} ${styles.stepCardTitleActive}`}>Giving amount is set</div>
              <div className={`${styles.stepCardDesc} ${styles.stepCardDescActive}`}>Using the approved method.</div>
            </div>

            {/* Step 5 (Active) */}
            <div className={`${styles.stepFlowCard} ${styles.stepFlowCardActive}`}>
              <div className={`${styles.stepNumberCircle} ${styles.stepNumberCircleActive}`}>5</div>
              <div className={`${styles.stepCardTitle} ${styles.stepCardTitleActive}`}>Paid to verified groups</div>
              <div className={`${styles.stepCardDesc} ${styles.stepCardDescActive}`}>Only to checked organizations.</div>
            </div>

            {/* Step 6 (Active) */}
            <div className={`${styles.stepFlowCard} ${styles.stepFlowCardActive}`}>
              <div className={`${styles.stepNumberCircle} ${styles.stepNumberCircleActive}`}>6</div>
              <div className={`${styles.stepCardTitle} ${styles.stepCardTitleActive}`}>Reported with evidence</div>
              <div className={`${styles.stepCardDesc} ${styles.stepCardDescActive}`}>With source and date.</div>
            </div>
          </div>

          {/* Split Content: Declaration & Parameters vs Image & What Giving Isn't */}
          <div className={styles.defineSplit}>
            {/* Left Column */}
            <div>
              {/* Declaration Card */}
              <div className={styles.declarationCard}>
                <div className={styles.declarationHeader}>
                  <div className={styles.declarationTitle}>Our giving declaration</div>
                  <span className={styles.declarationBadge}>Not yet approved</span>
                </div>
                <p className={styles.declarationText}>
                  Our method is being finalized by Finance and Legal. Until it’s approved, we don’t publish a percentage or amount. You may see “up to 2% of profits” elsewhere on our site; that’s a marketing statement, and we’ll replace it with the approved declaration here.
                </p>
              </div>

              {/* Parameter 4 Cards Grid */}
              <div className={styles.parameterGrid}>
                <div className={styles.parameterCard}>
                  <span className={styles.parameterLabel}>Giving company</span>
                  <span className={styles.parameterValue}>Being confirmed</span>
                </div>
                <div className={styles.parameterCard}>
                  <span className={styles.parameterLabel}>Profit basis</span>
                  <span className={styles.parameterValue}>Being defined by Finance</span>
                </div>
                <div className={styles.parameterCard}>
                  <span className={styles.parameterLabel}>Reporting period</span>
                  <span className={styles.parameterValue}>Being confirmed</span>
                </div>
                <div className={styles.parameterCard}>
                  <span className={styles.parameterLabel}>Exceptions &amp; cap</span>
                  <span className={styles.parameterValue}>Being confirmed</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.defineRightCol}>
              <div className={styles.defineTeamImage}>
                <img
                  src="/img/how-giving-works/define-team-working.png"
                  alt="Zoiko Mobile cross-functional team collaborating"
                />
              </div>

              <div className={styles.whatGivingIsntCard}>
                <div className={styles.isntTitle}>What our giving isn’t</div>
                <div className={styles.isntList}>
                  <div className={styles.isntItem}>
                    <CircleX className={styles.isntIcon} size={16} />
                    <span>A fixed share of your bill, call, text or top-up</span>
                  </div>
                  <div className={styles.isntItem}>
                    <CircleX className={styles.isntIcon} size={16} />
                    <span>A donation made by you, or a tax-deductible gift</span>
                  </div>
                  <div className={styles.isntItem}>
                    <CircleX className={styles.isntIcon} size={16} />
                    <span>A guarantee that any specific charity receives funds</span>
                  </div>
                  <div className={styles.isntItem}>
                    <CircleX className={styles.isntIcon} size={16} />
                    <span>An audited or certified figure, unless we say so with proof</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          4. SECTION 02 · VERIFY
          =================================================== */}
      <section id="verify" className={styles.verifySection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>02 · Verify</div>
          <h2 className={styles.sectionTitle}>How we select organizations</h2>
          <p className={styles.sectionSubtitle}>
            Three checks come before any organization is named or receives support.
          </p>

          <div className={styles.verifyGrid}>
            {/* Step 1 Card */}
            <div className={styles.verifyStepCard}>
              <img
                src="/img/how-giving-works/verify-step1-eligibility.png"
                alt="Representative checking organizational eligibility"
                className={styles.verifyStepBg}
              />
              <div className={styles.verifyStepOverlay} />
              <div className={styles.verifyStepContent}>
                <span className={styles.stepTag}>STEP 1</span>
                <h3 className={styles.verifyStepTitle}>Eligibility</h3>
                <p className={styles.verifyStepDesc}>
                  Registered U.S. nonprofit status, a clear animal-welfare mission and programs that fit our standards.
                </p>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className={styles.verifyStepCard}>
              <img
                src="/img/how-giving-works/verify-step2-verification.png"
                alt="Governance and identity document check"
                className={styles.verifyStepBg}
              />
              <div className={styles.verifyStepOverlay} />
              <div className={styles.verifyStepContent}>
                <span className={styles.stepTag}>STEP 2</span>
                <h3 className={styles.verifyStepTitle}>Verification</h3>
                <p className={styles.verifyStepDesc}>
                  Identity, governance and financial checks before any payment.
                </p>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className={styles.verifyStepCard}>
              <img
                src="/img/how-giving-works/verify-step3-permission.png"
                alt="Nonprofit representatives agreeing on written partnership terms"
                className={styles.verifyStepBg}
              />
              <div className={styles.verifyStepOverlay} />
              <div className={styles.verifyStepContent}>
                <span className={styles.stepTag}>STEP 3</span>
                <h3 className={styles.verifyStepTitle}>Permission</h3>
                <p className={styles.verifyStepDesc}>
                  Written permission before we name an organization or use its logo.
                </p>
              </div>
            </div>
          </div>

          {/* Partner Notice Banner */}
          <div className={styles.partnerNoticeBanner}>
            <div className={styles.noticeLeft}>
              <div className={styles.noticeIconBox}>
                <PawPrint size={22} />
              </div>
              <div className={styles.noticeTextGroup}>
                <div className={styles.noticeHeading}>Partner profiles aren’t published yet</div>
                <div className={styles.noticeSub}>
                  We’ll show each organization here once it has passed our checks and given permission to be named.
                </div>
              </div>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                scrollToSection(e, "contact");
                setSelectedTopic("I’m a nonprofit");
              }}
              className={styles.noticeLink}
            >
              Nonprofits: get in touch →
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================
          5. SECTION 03 · REPORT (DARK PURPLE)
          =================================================== */}
      <section id="report" className={styles.reportSection}>
        <img
          src="/img/how-giving-works/report-bg.png"
          alt=""
          className={styles.reportBgImage}
          aria-hidden="true"
        />
        <div className={styles.container}>
          <div className={`${styles.sectionBadge} ${styles.sectionBadgeLight}`}>03 · Report</div>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>Giving reports and updates</h2>
          <p className={`${styles.sectionSubtitle} ${styles.sectionSubtitleLight}`}>
            Every published figure shows the period, currency, source and how it was checked.
          </p>

          <div className={styles.reportGrid}>
            {/* Left Card */}
            <div className={styles.reportCardLeft}>
              <div className={styles.reportIconBox}>
                <FileText size={24} />
              </div>
              <div className={styles.reportCardTitle}>We are preparing a verified giving report.</div>
              <div className={styles.reportCardSubtitle}>No contribution total is published at this time.</div>
            </div>

            {/* Right Card */}
            <div className={styles.reportCardRight}>
              <div className={styles.reportIncludesTitle}>Every report will include</div>
              <div className={styles.reportChecklist}>
                <div className={styles.checklistItem}>
                  <Check className={styles.checkIcon} size={16} strokeWidth={3} />
                  <span>Reporting period</span>
                </div>
                <div className={styles.checklistItem}>
                  <Check className={styles.checkIcon} size={16} strokeWidth={3} />
                  <span>Amount and currency</span>
                </div>
                <div className={styles.checklistItem}>
                  <Check className={styles.checkIcon} size={16} strokeWidth={3} />
                  <span>Company that gave</span>
                </div>
                <div className={styles.checklistItem}>
                  <Check className={styles.checkIcon} size={16} strokeWidth={3} />
                  <span>Who received it</span>
                </div>
                <div className={styles.checklistItem}>
                  <Check className={styles.checkIcon} size={16} strokeWidth={3} />
                  <span>How it was checked</span>
                </div>
                <div className={styles.checklistItem}>
                  <Check className={styles.checkIcon} size={16} strokeWidth={3} />
                  <span>Date published</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          6. STORIES & IMPACT
          =================================================== */}
      <section className={styles.storiesSection}>
        <div className={styles.container}>
          <div className={styles.storiesGrid}>
            {/* Left 3-Image Collage */}
            <div className={styles.storiesCollage}>
              <div className={styles.storiesColLeft}>
                <img
                  src="/img/how-giving-works/stories-cat-bed.png"
                  alt="Cat resting comfortably in warm wooden shelter bed"
                />
              </div>
              <div className={styles.storiesColRightTop}>
                <img
                  src="/img/how-giving-works/stories-guitar-nature.png"
                  alt="Acoustic music community guitar in tree canopy"
                />
              </div>
              <div className={styles.storiesColRightBottom}>
                <img
                  src="/img/how-giving-works/stories-garden-tools.png"
                  alt="Sanctuary volunteer and garden tools in grass"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className={styles.storiesRightContent}>
              <div className={styles.sectionBadge}>Stories &amp; impact</div>
              <h2 className={styles.sectionTitle}>Real stories, only with evidence.</h2>
              <p className={styles.sectionSubtitle}>
                We share stories from the organizations we support once facts are checked and the people in them agree.
              </p>

              <div className={styles.storiesInfoBox}>
                <Info className={styles.storiesInfoIcon} size={18} />
                <span>No verified impact stories are published yet. Reviewed November 6, 2026.</span>
              </div>

              <div>
                <Link href="/stories-and-impact" className={styles.storiesDarkBtn}>
                  Visit Stories &amp; Impact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          7. FAQS & CONTACT FORM SECTION
          =================================================== */}
      <section id="contact" className={styles.faqsSection}>
        <div className={styles.container}>
          <div className={styles.faqsGrid}>
            {/* Left Accordion Column */}
            <div>
              <div className={styles.sectionBadge}>FAQs</div>
              <h2 className={styles.sectionTitle}>
                Questions about our giving<br />commitment
              </h2>

              <div className={styles.accordionList}>
                {faqsData.map((faq) => {
                  const isOpen = openFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className={styles.accordionHeader}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <span
                          className={`${styles.accordionToggleBtn} ${
                            isOpen ? styles.accordionToggleBtnOpen : ""
                          }`}
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className={styles.accordionBody}>
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Contact Card Column */}
            <div className={styles.contactCard}>
              <div className={styles.contactAgentImage}>
                <img
                  src="/img/how-giving-works/contact-support-agent.png"
                  alt="Zoiko customer support specialist"
                />
              </div>

              <div className={styles.contactCardBody}>
                <h3 className={styles.contactCardTitle}>Contact our team</h3>

                <form onSubmit={handleContactSubmit}>
                  {/* Topic Selector */}
                  <div className={styles.formGroup} style={{ marginBottom: "16px" }}>
                    <span className={styles.formLabel}>What’s it about?</span>
                    <div className={styles.topicPillsGroup}>
                      {["A question", "Report a correction", "I’m a nonprofit"].map((topic) => {
                        const isSelected = selectedTopic === topic;
                        return (
                          <button
                            type="button"
                            key={topic}
                            onClick={() => setSelectedTopic(topic)}
                            className={`${styles.topicPill} ${
                              isSelected ? styles.topicPillActive : ""
                            }`}
                          >
                            <span
                              className={`${styles.topicRadioDot} ${
                                isSelected ? styles.topicRadioDotActive : ""
                              }`}
                            >
                              {isSelected && <span className={styles.topicRadioDotInner} />}
                            </span>
                            <span>{topic}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className={styles.formGroup} style={{ marginBottom: "16px" }}>
                    <label htmlFor="contact-message" className={styles.formLabel}>
                      Your message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your question, comment, or verification inquiry..."
                      className={styles.formTextarea}
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className={styles.formGroup} style={{ marginBottom: "20px" }}>
                    <label htmlFor="contact-email" className={styles.formLabel}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className={styles.formInput}
                      required
                    />
                  </div>

                  {formSubmitted ? (
                    <div className={styles.successMessage}>
                      ✅ Thank you! Your message regarding &ldquo;{selectedTopic}&rdquo; has been sent. Our team will review and reply shortly.
                    </div>
                  ) : (
                    <button type="submit" className={styles.submitBtn}>
                      Send message
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
