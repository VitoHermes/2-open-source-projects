import { Card } from "@/components/util";
type WorkItem = {
  id: string;
  title: string;
  tag: string;
};

const works: WorkItem[] = [
  { id: "work-paypai", title: "PayPAI — Cross-border Web3 Payments & AI Agent", tag: "Web3 / FinTech" },
  { id: "work-invoice-tokenization", title: "Tokenized Invoice Platform — Receivables & Investment", tag: "Web3 / Dapp" },
  { id: "work-douyin-platform", title: "Douyin E-commerce Service Platform", tag: "E-commerce" },
  { id: "work-feishu-open", title: "Feishu (Lark) Open Platform — Distribution & Billing", tag: "SaaS Platform" },
  { id: "work-zhengcaiyun", title: "Zhengcaiyun — ISV Onboarding Workflow", tag: "Open Platform" },
  { id: "work-jindou-cloud", title: "Jindou Cloud SaaS — Automotive Service Centers", tag: "SaaS" },
];

export default function Work() {
  return (
    <section id="work" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">My Work</h2>
          <div className="text-sm text-gray-600 dark:text-gray-300">Filter: All</div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((w) => (
            <Card key={w.id} className="p-5">
              <div className="text-xs uppercase tracking-widest text-gray-500">{w.tag}</div>
              <div className="mt-2 font-medium">{w.title}</div>
              <button className="mt-3 text-sm text-[rgb(var(--accent))] hover:underline underline-offset-4">Show project</button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


