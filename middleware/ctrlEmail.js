// importer le package validator
const validator = require("validator");

module.exports = (req, res, next) => {
    const {email} = req.body;

    if(validator.isEmail(email)) {
        console.log("----->validator.isEmail");
        console.log(`valid email ${validator.isEmail(email)}`);
        next();
    }else{
        return res.status(400).json({ error: `Email ${email} is not valid !`})
    }
}