<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">{{ customerInfo.cname }}</p>
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
                id="nav-project-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-project"
                type="button"
                role="tab"
                aria-controls="nav-project"
                aria-selected="false"
              >
                Project History
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
                class="tab-pane fade"
                id="nav-project"
                role="tabpanel"
                aria-labelledby="nav-project-tab"
              >
                <project />
              </div>

              <div
                class="tab-pane py-3 fade"
                id="nav-transaction"
                role="tabpanel"
                aria-labelledby="nav-transaction"
              >
                <Transaction />
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
import Overview from "../components/CustomerOverview.vue";
import Project from "../components/CustomerProject.vue";
import Transaction from "../components/CustomerTransaction.vue";
import { mapState } from "vuex";

export default {
  name: "CustomerListView",
  components: { Overview, Project, Transaction, TopNav, SideBar, Footer },
  data() {
    return {
      id: "",
      customerInfo: [],
      customerPOC: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    auth() {
      if (!this.viewPrivilege.includes("customerlist")) {
        this.$router.push("/dashboard");
      }
    },
    getCustomerData() {
      this.c_id = this.$route.params.id;

      const data = new FormData();
      data.append("c_id", this.c_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.customerInfo = data.message[0];
          this.customerPOC = data.message2;
        })
        .catch((err) => console.log(err.message));
    },
  },

  computed: {
    ...mapState(["viewPrivilege"]),
  },
  async mounted() {
    this.getCustomerData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
