import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const createOrUpdateArticle = async (
  userId: string,
  text: string,
  options?: {
    title?: string;
    isPublished?: boolean;
    articleId?: string;
    teaser?: string;
  }
) => {
  try {
    const author = userId;
    const updateData: any = {
      text: text,
      updatedAt: serverTimestamp(),
    };
    if (options?.title) {
      updateData.title = options.title;
    }
    if (options?.isPublished) {
      updateData.isPublished = options.isPublished;
    }

    if (!options?.articleId) {
      const newDocRef = await addDoc(collection(db, "articles"), {
        title: options?.title ?? "",
        teaser: options?.teaser ?? "",
        text: text ?? "",
        author: author,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isPublished: options?.isPublished ?? false,
      });
      return newDocRef.id;
    } else {
      const articleRef = doc(db, "articles", options.articleId);
      await updateDoc(articleRef, updateData);
      return options.articleId;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
