// importer le models de la base de donnees MongoDB
const Sauce = require("../models/Sauce");

// importer le module fs de node.js pour acceder aux fichiers du serveur
const fs = require("fs");

// creation des donnees user
exports.createSauce = (req, res, next) => {
  // ici je n'ai pas besoin d'utiliser un JSON.parser pour le req.body
  const sauceObject = JSON.parse(req.body.sauce);

  // creer une instance du module
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  // enregistrer l'objet dans la base de donnees
  sauce
    .save()
    .then(() =>
      res
        .status(201)
        .json({ message: "Object saved in database!", contenu: req.body })
    )
    .catch((error) => res.status(400).json({ error }));
};

// ECMAScript 2015
// exports.readAllSauce = (req, res, next) => {
//     Sauce.find()
//         .then((AllSauces) => res.status(200).json(AllSauces))
//         .catch((error) => res.status(400).json({error}));
// };

// ECMAScript 2017
exports.readAllSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.find({}).select("");
    res.status(200).json(sauce);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// ECMAScript 2017
exports.readOneSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id }).exec();
    res.status(200).json(sauce);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ECMAScript 2015
// exports.readOneSauce = (req, res, next) => {
//     // console.log("getOneDataUser");
//     // console.log(req.params.id);
//     // console.log({_id: req.params.id});

//     Sauce.findOne({_id: req.params.id})
//         .then((oneSauce) => res.status(200).json(oneSauce))
//         .catch((error) => res.status(404).json({error}));
// };

// exports.updateOneSauce = (req, res, next) => {
//   const sauceObject = req.file
//     ? {
//         ...JSON.parse(req.body.sauce),
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`
//       }
//     : {
//         ...req.body
//       };

//   delete sauceObject._userId;
//   Sauce.findOne({ _id: req.params.id })
//     .then((object) => {
//       if (object.userId != req.auth.userId) {
//         res.status(401).json({message: "Not authorized !"})
//       } else {
//         // preparer un objet sauce qui sera mise a jour apres dans la base de donnee
//         // l'operateur spray(...: l'operateur de decomposition) pour eclater l'objet
//         // const sauceParse = JSON.parse(req.body.sauce);
//         // mettre a jour la base de donnee
//         Sauce.updateOne(
//           { _id: req.params.id },
//           { ...sauceObject, _id: req.params.id }
//         )
//           .then(() => 
//           res.status(200).json(
//                 {
//                   message: "Object was updated successfully!"
//                 }
//               )
//               )
//           .catch((error) => res.status(401).json({ error }));
//       }
//     })
exports.updateOneSauce = (req, res, next) => {

    // Sauce.findOne({_id: req.params.id})
    //   .then((object) => {
      // preparer un objet sauce qui sera mise a jour apres dans la base de donnee
      // l'operateur spray(...: l'operateur de decomposition) pour eclater l'objet
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : {
        ...req.body
    }
    delete sauceObject._body;
              if(req.file) {
                Sauce.findOne({_id: req.params.id})
                  .then((object) => {

                      // recuperer le nom de l'image a supprimer dans la base de donnee
                      const filename = object.imageUrl.split("/images/")[1];

                      //supprimer l'image dans le dossier images du serveur
                      fs.unlink(`images/${filename}`, (error) => {
                          if(error) throw error;
                      })
                      // if (fs.existsSync(images/`${filename}`)) {
                      //   fs.unlinkSync(images/`${filename}`);
                      // }
                  })
                  .catch((error) => res.status(404).json({error}))
              }
        
        
              // mettre a jour la base de donnee
              Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
              .then(() => res.status(200).json({message: "Object was updated successfully!", contenu: sauceObject}))
              .catch((error) => res.status(404).json({error}))
      // })
      // .catch((error) => res.status(403).json({error}))
};

// ECMAScript 2017
// exports.deleteOneSauce = async(req, res, next) => {
// //
//     try{
//         const object = await Sauce.findOne({_id: req.params.id});

//         if(userIdParamsUrl === object.userId) {
//             // supprimer l'image dans le dossier images du serveur
//             const filename = object.imageUrl.split("/images/")[1];

//             fs.unlink(`images/${filename}`, (err) => {
//                     if(err) res.status(500).json({err});
//                     console.log(`${filename} the file has been deleted!`);
//             });

//             // supprimer le dosument dans la base de donnee
//             const sauce = await Sauce.findOneAndDelete({
//                 _id: req.params.id
//             });
//             res.status(200).json({message: `id: ${req.params.id} document deleted!`})
//         }else{
//             res.status(403).json({message: "the user is not authorized to delete the document!"})
//         }
//     }catch(error){
//         res.status(500).json({
//             error: error,
//             message: "Picture does not exist!"
//         })
//     }
// }
exports.deleteOneSauce = (req, res, next) => {
  // chercher l'objet dans la base de donnee pour pouvoir recuperer l'url de l'image de l'objet a supprimer pour pouvoir l'effacer du serveur
  Sauce.findOne({ _id: req.params.id })
    .then((object) => {
      // verifier si l'userId connecte est autorise a supprimer l'objet en comparant l'userId dans l'onjet avec l'userId qui fait la demande
      if (object.userId != req.auth.userId) {
        res.status(401).json({message: "Not authorized !"})
      
      } else {
        const filename = object.imageUrl.split("/images/")[1];
  
        // supprimer l'image dans le dossier images du serveur
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({
                message: "Object was deleted successfully in Database!"
              })
            })
            .catch((error) => res.status(401).json({ error }));
        })
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
