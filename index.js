const express = require("express");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

const app = express();

//Init middleware
// app.use(logger);

//Gets all the members
app.get("/api/members", (req, res) => res.json(members));

//Get Single Member
app.get("/api/members/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member not found for id ${req.params.id}` });
  }
});

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
