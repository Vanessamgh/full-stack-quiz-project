import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Link from "next/link";
import NavLinks from "./NavLinks";

export const metadata = {
  title: "VibeCheck — Which Animal Matches Your Vibe?",
  description:
    "A 15-question personality quiz that matches you to your spirit animal, backed by real facts from a live animal data API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="site-nav">
            <Link href="/" className="brand">
              🐾 VibeCheck
            </Link>
            <NavLinks />
          </nav>
        </header>

        <main className="page-wrap">{children}</main>

        <footer className="site-footer">
          <p>
            VibeCheck is built for entertainment and self-reflection — not a
            scientific personality assessment. <Link href="/faq">Read the FAQ</Link>.
          </p>
        </footer>
      </body>
    </html>
  );
}
