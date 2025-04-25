// constants/jobData.js
export const jobData = [
  {
    id: 1,
    title: "Member of Design Team - Engineer",
    location: "SF",
    department: "Design",
    type: "Flexible",
    formLink: "https://forms.google.com/example-design-engineer",
  },
  {
    id: 2,
    title: "Engineering Manager",
    location: "SF",
    department: "Engineering",
    type: "Flexible",
    formLink: "https://forms.google.com/example-engineering-manager",
  },
  {
    id: 3,
    title: "Strategic Finance",
    location: "SF",
    department: "Finance",
    type: "Flexible",
    formLink: "https://forms.google.com/example-strategic-finance",
  },
  {
    id: 4,
    title: "Clinician Scientist",
    location: "SF",
    department: "Product",
    type: "Flexible",
    formLink: "https://forms.google.com/example-clinician-scientist",
  },
];

// Helper function to get departments and their open position counts
export const getDepartmentsWithCounts = () => {
  const departments = {};

  // Count positions by department
  jobData.forEach((job) => {
    if (!departments[job.department]) {
      departments[job.department] = 0;
    }
    departments[job.department]++;
  });

  // Format departments for filtering
  const formattedDepartments = Object.keys(departments).map((name) => ({
    id: name.toLowerCase(),
    name,
    openPositions: departments[name],
  }));

  // Add "All" option
  formattedDepartments.unshift({
    id: "all",
    name: "All",
    openPositions: jobData.length,
  });

  return formattedDepartments;
};
