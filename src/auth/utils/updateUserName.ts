import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const updateUserName = async (userId: string, name: string) => {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      name: name,
      nameLowerCase: name.toLowerCase(),
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
