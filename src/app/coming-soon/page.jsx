import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import RevealAnimation from "@/components/ui/revealAnimation";
import React from "react";

const page = () => {
  return (
    <div className="  bg-[url('/assets/contactImage.webp')] bg-cover bg-bottom bg-no-repeat">
      <div className="flex justify-center  items-center h-screen">
        <RevealAnimation type="slide" direction="up" delay={0.5}>
          <div className="bg-white/70 backdrop-blur-[30px] px-5 py-11 rounded-32  max-w-5xl ">
            <p className="w-fit rounded-32 mb-5 px-3 border border-black text-black text-lg font-normal">
              Coming Soon
            </p>
            <p className="text-black/80 text-6xl font-normal mb-5">
              Stay Tuned...
            </p>
            <p className="text-black/80 text-2xl font-light">
              We're working hard behind the scenes to bring you an exciting new
              experience. Stay tuned — you won't want to miss it!
            </p>
            <div className="flex mt-8 flex-col md:flex-row  gap-4">
              <input
                type="text"
                name=""
                id=""
                placeholder="user@example.com"
                className="w-full text-lg px-8 py-2 border border-black rounded-32"
              />
              <Button className="">Notify Me</Button>
            </div>
          </div>{" "}
        </RevealAnimation>
      </div>
      <Footer isBlackTheme={true} />
    </div>
  );
};

export default page;
