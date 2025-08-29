import { Card } from "@/components/util";
type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  time: string;
  location: string;
  bullets: string[];
};

const experiences: ExperienceItem[] = [
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
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Professional Experience</h2>
        <div className="mt-8 space-y-6">
          {experiences.map((exp) => (
            <Card key={exp.id} className="p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-medium">
                  {exp.role} @ {exp.org}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {exp.time} • {exp.location}
                </div>
              </div>
              <ul className="mt-3 list-disc pl-6 text-sm text-gray-700 dark:text-gray-200">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


