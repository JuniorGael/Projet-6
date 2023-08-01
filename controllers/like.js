// importer le models de la base de donnees MongoDB
const Sauce = require("../models/Sauce");

exports.likeSauce = (req, res, next) => {

    // chercher l'objet dans la base de donnee
    Sauce.findOne({_id: req.params.id})
        .then((object) => {
            // si le userLiked est false et si like === 1
            if(!object.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                // mettre a jour objet de la base de donnee
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {likes: 1},
                        $push: {usersLiked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "Sauce liked +1"}))
                    .catch((error) => res.status(400).json({error}));
            }

            // like = 0 (likes = 0 donc pas de vote)
            if(object.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                
                // mettre a jour objet de la base de donnee
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "Sauce liked 0"}))
                    .catch((error) => res.status(400).json({error}));
            }

            // like = -1 (dislikes = +1)
            if(!object.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                
                // mettre a jour objet de la base de donnee
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {dislikes: 1},
                        $push: {usersDisliked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "Sauce disLiked +1"}))
                    .catch((error) => res.status(400).json({error}));
            }

            // apres un like = -1, on met un like = 0 (likes = 0 donc pas de vote, on enleve le dislike)
            if(object.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                // mettre a jour objet de la base de donnee
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {dislikes: -1},
                        $pull: {usersDisliked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "Sauce disliked 0"}))
                    .catch((error) => res.status(400).json({error}));
            }
        })
        .catch((error) => res.status(404).json({error}));
}