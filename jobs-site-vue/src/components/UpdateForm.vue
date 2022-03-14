<template>
  <div>
    <div class="container">
      <div class="title"><span class="title-text">修改信息</span></div>

      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="age" v-model.number="form.phone_number" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="mail">
          <el-input type="email" v-model.number="form.mail"></el-input>
        </el-form-item>

        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="form.desc" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="OnUpdate">修改</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>

export default {
  name: "UpdateForm",
  data() {
    return {
      rules: {
        phoneNumber: [{type: "number", message: "手机号必须为数字"}],
        mail: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
      },

      form: {
        phone_number: null,
        mail: null,
        desc: null
      },
    };
  },

  methods: {
    OnUpdate() {
      if (Object.values(this.form).filter(i => i !== null).length !== 0) {
        let updateJson = {}
        for (let i in this.form) {
          if (this.form[i] !== null && this.form[i] !== "")
            updateJson[i] = this.form[i]
        }
        this.$emit("on-update", updateJson)
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