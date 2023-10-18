const bcrypt = require("bcrypt");
const connectDB = require("../utils/database");
const Admin = require("../models/admin");
const Product = require("../models/product");
const { sign } = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const Register = require("../models/user");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: true,
        message: `Email or password is empty!`,
      });
    }
    await connectDB();

    const Authenticate = await Admin.findOne({ email })
      .select("password")
      .exec();
    if (!Authenticate) {
      return res.send({
        success: false,
        message: "This email does not exists!",
      });
    }
    const match = await bcrypt.compare(password, Authenticate.password);
    if (!match) {
      return res.json({
        success: false,
        message: "Password didn't matched!",
      });
    }
    const JWT_VALUE = sign(email, process.env.JWT_KEY);
    res.cookie("adminToken", JWT_VALUE, {
      httpOnly: true,
      path: "/",
      maxAge: Date.now() + 24 * 60 * 60,
    });
    return res.json({
      success: true,
      message: `Successfully logged in as admin!`,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    const files = req.files;

    if (!files) {
      return res.json({
        success: false,
        message: `File/Files are not included!`,
      });
    }

    if (!files || files.length === 0) {
      return res.json({
        success: false,
        message: "No images found!",
      });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const buffer = file.buffer;
      const fileName = file.originalname;

      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "ProductImages",
        fileName
      );

      // const filePath = path.join('/opt/render/project/src/public/ProductImages', fileName);

      await fs.writeFile(filePath, buffer);
      uploadedFiles.push(fileName);
    }

    return res.json({
      message: "Files Uploaded",
      success: true,
      uploadedFiles,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const uploadProduct = async (req, res) => {
  try {
    await connectDB();
    const {
      title,
      category,
      parentCategory,
      description,
      specification,
      sku,
      price,
      productImages,
    } = req.body;

    if (
      !title ||
      !category ||
      !parentCategory ||
      !description ||
      !sku ||
      !price ||
      !productImages ||
      !specification
    ) {
      return res.json({
        success: false,
        message: `Please fill in all the data!`,
      });
    }

    const productExists = await Product.findOne({ sku }).select("sku").exec();

    if (productExists) {
      return res.json({
        success: false,
        message: "Product Already Exists!",
        errorCode: 403,
      });
    }

    const result = await Product.create({
      title,
      category,
      parentCategory,
      description,
      specification,
      sku,
      price,
      productImages,
    });

    if (!result) {
      res.json({
        success: true,
        message: `Product not uploaded!`,
      });
    }

    return res.json({
      success: true,
      message: "Product uploaded successfully",
      status: "ok",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

const fetchProductByCategory = async (req, res) => {
  try {
    await connectDB();
    const product = await Product.find({
      parentCategory: req.params.category,
    }).exec();

    return res.json({
      success: true,
      message: `Product Fetched Sucessfully!`,
      data: product,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

const fetchProductById = async (req, res) => {
  try {
    await connectDB();
    console.log(req.params.productId);
    const product = await Product.findOne({ sku: req.params.productId }).exec();
    return res.json({
      success: true,
      message: `Product Fetched Sucessfully!`,
      data: product,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find().exec();
    if (!products) {
      return res.json({
        success: false,
        message: `Cannot fetch products`,
      });
    }
    return res.json({
      success: true,
      message: `Products Fetched`,
      data: products,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { process, oid, message, userEmail } = req.body;
    if (!process || !oid || !message || !userEmail) {
      return res.json({
        success: false,
        message: `Enter all the required details!`,
      });
    }
    await connectDB();

    // Define the filter to match the document
    const filter = {
      email: `dev.ashokinteriors@gmail.com`,
      "orders.oid": oid,
      "orders.status.step": process,
    };

    // Define the update to set the "message" and "completed" fields
    const update = {
      $set: {
        "orders.$[outer].status.$[inner].message": message,
        "orders.$[outer].status.$[inner].completed": true,
        "orders.$[outer].completed": process === "delivered" ? true : false,
      },
    };

    // Define the arrayFilters to match the specific elements
    const arrayFilters = [{ "outer.oid": oid }, { "inner.step": process }];

    // Use findOneAndUpdate with the filter, update, and arrayFilters
    const result = await Admin.findOneAndUpdate(filter, update, {
      new: true,
      arrayFilters,
    });

    const userFilter = {
      email: userEmail,
      "order.oid": oid,
      "order.status.step": process,
    };

    // Define the update for the user
    const userUpdate = {
      $set: {
        "order.$[outer].status.$[inner].message": message,
        "order.$[outer].status.$[inner].completed": true,
      },
    };

    // Define the arrayFilters for the user
    const userArrayFilters = [{ "outer.oid": oid }, { "inner.step": process }];

    // Use findOneAndUpdate for the user
    const user = await Register.findOneAndUpdate(userFilter, userUpdate, {
      new: true,
      arrayFilters: userArrayFilters,
    });

    if (!result) {
      return res.json({
        success: false,
        message: `Document not found for email: ${userEmail} and oid: ${oid}, or status not found for process: ${process}`,
      });
    }

    return res.json({
      success: true,
      message: `Status updated for process: ${process}`,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    await connectDB();
    const { orders } = await Admin.findOne({
      email: "dev.ashokinteriors@gmail.com",
    })
      .select("orders")
      .exec();
    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.json({
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      title,
      category,
      parentCategory,
      description,
      specification,
      sku,
      price,
      productImages,
    } = req.body;

    await connectDB();

    const productExists = await Product.findOne({ sku }).select("sku").exec();

    if (!productExists.sku) {
      return res.json({
        success: false,
        message: "Product does not exists",
        errorCode: 403,
      });
    }
    const result = await Product.updateOne(
      { sku },
      {
        title,
        category,
        parentCategory,
        description,
        specification,
        sku,
        price,
        productImages,
      }
    ).exec();

    return res.json({
      success: true,
      message: result,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { sku } = req.params;
    await connectDB();
    const response = await Product.findOneAndDelete({ sku });
    return res.json({
      success: true,
      result: response,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  adminLogin,
  uploadImage,
  uploadProduct,
  fetchProductById,
  fetchProductByCategory,
  fetchAllProducts,
  updateStatus,
  getOrders,
  updateProduct,
  deleteProduct,
};
