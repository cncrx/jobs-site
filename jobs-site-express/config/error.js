const UserTypeAuthError = {
  statusCode: 400,
  msg: "用户身份类型不符"
}

const UserExistError = {
  statusCode: 400,
  msg: `用户名已存在, 注册取消`
}

const UserNotFoundError = {
  statusCode: 400,
  msg: "找不到该用户"
}

const UserPasswordError = {
  statusCode: 400,
  msg: "用户不存在或密码错误",
}

const AutoLoginFailedError = {
  statusCode: 400,
  msg: "自动登录失败",
}

exports.UserTypeAuthError = UserTypeAuthError
exports.UserExistError = UserExistError
exports.UserNotFoundError = UserNotFoundError
exports.UserPasswordError = UserPasswordError
exports.AutoLoginFailedError = AutoLoginFailedError
