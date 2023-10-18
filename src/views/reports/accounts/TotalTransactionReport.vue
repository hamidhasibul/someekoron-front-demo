<template>
  <div class="print_section"></div>
  <div class="view-section">
    

    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Total Transaction Report</p>
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
                <p class="fs-14 text-center mb-0">Total Transactions</p>
                <p class="fs-12 text-center" v-if="startDate">Date: {{ startDate }} - {{ endDate }}</p>
                <p class="fs-12 text-center" v-else>Date: {{ formatDate(currentDate) }} (Alltime Data)</p>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4">#Date</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Description</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="item in filteredData" :key="item.id">
                      <td scope="col" class="border-0 fs-12 ps-4">
                        {{ formatDate(item.date) }}
                      </td>
                      <td scope="col" class="border-0 fs-12 font-weight-600">
                        <span class="d-inline-block text-truncate">{{ item.description }}</span>
                      </td>

                      <td scope="col" class="border-0 fs-12">
                        {{ item.entries[0].debit ? item.entries[0].debit : item.entries[0].credit }}
                      </td>
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
  name: "Total Transaction Report",
  components: { TopNav, Sidebar },

  data() {
    return {
      journalData: [],
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
    // Data Fetch Functions
    getJournalData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/journal-report`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.journalData = data.journalReport;

          console.log(data.journalReport);
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
    ...mapState(["orgInfo"]),
    filteredData() {
      const { startDate, endDate, journalData } = this;

      return journalData.filter(({ date }) => {
        return (startDate <= date && endDate >= date) || startDate === "";
      });
    },

    ...mapState(["viewPrivilege"]),
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
