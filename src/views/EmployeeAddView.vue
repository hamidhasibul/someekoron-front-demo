<template>
  
  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Add Employee</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Please carefully read and check the following information before adding an <b>Employee</b>. <br />
              <span class="note-space"> May result in delays or errors in processing employee records.</span>
            </p>
          </div>
          <div class="p-3 ps-4">
            <div class="row w-75">
              <div class="col-lg-6 mb-2">
                <label for="emp_ID" class="form-label text-muted fs-13 fw-bold"
                  >Employee ID <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="emp_ID"
                  v-model="emp_ID"
                  name="vendorID"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="emp_name" class="form-label text-muted fs-13 fw-bold"
                  >Employee Name <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="emp_name"
                  v-model="emp_name"
                  name="emp_name"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="Ex. Mr. Kashem"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="emp_designation" class="form-label text-muted fs-13 fw-bold"
                  >Employee Designation <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="emp_designation"
                  v-model="emp_designation"
                  name="emp_designation"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>
            </div>
            <hr />
            <div class="row w-75">
              <div class="col-lg-6 mb-2">
                <label for="emp_add" class="form-label text-muted fs-13 fw-bold"
                  >Present Address <span class="fs-15 text-danger">*</span></label
                >
                <textarea
                  id="emp_add"
                  v-model="emp_add1"
                  name="emp_add"
                  type="text"
                  row="2"
                  class="form-control rounded-0 border-muted shadow-none"
                  placeholder="Type address here..."
                ></textarea>
              </div>

              <div class="col-lg-6 mb-2">
                <label for="emp_add2" class="form-label text-muted fs-13 fw-bold"
                  >Permanent Address <span class="fs-15 text-danger">*</span></label
                >
                <textarea
                  id="emp_add2"
                  v-model="emp_add2"
                  name="emp_add2"
                  type="text"
                  row="2"
                  class="form-control rounded-0 border-muted shadow-none"
                  placeholder="Type address here..."
                ></textarea>
              </div>

              <div class="col-lg-6 mb-2">
                <label for="contact" class="form-label text-muted fs-13 fw-bold"
                  >Contact Number <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="contact"
                  v-model="contact"
                  name="contact"
                  type="tel"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="email" class="form-label text-muted fs-13 fw-bold">Email</label>
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="Ex. kashem@mail.com"
                />
              </div>
              <div class="col-lg-6 mb-2">
                <label for="contact2" class="form-label text-muted fs-13 fw-bold"
                  >Emergency Contact <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="contact2"
                  v-model="contact2"
                  name="contact2"
                  type="tel"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="NID" class="form-label text-muted fs-13 fw-bold"
                  >National ID Number <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="NID"
                  v-model="nid"
                  name="NID"
                  type="number"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="XXXXXXXXX"
                />
              </div>

              <div class="col-lg-6 mb-2">
                <label for="NID" class="form-label text-muted fs-13 fw-bold pe-3">Employees Photo</label>
                <input id="emp_img" @change="emp_img" type="file" ref="file1" class="" />
                <p class="fs-10 m-0 text-primary">Preferred Image Size: 512px x 512px @ 150 DPI Maximum size of 1MB.</p>
              </div>
            </div>
            <hr />

            <div class="row mt-3 w-75">
              <div class="col-lg-4">
                <button @click="submitForm" class="border-0 w-100 action-button py-1" :disabled="loading">
                  <span v-if="loading">Loading...</span>
                  <span v-else>Add Employee</span>
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
  name: "EmployeeAdd",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      emp_ID: "",
      emp_designation: "",
      emp_name: "",
      emp_add1: "",
      emp_add2: "",
      contact: "",
      contact2: "",
      email: "",
      nid: "",
      image: "",
      loading: false,
      loadingTime: 2000,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    auth() {
      if (!this.createPrivilege.includes("employeelist")) {
        this.$router.push("/dashboard");
      }
    },
    async fetchData() {
      const id = localStorage.getItem("userID");

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
      this.toast.success("Employee Added", {
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

    emp_img() {
      if (this.$refs.file1.files[0]?.name !== undefined) {
        const fileInput = this.$refs.file1.files[0];

        if (fileInput) {
          const allowedFileTypes = ["jpg", "jpeg", "png"];
          const fileType = fileInput.name.split(".").pop().toLowerCase();

          if (!allowedFileTypes.includes(fileType)) {
            this.toast.warning("File type must be jpg or png", {
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
          } else {
            const maxSizeInBytes = 1024 * 1024;
            if (fileInput.size > maxSizeInBytes) {
              this.toast.warning("Maximum file size is 1MB", {
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
            } else {
              const img = new Image();
              img.src = URL.createObjectURL(fileInput);

              img.onload = () => {
                const width = img.width;
                const height = img.height;

                if (width > 512 && height > 512) {
                  this.toast.warning("Preferred image size is 512px x 512px", {
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
                } else {
                  this.image = this.$refs.file1.files[0];

                  this.url = URL.createObjectURL(this.image);
                }
              };
            }
          }
        }
      }
    },

    submitForm(e) {
      e.preventDefault();
      const phoneRegex = /\d{6,20}/;
      if (
        this.emp_ID == "" ||
        this.emp_designation == "" ||
        this.emp_name == "" ||
        this.emp_add1 == "" ||
        this.emp_add2 == "" ||
        !phoneRegex.test(this.contact) ||
        !phoneRegex.test(this.contact2) ||
        this.nid == ""
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

      data.append("e_id", this.emp_ID);
      data.append("emp_designation", this.emp_designation);
      data.append("ename", this.emp_name);
      data.append("e_add1", this.emp_add1);
      data.append("e_add2", this.emp_add2);
      data.append("contact", this.contact);
      data.append("e_contact", this.contact2);
      data.append("email", this.email);
      data.append("nid", this.nid);
      data.append("photo", this.image);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addEmployee`, {
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
              router.push(`/employeelist/`);

              this.emp_ID = "";
              this.emp_name = "";
              this.emp_add1 = "";
              this.emp_add2 = "";
              this.contact = "";
              this.contact2 = "";
              this.email = "";
              this.nid = "";
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
    ...mapState(["createPrivilege"]),
  },

  async mounted() {
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
