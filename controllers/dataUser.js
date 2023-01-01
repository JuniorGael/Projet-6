// importer le models de la base de donnees MongoDB
const DataUser = require("../models/DataUser");

// importer le module fs de node.js pour acceder aux fichiers du serveur
const fs = require("fs")

// creation des donnees user
exports.createDataUser = (req, res, next) => {
    console.log("Contenu: req.body.email");
    console.log(req.body);
    console.log("Contenu: req.body.dataUser");
    console.log(req.body.dataUser);

    console.log("Contenu POST: req.file");
    console.log(req.file);

    // ici je n'ai pas besoin d'utiliser un JSON.parser pour le req.body
    const userDataObject = JSON.parse(req.body.dataUser);
    console.log("Contenu: userDataObject");
    console.log(userDataObject);

    console.log("------->CONTENU POUR FRABRIQUER L'URL DE L'IMAGE");
    console.log(req.protocol);
    console.log(req.get("host"));
    console.log(req.file.filename);

    // creer une instance du module
    const dataUser = new DataUser({
        ...userDataObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });

    console.log("Contenu: dataUser");
    console.log(dataUser);

    // enregistrer l'objet dans la base de donnees
    dataUser.save()
        .then(() => res.status(201).json({message: "Object saved in database!", contenu: req.body}))
        .catch((error) => res.status(400).json({ error }));
};

// ECMAScript 2015
// exports.readAllDataUser = (req, res, next) => {
//     DataUser.find()
//         .then((AllDataUser) => res.status(200).json(AllDataUser))
//         .catch((error) => res.status(400).json({error}));
// };

// ECMAScript 2017
exports.readAllDataUser = async(req, res) => {
    try{
        const dataUser = await DataUser.find({}).select("");
        res.status(200).json(dataUser)
    }catch(err){
        res.status(500).json({error: err})
    }
}

// ECMAScript 2017
exports.readOneDataUser = async(req, res) => {
    try{
        const dataUser = await DataUser.findOne({_id: req.params.id}).exec();
        res.status(200).json(dataUser);
    }catch(error){
        res.status(500).json({error});
    }
}
// exports.readOneDataUser = (req, res, next) => {
//     // console.log("getOneDataUser");
//     // console.log(req.params.id);
//     // console.log({_id: req.params.id});

//     DataUser.findOne({_id: req.params.id})
//         .then((oneDataUser) => res.status(200).json(oneDataUser))
//         .catch((error) => res.status(404).json({error}));
// };

exports.updateOneDataUser = (req, res, next) => {
    console.log("updateOneDataUser");
    console.log(req.params.id);
    console.log({_id: req.params.id});

    console.log("Contenu PUT: req.file");
    console.log(req.file);

    DataUser.findOne({_id: req.params.id})
        .then((object) => {
            if(userIdParamsUrl === object.userId) {

            console.log("Permission to delete object!");

            if(req.file) {
                DataUser.findOne({_id: req.params.id})
                    .then((objet) => {
                        console.log("--------> LE RETOUR DE LA PROMESSE OBJET");
                        console.log(objet);

                        // recuperer le nom de l'image a supprimer dans la base de donnee
                        const filename = objet.imageUrl.split("/images/")[1];
                        console.log("----->CONTENU: FILENAME");
                        console.log(filename);

                        // supprimer l'image dans le dossier images du serveur
                        fs.unlink(`images/${filename}`, (error) => {
                            if(error) throw error;
                        });
                    })
                    .catch((error) => res.status(404).json({error}));
            }else{
                console.log("CONTENU: FALSE");
            }
            
            // l'objet a mettre a jour dans la base de donnee
            console.log("------>CONTENU: req.body");
            console.log(req.body);
            
            console.log("------>CONTENU: req.body.dataUser");
            console.log(req.body.dataUser);
            
            // deux cas possible
            const userDataObject = JSON.parse(req.body.dataUser);
            const dataUserObject = req.file ? 
            {
                ...userDataObject,
                imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            } : {
                ...req.body
            }
        
            console.log("------->CONTENU PUT: dataUserObject");
            console.log(dataUserObject);
            
            // mettre a jour la base de donnee
            DataUser.updateOne({_id: req.params.id}, {...dataUserObject, _id: req.params.id})
            .then(() => res.status(200).json({message: "Object was updated successfully!", contenu: dataUserObject}))
            .catch((error) => res.status(404).json({error}));
            }else {
            // console.log("UserId different from the userId in the object: not authorized to make the modification!");
            throw "UserId different from the userId in the object: Not authorized to make the modification!"
            }
        })
        .catch((error) => res.status(403).json({error}));
};

exports.deleteOneDataUser = (req, res, next) => {
    console.log("deleteOneDataUser");
    console.log({_id: req.params.id});

    // chercher l'objet dans la base de donnee pour pouvoir recuperer l'url de l'image de l'objet a supprimer pour pouvoir l'effacer du serveur
    DataUser.findOne({_id: req.params.id})
        .then((object) => {
            

            console.log("----->Objet");
            console.log(object);

            console.log("----->Objet userId");
            console.log(object.userId);

            console.log("---->Req.originalUrl");
            console.log(req.originalUrl);

            const userIdParamsUrl = req.originalUrl.split("=")[1];
            console.log("----->affichage de l'userId");
            console.log(userIdParamsUrl);

            // verifier si l'userId connecte est autorise a supprimer l'objet en comparant l'userId dans l'onjet avec l'userId qui fait la demande
            if(userIdParamsUrl === object.userId) {
                console.log("Permission to delete object!");

                const filename = object.imageUrl.split("/images/")[1];

                // supprimer l'image dans le dossier images du serveur
                fs.unlink(`images/${filename}`, () => {
                    DataUser.deleteOne({_id: req.params.id})
                        .then(res.status(200).json({
                            message: "Object was deleted successfully in Database!"
                        }))
                        .catch((error) => res.status(404).json({error}));
                })
            }else {
                throw "UserId is different from the userId object to delete!"
            }
        })
        .catch((error) => res.status(500).json({error}));

    // DataUser.deleteOne({_id: req.params.id})
    //     .then(() => res.status(200).json({message: "Object was deleted successfully!"}))
    //     .catch((error) => res.status(400).json({error}));
};