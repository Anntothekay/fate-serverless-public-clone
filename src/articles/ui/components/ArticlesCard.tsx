import { Link } from "react-router-dom";
import { Article } from "../../utils/Article";

interface Props {
  article: Article;
}

const ArticlesCard = ({ article }: Props) => {
  const formattedTeaser = article.teaser
    ? article.teaser.slice(0, 120) + "..."
    : "";

  return (
    <li className="card">
      <Link to={`/articles/${article.id}`}>
        <div className="card-inner">
          <h3>{article.title}</h3>
          <p>{formattedTeaser}</p>
        </div>
      </Link>
    </li>
  );
};

export default ArticlesCard;
