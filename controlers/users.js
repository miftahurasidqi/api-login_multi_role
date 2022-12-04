const Users = require("../models/users");
const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const user = await Users.findAll({
      attributes: ["uu_id", "name", "email", "role"],
    });
    res.status(200).json({
      user,
      msg: "Data Users",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUsersById = async (req, res) => {
  try {
    const user = await Users.findOne({
      attributes: ["uu_id", "name", "email", "role"],
      where: {
        uu_id: req.params.id,
      },
    });
    res.status(200).json({
      user,
      msg: "Data Users",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createUsers = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const findUser = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (findUser) return res.json({ msg: "email terdaftar" });
  if (password !== confirmPassword) return res.status(400).json({ msg: "password dan confirm password tidak cocok" });
  const hashPassword = await bcrypt.hash(password, 2);
  const user = {
    name,
    email,
    password: hashPassword,
    role,
  };
  try {
    await Users.create(user);
    res.status(201).json({
      user,
      msg: "register sucses",
    });
  } catch (error) {
    //   // res.status(400).json({ msg: error.message });
    res.status(400).json({ msg: "error boss" });
  }
};

const updateUsers = async (req, res) => {
  try {
    const findUser = await Users.findOne({
      where: {
        uu_id: req.params.id,
      },
    });
    if (!findUser) return res.status(404).json({ msg: "ueser ora eneng" });

    const { name, email, password, confirmPassword, role } = req.body;

    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = findUser.password;
    } else {
      hashPassword = await bcrypt.hash(password, 2);
    }
    if (password !== confirmPassword) return res.status(400).json({ msg: "password dan confirm password tidak cocok" });

    const user = {
      name,
      email,
      password: hashPassword,
      role,
    };
    await Users.update(user, {
      where: {
        id: findUser.id,
      },
    });

    res.status(200).json({
      user,
      msg: "update sucses",
    });
  } catch (error) {
    res.status(400).json({ msg: "error boss" });
  }
};
const deleteUsers = async (req, res) => {
  try {
    const findUser = await Users.findOne({
      where: {
        uu_id: req.params.id,
      },
    });
    if (!findUser) return res.status(404).json({ msg: "ueser ora eneng" });

    await Users.destroy({
      where: {
        id: findUser.id,
      },
    });

    res.status(200).json({
      msg: "delete sucses",
    });
  } catch (error) {
    res.status(400).json({ msg: "error boss" });
  }
};

module.exports = {
  getUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
};
