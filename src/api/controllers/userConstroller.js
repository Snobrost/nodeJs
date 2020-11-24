const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const validator = require("email-validator");

exports.create_an_user = (req, res) => {
    let new_user = new User(req.body);
    if(validator.validate(new_user.email)){
        new_user.password = bcrypt.hashSync(new_user.password, process.env.JWT_SECRET);
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
        console.log(error);
        res.json({
            message: "Email non conforme."
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
            if (bcrypt.compareSync(user.password, req.body.password)) {
                jwt.sign({
                    email: user.email,
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