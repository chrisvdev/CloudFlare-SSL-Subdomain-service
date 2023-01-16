import * as dotenv from 'dotenv'
import fs from 'fs'
import Cloudflare from './APIs/cloudflare.js'
import updateDNSRecords from './automations/DNSRecordsManager.js'
import getHTTPServer from './automations/conmmutatorServer.js'
import https from 'https'

dotenv.config()
const PORT = parseInt(process.env.PORT)
const { SERVER_NAME, CFEMAIL, CFKEY, CFZONE } = process.env
const myCloudflare = new Cloudflare(CFEMAIL, CFKEY, CFZONE)
const { domains, log } = await updateDNSRecords(myCloudflare, SERVER_NAME)
console.log('Cloudflare DNS Records updated:')
console.table(log)
console.log('Creating commutator server...')
const server = getHTTPServer(domains)
console.log('Starting HTTPS server...')
const certificates = await myCloudflare.getCertificates()
const key = fs.readFileSync('./ssl/private.key', 'utf8')
const credentials = { cert: certificates[0].certificate, key }
const sslServer = https.createServer(credentials, server)
sslServer.listen(PORT, () => { console.log(`HTTPS Server listening on port ${PORT}`) })
