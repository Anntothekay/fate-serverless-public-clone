import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getAllPublishedStories = async () => {
  try {
    const q = query(
      collection(db, "stories"),
      where("isPublished", "==", true)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const documentsArray = querySnapshot.docs.map((doc) => doc.data());
      return documentsArray;
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
