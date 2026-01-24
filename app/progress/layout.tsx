import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تقدمك في الدورة",
  description:
    "تابع تقدمك في تعلم لغة روبي عربي. شاهد الدروس المكتملة والمتبقية واستمر من حيث توقفت.",
  openGraph: {
    title: "تقدمك في الدورة | روبي عربي",
    description:
      "تابع تقدمك في تعلم لغة روبي عربي. شاهد الدروس المكتملة والمتبقية.",
  },
};

export default function ProgressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
