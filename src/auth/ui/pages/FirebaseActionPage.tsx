import { useState, useEffect } from "react";
import { getAuth, applyActionCode, checkActionCode } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPasswordForm";

const FirebaseActionPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  const oobCode = urlParams.get("oobCode") ?? "";

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const handleAction = async () => {
      try {
        if (mode === "verifyEmail" && oobCode) {
          await applyActionCode(auth, oobCode);
          navigate("/login", {
            state: {
              confirmationText:
                "E-mail successfully verified. You can now log in.",
            },
          });
        }

        if (mode === "recoverEmail" && oobCode) {
          await checkActionCode(auth, oobCode);
          await applyActionCode(auth, oobCode);
          navigate("/login", {
            state: {
              confirmationText:
                "E-mail successfully restored. Consider also resetting or changing your password.",
            },
          });
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    handleAction();
  }, []);

  switch (mode) {
    case "verifyEmail":
      if (error) {
        return (
          <div className="content">
            An error occured while verifying your e-mail. Either there is
            something wrong with the link provided or your e-mail has already
            been verified. Try <Link to="/login">logging in</Link> or contact
            support.
          </div>
        );
      } else {
        return (
          <div className="content">
            <div>Verifying email...</div>
          </div>
        );
      }
      break;
    case "resetPassword":
      return (
        <div className="content">
          <ResetPasswordForm auth={auth} oob={oobCode} />
        </div>
      );
      break;
    case "recoverEmail":
      if (error) {
        return (
          <div className="content">
            An error occured while restoring your e-mail. Either there is
            something wrong with the link provided or your e-mail has already
            been restored. Try <Link to="/login">logging in</Link> or contact
            support.
          </div>
        );
      } else {
        return (
          <div className="content">
            <div>Restoring email...</div>
          </div>
        );
      }
      break;
    default:
      return <div className="content">Nothing to see here.</div>;
  }
};

export default FirebaseActionPage;
