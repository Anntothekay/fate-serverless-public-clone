import { NavLink, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../auth/utils/useAuthStore";

const Header = () => {
  const { user, userRole, logout } = useUserStore();
  const [menuActive, setMenuActive] = useState(false);

  const menuRef = useRef<HTMLUListElement | null>(null);
  const menuButtonRef = useRef<HTMLLIElement | null>(null);

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
            <NavLink className="home" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/articles">News</NavLink>
          </li>
          {user && user.emailVerified ? (
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
                    {userRole === "admin" && (
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
                          logout();
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
