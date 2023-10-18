<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Invoice Generate</p>
          </div>
        </div>
        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Please carefully review the following information before
              generating an <b>invoice</b> in the software. <br /><span
                class="note-space"
              >
                Failure to do so may result in delays or errors in processing
                your project.
              </span>
            </p>
          </div>
          <div class="p-3 ps-4">
            <div class="row w-75">
              <div class="col-lg-6 mb-2">
                <label for="in_id" class="form-label text-muted fs-13 fw-bold">
                  Invoice Number<span class="fs-15 text-danger">*</span>
                </label>
                <input
                  id="in_id"
                  v-model="in_id"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-3 mb-2">
                <label
                  for="create_date"
                  class="form-label text-muted fs-13 fw-bold"
                  >Create Date<span class="fs-15 text-danger">*</span>
                </label>
                <input
                  id="create_date"
                  v-model="create_date"
                  type="date"
                  class="form-control rounded-0 fs-14 inputa"
                />
              </div>
              <div class="col-lg-3 mb-2">
                <label
                  for="due_date"
                  class="form-label text-muted fs-13 fw-bold"
                  >Due Date<span class="fs-15 text-danger">*</span>
                </label>
                <input
                  id="due_date"
                  v-model="due_date"
                  type="date"
                  class="form-control rounded-0 fs-14 inputa"
                />
              </div>
              <!-- AR section 1 -->

              <div class="col-lg-6 mb-2">
                <label for="pr_id" class="form-label text-muted fs-13 fw-bold"
                  >Project ID<span class="fs-15 text-danger">*</span></label
                >

                <div class="dropdown">
                  <div
                    @click="toggleDropdown"
                    @custom-event="handleCustomEvent(selectedOption.p_id)"
                    class="border rounded form-select py-1"
                  >
                    {{
                      selectedOption ? selectedOption.p_id : "Select project ID"
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
                      v-for="projects in filteredOptions"
                      :key="projects.id"
                      @click="selectOption(projects)"
                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                    >
                      <span class="fs-14">{{ projects.p_id }}</span
                      ><br />
                      <span class="fs-11">{{ projects.org_name }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <label for="pr_name" class="form-label text-muted fs-13 fw-bold"
                  >Project Name<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="pr_name"
                  v-model="pr_name"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="org_name"
                  class="form-label text-muted fs-13 fw-bold"
                  >Organization Name<span class="fs-15 text-danger"
                    >*</span
                  ></label
                >
                <input
                  autocomplete="false"
                  type="text"
                  id="org_name"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  v-model="org_name"
                  @input="search"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="quotation_id"
                  class="form-label text-muted fs-13 fw-bold"
                  >Quotation ID<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="quotation_id"
                  v-model="quotation_id"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="employee"
                  class="form-label text-muted fs-13 fw-bold"
                  >Sales Person
                </label>
                <div class="dropdown">
                  <div
                    @click="toggleDropdown1"
                    @custom-event="handleCustomEvent(selectedOption1.ename)"
                    class="border rounded form-select py-1"
                  >
                    {{
                      selectedOption1
                        ? selectedOption1.ename
                        : "Select Sales Person"
                    }}
                  </div>

                  <div
                    v-show="isDropdownOpen1"
                    class="position-absolute sizing border border-1 rounded-bottom p-1 w-100 z-index"
                  >
                    <input
                      type="text"
                      v-model="searchQuery1"
                      placeholder="Search..."
                      class="dropdown-search"
                    />

                    <p
                      v-for="employee in filteredOptions1"
                      :key="employee.id"
                      @click="selectOption1(employee)"
                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                    >
                      <span class="fs-14">{{ employee.ename }}</span
                      ><br />
                      <span class="fs-11">{{ employee.contact }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div class="col-lg-12 fs-14">
              <b>Item List<span class="fs-15 text-danger">*</span></b>
            </div>

            <div class="col-lg-12 mt-2">
              <div class="bg-white border">
                <div class="container">
                  <div
                    class="row py-1 pb-2 fs-12 font-family thead-color font-weight-600"
                  >
                    <div class="col-lg-3 text-start px-2">Item Name</div>
                    <div class="col-lg-5 text-start px-2">Description</div>
                    <!-- <div class="col-lg-1 text-center">Brand</div> -->
                    <div class="col-lg-1 text-end px-2">Rate</div>
                    <div class="col-lg-1 text-end px-2">Qty</div>
                    <!-- <div class="col-lg-1 text-end px-2">Discount(%)</div> -->
                    <!-- <div class="col-lg-1 text-end px-2">Vat(%)</div> -->
                    <div class="col-lg-1 text-end px-2">Amount</div>
                    <div class="col-lg-1 text-center">Action</div>
                  </div>

                  <!-- <form v-on:submit="addItem">
                    <div class="row border-bottom">
                      <div class="col-lg-3 px-1 border-end py-1">
                        <div class="dropdown" ref="dropdown">
                          <input autocomplete="false" type="text" id="i_name" placeholder="Type item name"
                            class="form-control rounded-0 border-0 shadow-none inputa px-1" v-model="searchQuery3"
                            @input="search" />
                          <div v-if="showDropdown" ref="dropdown"
                            class="fs-12 position-absolute sizing border border-1 rounded-bottom p-1 w-100">
                            <p class="my-2 px-2 dropclass mx-1 rounded py-2" v-for="result in filteredResults"
                              :key="result.id" @click="selectResult(result)">
                              <span class="fs-14">{{ result.item }}</span><br />
                              <small>{{ result.des }}</small>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-5 px-1 border-end py-1">
                        <textarea type="text" class="form-control rounded-0 border-0 shadow-none px-1" id="i_description"
                          rows="2" placeholder="Type product description" v-model="i_description"
                          aria-describedby=""></textarea>
                      </div>

                      <div class="col-lg-1 px-1 text-end border-end py-1">
                        <input step="0.01" type="number"
                          class="form-control text-end rounded-0 border-0 shadow-none inputa px-1" id="i_rate"
                          v-model="i_rate" aria-describedby="" @input="calculatePrice" />
                      </div>

                      <div class="col-lg-1 px-1 border-end py-1">
                        <input type="number" class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                          id="i_qty" v-model="i_qty" aria-describedby="" @input="calculatePrice" />
                      </div>
                      <div class="col-lg-1 px-1 border-end py-1">
                        <input type="number" class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                          id="i_discount" v-model="i_discount" aria-describedby="" @input="calculatePrice" />
                      </div>

                      <div class="col-lg-1 px-1 border-end py-1">
                        <input type="number" class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                          id="i_tax" v-model="i_tax" aria-describedby="" @input="calculatePrice" />
                      </div>

                      <div class="col-lg-1 px-1 border-end py-1">
                        <input type="number" class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                          id="price" v-model="price" aria-describedby="" />
                      </div>

                      <div class="col-lg-1 px-1 py-1">
                        <button type="submit" class="w-100 border-0 text-white fs-13 rounded-1 shadow-none" style="
                            background-color: #10b793;
                            border-color: #10b793;
                            height: 1.8rem;
                          ">

                          Add
                        </button>
                      </div>
                    </div>
                  </form> -->

                  <div
                    class="row mb-0 border-bottom fs-12"
                    v-for="(item, index) in item_array"
                    :key="index"
                  >
                    <div class="col-lg-3 py-2 border-end text-start text-muted">
                      {{ item.item }}
                    </div>
                    <div class="col-lg-5 py-2 border-end text-start text-muted">
                      {{ item.des }}
                    </div>
                    <!-- <div class="col-lg-1 py-2 border-end text-end text-muted">
                        {{ item.brand }}
                      </div> -->
                    <div class="col-lg-1 py-2 border-end text-end text-muted">
                      <input
                        class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                        type="number"
                        v-model="item.rate"
                        @input="updatePrice(index)"
                      />
                    </div>
                    <div class="col-lg-1 py-2 border-end text-end text-muted">
                      <input
                        class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                        type="number"
                        v-model="item.qty"
                        @input="updatePrice(index)"
                      />
                    </div>
                    <!-- <div class="col-lg-1 py-2 border-end text-end text-muted">
                        {{ item.discount }}
                      </div> -->
                    <!-- <div class="col-lg-1 py-2 border-end text-end text-muted">
                      {{ item.tax }}
                    </div> -->
                    <div class="col-lg-1 py-2 border-end text-end text-muted">
                      {{ parseFloat(item.price).toFixed(2) }}
                      <!-- {{ price }} -->
                      <!-- {{ item.amount }} -->
                    </div>
                    <div
                      class="col-lg-1 py-2 text-center text-muted"
                      @click="deleteTask(index)"
                    >
                      <i
                        class="fa-regular fa-trash-can"
                        style="cursor: pointer"
                      ></i>
                    </div>
                  </div>

                  <div class="row pb-2">
                    <div class="col-lg-7"></div>
                    <div class="col-lg-2">
                      <div class="fs-12 py-2 text-muted">
                        SUB TOTAL ({{ orgInfo.currency }})
                      </div>
                      <div class="fs-12 py-2 text-muted">VAT (+)</div>
                      <!-- <div class="fs-12 py-2 text-muted">Discount (%)</div> -->
                      <div class="fs-12 py-2 text-muted">ADJUSTMENT (-)</div>
                      <div class="fs-16 py-2 font-weight-700">
                        TOTAL ({{ orgInfo.currency }})
                      </div>
                    </div>
                    <div class="col-lg-2 px-0">
                      <div class="fs-12 py-2 px-2 text-end text-muted">
                        {{ subTotalPrice }}
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <input
                          type="number"
                          step="0.01"
                          class="form-control text-end rounded-0 border bg-light shadow-none inputa px-2 mb-1"
                          id="vattax"
                          v-model="vattax"
                          aria-describedby=""
                          @input="calculateTax"
                        />
                        <div class="fs-12 py-2 px-2 text-end text-muted ms-2">
                          <!-- {{ (adjustedTotal - subTotalPrice).toFixed(2) }} -->
                          {{ vatAmount }}
                        </div>
                      </div>
                      <!-- <input
                        type="number"
                        class="form-control text-end rounded-0 border bg-light shadow-none inputa px-2 mb-1"
                        id="tdiscount"
                        placeholder="0"
                        v-model="t_discount"
                        aria-describedby=""
                        @input="calculatePrice"
                      /> -->
                      <input
                        step="0.01"
                        type="number"
                        class="form-control text-end rounded-0 border bg-light shadow-none inputa px-2"
                        id="adjustment"
                        v-model="adjustment"
                        aria-describedby=""
                      />
                      <div class="fs-16 py-2 text-end px-2 font-weight-700">
                        {{ adjustedTotal.toFixed(2) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-between align-items-center mt-4">
              <div class="col-lg-3">
                <button
                  @click="SubmitInvoice"
                  class="border-0 w-100 action-button py-1"
                  :disabled="loading"
                >
                  <span v-if="loading">Loading...</span>
                  <span v-else>Add Invoice</span>
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
  name: "invoice",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      searchQuery: "",
      isDropdownOpen: false,
      searchResults: [],
      searchQuery1: "",
      searchQuery3: "",
      isDropdownOpen1: false,
      showDropdown: false,

      employee: "",
      employeeData: [],

      projectData: [],
      pr_id: 0,
      pr_name: "",
      org_name: "",

      vattax: 0,

      invoices: null,

      employeeName: "",
      selectedOption: 0,
      selectedOption1: 0,

      create_date: "",
      due_date: "",

      quotation_id: "",
      SelectP: "",

      // NewDiscount
      t_discount: 0,
      totalDiscount: 0,
      // NewDiscount

      // toast property
      loading: false,
      loadingTime: 2000,

      item_array: [],
      in_id: "",
      i_name: "",
      i_description: "",

      i_rate: 0,
      i_qty: 0,
      i_discount: 0,
      tax: 0,
      price: 0,
      i_tax: 0,
      i_des: "",

      subtotal: 0,
      subTotalPriceNew: 0,
      total: 0,
      taxAmount: 0,
      adjustment: 0,
      Vat: 0,
      totalTaxAmount: 0,
      customerID: "",
      terms: "",
      terms_array: [],
      quotation_items: [],
      dr_id: 0,

      vatAmount: 0,

      itemConditions: [
        localStorage.getItem("in_id") === "",
        this.i_name === "",
        this.i_description === "",
        this.i_rate,
        this.i_qty,
        this.i_discount,
        this.i_tax,
        this.price,
      ],
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  computed: {
    ...mapState(["orgInfo"]),

    filteredOptions() {
      if (!this.searchQuery) {
        return this.projectData;
      }

      const query = this.searchQuery.toLowerCase();
      console.log(this.searchQuery);
      return this.projectData.filter((projects) =>
        projects.p_id.toLowerCase().includes(query)
      );
    },

    filteredOptions1() {
      if (!this.searchQuery1) {
        return this.employeeData;
      }
      const query = this.searchQuery1.toLowerCase();
      return this.employeeData.filter((employee) =>
        employee.ename.toLowerCase().includes(query)
      );
    },

    filteredResults() {
      if (!this.searchQuery3) {
        return this.quotation_items;
      }
      const query = this.searchQuery3.toLowerCase();
      return this.quotation_items.filter((result) =>
        result.item.toLowerCase().includes(query)
      );
    },

    subTotalPrice() {
      this.subTotalPriceNew = this.item_array.reduce(
        (total, item) => total + +item.price,
        0
      );
      return this.item_array.reduce((total, item) => total + +item.price, 0);
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
      return (
        this.subTotalPriceNew +
        this.vatAmount -
        this.totalDiscount -
        this.adjustment
      );
    },
  },

  watch: {
    "selectedOption.p_id": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },

    "selectedOption1.ename": function (newVal, oldVal) {
      this.handleSelectedOptionChange1(newVal);
    },
  },

  methods: {
    updatePrice(index) {
      const item = this.item_array[index];
      item.price = (parseFloat(item.rate) * parseFloat(item.qty)).toFixed(2);
    },
    auth() {
      if (!this.createPrivilege.includes("invoicelist")) {
        this.$router.push("/dashboard");
      }
    },
    calculateTax() {
      const taxper = parseFloat(this.vattax) || 0;

      const subTPrice = parseFloat(this.subTotalPrice) || 0;

      const vatAmount = subTPrice * (taxper / 100);

      this.vatAmount = +vatAmount.toFixed(2);
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
      this.toast.success("Invoice Added!", {
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
    search() {
      this.showDropdown = true;
    },
    selectResult(result) {
      console.log("Selected:", result.p_id);
      this.getProjectbyName(result.p_id);

      this.searchQuery = result.project_name;
      this.showDropdown = false;
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdown;
      if (!dropdownElement.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    getProjectbyName(p_id) {
      const data = new FormData();

      data.append("p_id", p_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.project_name = res.message[0].project_name;
          this.org_name = res.message[0].org_name;
          this.quotation_id = res.message[0].quotation_id;
          this.customerID = res.message[0].c_id;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addItem(e) {
      e.preventDefault();
      const newItem = {
        in_id: localStorage.getItem("in_id"),
        item: this.i_name,
        des: this.i_description,

        rate: this.i_rate,
        qty: this.i_qty,
        discount: this.i_discount,
        tax: this.i_tax,
        taxAmount: (this.price * this.i_tax) / 100,
        amount: this.price,
      };

      this.item_array = [...this.item_array, newItem];

      this.i_name = "";
      this.i_description = "";

      this.i_rate = "";
      this.i_qty = "";
      this.i_tax = "";
      this.i_discount = "";
      this.price = "";
      this.searchQuery3 = "";
    },

    deleteTask(index) {
      this.item_array.splice(index, 1);
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    selectOption(projects) {
      this.selectedOption = projects;
      this.isDropdownOpen = false;
    },

    toggleDropdown1() {
      this.isDropdownOpen1 = !this.isDropdownOpen1;
    },

    selectOption1(employee) {
      this.selectedOption1 = employee;
      this.isDropdownOpen1 = false;
    },

    search() {
      this.showDropdown = true;
    },
    selectResult(result) {
      console.log("Selected:", result.q_id);
      this.getQuotationItemByID(result.id);

      this.searchQuery3 = result.item;
      this.showDropdown = false;
    },

    handleSelectedOptionChange(value) {
      console.log("Selected Option changed:", value);
      const data = new FormData();
      data.append("p_id", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.pr_id = value;
          this.pr_name = res.message[0].project_name;
          this.org_name = res.message[0].org_name;
          this.quotation_id = res.message[0].quotation_id;
          this.customerID = res.message[0].c_id;
          this.getQuotationItem(res.message[0].quotation_id);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handleSelectedOptionChange1(value) {
      const data = new FormData();
      data.append("ename", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getEmployeeDataByName`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.employeeName = value;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    SubmitInvoice() {
      if (
        this.in_id == "" ||
        this.create_date == "" ||
        this.due_date == "" ||
        this.pr_id == "" ||
        this.pr_name == "" ||
        this.org_name == "" ||
        this.quotation_id == "" ||
        this.employeeName == " "
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

      this.loading = true;

      const data = new FormData();

      data.append("in_id", this.in_id);
      data.append("dr_id", this.dr_id);
      data.append("c_id", this.customerID);
      data.append("create_date", this.create_date);
      data.append("due_date", this.due_date);
      data.append("project_id", this.pr_id);
      data.append("project_name", this.pr_name);
      data.append("org_name", this.org_name);
      data.append("quotation_id", this.quotation_id);
      data.append("sales_person", this.employeeName);
      data.append("st_amount", this.subTotalPriceNew);
      data.append("adjustment", this.adjustment);

      data.append("vatpercent", this.vattax);
      data.append("t_tax", this.vatAmount);
      data.append("discount", this.t_discount);

      data.append("user", this.userInfo.username);

      data.append(
        "t_amount",
        this.subTotalPriceNew +
          this.vatAmount -
          this.totalDiscount -
          this.adjustment
      );
      data.append(
        "due",
        this.subTotalPriceNew +
          this.vatAmount -
          this.totalDiscount -
          this.adjustment
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/addInvoice`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          localStorage.setItem("in_id", this.in_id);

          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg();
              router.push(`/invoiceoverview/${this.in_id}`);
              this.in_id = "";
              this.generateInvoiceID();
              this.item_array = [];
              this.create_date = "";
              this.due_date = "";
              this.pr_id = "";
              this.pr_name = "";
              this.pr_name = "";
              this.searchResults = [];
              this.selectedOption = [];
              this.searchQuery1 = "";
              this.searchQuery3 = "";
              this.selectedOption = 0;
              this.selectedOption1 = 0;
              this.isDropdownOpen1 = false;
              this.showDropdown = false;
              this.org_name = "";
              this.quotation_id = "";
            }, this.loadingTime);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.submitInvoiceItem();
      // this.submitT();
    },

    submitInvoiceItem() {
      this.item_array.map((item) => {
        const data = new FormData();

        data.append("in_id", this.in_id);
        data.append("item", item.item);
        data.append("des", item.des);
        data.append("rate", item.rate);
        data.append("qty", item.qty);

        data.append("tax", item.tax);
        data.append("amount", parseFloat(item.price));

        fetch(`${process.env.VUE_APP_SERVER_URL}/addInvoiceItem`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.message);
            localStorage.removeItem("in_id");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    getQuotationItem(qid) {
      const data = new FormData();

      data.append("q_id", qid);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationItems`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.quotation_items = res.message;
          this.item_array = res.message;
          console.log(res.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getQuotationItemByID(id) {
      const data = new FormData();

      data.append("id", id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationItembyID`, {
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
          this.price = res.message[0].price;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Additems(e) {
      e.preventDefault();

      if (this.terms === "") {
        return false;
      }

      const newObject = {
        in_id: this.in_id,
        tandc: this.terms,
      };

      this.terms_array = [...this.terms_array, newObject];

      this.terms = "";

      console.log(JSON.stringify(this.terms_array));
    },

    updateVatTax() {
      const data = new FormData();
      data.append("in_id", localStorage.getItem("in_id"));
      data.append("vatandtax", this.totalTaxAmount);
      data.append("tamount", this.subTotalPriceNew + this.totalTaxAmount);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addQuotationVatTax`, {
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

    deleteTask(index) {
      this.item_array.splice(index, 1);
    },

    calculatePrice() {
      const qty = parseFloat(this.i_qty) || 0;
      const rate = parseFloat(this.i_rate) || 0;
      const discount = parseFloat(this.i_discount) || 0;
      const tdiscount = parseFloat(this.t_discount) || 0;

      const amount = qty * rate;
      const discountAmount = (discount / 100) * amount;

      this.discountAmount = discountAmount;

      this.price = amount - discountAmount;

      const totalDiscount =
        (tdiscount / 100) * (this.subTotalPrice + this.totalTax);
      this.totalDiscount = totalDiscount;
    },

    generateInvoiceID() {
      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getInvoiceLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.in_id = `I${year}${data.message}`;
          this.dr_id = `D${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },
  },

  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getEmployeeData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.employeeData = data.message;
      })
      .catch((err) => console.log(err.message));

    fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.projectData = data.message;
      })
      .catch((err) => console.log(err.message));

    this.generateInvoiceID();

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
