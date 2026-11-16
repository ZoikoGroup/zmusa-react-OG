import Header from "../components/Header";
import Footer from "../components/Footer";
import StoriesAndImpactClient from "./StoriesAndImpactClient";

export const metadata = {
  title: "Stories & Impact | Animal Welfare & Music Community | Zoiko Mobile",
  description:
    "Real moments from our animal-welfare and music community, told with care. Explore editorial stories, verified case studies, and official impact reports.",
  alternates: {
    canonical: "https://zoikomobile.com/stories-and-impact",
  },
  openGraph: {
    title: "Stories & Impact | Zoiko Mobile",
    description:
      "Real moments from our animal-welfare and music community, told with care. When we report an outcome, you’ll see where it came from and who checked it.",
    url: "https://zoikomobile.com/stories-and-impact",
    images: ["/img/stories-and-impact/story-adoption-weekend.png"],
  },
};

export default function StoriesAndImpactPage() {
  return (
    <>
      <Header />
      <main>
        <StoriesAndImpactClient />
      </main>
      <Footer />
    </>
  );
}
