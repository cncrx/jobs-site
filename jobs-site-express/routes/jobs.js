const express = require('express');
const router = express.Router();
const jobsController = require("../controllers/jobs-controller")
const JwtAuth = require("../middleware/auth").JwtAuth
const CatchAuthErr = require("../middleware/auth").CatchAuthErr

/*
	/: GET, POST
	/applied_jobs: GET, POST
	/stared_jobs: GET, POST
	/hiring_jobs: GET, POST
	/id: GET
*/

router.route("/")
	.get(async (req, res) => {
		const result = await jobsController.GetJobsList()
		res.status(result.statusCode).send({
			msg: result.msg,
			jobs_list: result.jobs_list
		})
	})
	.post(JwtAuth, CatchAuthErr, async (req, res) => {
		const result = await jobsController.AddJobOnce(req.user.user_type, req.body)
		res.status(result.statusCode).send({
			msg: result.msg,
		})
	})

router.route("/applied_jobs")
	.get(JwtAuth, CatchAuthErr, async (req, res) => {
		const result = await jobsController.GetAppliedJobsByApplicant(req.user.user_Id)
		res.status(result.statusCode).send({
			msg: result.msg,
			applied_jobs: result.applied_jobs
		})
	})
	.post(JwtAuth, CatchAuthErr, async (req, res) => {
		const result = await jobsController.ApplyJobByApplicant(req.user.user_Id, req.user.user_type, req.user.user_name, req.body.job_Id, req.body.job_name)
		res.status(result.statusCode).send({
			msg: result.msg,
		})
	})

router.route("/stared_jobs")
	.get(JwtAuth, CatchAuthErr, async (req, res) => {
		console.log(req.user);
		const result = await jobsController.GetStaredJobsByApplicant(req.user.user_Id, req.user.user_type)	
		res.status(result.statusCode).send({
			msg: result.msg,
			stared_jobs: result.stared_jobs
		})
	})
	.post(JwtAuth, CatchAuthErr, async (req, res) => {
		const result = await jobsController.StarJobByApplicant(req.user.user_Id, req.user.user_type, req.body.job_Id, req.body.job_name)
		res.status(result.statusCode).send({
			msg: result.msg,
		})
	})

router.route("/hiring_jobs")
	.get(JwtAuth, CatchAuthErr, async (req, res) => {
		const result = await jobsController.GetHiringJobsByHR(req.user.user_Id, req.user.user_type)
		res.status(result.statusCode).send({
			msg: result.msg,
			hiring_jobs: result.hiring_jobs
		})
	})
	.post(JwtAuth, CatchAuthErr, async (req, res) => {
		const result = await jobsController.ProcessApplicationByHR(req.user.user_Id,
			req.body.job_Id, req.body.applicant_Id, req.user.user_type, req.body.result)
			res.status(result.statusCode).send({
				msg: result.msg
			})
	}) 

router.route("/:id")
	.get(async (req, res) => {
		const result = await jobsController.GetJobInfo(req.params.id)
		res.status(result.statusCode).send({
			msg: result.msg,
			job_info: result.job_info
		})
	})
module.exports = router 
