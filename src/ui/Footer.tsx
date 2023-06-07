import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <footer>
      <nav className="container">
        <div className="made-by">
          made with 💜 by Annkay &copy; {currentYear}
        </div>
        <ul>
          <li>
            <NavLink to="/contact">contact</NavLink>
          </li>
          <li>
            <NavLink to="/terms-and-conditions">Terms &amp; Conditions</NavLink>
          </li>
          <li>
            <NavLink to="/privacy">privacy</NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
