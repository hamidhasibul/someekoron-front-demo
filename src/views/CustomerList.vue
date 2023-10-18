<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Customer List</p>
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
                <i class="fas fa-search pe-auto"></i>
              </span>
            </div>
          </div>

          <div class="col-lg-2" v-if="createPrivilege.includes('customerlist')">
            <router-link to="/customeradd" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i>Add
              Customer</router-link
            >
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <table class="table text-start align-middle">
              <thead>
                <tr class="thead-color border-bottom">
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600 ps-4"
                    width="25%"
                  >
                    Customer Name
                  </th>

                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="25%"
                  >
                    Customer Location
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="10%"
                  >
                    Total Deal
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="15%"
                  >
                    Due Amount
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="15%"
                  >
                    Pending Invoice
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600 pe-2"
                    width="10%"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="border-0">
                <tr v-if="customer && customer.length === 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/crm.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no customer data available!<br />
                        <span class="fs-12"
                          >Click the 'Add Customer' button to add new project
                          and populate the table.</span
                        >
                      </p>
                    </div>
                  </td>
                </tr>

                <tr
                  v-else
                  class="shadowItem"
                  v-for="item in customer"
                  :key="item.id"
                >
                  <td
                    scope="col"
                    class="border-0 fs-12 font-weight-600 ps-4"
                    style="color: #119074"
                  >
                    {{ item.customer }}
                  </td>
                  <td scope="col" class="border-0 fs-12 fw-bold">
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 250px"
                      >{{ item.address }}</span
                    >
                  </td>

                  <td scope="col" class="border-0 fs-12">
                    {{ item.deal }}
                  </td>

                  <td class="border-0 fs-12">
                    <p class="mb-0 px-0">
                      <span class="py-1 px-2 fs-11 font-weight-600 button-red"
                        >{{ item.due.toFixed(2) }} {{ orgInfo.currency }}</span
                      >
                    </p>
                  </td>
                  <td class="border-0 fs-12">
                    <p class="mb-0 px-0">
                      {{ item.inv }}
                    </p>
                  </td>

                  <td scope="col" class="d-flex border-0 fs-12">
                    <p
                      class="mb-0 px-0 me-3"
                      v-if="viewPrivilege.includes('customerlist')"
                    >
                      <router-link :to="`/customerlistview/${item.id}`">
                        <i class="fa-solid fa-circle-arrow-right"></i> Open
                      </router-link>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="customer && customer.length != 0" class="col-lg-12">
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
                    <button
                      class="page-link page-link-count"
                      @click="changePage(page)"
                    >
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
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { mapState } from "vuex";

export default {
  name: "CustomerList",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      customer: [],
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      sortBy: "All",
    };
  },

  // Step : Mounted async await

  async mounted() {
    this.getCustomerData(this.currentPage);
    // Step : Try catch block

    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    getCustomerData(page) {
      const data = new FormData();
      data.append("searchText", this.searchText);
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/getSortedCustomerData?page=${page}`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.customer = data.message;
          console.log(data.message);
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getCustomerData(newPage);
      }
    },

    auth() {
      if (!this.canView) {
        this.$router.push("/dashboard");
      }
    },

    // Step : Fetch Data async

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
  },

  watch: {
    searchText(newVal) {
      this.getCustomerData(this.currentPage);
    },
  },
  computed: {
    ...mapState(["orgInfo"]),

    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),

    canView() {
      return this.viewPrivilege.includes("customerlist");
    },
  },
};
</script>
<style scoped></style>
