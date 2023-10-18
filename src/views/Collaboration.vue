<template>
  <div class="container-fluid vh-100">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-8">
            <p class="mb-0 text-color fs-20">Collaboration</p>
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
            <div class="row pb-3">
              <div class="col-lg-12 px-0">
                <div>
                  <table class="table align-middle">
                    <thead>
                      <tr class="thead-color border-bottom">
                        <th
                          scope="col"
                          class="border-0 fs-13 text-muted font-weight-600 ps-4"
                          width="85%"
                        >
                          Project Info
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
                        v-else
                        :class="[
                          'shadowItem',
                          selected_p_id === item.p_id ? 'table-active ' : '',
                        ]"
                        v-for="item in projects"
                        :key="item.id"
                      >
                        <td scope="col" class="border-0 ps-4">
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

          <div class="col-lg-8" style="height: 81vh">
            <div class="text-center" v-if="selected_p_id === ''">
              <div class="row justify-content-center my-5">
                <img
                  class="col-12 img-fluid"
                  src="../assets/image/chat2.png"
                  alt="No Project"
                  style="width: 100px; opacity: 1; margin-top: 100px"
                />
                <p class="col-12 fs-14 text-center my-3 text-muted">
                  No project selected yet! <br />Please select a project to view
                  its discussion.
                </p>
              </div>
            </div>
            <div v-else>
              <div class="row border-bottom py-3 align-items-center">
                <div class="col-lg-4 ps-2">
                  <div>
                    <span
                      class="font-weight-600 fs-14 mb-0"
                      style="color: #119074"
                    >
                      {{ selectedProject.project_name }}ss
                    </span>

                    <p class="fs-12 font-weight-600 mb-0">
                      {{ selectedProject.org_name }}
                    </p>
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

              <div v-else class="my-2">
                <div
                  class=" rounded ps-2 py-2 chat-container container-fluid mb-2"
                  style="overflow-y: auto; height: 57vh"
                >
                  <div class="">
                    <div class="row">
                      <div
                        class="fs-11 rounded-pill col-lg-2 offset-5"
                        style="
                          background-color: rgb(249, 255, 253);
                          font-family: 'Franklin Gothic Medium', 'Arial Narrow',
                            Arial, sans-serif;
                        "
                      >
                        Start Chat Here....
                      </div>
                    </div>
                    <div
                      class="container-fluid px-0"
                      v-for="chat in projectsMessage"
                      v-bind:key="chat.id"
                    >
                      <div v-if="chat.sender_id == userInfo.id">
                        <div class="d-flex flex-row-reverse py-1">
                          <div>
                            <div class="text-muted fs-10">
                              {{
                                new Date(chat.date).toLocaleString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour12: true,
                                })
                              }}
                            </div>

                            <div
                              class="bg-primary py-1 text-end fs-13 text-white px-2 border border-0"
                              style="
                                border-radius: 8px 0 8px 8px;
                                max-width: 20vw;
                              "
                            >
                              {{ chat.chat }}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-else class="py-1">
                        <div class="container-fluid">
                          <div class="row align-items-end">
                            <div class="col-lg-auto px-0 me-1">
                              <img
                                src="../assets/image/user.png"
                                class="alert-icon me-2"
                              />
                            </div>
                            <div class="col-lg-auto px-0">
                              <p class="fs-12 mb-0">
                                {{ chat.sender_username }}
                              </p>
                              <div class="text-muted fs-10">
                                {{
                                  new Date(chat.date).toLocaleString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour12: true,
                                  })
                                }}
                              </div>
                              <div
                                class="fs-13 pt-1 text-start font-weight-500 px-2 col-lg-auto bg-white text-black border border-0"
                                style="
                                  border-radius: 0 8px 8px 8px;
                                  min-height: 4vh;
                                "
                                type="button"
                              >
                                {{ chat.chat }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row py-2">
                  <div class="text-center col-lg-1 my-2">
                    <button
                      @click="openFileInput"
                      class="border-0 bg-transparent"
                    >
                      <i
                        class="fa-solid fa-paperclip fa-lg cursor-pointer"
                        style="color: #146aff"
                      ></i>
                    </button>
                    <input
                      type="file"
                      ref="fileInput"
                      style="display: none"
                      @change="uploadFile"
                    />
                  </div>
                  <div class="p-0 m-0 col-lg-10">
                    <input
                      class="form-control form-control-lg shadow-none"
                      id="chat"
                      v-model="chat"
                      type="text"
                      placeholder="Type here to chat..."
                      aria-label=".form-control-lg example"
                      @keyup.enter="submitChat"
                    />
                  </div>
                  <div class="text-center col-lg-1 my-2">
                    <button
                      class="bg-transparent border-0 ps-0"
                      @click="submitChat"
                    >
                      <i
                        class="fa-regular fa-lg fa-paper-plane cursor-pointer"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
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
  name: "collaboration",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      projects: null,
      projectTasks: [],
      projectsMessage: [],
      selected_p_id: "",
      selectedProject: [],
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      sortBy: "All",
      isLoading: false,
      taskProgress: 0,
      selectedChat: null,
      chat: "",

      chatMessages: [],
    };
  },
  mounted() {
    this.getProjectList(this.currentPage);
    try {
      this.fetchData();
      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },

    getProjectMessage() {
      const data = new FormData();
      data.append("p_id", this.selected_p_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectMessage`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.projectsMessage = data.message;
        })
        .catch((err) => console.log(err.message));
    },

    uploadFile(event) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("p_id", this.selected_p_id);
      data.append("sender_id", this.userInfo.id);
      data.append("sender_username", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/uploadFile`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {})
        .catch((error) => {
          console.error(error);
        });
    },
    submitChat() {
      if (this.chat.trim() !== "") {
        const data = new FormData();
        data.append("chat", this.chat);
        data.append("p_id", this.selected_p_id);
        data.append("sender_id", this.userInfo.id);
        data.append("sender_username", this.userInfo.username);

        fetch(`${process.env.VUE_APP_SERVER_URL}/sendProjectMessage`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            this.chatMessages.push({
              chat: this.chat,
              sender_id: this.userInfo.id,
            });

            this.chat = "";
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    changeProject(id) {
      this.selected_p_id = id;
      this.getProjectTaskData(id);
      this.getProjectMessage();
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
          const allprojects = data.message;
          console.log(allprojects);
          const username = this.userInfo.username;

          const filteredProjects = allprojects.filter((project) => {
            if (project.project_members !== "null") {
              const projectMembers = JSON.parse(project.project_members);
              return (
                projectMembers.some((member) => member.username === username) ||
                project.project_manager === username
              );
            }
            return false;
          });

          this.projects = filteredProjects;
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
          this.selectedProject = data.message[0];
          this.projectTasks = data.message2;
          this.isLoading = false;
        })
        .catch((err) => console.log(err.message));
    },
    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getProjectList(newPage);
      }
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

  updated() {
    this.getProjectMessage();
  },
};
</script>
<style scoped>
.border-end {
  height: 81vh;
}

.chat-container {
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  max-height: 100%;
}
</style>
