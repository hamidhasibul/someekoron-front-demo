<template>
  
  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-6">
            <p class="mb-0 text-color fs-20">Payment List</p>
          </div>

          <div class="col-lg-4">
            <div class="d-flex align-items-center">
              <div class="me-2 w-50">
                <select v-model="sortBy" class="form-select sort-menu shadow-none" aria-label="Default select example">
                  <option value="All">All Payment</option>
                  <option value="inclusive">Tax Inclusive</option>
                  <option value="exclusive">Tax Exclusive</option>
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

          <div class="col-lg-2" v-if="createPrivilege.includes('makepaylist')">
            <router-link to="/makepayment" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i>Add New AP</router-link
            >
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <table class="table">
              <thead>
                <tr class="thead-color border-bottom">
                  <th scope="col" class="border-0 fs-13 text-start text-muted font-weight-600 ps-4" width="10%">#ID</th>
                  <th scope="col" class="border-0 fs-13 tesxt-start text-muted font-weight-600" width="20%">
                    Vendor Name
                  </th>

                  <th scope="col" class="border-0 fs-13 tesxt-start text-muted font-weight-600" width="20%">
                    Project Name
                  </th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="10%">Date</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">MOP</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Amount</th>
                  <th scope="col" class="border-0 fs-13 text-muted font-weight-600">Action</th>
                </tr>
              </thead>
              <tbody class="border-0">
                <tr v-if="paidBill && paidBill.length === 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/noData.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no paid bills data available!<br />
                        <span class="fs-12"
                          >Click the 'Add New AP' button to add new paid bills and populate the table.</span
                        >
                      </p>
                    </div>
                  </td>
                </tr>

                <tr class="shadowItem" v-for="item in paidBill" :key="item.id">
                  <td class="border-0 fs-12 text-start ps-4">
                    {{ item.pay_id }}
                  </td>
                  <td class="border-0 fs-12 font-weight-600 text-start">
                    <span class="d-inline-block text-truncate" style="max-width: 250px; color: #119074"
                      >{{ item.vname }}
                    </span>
                  </td>
                  <td class="border-0 fs-12 fw-bold text-start">
                    {{ item.project_name }}
                  </td>
                  <td class="border-0 fs-12 text-start">
                    <span class="py-1 px-2 fs-11 font-weight-600 button-violate">
                      {{ formatDate(item.cdate) }}
                    </span>
                  </td>
                  <td class="border-0 fs-12 text-start">
                    <span class="text-capitalize px-2 fs-11 py-1 fw-bold button-red"> {{ item.p_mode }}</span>
                  </td>
                  <td class="border-0 fs-12 text-start">
                    <span class="py-1 px-2 fs-11 font-weight-600 button-blue">
                      {{ parseFloat(item.t_amount).toFixed(2) }} {{ orgInfo.currency }}
                    </span>
                  </td>
                  <td scope="col" class="border-0 fs-12 pe-4" width="100%">
                    <p class="mb-0 px-0" style="color: rgb(116, 116, 116)" v-if="viewPrivilege.includes('makepaylist')">
                      <router-link :to="`/makepayoverview/${item.pay_id}`">
                        <i class="fa-solid fa-circle-arrow-right"></i> Open
                      </router-link>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="paidBill && paidBill.length != 0" class="col-lg-12">
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

export default {
  name: "makepaymentList",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      paidBill: null,
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      sortBy: "All",
    };
  },
  async mounted() {
    this.getPBList(this.currentPage);

    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate(); // Get the day of the month
      const month = formatedDate.getMonth() + 1; // Month is zero-based, so add 1
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getPBList(page) {
      const data = new FormData();
      data.append("searchText", this.searchText);
      data.append("sortName", this.sortBy);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getSortedPBData?page=${page}`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.paidBill = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getPBList(newPage);
      }
    },
    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },

    auth() {
      if (!this.viewPrivilege.includes("makepaylist")) {
        this.$router.push("/dashboard");
      }
    },
  },

  computed: {
    ...mapState(["orgInfo"]),

    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
  },

  watch: {
    sortBy(newVal) {
      this.getPBList(this.currentPage);
    },
    searchText(newVal) {
      this.getPBList(this.currentPage);
    },
  },
};
</script>
<style></style>
