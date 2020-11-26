const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bcryps = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

exports.verify_token = (req, res, next) => {
    let token = req.headers['authorization'];

    if(typeof token != 'undefined') {
        jwt.verify(token, JWT_SECRET, (error) => {
            if(error) {
                res.sendStatus(403);
            }
            else {
                next();
            }
        } )



    }
    else {
        res.status(403);
        res.json({message: "Accès interdit"});
    }
}


exports.get_name = (req, res, next) => {
    let token = req.headers['authorization'];

    if(typeof token != 'undefined') {
        return jwt.verify(token, JWT_SECRET );



    }
    else {
        res.status(403);
        res.json({message: "Accès interdit"});
    }
}




const salt = bcrypt.genSaltSync();

exports.crypt_password = (req) => {

    const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    return encryptedPassword;
    
}