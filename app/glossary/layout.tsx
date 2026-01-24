import { Metadata } from "next";

export const metadata: Metadata = {
  title: "قاموس المصطلحات البرمجية",
  description:
    "قاموس شامل للمصطلحات البرمجية بالعربية والإنجليزية. ابحث عن ترجمة وشرح أي مصطلح برمجي باللغة العربية.",
  openGraph: {
    title: "قاموس المصطلحات البرمجية | روبي بالعربي",
    description:
      "قاموس شامل للمصطلحات البرمجية بالعربية والإنجليزية مع شرح مفصل.",
  },
  keywords: [
    "مصطلحات برمجية",
    "قاموس برمجة",
    "ترجمة مصطلحات",
    "programming glossary Arabic",
    "مصطلحات روبي",
  ],
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
