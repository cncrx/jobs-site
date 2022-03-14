<template>
  <div>

    <div class="container">

      <div class="title"><span class="title-text">待处理的应聘请求</span></div>

      <div class="jobs-list-table">
        <el-table :data="applicantList" highlight-current-row border style="width: 100%"
          :default-sort = "{prop: 'status', order: 'ascending'}" max-height="300">

          <el-table-column type="index" width="40">
          </el-table-column>

          <el-table-column prop="job_name" label="岗位名称">
          </el-table-column>

          <el-table-column prop="user_name" label="应聘用户">
          </el-table-column>

          <el-table-column prop="status" label="当前状态" width="100" :filters="statusFilterRules"
            :filter-method="StatusFilter" filter-placement="bottom-end">
            <template slot-scope="scope">
              <p :class="{'passColor': scope.row.status === 'pass', 'rejectColor': scope.row.status === 'reject'}">{{ scope.row.status }}</p>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="processApplication(scope.row.status, scope.row.job_Id, scope.row.user_Id, 'pass')">
                pass
              </el-button>
              <el-button size="mini" @click="processApplication(scope.row.status, scope.row.job_Id, scope.row.user_Id,'reject')">
                reject
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      
    </div>

  </div>
</template>

<script>
import { post,} from "@/api/request";
import { jobs_url } from "@/api/host";

export default {
  name: "ProcessApplicationForm",

  data() {
    return {
      statusFilterRules: [{ text: 'pending', value: 'pending' }, { text: 'pass', value: 'pass' }, { text: 'reject', value: 'reject' }]
    }
  },

  created() {
    
  },

  methods: {
    processApplication(currentStatus, job_Id, applicant_Id, result) {
      if (currentStatus !== "pending")
        return this.$message({
            message: `已进行过处理`,
            type: "warning",
            duration: 3000,
          })

      let json = {
        job_Id, applicant_Id, result
      }

      post(jobs_url+"hiring_jobs", json, true)
        .then((res) => {
          this.$message({
            message: res.data.msg,
            type: "success",
            duration: 2000,
          })
          this.$store.dispatch("GetJobsListForIndex");
        })
        .catch((err) => {
          this.$message({
            message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
            type: "warning",
            duration: 3000,
          })
        })
    },

    StatusFilter(value, row) {
      return row.status === value;
    },
  },

  computed: {
    applicantList() {return this.$store.getters.jobsListForHRProcess}
  }

};
</script>

<style scoped>
.container {
  margin: 1vh auto;
  width: 35%;
}

.title {
  margin-bottom: 3rem;
  text-align: center;
}

.title-text {
  color: #8fa89d;
  font-size: 3rem;
  border-bottom: 0.2rem solid #4f836ed5;
}

.passColor {
  color: rgb(57, 209, 37);
}

.rejectColor {
  color: rgb(219, 106, 94);
}


@media screen and (max-width: 1000px) {
  .container {
    width: 85%;
    padding: 2rem;
  }
}
</style>