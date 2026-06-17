import { Hanken_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import BottomNavbar from "@/components/layout/BottomNavbar";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken-grotesk",
});

export const metadata = {
  title: "DataCentral — Enterprise Analytics",
  description: "Monitor your enterprise data infrastructure",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className={`min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden ${hankenGrotesk.className}`}>
        <Navbar />
        <main className="flex-1 w-full px-4 md:px-10 py-3 pb-24 md:pb-3">
          {children}
        </main>
        <BottomNavbar />
      </body>
    </html>
  );
}
