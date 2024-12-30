function loadBundesligaMatches() {
    const apiUrl = 'https://api.openligadb.de/getmatchdata/bl1';
    const matchesDiv = document.getElementById('matches');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(match => {
                const matchElement = document.createElement('div');
                matchElement.innerHTML = `
                    <h2>${match.team1.teamName} vs ${match.team2.teamName}</h2>
                    <p>Datum: ${new Date(match.matchDateTime).toLocaleString()}</p>
                    ${match.matchIsFinished ? 
                        `<p>Ergebnis: ${match.matchResults[1].pointsTeam1}:${match.matchResults[1].pointsTeam2}</p>` : 
                        '<p>Spiel noch nicht beendet</p>'}
                `;
                matchesDiv.appendChild(matchElement);
            });
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Daten:', error);
            matchesDiv.innerHTML = '<p>Fehler beim Laden der Spieldaten.</p>';
        });
}

// Funktion aufrufen, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', loadBundesligaMatches);
