// importer bcrypt pour hacher le password
const bcrypt = require("bcrypt");

// importer le package 'crypto-js' pour chiffrer le mail
const cryptoJs = require("crypto-js");

// importer les modeles de la base de donnees 'User.js'
const User = require("../models/User");



// enregistrer le nouvel user dans la base de donnees
exports.signup = (req, res, next) => {
    console.log("Contenu: req.body.email");
    console.log(req.body.email);
    console.log("Contenu: req.body.password");
    console.log(req.body.password);

    // chiffrer le mail avant de l'envoyer dans la base de donnees
    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, "SECRET_KEY").toString();
    console.log("Contenu: emailCryptoJs");
    console.log(emailCryptoJs);

    /* hasher le mot de passe avant de l'envoyer dans la base de donnees.
    salt = 0, c'est combien de fois sera execute l'algorithme de hashage
    */
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            // ceci va etre enregistre dans MongoDB
            const user = new User({
                email: emailCryptoJs,
                password: hash
            })
            console.log("Contenu: user");
            console.log(user);

            // envoyer le user dans le base de donnees MongoDB
            user.save()
                .then(() => res.status(201).json({ message: "utilisateur cree et sauvegarde!"}))
                .catch((error) => res.status(400).json({error}));
        })
        .catch((error) => res.status(500).json({ error }));
};                                         