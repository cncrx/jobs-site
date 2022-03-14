<template>
  <div>
    <div class="container">
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="OnLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        username: null,
        password: null,
      },

      notify: {
        hrMsg: this.$createElement(
          "p",
          {
            style: { cursor: "pointer" },
            on: {
              click: () => {
                this.autoFill("hr");
              },
            },
          },
          "HR 账号: hr1, 密码: 123, 点击自动填充"
        ),
        applicantMsg: this.$createElement(
          "p",
          {
            style: { cursor: "pointer" },
            on: {
              click: () => {
                this.autoFill("applicant");
              },
            },
          },
          "求职者账号: applicant1, 密码: 123, 点击自动填充"
        ),
      },
    };
  },

  created() {
    this.$notify({
      type: "info",
      title: "提示",
      dangerouslyUseHTMLString: true,
      message: this.notify.hrMsg,
      position: "bottom-right",
      duration: 8000,
    });

    this.$nextTick(() => {
      this.$notify({
        type: "info",
        title: "提示",
        dangerouslyUseHTMLString: true,
        message: this.notify.applicantMsg,
        position: "bottom-right",
        duration: 8000,
      });
    });
  },

  methods: {
    autoFill(type) {
      type === "hr"
        ? (this.form = { username: "hr1", password: "123" })
        : (this.form = { username: "applicant1", password: "123" });
    },

    OnLogin() {
      if (this.form.username || this.form.password) {  
        this.$emit("on-login", this.form)
      } else
        this.$message({
          message: `用户或密码不能为空`,
          type: "error",
          duration: 2000,
        })
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