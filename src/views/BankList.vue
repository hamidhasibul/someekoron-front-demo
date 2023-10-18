<template>
  
  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Bank List</p>
          </div>

          <div class="col-lg-3">
            <div class="input-group rounded">
              <input
                v-model="searchText"
                type="search"
                class="form-control rounded shadow-none searchbox"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="col-lg-2" v-if="createPrivilege.includes('banklist')">
            <router-link to="/bankadd" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i>Add Bank</router-link
            >
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <table class="table">
              <thead>
                <tr class="thead-color border-bottom">
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4" width="20%">Bank Name</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="10%">Branch Name</th>
                  <th scope="col" class="border-0 fs-13 tesxt-start text-muted font-weight-600" width="20%">
                    Account Number
                  </th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Routing No</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="13%">Balance</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600 pe-2" width="10%">Action</th>
                </tr>
              </thead>
              <tbody class="border-0">
                <tr v-if="bank && bank.length === 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/noData.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no bank data available!<br />
                        <span class="fs-12">Click the 'Add Bank' button to add new bank and populate the table.</span>
                      </p>
                    </div>
                  </td>
                </tr>

                <tr class="shadowItem" v-for="ar in bank" :key="ar.b_id">
                  <td class="border-0 fs-12 font-weight-600 text-start ps-4" width="20%">
                    <span class="d-inline-block text-truncate" style="max-width: 250px; color: #119074">{{
                      ar.bank_name
                    }}</span>
                  </td>
                  <td class="border-0 fs-12 fw-bold text-start" width="10%">
                    {{ ar.branch_name }}
                  </td>
                  <td width="20%" class="border-0 fs-12 text-start">
                    {{ ar.acc_number }}
                  </td>
                  <td width="15%" class="border-0 fs-12 text-start">
                    {{ ar.routing_number }}
                  </td>
                  <td width="13%" class="border-0 fs-12 text-start">
                    <span class="py-1 px-2 fs-11 font-weight-600 button-blue">
                      {{ parseFloat(ar.o_balance).toFixed(2) }} {{ orgInfo.currency }}
                    </span>
                  </td>
                  <td scope="col" class="d-flex border-0 fs-12">
                    <p class="mb-0 me-2 px-0" style="color: rgb(116, 116, 116)">
                      <router-link :to="`/bankoverview/${ar.b_id}`">
                        <i class="fa-solid fa-eye" style="color: rgb(116, 116, 116)"> </i>
                      </router-link>
                    </p>

                    <!-- <p
                      class="mb-0 px-0 me-2"
                      style="color: rgb(116, 116, 116)"
                      v-if="viewPrivilege.includes('banklist')"
                    >
                      <i class="fa-solid fa-eye pe-auto" type="button" @click="showOffcanvas(ar.b_id)"></i>
                    </p>

                    

                    <div
                      class="offcanvas offcanvas-end"
                      tabindex="-1"
                      v-bind:id="'offcanvasRight_' + ar.b_id"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div class="offcanvas-header py-3">
                        <p id="offcanvasRightLabel" class="fs-16 mb-0">Bank Information</p>
                        <button
                          type="button"
                          class="btn-close text-reset"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                          @click="closeOffcanvas(ar.b_id)"
                        ></button>
                      </div>

                      <div class="offcanvas-body">
                        <div class="row text-center my-4">
                          <div class="col-lg-12">
                            <p class="m-0 fs-18 text-muted font-weight-600">
                              {{ ar.bank_name }}
                            </p>
                          </div>
                          <div class="col-lg-4"></div>
                          <div class="col-lg-4 py-2 mb-1 text-center">
                            <p class="m-0 rounded-pill bg-primary text-white">
                              {{ ar.branch_name }}
                            </p>
                          </div>
                          <div class="col-lg-4"></div>
                        </div>

                        <div>
                          <div class="d-flex align-items-center border-bottom py-2">
                            <p class="w-50 m-0 fs-12 font-weight-600">Routing No.</p>
                            <p class="m-0">{{ ar.routing_number }}</p>
                          </div>
                          <div class="d-flex align-items-center border-bottom py-2">
                            <p class="w-50 m-0 fs-12 font-weight-600">Account Number</p>
                            <p class="m-0">{{ ar.acc_number }}</p>
                          </div>
                          <div class="d-flex align-items-center border-bottom py-2">
                            <p class="w-50 m-0 fs-12 font-weight-600">Balance</p>
                            <p class="m-0">{{ ar.o_balance }}</p>
                          </div>
                        </div>
                      </div>
                    </div> -->

                    <!-- bank info canvas -->

                    <!-- modal edit -->

                    <p
                      class="mb-0 px-0 ms-2"
                      style="color: rgb(116, 116, 116)"
                      v-if="viewPrivilege.includes('banklist')"
                    >
                      <i
                        class="fa-solid fa-trash-can pe-auto"
                        type="button"
                        data-bs-toggle="modal"
                        :data-bs-target="`#BankDelete${ar.b_id}`"
                      ></i>
                    </p>

                    <div
                      :id="'BankDelete' + ar.b_id"
                      class="modal fade"
                      tabindex="-1"
                      aria-labelledby="confirmRFQStatusLabel"
                      aria-hidden="true"
                      style="z-index: 1000000"
                    >
                      <div class="modal-dialog modal-dialog-custom">
                        <div class="modal-content modal-content-custom">
                          <div class="modal-header">
                            <p class="fs-16 mb-1" id="confirmRFQStatusLabel">
                              <img src="../assets/image/alert.png" class="alert-icon me-1" alt="" srcset="" />
                              Mark this Bank ({{ ar.b_id }}) as Deleted! Are you sure?
                            </p>
                          </div>
                          <div class="p-2 d-flex justify-content-end">
                            <button type="button" class="btn close-button me-2" data-bs-dismiss="modal">
                              <i class="fa-regular fa-circle-xmark me-1"></i> No
                            </button>
                            <button
                              data-bs-dismiss="modal"
                              @click="deleteBank(ar.b_id)"
                              type="button"
                              class="btn action-button"
                            >
                              <i class="fa-regular fa-circle-check me-1"></i>Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="bank && bank.length != 0" class="col-lg-12">
            <div class="d-flex justify-content-end my-3">
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="changePage(currentPage - 1)">
                      <i class="fa-solid fa-chevron-left fs-12"></i>
                    </button>
                  </li>
                  <li
                    v-for="page in totalPages"
                    :key="page"
                    class="page-item"
                    :class="{ active: currentPage === page }"
                  >
                    <button class="page-link" @click="changePage(page)">
                      {{ page }}
                    </button>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="changePage(currentPage + 1)">
                      <i class="fa-solid fa-chevron-right fs-12"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <!-- Side Projects -->
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
export default {
  name: "banklist",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      bank: null,
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      // toast
      loading: false,
      update: 0,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    getBankList(page) {
      const data = new FormData();
      data.append("searchText", this.searchText);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getSortedBankData?page=${page}`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.bank = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getBankList(newPage);
      }
    },
    auth() {
      if (!this.viewPrivilege.includes("banklist")) {
        this.$router.push("/dashboard");
      }
    },
    // toast stuff
    errMsg(err) {
      this.toast.error(`Something went wrong!! ${err}`, {
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
      this.toast.success("Successfully Updated!", {
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

    warningMsg(msg) {
      this.toast.warning(`${msg}`, {
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

    // offcanvas

    showOffcanvas(bankId) {
      const offcanvas = document.getElementById("offcanvasRight_" + bankId);
      offcanvas.classList.add("show");
    },
    closeOffcanvas(bankId) {
      const offcanvas = document.getElementById("offcanvasRight_" + bankId);
      offcanvas.classList.remove("show");
    },

    deleteBank(id) {
      this.loading = true;
      const data = new FormData();
      data.append("b_id", id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/DeleteBank`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.update = this.update + 1;

          if (data.ok) {
            setTimeout(() => {
              this.toast.success(data.message, {
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
              this.isLoading = false;
              this.getData();
              this.getBankList(this.currentPage);
            }, 1000);
          } else {
            this.isLoading = false;
            this.errMsg(data.message);
            console.log(data.message);
          }
        })
        .catch((err) => console.log(err.message));
    },

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    async getData() {
      try {
        await this.fetchData();

        this.auth();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    this.getData();
    this.getBankList(this.currentPage);
  },
  computed: {
    ...mapState(["orgInfo"]),

    ...mapState(["userInfo"]),
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
  },
  watch: {
    searchText(newVal) {
      this.getBankList(this.currentPage);
    },
  },
};
</script>
<style></style>
