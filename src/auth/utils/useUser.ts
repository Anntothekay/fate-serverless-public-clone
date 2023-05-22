import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (user: User | null) => {
        if (user) {
          const token = await user.getIdToken();
          setToken(token);
        }
        setUser(user);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { user, token, isLoading };
};

export default useUser;
