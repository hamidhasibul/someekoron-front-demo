<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-6">
            <p class="mb-0 text-color fs-20">Project Quote</p>
          </div>

          <div class="col-lg-4">
            <div class="d-flex align-items-center">
              <div class="me-2 w-50">
                <select
                  v-model="sortBy"
                  class="form-select sort-menu shadow-none"
                  aria-label="Default select example"
                >
                  <option value="All">All Quote</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Disapproved">Disapproved</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

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
          </div>

          <div class="col-lg-2" v-if="createPrivilege.includes('projectquery')">
            <router-link to="/projectque" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i>Make
              Quotation</router-link
            >
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <table class="table align-middle">
              <thead>
                <tr class="thead-color border-bottom">
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600 ps-4"
                    width="7%"
                  >
                    #ID
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="20%"
                  >
                    Project Name
                  </th>

                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="16%"
                  >
                    Organization
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="15%"
                  >
                    Contact Person
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="12%"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="10%"
                  >
                    Expiry Date
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="10%"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="10%"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-if="quotation && quotation.length == 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/noQuotation.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no quotation data available!<br />
                        <span class="fs-12"
                          >Click the 'Add New' button to add new quotation and
                          populate the table</span
                        >
                      </p>
                    </div>
                  </td>
                </tr>
                <tr
                  v-else
                  class="shadowItem"
                  v-for="item in quotation"
                  :key="item.id"
                >
                  <td
                    scope="col"
                    class="border-0 fs-12 fw-bold ps-4"
                    width="7%"
                  >
                    {{ item.q_id }}
                  </td>
                  <td
                    scope="col"
                    class="border-0 fs-12 font-weight-600"
                    width="20%"
                  >
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 250px; color: #119074"
                    >
                      {{ item.project_name }}</span
                    >
                  </td>
                  <td scope="col" class="border-0 fs-12" width="16%">
                    {{ item.org_name }}
                  </td>
                  <td scope="col" class="border-0 fs-12" width="15%">
                    {{ item.contact }}
                  </td>

                  <td class="border-0 fs-12" width="12%">
                    <span class="py-1 px-2 fs-11 font-weight-600 button-blue">
                      {{ parseFloat(item.tamount).toFixed(2) }}
                      {{ orgInfo.currency }}</span
                    >
                  </td>
                  <td scope="col" class="border-0 fs-12" width="10%">
                    <span
                      class="py-1 px-2 fs-11 font-weight-600 button-red"
                      v-if="item.quotation_exp !== ''"
                    >
                      {{ formatDate(item.quotation_exp) }}
                    </span>
                  </td>
                  <td class="border-0 fs-12 font-weight-600" width="10%">
                    <span
                      v-if="item.approvel_status === 'approved'"
                      class="py-1 px-2 fs-11 font-weight-600"
                      style="
                        border-spacing: 30px;
                        color: #ffffff;
                        border-radius: 5px;
                        background-color: rgb(11, 185, 113);
                        padding-block: 1px;
                      "
                      >Approved</span
                    >
                    <span
                      v-else-if="item.approvel_status === 'disapproved'"
                      class="py-1 px-2 fs-11 font-weight-600"
                      style="
                        border-spacing: 30px;
                        color: #ffffff;
                        border-radius: 5px;
                        background-color: rgb(255, 69, 69);
                        padding-block: 1px;
                      "
                      >Disapproved</span
                    >
                    <span
                      v-else-if="item.approvel_status === 'draft'"
                      class="py-1 px-2 fs-11 font-weight-600"
                      style="
                        border-spacing: 30px;
                        color: #ffffff;
                        border-radius: 5px;
                        background-color: rgb(78, 78, 78);
                        padding-block: 1px;
                      "
                      >Draft</span
                    >
                    <span v-else class="">Pending</span>
                  </td>
                  <td scope="col" class="d-flex border-0" width="100%">
                    <span
                      v-if="item.approvel_status === 'draft'"
                      class="border-0 fs-12"
                    >
                      <p
                        class="mb-0 px-0"
                        v-if="editPrivilege.includes('projectquery')"
                      >
                        <router-link
                          :to="{
                            path: '/projectque',
                            query: { editq_id: item.q_id },
                          }"
                        >
                          <i class="fa-solid fa-pen-to-square text-muted"></i>
                        </router-link>
                      </p>
                    </span>

                    <span v-else class="border-0 fs-12 me-2">
                      <p
                        class="mb-0 px-0"
                        v-if="viewPrivilege.includes('projectquery')"
                      >
                        <router-link :to="`/projectqueryview/${item.q_id}`">
                          <i class="fa-solid fa-circle-arrow-right"></i> Open
                        </router-link>
                      </p>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="quotation && quotation.length != 0" class="col-lg-12">
            <div class="d-flex justify-content-end my-3">
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === 1 }"
                  >
                    <button
                      class="page-link"
                      @click="changePage(currentPage - 1)"
                    >
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
                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPages }"
                  >
                    <button
                      class="page-link"
                      @click="changePage(currentPage + 1)"
                    >
                      <i class="fa-solid fa-chevron-right fs-12"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <!-- offcanvas -->

      <!-- <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="updateDataCanvas"
        aria-labelledby="updateDataCanvasLabel"
      >
        <div class="offcanvas-header py-0 row align-items-center border-bottom">
          <div class="col-lg-5 align-items-center mt-2">
            <p id="updateDataCanvasLabel " class="offcanvas-title fs-16 mb-0">
              RFQ List
            </p>
          </div>
          <div class="col-lg-2">
            <div class="">
              <select
                v-model="sortRFQBy"
                class="form-select sort-menu border-0 shadow-none"
                aria-label="Default select example"
              >
                <option value="All">Sort By</option>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <div class="col-lg-3 align-items-center my-3">
            <div class="input-group rounded">
              <input
                v-model="searchRFQText"
                type="search"
                class="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="col-lg-2 align-items-center mt-2">
            <router-link :to="`/addRFQ`">
              <button class="border-0 w-100 action-button py-1">Add New</button>
            </router-link>
          </div>
        </div>

        <div class="">
          <div class="row text-center">
            <div class="col-lg-12">
              <table class="table fs-13">
                <thead>
                  <tr class="thead-color border-0 bg-light">
                    <th
                      scope="col"
                      class="ps-4 fs-13 text-muted text-start font-weight-600"
                      width="20%"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      class="fs-13 text-muted text-start font-weight-600"
                      width="15%"
                    >
                      Req. Date
                    </th>

                    <th
                      scope="col"
                      class="fs-13 text-muted text-start font-weight-600"
                      width="30%"
                    >
                      RFQ Details
                    </th>

                    <th
                      scope="col"
                      class="fs-13 text-muted text-start font-weight-600"
                      width="15%"
                    >
                      Validity
                    </th>
                    <th
                      scope="col"
                      class="fs-13 text-muted text-start font-weight-600"
                      width="15%"
                    >
                      POC
                    </th>
                    <th
                      scope="col"
                      class="pe-4 fs-13 text-muted text-start font-weight-600"
                      width="15%"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr v-if="rfq && rfq.length == 0">
                    <td colspan="100%" class="border-0">
                      <div class="row justify-content-center my-5">
                        <img
                          class="col-12 img-fluid"
                          src="../assets/image/noData.png"
                          alt="No Project"
                          style="width: 140px; opacity: 1"
                        />
                        <p class="col-12 fs-14 text-center my-3 text-muted">
                          There is no RFQ data available!<br />
                          <span class="fs-12"
                            >Click the 'Add New' button to add new RFQ and
                            populate the table</span
                          >
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-else
                    class="shadowItem"
                    v-for="item in rfq"
                    :key="item.id"
                  >
                    <td
                      scope="col"
                      class="ps-4 border-0 fs-12 font-weight-600 text-start"
                      style="color: #119074"
                    >
                      {{ item.customer }}
                    </td>

                    <td scope="col" class="border-0 text-start fs-12">
                      <span
                        class="py-1 px-2 fs-11 font-weight-600"
                        style="
                          border-spacing: 30px;
                          color: #333333;
                          border-radius: 5px;
                          background-color: rgb(255, 194, 194);
                          padding-block: 1px;
                        "
                      >
                        {{ formatDate(item.req_date) }}
                      </span>
                    </td>
                    <td scope="col" class="border-0 text-start fs-12">
                      {{ item.quotation_for }}
                    </td>

                    <td scope="col" class="border-0 text-start fs-12">
                      <span
                        class="py-1 px-2 fs-11 font-weight-600"
                        style="
                          border-spacing: 30px;
                          color: #333333;
                          border-radius: 5px;
                          background-color: rgb(255, 194, 194);
                          padding-block: 1px;
                        "
                      >
                        {{ formatDate(item.end_date) }}
                      </span>
                    </td>

                    <td scope="col" class="border-0 text-start fs-12">
                      <span
                        class="py-1 fs-11 font-weight-600"
                        style="
                          border-spacing: 30px;
                          color: #333333;
                          border-radius: 5px;
                          padding-block: 1px;
                        "
                      >
                        {{ item.customer_POC }}
                      </span>
                    </td>

                    <td scope="col" class="pe-4 d-flex text-start border-0">
                      <span
                        class="border-0 fs-12"
                        v-if="
                          editPrivilege.includes('projectquery') &&
                          item.status != '1'
                        "
                      >
                        <p
                          class="mb-0 px-0 cursor-pointer"
                          :data-bs-toggle="'modal'"
                          :data-bs-target="'#confirmRFQStatus' + item.id"
                        >
                          <i
                            v-if="item.status === '1'"
                            class="fa-solid text-success fa-circle-check"
                          ></i>
                          <i
                            v-else
                            class="fa-solid fa-circle-check"
                            style="color: #777"
                          ></i>
                        </p>
                      </span>

                      <span class="border-0 fs-12" v-else>
                        <p class="mb-0 px-0 cursor-pointer">
                          <i
                            v-if="item.status === '1'"
                            class="fa-solid text-success fa-circle-check"
                          ></i>
                          <i
                            v-else
                            class="fa-solid fa-circle-check"
                            style="color: #777"
                          ></i>
                        </p>
                      </span>

                      <span
                        v-if="editPrivilege.includes('projectquery')"
                        class="border-0 fs-12 ms-2"
                      >
                        <p
                          class="mb-0 px-0 cursor-pointer"
                          :data-bs-toggle="'modal'"
                          :data-bs-target="'#confirmRFQDelete' + item.id"
                        >
                          <i class="fa-solid fa-trash text-danger"></i>
                        </p>
                      </span>

                     
                      <div
                        :id="'confirmRFQStatus' + item.id"
                        class="modal fade"
                        tabindex="-1"
                        aria-labelledby="confirmRFQStatusLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-custom">
                          <div class="modal-content modal-content-custom">
                            <div class="modal-header">
                              <p class="fs-16 mb-1" id="confirmRFQStatusLabel">
                                <img
                                  src="../assets/image/alert.png"
                                  class="alert-icon me-1"
                                  alt=""
                                  srcset=""
                                />
                                Mark this RFQ as complete! Are you sure?
                              </p>
                            </div>
                            <div class="p-2 d-flex justify-content-end">
                              <button
                                type="button"
                                class="btn close-button me-2"
                                data-bs-dismiss="modal"
                              >
                                <i class="fa-regular fa-circle-xmark me-1"></i>
                                No
                              </button>
                              <button
                                data-bs-dismiss="modal"
                                @click="updateRFQStatus(item.id)"
                                type="button"
                                class="btn action-button"
                                id="confirmRFQBtnsts"
                              >
                                <i class="fa-regular fa-circle-check me-1"></i
                                >Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>



                      <div
                        :id="'confirmRFQDelete' + item.id"
                        class="modal fade"
                        tabindex="-1"
                        aria-labelledby="confirmRFQStatusLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-custom">
                          <div class="modal-content modal-content-custom">
                            <div class="modal-header">
                              <p class="fs-16 mb-1" id="confirmRFQStatusLabel">
                                <img
                                  src="../assets/image/alert.png"
                                  class="alert-icon me-1"
                                  alt=""
                                  srcset=""
                                />
                                Are you sure you want to Delete?
                              </p>
                            </div>
                            <div class="p-2 d-flex justify-content-end">
                              <button
                                type="button"
                                class="btn close-button me-2"
                                data-bs-dismiss="modal"
                              >
                                <i class="fa-regular fa-circle-xmark me-1"></i>
                                No
                              </button>
                              <button
                                @click="deleteRFQ(item.id)"
                                type="button"
                                class="btn action-button"
                                id="confirmRFQBtndlt"
                              >
                                <i class="fa-regular fa-circle-check me-1"></i
                                >Confirm
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

            <div v-if="rfq && rfq.length != 0" class="col-lg-12">
              <div class="d-flex justify-content-end my-3">
                <nav aria-label="Page navigation">
                  <ul class="pagination">
                    <li
                      class="page-item"
                      :class="{ disabled: currentRFQPage === 1 }"
                    >
                      <button
                        class="page-link"
                        @click="changePage(currentRFQPage - 1)"
                      >
                        <i class="fa-solid fa-chevron-left fs-12"></i>
                      </button>
                    </li>
                    <li
                      v-for="page in totalRFQPages"
                      :key="page"
                      class="page-item"
                      :class="{ active: currentRFQPage === page }"
                    >
                      <button class="page-link" @click="changeRFQPage(page)">
                        {{ page }}
                      </button>
                    </li>
                    <li
                      class="page-item"
                      :class="{ disabled: currentRFQPage === totalRFQPages }"
                    >
                      <button
                        class="page-link"
                        @click="changePage(currentRFQPage + 1)"
                      >
                        <i class="fa-solid fa-chevron-right fs-12"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- offcanvas -->
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { mapState } from "vuex";

