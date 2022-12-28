// importer le models de la base de donnees MongoDB
const DataUser = require("../models/DataUser");

// creation des donnees user
exports.createDataUser = (req, res, next) => {
    // console.log("Contenu: req.body.email");
    // console.log(req.body);
    // console.log("Contenu: req.body.password");
    // console.log(req.body);

    // ici je n'ai pas besoin d'utiliser un JSON.parser pour le req.body
    const userDataObject = req.body;
    // console.log("Contenu: userDataObject");
    // console.log(userDataObject);

    // creer une instance du module
    const dataUser = new DataUser({
        ...userDataObject
    })

    // console.log("Contenu: dataUser");
    // console.log(dataUser);

    // enregistrer l'objet dans la base de donnees
    dataUser.save()
        .then(() => res.status(201).json({message: "Object saved in database!", contenu: req.body}))
        .catch((error) => res.status(400).json({ error }));
};

exports.readAllDataUser = (req, res, next) => {
    DataUser.find()
        .then((AllDataUser) => res.status(200).json(AllDataUser))
        .catch((error) => res.status(400).json({error}));
};

exports.readOneDataUser = (req, res, next) => {
    // console.log("getOneDataUser");
    // console.log(req.params.id);
    // console.log({_id: req.params.id});

    DataUser.findOne({_id: req.params.id})
        .then((oneDataUser) => res.status(200).json(oneDataUser))
        .catch((error) => res.status(400).json({error}));
};

exports.updateOneDataUser = (req, res, next) => {
    // console.log("updateOneDataUser");
    // console.log(req.params.id);
    // console.log({_id: req.params.id});

    // console.log("Contenu: req.body");
    // console.log(req.body);

    // modifier les donnees qui seront envoyees dans la base de donnees
    DataUser.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: "Object was updated successfully!", contenu: req.body}))
        .catch((error) => res.status(400).json({error}));
};

exports.deleteOneDataUser = (req, res, next) => {
    // console.log("deleteOneDataUser");
    // console.log({_id: req.params.id});

    DataUser.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "Object was deleted successfully!"}))
        .catch((error) => res.status(400).json({error}));
};