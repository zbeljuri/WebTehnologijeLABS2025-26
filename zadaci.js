// Zadatak 1
function dodajDva(x) {
  return x + 2;
}

function jednom(callback) {
  let called = false;
  let value;
  return function(...args) {
    if (!called) {
      called = true;
      value = callback.apply(this, args);
    }
    return value;
  };
}

// Zadatak 2 - brojački modul
const brojacModul = (function() {
  let brojac = 0;
  return {
    dodaj: function() {
      brojac += 1;
      return brojac;
    },
    resetuj: function() {
      brojac = 0;
    }
  };
})();

module.exports = { dodajDva, jednom, brojacModul };
