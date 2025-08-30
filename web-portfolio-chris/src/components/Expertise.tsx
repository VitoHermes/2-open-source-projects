export default function Expertise() {
  const items = [
    {
      id: "expertise-frontend",
      title: "Frontend",
      desc: "React.js, TypeScript, Next.js, Tailwind CSS, Redux, Jest Testing, Responsive Design, Performance Optimization, Accessibility (WCAG), Component Architecture.",
      icon: "🎨",
    },
    {
      id: "expertise-web3",
      title: "Blockchain & Web3",
      desc: "Ethereum Development, Smart Contracts, Web3.js, MetaMask Integration, DeFi Protocols, NFT Development, Solidity, Hardhat, IPFS, Wallet Connect.",
      icon: "⛓️",
    },
    {
      id: "expertise-ai",
      title: "AI & Machine Learning",
      desc: "OpenAI API, LangChain, Prompt Engineering, RAG Systems, AI Agents, Vector Databases, Machine Learning Models, Data Processing, API Integration.",
      icon: "🤖",
    },
    {
      id: "expertise-backend",
      title: "Backend & DevOps",
      desc: "Node.js, Express.js, RESTful APIs, GraphQL, Database Design, CI/CD Pipelines, Docker, Kubernetes, AWS Services, Microservices Architecture.",
      icon: "☁️",
    },
  ];

  return (
    <section id="expertise" className="py-8 sm:py-12 bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center pb-12">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 ease-out transform hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-semibold text-purple-400 text-lg">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


