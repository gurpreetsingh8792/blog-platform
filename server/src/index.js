require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `<<<<<<<<<<<<Server running on http://localhost:${PORT}>>>>>>>>>>>>>>`,
      ),
    );
  })
  .catch((err) => {
    console.error("<<<<<<<<<<DB connection failed>>>>>>>>>>>:", err.message);
    process.exit(1);
  });
