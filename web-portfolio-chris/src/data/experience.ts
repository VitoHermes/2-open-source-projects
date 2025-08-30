export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  time: string;
  location: string;
  website?: string;
  bullets: string[];
  skills: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-ample-fintech",
    role: "Senior Software Developer",
    org: "Ample FinTech",
    time: "Nov 2024 - Present",
    location: "Melbourne, Australia",
    bullets: [
      "Led frontend for PayPAI Web3 payments with AI agent workflows.",
      "Built payments, batch transfers, address book, and social flows.",
      "Integrated OpenAI, Gemini, DeepSeek; swaps on Base/BSC with validation.",
      "Risk screening and agent memory with CosmosDB.",
    ],
    skills: ["React", "TypeScript", "Web3", "AI", "CosmosDB"],
  },
  {
    id: "exp-bytedance-dy",
    role: "Senior Software Developer, Douyin E-commerce",
    org: "Bytedance Technology",
    time: "May 2021 - Nov 2024",
    location: "Hangzhou, China",
    bullets: [
      "Built large-scale e-commerce service platform UIs with React/TS/Redux.",
      "Improved conversion 8% → 17% via dynamic components and API integration.",
      "Developed AI-assisted publishing and image recognition workflows.",
    ],
    skills: ["React", "TypeScript", "Redux", "E-commerce", "AI"],
  },
  {
    id: "exp-bytedance-feishu",
    role: "Senior Software Developer, Feishu Open Platform",
    org: "Bytedance Technology",
    time: "Oct 2020 - May 2021",
    location: "Hangzhou, China",
    bullets: [
      "Developed distribution, billing, and transactions dashboards with React/TS.",
      "Implemented real-time tracking and RBAC; optimized REST API flows.",
    ],
    skills: ["React", "TypeScript", "Dashboard", "RBAC", "REST API"],
  },
  {
    id: "exp-zhengcaiyun",
    role: "Senior Software Developer, Open Platform",
    org: "Zhengcaiyun",
    time: "May 2019 - Sep 2020",
    location: "Hangzhou, China",
    bullets: [
      "Delivered ISV onboarding workflow UIs; contract-first integration model.",
      "Abstracted I/O components; reduced onboarding from 3+ months to ~2 weeks.",
    ],
    skills: ["Workflow", "UI/UX", "Integration", "Optimization"],
  },
  {
    id: "exp-chasing-tech",
    role: "Co-Founder & Senior Software Developer",
    org: "Hangzhou Chasing Technology",
    time: "May 2015 - May 2019",
    location: "Hangzhou, China",
    bullets: [
      "Built Jindou Cloud SaaS for 2,000+ automotive centers; React + cloud backend.",
      "Integrated Alipay, AutoNavi; supported 10M RMB+ annual revenue.",
    ],
    skills: ["SaaS", "React", "Cloud", "Integration", "Automotive"],
  },
];
