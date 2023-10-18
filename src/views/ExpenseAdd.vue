<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-10">
              <p class="mb-0 text-color fs-20">Generate Expense</p>
            </div>
          </div>
          <div class="row py-3 px-2">
            <div class="col-lg-8 mb-2">
              <p class="mb-0 fs-12">
                <span class="text-primary font-weight-600">*Note:</span>
                We request that you carefully read and check the following
                information before entering an
                <b>Expense</b> into the software.
                <br />
                <span class="note-space">
                  It is important that you follow these steps to prevent delays
                  or errors in the processing of your project.</span
                >
              </p>
            </div>
            <div class="col-lg-8">
              <div class="row p-2 mb-3">
                <div class="col-lg-3 mb-2">
                  <label
                    for="ex_id"
                    class="form-label text-muted fs-13 fw-bold"
                  >
                    Expense ID <span class="fs-15 text-danger">*</span>
                  </label>
                  <input
                    id="ex_id"
                    v-model="ex_id"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-3 mb-2">
                  <label
                    for="ex_date"
                    class="form-label text-muted fs-13 fw-bold"
                    >Date <span class="fs-15 text-danger">*</span>
                  </label>
                  <input
                    id="ex_date"
                    v-model="ex_date"
                    type="date"
                    class="form-control rounded-0 fs-14 inputa"
                  />
                </div>
                <!-- AR section 1 -->
                <div class="col-lg-6 mb-2">
                  <label
                    for="ex_type"
                    class="form-label text-muted fs-13 fw-bold"
                    >Expense Type
                    <span class="fs-15 text-danger">*</span></label
                  >

                  <select
                    v-model="ex_type"
                    class="form-select shadow-none rounded-0 border-muted py-1"
                    @change="handlehead"
                  >
                    <option value="">Choose Expense Type</option>
                    <!-- <option>Office Expense</option>
                    <option>Fixed Assets</option> -->
                    <option>Project</option>
                  </select>
                </div>
                <div class="col-lg-6 mb-2">
                  <label
                    for="ex_head"
                    class="form-label text-muted fs-13 fw-bold"
                    >Expense Head
                    <span class="fs-15 text-danger">*</span></label
                  >

                  <select
                    v-model="selectedEhead"
                    class="form-select shadow-none rounded-0 border-muted py-1"
                  >
                    <option value="" disabled>Choose Expense Head</option>
                    <option
                      v-for="(item, index) in Expenseheadlist"
                      :key="index"
                      :value="item.account_id"
                    >
                      {{ item.account_name }}
                    </option>
                  </select>
                </div>

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
                    for="employee"
                    class="form-label text-muted fs-13 fw-bold"
                    >Expense By
                  </label>
                  <div class="dropdown">
                    <div
                      @click="toggleDropdown1"
                      @custom-event="handleCustomEvent(selectedOption1.id)"
                      class="border rounded form-select py-1"
                    >
                      {{
                        selectedOption1
                          ? selectedOption1.ename
                          : "Select Expense By"
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

                <div class="col-lg-6 mb-2" v-if="ex_type == 'Project'">
                  <label
                    for="ex_id"
                    class="form-label text-muted fs-13 fw-bold"
                  >
                    Project ID
                  </label>
                  <select
                    v-model="project_id"
                    class="form-select shadow-none rounded-0 border-muted py-1"
                    @change="addprojectname"
                  >
                    <option v-for="item in projectlist" :key="item.id">
                      {{ item.p_id }}
                    </option>
                  </select>
                </div>
                <div class="col-lg-6 mb-2" v-if="ex_type == 'Project'">
                  <label
                    for="ex_id"
                    class="form-label text-muted fs-13 fw-bold"
                  >
                    Project Name
                  </label>
                  <input
                    id="ex_id"
                    v-model="project_name"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
              </div>
            </div>

            <hr />
            <div class="col-lg-12">
              <div class="row px-2 my-2">
                <div class="col-lg-12 fs-14">
                  <b>Item List <span class="fs-15 text-danger">*</span></b>
                </div>

                <div class="col-lg-12 mt-2">
                  <div class="bg-white border">
                    <div class="container">
                      <div
                        class="row py-1 pb-2 fs-13 font-family thead-color font-weight-600"
                      >
                        <div class="col-lg-4 text-start">Item</div>
                        <div class="col-lg-5 text-center">Note</div>
                        <!-- <div class="col-lg-2 text-end">Vat(%)</div> -->
                        <div class="col-lg-2 text-center">Amount</div>
                        <div class="col-lg-1 text-center">Action</div>
                      </div>

                      <form v-on:submit="addItem">
                        <div class="row border-bottom">
                          <div class="col-lg-4 px-1 border-end py-1">
                            <input
                              type="text"
                              id="i_name"
                              class="form-control rounded-0 border-0 shadow-none px-1"
                              placeholder="Type item name"
                              v-model="i_name"
                            />
                          </div>

                          <div class="col-lg-5 px-1 border-end py-1">
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

                          <!-- <div class="col-lg-2 px-1 text-end border-end py-1">
                            <input
                              type="number"
                              class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                              id="i_tax"
                              v-model="i_tax"
                              aria-describedby=""
                            />
                          </div> -->

                          <div class="col-lg-2 px-1 text-end border-end py-1">
                            <input
                              type="number"
                              class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                              id="i_rate"
                              v-model="i_rate"
                              aria-describedby=""
                              @input="calculatePrice"
                            />
                          </div>

                          <div class="col-lg-1 px-1 py-1 text-center">
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
                        v-for="(i_name, index) in item_array"
                        :key="index"
                      >
                        <div
                          class="col-lg-4 py-2 border-end text-start text-muted"
                        >
                          {{ i_name.i_name }}
                        </div>
                        <div
                          class="col-lg-5 py-2 border-end text-start text-muted"
                        >
                          {{ i_name.i_description }}
                        </div>
                        <!-- <div
                          class="col-lg-2 py-2 border-end text-end text-muted"
                        >
                          {{ i_name.i_tax }}
                        </div> -->
                        <div
                          class="col-lg-2 py-2 border-end text-end text-muted"
                        >
                          {{ i_name.i_rate }}
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
                          <div class="fs-14 py-2 font-weight-700">
                            TOTAL Expense ({{ orgInfo.currency }})
                          </div>
                        </div>
                        <div class="col-lg-2">
                          <div class="fs-12 py-2 text-end text-muted">
                            {{ subTotalPrice }}
                          </div>

                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <input
                                type="number"
                                class="form-control text-end rounded-0 border bg-light shadow-none inputa px-2 mb-1"
                                id="adjustment"
                                v-model="vattax"
                                aria-describedby=""
                                @input="calculateTax"
                                step="0.01"
                              />
                            </div>
                            <div
                              class="fs-12 py-2 px-2 text-end text-muted ms-2"
                            >
                              {{ vatAmount.toFixed(2) }}
                            </div>
                          </div>

                          <div class="fs-14 py-2 text-end font-weight-700">
                            {{ (subTotalPrice + vatAmount).toFixed(2) }}
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
                    for="payment_mode"
                    class="form-label text-muted fs-13 fw-bold"
                    >Payment Mode
                    <span class="fs-15 text-danger">*</span></label
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

              <div class="row p-2 mb-1">
                <div class="col-lg-6 mb-2">
                  <label
                    for="imageURL"
                    class="form-label text-muted fs-13 fw-bold"
                    >Expense Reciept Image</label
                  >
                  <input
                    type="file"
                    accept="image/*"
                    ref="imageInput"
                    @change="ImageUpload"
                  />
                  <p class="fs-10 m-0 text-primary">
                    Preferred Image Size: 512px x 512px @ 150 DPI Maximum size
                    of 1MB.
                  </p>
                </div>
              </div>

              <div class="row p-2 mb-1">
                <div class="col-lg-3 my-3">
                  <button
                    @click="submitEX"
                    class="border-0 w-100 action-button py-1"
                    :disabled="loading"
                  >
                    <span v-if="loading">Loading...</span>
                    <span v-else>Add Expense</span>
                  </button>
                </div>
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
  name: "expense",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      // Expense States

      ex_id: "",
      ex_date: "",
      ex_head: "",
      ex_type: "",
      project_id: "",
      project_name: "",
      selectedOption1: 0,
      searchQuery1: "",
      isDropdownOpen1: false,
      file: "",
      exdec: "",
      totalTaxAmount: 0,
      subTotalPriceNew: "",
      item_array: [],
      i_rate: "",
      i_tax: "",
      i_description: "",
      i_name: "",
      selectedBank: "",
      selectedEhead: "",
      check: "",
      reference: "",
      payment_mode: "",
      employee: "",
      employeeData: [],
      projectlist: [],
      projectspname: [],
      Expenseheadlist: [],
      banklist: [],
      employeeName: "",

      vattax: 0,

      vatAmount: 0,

      // toast property
      loading: false,
      loadingTime: 1000,

      dragbox: "",

      imageUrl: null,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  computed: {
    ...mapState(["orgInfo"]),

    ehead() {
      return this.selectedEhead;
    },
    ehead_name() {
      const eHeadObj = this.Expenseheadlist.find(
        (ehead) => ehead.account_id === this.selectedEhead
      );
      return eHeadObj ? eHeadObj.account_name : "";
    },

    bank_name() {
      const selectedBankObj = this.Expenseheadlist.find(
        (bank) => bank.b_id === this.selectedBank
      );
      return selectedBankObj ? selectedBankObj.bank_name : "";
    },

    b_id() {
      return this.selectedBank;
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
    "selectedOption1.id": function (newVal, oldVal) {
      this.handleSelectedOptionChange1(newVal);
    },
  },

  methods: {
    auth() {
      if (!this.createPrivilege.includes("expenselist")) {
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
      this.toast.success("Expense Added!", {
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

          // console.log(res.message);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    search() {
      // Perform search functionality
      // Simulating search results for demonstration

      this.showDropdown = true;
    },

    //
    toggleDropdown1() {
      this.isDropdownOpen1 = !this.isDropdownOpen1;
    },
    selectOption1(employee) {
      this.selectedOption1 = employee;
      this.isDropdownOpen1 = false;
    },
    handleSelectedOptionChange1(value) {
      // console.log("Selected Option changed:", value);
      const data = new FormData();
      data.append("id", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getemployeeDataByName`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message[0]);
          this.employeeName = res.message[0].ename;
          this.employeeID = res.message[0].e_id;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // drag-drop-box
    // ImageDrop(event) {
    //   this.dragbox = event.target.files[0];
    // },

    ImageUpload(e) {
      if (e.target.files[0]?.name !== undefined) {
        const fileInput = e.target.files[0];

        if (fileInput) {
          const allowedFileTypes = ["jpg", "jpeg", "png"];
          const fileType = fileInput.name.split(".").pop().toLowerCase();

          if (!allowedFileTypes.includes(fileType)) {
            this.toast.warning("File type must be jpg or png", {
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
          } else {
            const maxSizeInBytes = 1024 * 1024;
            if (fileInput.size > maxSizeInBytes) {
              this.toast.warning("Maximum file size is 1MB", {
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
            } else {
              const img = new Image();
              img.src = URL.createObjectURL(fileInput);

              img.onload = () => {
                const width = img.width;
                const height = img.height;

                if (width > 512 && height > 512) {
                  this.toast.warning("Preferred image size is 512px x 512px", {
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
                } else {
                  this.file = e.target.files[0];
                }
              };
            }
          }
        }
      }
    },
    // processImage(file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.dragbox = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    //   this.$refs.imageInput.value = "";
    // },
    // openImageInput() {
    //   this.$refs.imageInput.click();
    // },

    // Add Table

    addItem(e) {
      e.preventDefault();

      // if (
      //   localStorage.getItem("ex_id") === "" ||
      //   this.i_name === "" ||
      //   this.i_description === "" ||
      //   this.i_tax === "" ||
      //   this.i_rate === ""
      // ) {
      //   return false;
      // }

      const newObject = {
        ex_id: localStorage.getItem("ex_id"),
        i_name: this.i_name,
        i_description: this.i_description,
        i_tax: this.i_tax,
        i_rate: this.i_rate,

        amount: parseFloat(this.i_rate),
        taxAmount: (parseFloat(this.i_rate) * parseFloat(this.i_tax)) / 100,
      };

      this.item_array.push(newObject);

      this.i_name = "";
      this.i_description = "";
      this.i_tax = 0;
      this.i_rate = 0;
    },

    // submission

    submitEX() {
      if (
        this.ex_id == "" ||
        this.ex_date == "" ||
        this.ex_type == "" ||
        this.selectedEhead == "" ||
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

      data.append("ex_id", this.ex_id);
      data.append("cdate", this.ex_date);
      data.append("ehead", this.ehead);
      data.append("exp_type", this.ex_type);
      data.append("pid", this.project_id);
      data.append("pname", this.project_name);
      data.append("p_mode", this.payment_mode);
      data.append("reference", this.reference);
      data.append("bname", this.bank_name);
      data.append("bank_ID", this.b_id);
      data.append("check_no", this.check);
      data.append("employee_id", this.employeeID);
      data.append("empoloyee_name", this.employeeName);
      data.append("ex_des", this.ehead_name);
      data.append("ex_img", this.file);
      data.append("st_amount", this.subTotalPriceNew);
      data.append("vatpercent", +this.vattax);
      data.append("t_tax", +this.vatAmount);
      data.append("t_amount", this.subTotalPriceNew + this.vatAmount);

      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addExpense`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);

          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg();
              this.bankTransactionProcess();
              router.push(`/expenseoverview/${this.ex_id}`);
              this.ex_id = "";
              this.ex_date = "";
              this.ex_type = "";
              this.ex_head = "";
              this.project_id = "";
              this.project_name = "";
              this.item_array = [];
              this.payment_mode = "";
            }, this.loadingTime);
            this.SubmitInvoice();
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
      data.append("date", this.ex_date);
      data.append("payID", this.ex_id);
      data.append(
        "particular",
        `PayID - ${this.ex_id}, Project Name - ${this.project_name}`
      );
      data.append("debit", this.subTotalPriceNew + this.vatAmount);
      data.append("credit", "0");
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

    SubmitInvoice() {
      this.item_array.map((i_name) => {
        const data = new FormData();

        data.append("ex_id", this.ex_id);
        data.append("item", i_name.i_name);
        data.append("des", i_name.i_description);
        data.append("tax", 0);
        data.append("amount", parseFloat(i_name.i_rate));

        fetch(`${process.env.VUE_APP_SERVER_URL}/addExpenseItem`, {
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
      });
    },

    deleteTask(index) {
      this.item_array.splice(index, 1);
    },

    calculatePrice() {
      const qty = parseFloat(this.i_tax) || 0;
      const rate = parseFloat(this.i_rate) || 0;

      const amount = qty * rate;

      this.price = amount;
    },

    getallproject() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.projectlist = data.message;
          // console.log(data.message);
        })
        .catch((err) => console.log(err.message));
    },
    addprojectname() {
      const data = new FormData();
      data.append("p_id", this.project_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.project_name = data.message[0].project_name;
          // console.log(data.message);
        })
        .catch((err) => console.log(err.message));
    },

    generateExID() {
      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getExpenseLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.ex_id = `EX${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },

    
    handlehead() {
      const data = new FormData();
      data.append("type", this.ex_type);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getAccountHeadbyType`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          this.Expenseheadlist = data.message;
        })
        .catch((err) => console.log(err.message));
    },
  },

  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getemployeeData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        this.employeeData = data.message;
      })
      .catch((err) => console.log(err.message));

    document.addEventListener("click", this.handleClickOutside);
    this.getallproject();
    // this.getExpensehead();
    this.bank();
    this.generateExID();

    this.handlehead();

    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
  beforeUnmount() {
    // Remove event listener before component unmounts
    document.removeEventListener("click", this.handleClickOutside);
  },

  updated() {
    console.log(this.ex_head);
  },
};
</script>

<style scoped></style>
