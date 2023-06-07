import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormEvent } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useUserStore from "../../utils/useAuthStore";

const LoginPage = (props: any) => {
  const { login } = useUserStore();

  const location = useLocation();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationText, setConfirmationText] = useState(
    location.state && location.state.confirmationText
  );
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setConfirmationText("");
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        signOut(getAuth());
        setError("Please verify your e-mail address to log in.");
        return null;
      }
      login(userCredential.user);
      setIsLoading(false);
      navigate("/account");
    } catch (e: any) {
      setIsLoading(false);
      switch (e.code) {
        case "auth/user-not-found":
          setError("E-Mail and/or Password are invalid.");
          break;
        case "auth/wrong-password":
          setError("E-Mail and/or Password are invalid.");
          break;
        case "auth/too-many-requests":
          setError(
            "We have blocked all requests from this device due to unusual activity. Try again later."
          );
          break;
        default:
          setError(e.message);
      }
    }
  };

  return (
    <div className="content login-form">
      <div className="login-form-inner">
        <h1>Log In</h1>
        <form onSubmit={onLogin}>
          {error && <p className="error">{error}</p>}
          {confirmationText && <p className="success">{confirmationText}</p>}
          <label htmlFor="email-input">E-Mail:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            id="email-input"
          />
          <label htmlFor="password-input">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            id="password-input"
          />
          <hr />

          <button
            aria-busy={isLoading}
            className="btn btn-primary"
            disabled={!email || !password}
          >
            Log In
          </button>
        </form>
      </div>
      <div className="login-form-links">
        <Link to="/reset-password">Forgot Password?</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
