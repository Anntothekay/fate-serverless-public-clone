import EditArticleForm from "../../components/EditArticleForm";

interface EditArticlePageProps {
  articleId?: string;
}

const EditArticlePage = ({ articleId }: EditArticlePageProps) => {
  const articleIdProp = articleId || "";
  return (
    <div className="content__fs">
      <h1>Article Editor</h1>
      <EditArticleForm articleId={articleIdProp} />
    </div>
  );
};

export default EditArticlePage;
