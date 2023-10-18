<template>
  <div class="print_section"></div>
  <div class="view-section">
    

    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Income Statement</p>
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
                <p class="fs-14 text-center mb-0">Income Statement</p>
                <p class="fs-12 text-center" v-if="startDate">Date: {{ startDate }} - {{ endDate }}</p>
                <p class="fs-12 text-center" v-else>Date: {{ formatDate(currentDate) }} (Alltime Data)</p>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border-0">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4" width="60%">Revenue</th>

                      <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="30%"></th>
                      <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="10%"></th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="item in calculatedRevenueData" :key="item.id">
                      <template v-if="item.entries && item.entries.length !== 0"
                        ><td scope="col" class="border-0 fs-12 ps-4">
                          {{ item.account_name }}
                        </td>
                        <td scope="col" class="border-0 fs-12 text-end font-weight-600">
                          <span class="d-inline-block text-truncate">{{ item.finalBalance }}</span>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border-0">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4" width="60%">Inventory</th>

                      <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="30%"></th>
                      <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="10%"></th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="item in calculatedInventoryData" :key="item.id">
                      <template v-if="item.entries && item.entries.length !== 0"
                        ><td scope="col" class="border-0 fs-12 ps-4">
                          {{ item.account_name }}
                        </td>
                        <td scope="col" class="border-0 fs-12 text-end font-weight-600">
                          <span class="d-inline-block text-truncate">{{ item.finalBalance }}</span>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border-0">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4" width="60%">Expense</th>

                      <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="30%"></th>
                      <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="10%"></th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="item in calculatedExpenseData" :key="item.id">
                      <template v-if="item.entries && item.entries.length !== 0"
                        ><td scope="col" class="border-0 fs-12 ps-4">
                          {{ item.account_name }}
                        </td>
                        <td scope="col" class="border-0 fs-12 text-end font-weight-600">
                          <span class="d-inline-block text-truncate">{{ item.finalBalance }}</span>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4" width="60%">
                        Total Profit
                      </th>

                      <th scope="col" class="border-0 fs-13 text-end text-muted font-weight-600" width="30%">
                        {{ totalBlncRevenue - totalBlncExpense - totalBlncInventory }}
                      </th>
                      <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="10%"></th>
                    </tr>
                  </thead>
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
  name: "Income Statement",
  components: { TopNav, Sidebar },

  data() {
    return {
      ledgerDataNew: [],
      revenueData: [],
      expenseData: [],
      inventoryData: [],
      startDate: "",
      endDate: "",
      currentDate: new Date(),
      totalDebitNew: 0,
      totalCreditNew: 0,

      totalBalanceRevenue: 0,
      totalBalanceExpense: 0,
      totalBalanceInventory: 0,
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

        this.revenueData = res.message.filter((item) => {
          return item.account_type === "Revenue";
        });

        this.expenseData = res.message.filter((item) => {
          return item.account_type === "Expenses";
        });

        this.inventoryData = res.message.filter((item) => {
          return item.account_name === "Inventory Purchase";
        });
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
            if (+entry.debit > 0) {
              balance += +entry.debit - +entry.credit;
            } else {
              balance += +entry.credit;
            }

            return { ...entry, balance };
          });

        const finalBalance = updatedEntries.length > 0 ? updatedEntries[updatedEntries.length - 1].balance : 0;

        balance = 0; // Reset balance for the next account_name

        return {
          ...account,
          entries: updatedEntries,
          finalBalance,
          debit: finalBalance < 0 ? Math.abs(finalBalance) : 0,
          credit: finalBalance > 0 ? Math.abs(finalBalance) : 0,
        };
      });
    },

    calculatedRevenueData() {
      const { startDate, endDate } = this;

      let balance = 0;

      return this.revenueData.map((account) => {
        const updatedEntries = account?.entries
          .filter(({ date }) => {
            return (startDate <= date && endDate >= date) || startDate === "";
          })
          .map((entry) => {
            if (+entry.debit > 0) {
              balance += +entry.debit - +entry.credit;
            } else {
              balance += +entry.credit;
            }
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

    calculatedExpenseData() {
      const { startDate, endDate } = this;

      let balance = 0;

      return this.expenseData.map((account) => {
        const updatedEntries = account?.entries
          .filter(({ date }) => {
            return (startDate <= date && endDate >= date) || startDate === "";
          })
          .map((entry) => {
            if (+entry.debit > 0) {
              balance += +entry.debit - +entry.credit;
            } else {
              balance += +entry.credit;
            }
            return { ...entry, balance };
          });

        const finalBalance = updatedEntries.length > 0 ? updatedEntries[updatedEntries.length - 1].balance : 0;

        balance = 0;

        return {
          ...account,
          entries: updatedEntries,
          finalBalance,
        };
      });
    },

    calculatedInventoryData() {
      const { startDate, endDate } = this;

      let balance = 0;

      return this.inventoryData.map((account) => {
        const updatedEntries = account?.entries
          .filter(({ date }) => {
            return (startDate <= date && endDate >= date) || startDate === "";
          })
          .map((entry) => {
            if (+entry.debit > 0) {
              balance += +entry.debit - +entry.credit;
            } else {
              balance += +entry.credit;
            }
            return { ...entry, balance };
          });

        const finalBalance = updatedEntries.length > 0 ? updatedEntries[updatedEntries.length - 1].balance : 0;

        balance = 0;

        return {
          ...account,
          entries: updatedEntries,
          finalBalance,
        };
      });
    },

    totalBlncRevenue() {
      this.totalBalanceRevenue = this.calculatedRevenueData.reduce((total, item) => total + +item.finalBalance, 0);
      return this.calculatedRevenueData.reduce((total, item) => total + +item.finalBalance, 0);
    },
    totalBlncExpense() {
      this.totalBalanceExpense = this.calculatedExpenseData.reduce((total, item) => total + +item.finalBalance, 0);
      return this.calculatedExpenseData.reduce((total, item) => total + +item.finalBalance, 0);
    },

    totalBlncInventory() {
      this.totalBalanceInventory = this.calculatedInventoryData.reduce((total, item) => total + +item.finalBalance, 0);
      return this.calculatedInventoryData.reduce((total, item) => total + +item.finalBalance, 0);
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
