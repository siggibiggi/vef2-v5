import Link from "next/link";
import { getHomepage } from "@/lib/news.api";

const renderStrapiText = (content: any) => {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((block: any) => 
      block.children?.map((child: any) => child.text).join("")
    ).join("\n\n");
  }
  return "";
};

export default async function Home() {
  const homeRes = await getHomepage();

  if (!homeRes.ok) {
    return <p>Villa kom upp við að sækja forsíðu.</p>;
  }

  return (
    <section>
      <h1>{homeRes.data.data.title}</h1>
      <div className="content">
        {renderStrapiText(homeRes.data.data.content)}
      </div>

      <div className="all-news-link">
        <Link href="/frettir">
          Skoða allar fréttir &rarr;
        </Link>
      </div>
    </section>
  );
}