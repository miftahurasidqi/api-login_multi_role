const Users = require("../models/users");
const bcrypt = require("bcrypt");

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!findUser) return res.status(404).json({ msg: "ueser ora eneng" });
    const verifyPassword = await bcrypt.compare(password, findUser.password);
    if (!verifyPassword) return res.status(400).json({ msg: "password salah" });

    // req.session.id = findUser.uu_id;
    req.session.userId = findUser.uu_id;
    const user = {
      uu_id: findUser.uu_id,
      name: findUser.name,
      email,
      role: findUser.role,
    };

    res.status(200).json({
      user,
      msg: "login sucses",
    });
  } catch (error) {
    res.status(404).json({ msg: "error boss" });
  }
};

const Me = async (req, res) => {
  try {
    if (!req.session.userId) return res.json({ msg: "login dulu boss" });
    const user = await Users.findOne({
      attributes: ["uu_id", "name", "email", "role"],
      where: {
        uu_id: req.session.userId,
      },
    });

    if (!user) return res.status(404).json({ msg: "login dulu boss" });

    res.status(200).json({
      user,
      msg: "data",
    });
  } catch (error) {
    res.status(400).json({ msg: "error boss" });
  }
};

const logOut = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: "ora iso logOut" });
      res.status(200).json({ msg: "logout sucses" });
    });
  } catch (error) {
    res.status(400).json({ msg: "error boss" });
  }
};

module.exports = {
  logIn,
  Me,
  logOut,
};
