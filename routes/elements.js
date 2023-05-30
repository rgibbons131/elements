const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");

const professionalController = require("../controllers/elements.js");

const router = express.Router();

// GET /feed/posts

// router.get("/user/:name", professionalController.getUser);       DONE
// router.post("/user", professionalController.postUser);               DONE
// router.put("/user/:userId", professionalController.putUser);         DONE
// router.delete("/user/:userId", professionalController.deleteUser);

router.get("/elements/:name", professionalController.getElement);
router.get("/elements", professionalController.getData);
router.post("/elements", requiresAuth(), professionalController.postElement);
router.put(
  "/elements/:name",
  requiresAuth(),
  professionalController.putElement
);
router.delete(
  "/elements/:name",
  requiresAuth(),
  professionalController.deleteElement
);

router.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
module.exports = router;
