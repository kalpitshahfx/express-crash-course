const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const members = require("./Members");
const exphbs = require("express-handlebars");

const app = express();

//Init middleware
// app.use(logger);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/viewmember", function(req, res) {
  res.render("viewMember", { members });
});

app.get("/addmember", function(req, res) {
  res.render("addMember");
});

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
