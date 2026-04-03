export interface Job {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  salary: string;
  location: string;
  type: "Full-time" | "Contract" | "Part-time" | "Internship";
  category: string;
  requirements: string[];
  description: string;
  imageKey: string;
  postedDays: number;
  urgent?: boolean;
}

export interface JobTemplate {
  title: string;
  salary: string;
  location: string;
  type: "Full-time" | "Contract" | "Part-time" | "Internship";
  category: string;
  requirements: string[];
  description: string;
  imageKey: string;
  postedDays: number;
  urgent?: boolean;
}

const jobTemplates: JobTemplate[] = [
  {
    title: "Driver",
    salary: "KES 45,000 – 65,000", location: "Nairobi", type: "Full-time", category: "Transport",
    requirements: ["Valid Kenyan Driving License", "Clean driving record", "Basic English proficiency"],
    description: "Transport staff, donors, and field supplies safely across Kenya. Maintain vehicle logs and ensure roadworthiness.",
    imageKey: "driver", postedDays: 2, urgent: true,
  },
  {
    title: "Cleaner / Hygiene Assistant",
    salary: "KES 20,000 – 30,000", location: "Nairobi", type: "Full-time", category: "Maintenance",
    requirements: ["Basic literacy", "Good communication skills", "Physical fitness"],
    description: "Ensure premises are clean, hygienic, and conducive for work. Manage cleaning supplies and schedules.",
    imageKey: "office", postedDays: 3,
  },
  {
    title: "Office Assistant",
    salary: "KES 25,000 – 40,000", location: "Nairobi", type: "Full-time", category: "Administration",
    requirements: ["Basic literacy", "Good communication skills", "Filing & organization"],
    description: "Manage office hygiene, document filing, and general administrative support for the health programs team.",
    imageKey: "office", postedDays: 1, urgent: true,
  },
  {
    title: "Accounts Assistant",
    salary: "KES 50,000 – 75,000", location: "Nairobi", type: "Full-time", category: "Finance",
    requirements: ["Basic bookkeeping knowledge", "MS Excel proficiency", "Attention to detail"],
    description: "Handle basic bookkeeping, transaction entries, and expense tracking for program budgets.",
    imageKey: "accounts", postedDays: 5,
  },
  {
    title: "Cashier / Front Office Lead",
    salary: "KES 35,000 – 50,000", location: "Nairobi", type: "Full-time", category: "Finance",
    requirements: ["Basic accounting knowledge", "Professional demeanor", "Customer service skills"],
    description: "Manage petty cash, process payments, and handle visitor inquiries at reception.",
    imageKey: "office", postedDays: 4,
  },
  {
    title: "Enumerator / Data Collector",
    salary: "KES 1,500 – 2,500/day", location: "Turkana / Dadaab", type: "Contract", category: "Research",
    requirements: ["Smartphone proficiency", "Local language fluency", "Field experience preferred"],
    description: "Collect information for research and project monitoring using mobile data collection tools.",
    imageKey: "field", postedDays: 1, urgent: true,
  },
  {
    title: "Field Assistant",
    salary: "KES 35,000 – 55,000", location: "Marsabit", type: "Full-time", category: "Field Operations",
    requirements: ["Community engagement skills", "Local language fluency", "Motorbike license preferred"],
    description: "Support project implementation at the village level by engaging with community members.",
    imageKey: "field", postedDays: 6,
  },
  {
    title: "Data Entry Clerk",
    salary: "KES 30,000 – 45,000", location: "Nairobi", type: "Full-time", category: "IT / Data",
    requirements: ["High school certificate or diploma", "Fast typing speed (40+ WPM)", "Google Sheets / Excel"],
    description: "Input field data, financial information, and project records into digital systems.",
    imageKey: "data", postedDays: 3,
  },
  {
    title: "Receptionist",
    salary: "KES 30,000 – 40,000", location: "Nairobi", type: "Full-time", category: "Administration",
    requirements: ["Professional appearance", "English & Kiswahili fluency", "Basic computer skills"],
    description: "Manage visitor inquiries, incoming calls, and basic office coordination.",
    imageKey: "office", postedDays: 2,
  },
  {
    title: "Storekeeper / Inventory Assistant",
    salary: "KES 40,000 – 55,000", location: "Mombasa", type: "Full-time", category: "Logistics",
    requirements: ["Inventory management experience", "Basic computer skills", "Physical fitness"],
    description: "Manage receiving and issuing of supplies in field and warehouse locations.",
    imageKey: "warehouse", postedDays: 7,
  },
  {
    title: "Community Mobilizer",
    salary: "KES 28,000 – 42,000", location: "Kisumu", type: "Full-time", category: "Community",
    requirements: ["Community engagement experience", "Local language fluency", "Good communication"],
    description: "Bridge between the NGO and local population—organize meetings and encourage project participation.",
    imageKey: "community", postedDays: 4,
  },
  {
    title: "WASH Assistant",
    salary: "KES 35,000 – 50,000", location: "Kakuma", type: "Contract", category: "WASH",
    requirements: ["WASH program knowledge", "Community mobilization skills", "Field experience"],
    description: "Support hygiene projects and maintenance of water infrastructure in refugee camps.",
    imageKey: "community", postedDays: 2, urgent: true,
  },
  {
    title: "Warehouse Assistant",
    salary: "KES 25,000 – 38,000", location: "Nairobi", type: "Full-time", category: "Logistics",
    requirements: ["Basic literacy", "Physical fitness", "Attention to detail"],
    description: "Manage sorting, weighing, and documentation of supplies in regional hubs.",
    imageKey: "warehouse", postedDays: 5,
  },
  {
    title: "Procurement Assistant",
    salary: "KES 45,000 – 65,000", location: "Nairobi", type: "Full-time", category: "Procurement",
    requirements: ["Diploma in Procurement/Supply Chain", "Negotiation skills", "MS Office"],
    description: "Support purchasing of supplies and administrative tasks for field teams.",
    imageKey: "office", postedDays: 3,
  },
  {
    title: "Gardener / Grounds Specialist",
    salary: "KES 18,000 – 28,000", location: "Nairobi", type: "Full-time", category: "Maintenance",
    requirements: ["Landscaping experience", "Physical fitness", "Reliability"],
    description: "Maintain green areas, lawns, and ornamental plantings at facility grounds.",
    imageKey: "field", postedDays: 8,
  },
  {
    title: "Office Caretaker / Steward",
    salary: "KES 22,000 – 32,000", location: "Nairobi", type: "Full-time", category: "Maintenance",
    requirements: ["Basic maintenance skills", "Reliability", "Good hygiene standards"],
    description: "Handle general maintenance, minor repairs, and office cleanliness.",
    imageKey: "office", postedDays: 6,
  },
  {
    title: "Office Cook / Kitchen Assistant",
    salary: "KES 20,000 – 30,000", location: "Nairobi", type: "Full-time", category: "Hospitality",
    requirements: ["Food handling certificate", "Cooking experience", "Hygiene standards knowledge"],
    description: "Prepare daily meals for staff at the headquarters.",
    imageKey: "community", postedDays: 4,
  },
  {
    title: "Waiter / Catering Officer",
    salary: "KES 25,000 – 35,000", location: "Nairobi", type: "Part-time", category: "Hospitality",
    requirements: ["Catering experience", "Professional demeanor", "Food safety knowledge"],
    description: "Serve meals in staff cafeterias and during hosted workshops and conferences.",
    imageKey: "office", postedDays: 3,
  },
  {
    title: "Logistics Assistant",
    salary: "KES 40,000 – 58,000", location: "Nairobi / Field", type: "Full-time", category: "Logistics",
    requirements: ["Logistics experience", "Valid driving license", "Organizational skills"],
    description: "Support the movement of project goods and humanitarian aid across counties.",
    imageKey: "warehouse", postedDays: 2,
  },
  {
    title: "Youth Volunteer / Intern",
    salary: "KES 15,000 – 20,000 (stipend)", location: "Nairobi", type: "Internship", category: "General",
    requirements: ["Recent graduate or student", "Passion for community service", "Communication skills"],
    description: "Support communications, research, or program activities for empowerment projects.",
    imageKey: "community", postedDays: 1, urgent: true,
  },
  {
    title: "Messenger Clerk",
    salary: "KES 18,000 – 25,000", location: "Nairobi", type: "Full-time", category: "Administration",
    requirements: ["Primary education completion", "Knowledge of Nairobi routes", "Reliability"],
    description: "Collect and deliver mail, pouches, and communications to post offices and government agencies.",
    imageKey: "driver", postedDays: 7,
  },
  {
    title: "Dispatch Clerk",
    salary: "KES 22,000 – 35,000", location: "Nairobi", type: "Full-time", category: "Logistics",
    requirements: ["Organizational skills", "Basic computer literacy", "Attention to detail"],
    description: "Manage receiving and outgoing orders, verify accuracy, and coordinate with riders or drivers.",
    imageKey: "warehouse", postedDays: 5,
  },
  {
    title: "Child Minder / Care Worker",
    salary: "KES 22,000 – 35,000", location: "Nairobi", type: "Full-time", category: "Child Welfare",
    requirements: ["Child care experience", "First aid certification", "Patience & empathy"],
    description: "Supervise children in safe houses, ensuring their well-being, hygiene, and nutrition.",
    imageKey: "community", postedDays: 3,
  },
  {
    title: "Housekeeper / Shelter Assistant",
    salary: "KES 20,000 – 28,000", location: "Nairobi", type: "Full-time", category: "Maintenance",
    requirements: ["Housekeeping experience", "Reliability", "Good hygiene standards"],
    description: "Maintain cleanliness of residential areas, including laundry and meal preparation for residents.",
    imageKey: "office", postedDays: 6,
  },
  {
    title: "Plumber",
    salary: "KES 30,000 – 45,000", location: "Nairobi", type: "Full-time", category: "Technical",
    requirements: ["Plumbing certification", "Facility experience preferred", "Problem-solving skills"],
    description: "Maintain and repair water systems in facilities and residential wings.",
    imageKey: "warehouse", postedDays: 4,
  },
  {
    title: "Electrician / Handyman",
    salary: "KES 35,000 – 50,000", location: "Nairobi", type: "Full-time", category: "Technical",
    requirements: ["Electrical certification", "24/7 availability", "Emergency response capability"],
    description: "Handle emergency repairs and preventive maintenance of electrical systems and building fixtures.",
    imageKey: "warehouse", postedDays: 2, urgent: true,
  },
];

