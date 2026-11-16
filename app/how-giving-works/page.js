import Header from "../components/Header";
import Footer from "../components/Footer";
import HowGivingWorksClient from "./HowGivingWorksClient";

export const metadata = {
  metadataBase: new URL("https://zoikomobile.com"),
  title: "How Giving Works | Animal Welfare Commitment | Zoiko Mobile",
  description:
    "Learn how Zoiko Mobile supports animal welfare through verified company contributions, clear selection standards, and evidence-led reporting.",
  alternates: {
    canonical: "https://zoikomobile.com/how-giving-works",
  },
  openGraph: {
    title: "How Giving Works | Animal Welfare Commitment | Zoiko Mobile",
    description:
      "Learn how Zoiko Mobile supports animal welfare through verified company contributions, clear selection standards, and evidence-led reporting.",
    url: "https://zoikomobile.com/how-giving-works",
    images: ["/img/how-giving-works/hero-dog-child.png"],
  },
};

export default function HowGivingWorksPage() {
  return (
    <>
      <Header />
      <main>
        <HowGivingWorksClient />
      </main>
      <Footer />
    </>
  );
}
