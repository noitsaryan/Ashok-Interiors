import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import "@/Styles/globals.css";
import { Source_Serif_4 } from "next/font/google";
import { RiWhatsappLine } from "react-icons/ri";
const serif = Source_Serif_4({ subsets: ["latin"] });
import { AppProvider } from "@/context/adminStore";
import Link from "next/link";

export const metadata = {
  title: "Ashok Interiors",
  description:
    "Ashok interiors create thoughtful, beautiful interiors that meet our client’s aesthetical, functional and economical goals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={`${serif.className} pt-20`}>
          <Header />
          {children}
          <Footer />
          <i className="text-white rounded-full shadow-md p-1 bg-green-400 fixed bottom-14 right-3 md:right-8 md:bottom-8 text-4xl z-20">
            <Link
              href="https://wa.link/i10apq"
            >
              <RiWhatsappLine />
            </Link>
          </i>
        </body>
      </AppProvider>
    </html>
  );
}
