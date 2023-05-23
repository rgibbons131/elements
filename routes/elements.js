const express = require("express");

const professionalController = require("../controllers/elements.js");

const router = express.Router();

// GET /feed/posts

// router.get("/user/:name", professionalController.getUser);       DONE
// router.post("/user", professionalController.postUser);               DONE
// router.put("/user/:userId", professionalController.putUser);
// router.delete("/user/:userId", professionalController.deleteUser);

router.get("/user/:name", professionalController.getElement);
router.get("/all", professionalController.getData);
router.post("/element", professionalController.postElement);

router.get("");
module.exports = router;
