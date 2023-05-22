import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteFirestoreUser = async (uid: string) => {
  try {
    // Delete the user and private document
    await deleteDoc(doc(db, `users/${uid}/private`, uid));
    await deleteDoc(doc(db, "users", uid));
  } catch (e: any) {
    throw new Error(e.message);
  }
};
