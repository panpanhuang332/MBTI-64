import type { Metadata } from "next";
import { CalculatingScreen } from "@/components/CalculatingScreen";

export const metadata: Metadata = {
  title: "產生報告中",
  robots: { index: false },
};

export default function CalculatingPage() {
  return <CalculatingScreen />;
}
