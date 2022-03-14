<template>
  <JobsList
    v-bind="{
      pJobsList: jobsList,
      pJobsListLength: jobsListLength,
      pPageNum: pageNum,
    }"
    @on-page-change="OnPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import JobsList from "../components/JobsList.vue";
export default {
  components: {
    JobsList,
  },

  created() {
    this.GetJobsList();
  },

  methods: {
    GetJobsList() {
      if (this.$store.state.totalJobsList.length === 0)
        this.$store.dispatch("GetJobsListForIndex");
    },

    OnPageChange(payload) {
      this.$store.commit("SetPageNum", {
        page: "index",
        pageNum: payload.pageNum,
      });
    },
  },

  computed: {
    ...mapGetters({
      jobsList: "slicedJobsListForIndex",
      jobsListLength: "indexJobsListLength",
    }),

    pageNum: {
      get() {
        return this.$store.state.indexPage.pageNum;
      }, set() {},
    },
  },
};
</script>

<style>
</style>