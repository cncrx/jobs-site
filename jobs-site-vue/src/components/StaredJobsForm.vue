<template>
  <div>

    <div class="container">

      <div class="title"><span class="title-text">收藏岗位</span></div>

      <div class="jobs-list-table">
        <el-table :data="staredJobsList" highlight-current-row border style="width: 100%" max-height="300">

          <el-table-column type="index" width="40">
          </el-table-column>

          <el-table-column prop="job_name" label="岗位名称">
          </el-table-column>

          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="gotoJobDetail(scope.row.job_Id)">
                前往
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      
    </div>

  </div>
</template>

<script>
import { get } from "@/api/request";
import { jobs_url } from "@/api/host";

export default {
  name: "StaredJobsForm",

  created() {
    this.GetStaredJobsList()
  },

  methods: {
    gotoJobDetail(jobId) {
      this.$router.push({name: "JobDetail", params: {id: jobId}})
    },

    GetStaredJobsList() {
      get(jobs_url, "stared_jobs", true)
        .then((res) => {
          this.$store.commit("SetStaredJobsList", res.data.stared_jobs)
        })
        .catch((err) => {
          this.$message({
            message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
            type: "warning",
            duration: 3000,
          })
        })
    },
  },

  computed: {
    staredJobsList: {
      get() {return this.$store.state.personalPage.staredJobsList},
      set() {}
    },
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

@media screen and (max-width: 1000px) {
  .container {
    width: 85%;
    padding: 2rem;
  }
}
</style>