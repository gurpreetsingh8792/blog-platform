const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  try {
    const { q = "", sort = "new" } = req.query;

    const filter = q ? { title: { $regex: q, $options: "i" } } : {};

    const sortObj =
      sort === "old"
        ? { createdAt: 1 }
        : sort === "title"
          ? { title: 1 }
          : { createdAt: -1 };

    const posts = await Post.find(filter)
      .populate("author", "name email")
      .sort(sortObj)
      .lean();

    return res.json(posts);
  } catch (err) {
    console.error("Get posts error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.json(post);
  } catch (err) {
    console.error("Get post error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ message: "Title & content required" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.userId,
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body || {};

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;

    await post.save();
    return res.json(post);
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete post error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body || {};

    if (!content) {
      return res.status(400).json({ message: "Content required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() === req.user.userId) {
      return res
        .status(403)
        .json({ message: "Author cannot comment on own post" });
    }

    post.comments.push({
      userId: req.user.userId,
      userName: req.user.name,
      content,
    });

    await post.save();

    const updated = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );

    return res.status(201).json(updated);
  } catch (err) {
    console.error("Add comment error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
