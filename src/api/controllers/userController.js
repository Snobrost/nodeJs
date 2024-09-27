const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mdl = require('../../middleware/jwtMiddleware');


exports.create_an_user = (req, res) => {
    if(mdl.validateEmail(req.body.email)){
        let new_user = new User(req.body);
        new_user.password =mdl.crypt_password(req);
        new_user.save((error, user) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Erreur serveur."
                })
            } else {
                res.status(201);
                res.json({
                    message: `Utilisateur crée : ${user.email}`
                })
            }
        })
    }else {
        res.status(500);
        res.json({
            message: "Email nonconforme."
        })
    }
    
}

exports.login_an_user = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            if (user.password === mdl.crypt_password(req)) {
                jwt.sign({
                    email: user.email,
                    firstname: user.firstname,
                    role: "user"
                }, process.env.JWT_SECRET, {
                    expiresIn: '30 days'
                }, (error, token) => {
                    if (error) {
                        res.status(400);
                        console.log(error);
                        res.json({
                            message: "Mot de passe ou email erroné."
                        })
                    } else {
                        res.json({
                            token
                        })
                    }
                })
            } else {
                res.status(400);
                console.log(error);
                res.json({
                    message: "Mot de passe ou email erroné."
                })
            }


        }
    })
}