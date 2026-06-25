const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

app.use(express.json()); // <-- Required for req.body

// attach db.json as a temporary database for the application
const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));

//  GET - /api/v1/health - gives health status of the application
app.get("/api/v1/health", (req, res) => {
  res.send("Alive out here!");
});

// GET - /api/v1/howdy?name=string - returns a greeting message with the name provided in the query parameter
app.get("/api/v1/howdy", (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).send("Name query parameter is required");
  }
  res.send(`Howdy, ${name}!`);
});

// GET - /api/v1/blogs - returns a list of blog posts
app.get("/api/v1/blogs", (req, res) => {
  res.json(db.blogs);
});

// GET - /api/v1/blogs/:id - returns a specific blog post by ID
app.get("/api/v1/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const blog = db.blogs.find((b) => b.id === id);
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  res.json(blog);
});

// POST - /api/v1/blogs - creates a new blog post
app.post("/api/v1/blogs", (req, res) => {
  try {
    const newBlog = req.body;
    newBlog.id = db.blogs.length + 1; // simple ID assignment
    db.blogs.push(newBlog);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).send("Error creating blog post");
  }
});

// PUT - /api/v1/blogs/:id - updates a specific blog post by ID
app.put("/api/v1/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = db.blogs.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).send("Blog not found");
  }
  db.blogs[index] = req.body;
  res.json(db.blogs[index]);
});

// PATCH - /api/v1/blogs/:id - partially updates a specific blog post by ID
app.patch("/api/v1/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const blog = db.blogs.find((b) => b.id === id);
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  Object.assign(blog, req.body);
  res.json(blog);
});

// DELETE - /api/v1/blogs/:id - deletes a specific blog post by ID
app.delete("/api/v1/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = db.blogs.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).send("Blog not found");
  }
  db.blogs.splice(index, 1);
  res.status(204).send();
});

// DELETE ALL - /api/v1/blogs - deletes all blog posts
app.delete("/api/v1/blogs", (req, res) => {
  db.blogs = [];
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
