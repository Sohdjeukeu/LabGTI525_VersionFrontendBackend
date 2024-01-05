export const alertType = {
    error: -1, warning: 0, success: 1,
}
export const alertColor = {
    errorColor: "w3-pale-reg", warningColor: "w3-pale-yellow", successColor: "w3-pale-green",
}

export class PIManager {

    constructor() {
        this.url = '/gti525/v1/pointsdinteret'
    }

    async addPI(PI) {
        const response = await
            fetch(this.url, {
                method: 'POST', headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, body: JSON.stringify(PI)
            })
        return await response.json()
    }


    async getLastID() {
        const reponse = await this.getAllPI();
        const data = reponse.data.data
        const ids = []
        data.forEach(pi => {
            ids.push(pi.ID)
        })
        return Math.max(...ids)
    }

    async updatePI(PI) {
        const reponse = await fetch(this.url + '/' + PI.ID, {
            method: 'PATCH', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify(PI)
        })
        return await reponse.json()
    }

    async deletePI(idPI) {
        const reponse = await fetch(this.url + `/` + idPI, {
            method: 'DELETE',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        })
        return await reponse.json()
    }

    async getPI(idPI) {
        const response = await fetch(this.url + '/' + idPI);
        return await response.json()
    }

    async getSomePI(params) {
        const response = await fetch(this.url + params);
        return await response.json()
    }

    async getAllPI() {
        const response = await fetch(this.url);
        return await response.json()
    }
}