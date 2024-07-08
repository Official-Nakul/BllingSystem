const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  order_date: {
    type: Date,
    default: Date.now,
  },
  price: { type: Number, required: true },
  costPerOrder: { type: Number },
  quantity: { type: Number, default: 0 },
  item: { type: String, required: true },
  CId: { type: mongoose.Types.ObjectId, ref: "Customers" },
});

const order = mongoose.model("Orders", orderSchema);

module.exports = order;
