import { lazy, Suspense } from "react";
import Spinner from "../ui/Spinner";

const ArticlePage = lazy(() => import("../articles/ui/pages/ArticlePage"));

const ArticlePageRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ArticlePage />
    </Suspense>
  );
};

export default ArticlePageRoute;
