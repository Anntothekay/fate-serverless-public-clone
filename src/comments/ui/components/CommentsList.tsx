import { useEffect } from "react";
import { getComments } from "../../utils/getComments";
import { useCommentsStore } from "../../utils/CommentsStore";
import useAuthStore from "../../../auth/utils/useAuthStore";
import { deleteComment } from "../../utils/deleteComment";

interface Props {
  articleId: string;
}

const CommentsList = ({ articleId }: Props) => {
  const { setStoreComments, deleteStoreComment, comments } = useCommentsStore();
  const { user, userRole } = useAuthStore();

  const fetchComments = async () => {
    try {
      const commentsList = await getComments(articleId, 10);
      // console.log(commentsList);
      setStoreComments(commentsList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = (id: string) => {
    deleteComment(id);
    deleteStoreComment(id);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => (
          <li className="comment" key={comment.commentId}>
            <h3>{comment.authorName}</h3>
            <p>{comment.text}</p>
            {(user?.uid === comment.author || userRole === "admin") && (
              <button
                onClick={() => handleDeleteComment(comment.commentId)}
                className="btn btn-danger btn-small"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentsList;
