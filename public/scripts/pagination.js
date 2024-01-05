const itemsPerPage = 14; // Nombre d'éléments par page
let currentPage = 1;
async function fetchData(page) {
    const response = await fetch(`/gti525/v1/compteurs?page=${page}&limite=${itemsPerPage}`);
    const data = await response.json();

    // Mise à jour de la pagination
    currentPage = page;
    updatePagination();

    // Affichage des éléments
    showItems();
    const paginationSection = document.querySelector('.pagination');
    for (let i=1; i<=data.stats.pages_total; i++) {
        const currentPage = document.createElement('a');
        currentPage.id = "currentPage"
        currentPage.textContent += i;
        paginationSection.appendChild(currentPage);
    }

    // TODO: Mettez à jour votre interface utilisateur avec les données reçues (data.resultats)
}


function updatePagination() {
    const totalItems = document.getElementById('donnees').getElementsByTagName('tr').length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    document.getElementById('currentPage').innerText = currentPage;
    

    const prevBtn = document.querySelector('.pagination .page-btn:first-child');
    const nextBtn = document.querySelector('.pagination .page-btn:last-child');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function changePage(direction) {
    const nextPage = currentPage + direction;

    if (nextPage >= 1) {
        fetchData(nextPage);
    }
}


function showItems() {
    const rows = document.getElementById('donnees').getElementsByTagName('tr');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = 0; i < rows.length; i++) {
        if (i >= startIndex && i < endIndex) {
            rows[i].style.display = 'table-row';
        } else {
            rows[i].style.display = 'none';
        }
    }
}
