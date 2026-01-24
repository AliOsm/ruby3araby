import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تقدمك في الدورة",
  description:
    "تابع تقدمك في تعلم لغة روبي بالعربي. شاهد الدروس المكتملة والمتبقية واستمر من حيث توقفت.",
  openGraph: {
    title: "تقدمك في الدورة | روبي بالعربي",
    description:
      "تابع تقدمك في تعلم لغة روبي بالعربي. شاهد الدروس المكتملة والمتبقية.",
  },
};

export default function ProgressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
