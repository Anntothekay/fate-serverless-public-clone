import { NavLink, Link } from "react-router-dom";
import { User, getAuth, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { getUserRole } from "../auth/utils/getUserRole";

interface HeaderProps {
  activeUser: {
    user: User | null;
    isLoading: boolean;
  };
}

const Header = ({ activeUser }: HeaderProps) => {
  const { user, isLoading } = activeUser;
  const [menuActive, setMenuActive] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userRoleFetched, setUserRoleFetched] = useState(false);

  const menuRef = useRef<HTMLUListElement | null>(null);
  const menuButtonRef = useRef<HTMLLIElement | null>(null);

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
    setUserRole("");
    if (user) {
      const userId = user.uid;
      fetchUserRole(userId).then(() => setUserRoleFetched(true));
    }
  }, [user]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        (event.target as Node) != menuRef.current &&
        (event.target as Node) != menuButtonRef.current
      ) {
        setMenuActive(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header>
      <nav>
        <Link aria-label="Brand Logo" className="brand" to="/"></Link>
        <ul>
          <li>
            <NavLink className="home nav-icon" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/articles">News</NavLink>
          </li>
          {user && !isLoading && user.emailVerified ? (
            <>
              <li
                ref={menuButtonRef}
                onClick={() => {
                  setMenuActive(!menuActive);
                }}
                className="user-control nav-icon"
              >
                {menuActive && (
                  <ul ref={menuRef} className="user-control-menu">
                    {userRoleFetched && userRole === "admin" && (
                      <>
                        <li>
                          <NavLink to="/admin/articles">Admin</NavLink>
                        </li>
                        <hr />
                      </>
                    )}
                    <li>
                      <NavLink to="/account">Account</NavLink>
                    </li>
                    <hr />
                    <li>
                      <Link
                        to="/"
                        onClick={() => {
                          signOut(getAuth());
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
