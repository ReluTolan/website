import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import CookieConsent from "./components/Cookies"
import "./globals.css"
import Navbar from "./components/Navbar"
import { Alex_Brush, Roboto } from "next/font/google"

const alex_brush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
})

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ArtStep",
  description:
    "Expoziție online pictură / artă plastică; Promovare gratuită; Contact și negociere directă cu artistul; Vinde sau cumpără obiecte de artă, artizanat, anticariat, decor, mobilă veche, etc.; Articole / tutoriale, generate de AI cu tematică artistică.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${alex_brush.variable} ${roboto.variable} `}
      >
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Navbar />
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}
