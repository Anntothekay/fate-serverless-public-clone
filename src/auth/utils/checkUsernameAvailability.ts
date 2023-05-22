import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export const checkUsernameAvailability = async (name: string) => {
  const nameLowerCase = name.toLowerCase();

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("nameLowerCase", "==", nameLowerCase));

    const documentsSnapshot = await getDocs(q);
    if (documentsSnapshot.empty) {
      return true;
    } else {
      return false;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
