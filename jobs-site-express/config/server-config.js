const JWT_SECRET_KEY = ""

const cloudbase = require("@cloudbase/node-sdk");
const db = cloudbase.init({
  env: "",
  region: "",
  secretId: "",
  secretKey: "",
})

exports.JWT_SECRET_KEY = JWT_SECRET_KEY
exports.database = db.database()