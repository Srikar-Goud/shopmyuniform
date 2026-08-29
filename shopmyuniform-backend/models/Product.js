import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // e.g. "S", "28", "5-6 yrs"
    chestIn: { type: Number },
    heightCm: { type: Number },
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    category: {
      type: String,
      enum: ["Shirt", "Trousers", "Skirt", "Pinafore", "Tie", "Sweater", "Blazer", "Shoes", "PE Kit", "Accessory"],
      required: true,
    },
    gender: { type: String, enum: ["boy", "girl", "unisex"], default: "unisex" },
    price: { type: Number, required: true },
    images: [{ type: String }],
    sizes: [sizeSchema],
    sizeGuideNotes: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", category: "text" });

export default mongoose.model("Product", productSchema);
