
window.onload = function() {
  
  let prva = document.getElementById("prva");
  let druga = document.getElementById("druga");


  prva.onclick = function() { toggle("prva", "prvaLista"); }
  druga.onclick = function() { toggle("druga", "drugaLista"); }
}


function toggle(idGodine, idListe) {
  let godina = document.getElementById(idGodine);
  let lista = document.getElementById(idListe);

  if (lista.style.display === "block") {
    lista.style.display = "none";
    godina.textContent = "+ " + godina.textContent.substring(2);
  } else {
    lista.style.display = "block";
    godina.textContent = "- " + godina.textContent.substring(2);
  }
}
