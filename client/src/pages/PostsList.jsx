import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../app/features/posts/postsSlice";
import { Link } from "react-router-dom";

export default function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector((s) => s.posts.list);
  const token = useSelector((s) => s.auth.token);

  const [q, setQ] = useState("");
  const [sort, setSort] = useState("new");

  useEffect(() => {
    dispatch(fetchPosts({ q, sort }));
  }, [dispatch, q, sort]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">All Posts</h3>
        {token && (
          <Link className="btn btn-success" to="/new">
            + New Post
          </Link>
        )}
      </div>

      <div className="card card-body mb-3">
        <div className="row g-2">
          <div className="col-md-8">
            <input
              className="form-control"
              placeholder="Search by title..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="new">Newest first</option>
              <option value="old">Oldest first</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="alert alert-secondary">No posts yet.</div>
      ) : (
        <div className="list-group">
          {posts.map((p) => (
            <Link
              key={p._id}
              to={`/posts/${p._id}`}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-bold">{p.title}</div>
                  <small className="text-muted">
                    by {p.author?.name || "Unknown"} •{" "}
                    {p.createdAt ? new Date(p.createdAt).toLocaleString() : ""}
                  </small>
                </div>
                <span className="badge bg-dark align-self-center">
                  {p.comments?.length || 0} comments
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
