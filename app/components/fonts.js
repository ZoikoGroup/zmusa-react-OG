import { Montserrat } from "next/font/google";

// Heading font for the redesigned pages. Apply `headingFont.variable` to a
// wrapper and use `var(--font-heading)` in CSS.
export const headingFont = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});
