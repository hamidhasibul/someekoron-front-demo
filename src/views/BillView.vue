<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Bill Records</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-8 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Before entering a <b>BILL</b> into the software, please take the
              time to carefully read and verify the following information.
              <br />
              <span class="note-space">
                Failure to do so may result in delays or errors during the
                processing of your project.</span
              >
            </p>
          </div>
          <div class="col-lg-8">
            <div class="row p-2 mb-3">
              <div class="col-lg-6 mb-2">
                <label class="form-label text-muted fs-13 fw-bold"
                  >Bill ID<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="bill_id"
                  v-model="bill_id"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-3 mb-2">
                <label
                  for="input_date"
                  class="form-label text-muted fs-13 fw-bold"
                  >Bill Date<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="input_date"
                  v-model="input_date"
                  type="date"
                  class="form-control rounded-0 fs-14 inputa"
                />
              </div>

              <div class="col-lg-3 mb-2">
                <label
                  for="due_date"
                  class="form-label text-muted fs-13 fw-bold"
                  >Due Date<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="due_date"
                  v-model="due_date"
                  type="date"
                  class="form-control rounded-0 fs-14 inputa"
                />
              </div>
              <!-- AR section 1 -->

              <div class="col-lg-6 mb-2">
                <label for="po_id" class="form-label text-muted fs-13 fw-bold"
                  >PO ID<span class="fs-15 text-danger">*</span></label
                >
                <div class="dropdown">
                  <div
                    @click="toggleDropdown"
                    @custom-event="handleCustomEvent(selectedOption.po_id)"
                    class="border rounded form-select py-1"
                  >
                    {{
                      selectedOption
                        ? selectedOption.po_id
                        : "Select Purchase ID"
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
                      v-for="purchase in filteredOptions"
                      :key="purchase.id"
                      @click="selectOption(purchase)"
                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                    >
                      <span class="fs-14">{{ purchase.po_id }}</span
                      ><br />
                      <span class="fs-11">{{ purchase.org_name }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <label for="vname" class="form-label text-muted fs-13 fw-bold"
                  >Vendor Name<span class="fs-15 text-danger">*</span></label
                >

                <label
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  >{{ vname }}</label
                >
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="org_name"
                  class="form-label text-muted fs-13 fw-bold"
                  >Project directory<span class="fs-15 text-danger"
                    >*</span
                  ></label
                >
                <label
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  >{{ pr_name }}</label
                >
              </div>
              <div class="col-lg-6 mb-2">
                <label class="form-label text-muted fs-13 fw-bold"
                  >Tax Deducted ? <span class="fs-15 text-danger">*</span>
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
            <div class="row px-2">
              <div class="col-lg-12 fs-14">
                <b>Item List <span class="fs-15 text-danger">*</span></b>
              </div>

              <div class="col-lg-12 mt-2">
                <div class="bg-white border">
                  <div class="container">
                    <div
                      class="row py-1 pb-2 fs-13 font-family thead-color font-weight-600"
                    >
                      <div class="col-lg-3 text-start">Item Name</div>
                      <div class="col-lg-5 text-start">Description</div>

                      <div class="col-lg-1 text-end">Rate</div>
                      <div class="col-lg-1 text-end">Qty</div>
                      <!-- <div class="col-lg-1 text-start">Discount(%)</div> -->
                      <!-- <div class="col-lg-1 text-end">Vat(%)</div> -->
                      <div class="col-lg-1 text-end">Amount</div>
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
                          <textarea type="text" class="form-control rounded-0 border-0 shadow-none px-1"
                            id="i_description" rows="2" placeholder="Type product description" v-model="i_description"
                            aria-describedby=""></textarea>
                        </div>

                        <div class="col-lg-1 px-1 text-end border-end py-1">
                          <input step="0.01" type="number"
                            class="form-control text-end rounded-0 border-0 shadow-none inputa px-1" id="i_unitprice"
                            v-model="i_rate" aria-describedby="" @input="calculatePrice" />
                        </div>

                        <div class="col-lg-1 px-1 border-end py-1">
                          <input type="number" class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                            id="i_quantity" v-model="i_qty" aria-describedby="" @input="calculatePrice" />
                        </div> -->

                    <!-- <div class="col-lg-1 px-1 border-end py-1">
                          <input
                            type="number"
                            class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                            id="i_discount"
                            v-model="i_discount"
                            aria-describedby=""
                            @input="calculatePrice"
                          />
                        </div> -->

                    <!-- <div class="col-lg-1 px-1 border-end py-1">
                          <input
                            type="number"
                            class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                            id="i_tax"
                            v-model="i_tax"
                            aria-describedby=""
                            @input="calculatePrice"
                          />
                        </div> -->

                    <!-- <div class="col-lg-1 px-1 border-end py-1">
                          <input step="0.01" type="number"
                            class="form-control text-end rounded-0 border-0 shadow-none inputa px-1" id="price"
                            v-model="price" aria-describedby="" />
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

                    <!-- <div class="row mb-0 border-bottom fs-12" v-for="(item, index) in item_array" :key="index"> -->
                    <!-- <div class="col-lg-3 py-2 border-end text-start text-muted">
                        {{ item.item }}
                      </div>
                      <div class="col-lg-5 py-2 border-end text-start text-muted">
                        {{ item.des }}
                      </div>

                      <div class="col-lg-1 py-2 border-end text-end text-muted">
                        {{ item.rate }}
                      </div>
                      <div class="col-lg-1 py-2 border-end text-end text-muted">
                        {{ item.qty }}
                      </div> -->
                    <!-- <div
                        class="col-lg-1 py-2 border-end text-start text-muted"
                      >
                        {{ item.discount }}
                      </div> -->
                    <!-- <div class="col-lg-1 py-2 border-end text-end text-muted">
                        {{ item.tax }}
                      </div> -->
                    <!-- <div class="col-lg-1 py-2 border-end text-end text-muted">
                        {{ item.amount.toFixed(2) }}
                      </div>
                      <div class="col-lg-1 py-2 text-center text-muted" @click="deleteTask(index)">
                        <i class="fa-regular fa-trash-can" style="cursor: pointer"></i>
                      </div> -->
                    <!-- </div> -->

                    <div
                      class="row mb-0 border-bottom fs-12"
                      v-for="(item, index) in item_array"
                      :key="index"
                    >
                      <div
                        class="col-lg-3 py-2 border-end text-start text-muted"
                      >
                        {{ item.item }}
                      </div>
                      <div
                        class="col-lg-5 py-2 border-end text-start text-muted"
                      >
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
                        {{ parseFloat(item.amount).toFixed(2) }}
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
                          type="number"
                          class="form-control text-end rounded-0 border bg-light shadow-none inputa px-2"
                          id="adjustment"
                          v-model="adjustment"
                          aria-describedby=""
                        />
                        <div class="fs-16 py-2 px-2 text-end font-weight-700">
                          {{ adjustedTotal.toFixed(2) }}
                        </div>
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
            </div>
          </div>

          <hr />
          <div class="col-lg-12 mt-4 mb-3">
            <div class="row px-2">
              <div class="col-lg-3">
                <button
                  @click="submitAP"
                  class="border-0 w-100 action-button py-1"
                  :disabled="loading"
                >
                  <span v-if="loading">Loading...</span>
                  <span v-else>Add Bill</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
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
  name: "BillView",
  components: { TopNav, SideBar, Footer },

  data() {
    return {
      // toast property
      loading: false,
      loadingTime: 2000,

      i_discount: 0,
      vattax: 0,
      bill_id: 0,
      searchQuery: "",
      searchQuery3: "",
      isDropdownOpen: false,
      showDropdown: false,
      searchResults: [],
      po_id: "",
      input_date: "",
      due_date: "",
      pay_type: "",
      bankselect: "1",
      pay_mode: "",
      invoice_no: 0,
      amount: 0,
      reference: "",
      payment_mode: "",

      // NewDiscount
      t_discount: 0,
      totalDiscount: 0,
      // NewDiscount

      bank_name: "",
      check: "",

      poData: [],
      ap_pay: "",

      pr_id: 0,
      project_name: "",
      org_name: "",
      v_id: "",
      vname: "",
      pr_name: "",

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
      i_discount: 0,
      i_rate: 0,
      i_qty: 0,
      tax: 0,
      price: 0,
      i_tax: 0,
      vatAmount: 0,
      po_items: [],
      itemConditions: [
        localStorage.getItem("po_id") === "",
        this.i_name === "",
        this.i_description === "",
        this.i_discount === "",
        this.i_rate,
        this.i_qty,
        this.i_tax,
        this.price,
      ],
    };
  },

  computed: {
    filteredOptions() {
      if (!this.searchQuery) {
        return this.poData;
      }

      const query = this.searchQuery.toLowerCase();
      return this.poData.filter((purchase) =>
        purchase.po_id.toLowerCase().includes(query)
      );
    },

    filteredResults() {
      if (!this.searchQuery3) {
        return this.po_items;
      }
      const query = this.searchQuery3.toLowerCase();
      return this.po_items.filter((result) =>
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

    /*  totalTax() {
      this.totalTaxAmount = this.item_array.reduce(
        (total, item) => total + item.taxAmount,
        0
      );
      return this.item_array.reduce((total, item) => total + item.taxAmount, 0);
    }, */

    ...mapState(["userInfo"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["orgInfo"]),

    adjustedTotal() {
      return this.subTotalPriceNew + this.vatAmount - this.adjustment;
    },
  },

  watch: {
    "selectedOption.po_id": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    updatePrice(index) {
      const item = this.item_array[index];
      item.amount = (parseFloat(item.rate) * parseFloat(item.qty)).toFixed(2);
    },
    auth() {
      if (!this.createPrivilege.includes("billlist")) {
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
      this.toast.success("Bill Added!", {
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

    addItem(e) {
      e.preventDefault();
      /* if (
        (this.po_id === "",
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
        po_id: localStorage.getItem("po_id"),
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

      this.searchQuery3 = "";
      this.i_name = "";
      this.i_description = "";
      this.i_discount = "";
      this.i_rate = 0;
      this.i_qty = 0;
      this.i_tax = 0;
      this.price = 0;
    },

    search() {
      this.showDropdown = true;
    },

    // handleClickOutside(event) {
    //   const dropdownElement = this.$refs.dropdown;
    //   if (!dropdownElement.contains(event.target)) {
    //     this.showDropdown = false;
    //   }
    // },

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

    selectOption(purchase) {
      this.selectedOption = purchase;
      this.isDropdownOpen = false;
    },

    selectResult(result) {
      console.log("Selected:", result.po_id);
      this.getPOItemByID(result.id);

      this.searchQuery3 = result.item;
      this.showDropdown = false;
    },

    getPOItem(po_id) {
      const data = new FormData();

      data.append("po_id", po_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPOItems`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.po_items = res.message;
          this.item_array = res.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPOItemByID(id) {
      const data = new FormData();

      data.append("id", id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPOItembyID`, {
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

    handleSelectedOptionChange(value) {
      console.log("Selected Option changed:", value);
      const data = new FormData();
      data.append("po_id", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPOAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.po_id = value;
          this.pr_id = res.message[0].pr_id;
          this.pr_name =
            res.message[0].pr_name === ""
              ? "Genaral Stock"
              : res.message[0].pr_name;
          this.org_name = res.message[0].org_name;
          this.v_id = res.message[0].v_id;
          this.vname = res.message[0].vname;

          this.getPOItem(res.message[0].po_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitAP(e) {
      e.preventDefault();

      if (
        this.bill_id == "" ||
        this.input_date == "" ||
        this.due_date == "" ||
        this.po_id == "" ||
        this.vname == "" ||
        this.pr_name == ""
        // this.item_array.length == 0
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

      data.append("bill_id", this.bill_id);
      data.append("cdate", this.input_date);
      data.append("due_date", this.due_date);
      data.append("po_id", this.po_id);
      data.append("v_id", this.v_id);
      data.append("vname", this.vname);
      data.append("pr_id", this.pr_id);
      data.append("project_name", this.pr_name);
      data.append("t_status", this.taxOption);
      data.append("reference", this.reference);
      data.append("adjustment", this.adjustment);
      data.append("st_amount", this.subTotalPriceNew);
      data.append("vatpercent", this.vattax);
      data.append("t_tax", this.vatAmount);
      data.append("discount", this.t_discount);

      data.append("user", this.userInfo.username);

      data.append(
        "t_amount",
        this.subTotalPriceNew + this.vatAmount - this.adjustment
      );
      data.append(
        "due",
        this.subTotalPriceNew + this.vatAmount - this.adjustment
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/addPayable`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);

          if (res.message === true) {
            this.submitAPItem();
            this.vendorTransactionProcess();

            setTimeout(() => {
              this.loading = false;
              this.successMsg();
              router.push(`/billoverview/${this.bill_id}`);
              this.generateBillID();
              this.input_date = "";
              this.due_date = "";
              this.po_id = "";
              this.vname = "";
              this.selectedOption = 0;
              this.pr_name = "";
              this.item_array = [];
            }, this.loadingTime);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    vendorTransactionProcess() {
      const data = new FormData();
      data.append("v_id", this.v_id);
      data.append("date", this.input_date);
      data.append("payID", this.bill_id);
      data.append(
        "particular",
        `PayID- ${this.bill_id}, Project Name- ${this.pr_name}`
      );
      data.append(
        "payable",
        this.subTotalPriceNew + this.vatAmount - this.adjustment
      );
      data.append("paid", "0");
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

    submitAPItem() {
      this.item_array.map((item) => {
        const data = new FormData();

        data.append("bill_id", this.bill_id);
        data.append("item", item.item);
        data.append("des", item.des);

        data.append("rate", item.rate);
        data.append("qty", item.qty);

        data.append("tax", 0);
        data.append("amount", parseFloat(item.amount));

        fetch(`${process.env.VUE_APP_SERVER_URL}/addPayableItem`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            localStorage.removeItem("bill_id");
          })
          .catch((error) => {
            console.log(error);
          });
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

      this.price = amount - discountAmount.toFixed(2);

      const totalDiscount =
        (tdiscount / 100) * (this.subTotalPrice + this.vatAmount);
      this.totalDiscount = totalDiscount;
    },
    generateBillID() {
      // const date = new Date();
      // const year = String(date.getFullYear()).slice(-2);
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const timestamp = String(date.getTime()).slice(-5);
      // this.bill_id = `B${year}${month}${day}${timestamp}`;

      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getBillLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.bill_id = `B${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },
  },
  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getPOData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.poData = data.message;
        console.log(data.message);
      })
      .catch((err) => console.log(err.message));

    document.addEventListener("click", this.handleClickOutside);

    this.generateBillID();
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

  updated() {
    console.log(this.pr_id);
  },
};
</script>
<style></style>
