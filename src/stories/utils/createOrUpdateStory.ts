import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const createOrUpdateStory = async (
  userId: string,
  text: string,
  options?: {
    title?: string;
    isPublished?: boolean;
    storyId?: string;
  }
) => {
  try {
    const authorRef = doc(db, "users", userId);
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

    if (!options?.storyId) {
      await setDoc(doc(db, "stories"), {
        title: options?.title ?? "",
        text: text ? text : "",
        author: authorRef,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isPublished: options?.isPublished ?? false,
      });
    } else {
      const storiesRef = doc(db, "stories", options.storyId);
      await updateDoc(storiesRef, updateData);
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
