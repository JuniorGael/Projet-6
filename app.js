// importer express
const express = require("express");

// importer le package 'morgan'
const morgan = require("morgan");

// importer le package mongodb
// const mongoose = require("mongoose")

// importer mongoose pour se connecte a la base de donnees
const mongoose = require("./database/db");


// creer une application express
const app = express();

// importer le body-parser
const bodyParser = require("body-parser");

// logger les requests et les responses
app.use(morgan("dev"));

app.use((req, res, next) => {
    // Acceder a l'api depuis n'importe quelle origine ('*')
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter des headers mentionnes aux requetes envoyees vers l'api
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requetes avec les methodes (get, post, put ...)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// transformer le corps de la requete (body) en JSON (objet js utilisable)
// app.use(bodyParser.json());
app.use(express.json());

//
app.use((req, res, next) => {
    console.log("Premiere requete !");
    next();
});
app.use((req, res) => {
    res.json({ message:"La premiere requete fonctionne !"});
});

// Exporter app.js pour pouvoir y acceder depuis un autre fichier
module.exports = app;