// importer le package HTTP de node.js pour avoir les outils pour creer le serveur
const http = require("http");

// importer l'applicaion sur app.js
const app = require("./app");

// importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();


// parametrer le prot avec la methode 'set' de Express
app.set("port", process.env.PORT);

// la methode 'createServer()' prend en argument, la fonction qui sera appele a chaque requete recu par le serveur. Ici les fonctions seront dans 'app.js'
const server = http.createServer(app);

// le serveur ecoute les requetes sur le port
server.listen(process.env.PORT);