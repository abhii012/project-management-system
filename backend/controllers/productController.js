const Product = require("../models/Product");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    console.log("👉 REQUEST HIT CREATE PRODUCT");
    console.log("👉 BODY:", req.body);

    const { name, price, category, inStock } = req.body;

if (!name || !price || !category) {
      console.log("❌ Validation failed");
      return res.status(400).json({
        message: "Name, price and category are required"
      });
    }

if (!name.trim()) {
  return res.status(400).json({
    message: "Product name cannot be empty"
  });
}
if (typeof name !== "string") {
  return res.status(400).json({
    message: "Product name must be a string"
  });
}

if (!isNaN(name)) {
  return res.status(400).json({
    message: "Product name cannot be a number"
  });
}


    const product = await Product.create({
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      inStock
    });

    console.log("✅ Product created:", product);

    res.status(201).json(product);

  } catch (err) {
    console.log("🔥 ERROR OCCURRED:");
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (price && price < 0) {
      return res.status(400).json({
        message: "Price must be positive"
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name: name.trim() }),
        ...(price !== undefined && { price }),
        ...(category && { category: category.trim() }),
        ...(req.body.inStock !== undefined && { inStock: req.body.inStock })
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};