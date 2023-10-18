<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Vendor Data</p>
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
          <div class="col-lg-2" v-if="createPrivilege.includes('vendorlist')">
            <router-link to="/vendoradd" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i>Add Vendor</router-link
            >
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <table class="table">
              <thead>
                <tr class="thead-color border-bottom">
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4" width="10%">#ID</th>

                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Vendor Name</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="20%">Vendor Location</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="12%">POC Name</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="12%">POC Mobile</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600 pe-2" width="18%">POC Email</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600 pe-2" width="8%">Action</th>
                </tr>
              </thead>

              <tbody class="border-0">
                <tr v-if="vendor && vendor.length === 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/noData.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no vendor data available!<br />
                        <span class="fs-12"
                          >Click the 'Add Vendor' button to add new vendor and populate the table.</span
                        >
                      </p>
                    </div>
                  </td>
                </tr>

                <tr class="shadowItem" v-for="item in vendor" :key="item.id">
                  <td scope="col" class="border-0 fs-12 ps-4">
                    {{ item.v_id }}
                  </td>
                  <td scope="col" class="border-0 fs-12 text-start font-weight-600">
                    <span class="d-inline-block text-truncate" style="max-width: 250px; color: #119074">{{
                      item.vname
                    }}</span>
                  </td>

                  <td scope="col" class="border-0 fs-12">
                    <span class="d-inline-block text-truncate" style="max-width: 250px"> {{ item.v_location }}</span>
                  </td>

                  <td class="border-0 fs-12">
                    <p class="mb-0 px-0">{{ item.poc_name }}</p>
                  </td>

                  <td scope="col" class="border-0 fs-12">
                    <p class="mb-0 px-0">{{ item.poc_contact }}</p>
                  </td>
                  <td scope="col" class="border-0 fs-12">
                    <p class="mb-0 px-0">{{ item.poc_email }}</p>
                  </td>

                  <td scope="col" class="d-flex text-end border-0 fs-12">
                    <p
                      class="mb-0 px-0 pe-3"
                      style="color: rgb(116, 116, 116)"
                      v-if="viewPrivilege.includes('vendorlist')"
                    >
                      <router-link :to="`/vendorview/${item.v_id}`">
                        <!-- <i
                          class="fa-solid fa-eye pe-auto"
                          style="color: rgb(116, 116, 116)"
                        ></i> -->
                        <i class="fa-solid fa-circle-arrow-right me-1 ps-0"></i>
                        Open</router-link
                      >
                    </p>

                    <!-- employee info canvas -->

                    <p class="mb-0 px-0" style="color: rgb(116, 116, 116)">
                      <!-- <i
                        class="fa-solid fa-pen-to-square"
                        :data-bs-toggle="'modal'"
                        :data-bs-target="'#stock_update_' + item.id"
                        style="cursor: pointer"
                        v-if="editPrivilege.includes('vendorlist')"
                      ></i> -->
                    </p>

                    <!-- modal edit -->
                    <div
                      v-for="item in vendor"
                      :key="item.id"
                      class="modal fade"
                      :id="'stock_update_' + item.id"
                      tabindex="-1"
                      :aria-labelledby="'stock_update_label_' + item.id"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-custom modal-xl">
                        <div class="modal-content modal-content-custom">
                          <div class="modal-header">
                            <h6 class="modal-title text-start" id="staticBackdropLabel">Vendor Edit</h6>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col-lg-12 mb-3 ps-4 text-start">
                                <p class="mb-0 fs-12">
                                  <span class="text-primary font-weight-600">*Note:</span>
                                  Please carefully read and check the following information before updating stock in the
                                  system. May result in delays or errors in processing your project.
                                </p>
                              </div>

                              <div class="col-lg-6">
                                <div class="row text-start">
                                  <div class="col-lg-1"></div>
                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">Vendor ID</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <p class="form-control rounded-0 border-muted shadow-none inputa bg-muted">
                                      {{ item.v_id }}
                                    </p>
                                  </div>
                                  <div class="col-lg-2"></div>

                                  <div class="col-lg-1"></div>
                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">Vendor Name</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <p class="form-control rounded-0 border-muted shadow-none inputa bg-muted">
                                      {{ item.vname }}
                                    </p>
                                  </div>
                                  <div class="col-lg-2"></div>

                                  <div class="col-lg-1"></div>
                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">Vendor Location</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="up_date"
                                      v-model="item.v_location"
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                  <div class="col-lg-2"></div>
                                </div>
                              </div>
                              <div class="col-lg-6">
                                <div class="row text-start">
                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">POC</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="up_date"
                                      v-model="item.poc_name"
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                  <div class="col-lg-3"></div>

                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">POC Contact</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="up_date"
                                      v-model="item.poc_contact"
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                  <div class="col-lg-3"></div>

                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">POC Email</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="stock"
                                      v-model="item.poc_email"
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn close-button" data-bs-dismiss="modal">
                              <i class="fa-regular fa-circle-xmark me-1"></i>
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn action-button"
                              data-bs-dismiss="modal"
                              @click="
                                updateVendor(item.id, item.v_location, item.poc_name, item.poc_contact, item.poc_email)
                              "
                            >
                              {{ loading ? "Loading" : "Save changes" }}
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

          <div v-if="vendor && vendor.length != 0" class="col-lg-12">
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
  name: "VendorList",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      vendor: null,
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
    getVendorList(page) {
      const data = new FormData();
      data.append("searchText", this.searchText);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getSortedVendorData?page=${page}`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.vendor = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getVendorList(newPage);
      }
    },

    auth() {
      if (!this.viewPrivilege.includes("vendorlist")) {
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

    // modal

    updateVendor(id, v_location, poc_name, poc_contact, poc_email) {
      if (id == "" || v_location == "" || poc_name == "" || poc_contact == "" || poc_email == "") {
        this.warningMsg("Add All Required Information");
        return false;
      }

      this.loading = true;
      const data = new FormData();

      data.append("id", id);
      data.append("v_location", v_location);
      data.append("poc_name", poc_name);
      data.append("poc_contact", poc_contact);
      data.append("poc_email", poc_email);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UpdateVendorInfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg();

              this.update = this.update + 1;
            }, 1000);
          } else {
            this.errMsg();
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.loading = false;
        });
    },

    async fetchData() {
      this.$store.dispatch("fetchUserInfo");
      const id = localStorage.getItem("userID");
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
  },

  async mounted() {
    this.getVendorList(this.currentPage);

    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
  },

  watch: {
    searchText(newVal) {
      this.getVendorList(this.currentPage);
    },
  },
};
</script>

<style></style>
