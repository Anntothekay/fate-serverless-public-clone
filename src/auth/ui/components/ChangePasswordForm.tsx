import { useState } from "react";
import { updatePassword, User } from "firebase/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  user: User | null;
}

const ChangePasswordForm = ({ user }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onPasswordChange = async () => {
    setPasswordFeedback("");
    setPasswordError("");
    if (user) {
      try {
        setIsLoading(true);
        await updatePassword(user, newPassword);
        setPasswordFeedback("Password changed successfully.");
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        if (e.code === "auth/requires-recent-login") {
          setPasswordError(
            "This action requires you to reauthenticate. Please log out and log back in again."
          );
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

export default ChangePasswordForm;
