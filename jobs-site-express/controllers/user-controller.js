const db = require("../config/server-config").database
const bcrypt = require("bcryptjs")
const GenerateToken = require("../middleware/auth").GenerateToken
const JWT_SECRET_KEY = require("../config/server-config").JWT_SECRET_KEY
const jwt = require("jsonwebtoken")
const Error = require("../config/error")


// UTILITY =============================
async function CheckIsUserExist(user_name) {
  const result = await db.collection("users")
    .where({ user_name: user_name })
    .get()
    .then(res => {
      if (res.data.length !== 0) {
        return true
      } else {
        return false
      }
    })
  return result
}

function EncryptPassword(uncrypt_password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(uncrypt_password, salt)
  return hash
}

async function CompareCryptedPassword(uncrypt_password, crypted_password) {
  return bcrypt.compareSync(uncrypt_password, crypted_password)
}

async function VerifyUserPassword(user_name, uncrypt_password = "") {
  let crypted_password

  return db.collection("users")
    .where({ user_name: user_name })
    .get()
    .then(res => {
      crypted_password = res.data[0]?.password ? res.data[0]?.password : ""
      return {
        correct: CompareCryptedPassword(uncrypt_password, crypted_password),
        user_Id: res.data[0]?._id,
        user_type: res.data[0]?.user_type
      }
    })
}


// GET =============================
async function GetUserInfo(user_Id) {
  return db.collection("users")
    .doc(user_Id)
    // 只需要这些字段
    .field({
      _id: true,
      user_name: true,
      user_type: true,
      phone_number: true,
      mail: true,
      avatar: true,
      desc: true
    })
    .get()
    .then(res => {
      let result = res.data[0]
      if (result) {
        return {
          statusCode: 200,
          msg: result
        }
      } else {
        return Error.UserNotFoundError
      }
    })
}


// POST =============================
async function RegisterUser(obj) {

  if (await CheckIsUserExist(obj.user_name))
    return Error.UserExistError

  return db.collection("users")
    .add({
      user_name: obj.user_name,
      password: EncryptPassword(obj.password),
      user_type: obj.user_type,
      phone_number: obj.phone_number,
      mail: obj.mail,
      avatar: obj.avatar,
      desc: obj.desc,
      stared_jobs: obj.user_type === "applicant" ? [] : null, // 求职者才有的字段
      applied_jobs: obj.user_type === "applicant" ? [] : null, // 求职者才有
    })

    .then(res => {
      const token = GenerateToken(res.id, obj.user_name, obj.user_type)

      return {
        statusCode: 201,
        msg: `用户 ${obj.user_name} 注册成功`,
        user_info: {user_Id: res.id, user_name: obj.user_name, user_type: obj.user_type},
        token
      }
    })
}

async function LoginUser(user_name, uncrypt_password) {
  const result = await VerifyUserPassword(user_name, uncrypt_password)
  if (await result.correct) {
    const token = GenerateToken(result.user_Id, user_name, result.user_type)

    return {
      statusCode: 200,
      msg: `用户 ${user_name} 登录成功`,
      user_info: {user_Id: result.user_Id ,user_name: user_name, user_type: result.user_type},
      token
    }
  }
  else 
    return Error.UserPasswordError
}

async function AutoLogin(token) {
  if (token) {
    return jwt.verify(token.slice(7), JWT_SECRET_KEY, (err, decoded) => {
      if (err)
        return Error.AutoLoginFailedError
      else 
        return {
          statusCode: 200,
          msg: `自动登录成功`,
          user_info: {user_Id: decoded.user_Id ,user_name: decoded.user_name, user_type: decoded.user_type},
        }
    })
  }
  else
    return Error.AutoLoginFailedError
}


// PUT =============================
async function UpdateUserInfo(user_Id, obj) {
  return db.collection("users")
    .doc(user_Id)
    .update({
      phone_number: obj.phone_number,
      mail: obj.mail,
      avatar: obj.avatar,
      desc: obj.desc
    })
    .then(res => {
      return {
        statusCode: 200,
        msg: `提交成功, 资料已修改`
      }
    })
    .catch(err => {
      return {
        statusCode: 400,
        msg: err.code
      }
    })
}

exports.GetUserInfo = GetUserInfo
exports.UpdateUserInfo = UpdateUserInfo

exports.RegisterUser = RegisterUser
exports.LoginUser = LoginUser
exports.AutoLogin = AutoLogin

