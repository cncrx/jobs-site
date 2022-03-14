const db = require("../config/server-config").database
const Error = require("../config/error")

// GET =============================
// 获取 100 条职位信息
async function GetJobsList() {
  return db.collection("jobs")
    .get()
    .then(res => {
      return {
        statusCode: 200,
        msg: `获取成功，共 ${res.data.length} 条数据`,
        jobs_list: res.data
      }
    })
}

// 获取职位信息
async function GetJobInfo(job_Id) {
  return db.collection("jobs")
    .doc(job_Id.trim())
    .field({
      _id: true,
      address: true,
      city: true,
      company_id: true,
      hr_id: true,
      is_hiring: true,
      job_name: true,
      job_detail: true,
      salary: true,
      work_type: true,
    })
    .get()
    .then(res => {
      return res.data[0] === undefined ?
        {
          statusCode: 400,
          msg: "查到 0 条记录",
        } :
        {
          statusCode: 200,
          msg: "获取成功",
          job_info: res.data[0]
        }
    })
}

// 获取当前登录求职用户提交了申请的职位
async function GetAppliedJobsByApplicant(user_Id, user_type) {
  if (user_type === "hr")
    return Error.UserTypeAuthError

  return db.collection("users")
    .doc(user_Id)
    .field({
      applied_jobs: true
    })
    .get()
    .then(res => {
      return {
        statusCode: 200,
        msg: `获取成功，共 ${res.data[0].applied_jobs.length} 条数据`,
        applied_jobs: res.data[0].applied_jobs
      }
    })
}

// 获取当前登录求职用户收藏的职位
async function GetStaredJobsByApplicant(user_Id, user_type) {
  if (user_type === "hr")
    return Error.UserTypeAuthError

  return db.collection("users")
    .doc(user_Id)
    .field({
      stared_jobs: true
    })
    .get()
    .then(res => {
      return {
        statusCode: 200,
        msg: `获取成功，共 ${res.data[0].stared_jobs.length} 条数据`,
        stared_jobs: res.data[0].stared_jobs
      }
    })
}

// 获取当前登录 HR 用户已发布的工作
async function GetHiringJobsByHR(hr_Id, user_type) {
  if (user_type === "applicant")
    return Error.UserTypeAuthError

  return db.collection("jobs")
    .where({ hr_id: hr_Id })
    .field({
      _id: true,
      job_name: true,
      salary: true,
      work_type: true,
      applicant: true
    })
    .get()
    .then(res => {
      return {
        statusCode: 200,
        msg: `获取成功，共 ${res.data.length} 条数据`,
        hiring_jobs: res.data
      }
    })
}


// POST =============================
// 当前登录 HR 用户添加一个职位
async function AddJobOnce(user_type, obj) {
  if (user_type === "applicant")
    return Error.UserTypeAuthError
  
  return db.collection("jobs")
    .add({
      job_name: obj.job_name,
      city: obj.city,
      address: obj.address,
      work_type: obj.work_type,
      salary: obj.salary,
      job_detail: obj.desc,
      is_hiring: true,
      hr_id: obj.hr_id,
      company_id: "05b6a3d76208f082004a977f510e81a0",
      applicant: []
    })

    .then(res => {
      return {
        statusCode: 201,
        msg: `${obj.job_name} 创建成功`
      }
    })
    .catch(err => {
      return {
        statusCode: 400,
        msg: err.code
      }
    })
}

// 求职用户对职位进行提交申请
async function ApplyJobByApplicant(user_Id, user_type, user_name, job_Id, job_name) {
  if (user_type === "hr")
    return Error.UserTypeAuthError

  const result = await db.collection("jobs")
    .doc(job_Id)
    .field({
      applicant: true
    })
    .get()
    .then(res => {
      let applicant_list = res.data[0].applicant;
      for (let i = 0; i < applicant_list.length; i++) {
        if (applicant_list[i]?.user_Id === user_Id) {
          return false
        }
      }
      return true
    })

  if (result) {
    let origin = []
    origin = await db.collection("jobs")
      .doc(job_Id)
      .field({
        applicant: true
      })
      .get()
      .then(res => {
        return res.data[0].applicant
      })
    origin.push({ user_Id, user_name, status: "pending" })
    await db.collection("jobs")
      .doc(job_Id)
      .update({
        applicant: origin
      })


    origin = await db.collection("users")
      .doc(user_Id)
      .field({
        applied_jobs: true
      })
      .get()
      .then(res => {
        return res.data[0].applied_jobs
      })
    origin.push({ job_Id, job_name, status: "pending" })
    return await db.collection("users")
      .doc(user_Id)
      .update({
        applied_jobs: origin
      })
      .then(res => {
        return {
          statusCode: 200,
          msg: "成功提交申请"
        }
      })

  } else {
    return {
      statusCode: 400,
      msg: "用户已对该职位进行过申请"
    }
  }
}

// 求职用户对职位进行收藏
async function StarJobsByApplicant(user_Id, user_type, job_Id, job_name) {
  if (user_type === "hr")
    return Error.UserTypeAuthError

  const result = await db.collection("users")
    .doc(user_Id)
    .field({
      stared_jobs: true
    })
    .get()
    .then(res => {
      let stared_jobs = res.data[0].stared_jobs;
      for (let i = 0; i < stared_jobs.length; i++) {
        if (stared_jobs[i]?.job_Id === job_Id) {
          return false
        }
      }
      return true
    })

  if (result) {
    let origin = []
    origin = await db.collection("users")
      .doc(user_Id)
      .field({
        stared_jobs: true
      })
      .get()
      .then(res => {
        return res.data[0].stared_jobs
      })
    origin.push({ job_Id, job_name })
    return await db.collection("users")
      .doc(user_Id)
      .update({
        stared_jobs: origin
      })
      .then(res => {
        return {
          statusCode: 200,
          msg: "收藏成功"
        }
      })

  } else {
    return {
      statusCode: 400,
      msg: "该职位已收藏"
    }
  }
}

// HR 处理求职用户对已发布的工作的提交申请
async function ProcessApplicationByHR(hr_Id, job_Id, applicant_Id, user_type, result) {
  if (user_type === "applicant")
    return Error.UserTypeAuthError

  let origin = []
  origin = await db.collection("jobs")
    .doc(job_Id)
    .field({
      applicant: true
    })
    .get()
    .then(res => {
      return res.data[0].applicant
    })
  origin.forEach(elem => {
    if (elem.user_Id === applicant_Id)
      elem.status = result
  })
  await db.collection("jobs")
    .doc(job_Id)
    .update({
      applicant: origin
    })


  origin = await db.collection("users")
    .doc(applicant_Id)
    .field({
      applied_jobs: true
    })
    .get()
    .then(res => {
      return res.data[0].applied_jobs
    })
  origin.forEach(elem => {
    if (elem.job_Id === job_Id)
      elem.status = result
  })
  return await db.collection("users")
    .doc(applicant_Id)
    .update({
      applied_jobs: origin
    })
    .then(res => {
      return {
        statusCode: 200,
        msg: "成功处理申请"
      }
    })
}

exports.GetJobsList = GetJobsList
exports.GetJobInfo = GetJobInfo

exports.GetHiringJobsByHR = GetHiringJobsByHR

exports.GetAppliedJobsByApplicant = GetAppliedJobsByApplicant
exports.ApplyJobByApplicant = ApplyJobByApplicant

exports.GetStaredJobsByApplicant = GetStaredJobsByApplicant
exports.StarJobByApplicant = StarJobsByApplicant

exports.AddJobOnce = AddJobOnce
exports.ProcessApplicationByHR = ProcessApplicationByHR