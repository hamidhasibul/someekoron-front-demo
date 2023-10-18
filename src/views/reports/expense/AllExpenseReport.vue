<template>
  <div class="print_section"></div>
  <div class="view-section">
    

    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">All Expense Report</p>
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
                <p class="fs-14 text-center mb-0">All Expenses</p>
                <p class="fs-12 text-center" v-if="startDate">Date: {{ startDate }} - {{ endDate }}</p>
                <p class="fs-12 text-center" v-else>Date: {{ formatDate(currentDate) }} (Alltime Data)</p>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4">#Expense ID</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Expense Description</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Expense By</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Amount</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Date</th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="item in filteredData" :key="item.id">
                      <td scope="col" class="border-0 fs-12 ps-4">
                        {{ item.ex_id }}
                      </td>
                      <td scope="col" class="border-0 fs-12 font-weight-600">
                        <span class="d-inline-block text-truncate">
                          <span>{{ item.exp_type }} </span>
                          <router-link :to="`/projectlistview/${item.pid}`">
                            <span v-if="item.exp_type === 'Project'"> ( {{ item.pid }} )</span>
                          </router-link>
                          ,
                          {{ item.ex_des }}
                        </span>
                      </td>

                      <td scope="col" class="border-0 fs-12">
                        {{ item.empoloyee_name }}
                      </td>

                      <td class="border-0 fs-12">
                        <p class="mb-0 px-0 font-weight-600">
                          {{ parseFloat(item.t_amount).toFixed(2) }} {{ orgInfo.currency }}
                        </p>
                      </td>
                      <td scope="col" class="border-0 fs-11 font-weight-600">
                        {{ formatDate(item.cdate) }}
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
  name: "All Expense Report",
  components: { TopNav, Sidebar },

  data() {
    return {
      allExpenses: [],
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
    getExpenseData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getExpenseData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.allExpenses = data.message;
          console.log(data.message);
        })
        .catch((err) => console.log(err.message));
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
    ...mapState(["orgInfo"]),
    filteredData() {
      const { startDate, endDate, allExpenses } = this;

      return allExpenses.filter(({ cdate }) => {
        return (startDate <= cdate && endDate >= cdate) || startDate === "";
      });
    },

    ...mapState(["viewPrivilege"]),
  },
  async mounted() {
    this.getExpenseData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
