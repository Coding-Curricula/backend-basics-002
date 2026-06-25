const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

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

// GET - /api/v1/blogs/:id - returns a specific blog post by ID

// POST - /api/v1/blogs - creates a new blog post

// PUT - /api/v1/blogs/:id - updates a specific blog post by ID

// PATCH - /api/v1/blogs/:id - partially updates a specific blog post by ID

// DELETE - /api/v1/blogs/:id - deletes a specific blog post by ID

// DELETE ALL - /api/v1/blogs - deletes all blog posts

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
