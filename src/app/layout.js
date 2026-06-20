import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Surendra Singh | Senior Hotel General Manager & Administrative Executive",
  description: "Official portfolio of Surendra Singh. Over 30 years of hospitality leadership experience, managing operations, front office, staff, and banquets at premier hotels.",
  keywords: ["Surendra Singh", "Hotel General Manager", "Hospitality Executive Satna", "Hotel Administration Satna", "Front Office Specialty", "Hotel Sai Chhaya Inn", "APSV Satna B.Com"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
