const express = require('express');
const app = express();

app.use(express.static('public1'));

app.listen(8085, () => {
    console.log("Server pokrenut na http://localhost:8085");
});
