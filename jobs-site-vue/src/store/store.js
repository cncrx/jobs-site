import Vue from "vue"
import Vuex from "vuex"
import { mapState } from "vuex"
Vue.use(Vuex)

import actions from './actions'

const store = new Vuex.Store({
  state: {
    totalJobsList: [],
    pageSize: 9,

    // 首页页面
    indexPage: {
      jobsList: [],
      pageNum: 1,
      startIndex: 0,
      endIndex: 9,
    },

    // 高级搜索页面
    searchPage: {
      jobsList: [],
      pageNum: 1,
      startIndex: 0,
      endIndex: 9,
      optionsValue: {
        keywordOptionValue: null,
        citiesOptionsValue: null,
        salaryOptionValue: null,
      },
    },

    personalPage: {
      staredJobsList: null,
      appliedJobsList: null
    },
      
    loginPage: {
      loginedUserId: null,
      loginedUsername: null,
      loginedUserType: null,
    }

  },

  getters: {
    indexJobsListLength: state => { return state.totalJobsList.length },
    searchJobsListLength: state => { return state.searchPage.jobsList.length },

    slicedJobsListForIndex: state => {
      state.indexPage.jobsList =
        state.totalJobsList.slice(state.indexPage.startIndex, state.indexPage.endIndex)
      return state.indexPage.jobsList
    },
    slicedJobsListForSearch: state => {
      let tempList =
      state.searchPage.jobsList.slice(state.searchPage.startIndex, state.searchPage.endIndex)
      return tempList
    },

    jobsListForHRProcess: state => {
      if (state.loginPage.loginedUserType === "hr") {
        let applicantList = []

        let jobsList = state.totalJobsList.filter(i => {
          if (i.hr_id === state.loginPage.loginedUserId && i.applicant.length !== 0) {
            i.applicant[0]["job_name"] = i.job_name
            i.applicant[0]["job_Id"] = i._id
            applicantList.push(i.applicant[0])
          }
        })
        
        return applicantList
      }
    },

    hiringJobsListForHR: state => {
      if (state.loginPage.loginedUserType === "hr")
        return state.totalJobsList.filter(i => {
          if (i.hr_id === state.loginPage.loginedUserId)
            return i
        })
    },

    // 从岗位列表提取城市，用于高级搜索页面下拉栏
    getCitiesFromTotalJobsList: state => {
      let arr = []
      state.totalJobsList.map(job => {
        arr.push({
          value: job.city,
          label: job.city
        })
      })
      // 顺便按拼音字母排下序
      return arr.sort((a, b) => {
        return a.value.localeCompare(b.value, "zh")
      })
    },
  },

  actions,

  mutations: {
    SetPageNum(state, payload) {
      let page = payload.page === "index" ? state.indexPage : state.searchPage
      page.pageNum = payload.pageNum
      page.startIndex = (payload.pageNum - 1) * state.pageSize
      page.endIndex = payload.pageNum * state.pageSize
    },

    SetIndexPageJobsList(state, list) {
      state.totalJobsList = list
      state.indexPage.jobsList = list.slice(state.indexPage.startIndex, state.indexPage.endIndex)
    },
    // 根据搜索条件过滤岗位，赋值新岗位列表
    SetSearchPageJobsList(state, list) {
      let conditions = {}
      let filteredJobsList = []
      
      state.searchPage.optionsValue.keywordOptionValue ? conditions.job_name = state.searchPage.optionsValue.keywordOptionValue : null
      state.searchPage.optionsValue.citiesOptionsValue ? conditions.city = state.searchPage.optionsValue.citiesOptionsValue : null
      state.searchPage.optionsValue.salaryOptionValue ? conditions.salary = state.searchPage.optionsValue.salaryOptionValue : null
      
      for (let elem in conditions) {
        if (filteredJobsList.length === 0)
          filteredJobsList = state.totalJobsList.filter(obj => {
            if (typeof conditions[elem] === "string")
              return obj[elem].search(conditions[elem]) !== -1
            else if (typeof conditions[elem] === "number")
              return obj[elem] <= conditions[elem]
          })

        else 
          filteredJobsList = filteredJobsList.filter(obj => {
            if (typeof conditions[elem] === "string")
              return obj[elem].search(conditions[elem]) !== -1
            else if (typeof conditions[elem] === "number")
              return obj[elem] <= conditions[elem]
          })
      }
      
      state.searchPage.jobsList = filteredJobsList
    },

    SetOptionValue(state, payload) {
      Object.keys(state.searchPage.optionsValue).forEach(elem => {
        if (elem === payload.key)
          state.searchPage.optionsValue[payload.key] = payload.val
      })
    },
    ClearOptionValue(state, payload) {
      Object.keys(state.searchPage.optionsValue).forEach(elem => {
        if (elem === payload.key)
          state.searchPage.optionsValue[payload.key] = null
      })
    },

    SetStaredJobsList(state, list) {
      state.personalPage.staredJobsList = list
    },
    SetAppliedJobsList(state, list) {
      state.personalPage.appliedJobsList = list
    },

    SetUserInfo(state, payload) {
      state.loginPage.loginedUserId = payload.userId
      state.loginPage.loginedUsername = payload.username
      state.loginPage.loginedUserType = payload.userType
    },
    ClearUserInfo(state) {
      state.loginPage.loginedUserId = null
      state.loginPage.loginedUsername = null
      state.loginPage.loginedUserType = null
    },
  } // mut
})

export default store