import Header from "../components/Header";
import Footer from "../components/Footer";
import EventsAndExperiencesClient from "./EventsAndExperiencesClient";

export const metadata = {
  title: "Events & Experiences | Music, Animals & Community | Zoiko Mobile",
  description:
    "Find community events connected to the music and animal-welfare causes we care about, in person and online. Every listing shows who runs it, when and where.",
  alternates: {
    canonical: "https://zoikomobile.com/events-and-experiences",
  },
  openGraph: {
    title: "Events & Experiences | Zoiko Mobile",
    description:
      "Music, animals and community, in person and online. Discover community events, shelter open days, live music, and online Q&As.",
    url: "https://zoikomobile.com/events-and-experiences",
    images: ["/img/events-and-experiences/hero-drummer-dog.png"],
  },
};

export default function EventsAndExperiencesPage() {
  return (
    <>
      <Header />
      <main>
        <EventsAndExperiencesClient />
      </main>
      <Footer />
    </>
  );
}
