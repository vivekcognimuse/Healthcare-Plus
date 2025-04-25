import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import ProblemStatement from "@/components/home/ProblemStatement";
import Services from "@/components/home/Services";
export default function Home() {
  return (
    <div className="max-w-[1480px] px-8 md:px-0 mx-auto pt-28 ">
      <Hero />
      <About />
      <ProblemStatement />
      <Services />
      {/* <Contact /> */}
    </div>
  );
}
