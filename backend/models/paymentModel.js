import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
