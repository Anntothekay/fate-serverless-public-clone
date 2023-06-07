import { useEffect, useMemo, useState } from "react";
import { getArticle } from "../../utils/getArticle";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../ui/Spinner";
import CommentsList from "../../../comments/ui/components/CommentsList";
import CommentsForm from "../../../comments/ui/components/CommentsForm";
import useAuthStore from "../../../auth/utils/useAuthStore";

const ArticlePage = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState<DocumentData>({
    updatedAt: "",
    text: "",
    title: "",
    author: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const parse = useMemo(() => HTMLReactParser, [article.text]);
  const { user } = useAuthStore();

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
    <div className="content article">
      <span className="link" onClick={() => navigate(-1)}>
        ↩ Back
      </span>
      <article className="article-inner">
        <h1>{article.title}</h1>
        <p>
          <em>{meta}</em>
        </p>
        {parse(article.text)}
      </article>
      {/* <hr /> */}

      <div className="comments">
        <CommentsList articleId={articleId} />
        {user && <CommentsForm articleId={articleId} />}
      </div>
    </div>
  );
};

export default ArticlePage;
