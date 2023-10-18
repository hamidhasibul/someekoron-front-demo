<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Add Document</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Please carefully read and check the following information before
              adding an <b>Attachment</b>. <br />
              <span class="note-space">
                May result in delays or errors in processing Attachment
                records.</span
              >
            </p>
          </div>
          <div class="p-3 ps-4">
            <div class="row w-75">
              <div class="col-lg-6 mb-2">
                <label
                  for="attachmentID"
                  class="form-label text-muted fs-13 fw-bold"
                  >Document ID <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="attachmentID"
                  v-model="attachmentID"
                  name="vendorID"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="attachmentID"
                  class="form-label text-muted fs-13 fw-bold"
                  >Document Name <span class="fs-15 text-danger">*</span></label
                >
                <input
                  type="text"
                  v-model="attachmentNote"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="pr_id" class="form-label text-muted fs-13 fw-bold"
                  >Project ID<span class="fs-15 text-danger">*</span></label
                >

                <div class="dropdown">
                  <div
                    @click="toggleDropdown"
                    @custom-event="handleCustomEvent(selectedOption.p_id)"
                    class="border rounded form-select py-1"
                  >
                    {{
                      selectedOption.p_id
                        ? selectedOption.p_id
                        : "Select project ID"
                    }}
                  </div>

                  <div
                    v-show="isDropdownOpen"
                    class="position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                  >
                    <input
                      type="text"
                      v-model="searchQuery"
                      placeholder="Search..."
                      class="dropdown-search"
                    />

                    <p
                      v-for="projects in filteredOptions"
                      :key="projects.id"
                      @click="selectOption(projects)"
                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                    >
                      <span class="fs-14">{{ projects.p_id }}</span
                      ><br />
                      <span class="fs-11">{{ projects.project_name }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="projectName"
                  class="form-label text-muted fs-13 fw-bold"
                  >Project Name<span class="fs-15 text-danger">*</span></label
                >

                <div class="">
                  <p
                    class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                  >
                    {{ projectName }}
                  </p>
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="imageURL"
                  class="form-label text-muted fs-13 fw-bold"
                  >Attachment File</label
                >
                <input
                  id="attacgmentname"
                  type="file"
                  @change="attachmentFile"
                />

                <div
                  class="border border-muted rounded p-2 mt-3"
                  style="background-color: rgb(248, 248, 255)"
                >
                  <p class="fs-12 m-0 text-primary">
                    <span class="text-danger font-weight-600">Note: </span>You
                    can only add the following types of files:<span
                      class="font-weight-600"
                      >.pdf, .docx, .xlsx, .pptx, .jpeg, .png, .csv, .cad, .dwg,
                      and .mpp</span
                    >
                    , with a maximum file size of 10 MB.
                  </p>
                </div>
              </div>
            </div>
            <hr />

            <div class="row mt-3 w-75">
              <div class="col-lg-4">
                <button
                  @click="submitForm"
                  class="border-0 w-100 action-button py-1"
                  :disabled="loading"
                >
                  <span v-if="loading">Loading...</span>
                  <span v-else>Add Document</span>
                </button>
              </div>
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
import { useToast } from "vue-toastification";
import { mapState } from "vuex";
import router from "@/router";

export default {
  name: "AttachmentAdd",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      attachmentID: "",
      searchQuery: "",
      url: "",
      projectName: "",
      attachmentNote: "",
      pID: "",
      loading: false,
      loadingTime: 2000,
      searchText: "",
      update: 0,
      attachmentName: "",
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
          this.pID = value;
          this.projectName = res.message[0].project_name;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    auth() {
      if (!this.createPrivilege.includes("employeelist")) {
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
      this.toast.success("Attchment Added", {
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

    attachmentFile(e) {
      const allowedFileTypes = [
        ".pdf",
        ".docx",
        ".xlsx",
        ".pptx",
        ".jpeg",
        ".jpg",
        ".png",
        ".csv",
        ".cad",
        ".dwg",
        ".mpp",
      ];
      const maxFileSizeMB = 10;

      const file = e.target.files[0];

      if (file) {
        const fileName = file.name;
        const fileType = `.${fileName.split(".").pop()}`.toLowerCase();
        const fileSizeMB = file.size / 1024 / 1024;

        if (
          allowedFileTypes.includes(fileType) &&
          fileSizeMB <= maxFileSizeMB
        ) {
          this.attachmentName = file;
        } else {
          this.toast.warning(
            `Invalid file type or file size exceeds the limit (${maxFileSizeMB} MB).`,
            {
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
            }
          );
          e.target.value = null;
        }
      }
    },

    submitForm(e) {
      e.preventDefault();
      if (
        this.attachmentID == "" ||
        this.pID == "" ||
        this.projectName == "" ||
        this.attachmentName == ""
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

      data.append("attachmentID", this.attachmentID);
      data.append("pID", this.pID);
      data.append("projectName", this.projectName);
      data.append("attachmentName", this.attachmentName);
      data.append("attachmentNote", this.attachmentNote);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addAttachment`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);

          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg();
              router.push(`/attachmentlist/`);
            }, this.loadingTime);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },

  computed: {
    filteredOptions() {
      if (!this.searchQuery) {
        console.log("query");
        return this.projectData;
      }

      const query = this.searchQuery.toLowerCase();

      return this.projectData.filter((projects) =>
        projects.p_id.toLowerCase().includes(query)
      );
    },
    ...mapState(["createPrivilege"]),
    ...mapState(["userInfo"]),
  },

  watch: {
    "selectedOption.p_id": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
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
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
