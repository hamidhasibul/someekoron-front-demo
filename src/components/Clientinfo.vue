<template>
  <div
    class="tab-pane p-3 fade active show"
    id="nav-client-info"
    role="tabpanel"
    aria-labelledby="nav-client-info-tab"
  >
    <div class="row w-75 mb-0">
      <div class="col-lg-6 mb-2">
        <label for="quotation_id" class="form-label text-muted fs-13 fw-bold"
          >Quotation ID<span class="fs-15 text-danger">*</span></label
        >
        <input
          readonly
          id="quotation_id"
          v-model="quotation_id"
          type="text"
          class="form-control rounded-0 border-muted shadow-none inputa"
        />
      </div>

      <div class="col-lg-6 mb-2">
        <div class="dropdown" ref="dropdown">
          <label for="org_name" class="form-label text-muted fs-13 fw-bold"
            >Organization Name<span class="fs-15 text-danger">*</span
            ><span class="fs-14 text-muted"
              ><b-button
                v-b-tooltip.hover
                title="The customer list displays the name of the organization prominently."
              >
                <i class="fa-solid fa-circle-info ms-1"></i> </b-button></span
          ></label>
          <input
            autocomplete="false"
            type="text"
            id="org_name"
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
                <small>
                  <p class="fs-12 mb-0">
                    {{ result.badd }}
                  </p>
                  <p class="fs-12 mb-0">
                    {{ result.bcity }} - {{ result.bzip }}, {{ result.bcountry }}
                  </p>
                  
                </small>
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
    </div>

    <div v-if="isCustomerVisible">
      <div class="row w-75 mb-0">
        <div class="col-lg-12 mb-2">
          <div class="rounded bg-light d-flex">
            <div class="w-20" style="border-right: 1px dashed #95ccff">
              <p class="m-0 fs-12 font-weight-600 p-2">
                <i class="fa-solid fa-circle-info me-1 text-muted"></i
                >Organization Info
              </p>
            </div>
            <div class="p-2">
              <p class="m-0 fs-14 font-weight-600">{{ org_name }}</p>
              <p
                class="m-0 fs-12"
                style="color: #565656; white-space: pre-line"
              >
                {{ org_loc }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-2 d-none">
          <label for="org_loc" class="form-label text-muted fs-13 fw-bold"
            >Organization Location<span class="fs-15 text-danger"
              >*</span
            ></label
          >
          <input
            id="org_loc"
            v-model="org_loc"
            type="text"
            class="form-control rounded-0 border-muted shadow-none inputa"
            :disabled="isCustomerVisible"
          />
        </div>

        <div class="col-lg-12 mb-2">
          <label for="project_name" class="form-label text-muted fs-13 fw-bold"
            >Project Name<span class="fs-15 text-danger">*</span></label
          >
          <input
            id="project_name"
            v-model="project_name"
            type="text"
            class="form-control rounded-0 border-muted shadow-none inputa"
          />
        </div>

        <div class="col-lg-12 mb-3">
          <label for="project_desc" class="form-label text-muted fs-13 fw-bold"
            >Project Description<span class="fs-15 text-danger">*</span></label
          >
          <textarea
            id="project_desc"
            v-model="project_desc"
            class="form-control rounded-0 border-muted shadow-none"
            rows="3"
            placeholder="Type description here . . ."
          ></textarea>
        </div>
        <!-- <div class="col-lg-6 mb-2">
          <label for="org_loc" class="form-label text-muted fs-13 fw-bold"
            >Customer PR</label
          >
          <input
            id="org_loc"
            v-model="customerPR"
            type="text"
            class="form-control rounded-0 border-muted shadow-none inputa"
          />
        </div> -->
        <hr class="mb-2" />

        <div class="col-lg-6 mb-2">
          <label
            for="kind-attention"
            class="form-label text-muted fs-13 fw-bold"
            >Kind Attention<span class="fs-15 text-danger">*</span></label
          >
          <input
            id="kind-attention"
            v-model="kind_attention"
            type="text"
            class="form-control rounded-0 border-muted shadow-none inputa"
          />
        </div>

        <div class="col-lg-6 mb-2">
          <label
            for="kind-designtaion"
            class="form-label text-muted fs-13 fw-bold"
            >Designtation<span class="fs-15 text-danger">*</span></label
          >
          <input
            id="kind-designtaion"
            v-model="kind_designation"
            type="text"
            class="form-control rounded-0 border-muted shadow-none inputa"
          />
        </div>

        <div class="col-lg-6 mb-2">
          <label
            for="contact_person"
            class="form-label text-muted fs-13 fw-bold"
            >Contact Person<span class="fs-15 text-danger">*</span></label
          >

          <select
            class="form-select rounded-0 border-muted shadow-none inputa"
            id="contact_person"
            v-model="pocID"
            aria-label="Default select example"
            @change="getPOCbyID(pocID)"
          >
            <option v-if="this.contact_person" value="">
              {{ this.contact_person }} (Selected)
            </option>
            <option v-else value="">Choose Contact Person</option>

            <option v-for="item in customerPOC" :key="item.id" :value="item.id">
              {{ item.poc_name }}
            </option>
          </select>
        </div>

        <div class="col-lg-6 mb-2">
          <label
            for="contact_mobile"
            class="form-label text-muted fs-13 fw-bold"
            >Contact Person Mobile<span class="fs-15 text-danger"
              >*</span
            ></label
          >
          <input
            id="contact_mobile"
            v-model="contact_mobile"
            type="text"
            class="form-control rounded-0 border-muted shadow-none inputa"
            disabled
          />
        </div>
        <div class="col-md-6 mb-2">
          <label for="contact_email" class="form-label text-muted fs-13 fw-bold"
            >Contact Person Email<span class="fs-15 text-danger">*</span></label
          >
          <input
            id="contact_email"
            v-model="contact_email"
            type="email"
            class="form-control rounded-0 border-muted shadow-none inputa"
            disabled
          />
        </div>
      </div>
    </div>
    <div v-else class="col-lg-12">
      <p class="m-0 mt-3 fs-12 text-primary">
        <i class="fa-solid fa-circle-info ms-1"></i> Please select organization
        to fillup other information.
      </p>
    </div>

    <div class="col-lg-3 mt-3">
      <button @click="submitForm" class="border-0 w-100 action-button py-1">
        {{ isLoading ? "Processing . . ." : "Save & Next" }}
      </button>
    </div>
  </div>
</template>

<script>
import { customAlphabet } from "nanoid";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "Clientinfo",
  props: ["changeState"],
  data() {
    return {
      searchQuery: "",
      isCustomerVisible: false,
      showDropdown: false,
      searchResults: [],
      customer: [],
      quotation_id: "",
      org_id: "",
      org_name: "sdgdg",
      org_loc: "",
      customerPR: "",
      project_name: "",
      project_desc: "",
      contact_person: "",
      contact_mobile: "",
      contact_email: "",
      cname: "",
      customerID: "",
      customerPOC: [],
      pocID: "",
      isLoading: false,

      kind_attention: "",
      kind_designation: "",
    };
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

  methods: {
    fetchData() {
      this.$store.dispatch("fetchUserInfo");
    },

    successMsg(msg) {
      this.showToast(`${msg} Added!`, "success");
    },

    errMsg(error) {
      this.showToast(`Something went wrong!! ${error}`, "error");
    },

    warningMsg(msg) {
      this.showToast(msg, "warning");
    },

    showToast(message, type) {
      this.toast[type](message, {
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
      this.isCustomerVisible = true;
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
          console.log(res.message);
          this.org_name = res.message[0].cname;

          this.org_loc = `${res.message[0].badd}
           ${res.message[0].bcity} - ${res.message[0].bzip}, ${res.message[0].bcountry}.          
           `;

          this.customerID = res.message[0].c_id;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    submitForm() {
      if (
        this.quotation_id == "" ||
        this.org_name == "" ||
        this.org_loc == "" ||
        this.project_name == "" ||
        this.project_desc == "" ||
        this.contact_person == "" ||
        this.contact_mobile == "" ||
        this.contact_email == ""
      ) {
        this.warningMsg("Fill up the Required Fields!!");
        return false;
      }

      this.isLoading = true;

      const data = new FormData();
      data.append("q_id", this.quotation_id);
      data.append("c_id", this.customerID);
      data.append("org_name", this.org_name);
      data.append("org_location", this.org_loc);
      data.append("project_name", this.project_name);
      data.append("project_des", this.project_desc);
      data.append("kind_attention", this.kind_attention);
      data.append("kind_designation", this.kind_designation);
      data.append("contact", this.contact_person);
      data.append("cp_phone", this.contact_mobile);
      data.append("cp_email", this.contact_email);
      data.append("customer_PR", this.customerPR);

      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addQuotation`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.isLoading = false;
              this.successMsg("Quotation's Client Info");
              localStorage.setItem("q_id", this.quotation_id);

              this.changeState();

              document.getElementById("nav-project-budget-tab").click();
            }, 1000);
          } else {
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg(res.message);
            }, 1000);
          }
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.errMsg(error);
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
          this.contact_email = res.message[0].poc_email;
          this.contact_mobile = res.message[0].poc_mobile;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    generateQuotationID() {
      // const date = new Date();
      // const year = String(date.getFullYear()).slice(-2);
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const timestamp = String(date.getTime()).slice(-5);
      // this.quotation_id = `Q${year}${month}${day}${timestamp}`;

      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.quotation_id = `Q${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },

    getCustomerData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.customer = data.message;
        })
        .catch((err) => console.error(err.message));
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.getCustomerData();
    if (this.$route.query.editq_id) {
      console.log("first", this.$route.query.editq_id);
      this.quotation_id = localStorage.getItem("q_id");

      const data = new FormData();
      data.append("q_id", this.quotation_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("as", data);
          this.isCustomerVisible = true;
          this.q_id = data.message[0].q_id;
          this.customerID = data.message[0].c_id;
          this.org_name = data.message[0].org_name;
          this.searchQuery = data.message[0].org_name;
          this.org_loc = data.message[0].org_location;
          this.project_name = data.message[0].project_name;
          this.project_desc = data.message[0].project_des;
          this.contact_person = data.message[0].contact;
          this.contact_mobile = data.message[0].cp_phone;
          this.contact_email = data.message[0].cp_email;
          this.customerPR = data.message[0].customer_PR;

          this.getCustomerbyName(data.message[0].c_id);
          this.getCustomerPOC(data.message[0].c_id);
          document.getElementById("contact_person").value =
            data.message[0].contact;
        })
        .catch((err) => console.error(err.message));
    } else this.generateQuotationID();

    this.fetchData();
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
