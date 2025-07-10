const express = require("express");
const router = express.Router();
const {
    createPot,
    getAllPots,
    getPotById,
    updatePot,
    deletePot
} = require("../controllers/potController");

router.post("/", createPot);
router.get("/", getAllPots);
router.get("/:id", getPotById);
router.put("/:id", updatePot);
router.delete("/:id", deletePot);

module.exports = router;
