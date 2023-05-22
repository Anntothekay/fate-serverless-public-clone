import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getArticle = async (articleId: string) => {
  try {
    const articleRef = doc(db, "articles", articleId);
    const docSnap = await getDoc(articleRef);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (docSnap.exists()) {
      const data = docSnap.data();
      const authorRef = doc(db, "users", data.author);
      const authorDocSnap = await getDoc(authorRef);
      if (data && data.updatedAt) {
        data.updatedAt = data.updatedAt
          .toDate()
          .toLocaleDateString("en-US", options);
      }
      if (authorDocSnap.exists()) {
        const authorData = authorDocSnap.data();
        data.author = authorData.name;
      }
      return data;
    } else {
      console.log("No such document!");
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
