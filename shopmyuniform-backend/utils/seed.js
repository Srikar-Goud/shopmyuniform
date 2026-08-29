import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import School from "../models/School.js";
import Product from "../models/Product.js";

const run = async () => {
  await connectDB();

  await School.deleteMany({});
  await Product.deleteMany({});

  const schools = await School.insertMany([
    { name: "St. Mary's School", address: "Banjara Hills, Hyderabad", classes: ["Nursery", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
    { name: "Delhi Public School", address: "Nacharam, Hyderabad", classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
    { name: "Oakridge International", address: "Gachibowli, Hyderabad", classes: ["Kindergarten", "1", "2", "3", "4", "5"] },
  ]);

  const [stMarys, dps, oakridge] = schools;

  const sizeSet = (base) => [
    { label: "S (5-6y)", chestIn: 26, heightCm: 110, stock: base + 5 },
    { label: "M (7-8y)", chestIn: 28, heightCm: 125, stock: base + 8 },
    { label: "L (9-10y)", chestIn: 30, heightCm: 140, stock: base + 3 },
    { label: "XL (11-12y)", chestIn: 32, heightCm: 152, stock: base },
  ];

  await Product.insertMany([
    {
      name: "St. Mary's White Half-Sleeve Shirt",
      description: "Regular-fit white cotton-poly shirt with the school logo embroidered on the pocket.",
      school: stMarys._id,
      category: "Shirt",
      gender: "unisex",
      price: 449,
      images: [],
      sizes: sizeSet(10),
      sizeGuideNotes: "Runs true to size. Choose one size up for a looser fit.",
    },
    {
      name: "St. Mary's Grey Trousers",
      description: "Durable grey formal trousers with an adjustable elastic waistband.",
      school: stMarys._id,
      category: "Trousers",
      gender: "boy",
      price: 549,
      images: [],
      sizes: sizeSet(6),
      sizeGuideNotes: "Sized by waist - check the chest/height columns for the closest age match.",
    },
    {
      name: "St. Mary's Pinafore",
      description: "Navy blue pinafore with box pleats and the house-colour braid trim.",
      school: stMarys._id,
      category: "Pinafore",
      gender: "girl",
      price: 599,
      images: [],
      sizes: sizeSet(4),
      sizeGuideNotes: "Slightly loose fit by design to allow room to grow.",
    },
    {
      name: "DPS Sky Blue Shirt",
      description: "Sky-blue full-sleeve shirt, part of the winter uniform set.",
      school: dps._id,
      category: "Shirt",
      gender: "unisex",
      price: 479,
      images: [],
      sizes: sizeSet(8),
      sizeGuideNotes: "Pre-shrunk fabric - true to size.",
    },
    {
      name: "DPS House Tie",
      description: "Striped house tie, colour depends on the assigned house.",
      school: dps._id,
      category: "Tie",
      gender: "unisex",
      price: 149,
      images: [],
      sizes: [{ label: "One Size", stock: 40 }],
      sizeGuideNotes: "One size fits all.",
    },
    {
      name: "Oakridge PE Kit Tracksuit",
      description: "Moisture-wicking tracksuit for sports periods, includes jacket and joggers.",
      school: oakridge._id,
      category: "PE Kit",
      gender: "unisex",
      price: 899,
      images: [],
      sizes: sizeSet(5),
      sizeGuideNotes: "Athletic fit - consider one size up if your child prefers a looser fit.",
    },
    {
      name: "Oakridge Maroon Sweater",
      description: "V-neck wool-blend pullover for the winter uniform.",
      school: oakridge._id,
      category: "Sweater",
      gender: "unisex",
      price: 699,
      images: [],
      sizes: sizeSet(3),
      sizeGuideNotes: "Runs slightly large; true-to-size is fine for most children.",
    },
  ]);

  console.log("Seed complete: 3 schools, 7 products created.");
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
