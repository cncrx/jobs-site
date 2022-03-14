
const express = require("express")
const parser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

const RateLimiter = require("express-rate-limit")
const limiter = RateLimiter({
  windowMs: 1*60*1000,
  max: 10
})

const app = express()
app.use(cors())
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(morgan("combined"))
app.use(limiter)

app.listen(3000, () => console.log("=== server started ==="))

const userRouter = require("./routes/user")
app.use("/user", userRouter)

const jobsRouter = require("./routes/jobs")
app.use("/jobs", jobsRouter)

const companiesRouter = require("./routes/companies")
app.use("/companies", companiesRouter)
