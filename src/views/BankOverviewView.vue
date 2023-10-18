<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right scroll-content">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-12">
            <p class="mb-0 text-color fs-20">Bank Overview</p>
          </div>
        </div>
        <div class="row h-100">
          <div class="col-lg-4 border-end p-0">
            <div class="p-3 pb-0">
              <div class="d-flex justify-content-between">
                <div class="">
                  <p class="fs-16 font-weight-600">
                    {{ bankData.bank_name }}
                  </p>
                </div>
                <div class="">
                  <p class="mb-0 px-0" style="color: rgb(116, 116, 116)">
                    <i
                      class="fa-solid fa-pen-to-square"
                      :data-bs-toggle="'modal'"
                      :data-bs-target="'#stock_update_'"
                      style="cursor: pointer"
                    ></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="px-3 pt-2 pb-3 bg-light">
              <div>
                <p class="fs-12 font-weight-600 mb-0">
                  {{ bankData.branch_name }}
                </p>
                <!-- <p class="fs-12 mb-0">Opening Balance: {{ bankData.o_balance }}</p> -->
                <p class="fs-12 mb-0">
                  Account Number: {{ bankData.acc_number }}
                </p>
                <p class="fs-12 mb-0">
                  Routing Number: {{ bankData.routing_number }}
                </p>
              </div>
              <div>
                <!-- Modal Edit -->
                <div
                  class="modal fade"
                  :id="'stock_update_'"
                  tabindex="-1"
                  :aria-labelledby="'stock_update_label_'"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-custom modal-xl">
                    <div class="modal-content modal-content-custom">
                      <div
                        class="d-flex align-items-center p-2 py-3 border-bottom"
                      >
                        <img
                          src="../assets/image/updated.png"
                          class="update-icon me-2"
                          alt=""
                          srcset=""
                        />

                        <p
                          class="fs-16 m-0 font-weight-600"
                          id="'stock_update_label_' + bankData.b_id"
                        >
                          Update Bank
                        </p>
                      </div>
                      <div class="modal-body">
                        <div class="row text-start">
                          <div class="col-lg-12 mb-3">
                            <p class="mb-0 fs-12">
                              <span class="text-primary font-weight-600"
                                >*Note:</span
                              >
                              Please carefully read and check the following
                              information before updating stock in the system.
                              May result in delays or errors in processing your
                              project.
                            </p>
                          </div>

                          <div class="col-lg-6">
                            <div class="row">
                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Bank Name</p>
                              </div>
                              <div class="col-lg-9">
                                <p
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                >
                                  {{ bankData.bank_name }}
                                </p>
                              </div>

                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Branch Name</p>
                              </div>
                              <div class="col-lg-9">
                                <input
                                  v-model="bankData.branch_name"
                                  type="text"
                                  class="form-control rounded-0 border-muted shadow-none inputa"
                                />
                              </div>

                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Balance</p>
                              </div>
                              <div class="col-lg-9">
                                <p
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                >
                                  {{ bankData.o_balance }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="row">
                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Routing No.</p>
                              </div>
                              <div class="col-lg-9">
                                <input
                                  v-model="bankData.routing_number"
                                  type="number"
                                  class="form-control rounded-0 border-muted shadow-none inputa"
                                />
                              </div>

                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Account Number</p>
                              </div>
                              <div class="col-lg-9">
                                <input
                                  v-model="bankData.acc_number"
                                  type="number"
                                  class="form-control rounded-0 border-muted shadow-none inputa"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn close-button"
                          data-bs-dismiss="modal"
                        >
                          <i class="fa-regular fa-circle-xmark me-1"></i>
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn action-button"
                          data-bs-dismiss="modal"
                          @click="
                            updateBank(
                              bankData.b_id,
                              bankData.branch_name,
                              bankData.acc_number,
                              bankData.routing_number
                            )
                          "
                        >
                          {{ loading ? "Loading" : "Update changes" }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="d-flex py-2 align-items-center">
              <div class="me-3">
                <p class="mb-0 text-color fs-16">Bank Transactions</p>
              </div>
              <div class="">
                <div class="month-button-trigger button-blue rounded text-end">
                  <button
                    class="month-button fs-13 dropdown-toggle"
                    @click="showMonthPicker = !showMonthPicker"
                  >
                    <i class="fa-regular fa-calendar me-1"></i>
                    {{ currentMonth }}
                  </button>
                  <div class="month-picker" v-show="showMonthPicker">
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
              </div>
            </div>

            <div class="row pb-3">
              <div class="col-lg-12 px-0">
                <table class="table">
                  <thead>
                    <tr class="thead-color border-bottom border-top">
                      <th
                        scope="col"
                        class="border-0 fs-13 text-muted text-center font-weight-600"
                      >
                        #SL
                      </th>
                      <th
                        scope="col"
                        class="border-0 fs-13 text-muted text-start font-weight-600"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="border-0 fs-13 text-muted text-start font-weight-600"
                      >
                        Particular
                      </th>
                      <!-- <th
                    scope="col"
                    class="border-0 fs-13 text-muted text-center font-weight-600"
                  >
                    Payee
                  </th> -->
                      <th
                        scope="col"
                        class="border-0 fs-13 text-muted text-end font-weight-600"
                      >
                        Debit
                      </th>
                      <th
                        scope="col"
                        class="border-0 fs-13 text-muted text-end font-weight-600"
                      >
                        Credit
                      </th>
                      <th
                        scope="col"
                        class="border-0 fs-13 text-muted text-end font-weight-600 pe-5"
                      >
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody class="border-0 fs-12">
                    <tr class="shadowItem text-center">
                      <td class="border-0">1</td>
                      <td class="text-start border-0">
                        {{ formatDate(openingBalanceDate) }}
                      </td>
                      <td class="text-start border-0">Opening Balance</td>
                      <td class="text-end border-0"></td>
                      <td class="text-end border-0"></td>
                      <td class="border-0 text-end pe-5">
                        {{
                          isNaN(Transactionsinfo[0]?.debit)
                            ? 0
                            : parseFloat(Transactionsinfo[0]?.debit) > 0
                            ? parseFloat(Transactionsinfo[0]?.debit) +
                              parseFloat(Transactionsinfo[0]?.balance)
                            : parseFloat(Transactionsinfo[0]?.balance) -
                              parseFloat(Transactionsinfo[0]?.credit)
                        }}
                      </td>
                    </tr>

                    <tr
                      class="shadowItem text-center"
                      v-for="(item, index) in Transactionsinfo"
                      :key="index"
                    >
                      <td class="border-0">{{ index + 2 }}</td>
                      <td class="text-start border-0">
                        {{ formatDate(item.date) }}
                      </td>
                      <td class="text-start border-0">{{ item.particular }}</td>
                      <td class="text-end border-0">
                        {{ item.debit }}
                      </td>
                      <td class="text-end border-0">
                        {{ item.credit }}
                      </td>
                      <td class="border-0 text-end pe-5">{{ item.balance }}</td>
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
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";

export default {
  props: ["b_id"],
  name: "bankoverview",
  components: { TopNav, SideBar },
  data() {
    return {
      id: "",
      b_id: "",
      bank: [],
      bankData: [],
      Transactionsinfo: [],
      BankBanlance: [],

      showMonthPicker: false,

      currentMonth: "This Month",
      months: [
        "Previous 3 Month",
        "Previous 6 Month",
        "This Month",
        "This Year",
      ],
      openingBalanceDate: new Date(),
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    // update button

    updateBank(id, branch_name, accountNo, routingNo) {
      if (id == "" || accountNo == "" || routingNo == "") {
        this.warningMsg("Add All Required Information");
        return false;
      }

      this.loading = true;
      const data = new FormData();

      data.append("id", id);
      data.append("acc_number", accountNo);
      data.append("branch_name", branch_name);
      data.append("routing_number", routingNo);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UpdateBankInfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.toast.success("Successfully Updated!", {
                position: "top-center",
                timeout: 2000,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: false,
                icon: true,
                rtl: false,
              });

              this.update = this.update + 1;
            }, 1000);
          } else {
            this.errMsg();
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    selectMonth(month, buttonNumber) {
      if (buttonNumber === 1) {
        this.currentMonth = month;
        this.showMonthPicker = false;
      }
    },
    getBankData() {
      this.b_id = this.$route.params.id;
      const data = new FormData();
      data.append("b_id", this.b_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getBankDataByID`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.bankData = data.message[0];
          console.log(data.message);
        })
        .catch((err) => console.log(err.message));
    },
    fetchData() {
      this.b_id = this.$route.params.id;
      const data = new FormData();
      data.append("b_id", this.b_id);
      data.append("duration", this.currentMonth);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getBankTransactionData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.Transactionsinfo = data.message;
          console.log(this.Transactionsinfo);
        })
        .catch((err) => console.log(err.message));
      // this.bankbalance();
    },
    bankbalance() {
      this.b_id = this.$route.params.id;
      const data = new FormData();
      data.append("b_id", this.b_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getBankbalanceData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.BankBanlance = data.message;
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
  mounted() {
    const id = localStorage.getItem("userID");
    this.$store.dispatch("fetchUserInfo");
    // await
    this.fetchData();
    this.getBankData();
  },

  watch: {
    currentMonth: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.fetchData();
          const date = new Date();
          if (this.currentMonth === "Previous 3 Month") {
            this.openingBalanceDate.setMonth(date.getMonth() - 3);
          } else if (this.currentMonth === "Previous 6 Month") {
            this.openingBalanceDate.setMonth(date.getMonth() - 6);
          } else if (this.currentMonth === "This Month") {
            this.openingBalanceDate = new Date();
            this.openingBalanceDate.setDate(1);
          } else if (this.currentMonth === "This Year") {
            this.openingBalanceDate.setMonth(0);
            this.openingBalanceDate.setDate(1);
          } else {
            return;
          }
        }
      },
    },
  },
};
</script>
<style></style>
