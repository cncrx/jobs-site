import Vue from 'vue'
import axios from "axios"

axios.interceptors.request.use(config => {
  return config
}, (err) => {
  return Promise.reject(err)
})

let headers = { "Content-Type": "application/json;charset=UTF-8" }

function get(url, param = "", authRequire = false) {
  if (authRequire) {
    let token = window.localStorage.getItem("token")
    if (token)
      axios.defaults.headers.common["Authorization"] = token
    else {
      new Vue().$message.warning("请登录")
      return Promise.reject();
    }
  }
  
  return axios.get(url + param, headers)
    .then(res => {
      return res
    })
}

function post(url, json, authRequire = false) {
  if (authRequire) {
    let token = window.localStorage.getItem("token")
    if (token)
      axios.defaults.headers.common["Authorization"] = token
    else {
      new Vue().$message.warning("请登录")
      return Promise.reject();
    }
  }
  
  return axios.post(url, json, headers)
    .then(res => {
      return res
    })
}

function put(url, json, authRequire = false) {
  if (authRequire) {
    let token = window.localStorage.getItem("token")
    if (token)
      axios.defaults.headers.common["Authorization"] = token
    else {
      new Vue().$message.warning("请登录")
      return Promise.reject();
    }
  }
  
  return axios.put(url, json, headers)
    .then(res => {
      return res
    })
}

export {
  get,
  post,
  put
}