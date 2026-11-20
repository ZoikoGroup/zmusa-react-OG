"use client";

import Link from "next/link";
import Image from "next/image";
import WhatsAppFloating from "./WhatsApp";
import {
  Smartphone,
  UserRound,
  BriefcaseBusiness,
  ChevronRight,
  ArrowRightLeft,
  Database,
  Headphones,
  PawPrint,
  ShieldCheck,
  CircleHelp,
  MapPin,
  Lock,
  Leaf,
  Check,
  SmartphoneNfc,
  RadioTower,
  BarChart3,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  X,
} from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import "../globals.css";
import "./Footer.css";

// TODO: replace with the real store listing URLs once the apps are published.
const APP_LINKS = {
  googlePlay: "#",
  appStore: "#",
};

const NAV_COLUMNS = [
  {
    title: "Plans & Pricing",
    icon: BarChart3,
    links: [
      ["All Wireless Plans", "/wireless-plans"],
      ["Compare Plans", "/all-plans"],
      ["ZoikoLite", "/plans/zoiko-lite"],
      ["ZoikoCore", "/plans/zoiko-core"],
      ["ZoikoMax", "/plans/zoiko-max"],
      ["Family & Multi-Line", "/family-plans"],
      ["Prepaid Plans", "/prepaid-plans"],
      ["Current Offers & Deals", "/offer-page"],
    ],
  },
  {
    title: "Phones & Devices",
    icon: Smartphone,
    links: [
      ["Shop Smartphones", "/shop-phones"],
      ["Refurbished Phones", "/product-category/refurbished"],
      ["Accessories & Add-Ons", "/accessories"],
      ["Bring Your Own Phone (BYOP)", "/byod-plans"],
      ["Device Protection", "/device-protection"],
      ["Tablets & Hotspots", "/accessories"],
      ["Check Compatibility", "/check-compatibility"],
    ],
  },
  {
    title: "Activation & Account",
    icon: UserRound,
    links: [
      ["Activate SIM / eSIM", "/activate"],
      ["Switch & Save", "/switch"],
      ["Transfer Your Number", "/switch"],
      ["Top Up / Add Data", "/top-up-plan"],
      ["Manage My Account", "/dashboard"],
      ["Track Activation", "/activate"],
      ["Keep Your Number", "/switch"],
    ],
  },
  {
    title: "Business & International",
    icon: BriefcaseBusiness,
    links: [
      ["Business Plans", "/business-plans"],
      ["Multi-Line for Business", "/business-deals"],
      ["International Calling", "/international-callings"],
      ["Travel & Roaming", "/travel-plans"],
      ["Check a Destination", "/check-a-destination"],
      ["International Usage Tips", "/international-usage-tips"],
      ["Canada & Mexico Roaming", "/canada-mexico-roaming-plans"],
      ["Partner With Us", "/become-partner"],
    ],
  },
];

const SUB_SECTIONS = [
  {
    title: "Animal & Music Community",
    icon: PawPrint,
    iconFill: true,
    columns: [
      [
        ["Animal Charities", "/animal-charities"],
        ["Zoiko Music Hub", "/music-hub"],
        ["Music Events & Perks", "/music-events-perk"],
      ],
      [
        ["Artists & Creators", "/music-hub"],
        ["Events & Experiences", "/events-and-experiences"],
        ["Get Involved", "/get-involved"],
      ],
    ],
  },
  {
    title: "About Zoiko",
    icon: ShieldCheck,
    columns: [
      [
        ["Our Story", "/about"],
        ["Press & Media", "/news"],
        ["Sustainability", "/sustainability"],
      ],
      [
        ["Blog", "/blog"],
        ["Careers", "/careers"],
        ["Become an Affiliate", "/become-affiliate"],
        ["Contact Us", "/contact-us"],
      ],
    ],
  },
  {
    title: "Help, Legal & Privacy",
    icon: CircleHelp,
    columns: [
      [
        ["Help & Support", "/support"],
        ["FAQs", "/faq"],
        ["Coverage Map", "https://mvnoc.ai/coverage-map", true],
        ["Network & Service Info", "/network-service"],
      ],
      [
        ["911 / E911 Disclosure", "/911-e911-disclosure"],
        ["Privacy Choices", "/do-not-sell-my-personal-information"],
        ["Terms of Service", "/terms-and-conditions"],
        ["Accessibility", "/terms-and-conditions"],
        ["Broadband Consumer Labels", "/consumer-information"],
      ],
    ],
  },
];

