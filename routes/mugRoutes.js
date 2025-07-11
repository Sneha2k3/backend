const express = require('express');
const router = express.Router();
const mugController = require('../controllers/mugController');
const upload = require('../service/upload'); 

router.get("/",  mugController.getAllMugs);
router.get("/:id", mugController.getMugById);
router.post("/",upload.single("file"), mugController.createMug);
router.put("/:id", upload.single("file"), mugController.updateMug);
router.delete("/:id", mugController.deleteMug);

module.exports = router;
