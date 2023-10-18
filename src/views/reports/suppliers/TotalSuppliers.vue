<template>
  <div class="print_section"></div>
  <div class="view-section">
    

    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Total Suppliers Report</p>
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
                <p class="fs-14 text-center mb-0">Total Suppliers</p>
                <p class="fs-12 text-center" v-if="startDate">Date: {{ startDate }} - {{ endDate }}</p>
                <p class="fs-12 text-center" v-else>Date: {{ formatDate(currentDate) }} (Alltime Data)</p>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4">#Vendor ID</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Vendor Name</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Total Paid</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Total Due</th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="item in SuppliersReport" :key="item.id">
                      <td scope="col" class="border-0 fs-12 ps-4">
                        {{ item.v_id }}
                      </td>
                      <td scope="col" class="border-0 fs-12 ps-4">
                        {{ item.vname }}
                      </td>
                      <td scope="col" class="border-0 fs-12 font-weight-600">
                        <span class="d-inline-block text-truncate">{{ item.total_t_amount }}</span>
                      </td>

                      <td scope="col" class="border-0 fs-12">
                        {{ item.total_due }}
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
  name: "Total Suppliers",
  components: { TopNav, Sidebar },

  data() {
    return {
      SuppliersReport: [],
      startDate: "",
      endDate: new Date(),
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
    getSuppliersReport() {
      // const startDate = '2023-01-01';
      // const endDate = '2023-12-31';

      fetch(`${process.env.VUE_APP_SERVER_URL}/getSuppliersReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: this.startDate,
          endDate: this.endDate,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.SuppliersReport = data.message;
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
      const { startDate, endDate, SuppliersReport } = this;

      return SuppliersReport.filter(({ cdate }) => {
        return (startDate <= cdate && endDate >= cdate) || startDate === "";
      });
    },

    ...mapState(["viewPrivilege"]),
  },
  async mounted() {
    this.getSuppliersReport();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    startDate: {
      handler() {
        this.getSuppliersReport();
      },
    },
    endDate: {
      handler() {
        this.getSuppliersReport();
      },
    },
  },
};
</script>
