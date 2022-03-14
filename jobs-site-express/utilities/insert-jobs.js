const fs = require("fs")

function GetJobsList() {
  return fs.readFileSync("./jobs-list.txt", "utf-8", (err, data) => {
    if (err) throw (err)
    //console.log(lines);
    return data // 0 - 99
  })
}

// 生成假数据
function main(num) {
  const db = require("../config/server-config").database;
  const Mock = require('mockjs')

  // 职位列表
  const jobs_list = GetJobsList().split(/\r?\n/)

  for (let i = 0; i < num; i++) {
    // 职位名
    let job_name = jobs_list[Math.floor((Math.random() * 99))]
    // 城市
    let city = Mock.Random.city() + " " + Mock.Random.county()
    // 位置
    let address = Mock.Random.province() + " " + city + " " + Mock.Random.cname() + "街道 " + Mock.Random.zip()
    // 类型
    let work_type = ["全职", "兼职"][Math.floor(Math.random() * 2)]
    // 工资
    let salary = Mock.mock({
      "number|3000-10000": 2022
    }).number
    // JD
    let job_detail = Mock.mock('@cparagraph(6)')
    // 招聘状态
    let is_hiring = true

    let job = {
      job_name,
      city,
      address,
      work_type,
      salary,
      job_detail,
      is_hiring,
      hr_id: "ed9d0ceb620bcc91004dfb60721ddcc2",
      company_id: "05b6a3d76208f082004a977f510e81a0",
      applicant: []
    }
    console.log(job);

    db.collection("jobs")
      .add(job)
  }

}


setInterval(() => {
  main(10)
}, 3000)

