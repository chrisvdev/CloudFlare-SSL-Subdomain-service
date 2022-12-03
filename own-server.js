require('dotenv').config();
const PORT = parseInt(process.env.PORT);
const express = require('express');

const server = express();

server.use("/", express.static("../chrisvill2312.github.io/build"));
server.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })