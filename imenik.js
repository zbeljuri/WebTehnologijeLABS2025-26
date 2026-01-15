// imenik.js
const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const Imenik = sequelize.define(
    "imenik", // BITNO: isto ime kao tabela u bazi
    {
      // BITNO: isto ime kao kolona u bazi
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      ime_prezime: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },

      adresa: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },

      broj_telefona: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    },
    {
      freezeTableName: true, // da ne pravi plural i da ostane imenik
      timestamps: false,     // jer tvoja tabela nema createdAt/updatedAt
    }
  );

  return Imenik;
};
