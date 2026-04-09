import Link from "next/link";
import { getNews } from "@/lib/news.api";
import { NewsList } from "@/components/NewsList";

const LIMIT = 10;

type Props = {
  searchParams: Promise<{ offset?: string }>;
};

export default async function NewsListPage({ searchParams }: Props) {
  const { offset: offsetParam } = await searchParams;
  const offset = offsetParam ? parseInt(offsetParam, 10) : 0;

  const newsRes = await getNews(LIMIT, offset);

  if (!newsRes.ok) {
    return <p>Villa kom upp við að sækja fréttir.</p>;
  }

  const total = newsRes.data.meta?.pagination?.total || 0; 
  const hasNext = offset + LIMIT < total;
  const hasPrev = offset > 0;

  return (
    <section>
      <h1>Fréttalisti</h1>
      
      <NewsList news={newsRes.data.data} />

      <div className="pagination">
        {hasPrev ? (
          <Link href={`/frettir?offset=${Math.max(0, offset - LIMIT)}`}>Fyrri</Link>
        ) : (
          <span className="disabled">Fyrri</span>
        )}
        
        <span>Síða {Math.floor(offset / LIMIT) + 1}</span>
        
        {hasNext ? (
          <Link href={`/frettir?offset=${offset + LIMIT}`}>Næsta</Link>
        ) : (
          <span className="disabled">Næsta</span>
        )}
      </div>
    </section>
  );
}