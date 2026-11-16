import Header from "../components/Header";
import Footer from "../components/Footer";
import { headingFont } from "../components/fonts";
import PostpaidPlansClient from "./PostpaidPlansClient";

export const metadata = {
  title: "Best Postpaid Phone Plans | Reliable Mobile Coverage",
  description:
    "Choose Zoiko Mobile for the best postpaid plans. Enjoy affordable, flexible options with nationwide coverage to fit your mobile communication needs.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className={headingFont.variable}>
        <PostpaidPlansClient />
      </main>
      <Footer />
    </>
  );
}