export default {
  name: "ProjectQuery",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      quotation: null,
      // rfq: null,
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      sortBy: "All",
      // totalRFQPages: 1,
      // currentRFQPage: 1,
      // searchRFQText: "",
      // sortRFQBy: "All",
    };
  },
  async mounted() {
    this.getQuotationData(this.currentPage);
    // this.getRFQData(this.currentRFQPage);
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    getQuotationData(page) {
      const data = new FormData();
      data.append("sortName", this.sortBy);
      data.append("searchText", this.searchText);
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/getSortedAllQuotation?page=${page}`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.quotation = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getQuotationData(newPage);
      }
    },

    // getRFQData(page) {
    //   const data = new FormData();
    //   data.append("sortName", this.sortRFQBy);
    //   data.append("searchText", this.searchRFQText);
    //   fetch(`${process.env.VUE_APP_SERVER_URL}/getSortedRFQ?page=${page}`, {
    //     method: "POST",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       this.rfq = data.message;
    //       this.totalRFQPages = data.totalPages;
    //       this.currentRFQPage = page;
    //     })
    //     .catch((err) => console.log(err.message));
    // },

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },

    auth() {
      if (!this.canView) {
        this.$router.push("/dashboard");
      }
    },
    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate();
      const month = formatedDate.getMonth() + 1;
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },

    // updateRFQStatus(id) {
    //   const data = new FormData();
    //   data.append("id", id);
    //   data.append("status", "1");
    //   fetch(`${process.env.VUE_APP_SERVER_URL}/UpdateStatusRFQ`, {
    //     method: "POST",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       if (res.message) {
    //         this.getRFQData(this.currentRFQPage);
    //       } else {
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    // deleteRFQ(id) {
    //   const data = new FormData();
    //   data.append("id", id);
    //   fetch(`${process.env.VUE_APP_SERVER_URL}/deleteRFQ`, {
    //     method: "POST",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       if (res.message) {
    //         this.getRFQData(this.currentRFQPage);
    //       } else {
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },

  computed: {
    ...mapState(["orgInfo"]),

    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    // ...mapState(["editPrivilege"]),

    canView() {
      return this.viewPrivilege.includes("projectquery");
    },
  },

  watch: {
    sortBy(newVal) {
      this.getQuotationData(this.currentPage);
    },
    searchText(newVal) {
      this.getQuotationData(this.currentPage);
    },
  },
};
</script>
<style scoped>
/* .form-select{
  cursor: pointer;
--bs-form-select-bg-img: none: i !important;
}; */

.offcanvas {
  width: 55% !important;

  z-index: 10000;
}

/*
.modal-backdrop {
  --bs-backdrop-zindex: -1 !important;
} */
</style>
