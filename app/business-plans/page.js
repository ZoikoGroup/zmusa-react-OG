import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BusinessPlansClient from "./BusinessPlansClient";

export const metadata = {
  title: "Business Plans - Wireless That Works for Your Business | Zoiko Mobile USA",
  description:
    "Clear per-line pricing, team quotes and honest plan recommendations to keep your team connected and in control.",
};

export default function BusinessPlansPage() {
  return (
    <>
      <Header />
      <main>
        <BusinessPlansClient />
      </main>
      <Footer />
    </>
  );
}
