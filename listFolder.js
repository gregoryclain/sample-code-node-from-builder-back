//...
// Pour des raisons de confidentialités, seul une partie du code est visible

// list folder
exports.list = (req, res, next) => {
  const path = require("path");
  let allFolder = [];
  const directoryPath = path.join(__dirname, "../../../sites/");

  fs.readdir(directoryPath, function(err, folders) {
    if (err) {
      console.log("Error getting directory information.");
    } else {
      folders.forEach(function(folder) {
        allFolder.push(folder);
      });
      res.json({ allFolder: allFolder });
    }
  });
};

//...