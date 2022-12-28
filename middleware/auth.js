// importer du token jwt
const jwt = require("jsonwebtoken")

// importer le dotenv
const dotenv = require("dotenv");

// exporter la fonction du middleware
module.exports = (req, res, next) => {
    try{
        // recuperer le token dans le headers 'authorization': bearer token
        console.log("Contenu: authentification");
        console.log(req.headers.authorization);

        const token = req.headers.authorization.split(" ")[1];
        // console.log("--------->Contenu: token");
        // console.log(token);

        // decoder le token avec la methode 'verify()'
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
        console.log("------->Contenu: decodedToken");
        console.log(decodedToken);

        
        // console.log("CONTENU du req avant le controle du token: REQ");
        // console.log(req);

        console.log("CONTENU du req.bodyavant le controle du token: REQ");
        console.log(req.body);

        // recuperer les userId se trouvant a l'interieur du token decode
        const userIdDecodedToken = decodedToken.userId;
        console.log("--------->Contenu: userIdDecodedToken");
        console.log(userIdDecodedToken);

        console.log("--------->Contenu: userId contenu dans le body dela requete");
        console.log(req.body.userId);

        // compare le userId de la requete avec le userId du token
        if(req.body.userId && (req.body.userId !== userIdDecodedToken)){
            next();
        }else{
            console.log("Contenu: req");
            console.log(req);
            throw "Invalid userId !"
        }
        // si les erreurs sont trouvees dans le try, on execute le catch
    }   catch(error){
        res.status(401).json({
            message: "Authentification Failure",
            error: error
        });
    }
};