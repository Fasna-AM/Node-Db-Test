require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./database/DBConnection')
const router = require('./routes/router')

const nodeDbServer = express()

nodeDbServer.use(cors())
nodeDbServer.use(express.json())
nodeDbServer.use(router)

const PORT = 3000 || process.env.PORT

nodeDbServer.listen(PORT,()=>{
    console.log(`nodeDbServer Started running  at port ${PORT} and waiting for client request`);
    
})

nodeDbServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">nodeDbServer Started running  at port  and waiting for client request!!</h1>`)
})
