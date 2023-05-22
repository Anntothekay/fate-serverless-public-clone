import { useState, FormEvent } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordPage = () => {
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const onPasswordReset = (e: FormEvent) => {
    setFeedback("");
    setError("");
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setFeedback(
          "If the e-mail address entered is linked to an account, you will receive an e-mail with further instructions shortly. If you haven't received any e-mail, please check your input or contact support."
        );
      })
      .catch((e) => {
        switch (e.code) {
          case "auth/user-not-found":
            setFeedback(
              "If the e-mail address entered is linked to an account, you will receive an e-mail with further instructions shortly. If you haven't received any e-mail, please check your input or contact support."
            );
            break;
          case "auth/invalid-email":
            setError("Please enter a valid e-mail address.");
            break;
          case "auth/too-many-requests":
            setError(
              "We have blocked all requests from this device due to unusual activity. Try again later."
            );
            break;
          default:
            setError(
              "Oops... something went wrong. Please check your input and try again or contact support."
            );
        }
      });
  };

  return (
    <div className="content">
      <h1>Reset Password</h1>
      <p>
        To reset your password, enter the e-mail address you registered with and
        click on the button below. You will be sent an e-mail to the provided
        address with further instructions to set up your new password.
      </p>
      <form className="left" onSubmit={onPasswordReset}>
        {error && <p className="error">{error}</p>}
        {feedback && <p className="success">{feedback}</p>}
        <label htmlFor="email-input">E-Mail:</label>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          id="email-input"
        />

        <button className="btn btn-primary">Reset password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
