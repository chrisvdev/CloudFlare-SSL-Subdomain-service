import * as dotenv from 'dotenv'
import express from 'express'
// import https from 'https'
import fs from 'fs'
import Cloudflare from './APIs/cloudflare.js'
import getPublicIP from './APIs/publicIP.js'

dotenv.config()
const { CFEMAIL, CFKEY, CFZONE } = process.env
// const PORT = parseInt(process.env.PORT)
const key = fs.readFileSync('./ssl/private.key', 'utf8')
const server = express()
server.use('/', express.static('./web/'))

const myCloudflare = new Cloudflare(CFEMAIL, CFKEY, CFZONE)
const certificates = await myCloudflare.getCertificates()
/* const credentials = { cert: certificates[0].certificate, key }
const sslServer = https.createServer(credentials, server)
sslServer.listen(PORT, () => { console.log(`HTTPS Server listening on port ${PORT}`) }) */
console.log(certificates[0].certificate)
console.log(await myCloudflare.getDNSRecords('A'))
console.log(await getPublicIP())
