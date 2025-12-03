const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {

        fs.readFile('imenik.txt', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Greška pri čitanju datoteke' }));
            }

            const text = data.toString('utf-8').trim();
            const lines = text.split('\n');

            const rezultat = lines.map(line => {
                const [ime, prezime, adresa, broj] = line.split(',');

                return {
                    ime: ime,
                    prezime: prezime,
                    adresa: adresa,
                    broj_telefona: broj
                };
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rezultat, null, 2));
        });

    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Dozvoljen je samo GET zahtjev' }));
    }
});

server.listen(8080, () => {
    console.log("Server radi na http://localhost:8080");
});
