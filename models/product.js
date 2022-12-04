const Sequelize = require("sequelize");
const db = require("../config/db.config");
const Users = require("./users");

const { DataTypes } = Sequelize;

const Product = db.define(
  "products",
  {
    uu_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Product);
Product.belongsTo(Users, { foreignKey: "user_Id" });

module.exports = Product;
