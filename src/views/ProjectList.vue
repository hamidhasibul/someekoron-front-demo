<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-6">
            <p class="mb-0 text-color fs-20">Project List</p>
          </div>

          <div class="col-lg-4">
            <div class="d-flex align-items-center">
              <div class="me-2 w-50">
                <select v-model="sortBy" class="form-select sort-menu shadow-none" aria-label="Default select example">
                  <option value="All">All Project</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
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

          <div class="col-lg-2" v-if="createPrivilege.includes('projectlist')">
            <router-link to="/projectadd" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i>Add New</router-link
            >
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <div>
              <table class="table align-middle">
                <thead>
                  <tr class="thead-color border-bottom">
                    <th scope="col" class="border-0 fs-13 text-muted font-weight-600 ps-4" width="10%">#ID</th>

                    <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="20%">Project Name</th>
                    <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="20%">Project Owner</th>
                    <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Amount</th>
                    <th scope="col" class="border-0 fs-13 text-muted font-weight-600" width="15%">Completion Date</th>
                    <th scope="col" class="border-0 fs-13 text-muted font-weight-600 pe-2" width="10%">Status</th>
                    <th scope="col" class="border-0 fs-13 text-muted font-weight-600 pe-2" width="10%">Action</th>
                  </tr>
                </thead>

                <tbody class="border-0">
                  <tr v-if="projects && projects.length == 0">
                    <td colspan="100%" class="border-0">
                      <div class="row justify-content-center my-5">
                        <img
                          class="col-12 img-fluid"
                          src="../assets/image/noProject.png"
                          alt="No Project"
                          style="width: 140px; opacity: 1"
                        />
                        <p class="col-12 fs-14 text-center my-3 text-muted">
                          There is no project data available!<br />
                          <span class="fs-12"
                            >Click the 'Add New' button to add new project and populate the table</span
                          >
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr v-else class="shadowItem" v-for="item in projects" :key="item.id">
                    <td scope="col" class="border-0 fs-12 ps-4" width="10%">
                      {{ item.p_id }}
                    </td>

                    <td scope="col" class="border-0 fs-12 font-weight-600" width="20%">
                      <span class="d-inline-block text-truncate" style="max-width: 250px; color: #119074">{{
                        item.project_name
                      }}</span>
                    </td>

                    <td scope="col" class="border-0 fs-12" width="20%">
                      {{ item.org_name }}
                    </td>

                    <td class="border-0 fs-12" width="15%">
                      <p class="mb-0 px-0 font-weight-600">
                        <span class="py-1 px-2 fs-11 font-weight-600 button-blue">
                          {{ parseFloat(item.amount).toFixed(2) }} {{ orgInfo.currency }}
                        </span>
                      </p>
                    </td>

                    <td scope="col" class="border-0 fs-11 font-weight-600" width="15%">
                      <span class="py-1 px-2 fs-11 font-weight-600 button-violate">
                        {{ formatDate(item.cdate) }}
                      </span>
                    </td>

                    <td scope="col" class="border-0 fs-11 font-weight-600" width="10%">
                      <button
                        type="button"
                        class="mb-0 border-0 px-2"
                        style="color: #fff; border-radius: 5px; background-color: rgb(9, 98, 182); padding-block: 2px"
                        v-if="+item.status === 0"
                      >
                        Ongoing
                      </button>

                      <button
                        type="button"
                        class="mb-0 border-0 px-2"
                        style="color: #fff; border-radius: 5px; background-color: rgb(73, 220, 0); padding-block: 2px"
                        v-else-if="+item.status === 1"
                      >
                        Completed
                      </button>

                      <button
                        type="button"
                        class="mb-0 border-0 px-2"
                        style="color: #fff; border-radius: 5px; background-color: rgb(58, 58, 58); padding-block: 2px"
                        v-else
                      >
                        Draft
                      </button>
                    </td>

                    <td scope="col" class="d-flex border-0" width="100%">
                      <span v-if="item.status === 'draft'" class="border-0 fs-12">
                        <p class="mb-0 px-0">
                          <router-link
                            :to="{
                              path: '/projectadd',
                              query: { editid: item.p_id },
                            }"
                          >
                            <i class="fa-solid fa-pen-to-square text-muted"></i>
                          </router-link>
                        </p>
                      </span>

                      <span v-else class="border-0 fs-12">
                        <p class="mb-0 px-0" v-if="viewPrivilege.includes('projectlist')">
                          <router-link :to="`/projectlistview/${item.p_id}`">
                            <i class="fa-solid fa-circle-arrow-right"></i> Open
                          </router-link>
                        </p>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="projects && projects.length != 0" class="col-lg-12">
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
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { mapState } from "vuex";

export default {
  name: "ProjectList",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      projects: null,
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      sortBy: "All",
    };
  },
  async mounted() {
    this.getProjectList(this.currentPage);
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    getProjectList(page) {
      const data = new FormData();
      data.append("sortName", this.sortBy);
      data.append("searchText", this.searchText);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getSortedProjectData?page=${page}`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.projects = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getProjectList(newPage);
      }
    },

    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate();
      const month = formatedDate.getMonth() + 1;
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
    auth() {
      if (!this.viewPrivilege.includes("projectlist")) {
        this.$router.push("/dashboard");
      }
    },
    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
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
      this.getProjectList(this.currentPage);
    },
    searchText(newVal) {
      this.getProjectList(this.currentPage);
    },
  },
};
</script>
<style></style>
