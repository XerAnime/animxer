import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata = {
  title: "AnimeSensei",
  description: "All Your Favorite Anime In One Site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} relative`}>
        <NavBar />
        {children}
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
