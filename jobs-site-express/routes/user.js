const express = require('express');
const router = express.Router();
const userController = require("../controllers/user-controller")
const JwtAuth = require("../middleware/auth").JwtAuth
const CatchAuthErr = require("../middleware/auth").CatchAuthErr

/*
	/:id: GET
	/: POST, PUT
*/

// 获取/更新用户资料
router.route("/:id")
	.get(async (req, res) => {
		const result = await userController.GetUserInfo(req.params.id.toString())
		res.status(result.statusCode).send({
			msg: result.msg
		})
	})

// 用户的注册/登录
router.route("/")
	.get((req, res) => {
		res.status(200).send({
			msg: "success"
		})
	})
	.post(async (req, res) => {
		if (JSON.stringify(req.body) === "{}")
			return res.status(400).send({
				msg: "请求为空"
			})

		if (req.body.action === "register") {
			const result = await userController.RegisterUser(req.body)
			res.status(result.statusCode).send({
				msg: result.msg,
				userInfo: result.user_info,
				token: result.token
			})

		} else if (req.body.action === "login") {
			const result = await userController.LoginUser(req.body.user_name, req.body.password)
			res.status(result.statusCode).send({
				msg: result.msg,
				userInfo: result.user_info,
				token: result.token
			})

		} else if (req.body.action === "token") {
			const result = await userController.AutoLogin(req.get("Authorization"))
			res.status(result.statusCode).send({
				msg: "自动登录成功",
				userInfo: result.user_info
			})

		} else {
			return res.status(400).send({
				msg: "???"
			})
		}
	})

	.put(JwtAuth, CatchAuthErr, async (req, res) => {
		const result = await userController.UpdateUserInfo(req.user.user_Id, req.body)
		res.status(result.statusCode).send({
			msg: result.msg
		})
	})



module.exports = router
