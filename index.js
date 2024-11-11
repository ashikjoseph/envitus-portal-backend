
const router = require('./Routes/router')

require('dotenv').config()

const express = require("express")

require('./DB/connection')

const cors = require('cors')

const envitusServer = express();

envitusServer.use(cors())

envitusServer.use(express.json());


envitusServer.use(router)

envitusServer.use('/uploads',express.static('./uploads'))

const PORT = 4000;


envitusServer.listen(PORT, ()=>{
    console.log(`Server is running successfully at port : ${PORT}`)
})

envitusServer.get('/', (req,res)=>{
    res.send("envitusServer is running successfully")
})