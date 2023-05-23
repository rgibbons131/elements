const express = require("express");

const professionalController = require("../controllers/elements.js");

const router = express.Router();

// GET /feed/posts
// router.get("/allusers", professionalController.getData);
// router.get("/user/:userId", professionalController.getUser);
// router.post("/user", professionalController.postUser);
// router.put("/user/:userId", professionalController.putUser);
// router.delete("/user/:userId", professionalController.deleteUser);

router.post("/element", professionalController.postElement);

router.get("");
module.exports = router;
