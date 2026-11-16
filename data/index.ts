export const navItems = [
  { name: "About", link: "#about" },
  { name: "Project", link: "#project" },
  { name: "Background", link: "#background" },
  { name: "Contact", link: "#contact" },
];

export const heroData = {
  name: "Jhon Renz Diaz",
  headline: "Building products people can trust.",
  description:
    "Based in the Philippines, I\u2019m a BSIT graduate and early-career developer learning the ropes of web design and development through real-world projects like DermaSure PH.",
  primaryAction: {
    label: "Explore DermaSure PH",
    link: "#project",
  },
  secondaryAction: {
    label: "Get in touch",
    link: "#contact",
  },
};

export const aboutData = {
  narrative:
    "I\u2019m an early-career web developer and a Bachelor of Science in Information Technology graduate from Asian College of Science and Technology. I learn by building, experimenting, and improving practical projects. I built and own DermaSure PH, which I\u2019m actively developing.",
  usedInDermaSure: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "Framer Motion",
  ],
  currentlyLearning: [
    "Full-stack application architecture",
    "AI-assisted development workflows",
    "Modern React & TypeScript patterns",
  ],
};

export const featuredProject = {
  id: 1,
  name: "DermaSure PH",
  status: "Actively developing",
  role: "Independent Builder & Owner",
  tagline:
    "Skincare discovery portal helping Filipinos make informed purchases and avoid counterfeit products.",
  summary:
    "DermaSure PH is an actively developed skincare discovery portal I built. I personally check and manage the products listed against the Philippine FDA database, then link each product to selected legitimate Shopee and Lazada stores. The goal is to help Filipinos make more informed skincare purchases and avoid fake products or stores.",
  dialogDetails: {
    overview:
      "Built and owned independently by Jhon Renz Diaz, DermaSure PH was created to address the pervasive challenge of counterfeit skincare goods in Philippine e-commerce marketplaces. The platform focuses on clarity, factual verification, and safe consumer redirection.",
    highlights: [
      "Personally checked and managed: Every item is manually reviewed and cross-referenced against the Philippine Food and Drug Administration (FDA) database records.",
      "Legitimate store links: Instead of direct sales, verified products route users to selected, legitimate Shopee and Lazada brand storefronts.",
      "Clean web performance: Developed with Next.js, TypeScript, and Tailwind CSS for rapid loading and seamless mobile responsiveness.",
      "State & backend foundation: Utilizes Supabase for database management and listing organization.",
    ],
    clarifications:
      "Note: DermaSure PH is an independent project. It is not affiliated with or endorsed by the Philippine FDA, and product listings reflect manual verification rather than an automated live API synchronization.",
  },
  image: "/dermasure.png",
  liveUrl: "https://dermasure-ph.vercel.app/",
  techStack: [
    { name: "Next.js", icon: "/nextjs.svg" },
    { name: "React", icon: "/re.svg" },
    { name: "TypeScript", icon: "/ts.svg" },
    { name: "Tailwind CSS", icon: "/tail.svg" },
    { name: "Supabase", icon: "/supabase.svg" },
    { name: "Framer Motion", icon: "/fm.svg" },
  ],
};

// Kept for backward compatibility if needed
export const projects = [
  {
    id: 1,
    title: featuredProject.name,
    des: featuredProject.summary,
    img: featuredProject.image,
    iconLists: [
      "/nextjs.svg",
      "/tail.svg",
      "/ts.svg",
      "/supabase.svg",
      "/re.svg",
      "/fm.svg",
    ],
    link: featuredProject.liveUrl,
  },
];

export const educationInfo = {
  degree: "Bachelor of Science in Information Technology",
  institution: "Asian College of Science and Technology (ACSAT)",
  period: "2022\u20132026",
  status: "Completed",
  coursework: [
    "Data Structures & Algorithms",
    "Software Engineering",
    "Systems Administration",
    "Computer Networking",
    "Object Oriented Programming",
    "Web Designing",
  ],
};

export const certificates = [
  {
    id: 1,
    title: "Analyzing IoT Data in Python",
    issuer: "DataCamp",
    year: "2026",
    topics: ["Python", "Data Analysis", "Data Visualization"],
    description:
      "Clean, process, and analyze IoT data using Python, focusing on data manipulation and exploratory visualization.",
    credentialUrl:
      "https://www.datacamp.com/completed/statement-of-accomplishment/course/9fdf77303c113df57672466fa81c6a7db7878ae5?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa",
    image: "/Iot.png",
  },
  {
    id: 2,
    title: "Machine Learning with Python",
    issuer: "freeCodeCamp",
    year: "2025",
    topics: ["Python", "Machine Learning", "Dataset Handling"],
    description:
      "Fundamental machine learning principles, data preprocessing pipelines, and practical model training using Python.",
    credentialUrl:
      "https://freecodecamp.org/certification/jhon_renz_diaz_bsit_222_1a/machine-learning-with-python-v7",
    image: "/machine-learning.png",
  },
  {
    id: 3,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2025",
    topics: ["Cybersecurity", "Security", "Data Privacy"],
    description:
      "Core principles of threat identification, the CIA Triad framework, network defense measures, and organizational privacy.",
    credentialUrl:
      "https://www.credly.com/badges/76844516-58fc-47a6-a80c-0ede29abf2f2",
    image: "/intro-cybersecurity.png",
  },
];

export const otherExperience = [
  {
    id: 1,
    role: "Social Media Manager Intern",
    organization: "Manulife Philippines",
    description:
      "Created and managed social media content during an internship.",
  },
  {
    id: 2,
    role: "English Customer Service Representative",
    organization: "Wonders Corporation",
    description:
      "Handled inbound calls and customer questions about food delivery, order changes, and cancellations for Wonders Corporation.",
  },
];

// Kept for backward compatibility
export const workExperience = otherExperience.map((exp) => ({
  id: exp.id,
  title: exp.role + (exp.organization ? ` \u2014 ${exp.organization}` : ""),
  desc: exp.description,
  thumbnail: exp.id === 1 ? "/exp2.svg" : "/exp1.svg",
}));

export const aiSectionData = {
  quote:
    "\u201CAI won\u2019t replace humans, but humans who use AI will replace those who don\u2019t.\u201D",
  author: "Sam Altman",
  authorRole: "CEO of OpenAI",
  narrative:
    "I use AI tools throughout my development process to learn concepts, explore ideas, work through code, and review possible approaches. I verify suggestions, make my own implementation decisions, and use the process to build my understanding.",
  tools: [
    { name: "Antigravity", image: "/antigravity.png" },
    { name: "Claude", image: "/claude.png" },
    { name: "ChatGPT", image: "/openai-chatgpt-64px.jpg" },
    { name: "Gemini", image: "/gemini.png" },
    { name: "Copilot", image: "/copilot.png" },
  ],
};

export const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    icon: "github" as const,
    link: "https://github.com/zaidjhon-dev",
    label: "GitHub Profile",
  },
  {
    id: 2,
    name: "Facebook",
    icon: "facebook" as const,
    link: "https://www.facebook.com/johnrenz.diaz.33/",
    label: "Facebook Profile",
  },
  {
    id: 3,
    name: "LinkedIn",
    icon: "linkedin" as const,
    link: "https://www.linkedin.com/in/jhon-diaz-707b5640a/",
    label: "LinkedIn Profile",
  },
];
