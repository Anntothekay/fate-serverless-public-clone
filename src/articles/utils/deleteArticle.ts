import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const deleteArticle = async (articleId: string) => {
  try {
    const articleRef = doc(db, "articles", articleId);
    await deleteDoc(articleRef);
    console.log("Document successfully deleted!");
  } catch (e: any) {
    throw new Error(e.message);
  }
};
