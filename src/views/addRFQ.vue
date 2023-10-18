<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Add RFQ</p>
          </div>
          <div class="col-lg-3"></div>
          <div class="col-lg-2"></div>
        </div>

        <div class="p-3 ps-4">
          <div class="row w-75">
            <div class="col-lg-6 mb-2">
              <div class="dropdown" ref="dropdown">
                <label
                  for="customer"
                  class="form-label text-muted fs-13 fw-bold"
                  >Customer Name<span class="fs-15 text-danger">*</span
                  ><span class="fs-14 text-muted"
                    ><b-button
                      v-b-tooltip.hover
                      title="The customer list displays the name of the organization prominently."
                    >
                      <i
                        class="fa-solid fa-circle-info ms-1"
                      ></i> </b-button></span
                ></label>
                <input
                  autocomplete="false"
                  type="text"
                  id="customer"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="Search Organization..."
                  v-model="searchQuery"
                  @input="search"
                />
                <div
                  v-if="showDropdown"
                  ref="dropdown"
                  class="fs-12 position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                >
                <template v-if="filteredResults.length > 0">
                  <p
                    class="my-2 px-2 dropclass mx-1 rounded py-2"
                    v-for="result in filteredResults"
                    :key="result.id"
                    @click="selectResult(result)"
                  >
                    <span class="fs-14">{{ result.cname }}</span
                    ><br />
                    <small>{{ result.cadd }}</small>
                  </p>
                </template>
                <template v-else>
              <p class="my-2 px-2 dropclass mx-1 rounded py-2">
                No results found.
              </p>
            </template>
                
                </div>
              </div>
            </div>

            <div class="col-lg-6 mb-2">
              <label for="req_date" class="form-label text-muted fs-13 fw-bold"
                >Request Date <span class="fs-15 text-danger">*</span>
              </label>
              <input
                id="req_date"
                v-model="req_date"
                type="date"
                class="form-control rounded-0 border-muted shadow-none fs-14 inputa"
                placeholder="Example Bank Ltd."
              />
            </div>

            <!-- AR section 1 -->

            <div class="col-lg-12 mb-2">
              <label
                for="quotation_for"
                class="form-label text-muted fs-13 fw-bold"
                >RFQ Details <span class="fs-15 text-danger">*</span></label
              >
              <textarea
                id="quotation_for"
                v-model="quotation_for"
                type="text"
                rows="2"
                class="form-control rounded-0 border-muted shadow-none fs-14"
              />
            </div>

            <div class="col-lg-6 mb-2">
              <label for="end_date" class="form-label text-muted fs-13 fw-bold"
                >Request Validity
                <span class="fs-15 text-danger">*</span></label
              >
              <input
                id="end_date"
                v-model="end_date"
                type="date"
                class="form-control rounded-0 border-muted shadow-none inputa"
              />
            </div>
            <div class="col-lg-6 mb-2">
              <label
                for="contact_person"
                class="form-label text-muted fs-13 fw-bold"
                >Contact Person<span class="fs-15 text-danger">*</span></label
              >
              <!-- <input
          id="contact_person"
          type="text"
          class="form-control rounded-0 border-muted shadow-none inputa"
        /> -->

              <select
                class="form-select rounded-0 border-muted shadow-none inputa"
                id="contact_person"
                v-model="pocID"
                aria-label="Default select example"
                @change="getPOCbyID(pocID)"
              >
                <option value="" Selected>Choose Contact Person</option>

                <option
                  v-for="item in customerPOC"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.poc_name }}
                </option>
              </select>
            </div>
          </div>

          <hr />
          <div class="row w-75 mt-3">
            <div class="col-lg-4">
              <button
                @click="submitForm"
                class="border-0 w-100 action-button py-1"
                :disabled="loading"
              >
                <span v-if="loading">Loading...</span>
                <span v-else>Add RFQ</span>
              </button>
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

import { mapState } from "vuex";
import { useToast } from "vue-toastification";
export default {
  name: "addRFQ",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      customer: "",
      req_date: "",
      quotation_for: "",
      end_date: "",
      status: "",

      customer: null,
      searchQuery: "",
      showDropdown: false,
      searchResults: [],

      pocID: "",

      // toast property
      loading: false,
      loadingTime: 2000,

      contact_person: "",
      cname: "",
      customerID: "",
      customerPOC: [],
    };
  },

  methods: {
    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
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
      this.toast.success("RFQ Added!", {
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

    search() {
      this.showDropdown = true;
    },
    selectResult(result) {
      this.getCustomerbyName(result.c_id);
      this.getCustomerPOC(result.c_id);

      this.searchQuery = result.cname;
      this.showDropdown = false;
    },
    handleClickOutside() {
      const dropdownElement = this.$refs.dropdown;
      if (!dropdownElement.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    getCustomerbyName(c_id) {
      const data = new FormData();

      data.append("c_id", c_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerDatabyID`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.customer = res.message[0].cname;

          this.org_loc = res.message[0].cadd;

          this.customerID = res.message[0].c_id;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getCustomerPOC(c_id) {
      const data = new FormData();

      data.append("c_id", c_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.customerPOC = res.message2;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getPOCbyID(id) {
      const data = new FormData();

      data.append("id", id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerPocById`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.contact_person = res.message[0].poc_name;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    submitForm() {
      if (
        this.customer == "" ||
        this.req_date == "" ||
        this.quotation_for == "" ||
        this.end_date == "" ||
        this.contact_person == ""
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

      data.append("customer", this.customer);
      data.append("req_date", this.req_date);
      data.append("quotation_for", this.quotation_for);
      data.append("end_date", this.end_date);
      data.append("customer_POC", this.contact_person);
      data.append("status", this.status);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addRFQ`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg();

              this.customer = "";
              this.req_date = "";
              this.quotation_for = "";
              this.end_date = "";
              this.contact_person = "";
            }, this.loadingTime);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  computed: {
    filteredResults() {
      if (!this.searchQuery) {
        return this.customer;
      }
      const searchQueryLower = this.searchQuery.toLowerCase();
      return this.customer.filter((result) =>
        result.cname.toLowerCase().includes(searchQueryLower)
      );
    },

    ...mapState(["userInfo"]),
  },

  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.customer = data.message;
      })
      .catch((err) => console.log(err.message));

    document.addEventListener("click", this.handleClickOutside);

    try {
      await this.fetchData();
    } catch (error) {
      console.log(error);
    }
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>
<style scoped>
.offcanvas {
  width: 55% !important;
}
</style>
