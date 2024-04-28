const express = require("express");
const router = express.Router();
const { busdatas } = require("../controllers/busdata-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const BusDataController = require("../controllers/busdata-controller");

router.route("/busdata/addbus").post(authMiddleware, adminMiddleware, BusDataController.busdataForm);
router.route("/busdata").get(authMiddleware, adminMiddleware, BusDataController.busdatas);
router.route("/getallBusDatas").get(busdatas);
router.route("/busdata/update/:id").patch(authMiddleware, adminMiddleware, BusDataController.updateBusDataById);
router.route("/busdata/:id").get(authMiddleware, adminMiddleware, BusDataController.getBusDataById);
router.route("/busdata/delete/:id").delete(authMiddleware, adminMiddleware, BusDataController.deleteBusDataById);

module.exports = router;