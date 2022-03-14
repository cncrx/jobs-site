<template>
  <div>
    <div class="switcher">
      <div class="item" :class="{ 'item-avtive': loginBtnActive }" @click="OnSwitch('login')" >
        登录
      </div>
      <div class="item" style="cursor: default">/</div>
      <div class="item" :class="{ 'item-avtive': regBtnActive }" @click="OnSwitch('reg')">
        注册
      </div>
    </div>

    <LoginForm v-show="loginBtnActive" @on-login="OnLogin" />
    <RegForm v-show="regBtnActive" @on-reg="OnReg"  />
  </div>
</template>

<script>
import { post } from "@/api/request";
import { users_url } from "@/api/host";

import LoginForm from "@/components/LoginForm";
import RegForm from "@/components/RegForm";

export default {
  components: {
    LoginForm,
    RegForm,
  },

  data() {
    return {
      loginBtnActive: true, // 默认 active
      regBtnActive: false,
    };
  },

  methods: {
    OnSwitch(val) {
      if (val === "login") {
        this.loginBtnActive = true;
        this.regBtnActive = false;
      } else if (val === "reg") {
        this.loginBtnActive = false;
        this.regBtnActive = true;
      }
    },

    OnLogin(form) {
      let loginJson = {
        action: "login",
        user_name: form.username,
        password: form.password,
      }

      post(users_url, loginJson)
        .then((res) => {
          let userInfo = res.data.userInfo
          this.$store.commit("SetUserInfo", {
            userId: userInfo.user_Id,
            username: userInfo.user_name,
            userType: userInfo.user_type,
          })
          localStorage.setItem("token", res.data.token)

          this.$router.push({ name: "Index" })

          this.$message({
            message: res.data.msg,
            type: "success",
            duration: 2000,
          })
        })
        .catch((err) => {
          this.$message({
            message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
            type: "error",
            duration: 5000,
          })
        })
    },

    OnReg(form) {
      let regJson = {
        action: "register",
        user_type: form.userType,
        user_name: form.username,
        password: form.password,
        phone_number: form.phoneNumber,
        mail: form.mail,
        avatar: form.avatar,
        desc: form.desc
      }
      console.log(regJson);
      post(users_url, regJson)
        .then((res) => {
          let userInfo = res.data.userInfo
          this.$store.commit("SetUserInfo", {
            userId: userInfo.user_Id,
            username: userInfo.user_name,
            userType: userInfo.user_type,
          })
          localStorage.setItem("token", res.data.token)

          this.$router.push({ name: "Index" });

          this.$message({
            message: res.data.msg,
            type: "success",
            duration: 3000,
          })
        })
        .catch((err) => {
          this.$message({
            message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
            type: "error",
            duration: 5000,
          })
        })
    }

  },
};
</script>

<style>
.switcher {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
}

.item {
  margin-left: 1rem;
  font-size: 2.6rem;
  color: rgb(161, 159, 159);
  cursor: pointer;
}

.item-avtive {
  color: #4f836ed5;
  font-weight: 600;
}
</style>