import type { Metadata } from "next";
import { QuestionFlow } from "@/components/QuestionFlow";

export const metadata: Metadata = {
  title: "作答中",
  robots: { index: false },
};

export default function QuestionsPage() {
  return <QuestionFlow />;
}
