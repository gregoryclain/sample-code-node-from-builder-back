//...
// Pour des raisons de confidentialités, seul une partie du code est visible

const mongoose = require("mongoose");
const Section = require("../models/section");
const { validationResult } = require("express-validator");

// note : .exec = permet d'avoir une promises

// création des sections template
exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const section = new Section({
    _id: new mongoose.Types.ObjectId(),
    libelle: req.body.libelle,
    auteur: req.body.auteur,
    slug: req.body.slug,
    type: req.body.type,
    zone: req.body.zone,
    genre: req.body.genre,
    staticModules: req.body.staticModules
  });
  section
    .save()
    .then(() =>
      res.status(201).json({
        message: "Template section enregistré",
        last: section
      })
    )
    .catch(error => res.status(400).json({ error }));
};

// détail de section template
exports.show = (req, res, next) => {
  const id = req.params.id;
  Section.findById(id)
    .exec()
    .then(section => {
      if (section) {
        res.json({ section });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

// liste des sections template
exports.list = (req, res, next) => {
  Section.find()
    .exec()
    .then(sections => {
      // if (sections.length > 0) {
      res.json({ sections });
      // } else {
      //   res.status(404).json({ message: "No entries found" });
      // }
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

// suppression d'une section
exports.delete = (req, res, next) => {
  const id = req.params.id;
  Section.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};
exports.update = (req, res, next) => {
  const id = req.params.id;
  Section.updateOne({ _id: id }, { ...req.body, _id: id })
    .exec()
    .then(result => {
      res.status(200).json({ message: "Object updated", result: result });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};


//...