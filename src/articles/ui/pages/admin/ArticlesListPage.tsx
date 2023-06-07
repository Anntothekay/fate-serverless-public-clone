import ArticlesListItem from "../../components/ArticlesListItem";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../../utils/getAllArticles";
import { createOrUpdateArticle } from "../../../utils/createOrUpdateArticle";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../../utils/deleteArticle";
import { Article } from "../../../utils/Article";
import useAuthStore from "../../../../auth/utils/useAuthStore";

const ArticlesListPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const { user } = useAuthStore();
  const userId = user?.uid;

  const navigate = useNavigate();

  const delArticle = (articleId: string) => {
    deleteArticle(articleId);
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllArticles();
      setArticles(data);
    };
    fetchData();
  }, []);

  const createNewArticle = async () => {
    if (userId) {
      const newArticleId = await createOrUpdateArticle(userId, "");
      navigate(`./edit/${newArticleId}`);
    }
  };

  return (
    <div className="content">
      <button onClick={createNewArticle} className="btn btn-outlined create">
        Create new article
      </button>
      {/* <div className="sort">
        <div>Sort by:</div>
        <div>
          <span>name</span>
          <span>published</span>
        </div>
      </div>
      <div className="search">
        <input type="search" />
      </div> */}
      <ul>
        {articles.map((article: Article) => (
          <li key={article.id}>
            <ArticlesListItem deleteArticle={delArticle} article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesListPage;
