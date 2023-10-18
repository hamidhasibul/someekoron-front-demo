<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Document List</p>
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
          <div class="col-lg-2" v-if="createPrivilege.includes('projectlist')">
            <router-link to="/attachmentadd" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i> Add
              Document</router-link
            >
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <table class="table">
              <thead>
                <tr class="thead-color border-bottom">
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600 ps-4"
                    width="10%"
                  >
                    #ID
                  </th>

                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="15%"
                  >
                    Project ID
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="20%"
                  >
                    Project Name
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="20%"
                  >
                    Attachment Note
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="15%"
                  >
                    Attachment
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="10%"
                  >
                    Date
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
              <tbody class="border-0">
                <tr v-if="attachmentData && attachmentData.length === 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/documentation.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no documents available!<br />
                        <span class="fs-12"
                          >Click the 'Add Document' button to add new Document
                          and populate the table.</span
                        >
                      </p>
                    </div>
                  </td>
                </tr>
                <tr
                  class="shadowItem"
                  v-for="item in attachmentData"
                  :key="item.id"
                  width="10%"
                >
                  <td class="border-0 fs-12 text-start ps-4">
                    {{ item.attachmentID }}
                  </td>
                  <td
                    class="border-0 fs-12 font-weight-600 text-start"
                    width="15%"
                  >
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 250px; color: #119074"
                      >{{ item.pID }}</span
                    >
                  </td>
                  <td
                    class="border-0 fs-12 font-weight-600 text-start"
                    width="20%"
                  >
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 250px; color: #119074"
                      >{{ item.projectName }}
                    </span>
                  </td>
                  <td class="border-0 fs-12 fw-bold text-start" width="20%">
                    <span class="py-1 fs-11 font-weight-600"
                      >{{ item.attachmentNote }}
                    </span>
                  </td>
                  <td class="border-0 fs-12 text-start" width="15%">
                    <span
                      class="btn fs-12 text-decoration-underline p-0"
                      data-bs-toggle="modal"
                      :data-bs-target="'#showAtt' + item.attachmentID"
                      v-if="
                        `${item.attachmentName
                          .split('.')
                          .pop()}`.toLowerCase() === 'pdf' ||
                        `${item.attachmentName
                          .split('.')
                          .pop()}`.toLowerCase() === 'jpeg' ||
                        `${item.attachmentName
                          .split('.')
                          .pop()}`.toLowerCase() === 'png' ||
                        `${item.attachmentName
                          .split('.')
                          .pop()}`.toLowerCase() === 'jpg'
                      "
                    >
                      <i class="fa-solid fa-paperclip"></i> Show Attachment
                      <div
                        class="modal fade"
                        :id="'showAtt' + item.attachmentID"
                        tabindex="-1"
                        aria-labelledby="showAtt"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-fullscreen">
                          <div class="modal-content">
                            <div class="modal-header">
                              <p
                                class="modal-title fs-18"
                                id="exampleModalLabel"
                              >
                                {{ item.projectName }}
                              </p>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div style="height: 100%; width: 100%">
                                <iframe
                                  style="height: 100%; width: 100%"
                                  :src="
                                    'https://admin.voltecbd.com/voltec/attachment/' +
                                    item.attachmentName
                                  "
                                  title="description"
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>

                    <span v-else>No preview available</span>
                  </td>
                  <td class="border-0 fs-12 text-start">
                    {{ formatDate(item.cdate) }}
                  </td>

                  <td scope="col" class="d-flex border-0 fs-12">
                    <p class="mb-0" style="cursor: pointer">
                      <a
                        :download="item.attachmentName"
                        :href="`https://admin.voltecbd.com/voltec/attachment/${item.attachmentName}`"
                      >
                        <i class="fa-regular fa-circle-down text-success"></i>
                      </a>
                    </p>
                    <p
                      class="mb-0 px-0 ms-2"
                      style="color: rgb(116, 116, 116)"
                      v-if="editPrivilege.includes('projectlist')"
                    >
                      <i
                        class="fa-solid fa-trash-can"
                        data-bs-toggle="modal"
                        :data-bs-target="`#EmployeeDelete${item.id}`"
                        style="cursor: pointer"
                      ></i>
                    </p>

                    <div
                      :id="`EmployeeDelete${item.id}`"
                      class="modal fade"
                      tabindex="1"
                      aria-labelledby="confirmRFQStatusLabel"
                      aria-hidden="true"
                      style="z-index: 1000000"
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
                              Are you sure you want to delete ?
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
                              @click="deleteAttachmentByID(item.attachmentID)"
                              type="button"
                              class="btn action-button"
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
          <div
            v-if="attachmentData && attachmentData.length != 0"
            class="col-lg-12"
          >
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
  name: "AttachmentlistView",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      attachmentData: null,
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      searchQuery: "",
      loading: false,
      update: 0,
      attachmentName: "",
      attachmentDataInd: [],
      selectedOption: [],
      isDropdownOpen: false,
      projectData: [],
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    forceDownload(item) {
      // Get the download link
      const downloadLink = document.createElement("a");
      downloadLink.href = `https://admin.voltecbd.com/voltec/attachment/${item.attachmentName}`;
      downloadLink.target = "_blank"; // Open the link in a new tab if needed
      downloadLink.download = item.attachmentName; // Set the desired file name

      // Trigger a click event on the link to initiate the download
      if (document.body) {
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    },
    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate();
      const month = formatedDate.getMonth() + 1;
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
    selectOption(projects) {
      this.selectedOption = projects;
      this.isDropdownOpen = false;
    },
    handleSelectedOptionChange(value) {
      console.log("Selected Option changed:", value);
      const data = new FormData();
      data.append("p_id", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.attachmentDataInd.pID = value;
          this.attachmentDataInd.projectName = res.message[0].project_name;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    setAttachmentDataInd(item) {
      this.attachmentDataInd = item;
      this.selectedOption.p_id = item.pID;
    },
    getAllAttachmentData(page) {
      const data = new FormData();
      data.append("searchText", this.searchText);
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/getSortedAttachmentData?page=${page}`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.attachmentData = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getAllAttachmentData(newPage);
      }
    },
    auth() {
      if (!this.viewPrivilege.includes("projectlist")) {
        this.$router.push("/dashboard");
      }
    },
    attachmentFile(e) {
      this.attachmentName = e.target.files[0];
    },
    // toast

    errMsg() {
      this.toast.err(`Something went wrong!! ${err}`, {
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

    showOffcanvas(employeeId) {
      const offcanvas = document.getElementById("offcanvasRight_" + employeeId);
      offcanvas.classList.add("show");
    },
    closeOffcanvas(employeeId) {
      const offcanvas = document.getElementById("offcanvasRight_" + employeeId);
      offcanvas.classList.remove("show");
    },

    async deleteAttachmentByID(attachmentID) {
      const data = new FormData();
      data.append("attachmentID", attachmentID);
      data.append("user", this.userInfo.username);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/deleteAttachmentByID`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        if (res.ok) {
          this.warningMsg("Attachment Deleted");
          this.update = this.update + 1;
        } else {
          this.errMsg();
        }
      } catch (error) {
        console.error(error);
      }
    },
    // toast stuff

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    async getAllUserInfo() {
      try {
        await this.fetchData();

        this.auth();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        this.projectData = data.message;
      })
      .catch((err) => console.log(err.message));
    this.getAllUserInfo();
    this.getAllAttachmentData(this.currentPage);
  },
  computed: {
    filteredOptions() {
      if (!this.searchQuery) {
        return this.projectData;
      }

      const query = this.searchQuery.toLowerCase();
      return this.projectData.filter((projects) =>
        projects.p_id.toLowerCase().includes(query)
      );
    },
    ...mapState(["userInfo"]),
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
  },

  watch: {
    "selectedOption.p_id": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },
    update() {
      this.getAllUserInfo();
      this.getAllAttachmentData(this.currentPage);
    },
    searchText(newVal) {
      this.getAllAttachmentData(this.currentPage);
    },
  },
};
</script>
<style scoped></style>
