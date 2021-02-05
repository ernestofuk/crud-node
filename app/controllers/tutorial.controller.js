const db = require("../models")
const Tutorial = db.tutorials;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400)({message: "Content can not be empty"});
        return;
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    Tutorial.save(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while creating the tutorial."
        });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: { $regex: new RegExp(title), $options: "i"}} : {};

    Tutorial.find(condition)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
           message:
           err.message || "Some error ocurred while retrieving the tutorial." 
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
    .then(data => {
        if (!data) {
            res.status(404).send({message: "Not found Tutorial with id " + id});
        }
    })
    .catch(err => {
        res.status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id});
    });


};

exports.update = (req, res) => {
    if (!req.body) {
        return es.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: 'Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!'
            });
        } else {
            res.send({ message: "Tutorial was updated successfully" });
        }
    })
    .catch(err => {
        res.status(500).send({
           message: "Error updating Tutorial with id=" + id 
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: 'Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!'
            });
        } else {
            res.send({ message: "Tutorial was deleted successfully" });
        }
    })
    .catch(err => {
        res.status(500).send({
           message: "Could not delete Tutorial with id=" + id 
        });
    });
};

exports.deleteAll = (req, res) => {
    Tutorial.deleteAny({})
    .then(data => {
        res.send({
            message: `${data.deleteCount} Tutorials were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while removing all tutorials."
        });
    });

};

exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true})
    .then(data => {
        res.data(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while retrieving tutorials."
        });
    });
};