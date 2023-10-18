<template>
  <div>
    
    <div class="container-fluid">
      <div class="row">
        
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-10">
              <p class="mb-0 text-color fs-20">Add Bank</p>
            </div>
          </div>
          <div class="row py-3 px-2">
            <div class="col-lg-8 mb-2">
              <p class="mb-0 fs-12">
                <span class="text-primary font-weight-600">*Note:</span>
                Please carefully fill the following form before entering
                <b>Bank</b> details in the software. <br />
                <span class="note-space">May result in delays or errors in processing your
                  transaction.</span>
              </p>
            </div>
            <div class="p-3 ps-4">
              <div class="row w-75">
                <div class="col-lg-6 mb-2">
                  <label for="bankname" class="form-label text-muted fs-13 fw-bold">Bank Name <span
                      class="fs-15 text-danger">*</span>
                  </label>
                  <input id="bankname" v-model="bankname" type="text"
                    class="form-control rounded-0 border-muted shadow-none fs-14 inputa"
                    placeholder="Example Bank Ltd." />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="branchname" class="form-label text-muted fs-13 fw-bold">Branch Name <span
                      class="fs-15 text-danger">*</span>
                  </label>
                  <input id="branchname" v-model="branchname" type="text"
                    class="form-control rounded-0 border-muted shadow-none fs-14 inputa" placeholder="Example Bank " />
                </div>
                <!-- AR section 1 -->

                <div class="col-lg-6 mb-2">
                  <label for="acc_num" class="form-label text-muted fs-13 fw-bold">Account Number
                    <span class="fs-15 text-danger">*</span></label>
                  <input id="acc_num" v-model="acc_num" type="number"
                    class="form-control rounded-0 border-muted shadow-none fs-14 inputa" placeholder="XXXXXXXXXXX" />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="route_num" class="form-label text-muted fs-13 fw-bold">Routing Number
                    <span class="fs-15 text-danger">*</span></label>
                  <input id="route_num" v-model="route_num" type="number"
                    class="form-control rounded-0 border-muted shadow-none inputa" placeholder="XXXXXXXXXX" />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="beginningbalance" class="form-label text-muted fs-13 fw-bold">Beginning Balance
                    <span class="fs-15 text-danger">*</span></label>
                  <input id="beginningbalance" v-model="beginningbalance" type="number"
                    class="form-control rounded-0 border-muted shadow-none inputa" />
                </div>
              </div>

              <hr />
              <div class="row w-75 mt-3">
                <div class="col-lg-4">
                  <button @click="submitForm" class="border-0 w-100 action-button py-1" :disabled="loading">
                    <span v-if="loading">Loading...</span>
                    <span v-else>Add Bank</span>
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
import { useToast } from "vue-toastification";
import { mapState } from "vuex";
import router from "@/router";

export default {
  name: "BankAdd",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      bank_id: "",
      bankname: "",
      branchname: "",
      acc_num: "",
      route_num: "",
      beginningbalance: 0,
      loading: false,
      loadingTime: 2000,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    auth() {
      if (!this.createPrivilege.includes("banklist")) {
        this.$router.push("/dashboard");
      }
    },
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
      this.toast.success("Bank Added!", {
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

    submitForm(e) {
      e.preventDefault();

      if (
        this.bankname == "" ||
        this.acc_num == "" ||
        this.route_num == "" ||
        this.beginningbalance == ""
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

      data.append("bank_name", this.bankname);
      data.append("branch_name", this.branchname);
      data.append("acc_number", this.acc_num);
      data.append("routing_number", this.route_num);
      data.append("o_balance", this.beginningbalance);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addBank`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);

          if (res.message === true) {
            console.log(res.insertedID);
            this.bankTransactionProcess(res.insertedID);
            router.push(`/banklist/`);
            setTimeout(() => {
              this.loading = false;
              this.successMsg();
              this.bankname = "";
              this.acc_num = "";
              this.route_num = "";
              this.beginningbalance = "";
            }, this.loadingTime);
          } else {
            this.errMsg();
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },

    bankTransactionProcess(id) {
      const data = new FormData();

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      data.append("b_id", id);
      data.append("date", formattedDate);
      data.append("particular", `Bank Opening Balance`);
      data.append("debit", "0");
      data.append("payID", "");
      data.append("credit", this.beginningbalance);
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
  },

  async mounted() {
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    ...mapState(["createPrivilege"]),
    ...mapState(["userInfo"]),
  },
};
</script>

<style></style>
