import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隱私說明",
  description:
    "人格座標 64 的隱私原則：免帳號、答案只保存在你的瀏覽器、不上傳伺服器、不收集個資。",
  alternates: { canonical: "/privacy" },
};

const POINTS = [
  {
    title: "預設不需要帳號",
    text: "全站免登入、免註冊。我們不要求也不收集姓名、Email、電話或任何可識別個人身分的資料。",
  },
  {
    title: "回答保存在你的瀏覽器",
    text: "作答進度與結果儲存在你裝置的 localStorage，完全在本機運作，不會上傳到伺服器。我們沒有資料庫，也看不到你的任何答案。",
  },
  {
    title: "清除瀏覽器資料後紀錄可能消失",
    text: "因為資料只存在你的裝置上，若你清除瀏覽器資料、使用無痕模式或更換裝置，作答紀錄與結果可能消失，且無法復原。",
  },
  {
    title: "分享時只分享人格結果",
    text: "分享連結與分享圖卡只包含人格代碼、六個維度的傾向分數與作答穩定度，不包含姓名、作答內容或任何個資。",
  },
  {
    title: "不用於就業、保險或醫療判斷",
    text: "我們不會（也無從）使用你的答案做就業、保險、醫療或任何評選判斷；也請你不要將測驗結果用於這類用途。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-ink-deep sm:text-4xl">
        隱私說明
      </h1>
      <p className="mt-3 text-base leading-relaxed text-mist">
        原則很簡單：你的答案是你的，我們不碰。
      </p>
      <div className="mt-8 space-y-4">
        {POINTS.map((point) => (
          <section
            key={point.title}
            className="rounded-card border border-ice-deep/60 p-5"
          >
            <h2 className="font-bold text-ink">{point.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              {point.text}
            </p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-xs leading-relaxed text-mist">
        本站為靜態網站，核心功能在沒有後端服務的情況下運作。若未來部署平台（如
        Vercel、Netlify）提供基本的匿名流量統計，該統計不包含你的作答內容。
      </p>
    </div>
  );
}
