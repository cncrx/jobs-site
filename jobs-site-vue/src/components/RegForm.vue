<template>
  <div>
    <div class="container">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">

        <el-form-item label="用户类型" prop="userType">
          <el-select v-model="form.userType" placeholder="请选择用户类型">
            <el-option label="求职者" value="applicant"></el-option>
            <el-option label="招聘者" value="hr"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="age" v-model.number="form.phoneNumber" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="mail">
          <el-input type="email" v-model.number="form.mail"></el-input>
        </el-form-item>

        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="form.desc" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="OnReg">注册</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "RegForm",
  data() {
    return {
      rules: {
        userType: [{required: true, message: "用户类型不能为空", trigger: 'blur'}],
        username: [{required: true, message: "用户名不能为空", trigger: 'blur'}],
        password: [{required: true, message: "密码不能为空", trigger: 'blur'}, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        phoneNumber: [{required: true, message: "手机号不能为空", trigger: 'blur'}, {type: "number", message: "手机号必须为数字"}],
        mail: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
      },

      form: {
        userType: null,
        username: null,
        password: null,
        phoneNumber: 13122223333,
        mail: "1@a.test",
        avatar: "pic.com",
        desc: "这是一段desc"
      },
    };
  },

  created() {},

  methods: {
    OnReg() {
      if (this.CheckFormFieldsIsNull())
        this.$message({
          message: `必填字段为空`,
          type: "error",
          duration: 3000,
        })
      else
        this.$emit("on-reg", this.form)
    },

    // 返回表单字段是否仍是空
    CheckFormFieldsIsNull() {
      return Object.values(this.form).filter(item => item === null).length === 0 ?
        false : true
    }
  },
};
</script>

<style scoped>
.container {
  margin: 3vh auto;
  width: 35%;
  padding: 2rem;

  border-radius: 30px;
  border: 0.5rem #b0cfc0 solid;
  box-shadow: 0 1rem 1rem 0 #7dc7a648, inset 0 0 1rem 0 #7dc7a6a6;
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

.notify {
  cursor: pointer;
}

@media screen and (max-width: 1000px) {
  .container {
    width: 75%;
    padding: 2rem;
  }
}
</style>