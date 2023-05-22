import { lazy, Suspense } from "react";
import Spinner from "../ui/Spinner";

const ArticlesShowPage = lazy(
  () => import("../articles/ui/pages/ArticlesShowPage")
);

const ArticlesShowPageRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ArticlesShowPage />
    </Suspense>
  );
};

export default ArticlesShowPageRoute;
