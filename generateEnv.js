//...
// Pour des raisons de confidentialités, seul une partie du code est visible

// generate key and .env file
exports.generateKey = (name, res) => {
  let randtoken = require("rand-token");
  let key = randtoken.suid(32);
  const crypto = require("crypto");
  let hash = crypto
    .createHash("sha256")
    .update(key)
    .digest("hex");
  // enregistrement credentials base mysql

  let envToCreate = PATH_DIR + "sites\\" + name + "\\.env";
  let contentEnv = [];
  contentEnv.push("NODE_ENV = 'developpement'");
  contentEnv.push("VUE_APP_NODE_ENV = 'developpement'");
  contentEnv.push("VUE_APP_ROOT_API = '/'");
  contentEnv.push("# Api domaine perso Greg");
  contentEnv.push("VUE_APP_URL_DISTANT_API = 'https://xxxxxxx.fr/'");
  contentEnv.push("VUE_APP_URL_UPLOAD_FOLDER = 'http://xxxxxxx.com/xxxxx/xxxxx/xxxxftp/'");
  contentEnv.push("VUE_APP_SITE_ALIAS = '" + name + "'");
  contentEnv.push("VUE_APP_SITE_KEY = '" + hash + "'");
  contentEnv.push("VUE_APP_DB_DATABASE = 'xxxxxxxxxx'");
  contentEnv.push("VUE_APP_DB_USER = 'xxxxxxxxxxxx'");
  contentEnv.push("VUE_APP_DB_PASSWORD = 'xxxxxxxxx'");
  contentEnv.push("VUE_APP_DB_HOST = 'xxxxxxxxxxxxxxx'");

  fs.writeFileSync(envToCreate, "");
  contentEnv.forEach((line) => {
    fs.appendFileSync(envToCreate, line + "\n");
  });

  return key;
};

//...