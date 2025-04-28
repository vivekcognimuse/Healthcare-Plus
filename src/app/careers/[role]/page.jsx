import CareerForm from "@/components/careers/CareerForm";
import Image from "next/image";
import roleHero from "@/../public/assets/roleHero.png";
import RoleDetails from "@/components/careers/RoleDetails";
const Page = ({ params }) => {
  const { role } = params;

  return (
    <div className="mt-4 md:pt-10  flex relative flex-col ">
      <div className=" absolute top-10 md:top-0 w-full flex justify-center">
        <Image
          src={roleHero}
          alt="hero image"
          className=" -z-0 md:h-[80vh] w-full h-fit md:w-fit"
        />
      </div>

      <RoleDetails role={role} />
    </div>
  );
};

export default Page;
