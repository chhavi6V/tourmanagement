import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tour Management",
  description: "Made by Chhavi Gupta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header style = {{backgroundColor : "lightblue", padding : '1rem'}}><p>Tour Management</p></header>
          {children}  
      </body>
    </html>
  );
}