const QUICK_ACTIONS = [
  { label: "Check Coverage", href: "https://mvnoc.ai/coverage-map", icon: RadioTower, external: true },
  { label: "Activate SIM / eSIM", href: "/activate", icon: SmartphoneNfc },
  { label: "Transfer Your Number", href: "/switch", icon: ArrowRightLeft },
  { label: "Top Up Account", href: "/top-up-plan", icon: Database },
  { label: "Get Support", href: "/support", icon: Headphones },
];

const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/@ZoikoMobileUSA", icon: Youtube, cls: "yt" },
  { label: "Instagram", href: "https://instagram.com/zoikomobileus", icon: Instagram, cls: "ig" },
  { label: "Facebook", href: "https://www.facebook.com/zoikomobile", icon: Facebook, cls: "fb" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zoikomobileusa/", icon: Linkedin, cls: "li" },
  { label: "X (Twitter)", href: "https://x.com/zoikomobileusa", icon: X, cls: "x" },
];

const LEGAL_LINKS = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms of Service", "/terms-and-conditions"],
  ["Acceptable Use", "/terms-and-conditions"],
  ["Accessibility", "/terms-and-conditions"],
  ["Network & Service Info", "/network-service"],
  ["Cookies", "/cookie-policy"],
  ["Site Map", "/sitemap.xml"],
];

const FooterLink = ({ label, href, external }) => (
  <li>
    <Link href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span>{label}</span>
      <ChevronRight size={13} strokeWidth={2.75} className="zf-chev" />
    </Link>
  </li>
);

