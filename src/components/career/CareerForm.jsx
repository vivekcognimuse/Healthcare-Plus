// components/CareerComponent.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jobData, getDepartmentsWithCounts } from "@/constants/jobData";

const CareerForm = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [filteredJobs, setFilteredJobs] = useState(jobData);
  const [departments, setDepartments] = useState([]);
  const [openPositions, setOpenPositions] = useState(0);

  useEffect(() => {
    // Get departments with their open position counts
    const deptData = getDepartmentsWithCounts();
    setDepartments(deptData);
    setOpenPositions(deptData.find((d) => d.id === "all").openPositions);
  }, []);

  useEffect(() => {
    if (selectedDepartment === "all") {
      setFilteredJobs(jobData);
      setOpenPositions(jobData.length);
    } else {
      const filtered = jobData.filter(
        (job) =>
          job.department.toLowerCase() === selectedDepartment.toLowerCase()
      );
      setFilteredJobs(filtered);
      setOpenPositions(filtered.length);
    }
  }, [selectedDepartment]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="w-full mt-64 max-w-[1480px] mx-auto px-4 sm:px-6  md:p-10 gradient backdrop-blur-[30px] shadow-elevated rounded-3xl">
      {/* Header Section */}
      <div className="bg-black text-white text-xs font-medium px-4 py-2 rounded-full inline-block mb-4">
        Discover Where You Belong
      </div>

      <p className=" text-3xl mb-8 leading-tight text-black-800 sm:text-4xl md:text-6xl">
        Your Next Chapter- <br />
        <span className="text-black"> Starts Here </span>
      </p>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-between items-center gap-8 mb-8">
        <div className="flex gap-8">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-6 py-2 rounded-full shadow-elevated text-xl font-light transition-all duration-300 ${
                selectedDepartment === dept.id
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}>
              {dept.name}
            </button>
          ))}
        </div>

        <span className="text-gray-700 font-light text-xl">
          {openPositions} Open Positions
        </span>
      </div>

      {/* Position Count */}

      <div className="min-h-[400px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-px">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => (
              <motion.div
                layout
                key={job.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="border-b hover:bg-black  border-black-900">
                <div className="grid grid-cols-1 text-black/80 hover:text-white text-xl font-normal  md:grid-cols-6 items-center py-8 px-4">
                  <div className="md:col-span-2 ">{job.title}</div>
                  <div className="">{job.type}</div>
                  <div className="">{job.location}</div>
                  <div className="">{job.department}</div>
                  <div className="mt-3 md:mt-0 flex justify-start md:justify-end">
                    <button
                      href={job.formLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="">
                      View Role
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8 text-center text-gray-500">
              No open positions found in this department.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CareerForm;
