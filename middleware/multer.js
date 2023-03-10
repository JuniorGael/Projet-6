// multer permet de gerer les requetes avec envoi de fichier
// importer le package multer
const multer = require("multer");

// le dictionnaire de MIME_TYPE
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

// creer une destination du fichier(repertoire) et generer un nom de fichier unique
const storage = multer.diskStorage({
    // la destination de stockage du fichier(ou on va mettre le fichier)
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        // supprimer les espaces dans le nom de fichier
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + Date.now() + "." + extension);
    }
});

// exporter du middleware multer
module.exports = multer({storage: storage}).single("image");