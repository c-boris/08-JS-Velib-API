const stationDataElement = document.getElementById('station-data');

        // Fonction pour afficher les données de la station Velib
        const showStationData = (element, stationData) => {
            element.innerHTML = `
                <h2>Station : ${stationData.name}</h2>
                <p>${stationData.capacity} capacity</p>
                <p>${stationData.mechanical} classical Velibs</p>
                <p>${stationData.ebike} electric Velibs</p>
                <p>Latitude: ${stationData.coordonnees_geo.lat}</p>
                <p>Longitude: ${stationData.coordonnees_geo.lon}</p>
            `;
        }

        const updateStationData = () => {
            // Faites une requête à l'API Paris Open Data Velib pour obtenir les données de la station
            fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=20&refine=name%3A%22Alexandre%20Dumas%20-%20Voltaire%22', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const stationData = data.results[0];
                    showStationData(stationDataElement, stationData);
                } else {
                    stationDataElement.innerHTML = 'Aucune donnée trouvée pour cette station.';
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données Velib :', error);
            });
        }

        // Mettez à jour les données de la station Velib toutes les 60 secondes (60000 millisecondes)
        setInterval(updateStationData, 60000);

        // Appelez updateStationData une première fois pour afficher les données au chargement de la page
        updateStationData();