<template>
  <div>

    <div class="container">

      <div class="title"><span class="title-text">已创建的岗位</span></div>

      <div class="jobs-list-table">
        <el-table :data="hiringJobsList" highlight-current-row border style="width: 100%" max-height="300">

          <el-table-column type="index" width="40">
          </el-table-column>

          <el-table-column prop="job_name" label="岗位名称">
          </el-table-column>

          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="gotoJobDetail(scope.row._id)">
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
export default {
  name: "HiringJobsForm",

  methods: {
    gotoJobDetail(jobId) {
      this.$router.push({name: "JobDetail", params: {id: jobId}})
    }
  },

  computed: {
    hiringJobsList() {
      return this.$store.getters.hiringJobsListForHR
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