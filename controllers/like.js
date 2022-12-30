// importer le models de la base de donnees MongoDB
const DataUser = require("../models/DataUser");

exports.likeDataUser = (req, res, next) => {
    console.log("je suis dans le controlleur like!");

    // afficher le req.body
    /* la requete sera envoye par body--->raw au format JSON avec ces 2 proprietes 
    {
    "userId": "63ac9cc8003c500235261b65",
    "like": -1
    }
    */
    console.log("---->Contenu: req.body du contoller likes");
    console.log(req.body.likes);

    // recuperer l'id dans l'url de la requete
    console.log("----->Contenu:req.params du controller likes");
    console.log(req.params);

    // mettre au format de l'id pour pouvoir aller chercher l'objet correspond dans la base de donnee
    console.log("----->Contenu: id en _id");
    console.log({_id: req.params.id});

    // chercher l'objet dans la base de donnee
    DataUser.findOne({_id: req.params.id})
        .then((object) => {
            console.log("---->Contenu resultat promise: object");
            console.log(object);
            // res.status(200).json(object)
            // like = 1 (likes = +1)
            // utilisation de la methode js 'include()'
            // utilisation de l'operateur $inc (mongoDB)
            // utilisation de l'operateur $push (mongoDB)
            // utilisation de l'operateur $pull (mongoDB)

            // si le userLiked est false et si like === 1
            if(!object.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
                console.log("---->userId n'est pas dans usersLiked de la base de donnee et la requte du front like = 1");
                
                // mettre a jour objet de la base de donnee
                DataUser.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {likes: 1},
                        $push: {usersLiked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "DataUser liked +1"}))
                    .catch((error) => res.status(400).json({error}));
            }

            // like = 0 (likes = 0 donc pas de vote)
            if(object.usersLiked.includes(req.body.userId) && req.body.likes === 0) {
                console.log("---->userId est dans userLiked et likes = 0");
                
                // mettre a jour objet de la base de donnee
                DataUser.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "DataUser liked 0"}))
                    .catch((error) => res.status(400).json({error}));
            }

            // like = -1 (dislikes = +1)
            if(!object.usersDisliked.includes(req.body.userId) && req.body.likes === -1) {
                console.log("---->userId est dans usersDisliked et disLikes = 1");
                
                // mettre a jour objet de la base de donnee
                DataUser.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {dislikes: 1},
                        $push: {usersDisliked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "DataUser disLiked +1"}))
                    .catch((error) => res.status(400).json({error}));
            }

            // apres un like = -1, on met un like = 0 (likes = 0 donc pas de vote, on enleve le dislike)
            if(object.usersDisliked.includes(req.body.userId) && req.body.likes === 0) {
                console.log("---->userId est dans usersDisliked et likes = 0");
                
                // mettre a jour objet de la base de donnee
                DataUser.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {dislikes: -1},
                        $pull: {usersDisliked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "DataUser disliked 0"}))
                    .catch((error) => res.status(400).json({error}));
            }
        })
        .catch((error) => res.status(404).json({error}));
}