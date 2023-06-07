import { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import useAuthStore from "./useAuthStore";
import { getUserRole } from "./getUserRole";

const useAuth = () => {
  const { setUserRole, setToken, login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (user: User | null) => {
        if (user) {
          const token = await user.getIdToken();
          setToken(token);
          login(user);
          const userRole = await getUserRole(user.uid);
          if (userRole) {
            setUserRole(userRole.role);
          }
        } else {
          setUserRole("");
          logout();
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [login, logout, setLoading, setToken]);
};

export default useAuth;
