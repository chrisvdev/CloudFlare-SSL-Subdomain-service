const axios = require("axios");
const CF_API_URL = 'https://api.cloudflare.com/client/v4/'
const CERTIFICATES = 'certificates'
const DNS_RECORDS = '/zones/{zone_identifier}/dns_records'

class Cloudflare {
    constructor(email, key, zone) {
        this.key = key
        this.email = email
        this.zone = zone
        this.headers = { 'X-Auth-Key': this.key, 'X-Auth-Email': this.email }
    }
    async getCertificate() {
        try {
            const { data } = await axios({
                method: 'GET',
                url: CF_API_URL + CERTIFICATES,
                params: {
                    zone_id: this.zone
                },
                headers: this.headers
            })
            return data.result[0].certificate
        } catch (error) {
            console.error(error)
            return { error: 'error getting data', reason: error }
        }
    }
    async getDNSRecords() {
        try {
            const { data } = await axios({
                method: 'GET',
                url: CF_API_URL + DNS_RECORDS.replace('{zone_identifier}', this.zone),
                headers: this.headers
            })
            return data.result
        } catch (error) {
            console.error(error)
            return [{ error: 'error getting data', reason: error }]
        }
    }
}

module.exports = Cloudflare;