<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Make Payment Received</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-8 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Please carefully read and verify the following information before
              entering <b>Received Payment</b> into the software. <br />
              <span class="note-space"
                >This step is important to avoid potential delays or errors in
                processing your project.</span
              >
            </p>
          </div>

          <div class="col-lg-8">
            <div class="row p-2 mb-2">
              <div class="col-lg-3 mb-2">
                <label for="ar_id" class="form-label text-muted fs-13 fw-bold"
                  >AR ID<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="ar_id"
                  v-model="ar_id"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-3 mb-2">
                <label
                  for="createdate"
                  class="form-label text-muted fs-13 fw-bold"
                >
                  Date<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="createdate"
                  v-model="createdate"
                  type="date"
                  class="form-control rounded-0 fs-14 inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="in_id" class="form-label text-muted fs-13 fw-bold"
                  >Invoice ID<span class="fs-15 text-danger">*</span></label
                >
                <div class="dropdown">
                  <div
                    @click="toggleDropdown"
                    @custom-event="handleCustomEvent(selectedOption.in_id)"
                    class="border rounded form-select py-1"
                  >
                    {{
                      selectedOption
                        ? selectedOption.in_id
                        : "Select Invoice ID"
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
                      v-for="invoice in filteredOptions"
                      :key="invoice.id"
                      @click="selectOption(invoice)"
                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                    >
                      <span class="fs-14">{{ invoice.in_id }}</span
                      ><br />
                      <span class="fs-11">{{ invoice.org_name }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mb-2">
                <label
                  for="customer"
                  class="form-label text-muted fs-13 fw-bold"
                  >Customer<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="customer"
                  v-model="customer"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="project_name"
                  class="form-label text-muted fs-13 fw-bold"
                  >Project Name<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="project_name"
                  v-model="project_name"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="sp" class="form-label text-muted fs-13 fw-bold"
                  >Sales Person</label
                >
                <input
                  id="sp"
                  v-model="sp"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label class="form-label text-muted fs-13 fw-bold"
                  >Tax Deducted ?<span class="fs-15 text-danger">*</span>
                </label>
                <div class="d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      id="yes"
                      class="form-check-input"
                      type="radio"
                      name="resourceType"
                      value="yes"
                      v-model="taxOption"
                      @change="handleTaxOption"
                    />
                    <label for="yes" class="form-check-label fs-14">Yes </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      id="no"
                      class="form-check-input"
                      type="radio"
                      name="resourceType"
                      value="no"
                      v-model="taxOption"
                      @change="handleTaxOption"
                    />
                    <label for="no" class="form-check-label fs-14">No</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="col-lg-12">
            <div class="row px-2 my-2">
              <div class="col-lg-12 fs-14">
                <b>Invoice Details<span class="fs-15 text-danger">*</span></b>
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
                              Invoice Number
                            </th>
                            <th class="thead-color text-end w-15">
                              Invoice Amount
                            </th>
                            <th class="thead-color text-end w-15">
                              Tax/Vat Amount
                            </th>
                            <th class="thead-color text-end w-10">
                              Due Amount
                            </th>
                            <th class="thead-color text-end w-15">
                              Received Amount
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
                          <tr class="fs-13 text-center" v-if="in_id">
                            <td class="text-start">
                              {{ invoice_date.toString().slice(0, 10) }}
                            </td>
                            <td class="text-start border-start border-end">
                              {{ in_id }}
                            </td>
                            <td class="text-end border-start border-end">
                              {{ parseFloat(stAmount).toFixed(2) }}
                            </td>
                            <td class="text-end border-start border-end">
                              {{ parseFloat(tax).toFixed(2) }}
                            </td>
                            <td class="text-end border-start border-end">
                              {{ parseFloat(invoice_due).toFixed(2) }}
                            </td>
                            <td class="text-end border-start border-end py-1">
                              <input
                                v-model="received_amount"
                                class="form-control text-end shadow-none rounded-0 border-0 py-1"
                              />
                            </td>
                            <td class="text-end border-start border-end py-1">
                              <input
                                v-model="vat_amount"
                                class="form-control text-end shadow-none rounded-0 border-0 py-1"
                              />
                            </td>
                            <td class="text-end border-start border-end py-1">
                              <input
                                v-model="tax_amount"
                                class="form-control text-end shadow-none rounded-0 border-0 py-1"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="container">
                    <div class="row px-3">
                      <table>
                        <thead>
                          <tr>
                            <th
                              class="fs-12 py-2 font-weight-700 text-end w-90"
                            >
                              Receivable Amount ({{ orgInfo.currency }})
                            </th>
                            <td
                              class="fs-12 py-2 px-2 text-end w-20 text-muted"
                            >
                              {{ parseFloat(received_amount).toFixed(2) }}
                            </td>
                          </tr>
                          <tr>
                            <th
                              class="fs-12 py-2 font-weight-700 text-end w-90"
                            >
                              Receivable Vat Amount ({{ orgInfo.currency }})
                            </th>
                            <td
                              class="fs-12 py-2 px-2 text-end w-20 text-muted"
                            >
                              {{ parseFloat(vat_amount).toFixed(2) }}
                            </td>
                          </tr>
                          <tr>
                            <th
                              class="fs-12 py-2 font-weight-700 text-end w-90"
                            >
                              Tax Amount ({{ orgInfo.currency }})
                            </th>
                            <td
                              class="fs-12 py-2 px-2 text-end w-10 text-muted"
                            >
                              {{ parseFloat(tax_amount).toFixed(2) }}
                            </td>
                          </tr>
                          <tr>
                            <th
                              class="fs-12 py-2 font-weight-700 text-end w-90"
                            >
                              Due Amount ({{ orgInfo.currency }})
                            </th>
                            <td
                              class="fs-12 py-2 px-2 text-end w-10 text-danger"
                            >
                              {{
                                (
                                  invoice_due -
                                  received_amount -
                                  vat_amount -
                                  tax_amount
                                ).toFixed(2)
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
          <div class="col-lg-8">
            <div class="row p-2 mb-1">
              <div class="col-lg-6 mb-2">
                <label
                  for="reference"
                  class="form-label text-muted fs-13 fw-bold"
                  >Reference</label
                >
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
                  >Payment Mode<span class="fs-15 text-danger">*</span></label
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
                  <span v-else>Add PR</span>
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
import { customAlphabet } from "nanoid";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";
import router from "@/router";
export default {
  name: "Ar",
  components: { TopNav, SideBar, Footer },

  data() {
    return {
      searchQuery: "",
      searchQuery3: "",
      isDropdownOpen: false,
      searchResults: [],
      banklist: [],
      showDropdown: false,

      invoiceData: [],
      ar_id: 0,
      ar_receive: "",
      createdate: "",
      project_id: 0,
      project_name: "",
      org_name: "",

      in_id: "",
      org_id: "",
      tax: "",
      stAmount: "",
      itemID: "",
      reference: "",
      payment_mode: "",
      totalTax: "",
      sp: "",
      invoice_id: 0,

      customer: "",
      selectedBank: "",
      check: 0,

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

      invoice_items: [],

      subtotal: 0,
      subTotalPriceNew: 0,
      total: 0,
      taxAmount: 0,
      Vat: 0,
      adjustment: 0,
      totalTaxAmount: 0,

      // toast property
      loading: false,
      loadingTime: 2000,

      selectedOption: false,

      taxOption: false,

      payment: "",

      showSelectBankField: true,
      c_id: "",

      itemConditions: [
        localStorage.getItem("ar_id") === "",
        this.i_name === "",
        this.i_description === "",
        this.i_rate,
        this.i_qty,
        this.i_discount,
        this.i_tax,
        this.price,
      ],

      // Invoice detail States

      invoice_date: "",
      invoice_total_amount: "",
      invoice_due: 0,
      received_amount: 0,
      tax_amount: 0,
      vat_amount: 0,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  computed: {
    //invoice id search select
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
        return this.invoiceData;
      }

      const query = this.searchQuery.toLowerCase();
      return this.invoiceData.filter((invoice) =>
        invoice.in_id.toLowerCase().includes(query)
      );
    },

    filteredResults() {
      if (!this.searchQuery3) {
        return this.invoice_items;
      }
      const query = this.searchQuery3.toLowerCase();
      return this.invoice_items.filter((result) =>
        result.item.toLowerCase().includes(query)
      );
    },

    //itemlist calculations

    subTotalPrice() {
      this.subTotalPriceNew = this.item_array.reduce(
        (total, item) => total + +item.amount,
        0
      );
      return this.item_array.reduce((total, item) => total + +item.amount, 0);
    },

    totalTax() {
      this.totalTaxAmount = this.item_array.reduce(
        (total, item) => total + +item.taxAmount,
        0
      );
      return this.item_array.reduce(
        (total, item) => total + +item.taxAmount,
        0
      );
    },

    ...mapState(["userInfo"]),
    ...mapState(["createPrivilege"]),

    adjustedTotal() {
      return this.subTotalPriceNew + this.totalTaxAmount - this.adjustment;
    },
  },

  watch: {
    "selectedOption.in_id": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },
  },

  methods: {
    auth() {
      if (!this.createPrivilege.includes("accounts_receivable_list")) {
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
      this.toast.success("PR Added!", {
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
    search() {
      this.showDropdown = true;
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdown;
      if (!dropdownElement.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    handlepaymentmodeChange() {
      if (this.payment_mode === "option1") {
        this.showSelectBankField = false;
        this.payment = "";
      } else if (this.payment_mode === "option2") {
        this.showSelectBankField = true;
      }
    },

    addItem(e) {
      e.preventDefault();
      const newItem = {
        item: this.i_name,
        des: this.i_description,
        discount: this.i_discount,
        rate: this.i_rate,
        qty: this.i_qty,
        tax: this.i_tax,
        taxAmount: (this.price * this.i_tax) / 100,
        amount: this.price,
      };

      this.item_array.push(newItem);
      // New version of newObject

      // Reset input
      this.i_name = "";
      this.i_description = "";
      this.i_rate = "";
      this.i_qty = "";
      this.i_discount = "";
      this.i_tax = "";
      this.price = "";
    },

    deleteTask(index) {
      this.item_array.splice(index, 1);
    },

    // Item Search select
    search() {
      this.showDropdown = true;
    },
    selectResult(result) {
      console.log("Selected:", result.in_id);
      this.getInvoiceItemByID(result.id);

      this.searchQuery3 = result.item;
      this.showDropdown = false;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    selectOption(invoice) {
      this.selectedOption = invoice;
      this.isDropdownOpen = false;
    },

    getInvoiceItem(in_id) {
      const data = new FormData();

      data.append("in_id", in_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getInvoiceItems`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.invoice_items = res.message;

          console.log(res.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getInvoiceItemByID(id) {
      const data = new FormData();

      data.append("id", id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getInvoiceItembyID`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message[0]);
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

    // invoice id dropdown
    handleSelectedOptionChange(value) {
      console.log("Selected Option changed:", value);
      const data = new FormData();
      data.append("in_id", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getInvoiceAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message[0]);
          this.project_id = res.message[0].project_id;
          this.project_name = res.message[0].project_name;
          this.customer = res.message[0].org_name;
          this.sp = res.message[0].sales_person;
          this.in_id = res.message[0].in_id;
          this.c_id = res.message[0].c_id;
          this.invoice_date = res.message[0].create_date;
          this.invoice_total_amount = res.message[0].t_amount;
          this.invoice_due = res.message[0].due;
          this.tax = res.message[0].t_tax;
          this.stAmount = res.message[0].st_amount;
          this.getInvoiceItem(res.message[0].in_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitHandler() {
      this.submitAR();
    },

    submitAR() {
      if (
        this.ar_id == "" ||
        this.createdate == "" ||
        this.in_id == "" ||
        this.customer == "" ||
        this.project_name == "" ||
        this.taxOption == "" ||
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
      console.log(this.b_id);

      const data = new FormData();

      data.append("preceipt_id", this.ar_id);
      data.append("c_id", this.c_id);
      data.append("cdate", this.createdate);
      data.append("in_id", this.in_id);
      data.append("org_name", this.customer);
      data.append("project_id", this.project_id);
      data.append("project_name", this.project_name);
      data.append("sales_person", this.sp);
      data.append("t_status", this.taxOption);
      data.append("p_mode", this.payment_mode);
      data.append("reference", this.reference);
      data.append("bname", this.bank_name);
      data.append("bank_ID", this.b_id);
      data.append("check_no", this.check);
      data.append("st_amount", this.received_amount);
      data.append("tax_amount", this.tax_amount);
      data.append("adjustment", "");
      data.append("t_tax", this.vat_amount);
      data.append(
        "due",
        +this.invoice_due -
          +this.received_amount -
          +this.vat_amount -
          +this.tax_amount
      );
      data.append(
        "t_amount",
        +this.received_amount + +this.vat_amount + +this.tax_amount
      );
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addPReceipt`, {
        method: "POST",

        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);

          if (res.message === true) {
            this.loading = false;
            this.submitARItem();
            if (this.payment_mode === "bank") {
              this.bankTransactionProcess();
            }
            this.successMsg();
            router.push(`/arlist/${this.ar_id}`);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    bankTransactionProcess() {
      const data = new FormData();
      data.append("b_id", this.b_id);
      data.append("date", this.createdate);
      data.append(
        "particular",
        `PayID- ${this.ar_id}, Project Name- ${this.project_name}`
      );
      data.append("debit", "0");
      data.append("payID", this.ar_id);
      data.append(
        "credit",
        +this.received_amount + +this.vat_amount + +this.tax_amount
      );
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

    updateInvoice() {
      const data = new FormData();

      data.append("in_id", this.in_id);
      data.append(
        "due",
        this.invoice_due -
          this.received_amount -
          this.vat_amount -
          this.tax_amount
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateInvoiceDue`, {
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

    submitARItem() {
      const data = new FormData();

      data.append("preceipt_id", this.ar_id);
      data.append("date", this.invoice_date);
      data.append("invoice_no", this.in_id);
      data.append("invoice_amount", this.invoice_total_amount);
      data.append("vat_amount", this.vat_amount);
      data.append("rcv_amount", this.received_amount);
      data.append("tax_amount", this.tax_amount);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addPReceiptItem`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.updateInvoice();
          localStorage.removeItem("ar_id");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // updateVatTax() {
    //   const data = new FormData();
    //   data.append("in_id", localStorage.getItem("in_id"));
    //   data.append("vatandtax", this.totalTaxAmount);
    //   data.append("tamount", this.subTotalPriceNew + this.totalTaxAmount);

    //   fetch(
    //     `${process.env.VUE_APP_SERVER_URL}/addQuotationVatTax`,
    //     {
    //       method: "POST",
    //       body: data,
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    deleteTask(index) {
      this.item_array.splice(index, 1);
    },

    calculatePrice() {
      const qty = parseFloat(this.i_qty) || 0;
      const rate = parseFloat(this.i_rate) || 0;
      const discount = parseFloat(this.i_discount) || 0;

      const amount = qty * rate;
      const discountAmount = (discount / 100) * amount;

      this.discountAmount = discountAmount;

      this.price = amount - discountAmount;
    },

    generateARID() {
      // const date = new Date();
      // const year = String(date.getFullYear()).slice(-2);
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const timestamp = String(date.getTime()).slice(-5);
      // this.ar_id = `PR${year}${month}${day}${timestamp}`;

      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getReceivableLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.ar_id = `PR${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },
  },
  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getInvoiceData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.invoiceData = data.message;
      })
      .catch((err) => console.log(err.message));

    this.generateARID();
    this.bank();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style></style>
