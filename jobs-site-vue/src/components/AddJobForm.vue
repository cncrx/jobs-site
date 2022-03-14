<template>
  <div>
    <div class="container">
      <div class="title"><span class="title-text">添加岗位</span></div>
      
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item label="岗位名称" prop="job_name">
        <el-input v-model="form.job_name" maxlength="8"></el-input>
      </el-form-item>

      <el-form-item label="城市" prop="city">
        <el-input v-model="form.city" maxlength="10"></el-input>
      </el-form-item>

      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address" maxlength="25"></el-input>
      </el-form-item>

      <el-form-item label="薪酬" prop="salary">
          <el-input type="age" v-model.number="form.salary" maxlength="5"></el-input>
      </el-form-item>

      <el-form-item label="详细介绍">
        <el-input type="textarea" v-model="form.desc" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="work_type">
        <el-select v-model="form.work_type">
          <el-option label="全职" value="全职"></el-option>
          <el-option label="兼职" value="兼职"></el-option>
        </el-select>
      </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="OnAddJob">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>

export default {
  name: "AddJobForm",
  data() {
    return {
      rules: {
        job_name: [{required: true}],
        city: [{required: true}],
        address: [{required: true}],
        salary: [{required: true, type: "number", message: "薪酬必须为数字"}],
        work_type: [{required: true}],
      },

      form: {
        job_name: null,
        city: null,
        address: null,
        work_type: null,
        salary: null,
        desc: null
      },
    };
  },

  methods: {
    OnAddJob() {
      if (! Object.values(this.form).filter(i => i === null).length > 0) {
        let addJobson = {}
        for (let i in this.form) {
          if (this.form[i] !== null && this.form[i] !== "")
            addJobson[i] = this.form[i]
        }
        addJobson.hr_id = this.$store.state.loginPage.loginedUserId
        this.$emit("on-add-job", addJobson)
      }
      else
        this.$message({
          message: `没有填写`,
          type: "warning",
          duration: 3000,
        })
    },
  },
}
</script>

<style scoped>
.container {
  margin: 1vh auto;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-button--primary {
  float: right;
  margin-top: 1rem;
  background-color: #57917abd;
  border-color: white;
}

.el-button--primary:hover {
  background-color: #4f836ed5;
  box-shadow: 0 1rem 1rem 0 rgb(0 0 0 / 10%);
}

.title {
  text-align: center;
}

.title-text {
  color: #8fa89d;
  font-size: 3rem;
  border-bottom: .2rem solid #4f836ed5;
}

@media screen and (max-width: 1000px) {
  .container {
    width: 85%;
    padding: 2rem;
  }
}
</style>