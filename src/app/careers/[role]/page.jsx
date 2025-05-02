import CareerForm from "@/components/careers/CareerForm";
import Image from "next/image";
import roleHero from "@/../public/assets/roleHero.png";
import RoleDetails from "@/components/careers/RoleDetails";
import RevealAnimation from "@/components/ui/revealAnimation";
import Footer from "@/components/Footer";
const Page = ({ params }) => {
  const { role } = params;

  return (
    <>
      <div className="mt-4 md:pt-10  flex relative flex-col ">
        <div className=" absolute top-10 md:top-0 w-full flex justify-center">
          <Image
            src={roleHero}
            alt="hero image"
            className=" -z-0 md:h-[80vh] w-full h-fit md:w-fit"
          />
        </div>
        <RevealAnimation type="slide" direction="up" delay={0.5}>
          <RoleDetails role={role} />
        </RevealAnimation>
      </div>
      <Footer />
    </>
  );
};

export default Page;
