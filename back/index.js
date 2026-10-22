const express = require('express')//Importe Express (framework pour créer le serveur)
const dotenv = require('dotenv')//Importe dotenv (pour gérer les variables d'environnement)
dotenv.config()//Charge les variables d'environnement depuis le fichier .env (avant de lire PORT)
//intialiser le serveur 
const app=express()
//Port d'écoute : celui du .env, sinon 3000
const port = process.env.PORT || 3000

const connectdb=require('./config/db')//Importe la fonction de connexion à la base de données

//Route de test pour vérifier que le serveur fonctionne
app.get('/',(req,res)=>{
    res.send('hello world')
})

//Démarre le serveur et écoute sur le port spécifié
app.listen(port,() => {
    console.log('serveur lancé sur le port', + port )
})
connectdb()//Appelle la fonction de connexion à la base de données