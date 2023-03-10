// importer bcrypt pour hacher le password
const bcrypt = require("bcrypt");

// importer le package 'crypto-js' pour chiffrer le mail
const cryptoJs = require("crypto-js");

// importer le package jsonwebtoken
const jwt = require("jsonwebtoken");

// importer pour utiliser les variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();

// importer les modeles de la base de donnees 'User.js'
const User = require("../models/User");

// enregistrer le nouvel user dans la base de donnees
exports.signup = (req, res, next) => {
    // chiffrer le mail avant de l'envoyer dans la base de donnees
    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();

    /* hasher le mot de passe avant de l'envoyer dans la base de donnees.
    salt = 0, c'est combien de fois sera execute l'algorithme de hashage
    */
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            // ceci va etre enregistre dans MongoDB
            const user = new User({
                email: emailCryptoJs,
                password: hash
            });

            // envoyer le user dans le base de donnees MongoDB
            user.save()
                .then(() => res.status(201).json({ message: "utilisateur cree et sauvegarde!"}))
                .catch((error) => res.status(400).json({error}));
        })
        .catch((error) => res.status(500).json({ error }));
};

// creer un login pour s'authentifier
exports.login = (req, res, next) => {

    // chiffrer l'email de la requete
    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();

    // chercher dans la base de donnees si le user est bien present
    User.findOne({email: emailCryptoJs})
        // verifier si le mail du user n'est pas correct, c-a-d si le mail n'existe pas
        .then((user) => {
            if(!user) {
                return res.status(401).json({error: "User not found"})
            }
            // verifier la validite du password envoyer par le user depuis le frontend
            bcrypt.compare(req.body.password, user.password)
                .then((controlPassword) => {

                    // verifier si le password est incorrect
                    if(!controlPassword) {
                        return res.status(401).json({error: "Incorrect password"})
                    }
                    // verifier que le password est correct
                    // envoyer la response dans le serveur du userId et du token d'authentification 
                    res.status(200).json({
                        // encoder le userId pour creer un nouvel objet(objet et userId seront lies)
                        userId: user._id,
                        token: jwt.sign(
                            // creer les 3 arguments(userId, la cle de chiffrement, expiresIn)
                            { userId: user._id},
                            `${process.env.JWT_KEY_TOKEN}`,
                            {expiresIn: "24h"}
                        )
                    });
                })
                .catch((error) => res.status(500).json({error}));
        })
        .catch((error) => res.status(500).json({error}));
};