require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {ethers, utils} from 'ethers'

const Corestore = require("corestore")
const PORT = process.env.PORT || 4000
const app = express();
const corestore = new Corestore('./db')

const numbers = corestore.get({name: "numbers", valueEncoding: 'json'})
numbers.ready()

const CLIENT_URL = 'http://localhost:3000'
const corsOptions = {
    origin: CLIENT_URL,
};
  
app.use(cors(corsOptions));

app.use(bodyParser.json())

const saveNumber = async (payload) => {
    await numbers.append(payload)
    return await numbers.get(numbers.length-1)
}

app.post('/signup/number', async (req: any, res: any) => {
    try{
        const response = await saveNumber({address: req.body.address, number: req.body.number})
        res.send({response: response, status: 200})
    }catch(e){
        res.send({msg: e, status: 500})
    }
})

app.listen(PORT, async () => {
    console.log(`listening on port: ${PORT}`)
})