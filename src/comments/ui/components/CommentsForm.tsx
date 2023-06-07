import { FormEvent, useState } from "react";
import useAuthStore from "../../../auth/utils/useAuthStore";
import { createComment } from "../../utils/createComment";
import { useCommentsStore } from "../../utils/CommentsStore";

interface Props {
  articleId: string;
}

const CommentsForm = ({ articleId }: Props) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthStore();

  const { addStoreComment } = useCommentsStore();

  const postComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        const commentId = await createComment(user.uid, articleId, comment);
        const authorId = user.uid;
        const authorName = user.displayName || "Unknown";
        addStoreComment({
          authorName,
          author: authorId,
          text: comment,
          commentId,
        });
        setComment("");
      } else {
        setError("Please log in to post comments.");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };
  return (
    <>
      <h2>Leave a comment:</h2>
      <form onSubmit={postComment} className="comment-form">
        <textarea
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="text"
          id="text"
        />
        <button className="btn btn-primary">Post your comment</button>
      </form>
    </>
  );
};

export default CommentsForm;
