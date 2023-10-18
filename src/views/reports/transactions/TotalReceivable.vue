<template>
  <div class="print_section"></div>
  <div class="view-section">
    

    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Total Receivable</p>
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
                <p class="fs-14 text-center mb-0">Total Receivable</p>
                <p class="fs-12 text-center" v-if="startDate">Date: {{ startDate }} - {{ endDate }}</p>
                <p class="fs-12 text-center" v-else>Date: {{ formatDate(currentDate) }} (Alltime Data)</p>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4">#Date</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Particulars</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Sub-Total</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">TAX Amount</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Adjustment</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Total Receivable</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Due</th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="item in filteredData" :key="item.id">
                      <td scope="col" class="border-0 fs-12 ps-4">
                        {{ formatDate(item.create_date) }}
                      </td>
                      <td scope="col" class="border-0 fs-12 font-weight-600">
                        <span class="d-inline-block text-truncate">{{ item.org_name }} - {{ item.project_name }}</span>
                      </td>

                      <td scope="col" class="border-0 fs-12">
                        {{ parseFloat(item.st_amount).toFixed(2) }}
                      </td>
                      <td scope="col" class="border-0 fs-12">
                        {{ parseFloat(item.t_tax).toFixed(2) }}
                      </td>
                      <td scope="col" class="border-0 fs-12">
                        {{ parseFloat(item.adjustment).toFixed(2) }}
                      </td>
                      <td scope="col" class="border-0 fs-12">
                        {{ parseFloat(item.t_amount).toFixed(2) }}
                      </td>
                      <td scope="col" class="border-0 fs-12">
                        {{ parseFloat(item.due).toFixed(2) }}
                      </td>
                    </tr>

                    <tr class="thead-color border">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4"></th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Total</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">
                        {{ parseFloat(totalAmount).toFixed(2) }}
                      </th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">
                        {{ parseFloat(totalAmountVat).toFixed(2) }}
                      </th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">
                        {{ parseFloat(totalAdjustment).toFixed(2) }}
                      </th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">
                        {{ parseFloat(totalReceivable).toFixed(2) }}
                      </th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">
                        {{ parseFloat(totalDue).toFixed(2) }}
                      </th>
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
  name: "Total Receivable",
  components: { TopNav, Sidebar },

  data() {
    return {
      journalData: [],
      totalReceivableData: [],
      startDate: "",
      endDate: "",
      currentDate: new Date(),
      totalAmountCount: 0,
      totalAmountVatCount: 0,
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
    // Data Fetch Functions
    getJournalData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getInvoiceData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.totalReceivableData = data.message;

          console.log(this.totalReceivableData);
        })
        .catch((err) => console.log(err.message));
    },

    // Data Formatter

    formatDate(date) {
      const newDate = new Date(date);
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      return `${day}/${month}/${year}`;
    },

    // Miscellaneous

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
    ...mapState(["viewPrivilege"]),
    ...mapState(["orgInfo"]),
    filteredData() {
      const { startDate, endDate, totalReceivableData } = this;

      return totalReceivableData.filter(({ create_date }) => {
        return (startDate <= create_date && endDate >= create_date) || startDate === "";
      });
    },

    totalAmount() {
      this.totalAmountCount = this.filteredData.reduce((total, item) => total + +item.st_amount, 0);
      return this.filteredData.reduce((total, item) => total + +item.st_amount, 0);
    },

    totalAmountVat() {
      return this.filteredData.reduce((total, item) => total + +item.t_tax, 0);
    },
    totalAdjustment() {
      return this.filteredData.reduce((total, item) => total + +item.adjustment, 0);
    },
    totalReceivable() {
      return this.filteredData.reduce((total, item) => total + +item.t_amount, 0);
    },
    totalDue() {
      return this.filteredData.reduce((total, item) => total + +item.due, 0);
    },
  },
  async mounted() {
    this.getJournalData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
