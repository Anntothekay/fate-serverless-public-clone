import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <footer>
      <nav className="container">
        <div className="made-by">
          made with 💜 by Annkay &copy; {currentYear}{" "}
        </div>
        <ul>
          <li>
            <NavLink to="/contact">contact</NavLink>
          </li>
          <li>
            <NavLink to="/imprint">imprint</NavLink>
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
