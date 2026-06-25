const express = require("express");
const app = express();
const PORT = 8080;

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

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
