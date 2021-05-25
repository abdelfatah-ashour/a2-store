const Product = require("../Models/productModels");

module.exports = {
  getProducts: async (req, res, next) => {
    return await Product.find().exec((error, products) => {
      if (error || !products) {
        return res.status(400).json({
          success: false,
          message: "no product available now",
        });
      }
      return res.status(200).json({
        success: true,
        message: products,
      });
    });
  },
  createProduct: async (req, res, next) => {
    const {
      name,
      title,
      company,
      price,
      category,
      description,
      quantity,
    } = req.body;
    const { filename } = req.file;
    if (!filename) {
      return res.status(401).json({
        success: false,
        message: "all fields are required",
      });
    }
    const create = new Product({
      name,
      title,
      price,
      company,
      category,
      description,
      quantity,
      photo: filename,
    });
    await create.save((error, product) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: "updated product successful",
      });
    });
  },
  editProduct: async (req, res, next) => {
    const id = req.params.productID;
    await Product.findById(id).exec((error, product) => {
      if (error || product) {
        return res.status(400).json({
          success: false,
          message: "this product not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "get one product",
      });
    });
  },
  deleteProduct: async (req, res, next) => {
    const id = req.params.productID;
    await Product.findByIdAndDelete(id).exec((error, product) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "this product not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "product was deleted",
      });
    });
  },
};
