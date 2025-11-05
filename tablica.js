document.write("<table>");

// prvi red (zaglavlje kolona)
document.write("<tr><th></th>");
for (let i = 1; i <= 10; i++) {
  document.write("<th>" + i + "</th>");
}
document.write("</tr>");

// redovi tabele
for (let i = 1; i <= 10; i++) {
  document.write("<tr>");
  document.write("<th>" + i + "</th>"); // zaglavlje reda
  for (let j = 1; j <= 10; j++) {
    document.write("<td>" + (i * j) + "</td>");
  }
  document.write("</tr>");
}

document.write("</table>");
