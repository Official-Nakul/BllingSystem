const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../Models/OrderSchema");
const router = express.Router();

// Create a new order
router.post(
  "/orders",
  asyncHandler(async (req, res) => {
    try {
      const { price, quantity, CId, item } = req.body;
      if (!price || !quantity || !CId || !item) {
        return res.status(400).send("Missing required fields");
      }

      const order = new Order({
        price: price,
        costPerOrder: price * quantity,
        quantity,
        CId,
        item,
      });
      const response = await order.save();
      res.status(201).send(response);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);

// Read orders for a specific customer
router.get(
  "/orders/:id",
  asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send("Missing customer ID");
      }
      const orders = await Order.find({ CId: id });
      res.status(200).send(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);

// Update an order by ID
router.put(
  "/orders/:id",
  asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      if (!id || !updateData.CId) {
        return res.status(400).send("Missing order ID or customer ID");
      }

      const order = await Order.findOneAndUpdate(
        { _id: id, CId: updateData.CId },
        updateData,
        { new: true }
      );
      if (!order) return res.status(404).send("Order not found");
      res.status(200).send(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);

// Delete an order by ID
router.delete(
  "/orders/:id",
  asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { CId } = req.body;
      if (!id || !CId) {
        return res.status(400).send("Missing order ID or customer ID");
      }

      const order = await Order.findOneAndDelete({ _id: id, CId });
      if (!order) return res.status(404).send("Order not found");
      res.status(200).send("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);

module.exports = router;
