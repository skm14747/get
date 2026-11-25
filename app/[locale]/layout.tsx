import { notFound } from "next/navigation";
import { getLocale } from "@/lib/locales";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: code } = await params;
  const locale = getLocale(code);
  if (!locale || !locale.published) notFound();

  return children;
}
