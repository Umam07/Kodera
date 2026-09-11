import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/context/ProgressContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LevelUpToast } from "@/components/layout/LevelUpToast";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  weight: ["800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kodera — Era Baru Belajar Pemrograman Java",
  description:
    "Platform belajar Java interaktif dengan latihan drag & drop alur kode, eksekusi kode otomatis, dan sistem progression XP & Level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${bricolageGrotesque.variable} ${inter.variable} ${robotoMono.variable}`}
    >
      <body className="bg-[#fcfaf5] text-[#1a3300] min-h-screen flex flex-col antialiased selection:bg-[#ffe95c] selection:text-[#1a3300]">
        <ProgressProvider>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
          <LevelUpToast />
        </ProgressProvider>
      </body>
    </html>
  );
}
