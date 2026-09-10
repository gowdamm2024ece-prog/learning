import express from "express";
import {placeOrder, getAllOrders, updateOrder,deleteOrder} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/", getAllOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
