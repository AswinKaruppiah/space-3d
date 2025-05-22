import { Inter } from "next/font/google";
import Hero from "@/section/hero/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative h-full w-full">
      <Hero />
      <div className="h-[1000vh]">

      </div>
    </div>
  );
}
