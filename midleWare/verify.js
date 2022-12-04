const Users = require("../models/users");

const verifyLogin = async (req, res, next) => {
  try {
    if (!req.session.userId) return res.json({ msg: "login dulu boss" });
    const user = await Users.findOne({
      where: {
        uu_id: req.session.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: "login dulu boss" });
    req.userId = user.id;
    req.role = user.role;
    next();
  } catch (error) {
    res.status(400).json({ msg: "error login" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        uu_id: req.session.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: "login dulu boss" });
    if (user.role !== "admin") return res.status(404).json({ msg: "cah cilik ra oleh akses" });
    // req.userId = user.id;
    // req.role = user.role;
    next();
  } catch (error) {
    res.status(400).json({ msg: "error boss" });
  }
};

module.exports = { verifyLogin, verifyAdmin };
