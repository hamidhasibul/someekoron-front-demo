<template>
  <div class="print_section"></div>
  <div class="view-section">
    

    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Tax Payable Report</p>
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
                <p class="fs-14 text-center mb-0">Tax Payable Report</p>
                <p class="fs-12 text-center" v-if="startDate">Date: {{ startDate }} - {{ endDate }}</p>
                <p class="fs-12 text-center" v-else>Date: {{ formatDate(currentDate) }} (Alltime Data)</p>

                <table class="table align-middle">
                  <thead>
                    <tr class="thead-color border">
                      <th scope="col" class="fs-13 text-muted font-weight-600">Date</th>

                      <th scope="col" class="fs-13 text-muted font-weight-600">Particular</th>
                      <th scope="col" class="w-25 fs-13 text-muted font-weight-600 text-end pe-5">
                        Payable VAT Ammount
                      </th>
                      <th scope="col" class="w-25 fs-13 text-muted font-weight-600 text-end pe-5">
                        Payable Tax Ammount
                      </th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr class="shadowItem" v-for="item in filteredData" :key="item.id">
                      <td v-if="item.t_tax > 0 || item.tax_amount > 0" scope="col" class="fs-12">
                        {{ formatDate(item.cdate) }}
                      </td>
                      <td v-if="item.t_tax > 0 || item.tax_amount > 0" scope="col" class="fs-12">
                        <span class="d-inline-block text-truncate">
                          {{ item.project_name }}, {{ item.vname }}, ({{ item.pay_id }})
                        </span>
                      </td>

                      <td v-if="item.t_tax > 0 || item.tax_amount > 0" scope="col" class="fs-12 text-end pe-5">
                        {{ item.t_tax }}
                      </td>
                      <td v-if="item.t_tax > 0 || item.tax_amount > 0" scope="col" class="fs-12 text-end pe-5">
                        {{ parseFloat(item.tax_amount).toFixed(2) }}
                      </td>
                    </tr>
                    <tr class="shadowItem">
                      <th scope="col" class="border-0 fs-12 ps-4"></th>
                      <th scope="col" class="border-0 fs-12 ps-4 text-end"></th>

                      <th scope="col" class="border-0 fs-12 text-end pe-5">Total: {{ totalPayableVat }}</th>
                      <th scope="col" class="border-0 fs-12 text-end pe-5">Total: {{ totalPayableTax }}</th>
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
  name: "Tax Payable Report",
  components: { TopNav, Sidebar },

  data() {
    return {
      taxPayableData: [],
      startDate: "",
      totalPayableTaxCount: 0,
      totalVatAmountCount: 0,
      totalTaxAmountCount: 0,
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
    getTaxPayableData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getPBData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.taxPayableData = data.message;
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
    ...mapState(["viewPrivilege"]),
    ...mapState(["orgInfo"]),
    filteredData() {
      const { startDate, endDate, taxPayableData } = this;
      console.log(taxPayableData);
      return taxPayableData.filter(({ cdate }) => {
        return (startDate <= cdate && endDate >= cdate) || startDate === "";
      });
    },

    totalPayableVat() {
      this.totalVatAmountCount = this.filteredData.reduce((total, item) => total + +item.t_tax, 0);
      return this.filteredData.reduce((total, item) => total + +item.t_tax, 0);
    },

    totalPayableTax() {
      this.totalTaxAmountCount = this.filteredData.reduce((total, item) => total + +item.tax_amount, 0);
      return this.filteredData.reduce((total, item) => total + +item.tax_amount, 0);
    },
  },
  async mounted() {
    this.getTaxPayableData();

    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
