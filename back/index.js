const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const app=express()
const port = process.env.PORT || 3000

const connectdb=require('./config/db')

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim().replace(//$/, "")) : true
}));
app.use(express.json())

app.get('/api/health',(req,res)=>{
    res.json({ status: 'ok' })
})

app.use(async (req, res, next) => {
    try {
        await connectdb()
        next()
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Connexion MongoDB impossible' })
    }
})

app.get('/',(req,res)=>{
    res.send('hello world')
})

if (require.main === module) {
    app.listen(port,() => {
        console.log('serveur lancé sur le port', port )
    })
}

module.exports = app