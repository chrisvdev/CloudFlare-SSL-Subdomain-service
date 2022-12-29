
require('dotenv').config()
const { CFEMAIL, CFKEY, CFZONE } = process.env
const PORT = parseInt(process.env.PORT)
const fs = require("fs")
const key = fs.readFileSync("./ssl/private.key", "utf8")

const express = require('express');
const server = express();
server.use("/", express.static("../web/"));
const https = require("https");

const Cloudflare = require('./cf-api/cloudflare')
const myCloudflare = new Cloudflare(CFEMAIL, CFKEY, CFZONE)
const boot = async () => {
    const credentials = { cert: await myCloudflare.getCertificate(), key: key }
    const sslServer = https.createServer(credentials, server)
    sslServer.listen(PORT + 1, () => { console.log(`HTTPS Server listening on port ${PORT + 1}`) })
    console.log(await myCloudflare.getDNSRecords())
}

boot()

