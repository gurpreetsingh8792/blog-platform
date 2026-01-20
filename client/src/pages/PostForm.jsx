import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  createPost,
  fetchPostById,
  updatePost,
} from "../app/features/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function PostForm({ mode }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const authUser = useSelector((s) => s.auth.user);
  const current = useSelector((s) => s.posts.current);

  const [form, setForm] = useState({ title: "", content: "" });
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const isEdit = mode === "edit";

  const isOwner = useMemo(() => {
    if (!isEdit || !current || !authUser) return true;
    const authorId =
      typeof current.author === "string" ? current.author : current.author?._id;
    return authorId === authUser.id;
  }, [isEdit, current, authUser]);

  useEffect(() => {
    if (isEdit && id) dispatch(fetchPostById(id));
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && current && current._id === id) {
      setForm({ title: current.title || "", content: current.content || "" });
    }
  }, [isEdit, current, id]);

  useEffect(() => {
    if (!quillRef.current) return;

    const quill = quillRef.current.getEditor();
    const root = quill.root;

    const handlePaste = (e) => {
      const text = e.clipboardData?.getData("text/plain");
      if (!text) return;
      e.preventDefault();

      const html = text
        .split(/\n{2,}/)
        .map((para) => para.replace(/\n/g, "<br/>"))
        .map((para) => `<p>${para}</p>`)
        .join("");

      const range = quill.getSelection(true);
      quill.clipboard.dangerouslyPasteHTML(range.index, html);
    };

    root.addEventListener("paste", handlePaste);
    return () => root.removeEventListener("paste", handlePaste);
  }, []);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const isQuillEmpty = (html) => {
    if (!html) return true;
    const text = html
      .replace(/<(.|\n)*?>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    return text.length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSaving(true);

    try {
      if (!form.title.trim() || isQuillEmpty(form.content)) {
        setErr("Title and content are required");
        return;
      }

      if (isEdit) {
        const res = await dispatch(updatePost({ id, data: form }));
        if (updatePost.rejected.match(res)) {
          setErr(res.payload || "Update failed");
          return;
        }
        navigate(`/posts/${id}`);
      } else {
        const res = await dispatch(createPost(form));
        if (createPost.rejected.match(res)) {
          setErr(res.payload || "Create failed");
          return;
        }
        navigate("/posts");
      }
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && !isOwner) {
    return (
      <div className="alert alert-danger">You can only edit your own post.</div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h3 className="mb-3">{isEdit ? "Edit Post" : "Create New Post"}</h3>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={onSubmit} className="card card-body">
          <label className="form-label">Title</label>
          <input
            className="form-control mb-3"
            name="title"
            value={form.title}
            onChange={onChange}
            required
          />

          <label className="form-label">Content</label>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={form.content}
            onChange={(val) => setForm((p) => ({ ...p, content: val }))}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "blockquote", "code-block"],
                ["clean"],
              ],
            }}
          />

          <div className="alert alert-light border mt-2 py-2">
            <small className="text-muted">
              <strong>Tip:</strong> Use the toolbar to add headings, bold text,
              lists, links, and code blocks.
            </small>
          </div>

          <button className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
