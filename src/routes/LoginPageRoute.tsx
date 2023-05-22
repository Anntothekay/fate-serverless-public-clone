import { lazy, Suspense } from "react";
import Spinner from "../ui/Spinner";

const LoginPage = lazy(() => import("../auth/ui/pages/LoginPage"));

const LoginPageRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginPage />
    </Suspense>
  );
};

export default LoginPageRoute;
