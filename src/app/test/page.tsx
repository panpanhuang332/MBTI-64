import type { Metadata } from "next";
import { TestIntroActions } from "@/components/TestIntroActions";

export const metadata: Metadata = {
  title: "測驗說明",
  description:
    "72 題、約 8–10 分鐘的六維度人格探索測驗。沒有標準答案，作答自動保存在你的裝置，可中途離開後繼續。",
};

const NOTES = [
  { title: "約 72 題", text: "共 72 題，預估 8–10 分鐘完成。" },
  {
    title: "沒有標準答案",
    text: "每一題都沒有好壞之分，請依「平常的你」而不是「理想的你」作答。",
  },
  {
    title: "自動保存進度",
    text: "每答一題就自動保存在你的裝置（瀏覽器 localStorage），可以中途離開，之後回來繼續。",
  },
  {
    title: "不收集個人資料",
    text: "全程免登入，不需要姓名或 Email，答案不會上傳到伺服器。",
  },
];

export default function TestIntroPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        開始之前
      </h1>
      <p className="mt-3 text-base leading-relaxed text-mist">
        建議在平常的狀態下作答：不趕時間、不特別疲倦或情緒激動時，結果會更貼近日常的你。
      </p>

      <ul className="mt-8 space-y-4">
        {NOTES.map((note) => (
          <li
            key={note.title}
            className="rounded-card border border-ice-deep/60 bg-white p-5"
          >
            <h2 className="font-bold text-ink">{note.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">
              {note.text}
            </p>
          </li>
        ))}
      </ul>

      <TestIntroActions />

      <p className="mt-6 text-xs leading-relaxed text-mist">
        本測驗為自我探索工具，不是官方 MBTI
        測驗，不提供醫療、心理診斷或人事甄選結論。結果描述的是偏好傾向，不是固定身分。
      </p>
    </div>
  );
}
