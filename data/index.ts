import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Work", link: "#work" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication",
    description: "",
    className: "lg:col-span-3 lg:row-span-2 md:col-span-6 md:row-span-2 min-h-[300px] sm:min-h-[340px] lg:min-h-[360px]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/my-image.jpg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 lg:row-span-2 md:col-span-3 md:row-span-2 min-h-[300px] sm:min-h-[340px] lg:min-h-[360px]",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 lg:row-span-2 md:col-span-3 md:row-span-2 min-h-[280px] sm:min-h-[300px] lg:min-h-[320px]",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 5,
    title: "Currently Exploring & Experimenting",
    description: "Continuous Evolution",
    className: "lg:col-span-3 lg:row-span-2 md:col-span-6 min-h-[320px] sm:min-h-[350px]",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "/grid.svg",
  },
  {
    id: 4,
    title: "Bachelor of Science in Information Technology",
    description: "Education & Foundation",
    className: "lg:col-span-3 lg:row-span-2 md:col-span-6 min-h-[340px] sm:min-h-[360px]",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/bg.png",
  },
  {
    id: 6,
    title: "Certifications & Credentials",
    description: "Verified Achievements",
    className: "lg:col-span-2 lg:row-span-2 md:col-span-6 min-h-[340px] sm:min-h-[360px]",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
];

export const educationInfo = {
  degree: "Bachelor of Science in Information Technology",
  institution: "Asian College of Science and Technology (ACSAT)",
  period: "2022 – 2026",
  coursework: [
    "Data Structures & Algorithms",
    "Software Engineering",
    "Systems Administration",
    "Computer Networking",
    "Object Oriented Programming",
    "Web Designing",
  ],
  capstone: {
    tag: "Senior Capstone Focus",
    title: "Asian College Room Scheduling System (ACRSS)",
    note: "Comprehensive room management & schedule automation portal",
  },
};

export const activeExplorations = [
  {
    key: "framework",
    tech: "Next.js 15",
    label: "Turbopack, Server Actions & React 19",
  },
  {
    key: "intelligence",
    tech: "AI Agents",
    label: "Tool Calling, Automation & RAG Systems",
  },
  {
    key: "backend",
    tech: "Supabase",
    label: "Edge Functions, Auth & Vector Embeddings",
  },
];

export const certificates = [
  {
    id: 1,
    title: "Analyzing IoT Data in Python",
    issuer: "DataCamp",
    date: "2026",
    skills: ["Python", "Data Analysis", "Data Visualization"],
    description:
      "Learned to clean, process, and analyze IoT data using Python, including data manipulation, visualization, and interpretation of results.",
    credentialUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/9fdf77303c113df57672466fa81c6a7db7878ae5?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa",
    image: "/Iot.png",
  },
  {
    id: 2,
    title: "Machine Learning with Python",
    issuer: "freeCodeCamp",
    date: "2025",
    skills: ["Python", "Machine Learning", "Dataset Handling"],
    description:
      "Learned Machine Learning with Python, gaining knowledge in data processing, model training, and data science fundamentals.",
    credentialUrl: "https://freecodecamp.org/certification/jhon_renz_diaz_bsit_222_1a/machine-learning-with-python-v7",
    image: "/machine-learning.png", 
  },
  {
    id: 3,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2025",
    skills: ["Cybersecurity", "Security", "Data Privacy"],
    description:
      "Learned to identify cyber threats and malware, implement the CIA Triad data protection framework, apply organizational defenses like firewalls, and navigate entry-level cybersecurity career paths.",
    credentialUrl: "https://www.credly.com/badges/76844516-58fc-47a6-a80c-0ede29abf2f2",
    image: "/intro-cybersecurity.png", 
  },
];

export const projects = [
  {
    id: 1,
    title: "Dermasure PH",
    des: "A discovery portal that helps consumers safely find authentic skincare products in the Philippines by cross-checking items against the official Food and Drug Administration (FDA) database.",
    img: "/dermasure.png",
    iconLists: ["/nextjs.svg", "/tail.svg", "/ts.svg", "/supabase.svg", "/re.svg", "/fm.svg"],
    link: "https://dermasure-ph.vercel.app/",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Social Media Manager - Intern",
    desc: "Managed and executed social media content for Manulife Philippines, boosting platform engagement and user interaction.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 2,
    title: "English Customer Service Representative",
    desc: "Handled inbound calls and resolved customer inquiries, food delivery, order modifications, and cancellations for a US-based food ordering company.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    Icon: FaGithub,
    link: "https://github.com/zaidjhon-dev",
    label: "Github Profile",
  },
  {
    id: 2,
    Icon: FaFacebook,
    link: "https://www.facebook.com/johnrenz.diaz.33/",
    label: "Facebook Profile",
  },
  {
    id: 3,
    Icon: FaLinkedin,
    link: "http://linkedin.com/in/jhon-diaz-707b5640a/",
    label: "Linkedin Profile",
  },
];
