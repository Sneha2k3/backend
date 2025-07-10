const express = require('express');
const router = express.Router();
const mugController = require('../controllers/mugController');

router.get("/", mugController.getAllMugs);
router.get("/:id", mugController.getMugById);
router.post("/", mugController.createMug);
router.put("/:id", mugController.updateMug);
router.delete("/:id", mugController.deleteMug);

module.exports = router;
