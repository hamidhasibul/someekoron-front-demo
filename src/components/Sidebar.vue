<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Scrollable Div -->
        <div class="scrollable-div border-end">
          <ul class="list-group list-unstyled sidebar rounded-0">
            <router-link to="/dashboard" class="fw-56 border-0 navitem" id="h">
              <div class="side-menu d-flex">
                <img
                  src="../assets/image/dboard.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />
                <p class="m-0">Dashboard</p>
              </div>
            </router-link>

            <!-- Customer -->
            <router-link
              to="/customerlist"
              class="fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('customerlist')"
            >
              <div class="side-menu d-flex">
                <img
                  src="../assets/image/customer.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />
                <p class="m-0">Customer</p>
              </div>
            </router-link>
            <!-- Quotation quotation -->
            <div
              @click="toggleQuotationDropdown"
              class="cursor-pointer fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('projectquery')"
            >
              <div class="side-menu d-flex">
                <img
                  src="../assets/image/quote.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />

                <div
                  class="d-flex w-100 justify-content-between align-items-center"
                >
                  <p class="m-0">Quotation</p>
                  <i
                    :class="{
                      'fa-solid fa-chevron-down fs-12 pe-2':
                        isQuotationDropdownOpen,
                      'fa-solid fa-chevron-right fs-12 pe-2':
                        !isQuotationDropdownOpen,
                    }"
                  ></i>
                </div>
              </div>
            </div>

            <router-link
              to="/projectquery"
              class="fw-56 border-0 navitem"
              v-if="
                isQuotationDropdownOpen &&
                viewPrivilege.includes('projectquery')
              "
            >
              <div class="ps-4 side-menu d-flex">
                <!-- <img
                  src="../assets/image/quote.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                <p class="m-0">Project Quote</p>
              </div>
            </router-link>
            <router-link
              to="/RFQ"
              class="fw-56 border-0 navitem"
              v-if="
                isQuotationDropdownOpen &&
                viewPrivilege.includes('rfq')
              "
            >
              <div class="ps-4 side-menu d-flex">
                <p class="m-0">RFQ</p>
              </div>
            </router-link>

            <div
              @click="toggleProjectsDropdown"
              class="cursor-pointer fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('projectlist')"
            >
              <div class="side-menu d-flex">
                <img
                  src="../assets/image/project.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />

                <div
                  class="d-flex w-100 justify-content-between align-items-center"
                >
                  <p class="m-0">Projects</p>
                  <i
                    :class="{
                      'fa-solid fa-chevron-down fs-12 pe-2':
                        isProjectsDropdownOpen,
                      'fa-solid fa-chevron-right fs-12 pe-2':
                        !isProjectsDropdownOpen,
                    }"
                  ></i>
                </div>
              </div>
            </div>

            <router-link
              to="/projectlist"
              class="fw-56 border-0 navitem"
              v-if="
                isProjectsDropdownOpen && viewPrivilege.includes('projectlist')
              "
            >
              <div class="ps-4 side-menu d-flex">
                <!-- <img
                  src="../assets/image/project.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                <p class="m-0">Project Info</p>
              </div>
            </router-link>

            <router-link
              to="/taskflow"
              class="fw-56 border-0 navitem"
              v-if="
                isProjectsDropdownOpen && viewPrivilege.includes('taskflow')
              "
            >
              <div class="ps-4 side-menu d-flex">
                <!-- <img
                  src="../assets/image/task.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                <p class="m-0">Task Flow</p>
              </div>
            </router-link>
            <router-link
              to="/collaboration"
              class="fw-56 border-0 navitem"
              v-if="
                isProjectsDropdownOpen && viewPrivilege.includes('collab')
              "
            >
              <div class="ps-4 side-menu d-flex">
                <!-- <img
                  src="../assets/image/ar.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                <p class="m-0">Collaboration</p>
              </div>
            </router-link>

            <router-link
              to="/invoicelist"
              class="fw-56 border-0 navitem"
              v-if="
                isProjectsDropdownOpen && viewPrivilege.includes('invoicelist')
              "
            >
              <span class="ps-4 side-menu">
                <!-- <img
                  src="../assets/image/invoice.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                Make Invoice
              </span>
            </router-link>

            <router-link
              to="/accounts_receivable_list"
              class="fw-56 border-0 navitem"
              v-if="
                isProjectsDropdownOpen &&
                viewPrivilege.includes('accounts_receivable_list')
              "
            >
              <div class="ps-4 side-menu d-flex">
                <!-- <img
                  src="../assets/image/ar.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                <p class="m-0">Payment Received</p>
              </div>
            </router-link>

            <router-link
              to="/vendorlist"
              class="fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('vendorlist')"
            >
              <span class="side-menu">
                <img
                  src="../assets/image/vendor.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />
                Vendors
              </span>
            </router-link>

            <div
              @click="togglePurchaseDropdown"
              class="cursor-pointer fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('projectlist')"
            >
              <div class="side-menu d-flex">
                <img
                  src="../assets/image/purchase.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />

                <div
                  class="d-flex w-100 justify-content-between align-items-center"
                >
                  <p class="m-0">Purchase</p>
                  <i
                    :class="{
                      'fa-solid fa-chevron-down fs-12 pe-2':
                        isPurchaseDropdownOpen,
                      'fa-solid fa-chevron-right fs-12 pe-2':
                        !isPurchaseDropdownOpen,
                    }"
                  ></i>
                </div>
              </div>
            </div>

            <router-link
              to="/purchaseorderlist"
              class="fw-56 border-0 navitem"
              v-if="
                isPurchaseDropdownOpen &&
                viewPrivilege.includes('purchaseorderlist')
              "
            >
              <div class="ps-4 side-menu d-flex">
                <!-- <img
                  src="../assets/image/purchase.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                <p class="m-0">Purchase Order</p>
              </div>
            </router-link>

            <router-link
              to="/billlist"
              class="fw-56 border-0 navitem"
              v-if="
                isPurchaseDropdownOpen && viewPrivilege.includes('billlist')
              "
            >
              <span class="ps-4 side-menu">
                <!-- <img
                  src="../assets/image/expense.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                Received Bills
              </span>
            </router-link>

            <router-link
              to="/makepaylist"
              class="fw-56 border-0 navitem"
              v-if="
                isPurchaseDropdownOpen && viewPrivilege.includes('makepaylist')
              "
            >
              <div class="ps-4 side-menu d-flex">
                <!-- <img
                  src="../assets/image/ap.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                <p class="m-0">Make Payment</p>
              </div>
            </router-link>

            <router-link
              to="/resourcelist"
              class="fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('resourcelist')"
            >
              <div class="side-menu d-flex">
                <img
                  src="../assets/image/resource.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />
                <p class="m-0">Resources</p>
              </div>
            </router-link>

            <div
              @click="toggleAccountsDropdown"
              class="cursor-pointer fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('expenselist')"
            >
              <div class="side-menu d-flex">
                <img
                  src="../assets/image/report.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />
                <div
                  class="d-flex w-100 justify-content-between align-items-center"
                >
                  <p class="m-0">Accounts</p>
                  <i
                    :class="{
                      'fa-solid fa-chevron-down fs-12 pe-2':
                        isAccountsDropdownOpen,
                      'fa-solid fa-chevron-right fs-12 pe-2':
                        !isAccountsDropdownOpen,
                    }"
                  ></i>
                </div>
              </div>
            </div>

            <router-link
              to="/accounts"
              class="fw-56 border-0 navitem"
              v-if="
                isAccountsDropdownOpen && viewPrivilege.includes('accounts')
              "
            >
              <span class="ps-4 side-menu">
                <!-- <img
                  src="../assets/image/account.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                Accounts Info
              </span>
            </router-link>
            <router-link
              to="/expenselist"
              class="fw-56 border-0 navitem"
              v-if="
                isAccountsDropdownOpen && viewPrivilege.includes('expenselist')
              "
            >
              <span class="ps-4 side-menu">
                <!-- <img
                  src="../assets/image/expense.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                Expense
              </span>
            </router-link>

            <router-link
              to="/banklist"
              class="fw-56 border-0 navitem"
              v-if="
                isAccountsDropdownOpen && viewPrivilege.includes('banklist')
              "
            >
              <span class="ps-4 side-menu">
                <!-- <img
                  src="../assets/image/bank.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                Banking
              </span>
            </router-link>

            <router-link
              to="/report"
              class="fw-56 border-0 navitem"
              v-if="isAccountsDropdownOpen && viewPrivilege.includes('report')"
            >
              <span class="ps-4 side-menu">
                <!-- <img
                  src="../assets/image/report.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                /> -->
                Reports
              </span>
            </router-link>

            <router-link
              to="/attachmentlist"
              class="fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('document')"
            >
              <span class="side-menu">
                <img
                  src="../assets/image/document.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />
                Documents
              </span>
            </router-link>

            <router-link
              to="/employeelist"
              class="fw-56 border-0 navitem"
              v-if="viewPrivilege.includes('employeelist')"
            >
              <span class="side-menu">
                <img
                  src="../assets/image/team.svg"
                  class="side-menu-icon mx-2"
                  alt=""
                  srcset=""
                />
                Team
              </span>
            </router-link>
          </ul>
          <!-- Bottom Fixed Footer -->
          <div class="end-footer bg-light border-end">
            <div class="text-center pb-2 border-top">
              <small class="mb-0 fw-bold fs-11 text-muted"
                >Someekoron V1.1.0</small
              >
              <div class="d-flex justify-content-center align-items-center">
                <p class="mb-0 fs-11">Powered by</p>
                <img
                  src="../assets//mpair_logo.png"
                  class="mx-2"
                  alt=""
                  srcset=""
                  style="height: 15px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "SideBar",

  data() {
    return {
      isQuotationDropdownOpen: false,
      isProjectsDropdownOpen: false,
      isPurchaseDropdownOpen: false,
      isAccountsDropdownOpen: false,
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserPrivilege", id);
    },
    toggleQuotationDropdown() {
      this.isQuotationDropdownOpen = !this.isQuotationDropdownOpen;
      this.isProjectsDropdownOpen = false;
      this.isPurchaseDropdownOpen = false;
      this.isAccountsDropdownOpen = false;
    },
    toggleProjectsDropdown() {
      this.isProjectsDropdownOpen = !this.isProjectsDropdownOpen;
      this.isQuotationDropdownOpen = false;
      this.isPurchaseDropdownOpen = false;
      this.isAccountsDropdownOpen = false;
    },
    togglePurchaseDropdown() {
      this.isPurchaseDropdownOpen = !this.isPurchaseDropdownOpen;
      this.isQuotationDropdownOpen = false;
      this.isProjectsDropdownOpen = false;
      this.isAccountsDropdownOpen = false;
    },
    toggleAccountsDropdown() {
      this.isAccountsDropdownOpen = !this.isAccountsDropdownOpen;
      this.isQuotationDropdownOpen = false;
      this.isProjectsDropdownOpen = false;
      this.isPurchaseDropdownOpen = false;
    },
  },

  computed: {
    ...mapState(["viewPrivilege"]),
  },
};
</script>

<style scoped>
.scrollable-div {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  width: 17%; /* Set your desired width */
  overflow-y: auto;
  padding-bottom: 100px;
  background-color: #f8fcfa;
}
.end-footer {
  position: fixed;
  bottom: 0;
  width: 17%;
}
</style>
