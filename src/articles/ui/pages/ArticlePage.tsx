import { useEffect, useState } from "react";
import { getArticle } from "../../utils/getArticle";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { DocumentData } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../ui/Spinner";

const ArticlePage = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState<DocumentData>({
    updatedAt: "",
    text: "",
    title: "",
    author: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const parse = HTMLReactParser;

  const { id } = useParams();
  const articleId = id || "";

  const meta = article.updatedAt + " | " + article.author;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getArticle(articleId);
      if (data) {
        setArticle(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="content">
      <span className="link" onClick={() => navigate(-1)}>
        ↩ Back
      </span>
      <article>
        <h1>{article.title}</h1>
        <p>
          <em>{meta}</em>
        </p>
        {parse(article.text)}
      </article>
    </div>
  );
};

export default ArticlePage;
