<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Employee List</p>
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
          <div class="col-lg-2" v-if="createPrivilege.includes('employeelist')">
            <router-link to="/employeeadd" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i> Add
              Employee</router-link
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
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="15%"
                  >
                    Designation
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="15%"
                  >
                    Contact Number
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="15%"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                    width="15%"
                  >
                    NID
                  </th>

                  <!-- <th
                    scope="col"
                    class="border-0 fs-13 text-start text-muted font-weight-600"
                  >
                    Status
                  </th> -->
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="15%"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="border-0">
                <tr v-if="employee && employee.length === 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/team.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no employee data available!<br />
                        <span class="fs-12"
                          >Click the 'Add Employee' button to add new employee
                          and populate the table.</span
                        >
                      </p>
                    </div>
                  </td>
                </tr>
                <tr
                  class="shadowItem"
                  v-for="item in employee"
                  :key="item.id"
                  width="10%"
                >
                  <td class="border-0 fs-12 text-start ps-4">
                    {{ item.e_id }}
                  </td>
                  <td
                    class="border-0 fs-12 font-weight-600 text-start"
                    width="15%"
                  >
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 250px; color: #119074"
                      >{{ item.ename }}</span
                    >
                  </td>
                  <td class="border-0 fs-12 fw-bold text-start" width="15%">
                    <span class="py-1 px-2 fs-11 font-weight-600 button-blue"
                      >{{ item.emp_designation }}
                    </span>
                  </td>
                  <td class="border-0 fs-12 text-start" width="15%">
                    {{ item.contact }}
                  </td>
                  <td class="border-0 fs-12 text-start" width="15%">
                    {{ item.email }}
                  </td>
                  <td class="border-0 fs-12 text-start" width="15%">
                    {{ item.nid }}
                  </td>
                  <!-- <td class="border-0 fs-12 text-start">{{ item.status }}</td> -->
                  <td scope="col" class="d-flex border-0 fs-12" width="15%">
                    <p
                      class="mb-0 px-0 me-3"
                      style="color: rgb(116, 116, 116)"
                      v-if="viewPrivilege.includes('employeelist')"
                    >
                      <i
                        class="fa-solid fa-eye"
                        type="button"
                        @click="showOffcanvas(item.id)"
                      ></i>
                    </p>

                    <!-- employee info canvas -->

                    <div
                      class="offcanvas offcanvas-end"
                      tabindex="-1"
                      v-bind:id="'offcanvasRight_' + item.id"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div class="offcanvas-header py-3">
                        <p id="offcanvasRightLabel" class="fs-16 mb-0">
                          Employee Information
                        </p>
                        <button
                          type="button"
                          class="btn-close text-reset"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                          @click="closeOffcanvas(item.id)"
                        ></button>
                      </div>

                      <div class="offcanvas-body">
                        <div
                          class="row text-center justify-content-center my-4"
                        >
                          <div class="col-lg-12">
                            <img
                              :src="`https://admin.voltecbd.com/voltec/image/${item.photo}`"
                              :alt="`${item.id}`"
                              class="img-fluid border"
                              style="height: 100px"
                            />
                          </div>
                          <div class="col-lg-4 my-2 mb-1">
                            <p class="m-0 rounded-pill bg-primary text-white">
                              {{ item.e_id }}
                            </p>
                          </div>
                          <div class="col-lg-12">
                            <p class="m-0 fs-18 text-muted font-weight-600">
                              {{ item.ename }}
                            </p>
                          </div>
                        </div>

                        <div>
                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Designation
                            </p>
                            <p class="m-0">{{ item.emp_designation }}</p>
                          </div>
                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Contact Number
                            </p>
                            <p class="m-0">{{ item.contact }}</p>
                          </div>
                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">E-mail</p>
                            <p class="m-0">{{ item.email }}</p>
                          </div>

                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Present Address
                            </p>
                            <p class="m-0">{{ item.e_add1 }}</p>
                          </div>

                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Permanent Address
                            </p>
                            <p class="m-0">{{ item.e_add2 }}</p>
                          </div>

                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Emergency Contact
                            </p>
                            <p class="m-0">{{ item.e_contact }}</p>
                          </div>
                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              NID Number
                            </p>
                            <p class="m-0">{{ item.nid }}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- employee info canvas -->

                    <p
                      class="mb-0 px-0"
                      style="color: rgb(116, 116, 116)"
                      @click="getEmployeeData(item.e_id)"
                      v-if="editPrivilege.includes('employeelist')"
                    >
                      <i
                        class="fa-solid fa-pen-to-square"
                        data-bs-toggle="modal"
                        data-bs-target="#employeeEdit"
                        style="cursor: pointer"
                      ></i>
                    </p>

                    <!-- modal edit -->
                    <div
                      class="modal fade"
                      id="employeeEdit"
                      tabindex="-1"
                      aria-labelledby="employeeEdit_label"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-custom modal-xl">
                        <div class="modal-content modal-content-custom">
                          <div
                            class="d-flex align-items-center p-2 py-3 border-bottom"
                          >
                            <img
                              src="../assets/image/updated.png"
                              class="update-icon me-2"
                              alt=""
                              srcset=""
                            />

                            <h6
                              class="fs-16 m-0 font-weight-600"
                              id="staticBackdropLabel"
                            >
                              Update Employee
                            </h6>
                          </div>

                          <div class="modal-body">
                            <div class="row">
                              <div class="col-lg-12 mb-3">
                                <p class="mb-0 fs-12">
                                  <span class="text-primary font-weight-600"
                                    >*Note:</span
                                  >
                                  Please carefully read and check the following
                                  information before updating stock in the
                                  system. May result in delays or errors in
                                  processing your project.
                                </p>
                              </div>

                              <div class="col-lg-6">
                                <div class="row">
                                  <div class="col-lg-1 px-0"></div>
                                  <div class="col-lg-3 px-0">
                                    <p class="mt-1 fs-14">Employee ID</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <p
                                      class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                    >
                                      {{ employeeDataInd.e_id }}
                                    </p>
                                  </div>
                                  <div class="col-lg-2"></div>

                                  <div class="col-lg-1 px-0"></div>
                                  <div class="col-lg-3 px-0">
                                    <p class="mt-1 fs-14">Employee Name</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <p
                                      class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                    >
                                      {{ employeeDataInd.ename }}
                                    </p>
                                  </div>
                                  <div class="col-lg-2"></div>

                                  <div class="col-lg-1 px-0"></div>
                                  <div class="col-lg-3 px-0">
                                    <p class="mt-1 fs-14">Designation</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="e_contact"
                                      type="text"
                                      v-model="employeeDataInd.emp_designation"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                  <div class="col-lg-2"></div>

                                  <div class="col-lg-1 px-0"></div>
                                  <div class="col-lg-3 px-0">
                                    <p class="mt-1 fs-14">Contact Number</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="e_contact"
                                      type="number"
                                      v-model="employeeDataInd.contact"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                  <div class="col-lg-2"></div>

                                  <div class="col-lg-1 px-0"></div>
                                  <div class="col-lg-3 px-0">
                                    <p class="mt-1 fs-14">E-mail</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="email"
                                      type="email"
                                      v-model="employeeDataInd.email"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                  <div class="col-lg-2"></div>

                                  <div class="col-lg-1 px-0"></div>
                                  <div class="col-lg-3 px-0">
                                    <p class="mt-1 fs-14">Employee Image</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="emp_img"
                                      type="file"
                                      @change="emp_img"
                                      class="form-control rounded-0 border-muted shadow-none"
                                    />
                                  </div>
                                  <div class="col-lg-2"></div>
                                </div>
                              </div>

                              <div class="col-lg-6">
                                <div class="row text-start">
                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">Present Address</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <textarea
                                      id="e_add1"
                                      rows="2"
                                      type="text"
                                      v-model="employeeDataInd.e_add1"
                                      class="form-control rounded-0 border-muted shadow-none mb-2"
                                    />
                                  </div>
                                  <div class="col-lg-3"></div>

                                  <div class="col-lg-3">
                                    <p class="mt-1 fs-14">Permanent Address</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <textarea
                                      id="stock"
                                      rows="2"
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none mb-2"
                                      v-model="employeeDataInd.e_add2"
                                    />
                                  </div>
                                  <div class="col-lg-3"></div>

                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">Emergency Contact</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="stock"
                                      type="text"
                                      v-model="employeeDataInd.e_contact"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                  <div class="col-lg-3"></div>

                                  <div class="col-lg-3 pe-0">
                                    <p class="mt-1 fs-14">NID Number</p>
                                  </div>
                                  <div class="col-lg-6">
                                    <input
                                      id="stock"
                                      type="text"
                                      v-model="employeeDataInd.nid"
                                      class="form-control rounded-0 border-muted shadow-none inputa"
                                    />
                                  </div>
                                  <div class="col-lg-3"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn close-button"
                              data-bs-dismiss="modal"
                            >
                              <i class="fa-regular fa-circle-xmark me-1"></i>
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn action-button"
                              data-bs-dismiss="modal"
                              @click="updateEmp"
                            >
                              {{ loading ? "Loading" : "Update changes" }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p
                      class="mb-0 px-0 ms-3"
                      style="color: rgb(116, 116, 116)"
                      @click="getEmployeeData(item.e_id)"
                      v-if="editPrivilege.includes('employeelist')"
                    >
                      <i
                        class="fa-solid fa-trash-can text-danger"
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
                              Are you sure you want to delete {{ item.ename }}?
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
                              @click="deleteEmployeeByID(item.id)"
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
          <div v-if="employee && employee.length != 0" class="col-lg-12">
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
  name: "Employeelist",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      employee: null,
      totalPages: 1,
      currentPage: 1,
      searchText: "",
      loading: false,
      update: 0,
      image: "",
      employeeDataInd: [],
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    getAllEmployeeData(page) {
      const data = new FormData();
      data.append("searchText", this.searchText);
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/getSortedEmployeeData?page=${page}`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.employee = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.getAllEmployeeData(newPage);
      }
    },
    auth() {
      if (!this.viewPrivilege.includes("employeelist")) {
        this.$router.push("/dashboard");
      }
    },
    emp_img(e) {
      this.image = e.target.files[0];
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

    async getEmployeeData(id) {
      const data = new FormData();
      data.append("e_id", id);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/getEmployeeDataByID`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        this.employeeDataInd = res.message[0];
        console.log(res.message[0]);
        this.image = res.message[0].photo;
      } catch (error) {
        console.error(error);
      }
    },

    async deleteEmployeeByID(id) {
      const data = new FormData();
      data.append("id", id);
      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/deleteEmployeeByID`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        if (res.ok) {
          this.warningMsg("Employee Deleted");
          this.update = this.update + 1;
        } else {
          this.errMsg();
        }
      } catch (error) {
        console.error(error);
      }
    },

    updateEmp() {
      this.loading = true;
      const data = new FormData();

      const {
        e_id,
        emp_designation,
        e_add1,
        e_add2,
        contact,
        email,
        e_contact,
        nid,
      } = this.employeeDataInd;

      data.append("e_id", e_id);
      data.append("emp_designation", emp_designation);
      data.append("e_add1", e_add1);
      data.append("e_add2", e_add2);
      data.append("contact", contact);
      data.append("email", email);
      data.append("e_contact", e_contact);
      data.append("nid", nid);
      data.append("photo", this.image);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UpdateEmployeeInfo`, {
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

    // toast stuff

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    async getAllEmployee() {
      try {
        await this.fetchData();

        this.auth();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    this.getAllEmployee();
    this.getAllEmployeeData(this.currentPage);
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
  },

  watch: {
    update() {
      this.getAllEmployee();
    },
    searchText(newVal) {
      this.getAllEmployeeData(this.currentPage);
    },
  },
};
</script>
<style scoped>
.offcanvas {
  width: 30% !important;
}
</style>
