<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Make Payment</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-8 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Before <b>Making a Payment</b> in the software, please take the
              time to carefully read and verify the following information.
              <br />
              <span class="note-space"
                >Neglecting this step could lead to delays or errors in
                processing your project.</span
              >
            </p>
          </div>
          <div class="col-lg-8">
            <div class="row p-2 mb-3">
              <div class="col-lg-3 mb-2">
                <label class="form-label text-muted fs-13 fw-bold"
                  >Payment ID<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="ap_id"
                  v-model="ap_id"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-3 mb-2">
                <label
                  for="input_date"
                  class="form-label text-muted fs-13 fw-bold"
                  >Payment Date <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="input_date"
                  v-model="input_date"
                  type="date"
                  class="form-control rounded-0 fs-14 inputa"
                />
              </div>
              <!-- AR section 1 -->

              <div class="col-lg-6 mb-2">
                <label for="bill_id" class="form-label text-muted fs-13 fw-bold"
                  >Bill ID <span class="fs-15 text-danger">*</span></label
                >
                <div class="dropdown">
                  <div
                    @click="toggleDropdown"
                    @custom-event="handleCustomEvent(selectedOption.bill_id)"
                    class="border rounded form-select py-1"
                  >
                    {{
                      selectedOption ? selectedOption.bill_id : "Select Bill ID"
                    }}
                  </div>

                  <div
                    v-show="isDropdownOpen"
                    class="position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                  >
                    <input
                      type="text"
                      v-model="searchQuery"
                      placeholder="Search..."
                      class="dropdown-search"
                    />

                    <p
                      v-for="payable in filteredOptions"
                      :key="payable.id"
                      @click="selectOption(payable)"
                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                    >
                      <span class="fs-14">{{ payable.bill_id }}</span
                      ><br />
                      <span class="fs-11">{{ payable.vname }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <label for="vname" class="form-label text-muted fs-13 fw-bold"
                  >Vendor Name <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="vname"
                  v-model="vname"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="pr_name" class="form-label text-muted fs-13 fw-bold"
                  >Project directory
                  <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="pr_name"
                  v-model="pr_name"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>
              <div class="col-lg-6 mb-2">
                <label class="form-label text-muted fs-13 fw-bold"
                  >Tax Preference ? <span class="fs-15 text-danger">*</span>
                </label>
                <div class="d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      id="inclusive"
                      class="form-check-input"
                      type="radio"
                      name="resourceType"
                      value="inclusive"
                      v-model="taxOption"
                      @change="handleTaxOption"
                    />
                    <label for="inclusive" class="form-check-label fs-14"
                      >Inclusive</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      id="exclusive"
                      class="form-check-input"
                      type="radio"
                      name="resourceType"
                      value="exclusive"
                      v-model="taxOption"
                      @change="handleTaxOption"
                    />
                    <label for="exclusive" class="form-check-label fs-14"
                      >Exclusive</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div class="col-lg-12">
            <div class="row px-2">
              <div class="col-lg-12 fs-14">
                <b>Item List <span class="fs-15 text-danger">*</span></b>
              </div>

              <div class="col-lg-12 mt-2">
                <div class="bg-white border">
                  <div class="container">
                    <div class="row">
                      <table class="table">
                        <thead class="fs-13 font-family font-weight-600">
                          <tr class="text-center">
                            <th class="thead-color text-start w-10">Date</th>
                            <th class="thead-color text-start w-15">
                              Bill Number
                            </th>
                            <th class="thead-color text-end w-10">
                              Bill Amount
                            </th>
                            <th class="thead-color text-end w-15">
                              Tax/Vat Amount
                            </th>
                            <th class="thead-color text-end w-15">
                              Due Amount
                            </th>
                            <th class="thead-color text-end w-15">
                              Paid Amount
                            </th>
                            <th class="thead-color text-end w-10">
                              Vat Amount
                            </th>
                            <th class="thead-color text-end w-10">
                              Tax Amount
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr class="fs-13 text-center" v-if="bill_id">
                            <td class="text-start">
                              {{ payment_date.slice(0, 10) }}
                            </td>
                            <td class="text-start">{{ bill_id }}</td>

                            <td class="text-end">{{ payable_amount }}</td>
                            <td class="text-end">{{ tax }}</td>
                            <td class="text-end">{{ payment_due }}</td>
                            <td class="text-end border-start border-end py-1">
                              <input
                                v-model="paid_amount"
                                class="form-control text-end shadow-none rounded-0 border-0 py-1"
                              />
                            </td>
                            <td class="text-end border-start py-1">
                              <input
                                v-model="vat_amount"
                                class="form-control text-end shadow-none rounded-0 border-0 py-1"
                              />
                            </td>
                            <td class="text-end border-start py-1">
                              <input
                                v-model="tax_amount"
                                class="form-control text-end shadow-none rounded-0 border-0 py-1"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="container">
                      <div class="row px-3">
                        <table>
                          <thead>
                            <tr>
                              <th
                                class="fs-12 py-2 font-weight-700 text-end w-90"
                              >
                                Payable Amount ({{ orgInfo.currency }})
                              </th>
                              <td
                                class="fs-12 py-2 px-2 text-end w-20 text-muted"
                              >
                                {{ paid_amount }}
                              </td>
                            </tr>
                            <tr>
                              <th
                                class="fs-12 py-2 font-weight-700 text-end w-90"
                              >
                                Payable Vat Amount ({{ orgInfo.currency }})
                              </th>
                              <td
                                class="fs-12 py-2 px-2 text-end w-20 text-muted"
                              >
                                {{ vat_amount }}
                              </td>
                            </tr>
                            <tr>
                              <th
                                class="fs-12 py-2 font-weight-700 text-end w-90"
                              >
                                Payable Tax Amount ({{ orgInfo.currency }})
                              </th>
                              <td
                                class="fs-12 py-2 px-2 text-end w-20 text-muted"
                              >
                                {{ tax_amount }}
                              </td>
                            </tr>
                            <tr>
                              <th
                                class="fs-12 py-2 font-weight-700 text-end w-90"
                              >
                                Due Amount
                              </th>
                              <td
                                class="fs-12 py-2 px-2 text-end w-20 text-danger"
                              >
                                {{
                                  payment_due -
                                  paid_amount -
                                  vat_amount -
                                  tax_amount
                                }}
                              </td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="row p-2 mb-1">
              <div class="col-lg-6 mb-2">
                <label
                  for="reference"
                  class="form-label text-muted fs-13 fw-bold"
                  >Reference
                </label>
                <input
                  id="reference"
                  v-model="reference"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="payment_mode"
                  class="form-label text-muted fs-13 fw-bold"
                  >Payment Mode <span class="fs-15 text-danger">*</span></label
                >
                <select
                  v-model="payment_mode"
                  class="form-select shadow-none rounded-0 border-muted py-1"
                  @change="handlepaymentmodeChange"
                >
                  <option value="cash" id="cash">Cash</option>
                  <option value="bank" id="bank">Bank</option>
                  <option value="check" id="check">Cheque</option>
                </select>
              </div>

              <div class="col-lg-6 mb-2" v-if="payment_mode === 'bank'">
                <label
                  for="bank_name"
                  class="form-label text-muted fs-13 fw-bold"
                  >Select Bank</label
                >
                <select
                  v-model="selectedBank"
                  class="form-select shadow-none rounded-0 border-muted py-1"
                >
                  <option value="" disabled>Select bank</option>
                  <option
                    v-for="bank in banklist"
                    :key="bank.b_id"
                    :value="bank.b_id"
                  >
                    {{ bank.bank_name }} ({{ bank.branch_name }})
                  </option>
                </select>
              </div>

              <div class="col-lg-6 mb-2" v-if="payment_mode === 'check'">
                <label for="check" class="form-label text-muted fs-13 fw-bold"
                  >Cheque No.</label
                >
                <input
                  v-model="check"
                  class="form-control shadow-none rounded-0 border-muted py-1"
                />
              </div>
            </div>
          </div>

          <hr />
          <div class="col-lg-12 mt-4 mb-3">
            <div class="row px-2">
              <div class="col-lg-3">
                <button
                  @click="submitHandler"
                  class="border-0 w-100 action-button py-1"
                  :disabled="loading"
                >
                  <span v-if="loading">Loading...</span>
                  <span v-else>Make Payment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";
import router from "@/router";
export default {
  name: "makepayment",
  components: { TopNav, SideBar, Footer },

  data() {
    return {
      ap_id: 0,
      searchQuery: "",
      searchQuery3: "",
      isDropdownOpen: false,
      showDropdown: false,
      searchResults: [],
      bill_id: "",
      input_date: 0,
      pay_type: "",
      bankselect: "1",
      pay_mode: "",
      invoice_no: 0,
      amount: 0,
      reference: "",
      payment_mode: "",
      selectedBank: "",
      check: 0,

      payableData: [],
      ap_pay: "",
      createdate: "",
      project_id: 0,
      project_name: "",
      org_name: "",
      v_id: "",
      vname: "",
      pr_name: "",

      // toast property
      loading: false,
      loadingTime: 1000,

      selectedOption: 0,
      subtotal: 0,
      subTotalPriceNew: 0,
      total: 0,
      taxAmount: 0,
      Vat: 0,
      adjustment: 0,
      totalTaxAmount: 0,
      taxOption: false,

      item_array: [],
      i_id: "",
      i_name: "",
      i_description: "",
      i_discount: 0,
      i_rate: 0,
      i_qty: 0,
      tax: 0,
      price: 0,
      i_tax: 0,

      bill_items: [],
      itemConditions: [
        this.i_name === "",
        this.i_description === "",
        this.i_discount,
        this.i_rate,
        this.i_qty,
        this.i_tax,
        this.price,
      ],

      // PO states

      payment_date: "",
      payment_total_amount: "",
      payable_amount: "",
      tax: "",
      payment_due: 0,
      paid_amount: 0,
      vat_amount: 0,
      tax_amount: 0,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  computed: {
    ...mapState(["orgInfo"]),

    bank_name() {
      const selectedBankObj = this.banklist.find(
        (bank) => bank.b_id === this.selectedBank
      );
      return selectedBankObj ? selectedBankObj.bank_name : "";
    },
    b_id() {
      return this.selectedBank;
    },

    filteredOptions() {
      if (!this.searchQuery) {
        return this.payableData;
      }

      const query = this.searchQuery.toLowerCase();
      return this.payableData.filter((payable) =>
        payable.bill_id.toLowerCase().includes(query)
      );
    },

    filteredResults() {
      if (!this.searchQuery3) {
        return this.bill_items;
      }
      const query = this.searchQuery3.toLowerCase();
      return this.bill_items.filter((result) =>
        result.item.toLowerCase().includes(query)
      );
    },

    subTotalPrice() {
      this.subTotalPriceNew = this.item_array.reduce(
        (total, item) => total + +item.amount,
        0
      );
      return this.item_array.reduce((total, item) => total + +item.amount, 0);
    },

    totalTax() {
      this.totalTaxAmount = this.item_array.reduce(
        (total, item) => total + item.taxAmount,
        0
      );
      return this.item_array.reduce((total, item) => total + item.taxAmount, 0);
    },

    ...mapState(["userInfo"]),
    ...mapState(["createPrivilege"]),

    adjustedTotal() {
      return this.subTotalPriceNew + this.totalTaxAmount - this.adjustment;
    },
  },

  watch: {
    "selectedOption.bill_id": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },
  },

  methods: {
    auth() {
      if (!this.createPrivilege.includes("makepaylist")) {
        this.$router.push("/dashboard");
      }
    },
    errMsg() {
      this.loading = false;

      this.toast.error("Something went wrong!!", {
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
    },

    successMsg() {
      this.toast.success("Payment Added!", {
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
    },

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },

    bank() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getBankData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.banklist = res.message;

          console.log(res.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItem(e) {
      e.preventDefault();
      /* if (
        (this.bill_id === "",
        this.i_name === "" ||
          this.i_description === "" ||
          this.i_discount === "" ||
          this.i_rate === "" ||
          this.i_qty === "" ||
          this.i_tax === "" ||
          this.price === "")
      ) {
        return false;
      } */

      const newObject = {
        bill_id: localStorage.getItem("bill_id"),
        item: this.i_name,
        des: this.i_description,
        discount: this.i_discount,
        rate: this.i_rate,
        qty: this.i_qty,
        tax: this.i_tax,
        taxAmount: (this.price * this.i_tax) / 100,
        amount: this.price,
      };

      this.item_array = [...this.item_array, newObject];

      this.i_name = "";
      this.i_description = "";
      this.i_discount = 0;
      this.i_rate = 0;
      this.i_qty = 0;
      this.i_tax = 0;
      this.price = 0;
    },

    search() {
      this.showDropdown = true;
    },

    /* handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdown;
      if (!dropdownElement.contains(event.target)) {
        this.showDropdown = false;
      }
    }, */

    handleTaxOption() {
      console.log(this.taxOption);
    },

    handlepaymentmodeChange() {
      if (this.payment_mode === "option1") {
        this.showSelectBankField = false;
        this.payment = "";
      } else if (this.payment_mode === "option2") {
        this.showSelectBankField = true;
      }
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    selectOption(payable) {
      this.selectedOption = payable;
      this.isDropdownOpen = false;
    },

    selectResult(result) {
      console.log("Selected:", result.bill_id);
      this.getPOItemByID(result.id);

      this.searchQuery3 = result.item;
      this.showDropdown = false;
    },

    getPOItem(bill_id) {
      const data = new FormData();

      data.append("bill_id", bill_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPayableItems`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.bill_items = res.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPOItemByID(id) {
      const data = new FormData();

      data.append("id", id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPayableItembyID`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.i_name = res.message[0].item;
          this.i_description = res.message[0].des;
          this.i_rate = res.message[0].rate;
          this.i_qty = res.message[0].qty;
          this.i_discount = res.message[0].discount;
          this.i_tax = res.message[0].tax;
          this.price = res.message[0].amount;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleSelectedOptionChange(value) {
      console.log("Selected Option changed:", value);
      const data = new FormData();
      data.append("bill_id", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPayableAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.bill_id = value;
          this.pr_id = res.message[0].p_id;
          this.pr_name = res.message[0].project_name;
          this.v_id = res.message[0].v_id;
          this.vname = res.message[0].vname;
          this.bill_id = res.message[0].bill_id;
          this.payment_date = res.message[0].cdate;
          this.payable_amount = res.message[0].st_amount;
          this.payment_total_amount = res.message[0].t_amount;
          this.tax = res.message[0].t_tax;
          this.payment_due = res.message[0].due;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    bankTransactionProcess() {
      const data = new FormData();
      data.append("b_id", this.b_id);
      data.append("date", this.input_date);
      data.append(
        "particular",
        `PayID- ${this.ap_id}, Project Name- ${this.pr_name}`
      );
      data.append(
        "debit",
        +this.paid_amount + +this.vat_amount + +this.tax_amount
      );
      data.append("credit", "0");
      data.append("payID", this.ap_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/bankTransactionProcess`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    vendorTransactionProcess() {
      const data = new FormData();
      data.append("v_id", this.v_id);
      data.append("date", this.input_date);
      data.append("payID", this.ap_id);
      data.append(
        "particular",
        `PayID- ${this.ap_id}, Project Name- ${this.pr_name}`
      );
      data.append("payable", "0");
      data.append(
        "paid",
        +this.paid_amount + +this.vat_amount + +this.tax_amount
      );
      fetch(`${process.env.VUE_APP_SERVER_URL}/vendorTransactionProcess`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async submitAP() {
      if (
        this.ap_id == "" ||
        this.input_date == "" ||
        this.bill_id == "" ||
        this.vname == "" ||
        this.pr_name == "" ||
        this.taxOption == "" ||
        // this.item_array.length == 0 ||
        this.payment_mode == ""
      ) {
        this.toast.warning("Add All Required Information", {
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
        return false;
      }

      if (this.payment_mode === "bank") {
        if (this.b_id === "") {
          this.toast.warning("Bank Information Required", {
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
          return false;
        }
      } else if (this.payment_mode === "check") {
        if (this.check === "") {
          this.toast.warning("Check Number Required", {
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
          return false;
        }
      } else this.loading = true;

      const data = new FormData();

      data.append("pay_id", this.ap_id);
      data.append("cdate", this.input_date);
      data.append("bill_id", this.bill_id);
      data.append("vname", this.vname);
      data.append("project_name", this.pr_name);
      data.append("t_status", this.taxOption);
      data.append("p_mode", this.payment_mode);
      data.append("v_id", this.v_id);
      data.append("reference", this.reference);
      data.append("bname", this.bank_name);
      data.append("bank_ID", this.b_id);
      data.append("check_no", this.check);
      data.append("st_amount", this.paid_amount);
      data.append("adjustment", "");
      data.append("t_tax", this.vat_amount);
      data.append("tax_amount", this.tax_amount);
      data.append(
        "due",
        +this.payment_due -
          +this.paid_amount -
          +this.vat_amount -
          +this.tax_amount
      );
      data.append(
        "t_amount",
        +this.paid_amount + +this.vat_amount + +this.tax_amount
      );

      data.append("user", this.userInfo.username);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/addPaidBill`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        if (res.message === true) {
          this.submitAPItem();
          this.bankTransactionProcess();
          this.vendorTransactionProcess();
          this.updateBill();
          setTimeout(() => {
            this.loading = false;
            this.successMsg();
            router.push(`/makepayoverview/${this.ap_id}`);

            this.ap_id = "";
            this.input_date = "";
            this.vname = "";
            this.bill_id = "";
            this.pr_name = "";
            this.taxOption = "";
            this.reference = "";
            this.payment_mode = "";
          }, this.loadingTime);
        } else {
          this.errMsg();
        }
      } catch (error) {
        console.error(error);
      }

      /* fetch(`${process.env.VUE_APP_SERVER_URL}/addPaidBill`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          localStorage.setItem("bill_id", this.bill_id);

          if (res.message == true) {
            this.submitAPItem();
          }

          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg();

              this.ap_id = "";
              this.input_date = "";
              this.vname = "";
              this.bill_id = "";
              this.pr_name = "";
              this.taxOption = "";
              this.reference = "";
              this.payment_mode = "";
            }, this.loadingTime);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.log(error);
        }); */
    },

    updateBill() {
      const data = new FormData();

      data.append("bill_id", this.bill_id);
      data.append(
        "due",
        +this.payment_due - this.paid_amount - this.vat_amount - this.tax_amount
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateBillDue`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitHandler() {
      // this.submitAPItem();
      this.submitAP();
    },

    submitAPItem() {
      const data = new FormData();

      data.append("pay_id", this.ap_id);
      data.append("date", this.payment_date);
      data.append("bill_no", this.bill_id);
      data.append("bill_amount", this.payment_total_amount);
      data.append("rcv_amount", this.paid_amount);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addPBItem`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTask(index) {
      this.item_array.splice(index, 1);
    },

    calculatePrice() {
      const qty = parseFloat(this.i_qty) || 0;
      const rate = parseFloat(this.i_rate) || 0;
      const amount = qty * rate;
      this.price = amount;
    },

    generatePaymentID() {
      // const date = new Date();
      // const year = String(date.getFullYear()).slice(-2);
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const timestamp = String(date.getTime()).slice(-5);
      // this.ap_id = `AP${year}${month}${day}${timestamp}`;

      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPaymentLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.ap_id = `AP${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },
  },
  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getPayableData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.payableData = data.message;
        console.log(data.message);
      })
      .catch((err) => console.log(err.message));

    document.addEventListener("click", this.handleClickOutside);
    this.generatePaymentID();
    this.bank();

    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>
<style></style>
