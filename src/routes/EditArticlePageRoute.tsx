import { lazy, Suspense } from "react";
import Spinner from "../ui/Spinner";

const EditArticlePage = lazy(
  () => import("../articles/ui/pages/admin/EditArticlePage")
);

interface Props {
  articleId?: string;
}

const EditArticlePageRoute = ({ articleId }: Props) => {
  return (
    <Suspense fallback={<Spinner />}>
      <EditArticlePage articleId={articleId} />
    </Suspense>
  );
};

export default EditArticlePageRoute;
