// importer express
const express = require("express");

// importer le package 'morgan' (logger http)
const morgan = require("morgan");

// importer mongoose pour se connecte a la base de donnees
const mongoose = require("./database/db");

// importer les routes
const userRoutes = require("./routes/user");
const dataUserRoutes = require("./routes/dataUser");

// creer une application express
const app = express();

// transformer le corps de la requete (body) en JSON (objet js utilisable)
app.use(express.json());

// importer le body-parser
const bodyParser = require("body-parser");

app.use(bodyParser.json());


// logger les requests et les responses
app.use(morgan("dev"));

// debug mongoose
mongoose.set("debug", true)

app.use((req, res, next) => {
    // Acceder a l'api depuis n'importe quelle origine ('*')
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter des headers mentionnes aux requetes envoyees vers l'api
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requetes avec les methodes (get, post, put ...)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// creer une route d'authentification (auth)
app.use("/api/auth", userRoutes);

// creer une route pour les donnees user
app.use("/api/data_user", dataUserRoutes);

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