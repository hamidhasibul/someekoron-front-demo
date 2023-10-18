<template>
  <div class="container">
    <div class="row px-2">
      <div class="col-lg-8">
        <p class="mb-0 font-18 font-weight-600">All Transaction</p>
        <table class="table text-center align-middle my-2">
          <thead>
            <tr class="thead-color border border-start-0 border-end-0">
              <th scope="col" class="border-0 fs-13 text-start text-muted font-weight-600">Date</th>
              <th scope="col" class="border-0 fs-13 text-start text-muted font-weight-600">Particular</th>
              <th scope="col" class="border-0 fs-13 text-end text-muted font-weight-600">Debit</th>
              <th scope="col" class="border-0 fs-13 text-end text-muted font-weight-600">Credit</th>
              <th scope="col" class="border-0 fs-13 text-muted font-weight-600">View</th>
            </tr>
          </thead>
          <tbody class="border-0">
            <tr v-if="sortedData && sortedData.length === 0">
              <td colspan="100%" class="border-0">
                <div class="row justify-content-center my-5">
                  <img
                    class="col-12 img-fluid"
                    src="../assets/image/noData.png"
                    alt="No Project"
                    style="width: 140px; opacity: 1"
                  />
                  <p class="col-12 fs-14 text-center my-3 text-muted">There is no transaction data available!<br /></p>
                </div>
              </td>
            </tr>

            <tr class="shadowItem" v-for="item in sortedData" :key="item.id">
              <td scope="col" class="fs-12 text-start">
                <span class="d-inline-block text-truncate" style="max-width: 250px">{{ formatDate(item.date) }}</span>
              </td>
              <td scope="col" class="border-0 fs-12 text-start">
                <span class="d-inline-block text-truncate" style="max-width: 250px"
                  >{{ item.type }} : {{ item.id }}</span
                >
              </td>
              <td scope="col" class="border-0 fs-12 text-end">
                <span class="d-inline-block text-truncate" style="max-width: 250px">{{
                  item.type === "Payment Receipt" ? 0.0 : parseFloat(item.amount).toFixed(2)
                }}</span>
              </td>
              <td scope="col" class="border-0 fs-12 text-end">
                <span class="d-inline-block text-truncate" style="max-width: 250px">{{
                  item.type === "Payment Receipt" ? parseFloat(item.amount).toFixed(2) : 0.0
                }}</span>
              </td>
              <td scope="col" class="border-0 fs-12">
                <router-link
                  :to="`/${
                    item.type === 'Payment Receipt'
                      ? 'arlist'
                      : item.type === 'Purchase Order'
                      ? 'purchaseorderoverview'
                      : item.type === 'Expense'
                      ? 'expenseoverview'
                      : ''
                  }/${item.id}`"
                >
                  <i class="fa-solid fa-eye text-muted"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-4 mt-4">
        <div class="bg-light rounded p-3">
          <div class="d-flex bg-white my-2 border rounded">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Quotation Amount</p>
            <p class="fs-14 m-0 p-2">{{ q_Ammount.toFixed(2) }} {{ orgInfo.currency }}</p>
          </div>

          <div class="d-flex bg-white border rounded">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Project Budget</p>
            <p class="fs-14 m-0 p-2">{{ totalBudget.toFixed(2) }} {{ orgInfo.currency }}</p>
          </div>

          <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Total Outgoing</p>
            <p class="fs-14 m-0 p-2">{{ totalDebit.toFixed(2) }} {{ orgInfo.currency }}</p>
          </div>
          <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Total Incoming</p>
            <p class="fs-14 m-0 p-2">{{ totalCredit.toFixed(2) }} {{ orgInfo.currency }}</p>
          </div>
          <!-- <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Net Profit</p>
            <p class="fs-14 m-0 p-2">{{ totalCredit - totalDebit }} {{ orgInfo.currency }}</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "ProjectTransaction",
  data() {
    return {
      Transactioninfo: [],
      pr_id: "",
      q_Ammount: 0.0,
      projectTasks: [],
      projectBudget: [],
      p_id: "",
    };
  },

  methods: {
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
          this.q_Ammount = parseFloat(data.message[0].amount);
          this.projectTasks = data.message2;
          this.projectBudget = data.message3;
        })
        .catch((err) => console.log(err.message));
    },

    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate();
      const month = formatedDate.getMonth() + 1;
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  mounted() {
    this.$store.dispatch("fetchOrgInfo");
    this.pr_id = this.$route.params.id;
    console.log(this.$route.params.id);
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

    this.getProjectData();
  },

  computed: {
    ...mapState(["orgInfo"]),

    sortedData() {
      const result = this.Transactioninfo?.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      return result;
    },

    totalBudget() {
      return this.projectBudget.reduce((sum, item) => sum + +item.estimated_cost, 0);
    },

    totalCredit() {
      return this.sortedData.reduce((total, item) => {
        if (item.type === "Payment Receipt") {
          return total + item.amount;
        } else {
          return total;
        }
      }, 0);
    },

    totalDebit() {
      return this.sortedData.reduce((total, item) => {
        if (item.type !== "Payment Receipt") {
          return total + item.amount;
        } else {
          return total;
        }
      }, 0);
    },
  },

  updated() {
    // console.log(this.sortedData);
  },
};
</script>
