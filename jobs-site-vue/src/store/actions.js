import { get, post } from "@/api/request"
import { users_url, jobs_url, companies_url } from "@/api/host"

export default {
  GetJobsListForIndex({ commit, state }) {
    get(jobs_url).then(res => {
      commit("SetIndexPageJobsList", res.data.jobs_list)
    })
  },
}