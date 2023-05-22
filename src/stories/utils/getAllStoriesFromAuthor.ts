import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getAllStoriesFromAuthor = async (userId: string) => {
  try {
    const q = query(collection(db, "stories"), where("author", "==", userId));

    const querySnapshot = await getDocs(q);
    const documentsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documentsArray;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
