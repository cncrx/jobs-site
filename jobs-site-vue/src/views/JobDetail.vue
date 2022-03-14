<template>
  <div>
    <div class="container" v-if="jobDetail">
      <div class="item">
        <span class="title">岗位：</span>{{ jobDetail.job_name }}
      </div>
      <div class="item">
        <span class="title">状态：</span
        >{{ jobDetail.is_hiring === true ? "招聘中" : "暂停招聘" }}
      </div>
      <div class="item">
        <span class="title">类型：</span>{{ jobDetail.work_type }}
      </div>
      <div class="item">
        <span class="title">城市：</span>{{ jobDetail.city }}
      </div>
      <div class="item">
        <span class="title">详细地址：</span>{{ jobDetail.address }}
      </div>
      <div class="item">
        <span class="title">薪酬：</span>{{ jobDetail.salary }}
      </div>
      <section class="item">
        <h1 class="title">详细介绍：</h1>
        <p class="item">{{ jobDetail.job_detail }}</p>
      </section>
      <div class="item">
        <el-link icon="el-icon-back" target="_blank" class="icon" @click="goBack">返回</el-link >
        <el-link icon="el-icon-office-building" target="_blank" class="icon" @click="gotoCompanyDetail(jobDetail.company_id)">前往公司</el-link >
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/api/request";
import { jobs_url } from "@/api/host";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      jobDetail: null,
    };
  },

  created() {
    this.GetJobDetail(this.id);
  },

  methods: {
    GetJobDetail(jobId) {
      get(jobs_url, jobId)
        .then((res) => {
          this.jobDetail = res.data.job_info;
        })
        .catch((err) => {
          this.$message({
            message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
            type: "error",
            duration: 5000,
          });
        });
    },

    gotoCompanyDetail(id) {
      this.$router.push({name: "CompanyDetail", params: {id}})
    },

    goBack() {
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
.container {
  width: 75%;
  margin: 5rem auto;
}

.item {
  font-size: 2rem;
  letter-spacing: 0.2ch;
  color: rgb(67, 80, 72);
}

.title {
  font-weight: bold;
  color: rgb(40, 56, 46);
}

h1.title {
  font-size: 2rem;
}

.icon {
  margin: 3rem 0 3rem 1rem;
  font-size: 1.6rem;
  float: right;
}
</style>