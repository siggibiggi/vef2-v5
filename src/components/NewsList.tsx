import Link from "next/link";
import type { NewsItem } from "@/types";

type Props = {
  news: NewsItem[];
};

export function NewsList({ news }: Props) {
  return (
    <ul>
      {news.map((i) => (
        <li key={i.id || i.slug}>
          <Link href={`/frettir/${i.slug}`}>
            {i.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}