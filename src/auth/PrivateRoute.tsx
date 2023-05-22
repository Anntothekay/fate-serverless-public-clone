import { Navigate } from "react-router-dom";
import useUser from "./utils/useUser";
import { useParams } from "react-router-dom";
import React from "react";
import Spinner from "../ui/Spinner";

interface PrivateRouteProps {
  children: any;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { id } = useParams();
  const articleId = id || "";

  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="content fixed">
        <Spinner />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, { articleId: articleId });
  });
}

export default PrivateRoute;
