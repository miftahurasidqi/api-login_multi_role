// const { response } = require("express");
const Product = require("../models/product");
const Users = require("../models/users");
const { Op } = require("Sequelize");
// const jwt = require("jsonwebtoken");

const getProdcts = async (req, res) => {
  try {
    let product;
    if (req.role === "admin") {
      product = await Product.findAll({
        attributes: ["uu_id", "name", "price"],
        include: [
          {
            model: Users,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      product = await Product.findAll({
        where: {
          user_Id: req.userId,
        },
        attributes: ["uu_id", "name", "price"],

        include: [
          {
            model: Users,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("error bosss");
  }
};

const getProdctsById = async (req, res) => {
  try {
    const findProduct = await Product.findOne({
      where: {
        uu_id: req.params.id,
      },
    });
    if (!findProduct) return res.status(400).json({ msg: "data tidak ditemukan" });

    let product;
    if (req.role === "admin") {
      product = await Product.findOne({
        attributes: ["uu_id", "name", "price"],
        where: {
          id: findProduct.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    } else {
      product = await Product.findOne({
        where: {
          [Op.and]: [{ id: findProduct.id }, { user_Id: req.userId }],
        },
        attributes: ["uu_id", "name", "price"],
        include: [
          {
            model: Users,
            attributes: ["name", "email", "role"],
          },
        ],
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("error bosss");
  }
};

const createProdcts = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = {
      name,
      price,
      user_Id: req.userId,
    };
    await Product.create(product);
    res.status(201).json({
      product,
      msg: "create product sucses",
    });
  } catch (error) {
    res.status(400).json({ msg: "error create boss" });
  }
};

const updateProdcts = async (req, res) => {
  try {
    const findProduct = await Product.findOne({
      where: {
        uu_id: req.params.id,
      },
    });
    if (!findProduct) return res.status(400).json({ msg: "data tidak ditemukan" });

    const { name, price } = req.body;
    if (req.role === "admin") {
      await Product.update(
        { name, price },
        {
          where: {
            id: findProduct.id,
          },
          include: [
            {
              model: Users,
              attributes: ["name", "email", "role"],
            },
          ],
        }
      );
    } else {
      if (req.userId !== findProduct.user_Id) {
        return res.status(403).json({ msg: "data tidak ditemukan" });
      }

      await Product.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ id: findProduct.id }, { user_Id: req.userId }],
          },
          attributes: ["uu_id", "name", "price"],
          include: [
            {
              model: Users,
              attributes: ["name", "email", "role"],
            },
          ],
        }
      );
    }

    res.status(200).json({ msg: "update sucses" });
  } catch (error) {
    res.status(500).json("error bosss");
  }
};
const deleteProdcts = async (req, res) => {
  try {
    const findProduct = await Product.findOne({
      where: {
        uu_id: req.params.id,
      },
    });
    if (!findProduct) return res.status(400).json({ msg: "data tidak ditemukan" });

    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: findProduct.id,
        },
      });
    } else {
      if (req.userId !== findProduct.user_Id) {
        return res.status(403).json({ msg: "data tidak ditemukan" });
      }
      await Product.destroy({
        where: {
          [Op.and]: [{ id: findProduct.id }, { user_Id: req.userId }],
        },
      });
    }

    res.status(200).json({ msg: "delete sucses" });
  } catch (error) {
    res.status(500).json("error bosss");
  }
};

module.exports = {
  getProdcts,
  getProdctsById,
  createProdcts,
  updateProdcts,
  deleteProdcts,
};
