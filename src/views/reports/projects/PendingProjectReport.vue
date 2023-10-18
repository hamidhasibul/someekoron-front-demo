<template>
  <div class="print_section"></div>
  <div class="view-section">
    

    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Pending Projects List</p>
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
                <p class="fs-14 text-center mb-0">Project List</p>
                <p class="fs-12 text-center" v-if="startDate">Date: {{ startDate }} - {{ endDate }}</p>
                <p class="fs-12 text-center" v-else>Date: {{ formatDate(currentDate) }} (Alltime Data)</p>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border">
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4" width="10%">#ID</th>

                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="25%">Project Name</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="25%">Project Owner</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Amount</th>
                      <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Completion Date</th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr class="shadowItem" v-for="item in filteredData" :key="item.id">
                      <td scope="col" class="border-0 fs-12 ps-4" width="10%">
                        {{ item.p_id }}
                      </td>
                      <td scope="col" class="border-0 fs-12 font-weight-600" width="20%">
                        <span class="d-inline-block text-truncate" style="max-width: 250px">{{
                          item.project_name
                        }}</span>
                      </td>

                      <td scope="col" class="border-0 fs-12" width="20%">
                        {{ item.org_name }}
                      </td>

                      <td class="border-0 fs-12" width="15%">
                        <p class="mb-0 px-0 font-weight-600">
                          {{ parseFloat(item.amount).toFixed(2) }} {{ orgInfo.currency }}
                        </p>
                      </td>

                      <td scope="col" class="border-0 fs-11 font-weight-600" width="15%">
                        <span class="py-1 px-3">
                          {{ item.cdate }}
                        </span>
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
  name: "Pending Project Report",
  components: { TopNav, Sidebar },

  data() {
    return {
      pendingProjects: [],
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
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },

    getProjectData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.pendingProjects = data.message.filter((item) => {
            return +item.status === 0;
          });
        })
        .catch((err) => console.log(err.message));
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

  async mounted() {
    this.getProjectData();

    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    ...mapState(["orgInfo"]),
    filteredData() {
      const { startDate, endDate, pendingProjects } = this;

      return pendingProjects.filter(({ sdate }) => {
        return (startDate <= sdate && endDate >= sdate) || startDate === "";
      });
    },
    ...mapState(["viewPrivilege"]),
  },
};
</script>
