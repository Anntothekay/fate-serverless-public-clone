import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getStory = async (storyId: string) => {
  try {
    const storyRef = doc(db, "stories", storyId);
    const docSnap = await getDoc(storyRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
