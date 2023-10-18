<template>
  
  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right pt-2 px-4">
        <div class="">
          <div class="row my-2">
            <div class="col-lg-9 px-0 px-2">
              <h5 class="mb-3 text-white text-muted fw-bold">Overview</h5>

              <div class="row mb-0 text-white text-muted pb-4">
                <div class="col-lg-3">
                  <div class="card text-center py-3">
                    <p class="fs-4 mb-1 fw-bold">{{ ActiveProject }}</p>
                    <p class="fs-6 mb-0 text-g fw-300">Active Project</p>
                  </div>
                </div>

                <div class="col-lg-3">
                  <div class="card text-center py-3">
                    <p class="fs-4 mb-1 fw-bold">{{ DoneProject }}</p>
                    <p class="fs-6 mb-0 text-b fw-300">Complete Project</p>
                  </div>
                </div>

                <div class="col-lg-3">
                  <div class="card text-center py-3">
                    <p class="fs-4 mb-1 fw-bold">{{ DueInvoice }}</p>
                    <p class="fs-6 mb-0 text-muted2 fw-300">Due Invoice</p>
                  </div>
                </div>

                <div class="col-lg-3">
                  <div class="card text-center py-3">
                    <p class="fs-4 mb-1 fw-bold">{{ Due }}</p>
                    <p class="fs-6 mb-0 text-muted2 fw-300">Suppliers Due</p>
                  </div>
                </div>
              </div>

              <div class="card rounded-0 text-left mb-4 bg-white">
                <div class="container-fluid">
                  <div class="row pt-2 px-1 border-bottom card-header rounded-0" style="height: 40px">
                    <div class="col-lg-9">
                      <div class="mb-0 text-muted fs-6">
                        <p class="mb-0">Accounts Statistics</p>
                      </div>
                    </div>

                    <div class="col-lg-3 text-end">
                      <div class="month-button-trigger">
                        <button
                          class="month-button fs-14 ms-4 dropdown-toggle"
                          @click="showMonthPicker1 = !showMonthPicker1"
                        >
                          <i class="fa-regular fa-calendar me-1"></i>
                          {{ currentMonth1 }}
                        </button>
                        <div class="month-picker" v-show="showMonthPicker1">
                          <div class="month-grid">
                            <div
                              class="month-grid-item"
                              v-for="month in months"
                              :key="month"
                              @click="selectMonth(month, 1)"
                            >
                              {{ month }}
                            </div>
                          </div>
                        </div>
                      </div>

                      <label for="monthcal" class="border-0 w-100"> </label>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between mb-1 py-2">
                    <div class="w-70 border-end">
                      <div class="mb-0 text-muted fs-6" style="height: 270px">
                        <canvas id="myChart" class=""></canvas>
                      </div>
                    </div>

                    <div class="">
                      <div class="text-end py-3">
                        <div style="font-size: 12px; color: limegreen">
                          Opening Balance
                          <p class="text-muted px-1" style="font-size: 18px">
                            {{ parseFloat(stats.openingBalance).toFixed(2) }}
                            <small> {{ orgInfo.currency }}</small>
                          </p>
                        </div>
                        <div class="text-muted" style="font-size: 12px">
                          Incoming
                          <p class="text-muted px-1" style="font-size: 18px">
                            {{ parseFloat(stats.Incoming).toFixed(2) }}
                            <small> {{ orgInfo.currency }} </small>
                          </p>
                        </div>
                        <div class="text-muted" style="font-size: 12px">
                          Outgoing
                          <p class="text-muted px-1" style="font-size: 18px">
                            {{ parseFloat(stats.Outgoing).toFixed(2) }}
                            <small> {{ orgInfo.currency }} </small>
                          </p>
                        </div>
                        <div style="font-size: 12px; color: cornflowerblue">
                          Ending Balance
                          <p class="text-muted px-1" style="font-size: 18px">
                            {{ parseFloat(stats.endBalance).toFixed(2) }}
                            <small> {{ orgInfo.currency }} </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card rounded-0 text-left mb-3">
                <div class="card-header mb-0">Active Projects</div>
                <div class="scroll-bar-wrap">
                  <div class="scroll-box">
                    <div v-if="projecttaskinfo && projecttaskinfo.length == 0" class="container">
                      <div class="row justify-content-center mt-5">
                        <img
                          class="col-12 img-fluid"
                          src="../assets/image/folder.png"
                          alt="No Project"
                          style="width: 80px; opacity: 1"
                        />
                        <p class="col-12 fs-14 text-center my-3 text-muted">
                          No project available!<br />
                          
                        </p>
                      </div>
                    </div>
                    <div
                    v-else
                      class="d-flex py-2 align-items-center border-bottom px-2"
                      v-for="item in projecttaskinfo"
                      :key="item"
                    >
                      <div class="w-35">
                        <div class="px-1">
                          <p class="mb-0 fw-bold" style="font-size: 14px">
                            {{ item.project }}
                          </p>
                          <p class="fw-light mb-0" style="font-size: 12px">
                            {{ item.customer }}
                          </p>
                        </div>
                      </div>
                      <div class="px-2 w-15">
                        <div
                          class="py-0 px-1 mb-0 border-0 rounded-pill text-white"
                          style="background-color: rgb(43, 104, 218)"
                        >
                          <p class="m-0 text-center fw-bold fs-12">
                            Task: {{ item.dProjectTask }}/{{ item.tProjectTask }}
                          </p>
                        </div>
                      </div>

                      <div class="w-30 px-2">
                        <div class="progress rounded-pill" style="height: 1.2rem">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            :style="`width: ${item.Ttask ? item.Ttask : 0}%; background-color: rgb(0, 126, 73)`"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {{ item.Ttask ? item.Ttask : 0 }}%
                          </div>
                        </div>
                      </div>
                      <div class="">
                        <div class="px-4 py-1 mb-0" style="font-size: 13px; color: #e61414; text-align: end">
                          C/D- {{ item.date }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cover-bar"></div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 px-0 px-1 ps-4">
              <div class="row border-0">
                <div class="col-lg-12 mb-4" style="margin-top: 40px">
                  <div class="card shadow-sm border-0" style="padding-block: inherit">
                    <canvas
                      id="myChart2"
                      style="width: 95px; object-fit: contain; padding-inline: 7px; padding-block: 9px"
                    ></canvas>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="card rounded-0 shadow-sm text-left mb-4">
                    <div class="container-fluid">
                      <div class="row border-bottom pe-2" style="height: 38px">
                        <div class="col-lg-6">
                          <div class="mb-0 text-muted fs-12 mt-2">Purchase Order</div>
                        </div>

                        <div class="col-lg-6 px-0">
                          <div class="month-button-trigger mx-3 mt-1">
                            <button
                              class="month-button dropdown-toggle fs-12"
                              @click="showMonthPicker2 = !showMonthPicker2"
                            >
                              <i class="fa-regular fa-calendar me-1"></i>
                              {{ currentMonth2 }}
                            </button>
                            <div class="month-picker" v-show="showMonthPicker2">
                              <div class="month-grid">
                                <div
                                  class="month-grid-item"
                                  v-for="month in months"
                                  :key="month"
                                  @click="selectMonth(month, 2)"
                                >
                                  {{ month }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <label for="monthcal" class="border-0 w-100"> </label>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-12 text-center">
                          <div class="border-bottom py-3">
                            <p class="fs-12 mb-0">Quantity</p>
                            <p class="font-weight-700 mb-0 fs-14" style="color: lightseagreen">
                              {{ sidebarAllstat.PurchaseOrderCount }}
                            </p>
                          </div>

                          <div class="py-3">
                            <p class="fs-12 mb-0">Total</p>
                            <p class="font-weight-700 mb-0 fs-14" style="color: lightseagreen">
                              {{
                                sidebarAllstat.TPurchaseOrderamount
                                  ? parseFloat(sidebarAllstat.TPurchaseOrderamount).toFixed(2)
                                  : "0.00"
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="card rounded-0 shadow-sm text-left mb-4">
                    <div class="container-fluid">
                      <div class="row border-bottom pe-2" style="height: 38px">
                        <div class="col-lg-6 mt-2">
                          <div class="mb-0 text-muted fs-12">Total Received</div>
                        </div>

                        <div class="col-lg-6 px-0 mt-1">
                          <div class="month-button-trigger mx-3 mb-3">
                            <button
                              class="month-button dropdown-toggle fs-12"
                              @click="showMonthPicker3 = !showMonthPicker3"
                            >
                              <i class="fa-regular fa-calendar me-1"></i>
                              {{ currentMonth3 }}
                            </button>
                            <div class="month-picker" v-show="showMonthPicker3">
                              <div class="month-grid">
                                <div
                                  class="month-grid-item"
                                  v-for="month in months"
                                  :key="month"
                                  @click="selectMonth(month, 3)"
                                >
                                  {{ month }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <label for="monthcal" class="border-0 w-100"> </label>
                        </div>
                      </div>

                      <div class="row py-2">
                        <div class="col-lg-12 text-center">
                          <div class="border-bottom py-2">
                            <p class="fs-12 mb-0">Quantity</p>
                            <p class="font-weight-700 mb-0 fs-14" style="color: lightseagreen">
                              {{ sidebarAllstat.PaymentReceiptCount }}
                            </p>
                          </div>
                          <div class="mt-2 py-2">
                            <p class="fs-12 mb-0">Total</p>
                            <p class="font-weight-700 mb-0 fs-14" style="color: lightseagreen">
                              {{
                                sidebarAllstat.TPaymentReceiptamount
                                  ? parseFloat(sidebarAllstat.TPaymentReceiptamount).toFixed(2)
                                  : "0.00"
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="card rounded-0 shadow-sm text-left mb-4">
                    <div class="container-fluid">
                      <div class="row border-bottom pe-2" style="height: 38px">
                        <div class="col-lg-6 mt-2">
                          <div class="mb-0 text-muted fs-12">Total Paid</div>
                        </div>

                        <div class="col-lg-6 px-0 mt-1">
                          <div class="month-button-trigger mx-3 mb-3">
                            <button
                              class="month-button fs-12 dropdown-toggle"
                              @click="showMonthPicker4 = !showMonthPicker4"
                            >
                              <i class="fa-regular fa-calendar me-1"></i>
                              {{ currentMonth4 }}
                            </button>
                            <div class="month-picker" v-show="showMonthPicker4">
                              <div class="month-grid">
                                <div
                                  class="month-grid-item"
                                  v-for="month in months"
                                  :key="month"
                                  @click="selectMonth(month, 4)"
                                >
                                  {{ month }}
                                </div>
                              </div>
                            </div>
                          </div>

                          <label for="monthcal" class="border-0 w-100"> </label>
                        </div>
                      </div>

                      <div class="row py-2">
                        <div class="col-lg-12 text-center">
                          <div class="border-bottom py-2">
                            <p class="fs-12 mb-0">Quantity</p>
                            <p class="font-weight-700 mb-0 fs-14" style="color: lightseagreen">
                              {{ sidebarAllstat.PaidBillCount }}
                            </p>
                          </div>
                          <div class="mt-2 py-2">
                            <p class="fs-14 mb-0 fs-12">Total</p>
                            <p class="font-weight-700 mb-0 fs-14" style="color: lightseagreen">
                              {{
                                sidebarAllstat.TPaidBillamount
                                  ? parseFloat(sidebarAllstat.TPaidBillamount).toFixed(2)
                                  : "0.00"
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import Chart from "chart.js/auto";
import { mapState } from "vuex";

export default {
  name: "DashboardView",
  components: { TopNav, SideBar, Footer },
  props: {
    msg: String,
  },

  data() {
    return {
      projecttaskinfo: [],
      ActiveProject: "",
      DoneProject: "",
      Due: "",
      DueInvoice: "",
      sidebarAllstat: [],
      dognutAlldata: [],
      stats: [],
      lowstock: "",
      Totalitem: "",
      Transferitem: "",
      showMonthPicker1: false,
      showMonthPicker2: false,
      showMonthPicker3: false,
      showMonthPicker4: false,

      currentMonth1: "This Month",
      currentMonth2: "This Month",
      currentMonth3: "This Month",
      currentMonth4: "This Month",
      months: ["This Month", "Previous 3 Month", "Previous 6 Month", "This Year"],
      incomingReport: [],
      outgoingReport: [],
    };
  },
  methods: {
    fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserPrivilege", id);
      this.$store.dispatch("fetchOrgInfo");
    },
    selectMonth(month, buttonNumber) {
      if (buttonNumber === 1) {
        this.currentMonth1 = month;
        this.showMonthPicker1 = false;
      } else if (buttonNumber === 2) {
        this.currentMonth2 = month;
        this.showMonthPicker2 = false;
      } else if (buttonNumber === 3) {
        this.currentMonth3 = month;
        this.showMonthPicker3 = false;
      } else if (buttonNumber === 4) {
        this.currentMonth4 = month;
        this.showMonthPicker4 = false;
      }
    },

    projecttask() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/dashboardProjectStat`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.projecttaskinfo = res.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    asidebarstat() {
      const data = new FormData();

      data.append("duration2", this.currentMonth2);
      data.append("duration3", this.currentMonth3);
      data.append("duration4", this.currentMonth4);
      fetch(`${process.env.VUE_APP_SERVER_URL}/dashboardProjectStatSidebar`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.sidebarAllstat = res;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    dognutdata() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getResourceDashboardData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.lowstock = res.message.lowStockItems;
          this.Totalitem = res.message.totalItemCount;
          this.Transferitem = res.message.totalTransferItemCount;
          this.dognutAlldata = res.message;

          this.myChart2.data.datasets[0].data = [this.Totalitem, this.lowstock, this.Transferitem];

          this.myChart2.update();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    createChart() {
      const ctx = document.getElementById("myChart");

      const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Outgoing",
            data: [], // Initialize with an empty array
            fill: false,
            borderWidth: 1.5,
            borderColor: "rgb(251, 37, 118)", // Nice border color for Outgoing dataset
            tension: 0,
            pointBackgroundColor: "rgb(251, 37, 118)",
            pointRadius: 1,
            pointHoverRadius: 5, // Point radius on hover
          },
          {
            label: "Incoming",
            data: [], // Initialize with an empty array
            fill: false,
            borderWidth: 1.5,
            borderColor: "#1F8A70", // Nice border color for Incoming dataset
            tension: 0,
            pointBackgroundColor: "#1F8A70",
            pointRadius: 1,
            pointHoverRadius: 5, // Point radius on hover
          },
        ],
      };

      this.myChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          plugins: {
            legend: {
              display: true,
              position: "top", // Change the position of the legend (options: 'top', 'bottom', 'left', 'right')
              labels: {
                usePointStyle: true,
                // Define a custom function to generate the line symbol
                generateLabels: function (chart) {
                  const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                  defaultLabels.forEach((label) => {
                    // Set the desired line symbol for each dataset
                    if (label.datasetIndex === 0) {
                      label.pointStyle = "line"; // Use 'line' as the pointStyle for the first dataset (Outgoing)
                    } else if (label.datasetIndex === 1) {
                      label.pointStyle = "line"; // Use 'dash' as the pointStyle for the second dataset (Incoming)
                    }
                  });
                  return defaultLabels;
                },
              },
            },
          },
          scales: {
            y: {
              grid: {
                drawOnChartArea: false, // Set this to true if you want to draw grid lines on the chart area
                drawBorder: false, // Set this to true if you want to draw grid lines on the chart border
                color: "rgba(0, 0, 0, 0.1)", // Set the color of the grid lines
                borderDash: [5, 5], // You can use this to create dashed grid lines if desired
                zeroLineColor: "rgba(0, 0, 0, 0.25)", // Set the color of the zero grid line
              },
            },
          },
        },
      });
    },

    createDoughnut() {
      const ctx2 = document.getElementById("myChart2");

      // Store reference to Vue component

      const config2 = {
        type: "doughnut",
        data: {
          labels: ["Stock Resource", "Low Stock", "Transfer Stock"],
          datasets: [
            {
              label: "",
              data: [],
              borderWidth: 0,
              backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "left",
              ltl: true,
              labels: {
                textAlign: "left",
                pointStyle: "rect",
                usePointStyle: true,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              right: 5,
            },
          },
          fullWidth: false,
        },
      };

      this.myChart2 = new Chart(ctx2, config2);
    },

    getCustomerTransactions() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getDashboardmonthlytransaction`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.outgoingReport = data.pb;
          this.incomingReport = data.pr;

          this.myChart.data.datasets[0].data = this.outgoingReport;
          this.myChart.data.datasets[1].data = this.incomingReport;
          this.myChart.update();
        })
        .catch((err) => console.log(err));
    },
    getTopStats() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/dashboardTopStat`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.ActiveProject = res.aproject;
          this.DoneProject = res.dproject;
          this.Due = res.due;
          this.DueInvoice = res.idue;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getotherstats() {
      const data = new FormData();

      data.append("duration", this.currentMonth1);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getDashboardAllTimetransaction`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.stats = res;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getotherstats();
    this.projecttask();
    this.asidebarstat();
    this.getTopStats();
    this.getCustomerTransactions();
    this.dognutdata();
    this.createChart();
    this.createDoughnut();

    this.fetchData();

    if (!this.isAuthenticated) {
      this.$router.push("/");
    }
  },

  computed: {
    ...mapState(["orgInfo"]),

    isAuthenticated: () => {
      const token = localStorage.getItem("token");
      return !!token; // Convert to boolean
    },

    ...mapState(["userPrivilege"]),
  },

  watch: {
    currentMonth1: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.getotherstats();
        }
      },
    },

    currentMonth2: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.asidebarstat();
        }
      },
    },
    currentMonth3: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.asidebarstat();
        }
      },
    },
    currentMonth4: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.asidebarstat();
        }
      },
    },
  },
};
</script>
<style>
#myChartContainer {
  margin-right: none;
}
</style>
