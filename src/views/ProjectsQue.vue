<template class="vh-100">
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right scroll-content">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-12">
            <p class="mb-0 text-color fs-20">Make Quotation</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Please ensure that all information provided in this
              <b>Quotation</b> form is accurate and complete. <br />
              <span class="note-space">
                Any inaccuracies or missing details could potentially lead to
                delays or errors in processing your quotation.</span
              >
            </p>
          </div>
          <div class="col-lg-12">
            <div
              class="nav nav-tabs mb-2"
              id="nav-tab-project-quotation"
              role="tablist"
              style="text-align: center; border-bottom: 1px solid gainsboro"
            >
              <button
                class="nav-link rounded-0 text-muted2 fs-14 active"
                style="text-align: center"
                id="nav-client-info-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-client-info"
                type="button"
                role="tab"
                aria-controls="nav-client-info"
                aria-selected="true"
              >
                Client Info
              </button>
              <button
                class="nav-link rounded-0 text-muted2 fs-14"
                style="text-align: center"
                id="nav-project-budget-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-project-budget"
                type="button"
                role="tab"
                aria-controls="nav-project-budget"
                aria-selected="false"
              >
                Project Details
              </button>
              <button
                class="nav-link rounded-0 text-muted2 fs-14"
                style="text-align: center"
                id="nav-terms-condition-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-terms-condition"
                type="button"
                role="tab"
                aria-controls="nav-terms-condition"
                aria-selected="false"
              >
                Terms & Condition
              </button>
            </div>

            <div class="tab-content p-0 bg-white" id="nav-tabContent">
              <Clientinfo :changeState="changeClientinfoData" />

              <Projectdetails
                :clientinfoData="clientinfoData"
                :changeState="changeProjectDetailsData"
              />

              <Terms :projectDetailsData="projectDetailsData" />
            </div>
          </div>

          <!-- <QuotationArch /> -->
        </div>
      </div>

     
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";

import Clientinfo from "@/components/Clientinfo.vue";
import Projectdetails from "@/components/Projectdetails.vue";
import Terms from "@/components/Terms.vue";

import QuotationArch from "@/components/QuotationArch.vue";
import { mapState } from "vuex";

export default {
  name: "ProjectQue",
  components: {
    TopNav,
    SideBar,
    QuotationArch,
    Terms,
    Projectdetails,
    Clientinfo,
  },

  data() {
    return {
      project: null,
      id: null,
      clientinfoData: false,
      projectDetailsData: false,
      termsData: false,
    };
  },
  methods: {
    auth() {
      if (!this.createPrivilege.includes("projectquery")) {
        this.$router.push("/dashboard");
      }
    },
    changeClientinfoData() {
      this.clientinfoData = true;
    },
    changeProjectDetailsData() {
      this.projectDetailsData = true;
    },
    changeTermsDataData() {
      this.termsData = true;
    },
    async fetchData() {
      const id = localStorage.getItem("userID");

      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
  },
  async mounted() {
    const qIdEdit = this.$route.query.editq_id;

    if (qIdEdit) {
      const data = new FormData();
      data.append("q_id", qIdEdit);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("q_id", data.message[0].q_id);
          if (data.message.length > 0) this.clientinfoData = true;
          if (data.message2.length > 0) this.projectDetailsData = true;
          if (data.message3.length > 0) this.termsData = true;
        })
        .catch((err) => console.error(err.message));
    } else console.log("");

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
