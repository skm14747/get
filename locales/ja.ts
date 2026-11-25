import type { MessageKey } from "@/locales/en";

export const locale = "ja" as const;
export const direction = "ltr" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "コンテンツへスキップ",
  home: "ホーム",
  privacy: "プライバシー",
  contact: "お問い合わせ",
  toolsNav: "ツール",
  siteNav: "サイト",
  footerNote: "すべてのツールはブラウザ上で動作します。データはページ外に送信されません。",
  consent:
    "オプションの計測は使用されたツールのみを記録します。入力されたテキストや計算された数値は記録されません。分析アドレスが設定されるまでデータは送信されません。",
  allowMeasurement: "計測を許可",
  denyMeasurement: "許可しない",
  notFoundTitle: "ページが見つかりません",
  notFoundBody: "このアドレスはサイト内のツールに該当しません。",
  notFoundLink: "ツール一覧に戻る",
};
