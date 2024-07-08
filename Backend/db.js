const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BillingSystem");
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Database connected");
});
db.on("disconnected", () => {
  console.log("Database disConnected");
});
module.exports = db;
