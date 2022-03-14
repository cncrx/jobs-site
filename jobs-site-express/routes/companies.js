const express = require('express')
const router = express.Router()
const db = require("../config/server-config").database

// 获取公司简介
router.route("/:id")
	.get(async (req, res) => {
		const result = await db.collection("companies")
			.doc(req.params.id.toString().trim())
			// 只需这些字段
			.field({
				_id: true,
				company_address: true,
				company_name: true,
				desc: true,
				logo: true,
			})
			.get()
			.then(res => {
				return res.data[0]
			})
		
		result === undefined ?
			res.status(400).send({
				msg: "查到 0 条记录",
			}) :
			res.status(200).send({
				msg: "获取成功",
				company_detail: result
			})
	})


module.exports = router
