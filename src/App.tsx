import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Router from "./Router";
import useUser from "./auth/utils/useUser";
import Header from "./ui/Header";

import Footer from "./ui/Footer";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      // Apply the background image class to the HTML element
      document.body.classList.add("background-image");
    } else {
      // Remove the background image class from the HTML element
      document.body.classList.remove("background-image");
    }
  }, [location.pathname]);

  const user = useUser();

  return (
    <HelmetProvider>
      <Header activeUser={user} />
      <Router />
      <Footer />
    </HelmetProvider>
  );
}

export default App;
