const { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } = require("../controlers/users");
const { verifyLogin, verifyAdmin } = require("../midleWare/verify");

const express = require("express");

const router = express.Router();

router.get("/users", verifyLogin, verifyAdmin, getUsers);
router.get("/users/:id", verifyLogin, verifyAdmin, getUsersById);
router.post("/users", verifyLogin, verifyAdmin, createUsers);
router.patch("/users/:id", verifyLogin, verifyAdmin, updateUsers);
router.delete("/users/:id", verifyLogin, verifyAdmin, deleteUsers);

module.exports = router;
