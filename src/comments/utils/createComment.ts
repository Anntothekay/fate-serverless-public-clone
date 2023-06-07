import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export const createComment = async (
  userId: string,
  articleId: string,
  comment: string
) => {
  try {
    const author = userId;
    const newDocRef = await addDoc(collection(db, "comments"), {
      author: author,
      articleId: articleId,
      text: comment,
      postedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newDocRef.id;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
