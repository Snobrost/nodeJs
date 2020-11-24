const comments = require('../models/commentsModel');

exports.list_all_comments = (req, res) => {
    comments.find({}, (error, commentss) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comments)
        }
    })
}

exports.create_a_comments = (req, res) => {
    let new_comments = new comments(req.body);

    new_comments.save((error, comments) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(201);
            res.json(comments)
        }
    })
}

exports.get_a_comments = (req, res) => {
    // comments.find({_id: req.params.comments_id}, (error, comments) => {
    comments.findById(req.params.comments_id, (error, comments) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comments)
        }
    })
}

exports.update_a_comments = (req, res) => {
    comments.findByIdAndUpdate(req.params.comments_id, req.body, {new: true}, (error, comments) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comments)
        }
    })
}

exports.delete_a_comments = (req, res) => {
    // comments.remove({_id: req.params.comments_id}, (error, comments) => {
    comments.findByIdAndRemove(req.params.comments_id, (error, comments) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json({message: "Article supprimé !"})
        }
    })
}