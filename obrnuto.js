let odgovor = prompt("Unesite neki tekst:", "npr. ovo je test");

if (odgovor != null && odgovor != "") {
  // Obrni redoslijed slova
  let obrnuto = odgovor.split("").reverse().join("");

  
  let r = confirm("Pritisnite OK da prikažete obrnuti tekst u alert boxu, a Cancel za prikaz direktno na stranici");

  if (r) {
    alert(obrnuto);
  } else {
    document.write(obrnuto);
  }
}
