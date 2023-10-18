<template>
  <div class="container">
    <div class="row justify-content-center px-2">
      <div class="col-lg-7 px-5 border shadow-sm py-4 print_view" id="printID">
        <p class="fs-18 mb-0 text-center">{{ orgInfo.org_name }}</p>
        <p class="fs-12 font-weight-600 text-center mb-0">{{ projectName }}</p>

        <div class="mt-5 mx-auto">
          <div class="d-flex justify-content-between bg-white my-2 border rounded">
            <p class="fw-bold p-2 fs-14 m-0 w-75 border-end">Quotation Amount</p>
            <p class="fs-14 m-0 p-2">{{ q_Ammount.toFixed(2) }} {{ orgInfo.currency }}</p>
          </div>

          <div class="d-flex justify-content-between bg-white border rounded">
            <p class="fw-bold p-2 fs-14 m-0 w-75 border-end">Project Budget</p>
            <p class="fs-14 m-0 p-2">{{ totalBudget.toFixed(2) }} {{ orgInfo.currency }}</p>
          </div>

          <div class="mt-4">
            <div class="d-flex justify-content-between border-bottom">
              <p class="p-2 fs-14 m-0 w-75 font-weight-600">Particulars</p>
              <p class="fs-14 m-0 p-2 font-weight-600">Amount</p>
            </div>

            <div class="d-flex justify-content-between border-bottom">
              <p class="fw-bold p-2 fs-12 m-0 w-75">Total Purchase Order</p>
              <p class="fs-12 m-0 p-2">{{ totalPO.toFixed(2) }} {{ orgInfo.currency }}</p>
            </div>

            <div class="d-flex justify-content-between border-bottom">
              <p class="fw-bold p-2 fs-12 m-0 w-75">Transfered Resource Ammount</p>
              <p class="fs-12 m-0 p-2">{{ TRAmmount.toFixed(2) }} {{ orgInfo.currency }}</p>
            </div>

            <div class="d-flex justify-content-between border-bottom">
              <p class="fw-bold p-2 fs-12 m-0 w-75">Project Other Expense</p>
              <p class="fs-12 m-0 p-2">{{ projectOtherEx.toFixed(2) }} {{ orgInfo.currency }}</p>
            </div>

            <div class="d-flex justify-content-between mb-3">
              <p class="p-2 fs-12 m-0 w-75 font-weight-600">Total Outgoing</p>
              <p class="fs-12 m-0 p-2 font-weight-600">
                {{ (totalPO + TRAmmount + projectOtherEx).toFixed(2) }}
                {{ orgInfo.currency }}
              </p>
            </div>

            <div class="d-flex justify-content-between border-bottom">
              <p class="p-2 fs-12 m-0 w-75 font-weight-600">Total Received payment</p>
              <p class="fs-12 m-0 p-2 font-weight-600">{{ PRAmmount.toFixed(2) }} {{ orgInfo.currency }}</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="p-2 fs-12 m-0 w-75 font-weight-600">Net Profit</p>
              <p class="fs-12 m-0 p-2 font-weight-600">
                {{ (totalPO + TRAmmount + projectOtherEx - PRAmmount).toFixed(2) }} {{ orgInfo.currency }}
              </p>
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
  name: "ProjectAccounts",
  data() {
    return {
      p_id: "",
      projectName: "",
      q_Ammount: 0.0,
      totalBudget: 0,
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

  methods: {
    async getProjectResources() {
      this.p_id = this.$route.params.id;

      const data = new FormData();
      data.append("pid", this.p_id);

      try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectResources`, {
          method: "POST",
          body: data,
        });

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
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectResources`, {
          method: "POST",
          body: data,
        });

        const res = await response.json();

        this.resource_record = res.message;
        console.log(this.resource_record);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchOrgInfo");
    this.getProjectResources();
    this.getProjectData();
    this.getTransactionData();
    this.getProjectResources();
  },

  computed: {
    ...mapState(["orgInfo"]),

    totalBudget() {
      return this.projectBudget.reduce((sum, item) => sum + +item.estimated_cost, 0);
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
};
</script>
