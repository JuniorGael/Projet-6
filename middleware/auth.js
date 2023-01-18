// importer du token jwt
const jwt = require("jsonwebtoken");

// importer le dotenv
const dotenv = require("dotenv");
dotenv.config();

// exporter la fonction du middleware
module.exports = (req, res, next) => {
    try{
        // recuperer le token dans le headers 'authorization': bearer token
        const token = req.headers.authorization.split(" ")[1];

        // decoder le token avec la methode 'verify()'
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);

        const userId = decodedToken.userId;

        req.auth = {
            userId: userId
        }

        next();
        // si les erreurs sont trouvees dans le try, on execute le catch
    }   catch(error){
        res.status(401).json({
            message: "Authentification Failure",
            error: error
        });
    }
};