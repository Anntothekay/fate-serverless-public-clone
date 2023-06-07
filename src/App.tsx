import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Router from "./Router";
import useAuth from "./auth/utils/useAuth";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

function App() {
  useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("background-image");
      document.body.classList.remove("stars");
    } else {
      document.body.classList.add("background-image");
      document.body.classList.add("stars");
    }
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <Header />
      <Router />
      <Footer />
    </HelmetProvider>
  );
}

export default App;
