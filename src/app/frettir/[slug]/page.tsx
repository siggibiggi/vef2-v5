import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news.api";
import { NewsItem } from "@/components/NewsItem";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsPage({ params }: Props) {
  const { slug } = await params;
  const newsItemRes = await getNewsItem(slug);

  if (!newsItemRes.ok) {
    if (newsItemRes.reason === "not-found") {
      return notFound();
    }
    throw new Error("Villa kom upp við að sækja frétt.");
  }

  return (
    <section>
      <div className="back-link">
        <Link href="/frettir">&larr; Til baka á fréttalista</Link>
      </div>
      <NewsItem news={newsItemRes.data} />
    </section>
  );
}