const fs = require("fs")
const http = require("http")
const path = require("path")

const port = 3000

const server = http.createServer()
server.listen(port,()=>{
  console.log(`Port is Listening ${port}`)
})