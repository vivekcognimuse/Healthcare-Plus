"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jobData, getDepartmentsWithCounts } from "@/constants/jobData";
import { Filter, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Animation variants defined outside component to prevent recreation on each render
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const CareerForm = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [filteredJobs, setFilteredJobs] = useState(jobData);
  const [departments, setDepartments] = useState([]);
  const [openPositions, setOpenPositions] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const router = useRouter();

  // Load departments only once on mount
  useEffect(() => {
    const deptData = getDepartmentsWithCounts();
    setDepartments(deptData);
    setOpenPositions(deptData.find((d) => d.id === "all")?.openPositions || 0);
  }, []);

  // Memoized filter function to prevent unnecessary re-filtering
  const filterJobs = useCallback((departmentId) => {
    if (departmentId === "all") {
      return jobData;
    }
    return jobData.filter(
      (job) => job.department.toLowerCase() === departmentId.toLowerCase()
    );
  }, []);

  // Update filtered jobs when department changes
  useEffect(() => {
    const filtered = filterJobs(selectedDepartment);
    setFilteredJobs(filtered);
    setOpenPositions(filtered.length);
  }, [selectedDepartment, filterJobs]);

  // Memoize the currently selected department name
  const selectedDepartmentName = useMemo(() => {
    return (
      departments.find((d) => d.id === selectedDepartment)?.name || "All Roles"
    );
  }, [departments, selectedDepartment]);

  // Handler for department selection with modal close
  const handleDepartmentSelect = useCallback((deptId) => {
    setSelectedDepartment(deptId);
    setShowFilterModal(false);
  }, []);

  // Toggle filter modal
  const toggleFilterModal = useCallback(() => {
    setShowFilterModal((prev) => !prev);
  }, []);
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full mt-28 md:mt-96 max-w-[1480px]  mx-auto p-4 sm:px-6 md:p-10 gradient  backdrop-blur-[30px] shadow-elevated rounded-3xl">
      {/* Header */}
      <div className="bg-black text-white text-xs font-medium px-4 py-2 rounded-full inline-block mb-4">
        Discover Where You Belong
      </div>

      <p className="text-3xl mb-8 leading-normal text-black-800 sm:text-4xl md:text-6xl">
        Your Next Chapter- <br />
        <span className="text-black"> Starts Here </span>
      </p>

      {/* Desktop Filter Tabs */}
      <div className="hidden md:flex justify-between items-center gap-8 mb-8">
        <div className="flex gap-8 flex-wrap">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-6 py-2 cursor-pointer  rounded-full shadow-elevated text-xl font-light transition-all duration-300 ${
                selectedDepartment === dept.id
                  ? "bg-black text-white"
                  : "bg-white hover:bg-black/30 text-black"
              }`}>
              {dept.name}
            </button>
          ))}
        </div>
        <span className="text-gray-700 font-light text-xl">
          {openPositions} Open Positions
        </span>
      </div>

      {/* Mobile/Tablet Filter Trigger */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <div
          onClick={toggleFilterModal}
          className="flex items-center justify-between px-4 py-2 rounded-full text-black text-lg w-full cursor-pointer">
          <span className="font-light text-xl py-1 px-4">
            {selectedDepartmentName}
          </span>
          <Filter className="w-5 h-5" />
        </div>
      </div>

      {/* Filter Modal for Mobile */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button className="text-black" onClick={toggleFilterModal}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Filter Options */}
            <div className="p-6 pt-0 space-y-2">
              <h3 className="text-xl font-semibold mb-4">Select Department</h3>
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => handleDepartmentSelect(dept.id)}
                  className={`w-full cursor-pointer px-4 py-3 rounded-lg text-left text-lg ${
                    selectedDepartment === dept.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black"
                  }`}>
                  {dept.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Job List */}
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
                onClick={() => router.push(`/careers/${slugify(job.title)}`)}
                className="border-b hover:bg-black border-black-900  cursor-pointer">
                <div className="text-black/80 hover:text-white text-xl font-normal py-8 px-4">
                  {/* Desktop full row */}
                  <div className="hidden md:grid grid-cols-6 items-center">
                    <div className="md:col-span-2">{job.title}</div>
                    <div>{job.type}</div>
                    <div>{job.location}</div>
                    <div>{job.department}</div>
                    <div className="flex justify-end">
                      <div className="">View Role</div>
                    </div>
                  </div>

                  {/* Mobile simplified row */}
                  <div className="md:hidden">{job.title}</div>
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
