const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = require("../config/server-config").JWT_SECRET_KEY
const express_jwt = require("express-jwt")

function GenerateToken(user_Id, user_name, user_type) {
  return "Bearer " + jwt.sign({
    user_Id,
    user_name,
    user_type
  }, JWT_SECRET_KEY, {
    expiresIn: "5d"
  })
}

const JwtAuth = express_jwt({
  secret: JWT_SECRET_KEY,
  algorithms: ["HS256"]
})

// 捕获错误中间件
function CatchAuthErr(err, req, res, next) {
  console.log(req.get("Authorization"));
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({
      msg: "Token 错误，请登录/注册，详见: " + err.code
    })
  } else {
    next()
  }
}

exports.JwtAuth = JwtAuth
exports.CatchAuthErr = CatchAuthErr
exports.GenerateToken = GenerateToken