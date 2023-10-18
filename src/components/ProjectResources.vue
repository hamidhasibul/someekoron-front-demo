<template>
  <div class="container">
    <div class="row px-2">
      <div class="col-lg-12">
        <p class="mb-0 font-18 font-weight-600">All Resources</p>
        <table class="table align-middle my-2">
          <thead>
            <tr class="thead-color border border-start-0 border-end-0">
              <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Date</th>
              <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Item Name</th>

              <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Total Amount</th>
              <th scope="col" class="text-end pe-5 border-0 fs-13 text-muted font-weight-600">Total Price</th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-if="resource_record && resource_record.length === 0">
              <td colspan="100%" class="border-0">
                <div class="row justify-content-center my-5">
                  <img
                    class="col-12 img-fluid"
                    src="../assets/image/noData.png"
                    alt="No Project"
                    style="width: 140px; opacity: 1"
                  />
                  <p class="col-12 fs-14 text-center my-3 text-muted">
                    There is no resource record data available!<br />
                  </p>
                </div>
              </td>
            </tr>

            <tr class="shadowItem" v-for="item in resource_record" :key="item.id">
              <td scope="col" class="fs-12">
                <span class="d-inline-block text-truncate">{{ formatDate(item.date) }}</span>
              </td>
              <td scope="col" class="fs-12">
                <span class="d-inline-block text-truncate">{{ item.rname }}</span>
              </td>

              <td scope="col" class="fs-12">
                <span class="d-inline-block text-truncate">{{ item.qty }}</span>
              </td>

              <td scope="col" class="fs-12 text-end pe-5">
                <span class="d-inline-block text-truncate">{{ (+item.qty * +item.unitCost).toFixed(2) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="col-lg-4 mt-4">
        <div class="bg-light rounded p-3">
          <div class="d-flex bg-white border rounded">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Project Budget</p>
            <p class="fs-14 m-0 p-2">{{ totalBudget }} {{ orgInfo.currency }}</p>
          </div>

          <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Total Outgoing</p>
            <p class="fs-14 m-0 p-2">{{ totalDebit }} {{ orgInfo.currency }}</p>
          </div>
          <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Total Incomming</p>
            <p class="fs-14 m-0 p-2">{{ totalCredit }} {{ orgInfo.currency }}</p>
          </div>
          <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Net Profit</p>
            <p class="fs-14 m-0 p-2">{{ totalCredit - totalDebit }} {{ orgInfo.currency }}</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "ProjectResources",
  data() {
    return {
      p_id: "",

      resource_record: [],
    };
  },

  methods: {
    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate(); // Get the day of the month
      const month = formatedDate.getMonth() + 1; // Month is zero-based, so add 1
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
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
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getProjectResources();
  },

  computed: {},

  updated() {},
};
</script>
