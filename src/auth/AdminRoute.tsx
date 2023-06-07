import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";
import Spinner from "../ui/Spinner";
import useAuthStore from "./utils/useAuthStore";

interface Props {
  children: any;
}

function AdminRoute({ children }: Props) {
  const { id } = useParams();
  const articleId = id || "";

  const { user, userRole, isLoading } = useAuthStore();

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

  if (user && userRole !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, { articleId: articleId });
  });
}

export default AdminRoute;
