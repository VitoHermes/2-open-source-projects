export interface WorkItem {
  id: string;
  title: string;
  tag: string;
  url: string;
}

export const workData: WorkItem[] = [
  { id: "work-paypai", title: "PayPAI — Cross-border Web3 Payments & AI Agent", tag: "Web3 / FinTech", url: "https://paypai.network/" },
  { id: "work-invoice-tokenization", title: "Tokenized Invoice Platform — Receivables & Investment", tag: "Web3 / Dapp", url: "https://ubt.amplefintech.com/" },
  { id: "work-douyin-platform", title: "Douyin E-commerce Service Platform", tag: "E-commerce", url: "https://fxg.jinritemai.com/" },
  { id: "work-feishu-open", title: "Feishu (Lark) Open Platform — Distribution & Billing", tag: "SaaS Platform", url: "https://app.feishu.cn/" },
  { id: "work-zhengcaiyun", title: "Zhengcaiyun — ISV Onboarding Workflow", tag: "Open Platform", url: "https://m.zcygov.cn/" },
  { id: "work-jindou-cloud", title: "Jindou Cloud SaaS — Automotive Service Centers", tag: "SaaS", url: "https://www.mys4s.cn/" },
];
