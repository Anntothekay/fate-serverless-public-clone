import { Route, Routes } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import PrivateRoute from "./auth/PrivateRoute";
import VerifyEmailPage from "./auth/ui/pages/VerifyEmailPage";
import ResetPasswordPage from "./auth/ui/pages/ResetPasswordPage";
import FirebaseActionPage from "./auth/ui/pages/FirebaseActionPage";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlesListPage from "./articles/ui/pages/admin/ArticlesListPage";
import AdminRoute from "./auth/AdminRoute";
import ForbiddenPage from "./pages/ForbiddenPage";
import ArticlesShowPageRoute from "./routes/ArticlesShowPageRoute";
import ArticlePageRoute from "./routes/ArticlePageRoute";
import EditArticlePageRoute from "./routes/EditArticlePageRoute";
import SignupPageRoute from "./routes/SignupPageRoute";
import LoginPageRoute from "./routes/LoginPageRoute";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditionsPage />}
      />
      <Route path="/articles" element={<ArticlesShowPageRoute />} />
      <Route path="/articles/:id" element={<ArticlePageRoute />} />
      <Route path="/login" element={<LoginPageRoute />}></Route>
      <Route path="/signup" element={<SignupPageRoute />}></Route>
      <Route path="/verify-email" element={<VerifyEmailPage />}></Route>
      <Route path="/firebase-action" element={<FirebaseActionPage />}></Route>
      <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <AccountPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/articles/edit/:id"
        element={
          <AdminRoute>
            <EditArticlePageRoute />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/articles"
        element={
          <AdminRoute>
            <ArticlesListPage />
          </AdminRoute>
        }
      />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
