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
    <section id="expertise" className="py-8 sm:py-12 bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center pb-12">
          My Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 ease-out transform hover:shadow-lg hover:shadow-purple-500/20"
            >
              <h3 className="font-semibold text-purple-400 text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


