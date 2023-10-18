<template>
  <div class="print_section"></div>
  <div class="view-section">
    

    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">General Ledger Report</p>
            </div>
          </div>

          <div class="row border-bottom px-2 align-items-center justify-content-between py-0">
            <div class="col-lg-4 d-flex">
              <input type="date" class="form-control rounded-0 fs-14 inputa" v-model="startDate" />
              <p class="m-0 mx-2">-</p>
              <input type="date" class="form-control rounded-0 fs-14 inputa" v-model="endDate" />
            </div>
            <div class="col-lg-1 border-start py-3 bg-light text-center">
              <p class="m-0 text-muted fs-12" @click="printView('printID')" style="cursor: pointer">
                <i class="fa-solid fa-print me-1"></i>Print
              </p>
            </div>
          </div>
          <div class="container my-3">
            <div class="row justify-content-center">
              <div class="col-lg-10 border shadow-sm py-4 print_view" id="printID">
                <p class="fs-18 mb-0 text-center">{{ orgInfo.org_name }}</p>
                <p class="fs-14 text-center mb-0">General Ledger</p>
                <p class="fs-12 text-center" v-if="startDate">Date: {{ startDate }} - {{ endDate }}</p>
                <p class="fs-12 text-center" v-else>Date: {{ formatDate(currentDate) }} (Alltime Data)</p>

                <table class="table align-middle mb-5" v-for="item in calculatedLedgerData" :key="item.id">
                  <thead>
                    <tr class="">
                      <th colspan="3" class="fs-14 text-start bg-light">
                        {{ item.account_name }}
                      </th>
                      <th class="fs-14 text-start bg-light" width="15%">Balance:</th>
                      <th class="fs-14 text-start bg-light" width="15%">
                        {{ item.finalBalance }}
                      </th>
                    </tr>
                    <tr class="thead-color border">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">#Date</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="40%">Particular</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Debit</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Credit</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Balance</th>
                    </tr>
                  </thead>

                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="(line, index) in item.entries" :key="index">
                      <th class="border-0 fs-14">
                        {{ formatDate(line.date) }}
                      </th>
                      <td class="border-0 fs-14">
                        {{ line.description }}
                      </td>
                      <td class="border-0 fs-14">
                        {{ line.debit }}
                      </td>
                      <td class="border-0 fs-14">
                        {{ line.credit }}
                      </td>
                      <td class="border-0 fs-14">{{ line.balance }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopNav from "@/components/TopNav.vue";
import Sidebar from "@/components/Sidebar.vue";
import { mapState } from "vuex";

export default {
  name: "General Ledger Report",
  components: { TopNav, Sidebar },

  data() {
    return {
      ledgerData: [],
      ledgerDataNew: [],
      startDate: "",
      endDate: "",
      currentDate: new Date(),
    };
  },

  methods: {
    auth() {
      if (!this.viewPrivilege.includes("report")) {
        this.$router.push("/dashboard");
      }
    },
    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    async getLedgerDataNew() {
      try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/getAnotherLedgerReport`, { method: "POST" });
        const res = await response.json();
        console.log(res.message);
        this.ledgerDataNew = res.message;
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      const newDate = new Date(date);
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      return `${day}/${month}/${year}`;
    },

    printView(divID) {
      const printSection = document.querySelector(".print_section");
      const targetDiv = document.getElementById(divID);

      if (printSection && targetDiv) {
        printSection.innerHTML = targetDiv.innerHTML;
      }
      window.print();
    },
  },

  computed: {
    calculatedLedgerData() {
      const { startDate, endDate } = this;

      let balance = 0;

      return this.ledgerDataNew.map((account) => {
        const updatedEntries = account?.entries
          .filter(({ date }) => {
            return (startDate <= date && endDate >= date) || startDate === "";
          })
          .map((entry) => {
            balance += entry.debit - entry.credit;
            return { ...entry, balance };
          });

        const finalBalance = updatedEntries.length > 0 ? updatedEntries[updatedEntries.length - 1].balance : 0;

        balance = 0; // Reset balance for the next account_name

        return {
          ...account,
          entries: updatedEntries,
          finalBalance,
        };
      });
    },

    ...mapState(["viewPrivilege"]),
    ...mapState(["orgInfo"]),
  },
  async mounted() {
    this.getLedgerDataNew();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
