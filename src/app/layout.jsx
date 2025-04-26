
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "APIs Connection",
  description: "Connection to APIs",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
          </main>
      </body>
    </html>
  )
}
