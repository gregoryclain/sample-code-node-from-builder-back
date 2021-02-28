//...
// Pour des raisons de confidentialités, seul une partie du code est visible

exports.copieModele = (req, res, next) => {
  const name = req.params.name;
  const branch = req.body.branch;
  const copydir = require("copy-dir");
  let copyDir = PATH_DIR + "sites\\" + name;

  try {
    // vérif si dossier existe, rename l'ancien dossier à la date du jour
    if (fs.existsSync(copyDir)) {
      let today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;
      const archiveName = copyDir + "-BEFORE-" + today + "-" + new Date().getTime();
      fs.renameSync(copyDir, archiveName);
    }

    // execution de la commande git
    const shell = require("shelljs");
    const path = PATH_DIR + "sites\\";
    shell.cd(path);
    shell.exec("git clone -b " + branch + " xxxxxx/xxxxxxxx.git " + name); // with param branch

    // copie du dossier
    let nodeLiteDir = PATH_DIR + "modulesToCopy\\node_modules_lite";
    let nodeLiteCopyDir = PATH_DIR + "sites\\" + name + "\\node_modules";
    copydir.sync(nodeLiteDir, nodeLiteCopyDir, {
      utimes: true, // keep add time and modify time
      mode: true, // keep file mode
      cover: true, // cover file when exists, default is true
    });

    // on enleve le dossier git qui est superflu ici
    let folderGitToDelete = PATH_DIR + "sites\\" + name + "\\.git";
    var rmdir = require("rimraf");
    rmdir(folderGitToDelete, function(error) {});

    // génération de la clé et .env
    let siteKey = this.generateKey(name, res);

    res.json({ message: "dossier créé", key: siteKey });
  } catch (err) {
    res.json({ message: "error" });
  }
};

//...