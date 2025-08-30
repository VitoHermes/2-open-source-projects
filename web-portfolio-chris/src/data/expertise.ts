export interface ExpertiseItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export const expertiseData: ExpertiseItem[] = [
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
