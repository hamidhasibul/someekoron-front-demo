<template>
  
  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Reports</p>
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <div class="container-fluid">
              <div class="row p-3">
                <div class="col-lg-4">
                  <div class="border-bottom py-1">
                    <p class="m-0 fs-14">Projects</p>
                  </div>
                  <div class="py-1">
                    <div class="row">
                      <router-link to="/report/projectlist" class="m-0 fs-12 text-primary py-1">Project List</router-link>
                    </div>

                    <div class="row">
                      <router-link to="/report/pendingprojects" class="m-0 fs-12 text-primary py-1">Pending
                        Project</router-link>
                    </div>
                    <div class="row">
                      <router-link to="/report/completedprojects" class="m-0 fs-12 text-primary py-1">Completed
                        Project</router-link>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="border-bottom py-1">
                    <p class="m-0 fs-14">Suppliers</p>
                  </div>
                  <div class="py-1">
                    <div class="row">
                      <router-link to="/report/totalsuppliers" class="m-0 fs-12 text-primary py-1">Total
                        Suppliers</router-link>
                    </div>

                    <div class="row">
                      <router-link to="/report/supplierstotalpaid" class="m-0 fs-12 text-primary py-1">Suppliers Total
                        Paid</router-link>
                    </div>
                    <div class="row">
                      <router-link to="/report/supplierstotaldue" class="m-0 fs-12 text-primary py-1">Suppliers Total
                        Due</router-link>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="border-bottom py-1">
                    <p class="m-0 fs-14">Expense</p>
                  </div>
                  <div class="py-1">
                    <!-- <div class="row">
                      <router-link to="/report/officeexpenses" class="m-0 fs-12 text-primary py-1">Office
                        Expenses</router-link>
                    </div> -->
                    <div class="row">
                      <router-link to="/report/projectexpenses" class="m-0 fs-12 text-primary py-1">Project
                        Expenses</router-link>
                    </div>
                    <!-- <div class="row">
                      <router-link to="/report/allexpenses" class="m-0 fs-12 text-primary py-1">All Expenses</router-link>
                    </div> -->
                  </div>
                </div>
              </div>

              <div class="row p-3">
                <div class="col-lg-4">
                  <div class="border-bottom py-1">
                    <p class="m-0 fs-14">Transactions</p>
                  </div>
                  <div class="py-1">
                    <div class="row">
                      <router-link to="/report/totaltransaction" class="m-0 fs-12 text-primary py-1">Total
                        Transactions</router-link>
                    </div>
                    <div class="row">
                      <router-link to="/report/totalincoming" class="m-0 fs-12 text-primary py-1">Total
                        Incoming</router-link>
                    </div>

                    <div class="row">
                      <router-link to="/report/totaloutgoing" class="m-0 fs-12 text-primary py-1">Total
                        Outgoing</router-link>
                    </div>
                    <div class="row">
                      <router-link to="/report/totalreceivable" class="m-0 fs-12 text-primary py-1">Total
                        Receivable</router-link>
                    </div>
                  </div>
                </div>
                
                <div class="col-lg-4">
                  <div class="border-bottom py-1">
                    <p class="m-0 fs-14">Vat & Tax Accounts</p>
                  </div>
                  <div class="py-1">
                    <!-- <div class="row">
                      <router-link to="/report/generalledger" class="m-0 fs-12 text-primary py-1">General
                        Ledger</router-link>
                    </div>

                    <div class="row">
                      <router-link to="/report/journal" class="m-0 fs-12 text-primary py-1">Journal</router-link>
                    </div>

                    <div class="row">
                      <router-link to="/report/trialbalance" class="m-0 fs-12 text-primary py-1">Trial
                        Balance</router-link>
                    </div>
                    <div class="row">
                      <router-link to="/report/incomestatement" class="m-0 fs-12 text-primary py-1">Income
                        Statement</router-link>
                    </div>

                    <div class="row">
                      <router-link to="/report/balancesheet" class="m-0 fs-12 text-primary py-1">Balance
                        Sheet</router-link>
                    </div> -->

                    <div class="row">
                      <router-link to="/report/taxpayable" class="m-0 fs-12 text-primary py-1">Vat & Tax
                        Payable</router-link>
                    </div>
                    <div class="row">
                      <router-link to="/report/taxreceivable" class="m-0 fs-12 text-primary py-1">Advance Vat & Tax
                        Receivable</router-link>
                    </div>
                  </div>
                </div>
                

                <div class="col-lg-4">
                  <div class="border-bottom py-1">
                    <p class="m-0 fs-14">Resources</p>
                  </div>

                  <div class="py-1">
                    <div class="row">
                      <router-link to="/report/totalresource" class="m-0 fs-12 text-primary py-1">All
                        Resources</router-link>
                    </div>
                    <div class="row">
                      <router-link to="/report/transferedresource" class="m-0 fs-12 text-primary py-1">Transfered
                        Resources</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Side Projects -->
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
import { mapState } from "vuex";

export default {
  name: "report",
  components: { TopNav, SideBar, Footer },
  data() {
    return {};
  },

  async mounted() {
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    auth() {
      if (!this.canView) {
        this.$router.push("/dashboard");
      }
    },
    async fetchData() {
      const id = localStorage.getItem("userID");

      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
  },

  computed: {
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
    canView() {
      return this.viewPrivilege.includes("customerlist");
    },
  },
};
</script>
<style></style>
