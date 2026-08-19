import { siteConfig } from "@/site.config";
import BlogDetailClient from "./BlogDetailClient";

export function generateStaticParams() {
  return siteConfig.blogs.map((b) => ({ slug: b.slug }));
}

export default function Page() {
  return <BlogDetailClient />;
}
