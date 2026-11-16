import Header from "../components/Header";
import Footer from "../components/Footer";
import ArtistsCreatorsClient from "./ArtistsCreatorsClient";

export const metadata = {
  title: "Artists & Creators – The Animal & Music Loving Network | Zoiko Mobile",
  description:
    "Meet the artists and creators shaping our community. Explore published profiles, creative journeys and links shared with permission.",
  alternates: {
    canonical: "https://zoikomobile.com/artists-creators",
  },
  openGraph: {
    title: "Artists & Creators – The Animal & Music Loving Network | Zoiko Mobile",
    description:
      "Meet the artists and creators shaping our community. Explore published profiles, creative journeys and links shared with permission.",
    url: "https://zoikomobile.com/artists-creators",
    images: ["/img/Artists-Creators/ac1.png"],
  },
};

export default function ArtistsCreatorsPage() {
  return (
    <>
      <Header />
      <main>
        <ArtistsCreatorsClient />
      </main>
      <Footer />
    </>
  );
}
