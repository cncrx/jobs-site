<template>
  <div class="jobs-list-component">
    <div class="jobs-container">
      <el-card
        v-for="(job, index) in jobsList"
        :key="index"
        class="box-card"
      >
        <div slot="header" class="clearfix">
          <span class="job-name text">{{ job.job_name }}</span>
          <el-divider direction="vertical"></el-divider>
          <span class="job-work-type text">{{ job.work_type }}</span>
          <span class="job-hiring-status text">{{
            job.is_hiring ? "招聘中" : "暂停招聘"
          }}</span>
        </div>
        <div class="flex-box-1">
          <div class="job-city text">
            <p class="job-detail-title">城市：</p>
            {{ job.city }}
          </div>
          <div class="job-address text">
            <p class="job-detail-title">详细地址：</p>
            {{ job.address }}
          </div>
          <div class="flex-box-2">
            <span class="job-salary text">
              <p class="job-detail-title">月薪：</p>
              {{ job.salary }} 元
            </span>
            <el-button-group class="button-group">
              <el-button type="primary" size="medium" icon="el-icon-star-off" @click="StaredJob(job._id, job.job_name)">
                收藏
              </el-button>
              <el-button type="primary" size="medium" icon="el-icon-more-outline" @click="gotoJobDetail(job._id)">
                详细
              </el-button>
              <el-button type="primary" size="medium" icon="el-icon-edit" @click="AppliedJob(job._id, job.job_name)">
                应聘
              </el-button>
            </el-button-group>
          </div>
        </div>
      </el-card>
    </div>

    <div class="paginator" v-show="jobsListLength !== 0">
      <el-pagination
        :small="shrinkPaginator"
        background
        layout="prev, pager, next"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        :total="jobsListLength"
        @current-change="OnPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { post } from "@/api/request"
import { jobs_url } from "@/api/host"

export default {
  name: "JobsList",

  props: {
    pJobsList: Array,
    pJobsListLength: Number,
    pPageNum: Number
  },

  data() {
    return {
      shrinkPaginator: false,
    };
  },

  created() {
    window.onresize = () => {
      this.shrinkPaginator = document.documentElement.clientWidth < 500 ? true : false
    }
  },

  methods: {
    StaredJob(jobId, jobName) {
      let staredJobJson = {
        job_Id: jobId,
        job_name: jobName
      }

      post(jobs_url+"stared_jobs", staredJobJson, true)
        .then((res) => {
          this.$message({message: res.data.msg, type: "success", duration: 2000,})
        })
        .catch((err) => {
          if (err?.response)
            this.$message({message: `状态码: ${err.response.status}, ${err.response.data.msg}`, type: "warning", duration: 5000,})
        })
    },

    AppliedJob(jobId, jobName) {
      let appliedJobJson = {
        job_Id: jobId,
        job_name: jobName
      }

      post(jobs_url+"applied_jobs", appliedJobJson, true)
        .then((res) => {
          this.$message({message: res.data.msg, type: "success", duration: 2000,})
        })
        .catch((err) => {
          if (err?.response)
            this.$message({message: `状态码: ${err.response.status}, ${err.response.data.msg}`, type: "warning", duration: 5000,})
        })
    },

    gotoJobDetail(jobId) {
      this.$router.push({name: "JobDetail", params: {id: jobId}})
    },

    OnPageChange(pageNum) {
      this.$emit("on-page-change", {pageNum})
    }
  },

  computed: {
    jobsList: {
      get() {return this.pJobsList},
      set() {}
    },
    jobsListLength: {
      get() {return this.pJobsListLength},
      set() {}
    },

    pageNum: {
      get() {return this.pPageNum},
      set() {},
    },
    // 两个页面 pageSize 都是 9
     pageSize: {
      get() {return this.$store.state.pageSize},
      set() {},
    }
  }
};
</script>

<style>
.jobs-container {
  margin: 1rem 5%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(30rem, auto);
  grid-gap: 3rem;
}

.jobs-container .text {
  font-size: 1.6rem;
  letter-spacing: 0.15rem;
  color: #6e7972;
}

.jobs-container .job-name {
  font-size: 2.2rem;
  font-weight: bold;
  color: #6e7972;
}

.jobs-container .job-work-type {
  font-size: 1.4rem;
  color: #b8b9b8;
}

.jobs-container .job-hiring-status {
  float: right;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: #55c490;
}

.jobs-container .flex-box-1 {
  display: flex;
  flex-direction: column;
}

.jobs-container .job-detail-title {
  font-size: 1.6rem;
  color: #b8b9b8;
}

.jobs-container .flex-box-2 {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
}

.jobs-container .job-address {
  max-width: 70%;
  min-height: 8rem;
  margin: 1rem 0;
  line-height: 2.6rem;
}

.jobs-container .button-group .el-button--primary {
  margin-top: 1rem;
  background-color: #57917abd;
  border-color: white;
}

.jobs-container .button-group .el-button--primary:hover {
  background-color: #4f836ed5;
  box-shadow: 0 1rem 1rem 0 rgb(0 0 0 / 10%);
}

.jobs-container .job-salary {
  font-size: 2.6rem;
  white-space: nowrap;
  color: rgb(241, 102, 87);
}

.paginator {
  margin-top: 3rem;
  text-align: center;
}

.paginator .el-pagination.is-background .el-pager li.active{
  background-color: #4f836ed5 !important;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}


@media screen and (max-width: 1000px){
  .jobs-container {
    padding: 1rem 2rem;
    grid-template-columns: 1fr;
  }

  .jobs-container .button-group .el-button--primary {
    padding: 1rem;
    font-size: 2rem;
  }
}

@media screen and (min-width: 1000px) {
  .jobs-container {
    margin: 1rem 5%;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
