import { Card } from "@/components/util";
export default function Expertise() {
  const items = [
    {
      id: "expertise-frontend",
      title: "Frontend — React, TypeScript, Tailwind",
      desc: "Production UIs, state management, testing (Redux, Jest), performance & accessibility.",
    },
    {
      id: "expertise-web3",
      title: "Blockchain & Web3",
      desc: "Wagmi, Viem, Ethers.js, Solidity basics; token payments, swaps, risk screening.",
    },
    {
      id: "expertise-ai",
      title: "AI-assisted Workflows",
      desc: "OpenAI, Gemini, DeepSeek integration for agent workflows and prompt orchestration.",
    },
    {
      id: "expertise-backend",
      title: "Backend & Cloud",
      desc: "Node.js, Express, REST APIs; CosmosDB/MySQL; CI/CD, Docker (basic), Vercel/AWS exposure.",
    },
  ];

  return (
    <section id="expertise" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">My Expertise</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="p-6">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


