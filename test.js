const { dodajDva, jednom, brojacModul } = require('./zadaci');

console.log('Zadatak 1 primeri:');
console.log(dodajDva(1)); // 3
console.log(dodajDva(2)); // 4
console.log(dodajDva(10)); // 12

console.log('\nZadatak 1 - jednom primer:');
const jednomFunkcija = jednom(dodajDva);
console.log(jednomFunkcija(4)); // 6
console.log(jednomFunkcija(10)); // 6
console.log(jednomFunkcija(9001)); // 6

console.log('\nZadatak 2 - brojački modul:');
console.log(brojacModul.dodaj()); // 1
console.log(brojacModul.dodaj()); // 2
brojacModul.resetuj();
console.log(brojacModul.dodaj()); // 1
