import { useEffect, useState } from "react";
import ArticlesCard from "../components/ArticlesCard";
import { getNPublishedArticles } from "../../utils/getNPublishedArticles";
import { Article } from "../../utils/Article";

interface Props {
  limit: number;
}

const ArticlesCardsList = ({ limit }: Props) => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchData = async () => {
    const articles = await getNPublishedArticles((limit = 3));
    setArticles(articles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul className="cards">
      {articles.map((article: Article) => (
        <ArticlesCard key={article.id} article={article} />
      ))}
    </ul>
  );
};
export default ArticlesCardsList;
