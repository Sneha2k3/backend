const express = require("express");
const upload = require('../service/upload'); 

const router = express.Router();
const {
    createPot,
    getAllPots,
    getPotById,
    updatePot,
    deletePot
} = require("../controllers/potController");

router.post("/",upload.single("file"), createPot);
router.get("/", getAllPots);
router.get("/:id", getPotById);
router.put("/:id",upload.single("file"), updatePot);
router.delete("/:id", deletePot);

module.exports = router;
