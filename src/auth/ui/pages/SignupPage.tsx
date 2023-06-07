import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  sendEmailVerification,
  signOut,
  User,
} from "firebase/auth";
import { checkUsernameAvailability } from "../../utils/checkUsernameAvailability";
import { createUser } from "../../utils/createUser";

const SignupPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSignup = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      /* check if username exists first*/
      const isNameAvailable = await checkUsernameAvailability(name);
      if (!isNameAvailable) {
        setErrorMessage("Username already taken.");
        setIsLoading(false);
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      const user = getAuth().currentUser as User;
      const uid = user.uid;

      if (user) {
        updateProfile(user, {
          displayName: name,
        });
        sendEmailVerification(user);

        // ADD USER TO FIRESTORE
        await createUser(uid, name);

        await signOut(getAuth());

        setIsLoading(false);
        navigate("/verify-email");
      }
    } catch (e: any) {
      setIsLoading(false);
      switch (e.code) {
        case "auth/email-already-in-use":
          setErrorMessage("Oops... something went wrong. Please try again.");
          break;
        case "auth/too-many-requests":
          setErrorMessage(
            "We have blocked all requests from this device due to unusual activity. Try again later."
          );
          break;
        default:
          setErrorMessage(e.response.data);
      }
      throw e;
    }
  };

  return (
    <div className="login-form content">
      <div className="login-form-inner">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit(onSignup)}>
          {errorMessage && <p className="error">{errorMessage}</p>}

          <label htmlFor="username-input">Username:</label>
          {errors && (
            <p className="input-error">
              <ErrorMessage errors={errors} name="username-input" />
            </p>
          )}
          <input
            {...register("username-input", {
              required: "Username is required.",
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/i,
                message:
                  "Username must be 2 - 20 characters and start with a letter.",
              },
            })}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoComplete="username"
            id="username-input"
            name="username-input"
          />

          <label htmlFor="email-input">E-Mail:</label>
          {errors && (
            <p className="input-error">
              <ErrorMessage errors={errors} name="email-input" />
            </p>
          )}
          <input
            {...register("email-input", {
              required: "E-mail is required.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid e-mail address.",
              },
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            id="email-input"
            name="email-input"
          />

          <label htmlFor="password-input">Password:</label>
          {errors && (
            <p className="input-error">
              <ErrorMessage errors={errors} name="password-input" />
            </p>
          )}
          <input
            {...register("password-input", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            id="password-input"
            name="password-input"
          />
          <label htmlFor="confirm-password-input">Confirm Password:</label>
          {errors && (
            <p className="input-error">
              <ErrorMessage errors={errors} name="confirm-password-input" />
            </p>
          )}

          <input
            {...register("confirm-password-input", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
              validate: (val: string) => {
                if (watch("password-input") != val) {
                  return "Passwords do not match.";
                }
              },
            })}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            id="confirm-password-input"
            name="confirm-password-input"
          />

          <hr />

          <button
            aria-busy={isLoading}
            className="btn btn-primary"
            // disabled={!email || !password || password !== confirmPassword}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="login-form-links">
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignupPage;
