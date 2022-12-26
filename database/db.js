//importer le package pour utiliser mes variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

// importer mongoose pour se connecter a la base de donnees MongoDB
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`, 
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    // exporter mongoose
    module.exports = mongoose;