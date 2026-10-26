import Homepage from "./home/page";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Homepage />
    </main>
  );
}
