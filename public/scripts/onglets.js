const onglets = document.querySelectorAll(".onglets");
const contenu = document.querySelectorAll(".contenu");
let index = 0;

onglets.forEach(onglet => {
    onglet.addEventListener("click", () => {
        if (onglet.classList.contains('onglet-actif')) {
            return;
        } else {
            onglet.classList.add('onglet-actif');
        }

        index = onglet.getAttribute('data-anim');

        onglets.forEach(ongletActif => {
            if (ongletActif.getAttribute('data-anim') != index) 
                ongletActif.classList.remove('onglet-actif');
        });
        
        contenu.forEach(contenuActif => {
            if (contenuActif.getAttribute('data-anim') == index) {
                contenuActif.style.display = 'block';
            } else {
                contenuActif.style.display = 'none';
            }
        });
    })
});
// Source: https://www.youtube.com/watch?v=JuEL_R4T7uI&ab_channel=%C3%89coleduWeb