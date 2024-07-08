const express = require("express");
const router = express.Router();
const { generateToken } = require("../jwt");
const Customers = require("../Models/CustomerSchema");
const asyncHandler = require("express-async-handler");

// Get all customers
router.route("/customers").get(
  asyncHandler(async (req, res) => {
    const data = await Customers.find();
    res.status(200).json(data);
  })
);

// Get a specific customer by ID
router.route("/customers/:id").get(
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const customer = await Customers.findById(id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  })
);

// Create a new customer
router.route("/customers/new").post(
  asyncHandler(async (req, res) => {
    const data = req.body;
    const customer = new Customers(data);
    const response = await customer.save();
    const payload = {
      Uid: customer._id,
    };
    const token = generateToken(payload);
    res.status(200).json({ response: response, token: token });
  })
);

module.exports = router;
