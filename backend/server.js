const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

let posts = [
  
];

app.get("/posts", (req, res) => res.json(posts));

app.post("/posts", upload.single("image"), (req, res) => {
  const newPost = {
    user: req.body.user,
    image: req.file ? "/uploads/" + req.file.filename : req.body.image,
    caption: req.body.caption
  };
  posts.push(newPost);
  res.status(201).json({ message: "Post added!", post: newPost });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
