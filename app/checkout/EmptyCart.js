"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Layers,
  Smartphone,
  ArrowLeftRight,
  Plane,
  Signal,
  Tag,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import styles from "./EmptyCart.module.css";

const shopCards = [
  { title: "Shop Plans", text: "Prepaid, Postpaid & Business", href: "/all-plans", icon: Layers, tone: "pink" },
  { title: "Shop Phones", text: "Latest devices & deals", href: "/shop-phones", icon: Smartphone, tone: "purple" },
  { title: "Bring Your Phone", text: "Keep your number & save", href: "/byod-plans", icon: ArrowLeftRight, tone: "green" },
  { title: "Travel Plans", text: "Stay connected worldwide", href: "/travel-plans", icon: Plane, tone: "blue" },
];

const reasons = [
  { label: "Nationwide 5G Coverage", icon: Signal },
  { label: "Flexible & Affordable Plans", icon: Tag },
  { label: "U.S.-Based Support", icon: Headphones },
  { label: "No Hidden Fees", icon: ShieldCheck },
];

function CartIllustration() {
  return (
    <img
      className={styles.cartArt}
      src="/img/checkout/empty-cart.png"
      alt=""
      aria-hidden="true"
      width={300}
      height={196}
    />
  );
}

export default function EmptyCart() {
  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <div className={styles.emptyHero}>
          <CartIllustration />
          <h1 className={styles.title}>
            Your cart is <span className={styles.titleAccent}>empty</span>
          </h1>
          <p className={styles.subtitle}>
            Looks like you haven&rsquo;t added anything to your cart yet.
            <br />
            Explore our plans, phones and great deals to get started.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {shopCards.map(({ title, text, href, icon: Icon, tone }) => (
            <Link key={title} href={href} className={styles.shopCard}>
              <span className={`${styles.shopIcon} ${styles[tone]}`}>
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <span className={styles.shopText}>
                <span className={styles.shopTitle}>{title}</span>
                <span className={styles.shopDesc}>{text}</span>
              </span>
              <ChevronRight className={styles.shopArrow} size={20} />
            </Link>
          ))}
        </div>

        <div className={styles.whyHead}>
          <span className={styles.whyLineLeft} />
          <h2 className={styles.whyTitle}>Why choose Zoiko Mobile?</h2>
          <span className={styles.whyLineRight} />
        </div>

        <div className={styles.whyGrid}>
          {reasons.map(({ label, icon: Icon }) => (
            <div key={label} className={styles.whyItem}>
              <Icon className={styles.whyIcon} size={40} strokeWidth={1.8} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <svg className={styles.wave} viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="zkCartWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3B1C7A" />
            <stop offset="0.55" stopColor="#7B1E7A" />
            <stop offset="1" stopColor="#D4145A" />
          </linearGradient>
        </defs>
        <path d="M0 40 Q720 -20 1440 25 V110 H0 Z" fill="url(#zkCartWave)" />
      </svg>
    </div>
  );
}
