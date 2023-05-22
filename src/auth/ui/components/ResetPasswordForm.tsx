import { useState, useEffect } from "react";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  auth: any;
  oob: string;
}

const ResetPasswordForm = ({ auth, oob }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyCode = async () => {
      await verifyPasswordResetCode(auth, oob);
    };
    verifyCode();
  }, []);

  const onPasswordChange = async () => {
    setPasswordFeedback("");
    setPasswordError("");
    if (auth) {
      try {
        setIsLoading(true);
        await confirmPasswordReset(auth, oob, newPassword);
        setIsLoading(false);

        navigate("/login", {
          state: {
            confirmationText: "Password successfully reset.",
          },
        });
      } catch (e: any) {
        setIsLoading(false);

        if (e.code === "auth/weak-password") {
          setPasswordError("Password should be at least 6 characters.");
        } else {
          setPasswordError(e.message);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onPasswordChange)}
      className="left"
      autoComplete="off"
    >
      {passwordFeedback && <p className="success">{passwordFeedback}</p>}
      {passwordError && <p className="error">{passwordError}</p>}
      <label htmlFor="new-password-input">New Password:</label>
      {errors && (
        <p className="input-error">
          <ErrorMessage errors={errors} name="new-password-input" />
        </p>
      )}
      <input
        {...register("new-password-input", {
          required: "Password is required.",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters.",
          },
        })}
        className="mb-1em"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        id="new-password-input"
        name="new-password-input"
        autoComplete="new-password"
      />
      <label htmlFor="confirm-new-password-input">Confirm New Password:</label>
      {errors && (
        <p className="input-error">
          <ErrorMessage errors={errors} name="confirm-new-password-input" />
        </p>
      )}
      <input
        {...register("confirm-new-password-input", {
          required: "Password is required.",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters.",
          },
          validate: (val: string) => {
            if (watch("new-password-input") != val) {
              return "Passwords do not match.";
            }
          },
        })}
        className="mb-2em"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        type="password"
        id="confirm-new-password-input"
        name="confirm-new-password-input"
        autoComplete="new-password"
      />
      <button
        aria-busy={isLoading}
        disabled={!newPassword || newPassword !== confirmNewPassword}
        className="btn"
      >
        Change Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
