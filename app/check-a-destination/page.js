import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckADestinationClient from "./CheckADestinationClient";

export const metadata = {
  title: "Check a Destination – International Calling & Roaming Rates | Zoiko Mobile",
  description:
    "See what applies when you call another country from the U.S. or use your Zoiko Mobile line abroad. Only approved rates are shown.",
  alternates: {
    canonical: "https://zoikomobile.com/check-a-destination",
  },
  openGraph: {
    title: "Check a Destination – International Calling & Roaming Rates | Zoiko Mobile",
    description:
      "See what applies when you call another country from the U.S. or use your Zoiko Mobile line abroad. Only approved rates are shown.",
    url: "https://zoikomobile.com/check-a-destination",
    images: ["/img/check-a-destination/cad-hero-main.webp"],
  },
};

export default function CheckADestinationPage() {
  return (
    <>
      <Header />
      <main>
        <CheckADestinationClient />
      </main>
      <Footer />
    </>
  );
}
