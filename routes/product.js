const { getProdcts, getProdctsById, createProdcts, updateProdcts, deleteProdcts } = require("../controlers/product");
const { verifyLogin, verifyAdmin } = require("../midleWare/verify");

// const token = require("../controlers/refreshToken");

const express = require("express");

const router = express.Router();

router.get("/products", verifyLogin, getProdcts);
router.get("/products/:id", verifyLogin, getProdctsById);
router.post("/products", verifyLogin, createProdcts);
router.patch("/products/:id", verifyLogin, updateProdcts);
router.delete("/products/:id", verifyLogin, deleteProdcts);

module.exports = router;
