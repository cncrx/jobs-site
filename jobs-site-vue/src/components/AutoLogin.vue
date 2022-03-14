<template>
  <div></div>
</template>

<script>
import { post } from "@/api/request";
import { users_url } from "@/api/host";

export default {
  name: "AutoLogin",

  created() {
    this.AutoLogin()
  },

  methods: {
    AutoLogin() {
      let token = localStorage.getItem("token");
      if (token) {
        let autoLoginJson = {
          action: "token",
        }

        post(users_url, autoLoginJson, true)
          .then((res) => {
            this.$store.commit("SetUserInfo", {
              userId: res.data.userInfo.user_Id,
              username: res.data.userInfo.user_name,
              userType: res.data.userInfo.user_type,
            })

          })
          .catch((err) => {
            this.$message({
              message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
              type: "warning",
              duration: 5000,
            })
          })
      }
    }

  },
};
</script>

<style>
</style>