// baza.js
const Sequelize = require("sequelize");

const sequelize = new Sequelize("wt25lv09", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
