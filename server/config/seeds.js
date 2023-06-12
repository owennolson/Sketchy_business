const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Watercolor" },
    { name: "Oil Paint" },
    { name: "Charcoal" },
    { name: "Pencil" },
    { name: "Animals" },
    { name: "Landscapes" },
    { name: "Portraits" },
      { name: "Still Life" },
 //     { name: [Artist] },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "PLACEHOLDER",
      description: "Description placeholder",
      artist: "Artist placeholder",
      image: "cookie-tin.jpg",
      category: categories[0]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "PLACEHOLDER",
      description: "Description placeholder",
      artist: "Artist placeholder",
      image: "cookie-tin.jpg",
      category: categories[1]._id,
      price: 109.99,
      quantity: 2,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Robert",
    lastName: "Boss",
    email: "RB@happytrees.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Pranksy",
    lastName: "Banksy",
    email: "graffiti@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
