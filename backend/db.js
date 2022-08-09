const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://kasi:meh@cluster0.t8phs.mongodb.net/vctry?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const paymentSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  paid: Boolean,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
