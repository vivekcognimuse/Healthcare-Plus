"use client";

const RoleDetails = ({ role }) => {
  return (
    <div className="w-full h-screen mt-64 md:mt-96 max-w-[1420px]  mx-auto p-4 sm:px-6 md:p-10 gradient  backdrop-blur-[30px] shadow-elevated rounded-3xl">
      {/* Header */}
      <div className="bg-black text-white text-xs font-medium px-4 py-2 rounded-full inline-block mb-4">
        {role}
      </div>
    </div>
  );
};

export default RoleDetails;
