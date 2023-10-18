<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12 px-0">
        <div class="row">
          <div class="col-lg-4 border-end pe-0">
            <table class="table text-center align-middle">
              <thead>
                <tr class="thead-color border">
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600 ps-3 text-start"
                    width="50%"
                  >
                    Project Info
                  </th>

                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted text-start font-weight-600 pe-2"
                    width="30%"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    class="text-center border-0 fs-13 text-muted font-weight-600 pe-2"
                    width="15%"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="border-0">
                <tr v-if="projects && projects.length == 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/noProject.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no project data available!
                      </p>
                    </div>
                  </td>
                </tr>
                <tr
                  v-else
                  :class="[
                    'shadowItem text-start',
                    selected_p_id === item.p_id ? 'table-active ' : '',
                  ]"
                  v-for="item in ProjectInfo"
                  :key="item.id"
                >
                  <td scope="col" class="border-0 fs-12 ps-3">
                    <span class="button-blue px-2 fs-10 font-weight-600">{{
                      item.p_id
                    }}</span>
                    <br />
                    <span
                      class="font-weight-600 fs-14"
                      style="color: #119074"
                      >{{ item.project_name }}</span
                    >

                    <p class="fs-12 m-0">{{ item.org_name }}</p>
                  </td>
                  <!-- <td
                    scope="col"
                    class="border-0 fs-12 fw-bold text-center"
                    width="20%"
                  >
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 250px"
                      >{{ item.project_name }}</span
                    >
                  </td> -->

                  <!-- <td scope="col" class="border-0 fs-12" width="20%">
                    P{{ item.org_name }}
                  </td> -->

                  <td class="border-0 fs-12" width="15%">
                    <button
                      type="button"
                      class="mb-0 border-0"
                      style="
                        color: #fff;
                        border-radius: 5px;
                        background-color: rgb(9, 98, 182);
                        padding-block: 2px;
                      "
                    >
                      {{ parseFloat(item.amount).toFixed(2) }}
                      {{ orgInfo.currency }}
                    </button>
                  </td>

                  <!-- <td scope="col" class="border-0 fs-12" width="15%">
                    <span
                      class="py-1 px-3"
                      style="
                        color: azure;
                        border-radius: 20px;
                        background-color: coral;
                        padding-block: 2px;
                        padding-inline: 0px;
                      "
                    >
                      {{ item.cdate }}
                    </span>
                  </td> -->

                  <!-- <td scope="col" class="border-0 fs-12">
                    <button
                      type="button"
                      class="mb-0 border-0 px-2"
                      style="
                        color: azure;
                        border-radius: 20px;
                        background-color: crimson;
                        padding-block: 2px;
                      "
                    >
                      <router-link
                        to="/singlestatus"
                        class="text-decoration-none text-white"
                      >
                        Ongoing
                      </router-link>
                    </button>
                  </td> -->

                  <td scope="col" class="text-center border-0 text-primary">
                    <i
                      @click="changeProject(item.p_id)"
                      class="fs-14 fa-solid fa-circle-arrow-right cursor-pointer"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-lg-8">
            <div class="text-center" v-if="selected_p_id === ''">
              <div class="row justify-content-center my-5">
                <img
                  class="col-12 img-fluid"
                  src="../assets/image/folder-select.png"
                  alt="No Project"
                  style="width: 80px; opacity: 1; margin-top: 100px"
                />
                <p class="col-12 fs-14 text-center my-3 text-muted">
                  No project selected yet! <br />Please select a project to view
                  its task.
                </p>
              </div>
            </div>
            <div v-else>
              <div class="container">
                <div class="row justify-content-center py-3">
                  <div
                    class="col-lg-10 px-5 border shadow-sm py-4 print_view"
                    id="printID"
                  >
                    <p class="fs-18 mb-0 text-center">{{ orgInfo.org_name }}</p>
                    <p class="fs-12 font-weight-600 text-center mb-0">
                      {{ projectName }}
                    </p>

                    <div v-if="isLoading">
                      <div
                        class="d-flex justify-content-center align-items-center h-100"
                      >
                        <p class="py-5">Collecting data...</p>
                      </div>
                    </div>

                    <div class="mt-5 mx-auto" v-else>
                      <div
                        class="d-flex justify-content-between bg-white my-2 border rounded"
                      >
                        <p class="fw-bold p-2 fs-14 m-0 w-75 border-end">
                          Quotation Amount
                        </p>

                        <p class="fs-14 m-0 p-2">
                          {{ q_Ammount.toFixed(2) }} {{ orgInfo.currency }}
                        </p>
                      </div>

                      <div
                        class="d-flex justify-content-between bg-white border rounded"
                      >
                        <p class="fw-bold p-2 fs-14 m-0 w-75 border-end">
                          Project Budget
                        </p>
                        <p class="fs-14 m-0 p-2">
                          {{ totalBudget.toFixed(2) }} {{ orgInfo.currency }}
                        </p>
                      </div>

                      <div class="mt-4">
                        <div
                          class="d-flex justify-content-between border-bottom"
                        >
                          <p class="p-2 fs-14 m-0 w-75 font-weight-600">
                            Particulars
                          </p>
                          <p class="fs-14 m-0 p-2 font-weight-600">Amount</p>
                        </div>

                        <div
                          class="d-flex justify-content-between border-bottom"
                        >
                          <p class="fw-bold p-2 fs-12 m-0 w-75">
                            Total Purchase Order
                          </p>
                          <p class="fs-12 m-0 p-2">
                            {{ totalPO.toFixed(2) }} {{ orgInfo.currency }}
                          </p>
                        </div>

                        <div
                          class="d-flex justify-content-between border-bottom"
                        >
                          <p class="fw-bold p-2 fs-12 m-0 w-75">
                            Transfered Resource Ammount
                          </p>
                          <p class="fs-12 m-0 p-2">
                            {{ TRAmmount.toFixed(2) }} {{ orgInfo.currency }}
                          </p>
                        </div>

                        <div
                          class="d-flex justify-content-between border-bottom"
                        >
                          <p class="fw-bold p-2 fs-12 m-0 w-75">
                            Project Other Expense
                          </p>
                          <p class="fs-12 m-0 p-2">
                            {{ projectOtherEx.toFixed(2) }}
                            {{ orgInfo.currency }}
                          </p>
                        </div>

                        <div class="d-flex justify-content-between mb-3">
                          <p class="p-2 fs-12 m-0 w-75 font-weight-600">
                            Total Outgoing
                          </p>
                          <p class="fs-12 m-0 p-2 font-weight-600">
                            {{
                              (totalPO + TRAmmount + projectOtherEx).toFixed(2)
                            }}
                            {{ orgInfo.currency }}
                          </p>
                        </div>

                        <div
                          class="d-flex justify-content-between border-bottom"
                        >
                          <p class="p-2 fs-12 m-0 w-75 font-weight-600">
                            Total Received payment
                          </p>
                          <p class="fs-12 m-0 p-2 font-weight-600">
                            {{ PRAmmount.toFixed(2) }} {{ orgInfo.currency }}
                          </p>
                        </div>

                        <div class="d-flex justify-content-between">
                          <p class="p-2 fs-12 m-0 w-75 font-weight-600">
                            Net Profit
                          </p>
                          <p class="fs-12 m-0 p-2 font-weight-600">
                            {{
                              (
                                totalPO +
                                TRAmmount +
                                projectOtherEx -
                                PRAmmount
                              ).toFixed(2)
                            }}
                            {{ orgInfo.currency }}
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
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "CustomerProject",
  data() {
    return {
      ProjectInfo: [],
      c_id: "",
      selected_p_id: "",
      isLoading: "",

      projectName: "",
      q_Ammount: 0,

      totalPO: 0,
      TRAmmount: 0,
      PRAmmount: 0,
      projectOtherEx: 0,
      netProfit: 0,
      resource_record: [],
      Transactioninfo: [],
      projectTasks: [],
      projectBudget: [],
    };
  },

  computed: {
    ...mapState(["orgInfo"]),

    totalBudget() {
      return this.projectBudget.reduce(
        (sum, item) => sum + +item.estimated_cost,
        0
      );
    },

    totalPO() {
      return this.Transactioninfo.reduce((total, item) => {
        if (item.type === "Purchase Order") {
          return total + item.amount;
        } else {
          return total;
        }
      }, 0);
    },

    projectOtherEx() {
      return this.Transactioninfo.reduce((total, item) => {
        if (item.type === "Expense") {
          return total + item.amount;
        } else {
          return total;
        }
      }, 0);
    },

    PRAmmount() {
      return this.Transactioninfo.reduce((total, item) => {
        if (item.type === "Payment Receipt") {
          return total + item.amount;
        } else {
          return total;
        }
      }, 0);
    },

    TRAmmount() {
      return this.resource_record.reduce((total, item) => {
        if (item.transfer_from !== "") {
          return total + +item.tcost;
        } else {
          return total;
        }
      }, 0);
    },
  },
  methods: {
    async getProjectResources() {
      this.p_id = this.$route.params.id;

      const data = new FormData();
      data.append("pid", this.p_id);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/getProjectResources`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        this.resource_record = res.message;
      } catch (error) {
        console.error(error);
      }
    },
    getProjectData() {
      this.p_id = this.$route.params.id;

      const data = new FormData();
      data.append("p_id", this.p_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.projectTasks = data.message2;
          this.projectBudget = data.message3;
          this.projectName = data.message[0].project_name;
          this.q_Ammount = parseFloat(data.message[0].amount);
        })
        .catch((err) => console.log(err.message));
    },
    getTransactionData() {
      this.pr_id = this.$route.params.id;
      const data = new FormData();
      data.append("pr_id", this.pr_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectTransactionData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.Transactioninfo = data.message;
        })
        .catch((err) => console.log(err.message));
    },
    async getProjectResources() {
      this.p_id = this.$route.params.id;

      const data = new FormData();
      data.append("pid", this.p_id);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/getProjectResources`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        this.resource_record = res.message;
        console.log(this.resource_record);
      } catch (error) {
        console.error(error);
      }
    },
    changeProject(id) {
      this.selected_p_id = id;
      this.getProjectTaskData(id);
    },
    getProjectTaskData(id) {
      this.isLoading = true;
      const data = new FormData();
      data.append("p_id", id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.projectTasks = data.message2;
          this.isLoading = false;
          this.projectBudget = data.message3;
          this.projectName = data.message[0].project_name;
          this.q_Ammount = parseFloat(data.message[0].amount);
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.$store.dispatch("fetchOrgInfo");
    this.getProjectResources();
    console.log(this.orgInfo);
    this.getProjectData();
    this.getTransactionData();
    this.getProjectResources();
    this.$store.dispatch("fetchOrgInfo");
    this.c_id = this.$route.params.id;
    const data = new FormData();
    data.append("c_id", this.c_id);
    fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerAllData`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.ProjectInfo = data.message3;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