const Footer = () => {
  const curyear = new Date().getFullYear();

  return (
    <>
      <WhatsAppFloating />

      <footer className="zf">
        {/* ============ 1. APP BANNER ============ */}
        <div className="zf-banner-wrap">
          <div className="zf-banner">
            <div className="zf-banner-intro">
              <Smartphone size={44} strokeWidth={1.75} className="zf-banner-icon" />
              <h2>
                Manage Your Mobile Life
                <br />
                in the Zoiko App
              </h2>
            </div>
            <ul className="zf-banner-points">
              {["Check usage", "Top up anytime", "Manage your account"].map((p) => (
                <li key={p}>
                  <span className="zf-check">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============ 2. DARK BODY ============ */}
        <div className="zf-body">
          <svg
            className="zf-wave"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="zfWaveFill" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#b5156b" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#e0115f" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#f7782a" />
              </linearGradient>
              <linearGradient id="zfWaveLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#f7782a" stopOpacity="0" />
                <stop offset="60%" stopColor="#f7782a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff9a4a" />
              </linearGradient>
            </defs>
            <path d="M300 400 C700 300 1100 220 1440 80 L1440 400 Z" fill="url(#zfWaveFill)" />
            <path
              d="M800 400 C1000 320 1250 200 1440 40"
              stroke="url(#zfWaveLine)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M200 330 C600 300 1000 160 1440 0"
              stroke="url(#zfWaveLine)"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
          </svg>

          <div className="zf-container">
            {/* Brand + main columns */}
            <div className="zf-main">
              <div className="zf-brand">
                <Link href="/" aria-label="Zoiko Mobile home" className="zf-brand-logo-link">
                  <Image
                    src="/img/zoiko-footer-logo.webp"
                    alt="Zoiko Mobile Logo"
                    width={246}
                    height={86}
                    className="zf-brand-logo"
                  />
                </Link>
                <div className="zf-brand-tagline">
                  The Animal &amp; Music
                  <br />
                  Loving Network.™
                </div>
                <svg
                  className="zf-brand-underline"
                  viewBox="0 0 270 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="zfUnderline" x1="0" x2="1">
                      <stop offset="0%" stopColor="#e0115f" />
                      <stop offset="100%" stopColor="#f7782a" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M2 7 C80 3 180 1.5 268 1.5"
                    stroke="url(#zfUnderline)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <p className="zf-brand-desc">
                  Affordable, flexible wireless for people who love their pets, their music and
                  the freedom to stay connected across the USA.
                </p>
              </div>

              {NAV_COLUMNS.map(({ title, icon: Icon, links }) => (
                <div className="zf-col" key={title}>
                  <Icon size={32} strokeWidth={1.75} className="zf-col-icon" aria-hidden="true" />
                  <h4 className="zf-col-title">{title}</h4>
                  <ul className="zf-list">
                    {links.map(([label, href, external]) => (
                      <FooterLink key={label} label={label} href={href} external={external} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Secondary sections */}
            <div className="zf-sub">
              {SUB_SECTIONS.map(({ title, icon: Icon, iconFill, columns }) => (
                <div className="zf-sub-section" key={title}>
                  <h4 className="zf-sub-title">
                    <Icon
                      size={36}
                      strokeWidth={1.75}
                      className="zf-sub-icon"
                      aria-hidden="true"
                      {...(iconFill ? { fill: "currentColor" } : {})}
                    />
                    {title}
                  </h4>
                  <div className="zf-sub-cols">
                    {columns.map((links, i) => (
                      <ul className="zf-list" key={i}>
                        {links.map(([label, href, external]) => (
                          <FooterLink key={label} label={label} href={href} external={external} />
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <nav className="zf-quick" aria-label="Quick actions">
              <span className="zf-quick-label">Quick Actions</span>
              {QUICK_ACTIONS.map(({ label, href, icon: Icon, external }) => (
                <Link
                  key={label}
                  href={href}
                  className="zf-quick-item"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon size={26} strokeWidth={1.75} className="zf-quick-icon" />
                  <span>{label}</span>
                  <ChevronRight size={15} strokeWidth={2.75} className="zf-quick-chev" />
                </Link>
              ))}
            </nav>

            {/* Trust + app + follow */}
            <div className="zf-trust-row">
              <div className="zf-trust">
                <h4 className="zf-trust-title">Security &amp; Trust</h4>
                <ul className="zf-trust-list">
                  <li>
                    <span className="zf-fc" aria-hidden="true">FC</span>
                    <span>
                      FCC
                      <br />
                      Compliant
                    </span>
                  </li>
                  <li>
                    <span className="zf-pci" aria-hidden="true">PCI</span>
                    <span>
                      PCI DSS
                      <br />
                      Supported
                    </span>
                  </li>
                  <li>
                    <Lock size={30} strokeWidth={1.75} aria-hidden="true" />
                    <span>
                      Secure &amp;
                      <br />
                      Private
                    </span>
                  </li>
                  <li>
                    <ShieldCheck size={30} strokeWidth={1.75} aria-hidden="true" />
                    <span>
                      Reliable
                      <br />
                      Network
                    </span>
                  </li>
                  <li>
                    <Leaf size={30} strokeWidth={1.75} aria-hidden="true" />
                    <span>
                      Sustainable
                      <br />
                      Operations
                    </span>
                  </li>
                </ul>
              </div>

              <div className="zf-side">
                <div className="zf-app">
                  <h4 className="zf-side-title">Get the Zoiko App</h4>
                  <div className="zf-app-btns">
                    <a href={APP_LINKS.appStore} className="zf-store-btn">
                      <FaApple size={24} />
                      <span>
                        <small>Download on the</small>
                        <strong>App Store</strong>
                      </span>
                    </a>
                    <a href={APP_LINKS.googlePlay} className="zf-store-btn">
                      <FaGooglePlay size={22} className="zf-gp-icon" />
                      <span>
                        <small>GET IT ON</small>
                        <strong>Google Play</strong>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="zf-follow">
                  <h4 className="zf-side-title">Follow Zoiko</h4>
                  <div className="zf-socials">
                    {SOCIALS.map(({ label, href, icon: Icon, cls }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`zf-social zf-social-${cls}`}
                        aria-label={label}
                      >
                        <Icon size={22} strokeWidth={2} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* HQ + legal */}
            <div className="zf-bottom">
              <div className="zf-hq">
                <MapPin size={28} strokeWidth={1.75} className="zf-hq-icon" aria-hidden="true" />
                <div>
                  <h5>Headquarters – USA</h5>
                  <p>
                    1401 21st Street, Suite R,
                    <br />
                    Sacramento, CA 95811, USA
                  </p>
                </div>
              </div>
              <nav className="zf-legal" aria-label="Legal">
                {LEGAL_LINKS.map(([label, href]) => (
                  <Link key={label} href={href}>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="zf-copyright">
              © {curyear} Zoiko Mobile | A trading name of Zoiko Mobile Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
