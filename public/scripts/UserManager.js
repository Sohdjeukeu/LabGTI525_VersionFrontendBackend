import Generale, {alertType} from "./general.js";

const generale = new Generale()
const urlBase = '/gti525/v1/'

const btnCreerCompte = document.getElementById('creer_compte')
const btnLogin = document.getElementById('se_connecter')
const btnLogout = document.getElementById('se_deconnecter')

const bienvenue = document.getElementById('bienvenue')


const inputNom = document.getElementById('nom_famille')
const inputPrenom = document.getElementById('prenom')
const inputUserName = document.getElementById('username')
const inputMotPasse = document.getElementById('mot_passe')

const userModal = document.getElementById('user_modal')

btnLogin.addEventListener('click', () => {
    lancerUserModal()
})
btnCreerCompte.addEventListener('click', () => {
    lancerUserModal('register')
})

btnLogout.addEventListener('click', async () => {
    await seDeconnecter()
})

function lancerUserModal(action = 'login') {


    const btnAnnuler = document.getElementById('user_modal_bouton_annuler')
    const btnFermer = document.getElementById('user_modal_icon-fermer')
    const btnEnregistrer = document.getElementById('user_modal_bouton_enregistrer')

    const nomDiv = document.getElementById('nom_div')
    const prenomDiv = document.getElementById('prenom_div')
    const userForm = document.getElementById('user-form')
    const modalTitle = document.getElementById('modal_title')


    if (action === 'login') {
        nomDiv.style.display = 'none'
        prenomDiv.style.display = 'none'
        userForm.style.height = '120px'
        modalTitle.textContent = 'Connexion'
    } else {
        nomDiv.style.display = 'flex'
        prenomDiv.style.display = 'flex'
        userForm.style.height = '225px'
        modalTitle.textContent = 'Inscription'
    }

    btnAnnuler.addEventListener('click', () => {
        userModal.close()

    })

    btnFermer.addEventListener('click', () => {
        userModal.close()

    })
    btnEnregistrer.addEventListener('click', async () => {
        let body;
        if (action === 'login') {
            body = {userName: inputUserName.value, motPasse: inputMotPasse.value}
        } else {
            body = {
                prenom: inputPrenom.value,
                nom: inputNom.value,
                userName: inputUserName.value,
                motPasse: inputMotPasse.value
            }
        }
        await loginAndLogout(action, body)

    })
    userModal.showModal()
}

async function loginAndLogout(url, body) {
    fetch(urlBase + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify(body)
    }).then(reponse => reponse.json()).then(data => {
        const statut = data.statut
        if (statut === 'success') {
            generale.showAlert(data.message)
            window.localStorage.setItem('statut', 'yes')
            window.localStorage.setItem('username', data.user.userName)
            verification()
            userModal.close()
        } else
            generale.showAlert(data.message, alertType.error)
    })
}

async function seConnecter() {

}

async function seDeconnecter() {
    window.localStorage.setItem('statut', 'no')
    window.localStorage.setItem('username', 'Bienvenue')
    generale.showAlert('Vous êtes bien déconnecté! À la prochaine')
    verification()
    window.location.reload()
}

function verification() {
    const isConnecter = window.localStorage.getItem('statut')
    const userName = window.localStorage.getItem('username')

    if (isConnecter === 'yes') {
        btnLogin.style.display = 'none'
        btnCreerCompte.style.display = 'none'
        btnLogout.style.display = 'flex'
        bienvenue.textContent = userName
    } else {
        btnLogin.style.display = 'flex'
        btnCreerCompte.style.display = 'flex'
        btnLogout.style.display = 'none'
        bienvenue.textContent = 'Bienvenue'
    }

    const iconDropDown = document.createElement('i')
    iconDropDown.classList.add('fa', 'fa-caret-down')
    bienvenue.appendChild(iconDropDown)
}

window.addEventListener('DOMContentLoaded', () => {
    verification()
})