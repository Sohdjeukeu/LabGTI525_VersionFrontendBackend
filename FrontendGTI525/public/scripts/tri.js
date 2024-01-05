let sortColumn = ""; // Variable pour stocker la colonne de tri
let sortOrder = 1; // Variable pour stocker l'ordre de tri (1: croissant, -1: décroissant)

function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll('td')[columnIndex].textContent;
        const cellB = rowB.querySelectorAll('td')[columnIndex].textContent;

        // Vérifie si les cellules contiennent des nombres
        const isNumber = !isNaN(cellA) && !isNaN(cellB);

        if (isNumber) {
            const numA = parseFloat(cellA);
            const numB = parseFloat(cellB);
            return (numA - numB) * sortOrder;
        } else {
            return cellA.localeCompare(cellB) * sortOrder;
        }
    });

    // Efface le contenu actuel de tbody
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Ajoute les lignes triées à tbody
    rows.forEach(row => {
        tbody.appendChild(row);
    });
}

// Gestionnaire d'événement pour le clic sur un en-tête de colonne
document.querySelectorAll('th').forEach((th, columnIndex) => {
    th.addEventListener('click', () => {
        const column = th.textContent;

        if (column === sortColumn) {
            // Inverse l'ordre de tri si la même colonne est cliquée à nouveau
            sortOrder *= -1;
        } else {
            // Réinitialise l'ordre de tri à croissant si une nouvelle colonne est cliquée
            sortOrder = 1;
            sortColumn = column;
        }

        sortTable(columnIndex);
    });
});

// Appel initial pour trier par la première colonne au chargement de la page
// sortTable(0);
