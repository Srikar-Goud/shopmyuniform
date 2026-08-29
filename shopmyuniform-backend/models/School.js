import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    address: { type: String, default: "" },
    classes: [{ type: String }], // e.g. ["Nursery", "1", "2", ... "10"]
    logo: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("School", schoolSchema);
