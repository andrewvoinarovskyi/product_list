import { useDispatch } from "react-redux";
import { deleteComment } from "../store/slices/productsSlice";

interface Comment {
  id: number;
  description: string;
  date: string;
}

interface CommentsProps {
  comments: Comment[];
  productId: number;
}

const Comments = ({ comments, productId }: CommentsProps) => {
  const dispatch = useDispatch();

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment({ productId, commentId }));
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id}>
              <div>
                <p>{comment.description}</p>
                <span>{comment.date}</span>
              </div>
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Comments;
