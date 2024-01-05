
export default class General {
    file = {
        fontainesCSV: 'fontaines.csv',
        compteursCSV: 'compteurs.csv',
        reseau_cyclable: 'reseau_cyclable.geojson'
    }

    getFileData(file) {
        if (file.split('.')[1] === 'csv')
            return fetch(`/data/${file}`).then(response => response.text());
        else
            return fetch(`/data/${file}`).then(response => response.json());
    }

}

export function showTable(file, columnsToDisplayIndex, mot_cle = 'Tous', searchColumn = 1) {
    fetch(`/data/${file}`).then(response => response.text()).then(data => {
            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = "";
            let rows = data.trim().split('\r\n').splice(1);
            rows.forEach(row => {
                const tableRow = document.createElement('tr');
                const columns = row.split(',');
                const columnToDisplay = [];
                for (let i = 0; i < columnsToDisplayIndex.length; i++) {
                    columnToDisplay[i] = columns[columnsToDisplayIndex[i]]
                }
                columnToDisplay.forEach(col => {
                    const tableCell = document.createElement('td');
                    if (columns[searchColumn].toLowerCase().includes(mot_cle.toString().toLowerCase())) {
                        tableCell.textContent = col;
                        tableRow.appendChild(tableCell);
                        tableBody.appendChild(tableRow);
                    } else if (mot_cle === 'Tous') {
                        tableCell.textContent = col;
                        tableRow.appendChild(tableCell);
                        tableBody.appendChild(tableRow);
                    }
                })
            })
        }
    )
}


