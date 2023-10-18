<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-9">
            <p class="mb-0 text-color fs-20">{{ vendor.vname }}</p>
          </div>
        </div>

        <div class="row pb-3">
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
                id="nav-transaction-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-transaction"
                type="button"
                role="tab"
                aria-controls="nav-transaction"
                aria-selected="false"
              >
                Vendor Transaction
              </button>
            </div>

            <div class="tab-content p-0 bg-white" id="nav-tabContent">
              <div
                class="tab-pane fade active show"
                id="nav-overview"
                role="tabpanel"
                aria-labelledby="nav-overview-tab"
              >
                <Overview />
              </div>

              <div class="tab-pane fade" id="nav-transaction" role="tabpanel" aria-labelledby="nav-transaction">
                <Transaction />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";

import Overview from "../components/VendorOverview.vue";
import Transaction from "../components/VendorTransaction.vue";

import { useToast } from "vue-toastification";
import { mapState } from "vuex";
export default {
  props: [" v_id "],
  name: "vendoroverview",
  components: { TopNav, SideBar, Footer, Overview, Transaction },
  data() {
    return {
      id: "",
      vendor: [],

      showMonthPicker: false,
    };
  },

  methods: {
    auth() {
      if (!this.viewPrivilege.includes("vendorlist")) {
        this.$router.push("/dashboard");
      }
    },

    async fetchData() {
      const id = localStorage.getItem("userID");

      // await
      this.$store.dispatch("fetchUserInfo");
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    getVendorData() {
      this.v_id = this.$route.params.id;

      const data = new FormData();
      data.append("v_id", this.v_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorDataByID`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.vendor = data.message[0];
        })
        .catch((err) => console.log(err.message));
    },
  },
  async mounted() {
    try {
      await this.fetchData();
      this.auth();
    } catch (error) {
      console.log(error);
    }
    this.getVendorData();
  },

  computed: {
    ...mapState(["viewPrivilege"]),
  },
};
</script>
<style></style>
