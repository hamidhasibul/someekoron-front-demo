<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Add Resource</p>
          </div>
        </div>
        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Please read and verify the following information before inputting
              <b>Resources</b> into the software to avoid processing errors or
              delays.
            </p>
          </div>
          <div class="p-3 ps-4">
            <div class="row w-75">
              <!-- AR section 1 -->

              <div class="col-lg-6 mb-2">
                <label class="form-label text-muted fs-13 fw-bold"
                  >Resource Type</label
                >
                <div class="d-flex">
                  <div class="form-check form-check-inline">
                    <input
                      id="general_stock"
                      v-model="resource_type"
                      class="form-check-input"
                      type="radio"
                      name="resourceType"
                      value="option1"
                      @change="handleResourceTypeChange"
                    />
                    <label for="general_stock" class="form-check-label fs-14"
                      >General Stock</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      id="project_resource"
                      v-model="resource_type"
                      class="form-check-input"
                      type="radio"
                      name="resourceType"
                      value="option2"
                      @change="handleResourceTypeChange"
                    />
                    <label for="project_resource" class="form-check-label fs-14"
                      >Project Resource</label
                    >
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <!-- <label class="form-label text-muted fs-13 fw-bold"
                          >PO ID</label
                        >
                        <input
                          type="text"
                          class="form-control rounded-0 border-muted shadow-none inputa"
                        /> -->
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="resource_id"
                  class="form-label text-muted fs-13 fw-bold"
                  >Resource ID<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="resource_id"
                  v-model="resource_id"
                  name="resource_id"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="resource_name"
                  class="form-label text-muted fs-13 fw-bold"
                  >Resource Name<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="resource_name"
                  v-model="resource_name"
                  name="resource_name"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2" v-if="showProjectNameField">
                <label
                  for="project_name"
                  class="form-label text-muted fs-13 fw-bold"
                  >Project Name</label
                >
                <div class="dropdown">
                  <div
                    @click="toggleDropdown"
                    @custom-event="
                      handleCustomEvent(selectedOption.project_name)
                    "
                    class="border rounded form-select py-1"
                  >
                    {{
                      selectedOption
                        ? selectedOption.project_name
                        : "Select Project Name"
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
                      v-for="project in filteredOptions"
                      :key="project.id"
                      @click="selectOption(project)"
                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                    >
                      <span class="fs-14">{{ project.project_name }}</span
                      ><br />
                      <span class="fs-11">{{ project.org_name }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="row align-items-center">
                  <div class="col-lg-9">
                    <label
                      for="quantity"
                      class="form-label text-muted fs-13 fw-bold"
                    >
                      Quantity<span class="fs-15 text-danger">*</span>
                    </label>

                    <input
                      type="number"
                      class="form-control py-1 rounded-0 border-muted shadow-none"
                      id="quantity"
                      v-model="quantity"
                      aria-describedby=""
                      @input="calculatePrice"
                    />
                  </div>
                  <div class="col-lg-3 ps-0 pt-4 mt-1">
                    <select
                      v-model="unit"
                      class="form-select shadow-none rounded-0 border-muted py-1"
                    >
                      <option value="" selected>Select</option>
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
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="total_cost"
                  class="form-label text-muted fs-13 fw-bold"
                  >Total Cost (Amount in {{ orgInfo.currency }})<span
                    class="fs-15 text-danger"
                    >*</span
                  ></label
                >
                <input
                  type="number"
                  class="form-control py-1 rounded-0 border-muted shadow-none"
                  id="total_cost"
                  v-model="total_cost"
                  aria-describedby=""
                  @input="calculatePrice"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="unit_cost"
                  class="form-label text-muted fs-13 fw-bold"
                  >Per Unit Cost<span class="fs-15 text-danger">*</span></label
                >
                <input
                  type="number"
                  class="form-control py-1 rounded-0 border-muted shadow-none"
                  id="unit_cost"
                  v-model="unit_cost"
                  aria-describedby=""
                  disabled
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="entry_date"
                  class="form-label text-muted fs-13 fw-bold"
                  >Entry Date<span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="entry_date"
                  v-model="entry_date"
                  type="date"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="vendor" class="form-label text-muted fs-13 fw-bold"
                  >Choose Vendor<span class="fs-15 text-danger">*</span></label
                >
                <div class="dropdown">
                  <div
                    @click="toggleDropdown1"
                    @custom-event="handleCustomEvent(selectedOption1.vname)"
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

              <!-- <div class="col-lg-6">
                <label for="r_img" class="form-label text-muted fs-13 fw-bold"
                  >Resource Image</label
                >
                <input id="r_img" @change="r_img" type="file" class="" />
              </div> -->
            </div>

            <div class="row justify-content-between align-items-center mt-4">
              <div class="col-lg-3">
                <button
                  @click="submitForm"
                  class="border-0 w-100 action-button py-1"
                  :disabled="loading"
                >
                  <span v-if="loading">Loading...</span>
                  <span v-else>Add Resource</span>
                </button>
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
import Footer from "../components/FooterView.vue";
import { customAlphabet } from "nanoid";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";
import router from "@/router";

export default {
  name: "addresource",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      resource_type: "option2",
      resource_id: "",
      projectData: "",
      resource_name: "",
      project_name: "",
      pr_name: "",
      quantity: "",
      unit: "Piece",

      projectData: [],
      selectedOption: 0,
      selectedOption1: 0,
      searchQuery: "",
      searchQuery1: "",
      isDropdownOpen: false,
      isDropdownOpen1: false,

      pid: "",

      vendorData: [],
      vn_id: "",
      vr_name: "",
      vendorname: "",
      vlocation: "",

      total_cost: 0,
      unit_cost: 0,
      entry_date: "",
      r_img: null,
      vendor: "",
      showProjectNameField: true,

      // toast property
      loading: false,
      loadingTime: 2000,
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
      return this.projectData.filter((project) =>
        project.project_name.toLowerCase().includes(query)
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

    ...mapState(["userInfo"]),
    ...mapState(["createPrivilege"]),
  },

  watch: {
    "selectedOption.project_name": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },

    "selectedOption1.vname": function (newVal1, oldVal1) {
      this.handleSelectedOptionChange1(newVal1);
    },
  },

  methods: {
    auth() {
      if (!this.createPrivilege.includes("resourcelist")) {
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
    calculatePrice() {
      const qty = this.quantity || 0;
      const cost = this.total_cost || 0;

      const unit_cost = cost / qty;
      this.unit_cost = unit_cost.toFixed(2);
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    selectOption(project) {
      console.log(project);
      this.pid = project.p_id;
      this.selectedOption = project;
      this.isDropdownOpen = false;
    },

    toggleDropdown1() {
      this.isDropdownOpen1 = !this.isDropdownOpen1;
    },
    selectOption1(vendor) {
      this.selectedOption1 = vendor;
      this.isDropdownOpen1 = false;
    },

    handleSelectedOptionChange(value) {
      const data = new FormData();
      data.append("project_name", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectDataByName`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.project_name = value;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handleSelectedOptionChange1(value) {
      const data = new FormData();
      data.append("vname", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorDataByName`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.vendorname = value;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    submitForm(e) {
      e.preventDefault();

      if (
        this.resource_id == "" ||
        this.resource_name == "" ||
        this.quantity == "" ||
        this.unit == "" ||
        this.total_cost == "" ||
        this.unit_cost == "" ||
        this.entry_date == "" ||
        this.vendorname == ""
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

      data.append("rid", this.resource_id);
      data.append("rname", this.resource_name);
      data.append("rType", this.resource_type);
      data.append("pid", this.pid);
      data.append("pname", this.project_name);
      data.append("qty", this.quantity);
      data.append("ptype", this.unit);
      data.append("tcost", this.total_cost);
      data.append("unitCost", this.unit_cost);
      data.append("edate", this.entry_date);
      data.append("invoice", this.r_img);
      data.append("vname", this.vendorname);

      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addResouceData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          localStorage.setItem("rid", this.resource_id);

          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg("Resource Added");
              router.push(`/resourcelist/`);

              this.resource_id = "";
              this.resource_name = "";
              this.quantity = "";
              this.unit = "";
              this.total_cost = "";
            }, this.loadingTime);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    invoice(event) {
      const file = event.target.files[0];
      this.r_img = file;
    },

    handleResourceTypeChange() {
      if (this.resource_type === "option1") {
        this.showProjectNameField = false;
        this.project_name = "";
      } else if (this.resource_type === "option2") {
        this.showProjectNameField = true;
      }
    },

    generateResourceID() {
      // const date = new Date();
      // const year = String(date.getFullYear()).slice(-2);
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const timestamp = String(date.getTime()).slice(-5);
      // this.resource_id = `R${year}${month}${day}${timestamp}`;

      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getResourceLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.resource_id = `R${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },
  },

  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.vendorData = data.message;
      })
      .catch((err) => console.error(err.message));

    fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.projectData = data.message;
      })
      .catch((err) => console.error(err.message));

    this.generateResourceID();

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
