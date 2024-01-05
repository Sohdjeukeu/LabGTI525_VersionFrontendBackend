export const alertType = {
    error: -1, success: 1,
}
const alertColor = {
    errorColor: '#ffdddd', successColor: '#ddffdd',
}

export default class General {
    file = {
        fontainesCSV: 'fontaines.csv', compteursCSV: 'compteurs.csv', reseau_cyclable: 'reseau_cyclable.geojson'
    }

    getFileData(file) {
        if (file.split('.')[1] === 'csv')
            return fetch(`/data/${file}`).then(response => response.text());
        else
            return fetch(`/data/${file}`).then(response => response.json());
    }

    /**
     * permet d'afficher un message d'alerte à l'utilisateur
     * @param message message à afficher
     * @param type type de message : succès, erreur ou avertissement
     */
    showAlert(message, type = alertType.success) {
        const alertPAnel = document.getElementById('alert');
        const messageConf = document.getElementById('alert_message');
        if (type === alertType.error) {
            alertPAnel.style.background = alertColor.errorColor
        } else {
            alertPAnel.style.background = alertColor.successColor
        }
        setTimeout(() => alertPAnel.style.visibility = 'hidden', 3000)
        alertPAnel.style.visibility = 'visible'
        messageConf.textContent = message
    }
}
