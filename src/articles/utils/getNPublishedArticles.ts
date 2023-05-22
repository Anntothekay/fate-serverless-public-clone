import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

export const getNPublishedArticles = async (max: number) => {
  try {
    const q = query(
      collection(db, "articles"),
      where("isPublished", "==", true),
      orderBy("updatedAt", "desc"),
      limit(max)
    );

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
