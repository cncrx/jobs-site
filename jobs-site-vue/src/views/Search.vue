<template>
  <div class="search-container">
    <div class="input-box">
      <span class="input-title">按关键词搜索：</span>
      <el-input
        type="text"
        placeholder="请输入关键词"
        v-model="keywordOptionValue"
        maxlength="10"
        show-word-limit
        clearable
      >
      </el-input>
    </div>

    <div class="selector">
      <div class="selector-item">
        <span class="input-title">城市：</span>
        <el-select
          v-model="citiesOptionsValue"
          filterable
          placeholder="请选择或输入关键词"
        >
          <el-option
            v-for="(item, index) in citiesList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="selector-item">
        <span class="input-title">薪酬：</span>
        <el-select v-model="salaryOptionValue" filterable placeholder="请选择">
          <el-option
            v-for="(item, index) in salaryOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="tags">
      <el-tag
        v-show="keywordOptionValue"
        closable
        type="success"
        @close="handleClose('keywordOptionValue')"
      >
        {{ keywordOptionValue }}
      </el-tag>

      <el-tag
        v-show="citiesOptionsValue"
        closable
        type="warning"
        @close="handleClose('citiesOptionsValue')"
      >
        {{ citiesOptionsValue }}
      </el-tag>

      <el-tag
        v-show="salaryOptionValue"
        closable
        type="danger"
        @close="handleClose('salaryOptionValue')"
      >
        {{ salaryOptionValue }}
      </el-tag>
    </div>

    <div class="search-button">
      <el-button
        round
        v-if="keywordOptionValue || citiesOptionsValue || salaryOptionValue"
        @click="SearchForJobs"
        >搜索</el-button
      >
    </div>

    <div class="zero-match-tip" v-show="isZeroMatch">
      <p>搜到 0 条结果</p>
    </div>

    <div class="jobs-list">
      <JobsList
        v-bind="{
          pPageName: 'search',
          pJobsList: jobsList,
          pJobsListLength: jobsListLength,
          pPageNum: pageNum,
        }"
        @on-page-change="OnPageChange"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import JobsList from "../components/JobsList.vue";
export default {
  components: {
    JobsList,
  },

  data() {
    return {
      salaryOptions: null,
      isZeroMatch: false,
    };
  },

  created() {
    // 生成 3000 - 10000，步长 1000 的数组
    this.salaryOptions = this.GenerateSalaryOptions(10, 1000);
  },

  methods: {
    GenerateSalaryOptions(limit, step) {
      let arr = [];
      for (let i = 3; i <= limit; i++) {
        arr.push({
          value: i * step,
          label: i * step,
        });
      }
      return arr;
    },

    handleClose(key) {
      this.$store.commit("ClearOptionValue", { key });
    },

    SearchForJobs() {
      this.$store.commit("SetSearchPageJobsList");
      this.jobsListLength === 0 ? this.isZeroMatch = true : this.isZeroMatch = false
    },

    OnPageChange(payload) {
      this.$store.commit("SetPageNum", {
        page: "search",
        pageNum: payload.pageNum,
      });
    },
  },

  computed: {
    keywordOptionValue: {
      get() {
        return this.$store.state.searchPage.optionsValue.keywordOptionValue;
      },
      set(val) {
        this.$store.commit("SetOptionValue", { key: "keywordOptionValue", val });
      },
    },
    citiesOptionsValue: {
      get() {
        return this.$store.state.searchPage.optionsValue.citiesOptionsValue;
      },
      set(val) {
        this.$store.commit("SetOptionValue", { key: "citiesOptionsValue", val });
      },
    },
    salaryOptionValue: {
      get() {
        return this.$store.state.searchPage.optionsValue.salaryOptionValue;
      },
      set(val) {
        this.$store.commit("SetOptionValue", { key: "salaryOptionValue", val });
      },
    },

    citiesList: {
      get() {
        if (this.$store.state.indexPage.jobsList.length === 0)
          this.$store.dispatch("GetJobsListForIndex");
        return this.$store.getters.getCitiesFromTotalJobsList;
      },
      set() {},
    },

    filteredJobsList() {
      return this.$store.state.searchPage.jobsList;
    },

    ...mapGetters({
      jobsList: "slicedJobsListForSearch",
      jobsListLength: "searchJobsListLength"
    }),

    pageNum: {
      get() {
        return this.$store.state.searchPage.pageNum;
      },
      set() {},
    },
  },
};
</script>

<style>
.search-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.input-title {
  color: rgba(126, 133, 129, 0.877);
  font-size: 2rem;
  letter-spacing: 0.1ch;
}

.input-box {
  margin: 0.5rem auto;
  white-space: nowrap;
}

.input-box .el-input {
  width: 60rem;
}

.selector {
  display: flex;
  justify-content: center;
  align-items: center;
}

.selector-item {
  margin: 0.5rem 1rem;
  white-space: nowrap;
}

.selector-item .el-select {
  width: 30rem;
}

.tags {
  display: flex;
}

.tags .el-tag {
  margin: 1rem 0.5rem;
}

.search-button .el-button {
  padding: 1.5rem 5rem !important;
  /* good for phone resulotion */
}

.zero-match-tip {
  margin: 10rem auto;
  font-size: 3rem;
  text-align: center;
  color: rgba(126, 133, 129, 0.877);
}

.jobs-list {
  width: 100%;
}

@media screen and (max-width: 300px) {
  .input-box .el-input {
    width: 20rem;
  }

  .selector-item .el-select {
    width: 10rem;
  }

  .tags {
    flex-direction: column;
  }
}

@media screen and (max-width: 500px) {
  .input-box .el-input {
    width: 40rem;
  }

  .selector-item .el-select {
    width: 20rem;
  }
}

@media screen and (min-width: 500px) and (max-width: 800px) {
  .input-box .el-input {
    width: 40rem;
  }

  .selector-item .el-select {
    width: 20rem;
  }
}
</style>