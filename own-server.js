require('dotenv').config();
const PORT = parseInt(process.env.PORT);

const express = require('express');
const server = express();
server.use("/", express.static("../web/"));

const fs = require("fs");
const cert = fs.readFileSync("./ssl/certificate.crt", "utf8")
const key = fs.readFileSync("./ssl/private.key", "utf8")
const credentials = { cert: cert, key: key }

const https = require("https");
const sslServer = https.createServer(credentials, server)

server.listen(PORT, () => { console.log(`HTTP Server listening on port ${PORT}`) })
sslServer.listen(PORT + 1, () => { console.log(`HTTPS Server listening on port ${PORT + 1}`) })