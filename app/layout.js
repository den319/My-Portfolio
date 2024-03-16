import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/homePage/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dharmik Vora | Portfolio",
  description: "3D-Portfolio",
  icons: {
    icon: "/3D_assets/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} body`}>
        <main className= "main">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
