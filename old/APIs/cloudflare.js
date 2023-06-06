import axios from 'axios'
const CF_API_URL = 'https://api.cloudflare.com/client/v4/'
const CERTIFICATES = 'certificates'
const DNS_RECORDS = '/zones/{zone_identifier}/dns_records'

export default class Cloudflare {
  constructor (email, key, zone) {
    this.key = key
    this.email = email
    this.zone = zone
    this.headers = { 'X-Auth-Key': this.key, 'X-Auth-Email': this.email }
  }

  async getCertificates () {
    try {
      const { data } = await axios({
        method: 'GET',
        url: CF_API_URL + CERTIFICATES,
        params: {
          zone_id: this.zone
        },
        headers: this.headers
      })
      return data.result
    } catch (error) {
      console.error(error)
      return { error: 'error getting data', reason: error }
    }
  }

  async getDNSRecords (type) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: CF_API_URL + DNS_RECORDS.replace('{zone_identifier}', this.zone),
        headers: this.headers
      })
      return type ? data.result.filter((record) => (type === record.type)) : data.result
    } catch (error) {
      console.error(error)
      return [{ error: 'error getting data', reason: error }]
    }
  }

  async createDNSRecord (record) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: CF_API_URL + DNS_RECORDS.replace('{zone_identifier}', this.zone),
        headers: this.headers,
        data: record
      })
      return data.result
    } catch (error) {
      console.error(error)
      return { error: 'error getting data', reason: error }
    }
  }

  async updateDNSRecord (record, recordId) {
    try {
      const { data } = await axios({
        method: 'PUT',
        url: CF_API_URL + DNS_RECORDS.replace('{zone_identifier}', this.zone) + '/' + recordId,
        headers: this.headers,
        data: record
      })
      return data.result
    } catch (error) {
      console.error(error)
      return { error: 'error getting data', reason: error }
    }
  }

  async deleteDNSRecord (recordId) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: CF_API_URL + DNS_RECORDS.replace('{zone_identifier}', this.zone) + '/' + recordId,
        headers: this.headers
      })
      return data.result
    } catch (error) {
      console.error(error)
      return { error: 'error getting data', reason: error }
    }
  }
}

/*

to write changes, regardless of the API's documentation says, you need bodies like this...

{
  "type":"A", // required
  "comment": "server1: Main record",
  "content": "1.2.3.4", // required
  "name": "christianvillegas.com", // required
  "proxied": true,
  "ttl": 1 // required
}

No allowed "tags" for free accounts.

*/
