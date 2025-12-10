const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());


// GET /zadaci  
app.get('/zadaci', (req, res) => {
    fs.readFile('zadaci.csv', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Greska pri citanju datoteke." });

        let lines = data.split('\n').filter(line => line.trim() !== '');

        let zadaci = lines.map(line => {
            let [id, naziv, opis] = line.split(',');
            return { id, naziv, opis };
        });

        res.json(zadaci);
    });
});


// POST /zadatak 

app.post('/zadatak', (req, res) => {
    const { id, naziv, opis } = req.body;

    // Provjera validnosti
    if (!id || !naziv || !opis) {
        return res.json({ status: "Nedostaju podaci!" });
    }

    fs.readFile('zadaci.csv', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Greska pri citanju datoteke." });

        let lines = data.split('\n').filter(line => line.trim() !== '');

        // ID 
        for (let line of lines) {
            let [postojeciId] = line.split(',');
            if (postojeciId === String(id)) {
                return res.json({ status: "Id vec postoji!" });
            }
        }

        // Ako ne postoji, upisujemo novi zadatak
        const noviZadatak = `${id},${naziv},${opis}\n`;

        fs.appendFile('zadaci.csv', noviZadatak, err => {
            if (err) return res.status(500).json({ error: "Greska pri upisu u datoteku." });

            res.json({ status: "Zadatak je uspjesno dodan!" });
        });
    });
});

// Pokretanje servera
app.listen(3000, () => {
    console.log("Server radi na http://localhost:3000");
});
