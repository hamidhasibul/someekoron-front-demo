<template>
  <div class="container-fluid">
    <div class="row ">


      <div class="col-lg-12 py-2">
        <div class="d-flex align-items-center">
          <p class="fs-16 font-weight-600 m-0">Vendor Transaction Record</p>
          <div class="month-button-trigger text-end button-blue rounded ms-3">
          <button class="month-button fs-13 dropdown-toggle" @click="showMonthPicker = !showMonthPicker">
            <i class="fa-regular fa-calendar me-1"></i>
            {{ currentMonth }}
          </button>
          <div class="month-picker" v-show="showMonthPicker">
            <div class="month-grid">
              <div class="month-grid-item" v-for="month in months" :key="month" @click="selectMonth(month, 1)">
                {{ month }}
              </div>
            </div>
          </div>
        </div>
        </div>
        
      </div>


      <div class="col-lg-12 px-0">
        <table class="table">
          <thead>
            <tr class="thead-color border  text-start">
              <th scope="col" class="border-0 ps-3 fs-13 text-muted  font-weight-600" width="10%">
                #SL
              </th>
              <th scope="col" class="border-0 fs-13 text-muted  font-weight-600" width="10%">
                Date
              </th>
              <th scope="col" class="border-0 fs-13 text-muted  font-weight-600" width="35%">
                Payment Description
              </th>
              <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="15%">
                Payable Amount
              </th>
              <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600" width="15%">
                Paid Amount
              </th>
              <th scope="col" class="border-0 fs-13 text-muted text-end font-weight-600 pe-5" width="15%">
                Due Balance
              </th>
            </tr>
          </thead>
          <tbody class="border-0 fs-12">
            <tr class="shadowItem text-start ">
              <td class=" ps-3 border-0">1</td>
              <td class="text-start border-0">{{ formatDate(openingBalanceDate) }}</td>
              <td class="text-start border-0">Opening Balance</td>
              <td class="text-end border-0">

              </td>
              <td class="text-end border-0">

              </td>
              <td class="border-0 text-end pe-5"> {{ isNaN(Transactionsinfo[0]?.payable) ? 0 :
                parseFloat(Transactionsinfo[0]?.paid) > 0 ?
                  parseFloat(Transactionsinfo[0]?.paid) + parseFloat(Transactionsinfo[0]?.due_balance) :
                  parseFloat(Transactionsinfo[0]?.due_balance) -
                  parseFloat(Transactionsinfo[0]?.payable) }}</td>
            </tr>
            <tr class="shadowItem text-start" v-for="(item, index) in Transactionsinfo" :key="index">
              <td class=" ps-3 border-0">{{ index + 2 }}</td>
              <td class="border-0">{{ formatDate(item.date) }}</td>
              <td class="border-0">{{ item.particular }}</td>
              <td class="border-0 text-end">
                {{ item.payable }}
              </td>
              <td class="border-0 text-end">
                {{ item.paid }}
              </td>
              <td class="border-0 text-end pe-5">
                {{ item.due_balance }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [" v_id "],
  name: "vendortransaction",
  data() {
    return {
      id: "",
      vendor: [],
      Transactionsinfo: [],
      balanceinfo: "",

      showMonthPicker: false,
      currentMonth: "This Month",
      months: [
        "Previous 3 Month",
        "Previous 6 Month",
        "This Month",
        "This Year",
      ],

    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    selectMonth(month, buttonNumber) {
      if (buttonNumber === 1) {
        this.currentMonth = month;
        this.showMonthPicker = false;
      }
    },
    // fetchData() {
    //   this.v_id = this.$route.params.id;
    //   const data = new FormData();
    //   data.append("v_id", this.v_id);
    //   data.append("duration", this.currentMonth);

    //   fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorTransactionData`, {
    //     method: "POST",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       this.Transactionsinfo = data.message;
    //       this.balanceinfo = data.balance;
    //       let balance = 0;
    //       this.Transactionsinfo.forEach((item) => {
    //         balance += item.debit - item.credit;
    //         item.balance = balance.toFixed(2); // Add a 'balance' property to each item
    //       });

    //     })
    //     .catch((err) => console.log(err.message));
    // },

    fetchData() {
      this.v_id = this.$route.params.id;
      const data = new FormData();
      data.append("v_id", this.v_id);
      data.append("duration", this.currentMonth);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorTransactionData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.Transactionsinfo = data.message;

        })
        .catch((err) => console.log(err.message));
    },
    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate(); // Get the day of the month
      const month = formatedDate.getMonth() + 1; // Month is zero-based, so add 1
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;

    },

  },


  watch: {
    currentMonth: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.fetchData();
          const date = new Date();
          if (this.currentMonth === 'Previous 3 Month') {
            this.openingBalanceDate.setMonth(date.getMonth() - 3);
          } else if (this.currentMonth === 'Previous 6 Month') {
            this.openingBalanceDate.setMonth(date.getMonth() - 6);
          } else if (this.currentMonth === 'This Month') {
            this.openingBalanceDate = new Date();
            this.openingBalanceDate.setDate(1);
          } else if (this.currentMonth === 'This Year') {
            this.openingBalanceDate.setMonth(0);
            this.openingBalanceDate.setDate(1);

          } else {
            return;
          }
        }
      },
    },
  }
};
</script>
<style></style>
