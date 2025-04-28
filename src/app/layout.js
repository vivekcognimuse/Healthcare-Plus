import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ContactContext";
import CrumplerHealthForm from "@/components/modal/contact/ContactModal";
import SubmitModal from "@/components/modal/contact/FormSubmitModal";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Tala Health",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased flex flex-col items-center`}>
        <ModalProvider>
          <Navbar />
          <div className="relative w-full">{children}</div>{" "}
          <CrumplerHealthForm />
          <SubmitModal />
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
