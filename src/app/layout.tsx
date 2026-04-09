import type { Metadata } from "next";
import Link from "next/link";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Vefforritun 2 - Verkefni 5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is">
      <body>
        <div className="container">
          <header className="header">
            <nav>
              <Link href="/">Forsíða</Link>
              <Link href="/frettir">Fréttir</Link>
            </nav>
          </header>

          <main>{children}</main>

          <footer className="footer">
            <p>Vefforritun 2 - Verkefni 5</p>
          </footer>
        </div>
      </body>
    </html>
  );
}