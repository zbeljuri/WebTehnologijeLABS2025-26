const express = require("express");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",        
  database: "wt25lv09" 
});

connection.connect((err) => {
  if (err) {
    console.error("Greška pri konekciji:", err);
    return;
  }
  console.log("Spojeno na MySQL bazu");
});

app.get("/imenik", (req, res) => {
  connection.query(
    "SELECT ime_prezime, adresa, broj_telefona FROM imenik",
    (err, rows) => {
      if (err) {
        res.status(500).send("Greška u upitu");
        return;
      }

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

      rows.forEach(r => {
        html += `
          <tr>
            <td>${r.ime_prezime}</td>
            <td>${r.adresa}</td>
            <td>${r.broj_telefona}</td>
          </tr>
        `;
      });

      html += `
        </table>
      </body>
      </html>
      `;

      res.send(html);
    }
  );
});

app.listen(3000, () => {
  console.log("Server radi na http://localhost:3000/imenik");
});
