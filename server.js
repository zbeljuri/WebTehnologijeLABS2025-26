const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 8080;

function hashPassword(password) {
    return Array.from(password).map(ch => {
        const code = ch.charCodeAt(0);
        return String.fromCharCode((code % 16) + 55);
    }).join('');
}

function loadUsers() {
    const file = path.join(__dirname, 'users.csv');
    if (!fs.existsSync(file)) return [];
    const content = fs.readFileSync(file, 'utf-8');
    return content.split(/\r?\n/).filter(Boolean).map(line => {
        const parts = line.split(',');
        const user = {};
        parts.forEach(part => {
            const idx = part.indexOf(':');
            if (idx !== -1) {
                const key = part.slice(0, idx).trim();
                const val = part.slice(idx + 1).trim();
                user[key] = val;
            }
        });
        return user;
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const parsed = querystring.parse(body);
            const username = parsed.username || '';
            const password = parsed.password || '';
            const timestamp = new Date().toISOString();

            const users = loadUsers();
            const found = users.find(u => u.username === username);
            let success = false;
            let responseXml = '';

            if (found) {
                const hashed = hashPassword(password);
                if (hashed === found.password) {
                    success = true;
                    responseXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                        `<response>\n` +
                        `  <success>true</success>\n` +
                        `  <timestamp>${timestamp}</timestamp>\n` +
                        `  <user>\n` +
                        `    <username>${escapeXml(found.username)}</username>\n` +
                        `    <name>${escapeXml(found.name)}</name>\n` +
                        `    <surname>${escapeXml(found.surname)}</surname>\n` +
                        `    <role>${escapeXml(found.role)}</role>\n` +
                        `  </user>\n` +
                        `</response>`;
                }
            }

            if (!success) {
                responseXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                    `<response>\n` +
                    `  <success>false</success>\n` +
                    `  <timestamp>${timestamp}</timestamp>\n` +
                    `  <user>\n` +
                    `    <username>${escapeXml(username)}</username>\n` +
                    `  </user>\n` +
                    `</response>`;
            }

            res.writeHead(200, {'Content-Type': 'application/xml; charset=utf-8'});
            res.end(responseXml);
        });
        return;
    }

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

function escapeXml(unsafe) {
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
