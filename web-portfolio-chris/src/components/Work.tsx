type WorkItem = {
  id: string;
  title: string;
  tag: string;
  url: string;
};

const works: WorkItem[] = [
  { id: "work-paypai", title: "PayPAI — Cross-border Web3 Payments & AI Agent", tag: "Web3 / FinTech", url: "https://paypai.network/" },
  { id: "work-invoice-tokenization", title: "Tokenized Invoice Platform — Receivables & Investment", tag: "Web3 / Dapp", url: "https://ubt.amplefintech.com/" },
  { id: "work-douyin-platform", title: "Douyin E-commerce Service Platform", tag: "E-commerce", url: "https://fxg.jinritemai.com/" },
  { id: "work-feishu-open", title: "Feishu (Lark) Open Platform — Distribution & Billing", tag: "SaaS Platform", url: "https://app.feishu.cn/" },
  { id: "work-zhengcaiyun", title: "Zhengcaiyun — ISV Onboarding Workflow", tag: "Open Platform", url: "https://m.zcygov.cn/" },
  { id: "work-jindou-cloud", title: "Jindou Cloud SaaS — Automotive Service Centers", tag: "SaaS", url: "https://www.mys4s.cn/" },
];

export default function Work() {
  return (
    <section id="work" className="py-8 sm:py-12 bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center pb-12">
          My Work
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((w) => (
            <div 
              key={w.id} 
              className="relative bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 ease-out transform hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="text-xs uppercase tracking-widest text-purple-400 font-semibold">{w.tag}</div>
              <div className="mt-2 font-medium text-white text-base">{w.title}</div>
              <div className="absolute top-3 right-2">
                <a href={w.url} target="_blank" rel="noreferrer" className="mt-3 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium hover:underline underline-offset-4">
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


