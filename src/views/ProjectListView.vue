<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">{{ projectData.project_name }}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 px-0">
            <div
              class="nav nav-tabs"
              id="nav-tab-project-quotation"
              role="tablist"
              style="text-align: center; border-bottom: 1px solid gainsboro"
            >
              <button
                class="nav-link rounded-0 text-muted2 fs-14 active"
                style="text-align: center"
                id="nav-overview-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-overview"
                type="button"
                role="tab"
                aria-controls="nav-overview"
                aria-selected="true"
              >
                Overview
              </button>
              <button
                class="nav-link rounded-0 text-muted2 fs-14"
                style="text-align: center"
                id="nav-Budget-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-Budget"
                type="button"
                role="tab"
                aria-controls="nav-Budget"
                aria-selected="false"
              >
                Project Budget
              </button>

              <button
                class="nav-link rounded-0 text-muted2 fs-14"
                style="text-align: center"
                id="nav-transaction-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-transaction"
                type="button"
                role="tab"
                aria-controls="nav-transaction"
                aria-selected="false"
              >
                Transaction Record
              </button>

              <button
                class="nav-link rounded-0 text-muted2 fs-14"
                style="text-align: center"
                id="nav-resource-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-resource"
                type="button"
                role="tab"
                aria-controls="nav-resource"
                aria-selected="false"
              >
                Resource Record
              </button>

              <button
                class="nav-link rounded-0 text-muted2 fs-14"
                style="text-align: center"
                id="nav-resource-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-accounts"
                type="button"
                role="tab"
                aria-controls="nav-resource"
                aria-selected="false"
              >
                Project Accounts
              </button>
            </div>

            <div class="tab-content p-0 bg-white" id="nav-tabContent">
              <!-- <Address /> -->

              <div
                class="tab-pane fade active show"
                id="nav-overview"
                role="tabpanel"
                aria-labelledby="nav-overview-tab"
              >
                <Overview />
              </div>

              <!-- <ContactPerson /> -->

              <div
                class="tab-pane py-3 fade"
                id="nav-Budget"
                role="tabpanel"
                aria-labelledby="nav-Budget"
              >
                <ProjectBudget />
              </div>

              <div
                class="tab-pane py-3 fade"
                id="nav-transaction"
                role="tabpanel"
                aria-labelledby="nav-transaction"
              >
                <Transaction />
              </div>

              <div
                class="tab-pane py-3 fade"
                id="nav-resource"
                role="tabpanel"
                aria-labelledby="nav-resource"
              >
                <ProjectResource />
              </div>

              <div
                class="tab-pane py-3 fade"
                id="nav-accounts"
                role="tabpanel"
                aria-labelledby="nav-resource"
              >
                <ProjectAccounts />
              </div>

              <!-- <Remarks /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import Overview from "../components/ProjectOverview.vue";
import ProjectBudget from "../components/ProjectBudget.vue";
import Transaction from "../components/ProjectTransaction.vue";
import ProjectResource from "../components/ProjectResources.vue";

import { mapState } from "vuex";
import ProjectAccounts from "@/components/ProjectAccounts.vue";

export default {
  name: "projectListView",
  components: {
    TopNav,
    SideBar,
    Footer,
    Overview,
    Transaction,
    ProjectResource,
    ProjectAccounts,
    ProjectBudget,
  },
  data() {
    return {
      id: "",
      projectData: [],
      projectTasks: [],
      p_id: "",
    };
  },

  methods: {
    auth() {
      if (!this.viewPrivilege.includes("projectlist")) {
        this.$router.push("/dashboard");
      }
    },
    async fetchData() {
      const id = localStorage.getItem("userID");

      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    getProjectData() {
      this.p_id = this.$route.params.id;

      const data = new FormData();
      data.append("p_id", this.p_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.projectData = data.message[0];
          this.projectTasks = data.message2;
        })
        .catch((err) => console.log(err.message));
    },
  },

  async mounted() {
    this.getProjectData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
  },
};
</script>
<style></style>
