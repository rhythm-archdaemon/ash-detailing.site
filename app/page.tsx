import Homepage from "./home/page";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Homepage />
      <Footer />
    </main>
  );
}
