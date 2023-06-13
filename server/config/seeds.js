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
      name: "Fire",
      description: "Firey fire",
      artist: "Bernie McBurnie",
      image: "fire.png",
      category: categories[1]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Mountain",
      description: "Mountains",
      artist: "Montgomery Montague",
      image: "mountain.png",
      category: categories[1]._id,
      price: 109.99,
      quantity: 2,
    },
    {
      name: "Happy Days",
      description: "Neon Car 50s",
      artist: "Fonzie Heyy",
      image: "3carneon.png",
      category: categories[7]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Moo",
      description: "Neon Cow",
      artist: "Fawn Z. Hay",
      image: "4cowneon.png",
      category: categories[4]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Waterfall Canyon",
      description: "Sunset Waterfall Canyon",
      artist: "Roberto Ross",
      image: "6landscape.png",
      category: categories[5]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Saturn",
      description: "Saturn Abstract",
      artist: "G. Jetson",
      image: "16oilabstract.png",
      category: categories[1]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Mountain Stream",
      description: "Mountain Streams",
      artist: "G. Wilder",
      image: "34pencillandscape.png",
      category: categories[3]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Purple Hazy",
      description: "Abstract Landscape",
      artist: "Jimi Joplin",
      image: "26abstract.png",
      category: categories[5]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Moonclouds",
      description: "Moon and Stars Watercolor",
      artist: "Cosmo G. Spacely",
      image: "12moonwatercolor.png",
      category: categories[0]._id,
      price: 220.99,
      quantity: 1,
    },
    {
      name: "Saturn Cubes",
      description: "Cubist Saturn",
      artist: "Pedro Pascal",
      image: "42cubist.png",
      category: categories[1]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Chill",
      description: "Art deco guy",
      artist: "Rockefeller Empire",
      image: "43dude.png",
      category: categories[6]._id,
      price: 200.99,
      quantity: 1,
    },
    {
      name: "Charcoal Mountain",
      description: "Charcoal Mountain",
      artist: "D. Zoolander",
      image: "38charcoallandscape.png",
      category: categories[2]._id,
      price: 200.99,
      quantity: 1,
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