const orgNames: Record<string, string> = {
  "un-kenya": "UN Kenya",
  "world-vision": "World Vision",
  "amref": "Amref Health Africa",
  "save-children": "Save the Children",
  "irc": "IRC",
  "mercy-corps": "Mercy Corps",
  "oxfam": "Oxfam International",
  "kenya-red-cross": "Kenya Red Cross",
  "aga-khan": "Aga Khan Hospital",
  "rescue-co": "Rescue.co",
  "refushe": "RefuSHE Kenya",
  "kidscare": "KidsCare Kenya",
};

const orgIds = Object.keys(orgNames);

// Generate all jobs: every org gets every position
export const jobs: Job[] = orgIds.flatMap((orgId, orgIndex) =>
  jobTemplates.map((template, templateIndex) => ({
    ...template,
    id: `${orgId}-${templateIndex + 1}`,
    organizationId: orgId,
    organizationName: orgNames[orgId],
    // Vary posted days slightly per org
    postedDays: ((template.postedDays + orgIndex) % 10) + 1,
  }))
);

export const jobImageMap: Record<string, string> = {
  driver: "job-driver",
  office: "job-office",
  field: "job-field",
  accounts: "job-accounts",
  data: "job-data",
  warehouse: "job-warehouse",
  community: "job-community",
};

export const categories = [
  "All", "Transport", "Administration", "Finance", "Field Operations", "Research",
  "IT / Data", "Logistics", "Community", "WASH", "Maintenance", "Hospitality",
  "Procurement", "Technical", "Child Welfare", "General",
];
