<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-8">
            <p class="mb-0 text-color fs-20">Project Task</p>
          </div>

          <div class="col-lg-4">
            <div class="d-flex align-items-center">
              <div class="me-2 w-50">
                <select
                  v-model="sortBy"
                  class="form-select sort-menu shadow-none"
                  aria-label="Default select example"
                >
                  <option value="All">All Project</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
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
        </div>
        <div class="row">
          <div class="col-lg-4 border-end">
            <div class="row pb-3" style="height: 81vh">
              <div class="col-lg-12 px-0">
                <div>
                  <table class="table align-middle">
                    <thead>
                      <tr class="thead-color border-bottom">
                        <th
                          scope="col"
                          class="border-0 fs-13 text-muted font-weight-600 ps-4"
                          width="75%"
                        >
                          Project Info
                        </th>

                        <th
                          scope="col"
                          class="border-0 fs-13 text-muted font-weight-600 pe-2"
                          width="10%"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="text-center border-0 fs-13 text-muted font-weight-600 pe-2"
                          width="15%"
                        >
                          Action
                        </th>
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
                              There is no project data available!
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr
                        :class="[
                          'shadowItem',
                          selected_p_id === item.p_id ? 'table-active ' : '',
                        ]"
                        v-for="item in projects"
                        :key="item.id"
                      >
                        <!-- v-if="item.status !== 'draft'" -->
                        <td
                          v-if="item.status !== 'draft'"
                          scope="col"
                          class="border-0 ps-4"
                        >
                          <span
                            class="button-blue px-2 fs-10 font-weight-600"
                            >{{ item.p_id }}</span
                          >
                          <br /><span
                            class="font-weight-600 fs-14"
                            style="color: #119074"
                            >{{ item.project_name }}</span
                          >

                          <p class="fs-12 m-0">{{ item.org_name }}</p>
                        </td>

                        <td
                          v-if="item.status !== 'draft'"
                          scope="col"
                          class="border-0 fs-11 font-weight-600"
                          width="10%"
                        >
                          <button
                            type="button"
                            class="mb-0 border-0 px-2"
                            style="
                              color: #fff;
                              border-radius: 5px;
                              background-color: rgb(9, 98, 182);
                              padding-block: 2px;
                            "
                            v-if="+item.status === 0"
                          >
                            Ongoing
                          </button>

                          <button
                            type="button"
                            class="mb-0 border-0 px-2"
                            style="
                              color: #fff;
                              border-radius: 5px;
                              background-color: rgb(73, 220, 0);
                              padding-block: 2px;
                            "
                            v-else-if="+item.status === 1"
                          >
                            Completed
                          </button>

                          <button
                            type="button"
                            class="mb-0 border-0 px-2"
                            style="
                              color: #fff;
                              border-radius: 5px;
                              background-color: rgb(58, 58, 58);
                              padding-block: 2px;
                            "
                            v-else
                          >
                            Draft
                          </button>
                        </td>

                        <td
                          v-if="item.status !== 'draft'"
                          scope="col"
                          class="text-center border-0 text-primary"
                        >
                          <i
                            @click="changeProject(item.p_id)"
                            class="fs-14 fa-solid fa-circle-arrow-right cursor-pointer"
                          ></i>
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

          <!-- task section  -->

          <div class="col-lg-8">
            <div class="text-center" v-if="selected_p_id === ''">
              <div class="row justify-content-center my-5">
                <img
                  class="col-12 img-fluid"
                  src="../assets/image/folder-select.png"
                  alt="No Project"
                  style="width: 80px; opacity: 1; margin-top: 100px"
                />
                <p class="col-12 fs-14 text-center my-3 text-muted">
                  No project selected yet! <br />Please select a project to view
                  its task.
                </p>
              </div>
            </div>
            <div v-else>
              <div class="row border-bottom py-3 px-2 align-items-center">
                <div class="col-lg-4">
                  <p class="mb-0 text-color fs-16 font-weight-600">Task List</p>
                </div>
                <div class="col-8 progress p-0">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    :style="`width: ${taskProgress}%`"
                    :aria-valuenow="taskProgress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {{ taskProgress }}%
                  </div>
                </div>
              </div>

              <div v-if="isLoading">
                <div
                  class="d-flex justify-content-center align-items-center h-100"
                >
                  <p class="py-5">Collecting data...</p>
                </div>
              </div>

              <div
                v-else
                class="col-lg-12 my-2"
                v-for="item in projectTasks"
                :key="item.id"
              >
                <div class="card p-2 px-3">
                  <div class="d-flex align-items-center">
                    <div class="w-50">
                      <div class="d-flex">
                  <p class="m-0 fs-13 font-weight-600">
                  {{ item.task_name }}
                </p>
                  <p class="m-0 fs-11 ms-2">
                  <span class="bg-primary text-white rounded font-weight-600 px-2"> {{ item.task_credit }}% </span>
                </p>
                </div>

                      <p class="m-0 fs-11">{{ item.task_des }}</p>
                    </div>
                    <div class="w-35 d-flex">
                      <!-- <p class="m-0 fs-12">
                        <span class="button-blue px-2 font-weight-600"
                          ><i class="fa-regular fa-user me-1"></i>
                          {{ item.assignedMember }}</span
                        >
                      </p> -->
                      <p class="m-0 fs-12">
                        <span class="button-blue px-2 font-weight-600">
                          <i class="fa-regular fa-flag me-1"></i>{{ item.sdate }}</span
                        >
                      </p>
                      
                      <p class="m-0 fs-12 ms-2">
                        <span class="button-red font-weight-600 px-2">
                          <i class="fa-solid fa-flag me-1"></i>{{ item.date }}
                        </span>
                      </p>
                    </div>

                    <div class="w-15">
                      <i
                        v-if="
                          item.status === 0 &&
                          selected_project_manager === userInfo.username
                        "
                        class="fa-solid fa-circle-check text-primary"
                        @click="setActive(item.id)"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmTaskModal"
                        style="cursor: pointer"
                      ></i>
                      <p
                        v-else-if="
                          item.status === 0 &&
                          selected_project_manager !== userInfo.username
                        "
                        class="m-0 fs-12 text-muted"
                      >
                        <i class="fa-solid fa-circle-check"></i>
                      </p>
                      <p class="m-0 fs-12 text-success" v-else>
                        <i class="fa-regular fa-circle-check"></i>
                        Completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Confirm Task Modal -->
  <div
    class="modal fade"
    id="confirmTaskModal"
    tabindex="-1"
    aria-labelledby="confirmTaskModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-custom">
      <div class="modal-content modal-content-custom">
        <div class="modal-header">
          <p class="fs-16 mb-1" id="confirmTaskModalLabel">
            <img
              src="../assets/image/alert.png"
              class="alert-icon me-1"
              alt=""
              srcset=""
            />
            Mark this task as complete! Are you sure?
          </p>
        </div>

        <div class="p-2 d-flex justify-content-end">
          <button
            type="button"
            class="btn close-button me-2"
            data-bs-dismiss="modal"
          >
            <i class="fa-regular fa-circle-xmark me-1"></i> No
          </button>
          <button
            data-bs-dismiss="modal"
            type="button"
            class="btn action-button"
            @click="markDoneTask"
          >
            <i class="fa-regular fa-circle-check me-1"></i>Confirm
          </button>
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
  name: "taskflow",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      projects: null,
      activeID: "",
      projectTasks: [],
      selected_p_id: "",
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      sortBy: "All",
      isLoading: false,
      taskProgress: 0,
      selected_project_manager: "",
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
    setActive(id) {
      this.activeID = id;
    },
    markDoneTask() {
      const data = new FormData();

      data.append("id", this.activeID);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateProjectTaskasDone`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // this.update = this.update + 1;
          this.getProjectTaskData(this.selected_p_id);
        })
        .catch((err) => console.log(err.message));
    },
    changeProject(id) {
      this.selected_p_id = id;
      this.getProjectTaskData(id);
    },
    getProjectList(page) {
      const data = new FormData();
      data.append("sortName", this.sortBy);
      data.append("searchText", this.searchText);
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/getSortedProjectData?page=${page}`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.projects = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },
    getProjectTaskData(id) {
      this.isLoading = true;
      const data = new FormData();
      data.append("p_id", id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.projectTasks = data.message2;
          this.selected_project_manager = data.message[0].project_manager;
          this.isLoading = false;
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
      this.$store.dispatch("fetchUserInfo");

      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
  },

  computed: {
    ...mapState(["viewPrivilege"]),
    ...mapState(["userInfo"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
    calculateTotalProgress() {
      return this.projectTasks
        .filter((item) => {
          return +item.status === 1;
        })
        .reduce((sum, item) => sum + +item.task_credit, 0);
    },
  },

  watch: {
    projectTasks: {
      handler() {
        this.taskProgress = this.calculateTotalProgress;
      },
      deep: true,
    },
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
