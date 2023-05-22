import { Navigate } from "react-router-dom";
import useUser from "./utils/useUser";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Spinner from "../ui/Spinner";
import { getUserRole } from "./utils/getUserRole";

interface Props {
  children: any;
}

function AdminRoute({ children }: Props) {
  const [userRole, setUserRole] = useState("");
  const [userRoleFetched, setUserRoleFetched] = useState(false);

  const { id } = useParams();
  const articleId = id || "";

  const { user, isLoading } = useUser();

  const fetchUserRole = async (id: string) => {
    try {
      const currentUserRole = await getUserRole(id);
      if (currentUserRole) {
        setUserRole(currentUserRole.role);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      fetchUserRole(userId).then(() => setUserRoleFetched(true));
    }
  }, [user]);

  if (isLoading || !userRoleFetched) {
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
