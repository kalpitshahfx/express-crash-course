const express = require("express");
const router = express.Router();
let members = require("../../Members");
const uuid = require("uuid");

//Gets all the members
router.get("/", (req, res) => res.json(members));

//Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member not found for id ${req.params.id}` });
  }
});

//Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and an email" });
  }

  members.push(newMember);
  res.json(members);
});

//Update Member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        (member.name = updateMember.name ? updateMember.name : member.name),
          (member.email = updateMember.email
            ? updateMember.email
            : member.email);
        res.json({ msg: "Member upddated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `Member not found for id ${req.params.id}` });
  }
});

//Delete member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === req.params.id);
  if (found) {
    members = members.filter(member => member.id !== req.params.id);
    res.json({
      msg: "Member Deleted",
      members
    });
  } else {
    res.status(400).json({ msg: `Member not found for id ${req.params.id}` });
  }
});

module.exports = router;
