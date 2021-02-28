//...
// Pour des raisons de confidentialités, seul une partie du code est visible

const mongoose = require("mongoose");
const Module = require("../models/module");
const { validationResult } = require("express-validator");

var fs = require("fs");
// const PATH_DIR = "\\\\serveur\\web\\web\\_new-archi\\";
const PATH_DIR = process.env.PATH_DIR;
const FOLDER_JSON = "\\src\\config-data\\";

// création des modules
exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // console.log("req.body", req.body);
  delete req.body._id;
  const moduleStructure = new Module({
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
  });
  moduleStructure
    .save()
    .then(() =>
      res.status(201).json({
        message: "Module enregistré",
        last: moduleStructure,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

// détail de module
exports.show = (req, res, next) => {
  const id = req.params.id;
  Module.findById(id)
    .exec()
    .then((moduleStructure) => {
      if (moduleStructure) {
        res.json({ moduleStructure });
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// liste des modules du serveur
exports.list = (req, res, next) => {
  Module.find()
    .exec()
    .then((modules) => {
      res.json({ modules });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// delete de module
exports.delete = (req, res, next) => {
  const id = req.params.id;
  // console.log("id", id);
  Module.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// edition d'un module
exports.update = (req, res, next) => {
  const id = req.params.id;
  Module.updateOne({ _id: id }, { ...req.body, _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "Object updated", result: result });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// copy module serveur
exports.copy = (req, res, next) => {
  const originalDoc = new Module({
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
  });

  originalDoc
    .save()
    .then((result) => {
      res.status(201).json({ message: "object is cloned", last: originalDoc });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  // originalDoc._id = new ObjectId();
  // Module.insert(originalDoc);
};

// lister les modules présent sur config-products.json du site
exports.listConfigFile = (req, res, next) => {
  const name = req.params.name;
  let fileName = "config-products.json";
  let configProducts = PATH_DIR + "sites\\" + name + FOLDER_JSON + fileName;
  // res.status(200).json({ configProducts: configProducts });
  try {
    if (fs.existsSync(configProducts)) {
      let rawdata = fs.readFileSync(configProducts);
      let jsonData = JSON.parse(rawdata);
      res.status(200).json({ list: jsonData });
    }
  } catch (err) {
    //
  }
};

//...