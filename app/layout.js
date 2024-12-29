import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Providers from "./Providers";
import TopBar from "@/components/topbar/Topbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Adbiyas Tour",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <Providers>{children}</Providers>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
