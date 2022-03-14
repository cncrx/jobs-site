<template>
  <div>

    <div v-if="userType === 'applicant'">
      <UpdateForm @on-update="OnUpdate"/>
      <StaredJobsForm />
      <AppliedJobsForm />
    </div>

    <div v-else-if="userType === 'hr'">
      <AddJobForm @on-add-job="OnAddJob"/>
      <ProcessApplicationForm />
      <HiringJobsForm />
    </div>
    
  </div>
</template>

<script>
import { post, put } from "@/api/request";
import { users_url, jobs_url } from "@/api/host";

/*     应聘者组件     */
import UpdateForm from "@/components/UpdateForm";
import StaredJobsForm from "@/components/StaredJobsForm";
import AppliedJobsForm from "@/components/AppliedJobsForm";

/*     HR 组件     */
import AddJobForm from "@/components/AddJobForm";
import ProcessApplicationForm from "@/components/ProcessApplicationForm";
import HiringJobsForm from "@/components/HiringJobsForm";

export default {
  components: {
    UpdateForm,
    StaredJobsForm,
    AppliedJobsForm,
    
    AddJobForm,
    ProcessApplicationForm,
    HiringJobsForm,
  },

  created() {
    this.GetJobsList()
  },

  methods: {
    GetJobsList() {
      if (this.$store.state.totalJobsList.length === 0)
        this.$store.dispatch("GetJobsListForIndex");
    },

    OnUpdate(form) {
      put(users_url, form, true)
        .then((res) => {
          this.$message({
            message: res.data.msg,
            type: "success",
            duration: 3000,
          })
        })
        .catch((err) => {
          this.$message({
            message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
            type: "warning",
            duration: 3000,
          })
        })
    },

    OnAddJob(form) {
      post(jobs_url, form, true)
        .then((res) => {
          this.$message({
            message: res.data.msg,
            type: "success",
            duration: 3000,
          })
        })
        .catch((err) => {
          this.$message({
            message: `状态码: ${err.response.status}, ${err.response.data.msg}`,
            type: "warning",
            duration: 3000,
          })
        })
    }
  },

  computed: {
    userType() {
      return this.$store.state.loginPage.loginedUserType
    }
  }

};
</script>

<style>
</style>