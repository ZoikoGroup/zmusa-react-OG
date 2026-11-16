import Header from "./components/Header";
import HomeLanding from "./components/HomeLanding";
import Footer from "./components/Footer";
import BlackFridayPopup from "./components/BlackFridayPopup";
import { headingFont } from "./components/fonts";

// SEO Metadata
export const metadata = {
  title: "Zoiko Mobile | Best Mobile Plans with Unlimited Data",
  description:
    "Stay connected with Zoiko Mobile for the best mobile plans with unlimited data. Get the coverage & affordability you deserve with our top mobile plan options.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className={headingFont.variable}>
        <HomeLanding />
      </main>
      <Footer />
      <BlackFridayPopup />
    </>
  );
}
