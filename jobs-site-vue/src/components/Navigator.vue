<template>
  <div class="navigator-component">
    <nav class="nav-bar">
      <div class="website-logo">
        <router-link :to="{ name: 'Index' }" class="header-font"
          >招聘平台</router-link
        >
      </div>
      <span class="vertical-line"></span>
      <div class="nav-links">
        <ul>
          <li>
            <router-link :to="{ name: 'Index' }" class="header-font">
              <i class="el-icon-house hidden-under-pc"></i>
              <span class="hidden-under-phone">首页</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Search' }" class="header-font">
              <i class="el-icon-search hidden-under-pc"></i>
              <span class="hidden-under-phone">高级搜索</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'PersonalCenter' }" class="header-font">
              <i class="el-icon-data-analysis hidden-under-pc"></i>
              <span class="hidden-under-phone">个人中心</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'About' }" class="header-font">
              <i class="el-icon-document hidden-under-pc"></i>
              <span class="hidden-under-phone">关于</span>
            </router-link>
          </li>

          <li class="user-link" v-if="!loginedUsername">
            <router-link :to="{ name: 'Login' }" class="header-font">
              <i class="el-icon-user hidden-under-pc"></i>
              <span class="hidden-under-phone">登录/注册</span>
            </router-link>
          </li>

          <li class="user-link" v-else>
            <i class="el-icon-user hidden-under-pc header-font"></i>
            <span class="header-font hidden-under-phone">欢迎，{{ loginedUsername }}</span>
            <el-dropdown trigger="click" >
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="gotoPersonalCenter()">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="Logout()">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>

        </ul>

      </div>
    </nav>

    <p class="horizontal-line"></p>
  </div>
</template>

<script>
export default {
  name: "Navigator",

  methods: {
    gotoPersonalCenter() {
      this.$router.push({name: "PersonalCenter"})
    },
    
    Logout() {
      this.$store.commit("ClearUserInfo")
      localStorage.removeItem("token")
      this.$message({
        message: `注销成功`,
        type: "success",
        duration: 2000,
      })
      this.$router.push({ name: "Index" })
    },
  },

  computed: {
    loginedUsername() {
      return this.$store.state.loginPage.loginedUsername;
    },
  },
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: rgba(196, 211, 204, 0.116);
}

.website-logo {
  padding: 2rem 1rem;
  cursor: pointer;
}

.website-logo a {
  color: #8fa89d;
}

.nav-links {
  width: 100%;
}

.nav-links ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.nav-links li {
  margin: 1rem;
  list-style: none;
}

.nav-links li a {
  font-weight: lighter;
  color: #99b6a8;

  transition: border-bottom 0.15s;
}

.nav-links li a:hover {
  border-bottom: 0.5rem solid #a2afa9;
}

.nav-links li a.active-class {
  border-bottom: 0.5rem solid #a2afa9;
}

.user-link {
  margin-left: auto !important;
  margin-right: 3rem !important;
}

.el-dropdown-link {
  cursor: pointer;
  color: #99b6a8;
}

.el-icon-arrow-down {
  font-size: 3rem;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #99b6a8;
  color: #fff;
}

.vertical-line {
  min-width: 0.3rem;
  min-height: 4rem;
  margin: 1rem;

  background-color: #94afa252;
}

.horizontal-line {
  width: 100%;
  height: 0.2rem;
  margin-bottom: 2rem;

  background-color: #94afa21c;
}

.header-font {
  color: #6a7971;
  font-size: 2.8rem;
  line-height: 2.8rem;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.2rem;
}

.header-font::after {
  content: "";
  margin-right: -0.3rem;
}

@media screen and (max-width: 600px) {
  .nav-bar {
    justify-content: flex-start;
    margin-left: 0.5rem;
  }

  .website-logo {
    padding: 1rem;

    font-size: 1.8rem;
    line-height: 1.8rem;
    white-space: nowrap;
    letter-spacing: 0.2rem;
    color: #8fa89d;

    cursor: pointer;
  }

  .vertical-line {
    width: 0.3rem;
    height: 4rem;
    margin: 1rem;

    background-color: #94afa252;
  }

  .nav-links li {
    margin: 1rem;
    list-style: none;
  }

  .hidden-under-phone {
    display: none;
  }
}

@media screen and (min-width: 600px) {
  .hidden-under-pc {
    display: none;
  }
}
</style>
