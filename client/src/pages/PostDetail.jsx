import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addComment,
  deletePost,
  fetchPostById,
} from "../app/features/posts/postsSlice";

export default function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((s) => s.posts.current);
  const auth = useSelector((s) => s.auth);

  const isOwner = useMemo(() => {
    if (!post || !auth.user) return false;
    const authorId =
      typeof post.author === "string" ? post.author : post.author?._id;
    return authorId === auth.user.id;
  }, [post, auth.user]);

  const [comment, setComment] = useState({ content: "" });
  const [commentErr, setCommentErr] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const onDelete = async () => {
    if (!confirm("Delete this post?")) return;
    const res = await dispatch(deletePost(id));
    if (deletePost.fulfilled.match(res)) {
      navigate("/posts");
    } else {
      alert(res.payload || "Delete failed");
    }
  };

  const onAddComment = async (e) => {
    e.preventDefault();
    setCommentErr("");

    const res = await dispatch(
      addComment({ id, data: { content: comment.content } }),
    );
    if (addComment.rejected.match(res)) {
      setCommentErr(res.payload || "Comment failed");
      return;
    }
    setComment({ content: "" });
  };

  if (!post) return <div className="alert alert-secondary">Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h3 className="mb-1">{post.title}</h3>
          <div className="text-muted">
            by {post.author?.name || "Unknown"} •{" "}
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
          </div>
        </div>

        {auth.token && isOwner && (
          <div className="d-flex gap-2">
            <Link
              className="btn btn-outline-primary btn-sm"
              to={`/edit/${post._id}`}
            >
              Edit
            </Link>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="card card-body mb-4">
        <div
          className="post-content ql-editor p-0"
          dangerouslySetInnerHTML={{
            __html: (post.content || "").replace(
              /<p>\s*<\/p>/g,
              "<p><br/></p>",
            ),
          }}
        />
      </div>

      <h5 className="mb-2">Comments ({post.comments?.length || 0})</h5>

      <div className="mb-4">
        {post.comments?.length ? (
          post.comments.map((c) => (
            <div key={c._id} className="card card-body mb-2">
              <div className="fw-bold">{c.userName}</div>

              <div style={{ whiteSpace: "pre-wrap" }}>{c.content}</div>
              <small className="text-muted">
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
              </small>
            </div>
          ))
        ) : (
          <div className="alert alert-secondary">No comments yet.</div>
        )}
      </div>

      {(!auth.token || !isOwner) && (
        <div className="card card-body">
          <h6>Add a Comment</h6>

          {!auth.token ? (
            <div className="alert alert-info m-0">
              Please <Link to="/login">login</Link> to comment.
            </div>
          ) : (
            <>
              {commentErr && (
                <div className="alert alert-danger">{commentErr}</div>
              )}

              <form onSubmit={onAddComment}>
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  value={comment.content}
                  onChange={(e) => setComment({ content: e.target.value })}
                  required
                />
                <button className="btn btn-dark">Post Comment</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
