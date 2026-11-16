import Header from "../components/Header";
import Footer from "../components/Footer";
import PrepaidPlansClient from "./PrepaidPlansClient";

export const metadata = {
  title: "Prepaid Phone Plans | Wireless That Moves You | Zoiko Mobile",
  description:
    "Explore flexible, transparent prepaid phone plans with no annual contracts from Zoiko Mobile. High-speed 5G data, mobile hotspot, and international calling.",
  alternates: {
    canonical: "https://zoikomobile.com/prepaid-plans",
  },
  openGraph: {
    title: "Prepaid Phone Plans | Wireless That Moves You | Zoiko Mobile",
    description:
      "Explore flexible, transparent prepaid phone plans with no annual contracts from Zoiko Mobile. High-speed 5G data, mobile hotspot, and international calling.",
    url: "https://zoikomobile.com/prepaid-plans",
    images: ["/img/Prepaid-Plans/pp1.png"],
  },
};

export default function PrepaidPlansPage() {
  return (
    <>
      <Header />
      <main>
        <PrepaidPlansClient />
      </main>
      <Footer />
    </>
  );
}
