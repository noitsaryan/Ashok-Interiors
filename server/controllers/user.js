const Register = require("../models/user");
const bcrypt = require("bcrypt");
const connectDB = require("../utils/database");
const { sign, decode } = require("jsonwebtoken");
const randomKey = require("random-key");
const { sendMail } = require("../services/sendMail");
const Admin = require("../models/admin");
const { orderMail } = require("../services/orderMail");
const Razorpay = require("razorpay");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    await connectDB();

    if (!email || !password) {
      return res.json({
        success: false,
        message: `Email or password empty!`,
      });
    }

    const Authenticate = await Register.findOne({ email })
      .select("password email")
      .exec();

    if (!Authenticate) {
      return res.json({
        success: false,
        message: `Email does not exists!`,
      });
    }

    console.log(Authenticate);

    if (Authenticate.password) {
      const isTrue = await bcrypt.compare(password, Authenticate.password);
      if (isTrue) {
        const userData = {
          email: Authenticate.email,
        };

        const token = sign(userData, process.env.JWT_KEY);

        res.cookie("userToken", token, {
          httpOnly: true,
          path: "/",
          maxAge: Date.now() + 24 * 60 * 60,
        });

        return res.json({
          success: true,
          status: "ok",
          message: "Success Login",
        });
      }
      return res.json({
        success: false,
        errorCode: 401,
        message: "Password Incorrect!",
      });
    }
    return res.json({
      success: false,
      errorCode: 401,
      message: "Email does not exists!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: `One of the following parametres is/are empty!`,
      });
    }

    const token = randomKey.generate();
    await connectDB();

    const newPass = await bcrypt.hash(password, 10);

    const register = await Register.create({
      name,
      email,
      password: newPass,
      token,
      address: "",
      cart: [],
      order: [],
    });

    if (register) {
      return res.json({
        success: true,
        status: "ok",
        message: register,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        errorCode: 403,
        message: "Email already exists!",
      });
    }
    return res.json({
      success: false,
      message: error,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: `Email is empty!`,
      });
    }

    await connectDB();

    const checkEmail = await Register.findOne({ email })
      .select(["token", "name"])
      .exec();

    if (!checkEmail) {
      return res.json({
        success: false,
        errorCode: 401,
        message: "Email not found!",
      });
    }

    await sendMail(
      `http://localhost:3000/forget?token=${checkEmail.token}`,
      checkEmail.name,
      email
    );
    return res.json({
      success: true,
      status: "ok",
      message: "Mail sent",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const validate = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.json({
        success: false,
        message: `Token or password is empty!`,
      });
    }

    const newToken = randomKey.generate();
    await connectDB();
    const authorize = await Register.findOne({ token })
      .select("password token")
      .exec();

    if (!authorize) {
      return res.json({
        success: true,
        message: "Not Authorized",
        errorCode: 401,
      });
    }
    const newPass = await bcrypt.hash(password, 10);
    const result = await Register.updateOne(
      { token },
      { $set: { token: newToken, password: newPass } }
    ).exec();

    if (result.acknowledged) {
      return res.json({
        success: true,
        status: "ok",
        message: "Password updated successfully!",
      });
    }
    return res.json({
      success: false,
      message: `Cannot set new password at the moment!`,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const fetchUser = async (req, res) => {
  try {
    const { email } = req.params;
    await connectDB();
    const authorize = await Register.findOne({ email });
    if (!authorize) {
      return res.json({
        success: false,
        message: `User does not exists!`,
      });
    }

    return res.json({
      success: true,
      message: `Fetched User`,
      data: authorize,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const newOrder = async (req, res) => {
  try {
    const {
      oid,
      payment,
      sku,
      quantity,
      s_address,
      b_address,
      phoneNo,
      email,
    } = req.body;
    if (
      !oid ||
      !payment ||
      !sku ||
      !email ||
      !quantity ||
      !s_address ||
      !b_address ||
      !phoneNo
    ) {
      return res.json({
        success: false,
        message: `Please fill all the empty data!`,
      });
    }
    const orderObject = {
      oid,
      payment,
      status: [
        {
          step: "Created Order",
          completed: true,
          message: `Created Order for Id: ${sku} @ ${new Date(
            Date.now()
          ).toISOString()}!`,
        },
        {
          step: "production",
          completed: false,
          message: ''
        },
        {
          step: "shipping",
          completed: false,
          message: ''
        },
        {
          step: "delivered",
          completed: false,
          message: ''
        },
      ],
      sku,
      quantity,
      shipping_address: s_address,
      billing_address: b_address,
      phone: phoneNo,
      completed: false,
    };

    await connectDB();

    const result = await Register.updateOne(
      { email },
      { $push: { order: orderObject } }
    );

    if (result.nModified === 0) {
      return res.json({
        success: false,
        message: "User not found or no changes made",
      });
    }

    const newObject = {
      ...orderObject,
      email,
    };

    const admin = await Admin.updateOne(
      { email: "dev.ashokinteriors@gmail.com" },
      { $push: { orders: newObject } }
    );

    if (admin.acknowledged) {
      const string = ` Product ID: ${newObject.sku}, Shipping Address : ${s_address},
      Billing Address: ${b_address}, Customer Phone: ${phoneNo}, Customer Email: ${newObject.email}, Quantity: ${newObject.quantity} `;
      await orderMail(string);
    }

    return res.json({
      success: true,
      message: `Successfully added order!`,
      data: newObject
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,

    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateType = req.params.updateType;
    await connectDB();
    if (updateType == "address") {
      const { address, email } = req.body;
      if (!address || !email) {
        return res.json({
          success: false,
          message: `Please enter all required fields`,
        });
      }
      const result = await Register.findOneAndUpdate(
        {
          email,
        },
        {
          $set: {
            shipping_address: address,
          },
        }
      );
      return res.json({
        success: true,
        result,
      });
    } else if (updateType == "personal") {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.json({
          success: false,
          message: `Please enter all required fields`,
        });
      }
      const result = await Register.findOneAndUpdate(
        {
          email,
        },
        {
          $set: {
            name,
          },
        }
      );
      return res.json({
        success: true,
        result,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const cartManagement = async (req, res) => {
  try {
    const { sku, email } = req.body;
    await connectDB();
    if (!sku || !email) {
      return res.json({
        success: false,
        message: `Please enter all required field!`,
      });
    }

    const check = await Register.findOne({ email }).select("cart").exec();
    console.log(check);
    const isSku = check.cart;
    const data = isSku.some((e) => e.sku === sku);

    if (req.params.type === "add") {
      if (data) {
        return res.json({
          success: false,
          message: `Sku is in cart already!`,
        });
      } else {
        const newItem = {
          sku: sku,
        };
        const result = await Register.findOneAndUpdate(
          {
            email,
          },
          {
            $push: {
              cart: newItem,
            },
          },
          { new: true }
        );
        return res.json({
          success: true,
          message: `Added cart successfully`,
          result,
        });
      }
    } else if (req.params.type === "remove") {
      if (!data) {
        return res.json({
          success: false,
          message: `Sku is not in cart!`,
        });
      } else {
        // Remove the SKU from the cart
        const result = await Register.findOneAndUpdate(
          {
            email,
          },
          {
            $pull: {
              cart: { sku: sku },
            },
          },
          { new: true }
        );
        return res.json({
          success: true,
          message: `Removed SKU from cart successfully`,
          result,
        });
      }
    } else {
      return res.json({
        success: false,
        message: `Invalid type! Use 'add' or 'remove'.`,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const checkout = async (req, res) => {
  try {
    const amount = req.params.amount;
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await new instance.orders.create(options);
    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getCookie = async (req, res) => {
  try {
    const data = req.cookies;
    const value = decode(data.userToken);
    if (!data) {
      return res.json({
        message: `Token not found!`,
      });
    }
    return res.json({
      success: true,
      data,
      value,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const clearCookie = async (req, res) => {
  try {
    res.clearCookie("userToken");
    res.clearCookie("adminToken");

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  userLogin,
  userRegister,
  forgetPassword,
  validate,
  fetchUser,
  newOrder,
  updateUser,
  cartManagement,
  checkout,
  getCookie,
  clearCookie,
};
