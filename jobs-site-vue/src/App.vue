<template>
  <div id="app">
    <Navigator />
    <AutoLogin />
    <router-view />
  </div>
</template>

<script>
import Navigator from "./components/Navigator"
import AutoLogin from "./components/AutoLogin"

export default {
  components: {
    Navigator,
    AutoLogin,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  background-color: rgb(254, 255, 254);
}

body {
  -webkit-tap-highlight-color: transparent;
}

@media screen and (max-width: 400px) {
  html {
    font-size: 43.7%;
  }
}

@media screen and (min-width: 400px) and (max-width: 800px) {
  html {
    font-size: 50%;
  }
}
</style>
