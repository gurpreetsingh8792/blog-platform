const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require("../controllers/post.controller");

router.get("/", getPosts);
router.get("/:id", getPostById);

router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

router.post("/:id/comments", auth, addComment);

module.exports = router;
