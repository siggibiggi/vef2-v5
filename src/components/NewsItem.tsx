import type { NewsItem as NewsItemType } from "@/types";

type Props = {
  news: NewsItemType;
};

const renderStrapiText = (content: any) => {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((block: any) => 
      block.children?.map((child: any) => child.text).join("")
    ).join("\n\n");
  }
  return "";
};

export function NewsItem({ news }: Props) {
  return (
    <article>
      <h1>{news.title}</h1>
      
      <div className="intro">
        {news.intro || news.excerpt}
      </div>
      
      <hr className="divider" />
      
      <div className="content">
        {renderStrapiText(news.content)}
      </div>
    </article>
  );
}