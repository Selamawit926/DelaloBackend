const Category = require("../models/category_model");

const getCategories = (req, res) => {
    Category
        .find()
        .then((categories) => {

            res.status(200).json(categories);
        })
        .catch((err) => {
            res.json(
                { message: err.message }
            );
        });
}

const getCategoryById = (req, res) => {
    Category
        .findById(req.params.id)
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(
                { message: err.message }
            );
        });
}

const deleteCategory = (req, res) => {
    Category
        .findByIdAndDelete(req.params.id)
        .then((category) => {
            res.status(200).json({
                body: category,
                message: `Deleted Category ${category.name} Successfully`
            });
        })
        .catch((err) => {
            res.json({
                message: err.message
            }
            );
        });
}

const addCategory = (req, res) => {
    new Category({
        name: req.body.name,
        image: req.body.image,
        numOfProviders: req.body.numOfProviders,
        description: req.body.description
    })
        .save()
        .then((category) => {
            res.status(201).json({
                body: category,
                message: `Inserted Category ${category.name} Successfully`
            });
        })
        .catch((err) => {
            res.json({
                message: err.message
            });
        });
}


const updateCategory = function (req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    Category.findOneAndUpdate(
        {
            _id:req.params.id
        },

        req.body,
        { new: true },

    ).then((category) => {
        if (!category) {
            res.status(404).send({
                message: `Couldn't update Category with id ${req.params.id}`
            });
        }
        else {
            res.status(200).send(category);
        }

    }).catch((err) => {
        res.status(500).send({
            message: `Error updating ${req.params.id}`
        })
    })
}


module.exports = { getCategories, 
                  getCategoryById, 
                  deleteCategory,
                  addCategory, 
                  updateCategory};