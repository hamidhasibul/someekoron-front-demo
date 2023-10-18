<template>
  <div class="container">
    <div class="row px-2">
      <div class="col-lg-8">
        <p class="mb-0 font-18 font-weight-600">Transaction Timeline</p>
        <ul class="timeline-3">
          <li v-for="item in sortedData" :key="item.id">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="d-flex align-items-center">
                <p class="mb-0 fs-14 me-2">{{ item.type }}</p>
                <p
                  class="mb-0 fs-12 bg-status1 rounded-pill text-white px-2"
                  v-if="+item.due > 0 && item.type === 'Invoice'"
                >
                  UNPAID
                </p>
                <p
                  class="mb-0 fs-12 bg-status1 rounded-pill text-white px-2"
                  v-else-if="+item.status <= 0 && item.type === 'Invoice'"
                >
                  PAID
                </p>
              </div>

              <p class="mb-0 fs-12">
                {{ formatDate(item.date) }}
              </p>
            </div>
            <router-link :to="`/${item.type === 'Invoice' ? 'invoiceoverview' : 'arlist'}/${item.id}`">
              <div class="card p-2">
                <div class="row align-items-center">
                  <div class="col-lg-3">
                    <p class="m-0 fs-12 font-weight-600">#ID:{{ item.id }}</p>
                  </div>

                  <div class="col-lg-5">
                    <p class="m-0 fs-12 font-weight-600">Project:{{ item.project }}</p>
                  </div>
                  <div class="col-lg-3">
                    <p class="m-0 fs-12 font-weight-600">
                      {{ parseFloat(item.amount).toFixed(2) }} {{ orgInfo.currency }}
                    </p>
                  </div>
                  <div class="col-lg-1">
                    <i class="fa-solid fa-chevron-right text-primary"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "CustomerTransaction",
  data() {
    return {
      Transactioninfo: [],
      Transactioninfo1: [],
      c_id: "",
    };
  },
  methods: {
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
    this.c_id = this.$route.params.id;
    const data = new FormData();
    data.append("c_id", this.c_id);
    fetch(`${process.env.VUE_APP_SERVER_URL}/getTransactionData`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.Transactioninfo = data.message;
      })
      .catch((err) => console.log(err.message));
  },

  computed: {
    ...mapState(["orgInfo"]),
    sortedData() {
      const result = this.Transactioninfo.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      return result;
    },
  },

  updated() {
    console.log(this.sortedData);
  },
};
</script>
