import { Link } from "react-router-dom";
import ConfirmModal from "../../../ui/ConfirmModal";
import { useState } from "react";
import { Article } from "../../utils/Article";

interface Props {
  article: Article;
  deleteArticle: (articleId: string) => void;
}

const ArticlesListItem = ({ article, deleteArticle }: Props) => {
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalStatus(true)}
        className="btn btn-danger btn-small"
      >
        &#10006;
      </button>{" "}
      <Link className="btn btn-small edit" to={`./edit/${article.id}`}>
        Edit
      </Link>
      <Link to={`/articles/${article.id}`}> {article.title}</Link>{" "}
      <span>
        <em> - {article.isPublished ? "published" : "draft"}</em>
      </span>
      <ConfirmModal
        onConfirm={() => deleteArticle(article.id)}
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        text={"this article"}
      />
    </>
  );
};

export default ArticlesListItem;
