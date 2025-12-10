const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', function(req, res) {
    let tijelo = req.body;
    let novaLinija = tijelo['ime'] + "," + tijelo['prezime'] + "," + tijelo['adresa'] + "," + tijelo['broj_telefona'];
    fs.appendFile('imenik.txt', novaLinija + "\r\n", function(err) {
        if (err) throw err;
        
        fs.readFile('imenik.txt', 'utf8', function(err, data) {
            if (err) throw err;
            
            let rows = data.split("\r\n").filter(row => row).map(row => {
                let cols = row.split(",");
                return `<tr><td>${cols[0]}</td><td>${cols[1]}</td><td>${cols[2]}</td><td>${cols[3]}</td></tr>`;
            }).join("");

            let table = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Imenik</title>
            </head>
            <body>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Adresa</th>
                            <th>Broj telefona</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </body>
            </html>`;

            res.send(table);
        });
    });
});

app.get('/unos', function(req, res) {
    res.sendFile(__dirname + '/forma.html');
});

app.get('/', function(req, res) {
    res.redirect('/unos');
});

app.listen(8085, () => {
    console.log('Server is running on http://localhost:8085');
});