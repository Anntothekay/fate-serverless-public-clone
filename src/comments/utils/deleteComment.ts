import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteComment = async (commentId: string) => {
  try {
    const commentRef = doc(db, "comments", commentId);
    await deleteDoc(commentRef);
    console.log("Comment deleted successfully.");
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment.");
  }
};
