import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export const createUser = async (uid: string, name: string) => {
  try {
    const nameLowerCase = name.toLowerCase();
    await setDoc(doc(db, "users", uid), {
      name: name,
      nameLowerCase: nameLowerCase,
    });
    await setDoc(doc(db, `users/${uid}/private`, uid), {
      accountCreatedAt: serverTimestamp(),
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
