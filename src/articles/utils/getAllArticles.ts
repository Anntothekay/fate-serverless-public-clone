import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getAllArticles = async () => {
  try {
    const q = query(collection(db, "articles"));

    const querySnapshot = await getDocs(q);
    const documentsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log("documents fetched");
    return documentsArray;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
