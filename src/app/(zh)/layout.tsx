import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function ZhLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader locale="zh-TW" />
      <main className="flex-1">{children}</main>
      <SiteFooter locale="zh-TW" />
    </>
  );
}
