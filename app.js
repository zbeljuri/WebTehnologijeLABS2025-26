// app.js
const express = require("express");
const sequelize = require("./baza.js");

const app = express();

// Model
const Imenik = require("./imenik.js")(sequelize);

// Sync bez force (NE DIRAMO tabelu, samo provjera)
Imenik.sync()
  .then(() => console.log("Model povezan sa tabelom imenik."))
  .catch((err) => console.error("Sync greška:", err));

// GET /imenik -> HTML tabela
app.get("/imenik", async (req, res) => {
  try {
    const rows = await Imenik.findAll({ order: [["id", "ASC"]] });

    let html = `
      <html>
      <head>
        <meta charset="utf-8">
        <title>Imenik</title>
        <style>
          table { border-collapse: collapse; width: 70%; }
          th, td { border: 1px solid black; padding: 8px; }
          th { background: #eee; }
        </style>
      </head>
      <body>
        <h2>Imenik</h2>
        <table>
          <tr>
            <th>Ime i prezime</th>
            <th>Adresa</th>
            <th>Broj telefona</th>
          </tr>
    `;

    rows.forEach((r) => {
      html += `
        <tr>
          <td>${r.ime_prezime ?? ""}</td>
          <td>${r.adresa ?? ""}</td>
          <td>${r.broj_telefona ?? ""}</td>
        </tr>
      `;
    });

    html += `
        </table>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Greška pri dohvaćanju imenika");
  }
});

app.listen(3000, () => {
  console.log("Server radi na http://localhost:3000/imenik");
});
