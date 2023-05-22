import { useState } from "react";
import {
  getAuth,
  signOut,
  updateEmail,
  updateProfile,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ConfirmModal from "../ui/ConfirmModal";
import ChangePasswordForm from "../auth/ui/components/ChangePasswordForm";
import { checkUsernameAvailability } from "../auth/utils/checkUsernameAvailability";
import { updateUserName } from "../auth/utils/updateUserName";
import { deleteFirestoreUser } from "../auth/utils/deleteFirestoreUser";

const AccountPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName ?? "";
  const email = user?.email ?? "";

  const [userInfoIsLoading, setUserInfoIsLoading] = useState(false);

  const [newUserName, setNewUserName] = useState(userName);
  const [newUserEmail, setNewUserEmail] = useState(email);

  const [userInfoFeedback, setUserInfoFeedback] = useState("");
  const [userInfoError, setUserInfoError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [modalStatus, setModalStatus] = useState(false);

  const navigate = useNavigate();

  const onUserProfileChange = async () => {
    setUserInfoError("");
    setUserInfoFeedback("");
    const emailChanged = newUserEmail !== email;
    const displayNameChanged = newUserName !== userName;

    if (user) {
      try {
        if (displayNameChanged) {
          setUserInfoIsLoading(true);
          /* check if username exists first*/
          const isNameAvailable = await checkUsernameAvailability(newUserName);
          if (!isNameAvailable) {
            setUserInfoError("Username already taken.");
            setUserInfoIsLoading(false);
            return;
          }

          await updateProfile(user, {
            displayName: newUserName,
          });

          await updateUserName(user.uid, newUserName);

          setUserInfoIsLoading(false);
        }
        if (emailChanged) {
          setUserInfoIsLoading(true);
          await updateEmail(user, newUserEmail);
          sendEmailVerification(user);
          signOut(auth);
          navigate("/login", {
            state: {
              confirmationText:
                "E-mail updated successfully! Please check your mailbox and re-verify your e-mail.",
            },
          });
          setUserInfoIsLoading(false);
        }
        switch (true) {
          case emailChanged && displayNameChanged:
            setUserInfoFeedback(
              "E-mail and username updated successfully! Please check your mailbox and re-verify your e-mail."
            );
            break;
          case emailChanged:
            setUserInfoFeedback(
              "E-mail updated successfully! Please check your mailbox and re-verify your e-mail."
            );
            break;
          case displayNameChanged:
            setUserInfoFeedback("Username updated successfully!");
            break;
          default:
            setUserInfoFeedback("No changes made.");
        }
      } catch (e: any) {
        setUserInfoIsLoading(false);
        if (e.code === "auth/requires-recent-login") {
          setUserInfoError(
            "This action requires you to reauthenticate. Please log out and log back in again."
          );
        } else if (e.code === "auth/email-already-in-use") {
          setUserInfoError(
            "Please try again using a different e-mail address."
          );
        } else if (e.response.status === 409) {
          setUserInfoError(e.response.data);
        } else {
          setUserInfoError("An error occurred. Please try again later.");
        }
      }
    }
  };

  const onClickDelete = () => {
    setDeleteError("");
    setModalStatus(true);
  };

  const deleteAccount = async () => {
    if (user) {
      try {
        await deleteFirestoreUser(user.uid);
        await deleteUser(user);
        navigate("/login", {
          state: {
            confirmationText: "Account was successfully deleted.",
          },
        });
      } catch (e: any) {
        setModalStatus(false);
        if (e.code === "auth/requires-recent-login") {
          setDeleteError(
            "This action requires you to reauthenticate. Please log out and log back in again."
          );
        } else {
          setDeleteError("An error occurred. Please try again later.");
        }
      }
    }
  };

  const resetUserData = () => {
    setNewUserEmail(email);
    setNewUserName(userName);
  };
  // console.log(user);

  return (
    <>
      <div className="content">
        <h1>Account Settings</h1>
        <p className="mb-3em">
          Hey, {user?.displayName}! Here you can update your profile, set a new
          password, change your e-mail or delete your account.
        </p>
        <form
          onSubmit={handleSubmit(onUserProfileChange)}
          className="left"
          autoComplete="new-password"
        >
          {userInfoFeedback && <p className="success">{userInfoFeedback}</p>}
          {userInfoError && <p className="error">{userInfoError}</p>}
          <label htmlFor="username-input">Username:</label>
          {errors && (
            <p className="input-error">
              <ErrorMessage errors={errors} name="username-input" />
            </p>
          )}
          <input
            {...register("username-input", {
              required: "Username cannot be empty.",
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/i,
                message:
                  "Username must be 2 - 20 characters and start with a letter.",
              },
            })}
            className="mb-1em"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            type="text"
            id="username-input"
            name="username-input"
            autoComplete="username"
          />
          <label htmlFor="email-input">E-Mail:</label>
          {errors && (
            <p className="input-error">
              <ErrorMessage errors={errors} name="email-input" />
            </p>
          )}
          <input
            {...register("email-input", {
              required: "E-mail cannot be empty.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid e-mail address.",
              },
            })}
            className="mb-2em"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            type="email"
            id="email-input"
            name="email-input"
            autoComplete="email"
          />
          <button
            aria-busy={userInfoIsLoading}
            disabled={newUserEmail === email && newUserName === userName}
            className="btn mr-1em mb-1em"
          >
            Save changes
          </button>

          <a onClick={resetUserData} className="btn btn-outlined">
            Reset
          </a>
        </form>
        <hr className="oversized" />

        <ChangePasswordForm user={user} />

        <hr className="oversized" />

        {deleteError && <p className="error">{deleteError}</p>}
        <button onClick={onClickDelete} className="btn btn-danger">
          Delete my account
        </button>
      </div>

      <ConfirmModal
        onConfirm={deleteAccount}
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        text={"your account"}
      />
    </>
  );
};

export default AccountPage;
