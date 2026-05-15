import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UREVS O | 창상피복재",
    template: "%s | UREVS O",
  },
  description:
    "UREVS O는 상처 부위 보호와 드레싱 관리를 위한 창상피복재입니다. 국내 구매, 병원 납품, 해외 총판 문의를 접수합니다.",
  keywords: [
    "UREVS O",
    "창상피복재",
    "Wound Dressing",
    "드레싱",
    "의료기기",
    "병원 납품",
    "의료소모품",
  ],
  openGraph: {
    title: "UREVS O | 창상피복재",
    description:
      "상처 부위 보호와 드레싱 관리를 위한 창상피복재. 국내 구매 및 해외 총판 문의 접수.",
    type: "website",
    locale: "ko_KR",
    siteName: "UREVS O",
  },
  twitter: {
    card: "summary_large_image",
    title: "UREVS O | 창상피복재",
    description:
      "상처 부위 보호와 드레싱 관리를 위한 창상피복재. 국내 구매 및 해외 총판 문의 접수.",
  },  verification: {
    google: "GiOKwKymKBbLv-hmZAxTk2lV2nt8ouCxFUjxew01S-w",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

