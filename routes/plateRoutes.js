const express = require("express");
const router = express.Router();
const plateController = require("../controllers/plateController");
const upload = require('../service/upload'); 

router.get("/", plateController.getAllPlates);
router.get("/:id", plateController.getPlateById);
router.post("/", upload.single("file"), plateController.createPlate);
router.put("/:id", plateController.updatePlate);
router.delete("/:id", plateController.deletePlate);

module.exports = router;





