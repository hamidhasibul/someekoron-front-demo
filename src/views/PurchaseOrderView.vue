<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Make Purchase Order</p>
          </div>
        </div>
        <!-- purchase order -->

        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Before entering <b> Purchase Order </b> into the software, kindly
              review and verify the following information. <br />
              <span class="note-space">
                Neglecting this step could potentially lead to delays or errors
                in processing your project.</span
              >
            </p>
          </div>
          <div class="p-3 ps-4">
            <div class="row w-75">
              <div class="row">
                <div class="col-lg-6 mb-2">
                  <label class="form-label text-muted fs-13 fw-bold"
                    >Purchase Order Type<span class="fs-15 text-danger"
                      >*</span
                    ></label
                  >
                  <div class="d-flex">
                    <div class="form-check form-check-inline">
                      <input
                        id="project_resource"
                        v-model="resource_type"
                        class="form-check-input"
                        type="radio"
                        name="resourceType"
                        value="pr"
                        @change="handleResourceTypeChange"
                        checked
                      />
                      <label
                        for="project_resource"
                        class="form-check-label fs-14"
                        >Project Resource</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        id="general_stock"
                        v-model="resource_type"
                        class="form-check-input"
                        type="radio"
                        name="resourceType"
                        value="gs"
                        @change="handleResourceTypeChange"
                      />
                      <label for="general_stock" class="form-check-label fs-14"
                        >General Stock</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- Purchase Order section 1 -->
              <div class="col-lg-3 mb-2">
                <label for="pr_id" class="form-label text-muted fs-13 fw-bold"
                  >PO ID<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="po_id"
                  v-model="po_id"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-3 mb-2">
                <label
                  for="submitdate"
                  class="form-label text-muted fs-13 fw-bold"
                  >Create Date<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="submitdate"
                  v-model="submitdate"
                  type="date"
                  class="form-control rounded-0 fs-14 inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="enddate" class="form-label text-muted fs-13 fw-bold"
                  >Expected Completion Date<span class="fs-15 text-danger"
                    >*</span
                  ></label
                >
                <input
                  id="enddate"
                  v-model="enddate"
                  type="date"
                  class="form-control rounded-0 fs-14 inputa"
                />
              </div>

              <div class="col-lg-6 mb-2" v-if="showProjectNameField">
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

              <div class="col-lg-6 mb-2" v-if="showProjectNameField">
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

              <div class="col-lg-6 mb-2" v-if="showProjectNameField">
                <label
                  for="org_name"
                  class="form-label text-muted fs-13 fw-bold"
                  >Organization Name<span class="fs-15 text-danger"
                    >*</span
                  ></label
                >
                <input
                  id="org_name"
                  v-model="org_name"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="v_name" class="form-label text-muted fs-13 fw-bold"
                  >Choose Vendor<span class="fs-15 text-danger">*</span></label
                >
                <div class="dropdown">
                  <div
                    @click="toggleDropdown1"
                    @custom-event="handleCustomEvent(selectedOption1.id)"
                    class="border rounded form-select py-1"
                  >
                    {{
                      selectedOption1
                        ? selectedOption1.vname
                        : "Select Vendor Name"
                    }}
                  </div>

                  <div
                    v-show="isDropdownOpen1"
                    class="position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                  >
                    <input
                      type="text"
                      v-model="searchQuery1"
                      placeholder="Search..."
                      class="dropdown-search"
                    />

                    <p
                      v-for="vendor in filteredOptions1"
                      :key="vendor.id"
                      @click="selectOption1(vendor)"
                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                    >
                      <span class="fs-14">{{ vendor.vname }}</span
                      ><br />
                      <span class="fs-11">{{ vendor.v_location }}</span>
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
                <div class="container-fluid">
                  <div
                    class="row py-1 pb-2 fs-12 font-family thead-color font-weight-600"
                  >
                    <div class="col-lg-3 text-start px-2">Item Name</div>
                    <div class="col-lg-4 text-start px-2">Description</div>

                    <div class="col-lg-1 text-end px-2">Rate</div>
                    <div class="col-lg-1 text-end px-2">Qty</div>
                    <div class="col-lg-1 text-end px-2">Unit</div>
                    <!-- <div class="col-lg-1 text-end px-2">Discount(%)</div> -->
                    <!-- <div class="col-lg-1 text-end px-2">Vat(%)</div> -->
                    <div class="col-lg-1 text-end px-2">Amount</div>
                    <div class="col-lg-1 text-center px-2">Action</div>
                  </div>

                  <form v-on:submit="addItem">
                    <div class="row border-bottom">
                      <div class="col-lg-3 px-1 border-end py-1">
                        <div class="dropdown" ref="dropdown">
                          <input
                            autocomplete="false"
                            type="text"
                            id="i_name"
                            placeholder="Type item name"
                            class="form-control rounded-0 border-0 shadow-none inputa px-1"
                            v-model="searchQuery3"
                            @input="search"
                            v-if="showProjectNameField"
                          />

                          <input
                            autocomplete="false"
                            type="text"
                            id="i_name"
                            placeholder="Type item name"
                            class="form-control rounded-0 border-0 shadow-none inputa px-1"
                            v-model="i_name"
                            v-if="showProjectNameField == false"
                          />
                          <div
                            v-if="showDropdown"
                            ref="dropdown"
                            class="fs-12 position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                          >
                            <p
                              class="my-2 px-2 dropclass mx-1 rounded py-2"
                              v-for="result in filteredResults"
                              :key="result.id"
                              @click="selectResult(result)"
                            >
                              <span class="fs-14">{{ result.item }}</span
                              ><br />
                              <small>{{ result.des }}</small>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-4 px-1 border-end py-1">
                        <textarea
                          type="text"
                          class="form-control rounded-0 border-0 shadow-none px-1"
                          id="i_description"
                          rows="2"
                          placeholder="Type product description"
                          v-model="i_description"
                          aria-describedby=""
                        ></textarea>
                      </div>

                      <div class="col-lg-1 px-1 text-end border-end py-1">
                        <input
                          step="0.01"
                          type="number"
                          class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                          id="i_rate"
                          v-model="i_rate"
                          aria-describedby=""
                          @input="calculatePrice"
                        />
                      </div>

                      <div class="col-lg-1 px-1 border-end py-1">
                        <input
                          type="number"
                          class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                          id="i_qty"
                          v-model="i_qty"
                          aria-describedby=""
                          @input="calculatePrice"
                        />
                      </div>
                      <div class="col-lg-1 px-1 border-end py-1">
                        <select
                          class="form-select text-start rounded-0 border-0 shadow-none inputa px-2"
                          id="item_unit"
                          v-model="i_unit"
                        >
                          <option value="Piece" selected>Piece</option>
                          <option value="Dozen">Dozen</option>
                          <option value="Litter">Litter</option>
                          <option value="Kilogram">Kilogram</option>
                          <option value="Pounds">Pounds</option>
                          <option value="Ton">Ton</option>
                          <option value="Meter">Meter</option>
                          <option value="Feet">Feet</option>
                          <option value="Set">Set</option>
                          <option value="Packet">Packet</option>
                        </select>
                      </div>
                      <!-- <div class="col-lg-1 px-1 border-end py-1">
                          <input
                            type="text"
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

                      <div class="col-lg-1 px-1 border-end py-1">
                        <input
                          type="number"
                          class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                          id="price"
                          v-model="price"
                          aria-describedby=""
                          readonly
                        />
                      </div>

                      <div class="col-lg-1 px-1 py-1">
                        <button
                          type="submit"
                          class="w-100 border-0 text-white fs-13 rounded-1 shadow-none"
                          style="
                            background-color: #10b793;
                            border-color: #10b793;
                            height: 1.8rem;
                          "
                        >
                          <!-- style="height: 32px;" -->
                          Add
                        </button>
                      </div>
                    </div>
                  </form>

                  <div
                    class="row mb-0 border-bottom fs-12"
                    v-for="(item, index) in item_array"
                    :key="index"
                  >
                    <div class="col-lg-3 py-2 border-end text-start text-muted">
                      {{ item.item }}
                    </div>
                    <div class="col-lg-4 py-2 border-end text-start text-muted">
                      {{ item.des }}
                    </div>

                    <div class="col-lg-1 py-2 border-end text-end text-muted">
                      {{ item.rate }}
                    </div>
                    <div class="col-lg-1 py-2 border-end text-end text-muted">
                      {{ item.qty }}
                    </div>
                    <div class="col-lg-1 py-2 border-end text-end text-muted">
                      {{ item.unit }}
                    </div>
                    <!-- <div class="col-lg-1 py-2 border-end text-end text-muted">
                        {{ item.discount }}
                      </div> -->
                    <!-- <div class="col-lg-1 py-2 border-end text-end text-muted">
                        {{ item.tax }}
                      </div> -->
                    <div class="col-lg-1 py-2 border-end text-end text-muted">
                      {{ parseFloat(item.amount).toFixed(2) }}
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

                      <!-- <input
                          type="number"
                          class="form-control text-end rounded-0 border bg-light shadow-none inputa px-2 mb-1"
                          id="tdiscount"
                          placeholder="0"
                          v-model="t_discount"
                          aria-describedby=""
                          @input="calculatePrice"
                        /> -->

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
                          {{ (adjustedTotal - subTotalPrice).toFixed(2) }}
                        </div>
                      </div>

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

            <div class="row my-3">
              <!-- Purchase Order section 1 -->
              <div class="col-lg-6 mb-2">
                <form v-on:submit="submitForm">
                  <div class="row">
                    <div class="col-lg-10 mb-2">
                      <label
                        for="terms"
                        class="form-label text-muted fs-13 fw-bold"
                        >Terms & Condition<span class="fs-15 text-danger"
                          >*</span
                        ></label
                      >
                      <!-- <input id="terms" v-model="terms" type="text"
                            placeholder="Write here following your company policy . . ."
                            class="form-control rounded-0 border-muted shadow-none inputa" /> -->

                      <div>
                        <quill-editor
                          ref="quillEditor"
                          :options="editorOptions"
                        />
                      </div>
                    </div>

                    <div class="col-lg-2">
                      <button
                        class="border-0 w-100 action-button fs-13 py-1"
                        style="margin-top: 30px; height: 1.8rem"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div class="col-lg-6 mt-4">
                <div class="bg-light p-2">
                  <p class="fw-bold mb-1 fs-13">Terms & Condition</p>
                  <small class="text-muted2 fs-13 d-flex" v-if="terms">
                    <span v-html="terms"></span>
                    <br />
                  </small>
                </div>
              </div>
            </div>

            <div class="row justify-content-between align-items-center mt-4">
              <div class="col-lg-3">
                <button
                  @click="submitPO"
                  class="border-0 w-100 action-button py-1"
                  :disabled="loading"
                >
                  <span v-if="loading">Loading...</span>
                  <span v-else>Add PO</span>
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
import router from "@/router";
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { customAlphabet } from "nanoid";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "PoOrder",
  components: { TopNav, SideBar, Footer, QuillEditor },
  data() {
    return {
      selectedOption: 0,
      selectedOption1: 0,
      searchQuery: "",
      searchQuery1: "",
      searchQuery3: "",
      isDropdownOpen: false,
      isDropdownOpen1: false,
      showDropdown: false,
      vattax: 0,
      po_id: "",
      submitdate: "",
      enddate: "",
      resource_type: "",
      projectData: [],
      pr_id: 0,
      pr_name: "",
      org_name: "",

      vendorData: [],
      vn_id: "",
      vr_name: "",
      vendorname: "",
      vlocation: "",

      item_array: [],
      i_name: "",
      i_description: "",
      i_discount: "",
      i_rate: 0,
      i_unit: "",
      i_qty: 0,
      i_discount: 0,
      i_tax: 0,
      price: 0,
      discountAmount: 0,
      v_name: "",

      // NewDiscount
      t_discount: 0,
      totalDiscount: 0,
      // NewDiscount

      // toast property
      loading: false,
      loadingTime: 2000,

      subtotal: 0,
      subTotalPriceNew: 0,
      total: 0,
      taxAmount: 0,
      Vat: 0,
      totalTaxAmount: 0,
      adjustment: 0,
      showProjectNameField: true,

      po_des: "",
      terms: "",
      vatAmount: 0,
      quotation_items: [],
      itemConditions: [
        this.po_id === "",
        this.i_name === "",
        this.i_description === "",
        this.i_rate,
        this.i_qty,
        this.i_unit,
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

  methods: {
    auth() {
      if (!this.createPrivilege.includes("purchaseorderlist")) {
        this.$router.push("/dashboard");
      }
    },
    handleResourceTypeChange() {
      if (this.resource_type === "gs") {
        this.showProjectNameField = false;
      } else if (this.resource_type === "pr") {
        this.showProjectNameField = true;
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

    successMsg(msg) {
      this.toast.success(msg, {
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
        po_id: this.po_id,
        item: this.i_name,
        des: this.i_description,
        discount: this.i_discount,
        discountAmount: this.discountAmount,
        rate: this.i_rate,
        qty: this.i_qty,
        unit: this.i_unit,
        tax: this.i_tax,
        taxAmount: (this.price * this.i_tax) / 100,
        amount: this.price,
      };

      this.item_array = [...this.item_array, newObject];

      this.i_name = "";
      this.searchQuery3 == "", (this.i_description = "");
      this.i_discount = "";
      this.i_rate = 0;
      this.i_qty = 0;
      this.i_unit = "";
      this.i_tax = 0;
      this.price = 0;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    toggleDropdown1() {
      this.isDropdownOpen1 = !this.isDropdownOpen1;
    },

    selectOption(projects) {
      this.selectedOption = projects;
      this.isDropdownOpen = false;
    },

    selectOption1(vendor) {
      this.selectedOption1 = vendor;
      this.isDropdownOpen1 = false;
    },

    search() {
      this.showDropdown = true;
    },
    selectResult(result) {
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

          this.getQuotationItem(res.message[0].quotation_id);

          console.log(res.message[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleSelectedOptionChange1(value) {
      console.log("Selected Option changed:", value);
      const data = new FormData();
      data.append("id", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorDataByName`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message[0]);
          this.vendorname = res.message[0].vname;
          this.vn_id = res.message[0].v_id;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitPO() {
      if (this.showProjectNameField == true) {
        if (
          this.po_id == "" ||
          this.submitdate == "" ||
          this.enddate == "" ||
          this.pr_id == "" ||
          this.pr_name == "" ||
          this.org_name == "" ||
          this.vendorname == "" ||
          this.terms == ""
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
      } else {
        if (
          this.po_id == "" ||
          this.submitdate == "" ||
          this.enddate == "" ||
          this.vendorname == "" ||
          this.terms == ""
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
      }

      this.loading = true;

      const data = new FormData();

      data.append("po_id", this.po_id);
      data.append("c_date", this.submitdate);
      data.append("edate", this.enddate);

      data.append("pr_id", this.pr_id);

      data.append("pr_name", this.pr_name);
      data.append("org_name", this.org_name);
      data.append("v_id", this.vn_id);
      data.append("vname", this.vendorname);
      data.append("st_amount", this.subTotalPriceNew);
      data.append("adjustment", this.adjustment);
      data.append(
        "t_amount",
        this.subTotalPriceNew + this.vatAmount - this.adjustment
      );
      data.append("vatpercent", this.vattax);
      data.append("t_tax", this.vatAmount);
      data.append("discount", this.t_discount);

      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addPO`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);

          if (res.message === true) {
            this.selectedOption = 0;
            this.selectedOption1 = 0;
            this.searchQuery = "";
            this.searchQuery1 = "";
            this.searchQuery3 = "";
            this.isDropdownOpen = false;
            this.isDropdownOpen1 = false;
            this.showDropdown = false;
            this.vattax = 0;

            this.submitdate = "";
            this.enddate = "";
            this.resource_type = "";
            this.projectData = [];
            this.pr_id = 0;
            this.pr_name = "";
            this.org_name = "";

            this.vendorData = [];

            this.item_array = [];

            setTimeout(() => {
              this.loading = false;
              this.successMsg("Purchase Order Added");
              router.push(`/purchaseorderoverview/${this.po_id}`);

              this.po_id = "";
              this.submitdate = "";
              this.enddate = "";
              this.pr_id = "";
              this.pr_name = "";
              this.org_name = "";
            }, this.loadingTime);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.submitPOItem();
      this.submitT();
    },

    submitPOItem() {
      this.item_array.map((item) => {
        const data = new FormData();

        data.append("po_id", this.po_id);
        data.append("item", item.item);
        data.append("des", item.des);
        data.append("rate", item.rate);
        data.append("qty", item.qty);
        data.append("unit", item.unit);
        data.append("tax", 0);
        data.append("amount", parseFloat(item.amount));

        fetch(`${process.env.VUE_APP_SERVER_URL}/addPOItem`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.message);
            localStorage.removeItem("p_id");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    submitT() {
      const data = new FormData();

      data.append("po_id", this.po_id);
      data.append("tandc", this.terms);
      data.append("po_des", this.po_des);
      fetch(`${process.env.VUE_APP_SERVER_URL}/addPOTD`, {
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
          console.log(res);
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
          this.i_unit = res.message[0].item_unit;
          this.i_tax = res.message[0].tax;
          this.i_discount = res.message[0].discount;
          this.price = res.message[0].price;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitForm(e) {
      e.preventDefault();

      this.terms = this.$refs.quillEditor.getHTML();
      if (this.terms === "<p><br></p>") {
        this.warningMsg("Please add terms!");
        return false;
      } else {
        this.successMsg("Terms added");
        console.log(this.terms);
      }
    },
    warningMsg(msg) {
      this.toast.warning(msg, {
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
    updateVatTax() {
      const data = new FormData();
      data.append("po_id", localStorage.getItem("po_id"));
      data.append("vatandtax", this.vatAmount);
      data.append("tamount", this.subTotalPriceNew + this.vatAmount);

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
      console.log(amount, qty, rate);
      const discountAmount = (discount / 100) * amount;

      this.discountAmount = discountAmount;

      this.price = amount - discountAmount;

      const totalDiscount =
        (tdiscount / 100) * (this.subTotalPrice + this.totalTax);
      this.totalDiscount = totalDiscount;
    },

    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdown;
      if (!dropdownElement.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    generatePOID() {
      // const date = new Date();
      // const year = String(date.getFullYear()).slice(-2);
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const timestamp = String(date.getTime()).slice(-5);
      // this.po_id = `PO${year}${month}${day}${timestamp}`;

      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPurchaseLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.po_id = `PO${year}${data.message}`;
          console.log(this.po_id);
        })
        .catch((err) => console.error(err.message));
    },
  },

  computed: {
    ...mapState(["orgInfo"]),

    filteredOptions() {
      if (!this.searchQuery) {
        return this.projectData;
      }

      const query = this.searchQuery.toLowerCase();
      return this.projectData.filter((projects) =>
        projects.p_id.toLowerCase().includes(query)
      );
    },

    filteredOptions1() {
      if (!this.searchQuery1) {
        return this.vendorData;
      }
      const query = this.searchQuery1.toLowerCase();
      return this.vendorData.filter((vendor) =>
        vendor.vname.toLowerCase().includes(query)
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
    adjustedTotal() {
      return this.subTotalPriceNew + this.vatAmount - this.adjustment;
    },
    subTotalPrice() {
      this.subTotalPriceNew = this.item_array.reduce(
        (total, item) => total + +item.amount,
        0
      );
      return this.item_array.reduce((total, item) => total + +item.amount, 0);
    },

    /* totalTax() {
      this.totalTaxAmount = this.item_array.reduce(
        (total, item) => total + item.taxAmount,
        0
      );
      return this.item_array.reduce((total, item) => total + item.taxAmount, 0);
    }, */

    ...mapState(["userInfo"]),
    ...mapState(["createPrivilege"]),
  },

  watch: {
    "selectedOption.p_id": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },

    "selectedOption1.id": function (newVal1, oldVal1) {
      this.handleSelectedOptionChange1(newVal1);
    },
  },

  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.projectData = data.message;
      })
      .catch((err) => console.log(err.message));

    fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.vendorData = data.message;
      })
      .catch((err) => console.log(err.message));

    document.addEventListener("click", this.handleClickOutside);

    this.generatePOID();

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
