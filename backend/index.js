const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

app.use(express.json());
app.use(cors({
    origin: ["e-com-api-sand.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));

mongoose.connect("mongodb+srv://meedfaji:a7fEYQyyAMpxrrKs@cluster0.407bt2t.mongodb.net/e-com?retryWrites=true&w=majority&appName=Cluster0");

const port = 4000;
app.listen(port, (error) => {
  if (!error) {
    console.log("server is running on port : " + port);
  } else {
    console.log("Error : " + error);
  }
});

app.get("/", (req, res) => {
  res.send("Express app is running");
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("./upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

const Product = mongoose.model("Products", {
  id: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avialable: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

app.post("/product", async (req, res) => {
  const products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product = products.slice(-1)[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log(product);
  await product.save();
  console.log("Saved !");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.post("/delete-product", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product removed !");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/products", async (req, res) => {
  let products = await Product.find({});
  console.log("Products fetched !");
  res.send(products);
});

app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ errors: "Product not found" });
    }

    console.log("Product fetched: ", product);
    res.json(product);
  } catch (error) {
    console.error("Error fetching product: ", error);
    res.status(500).json({ errors: "Internal server error" });
  }
});

app.put("/product/:id", async (req, res) => {});

app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "Email already exists !" });
  }

  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password !" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email !" });
  }
});

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.sort(() => Math.random() - 0.5).slice(0, 8);
  console.log("New collection fetched !");
  res.send(newCollection);
});

app.get("/popularwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let newCollection = products.sort(() => Math.random() - 0.5).slice(0, 4);
  console.log("Popular in women fetched !");
  res.send(newCollection);
});

const fetchUser = async (req, res, next) => {
  const token = req.header("Auth-Token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token !" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please authenticate using valid token !" });
      console.log(error);
    }
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  console.log("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    console.log("Removed");
  }
});

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("get cart");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
