# 招聘平台 jobs-site
基于 `Vue 2` + `Express` 的招聘平台 Demo

## 项目运行
``` bash
# 克隆到本地
git clone https://github.com/cncrx/jobs-site.git

# 进入 jobs-site-express 文件夹
cd jobs-site-express

# 安装依赖
npm i

# 开通腾讯云云开发数据库（免费版）https://cloud.tencent.com/product/tcb
# 在云开发数据库新建三个集合：companies jobs users

# 填写 jobs-site-express\config\server-config.js
const JWT_SECRET_KEY = "xxxxx"
const db = cloudbase.init({
  env: "云开发应用环境ID",
  region: "ap-guangzhou 所在地域",
  secretId: "腾讯云账号 secretId",
  secretKey: "腾讯云账号 secretKey",
})

# 运行 Express localhost:3000
npm run dev

# 进入 jobs-site-vue 文件夹
cd jobs-site-vue

# 安装依赖
npm i

# 填写 jobs-site-vue\src\api\host.js
const host = "你的 IP 地址:3000 或 localhost:3000"

# 开启本地服务器 localhost:8080
npm run dev
```
