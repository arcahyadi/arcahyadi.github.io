import { siteConfig } from "@/site.config";
import PortfolioDetailClient from "./PortfolioDetailClient";

export function generateStaticParams() {
  return siteConfig.portfolio.map((p) => ({ slug: p.slug }));
}

export default function Page() {
  return <PortfolioDetailClient />;
}
