const alertType = {
    error: -1, warning: 0, success: 1,
}
const alertColor = {
    errorColor: "w3-pale-red", warningColor: "w3-pale-yellow", successColor: "w3-pale-green",
}

export class PageManager {

    constructor(paginationContainerID, limit = 10) {
        this.limit = limit;
        this.numberOfPage = 1
        this.currentPageNumber = 1;
        this.dataLegth = 10
        this.firstNumber = 1;
        this.lastNumber = 5
        this.paginationContainer = document.getElementById(paginationContainerID);
        this.numberContainer = document.createElement('div')
        this.request = {}
    }

    getPageRequest() {
        let moreRequest = ''
        for (const key in this.request) {
            if (this.request[key] !== 'Tout')
                moreRequest = moreRequest + '&' + key + '=' + this.request[key]
        }
        if (this.currentPageNumber === 1)
            return `?limite=${this.limit}` + moreRequest
        else
            return `?limite=${this.limit}&page=${this.currentPageNumber}` + moreRequest
    }

    /**
     * Gère le retour en arrienr
     * @param nextedFunction la fontion à appeler lorsqu'on retourne
     */
    nex(nextedFunction) {
        if (this.currentPageNumber < this.numberOfPage) {
            this.currentPageNumber++
            this._changePage(this.currentPageNumber, nextedFunction)
        }
    }

    /**
     * Gère le retour en arrière
     * @param backedFunction la fontion à appeler lorsqu'on retourne
     */
    back(backedFunction) {
        if (this.currentPageNumber > 1) {
            this.currentPageNumber--
            this._changePage(this.currentPageNumber, backedFunction)
        }
    }

    /**
     * créer l'ensemble des élément de pagination y compris les boutons suivant et retour et les différents numéro
     * @param callback  la fonction a éxécuter avec la pagination
     */
    buildPaginationManger(callback) {
        this.paginationContainer.innerText = ''
        this.numberContainer.innerText = ''

        this.numberOfPage = Math.ceil(this.dataLegth / this.limit) ///Math.min(this.lastNumber, Math.ceil(this.dataLegth/this.limit))
        this.lastNumber = Math.min(5, this.numberOfPage)
        this.currentPageNumber = 1

        if (this.numberOfPage > 1) {

            const backButton = this.getBackButton();
            backButton.addEventListener("click", () => self.back(callback))
            this.paginationContainer.appendChild(backButton)

            const self = this
            for (let i = this.firstNumber; i <= this.lastNumber; i++) {
                const paginationNumber = this._createButton(`${i}`, callback)

                if (i === 1) {
                    paginationNumber.classList.add('active_page')
                }
            }
            this.paginationContainer.appendChild(this.numberContainer)

            const nextButton = this.getNextButton()
            nextButton.addEventListener("click", () => self.nex(callback))
            this.paginationContainer.appendChild(nextButton)
        }

    }

    /**
     * Permet de recuperer le bouton suivant afin de le manipuler
     * @returns {HTMLElement} le bouton suivant
     */
    getNextButton() {
        const nextButton = document.createElement('a');
        nextButton.classList.add('w3-button', 'w3-hover-pale-green', 'pagination_number');
        nextButton.id = 'next'
        nextButton.textContent = '\u00bb'
        return nextButton
    }

    /**
     * Permet de recuperer le bouton retour afin de le manipuler
     * @returns {HTMLElement} le bouton reetour
     */
    getBackButton() {
        const backButton = document.createElement('a');
        backButton.classList.add('w3-button', 'w3-hover-pale-green', 'pagination_number');
        backButton.id = 'back'
        backButton.textContent = '\u00ab'
        return backButton
    }

    /**
     * Permet de créer les boutons de navigation ; Généralement les boutons suivants et retours
     * @param value l'icon du bouton ; ici ce sera des code html
     * @param callback
     * @param end
     *
     * @returns {HTMLAnchorElement} le bouton en question
     * @private
     */
    _createButton(value, callback, end = true) {
        const button = document.createElement('a');
        button.classList.add('w3-button', 'w3-hover-pale-green', 'pagination_number');
        button.textContent = value
        if (end)
            this.numberContainer.appendChild(button);
        else
            this.numberContainer.insertBefore(button, this.numberContainer.firstChild)
        const self = this
        button.addEventListener('click', function (e) {
            self._changePage(value, callback)
            callback()
        })
        return button
    }

    /**
     * Permet de gerer le changement les changement des pages
     *
     * @param targetPageNumber le numéro de page actuelle
     * @param callback la fonction appeler une fois que la page ait été changée
     * @private
     */
    _changePage(targetPageNumber, callback) {

        this.currentPageNumber = Number(targetPageNumber)

        if (this.currentPageNumber === this.lastNumber && this.currentPageNumber < this.numberOfPage) {
            this.lastNumber++
            this.firstNumber++
            this._createButton(`${this.lastNumber}`, callback)
            this.numberContainer.firstChild.remove()
        }

        if (this.currentPageNumber === this.firstNumber && this.firstNumber > 1) {
            this.lastNumber--
            this.firstNumber--
            this._createButton(`${this.firstNumber}`, callback, false)
            this.numberContainer.lastChild.remove()
        }

        const currentPage = document.getElementsByClassName('active_page')[0]
        if (currentPage)
            currentPage.classList.remove('active_page');

        let targetPage = this.numberContainer.children[Number(targetPageNumber - this.firstNumber)];
        targetPage.classList.add('active_page');
        callback()
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
            alertPAnel.classList.add(alertColor.errorColor)
        } else if (type === alertType.warning) {
            alertPAnel.classList.add(alertColor.warningColor)
        } else {
            alertPAnel.classList.add(alertColor.successColor)
        }
        setTimeout(() => alertPAnel.style.visibility = 'hidden', 3000)
        alertPAnel.style.visibility = 'visible'
        messageConf.textContent = message
    }
}