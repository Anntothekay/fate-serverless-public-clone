import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Comment } from "./Comment";

export const getComments = async (
  articleId: string,
  max: number
): Promise<Comment[]> => {
  try {
    const q = query(
      collection(db, "comments"),
      where("articleId", "==", articleId),
      orderBy("postedAt", "desc"),
      limit(max)
    );

    const querySnapshot = await getDocs(q);

    const comments = querySnapshot.docs.map(async (document) => {
      const commentData = document.data() as Comment;
      const userId = commentData.author;
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData) {
          const name = userData.name;
          const comment = {
            ...commentData,
            authorName: name,
            commentId: document.id,
          };

          return comment;
        }
      } else {
        const name = "Unknown";
        const comment = {
          ...commentData,
          authorName: name,
          commentId: document.id,
        };

        return comment;
      }

      return commentData;
    });

    return Promise.all(comments);
  } catch (e: any) {
    throw new Error(e.message);
  }
};
