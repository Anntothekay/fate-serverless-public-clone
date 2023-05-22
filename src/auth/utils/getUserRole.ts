import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getUserRole = async (userId: string) => {
  try {
    const userRoleRef = doc(db, "roles", userId);
    const docSnap = await getDoc(userRoleRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      console.log("No such document!");
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
