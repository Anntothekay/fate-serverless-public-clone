import { lazy, Suspense } from "react";
import Spinner from "../ui/Spinner";

const SignupPage = lazy(() => import("../auth/ui/pages/SignupPage"));

const SignupPageRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SignupPage />
    </Suspense>
  );
};

export default SignupPageRoute;
