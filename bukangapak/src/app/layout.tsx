import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";


const poopins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "BukaNgapak",
  description: "Ecommerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poopins.className}
      text-slate-700`}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow bg-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
