import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import RevealAnimation from "@/components/ui/revealAnimation";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="  bg-[url('/assets/contactImage.webp')] bg-cover bg-bottom bg-no-repeat">
      <div className="flex justify-center  items-center h-screen">
        <RevealAnimation type="slide" direction="up" delay={0.5}>
          <div className="bg-white/70 backdrop-blur-[30px] px-5 py-11 rounded-32  max-w-5xl ">
            <p className="w-fit rounded-32 mb-5 px-4 border border-black text-black text-lg font-normal">
              404
            </p>
            <p className="text-black/80 text-6xl font-normal mb-5">Oooooops!</p>
            <p className="text-black/80 text-2xl font-light">
              We looked high and low, but couldn&apos;t find what you were
              searching for. Let&apos;s get you back home where everything makes
              sense.
            </p>
            <div className="flex justify-end mt-8 gap-x-4">
              <Link href="/">
                <Button className="">Back to Home</Button>
              </Link>
            </div>
          </div>{" "}
        </RevealAnimation>
      </div>
      <Footer isBlackTheme={true} />
    </div>
  );
};

export default page;
