import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TravelPlansClient from "./TravelPlansClient";

export const metadata = {
  title: "Travel Plans - Global Mobile Passes & Roaming | Zoiko Mobile USA",
  description:
    "Stay connected wherever you go with Zoiko Mobile Travel Passes. Flexible, clear upfront travel passes with eSIM and SIM support.",
};

export default function TravelPlansPage() {
  return (
    <>
      <Header />
      <main>
        <TravelPlansClient />
      </main>
      <Footer />
    </>
  );
}
