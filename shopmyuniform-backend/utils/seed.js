import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";

import School from "../models/School.js";
import Product from "../models/Product.js";

const run = async () => {
  await connectDB();

  await School.deleteMany({});
  await Product.deleteMany({});

  // -------------------------------------------------------------------------
  // SCHOOLS
  // -------------------------------------------------------------------------

  const schools = await School.insertMany([
    {
      name: "St. Mary's School",
      address: "Banjara Hills, Hyderabad",
      classes: ["Nursery", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "Delhi Public School",
      address: "Nacharam, Hyderabad",
      classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "Oakridge International",
      address: "Gachibowli, Hyderabad",
      classes: ["Kindergarten", "1", "2", "3", "4", "5"],
    },
    {
      name: "Hyderabad Public School",
      address: "Begumpet, Hyderabad",
      classes: ["Nursery", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "CHIREC International School",
      address: "Kondapur, Hyderabad",
      classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "DAV Public School",
      address: "Safilguda, Hyderabad",
      classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "Kendriya Vidyalaya",
      address: "Picket, Secunderabad",
      classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "Army Public School",
      address: "Bolarum, Hyderabad",
      classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "Bharatiya Vidya Bhavan",
      address: "Jubilee Hills, Hyderabad",
      classes: ["Nursery", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "Meridian School",
      address: "Madhapur, Hyderabad",
      classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
  ]);

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------

  const sizeSet = (base) => [
    {
      label: "S (5-6y)",
      chestIn: 26,
      heightCm: 110,
      stock: base + 5,
    },
    {
      label: "M (7-8y)",
      chestIn: 28,
      heightCm: 125,
      stock: base + 8,
    },
    {
      label: "L (9-10y)",
      chestIn: 30,
      heightCm: 140,
      stock: base + 3,
    },
    {
      label: "XL (11-12y)",
      chestIn: 32,
      heightCm: 152,
      stock: base,
    },
  ];

  const oneSize = (stock = 40) => [
    {
      label: "One Size",
      stock,
    },
  ];

  // Placeholder images.
  // These can be replaced later with real uniform photography.
  const image = (name) =>
    `https://placehold.co/600x600/png?text=${encodeURIComponent(name)}`;

  // -------------------------------------------------------------------------
  // PRODUCT TEMPLATES
  // 10 categories × 10 products = 100 products
  // -------------------------------------------------------------------------

  const categories = [
    {
      category: "Shirt",
      products: [
        ["White Half-Sleeve Shirt", 449, "unisex"],
        ["White Full-Sleeve Shirt", 479, "unisex"],
        ["Sky Blue School Shirt", 479, "unisex"],
        ["White Formal Shirt", 499, "boy"],
        ["Blue Oxford Shirt", 529, "unisex"],
        ["Cotton School Shirt", 459, "unisex"],
        ["Premium Uniform Shirt", 599, "unisex"],
        ["Junior School Shirt", 399, "unisex"],
        ["Senior School Shirt", 549, "unisex"],
        ["Winter Uniform Shirt", 579, "unisex"],
      ],
      sizes: true,
    },

    {
      category: "Trousers",
      products: [
        ["Grey Formal Trousers", 549, "boy"],
        ["Navy School Trousers", 579, "boy"],
        ["Black Formal Trousers", 599, "boy"],
        ["Grey Cotton Trousers", 529, "boy"],
        ["Slim Fit School Trousers", 649, "boy"],
        ["Junior School Trousers", 499, "boy"],
        ["Senior School Trousers", 599, "boy"],
        ["Winter Uniform Trousers", 629, "boy"],
        ["Comfort Waist Trousers", 569, "boy"],
        ["Premium School Trousers", 699, "boy"],
      ],
      sizes: true,
    },

    {
      category: "Skirt",
      products: [
        ["Navy Pleated Skirt", 499, "girl"],
        ["Grey Pleated Skirt", 529, "girl"],
        ["School Uniform Skirt", 549, "girl"],
        ["Check Pattern Skirt", 579, "girl"],
        ["Summer Uniform Skirt", 499, "girl"],
        ["Winter Uniform Skirt", 599, "girl"],
        ["Junior Pleated Skirt", 449, "girl"],
        ["Senior Pleated Skirt", 599, "girl"],
        ["Premium School Skirt", 649, "girl"],
        ["Comfort Fit Skirt", 529, "girl"],
      ],
      sizes: true,
    },

    {
      category: "Pinafore",
      products: [
        ["Navy Pinafore", 599, "girl"],
        ["Grey Pinafore", 579, "girl"],
        ["Winter Pinafore", 649, "girl"],
        ["Junior Pinafore", 549, "girl"],
        ["Pleated Pinafore", 629, "girl"],
        ["Classic School Pinafore", 599, "girl"],
        ["Cotton Pinafore", 569, "girl"],
        ["Premium Pinafore", 699, "girl"],
        ["Summer Pinafore", 549, "girl"],
        ["Formal School Pinafore", 649, "girl"],
      ],
      sizes: true,
    },

    {
      category: "Tie",
      products: [
        ["House Stripe Tie", 149, "unisex"],
        ["Classic School Tie", 129, "unisex"],
        ["Blue Stripe Tie", 149, "unisex"],
        ["Red Stripe Tie", 149, "unisex"],
        ["Green House Tie", 159, "unisex"],
        ["Maroon House Tie", 159, "unisex"],
        ["Senior School Tie", 179, "unisex"],
        ["Junior School Tie", 129, "unisex"],
        ["Premium Silk-Look Tie", 199, "unisex"],
        ["Winter Uniform Tie", 169, "unisex"],
      ],
      sizes: false,
    },

    {
      category: "Sweater",
      products: [
        ["V-Neck School Sweater", 699, "unisex"],
        ["Maroon School Sweater", 749, "unisex"],
        ["Navy Wool Sweater", 799, "unisex"],
        ["Grey Winter Sweater", 699, "unisex"],
        ["School Logo Sweater", 849, "unisex"],
        ["Junior Winter Sweater", 649, "unisex"],
        ["Senior Winter Sweater", 799, "unisex"],
        ["Cotton Blend Sweater", 729, "unisex"],
        ["Premium Wool Sweater", 999, "unisex"],
        ["Zip-Up School Sweater", 899, "unisex"],
      ],
      sizes: true,
    },

    {
      category: "Blazer",
      products: [
        ["Navy School Blazer", 1299, "unisex"],
        ["Maroon School Blazer", 1399, "unisex"],
        ["Winter Formal Blazer", 1499, "unisex"],
        ["School Crest Blazer", 1599, "unisex"],
        ["Junior School Blazer", 1199, "unisex"],
        ["Senior School Blazer", 1499, "unisex"],
        ["Premium Wool Blazer", 1899, "unisex"],
        ["Classic Navy Blazer", 1399, "unisex"],
        ["Formal School Blazer", 1599, "unisex"],
        ["House Colour Blazer", 1699, "unisex"],
      ],
      sizes: true,
    },

    {
      category: "Shoes",
      products: [
        ["Classic Black School Shoes", 799, "unisex"],
        ["Velcro School Shoes", 699, "unisex"],
        ["Black Formal Shoes", 899, "unisex"],
        ["Junior School Shoes", 649, "unisex"],
        ["Senior School Shoes", 999, "unisex"],
        ["Premium Leather School Shoes", 1299, "unisex"],
        ["Comfort Fit School Shoes", 849, "unisex"],
        ["Daily Wear School Shoes", 749, "unisex"],
        ["Lightweight School Shoes", 899, "unisex"],
        ["Lace-Up School Shoes", 949, "unisex"],
      ],
      sizes: false,
    },

    {
      category: "PE Kit",
      products: [
        ["School PE T-Shirt", 399, "unisex"],
        ["PE Kit Tracksuit", 899, "unisex"],
        ["Sports Shorts", 349, "unisex"],
        ["Sports Track Pants", 499, "unisex"],
        ["House Sports T-Shirt", 449, "unisex"],
        ["Junior PE Kit", 699, "unisex"],
        ["Senior PE Kit", 799, "unisex"],
        ["Winter Sports Tracksuit", 999, "unisex"],
        ["School Sports Jersey", 549, "unisex"],
        ["Premium PE Tracksuit", 1099, "unisex"],
      ],
      sizes: true,
    },

    {
      category: "Accessory",
      products: [
        ["School Belt", 199, "unisex"],
        ["School Socks - Pack of 3", 249, "unisex"],
        ["School Socks - Pack of 6", 399, "unisex"],
        ["Uniform Hair Ribbon", 149, "girl"],
        ["School Cap", 299, "unisex"],
        ["School ID Card Holder", 129, "unisex"],
        ["Uniform Handkerchief Set", 199, "unisex"],
        ["School Backpack", 899, "unisex"],
        ["Lunch Bag", 499, "unisex"],
        ["Water Bottle", 399, "unisex"],
      ],
      sizes: false,
    },
  ];

  // -------------------------------------------------------------------------
  // CREATE PRODUCTS
  // -------------------------------------------------------------------------

  const products = [];

  let productNumber = 1;

  for (const categoryData of categories) {
    for (let i = 0; i < categoryData.products.length; i++) {
      const [productName, price, gender] = categoryData.products[i];

      // Spread products across the available schools.
      const school = schools[i % schools.length];

      const fullName = `${school.name} ${productName}`;

      const product = {
        name: fullName,

        description: `${productName} designed for the ${school.name} school uniform. Made with comfortable, durable materials suitable for everyday school use.`,

        school: school._id,

        category: categoryData.category,

        gender,

        price,

        images: [
          image(fullName),
        ],

        sizes: categoryData.sizes
          ? sizeSet(5 + (i % 6))
          : oneSize(25 + i * 2),

        sizeGuideNotes: categoryData.sizes
          ? "True to size. Choose one size up if your child prefers a slightly looser fit."
          : "One size option available for this item.",

        isActive: true,
      };

      products.push(product);

      productNumber++;
    }
  }

  await Product.insertMany(products);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});