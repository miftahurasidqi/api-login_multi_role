const { logIn, Me, logOut } = require("../controlers/auth");
// const verifyToken = require("../midleWare/verifyToken");
// const token = require("../controlers/refreshToken");

const express = require("express");

const router = express.Router();

router.get("/me", Me);
router.post("/login", logIn);
router.delete("/logout", logOut);

module.exports = router;
