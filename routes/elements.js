const express = require("express");

const professionalController = require("../controllers/elements.js");

const router = express.Router();

// GET /feed/posts

// router.get("/user/:name", professionalController.getUser);       DONE
// router.post("/user", professionalController.postUser);               DONE
// router.put("/user/:userId", professionalController.putUser);         DONE
// router.delete("/user/:userId", professionalController.deleteUser);

router.get("/elements/:name", professionalController.getElement);
router.get("/elements", professionalController.getData);
router.post("/elements", professionalController.postElement);
router.put("/elements/:name", professionalController.putElement);
router.delete("/elements/:name", professionalController.deleteElement);

router.get("");
module.exports = router;
