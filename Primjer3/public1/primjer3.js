function getAccessToken(proslijedi){
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
            proslijedi(null, JSON.parse(ajax.responseText).access_token);
        else if (ajax.readyState == 4)
            proslijedi(ajax.status, null);
    };

    ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader(
        "Authorization",
        "Basic " + btoa("3tYgDetyty9kuKZnLj:gMH6fPcSY8KeUdyFTqvLLDnCxUXcfdYr")   // ⬅ zamijeni svojim vrijednostima
    );
    ajax.send("grant_type=client_credentials");
}

function listRepositories(error, token){
    if(error) {
        console.error("Greška:", error);
        return;
    }

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if (ajax.readyState == 4 && ajax.status == 200) {

            let podaci = JSON.parse(ajax.responseText);

            // Kreiranje HTML tabele
            let html = "<table border='1' cellpadding='5'>";
            html += "<tr><th>Naziv repozitorija</th><th>Vlasnik</th></tr>";

            for (let i = 0; i < podaci.values.length; i++) {
                html += "<tr>";
                html += "<td>" + podaci.values[i].name + "</td>";
                html += "<td>" + podaci.values[i].owner.username + "</td>";
                html += "</tr>";
            }

            html += "</table>";

            // Ispis u div sa id="tabela"
            document.getElementById("tabela").innerHTML = html;
        }
        else if (ajax.readyState == 4) {
            console.error("HTTP greška:", ajax.status);
        }
    };

    ajax.open(
        "GET",
        "https://api.bitbucket.org/2.0/repositories?role=member",
        true
    );
    ajax.setRequestHeader("Authorization", "Bearer " + token);
    ajax.send();
}
window.onload = function(){
    getAccessToken(listRepositories);
};
