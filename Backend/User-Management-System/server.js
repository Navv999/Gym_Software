require('dotenv').config();
const http = require('http');
const app = require('./index');
const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`connection is setup at ${process.env.PORT}`)
})