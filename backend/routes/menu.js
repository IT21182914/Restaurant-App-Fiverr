const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/", menuController.getMenuItems);
router.post("/", menuController.createMenuItem);
router.put("/:id", menuController.updateMenuItem);
router.delete("/:id", menuController.deleteMenuItem);
router.put("/update-top-sellers", menuController.updateTopSellers);

module.exports = router;
