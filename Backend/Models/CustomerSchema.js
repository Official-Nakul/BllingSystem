const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: { type: String, required: true },
  number: { type: String, required: true },
  amountRecived: { type: String, required: true, default: 0 },
  status: {
    type: String,
    enum: ["Completed", "Pending"],
    required: true,
    default: "Pending",
  },
});

const customer = mongoose.model("Customers", customerSchema);
module.exports = customer;
