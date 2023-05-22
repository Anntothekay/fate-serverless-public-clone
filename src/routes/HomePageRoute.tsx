import { lazy, Suspense } from "react";
import Spinner from "../ui/Spinner";

const HomePage = lazy(() => import("../pages/HomePage"));

const HomePageRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <HomePage />
    </Suspense>
  );
};

export default HomePageRoute;
