<template>
  <div>
    <div class="container" v-if="companyDetail">
      <div class="item">
        <span class="title">公司：</span>{{ companyDetail.company_name }}
      </div>

      <div class="item">
        <span class="title">地址：</span>{{ companyDetail.company_address }}
      </div>

      <section>
        <h1 class="title">详细介绍：</h1>
        <p class="item">{{ companyDetail.desc }}</p>
      </section>

      <div class="item">
        <div class="logo">
          <img :src="companyLogoUrl" alt="Company Logo" />
          <p class="alt">公司 Logo</p>
        </div>
      </div>

      <div class="item">
        <el-link icon="el-icon-back" target="_blank" class="icon" @click="goBack">返回</el-link >
      </div>

    </div>
  </div>
</template>

<script>
import { get } from "@/api/request";
import { companies_url } from "@/api/host";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      companyDetail: null,
      companyLogoUrl:
        "https://fgkfbte7d5piwws80-1251387490.cos.ap-guangzhou.myqcloud.com/%E5%9B%BE%E5%BA%8A/Company%20Logo.png",
    };
  },

  created() {
    this.GetCompanyDetail(this.id);
  },

  methods: {
    GetCompanyDetail(companyId) {
      get(companies_url, companyId)
        .then((res) => {
          this.companyDetail = res.data.company_detail;
        })
        .catch((err) => {
          this.$message({
            message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
            type: "error",
            duration: 5000,
          });
        });
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
  margin: 0.5rem auto;
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

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.alt {
  font-size: 1rem;
  color: rgb(167, 164, 164);
}

.icon {
  font-size: 1.6rem;
  float: right;
}
</style>