<template>
  <div class="print_section"></div>

  <div class="view-section">
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar-container-right scroll-content">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Expense Overview</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 py-0 px-0 border-end">
              <div class="p-3 pb-0">
                <p class="fs-16 font-weight-600 mb-0">
                  {{ expense.ex_des }}
                </p>

                <p class="fs-12 mb-0">
                  {{ parseFloat(expense.t_amount).toFixed(2) }}
                  {{ orgInfo.currency }}
                </p>
                <!-- <p class="fs-12 mb-0">
                  <i class="fa-solid fa-circle-info me-1"></i>
                  {{ expense.ex_des }}
                </p> -->
              </div>

              <div class="bg-light p-3 py-2 mt-3">
                <p class="mb-1 fs-13 font-weight-600">Expense By</p>
                <p class="fs-12 font-weight-600 mb-0">
                  {{ expense.empoloyee_name }}
                </p>
              </div>

              <div class="pb-2">
                <p
                  class="mb-0 py-1 px-3 fs-13 border-top border-bottom font-weight-600"
                >
                  Other Info

                  <span
                    class="mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#otherInfoModal"
                    style="cursor: pointer"
                    v-if="editPrivilege.includes('expenselist')"
                  >
                    <small
                      class="font-10 text-primary text-decoration-underline"
                      ><i class="fa-solid fa-pen me-1"></i>Edit</small
                    >
                  </span>
                </p>

                <!--modal  -->
                <div
                  class="modal fade"
                  id="otherInfoModal"
                  tabindex="-1"
                  aria-labelledby="otherInfoModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-custom">
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
                        <p
                          class="fs-16 m-0 font-weight-600"
                          id="otherInfoModalLabel"
                        >
                          Update Other Info
                        </p>
                      </div>
                      <div class="modal-body">
                        <label class="form-label text-muted fs-13 fw-bold"
                          >Expiry Date
                        </label>
                        <input
                          class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                          type="date"
                          v-model="expense.cdate"
                        />
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
                          @click="submitOtherInfo"
                        >
                          <i class="fa-regular fa-circle-check me-1"></i>
                          Update changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- modal -->

                <div class="px-3 py-2">
                  <p class="fs-12 mb-0">Expense ID: {{ expense.ex_id }}</p>
                  <p class="fs-12 mb-0">
                    Expense Date: {{ formatDate(expense.cdate) }}
                  </p>

                  <a
                    v-if="expense?.ex_img != ''"
                    :href="`${this.imageURL}/${expense?.ex_img}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="fs-12 mb-0 text-primary"
                    >Show Attachment <span class="fa fa-paperclip"></span
                  ></a>

                  <a
                    v-else
                    rel="noopener noreferrer"
                    class="fs-12 mb-0 text-primary"
                    >No Attachment <span class="fa fa-paperclip"></span
                  ></a>

                  <p
                    class="fs-12 mt-1 mb-0 text-primary text-decoration-underline"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteEXModal"
                    style="cursor: pointer"
                  >
                    Delete Expense
                  </p>
                </div>

                <div
                  class="modal fade"
                  id="deleteEXModal"
                  tabindex="-1"
                  aria-labelledby="deleteEXModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-custom">
                    <div class="modal-content modal-content-custom">
                      <div class="modal-header">
                        <p class="fs-16 mb-1" id="deleteEXModalLabel">
                          <img
                            src="../assets/image/alert.png"
                            class="alert-icon me-1"
                            alt=""
                            srcset=""
                          />
                          Are you sure you want to delete this?
                        </p>
                      </div>

                      <div class="p-2 d-flex justify-content-end">
                        <button
                          type="button"
                          class="btn close-button me-2"
                          data-bs-dismiss="modal"
                        >
                          <i class="fa-regular fa-circle-xmark me-1"></i> Cancel
                        </button>
                        <button
                          data-bs-dismiss="modal"
                          type="button"
                          class="btn action-button"
                          @click="deleteExpenseFunc"
                        >
                          <i class="fa-regular fa-circle-check me-1"></i>Delete
                          Expense
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8 px-0">
              <div class="d-flex bg-light border-bottom">
                <div class="py-2 px-3 border-end">
                  <p
                    class="m-0 text-muted fs-12"
                    style="cursor: pointer"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#updateDataCanvas"
                    v-if="editPrivilege.includes('expenselist')"
                  >
                    <i class="fa-solid fa-pen me-1"></i>Edit
                  </p>
                </div>
                <!-- <div class="py-2 px-3 border-end">
                  <p class="m-0 text-muted fs-12">
                    <i class="fa-solid fa-envelope me-1"></i>Send
                  </p>
                </div> -->
                <div class="py-2 px-3 border-end">
                  <p
                    class="m-0 text-muted fs-12"
                    @click="printView('printID')"
                    style="cursor: pointer"
                  >
                    <i class="fa-solid fa-print me-1"></i>Print
                  </p>
                </div>
                <div class="py-2 px-3 border-end">
                  <p class="m-0 text-muted fs-12">
                    <i class="fa-solid fa-chevron-down me-1"></i>Mark As
                  </p>
                </div>
              </div>

              <div class="p-4">
                <div id="printID" class="p-5 print_view">
                  <table class="w-100">
                    <thead>
                      <tr>
                        <th class="fw-normal pb-2">
                          <div class="col-lg-12">
                            <div
                              class="d-flex align-items-center justify-content-between border-bottom"
                            >
                              <div class="w-40">
                                <div class="d-flex align-items-center">
                                  <img
                                    :src="`${this.imageURL}/${orgInfo.logo}`"
                                    class="report-logo me-2"
                                    alt=""
                                    srcset=""
                                  />
                                </div>
                              </div>
                              <div class="text-end">
                                <p class="fs-40 mb-1">Expense Voucher</p>
                                <p class="fs-14 m-0">#{{ expense.ex_id }}</p>
                              </div>
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <td>
                        <div class="my-2">
                          <table
                            class="table table-bordered mb-3"
                            style="border: 1px solid #eeeeee"
                          >
                            <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Expense By
                              </th>
                              <td class="fs-12 py-1 px-2" width="40%">
                                {{ expense.empoloyee_name }}
                              </td>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Create Date
                              </th>
                              <td class="fs-12 py-1 px-2">
                                {{ formatDate(expense.cdate) }}
                              </td>
                            </tr>
                            <!-- <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Description
                              </th>
                              <td class="fs-12 py-1 px-2" colspan="3">
                                {{ expense.ex_des }}
                              </td>
                            </tr> -->
                          </table>
                        </div>

                        <div class="row mb-3">
                          <div class="col-lg-12">
                            <div class="border px-2 py-1">
                              <p class="mb-0 fs-13 font-weight-600">
                                Expense Item
                              </p>
                            </div>
                            <div class="bg-light border border-top-0">
                              <div class="d-flex px-2">
                                <div class="py-1 w-5">
                                  <p class="mb-0 fs-12 font-weight-600">SL</p>
                                </div>
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Item Name
                                  </p>
                                </div>
                                <div class="py-1 w-55">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Item Description
                                  </p>
                                </div>

                                <div class="py-1 w-10 text-end">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Price
                                  </p>
                                </div>
                              </div>
                            </div>

                            <!-- map item -->
                            <div
                              class="border border-top-0"
                              v-for="(item, index) in expense_item"
                              :key="item"
                            >
                              <div class="d-flex px-2">
                                <div class="py-1 w-5">
                                  <p class="mb-0 fs-12">{{ index + 1 }}</p>
                                </div>
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12">{{ item.item }}</p>
                                </div>
                                <div class="py-1 w-55">
                                  <p class="mb-0 fs-12">{{ item.des }}</p>
                                </div>
                                <div class="py-1 w-10 text-end">
                                  <p class="mb-0 fs-12">
                                    {{ parseFloat(item.amount).toFixed(2) }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    TOTAL
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(expense.st_amount).toFixed(2)
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    VAT({{
                                      parseFloat(expense.vatpercent).toFixed(2)
                                    }}%)
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{ parseFloat(expense.t_tax).toFixed(2) }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Grand Total
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(expense.t_amount).toFixed(2)
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="border my-3">
                              <div class="d-flex px-2">
                                <div class="w-20 border-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    In words
                                  </p>
                                </div>
                                <div class="w-80 py-1 font-weight-600">
                                  <p class="mb-0 fs-12 px-2 text-uppercase">
                                    {{ convertToWordsWithCurrency }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="authrity w-30 pt-5 mt-5">
                              <p class="m-0 fs-12 border-top">Signature</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td style="height: 50px"></td>
                      </tr>
                    </tfoot>
                  </table>
                  <footer
                    class="border-top pt-2 view_hide"
                    style="position: fixed; bottom: 0; left: 0; right: 0"
                  >
                    <div class="container">
                      <div class="row text-center">
                        <div class="col-lg-12 d-flex justify-content-center">
                          <p class="m-0 fs-10 font-weight-600 me-1">
                            <i class="fa-solid fa-location-dot me-1"></i>
                            Chattogram Office:
                          </p>
                          <p class="m-0 fs-10">
                            {{ orgInfo.org_address }}, {{ orgInfo.org_city }}
                            -
                            {{ orgInfo.org_zipCode }},
                            {{ orgInfo.org_country }}
                          </p>
                        </div>

                        <div class="col-lg-12 d-flex justify-content-center">
                          <p class="m-0 fs-10 font-weight-600 me-1">
                            <i class="fa-solid fa-location-dot me-1"></i>
                            Dhaka Office:
                          </p>
                          <p class="m-0 fs-10">
                            {{ orgInfo.anorg_address }},
                            {{ orgInfo.anorg_city }}
                            -
                            {{ orgInfo.anorg_zipCode }},
                            {{ orgInfo.anorg_country }}
                          </p>
                        </div>
                        <div class="col-lg-12 d-flex justify-content-center">
                          <span class="m-0 fs-10 me-2">
                            <i class="fa-solid fa-square-phone me-1"></i
                            >{{ orgInfo.phone }}
                          </span>
                          <span class="m-0 fs-10 me-2">
                            <i class="fa-solid fa-square-envelope me-1"></i
                            >{{ orgInfo.email }}
                          </span>
                          <span class="m-0 fs-10">
                            <i class="fa-solid fa-globe me-1"></i
                            >{{ orgInfo.website }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <Footer /> -->
      </div>
    </div>

    <!-- offcanvas -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="updateDataCanvas"
      aria-labelledby="updateDataCanvasLabel"
    >
      <div class="offcanvas-header border-bottom">
        <p class="offcanvas-title fs-16" id="updateDataCanvasLabel">
          Update Expense Item
        </p>
        <button
          type="button"
          class="btn-close text-muted"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="p-3 bg-light mb-3 rounded">
          <p class="fs-16 font-weight-600 mb-0">
            {{ expense.ehead }}
          </p>

          <p class="fs-12 mb-0">
            {{ parseFloat(expense.t_amount).toFixed(2) }} {{ orgInfo.currency }}
          </p>
        </div>
        <div class="row mb-3">
          <div class="col-lg-12">
            <div class="border px-2 py-1">
              <p class="mb-0 fs-13 font-weight-600">Expense Item</p>
            </div>
            <div class="bg-light border border-top-0">
              <div class="d-flex px-2">
                <div class="py-1 w-5">
                  <p class="mb-0 fs-12 font-weight-600">SL</p>
                </div>
                <div class="py-1 w-30">
                  <p class="mb-0 fs-12 font-weight-600">Item Name</p>
                </div>
                <div class="py-1 w-55">
                  <p class="mb-0 fs-12 font-weight-600">Item Description</p>
                </div>

                <div class="py-1 w-10 text-end">
                  <p class="mb-0 fs-12 font-weight-600">Price</p>
                </div>
              </div>
            </div>

            <!-- map item -->
            <div
              class="border border-top-0"
              v-for="(item, index) in expense_item"
              :key="item"
            >
              <div class="d-flex px-2">
                <div class="py-1 w-5">
                  <p class="mb-0 fs-12">{{ index + 1 }}</p>
                </div>
                <div class="py-1 w-30">
                  <p class="mb-0 fs-12">
                    <input
                      class="form-control text-start rounded-0 border-0 shadow-none inputa px-1"
                      v-model="item.item"
                    />
                  </p>
                </div>

                <div class="py-1 w-55">
                  <p class="mb-0 fs-12">
                    <input
                      class="form-control text-start rounded-0 border-0 shadow-none inputa px-1"
                      v-model="item.des"
                    />
                  </p>
                </div>

                <!-- <div class="py-1 w-10 text-end">
                  <p class="mb-0 fs-12">
                    <input
                      class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                      v-model="item.tax"
                      @input="updatePrice(item)"
                    />
                  </p>
                </div> -->
                <div class="py-1 w-10 text-end">
                  <p class="mb-0 fs-12">
                    <input
                      class="form-control rounded-0 border-0 shadow-none inputa px-1 text-end"
                      v-model="item.amount"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="border border-top-0">
              <div class="d-flex px-2">
                <div class="w-90 border-end text-end py-1 px-2">
                  <p class="mb-0 fs-12 font-weight-600">TOTAL</p>
                </div>
                <div class="w-10 py-1 text-end">
                  <p class="mb-0 fs-12">
                    {{ subTotalPrice }}
                  </p>
                </div>
              </div>
            </div>

            <div class="border border-top-0">
              <div class="d-flex px-2">
                <div class="w-90 border-end text-end py-1 px-2">
                  <p class="mb-0 fs-12 font-weight-600">VAT (%)</p>
                </div>
                <div class="w-10 py-1 text-end">
                  <input
                    class="form-control text-end border-0 rounded-0 shadow-none inputa px-0"
                    type="number"
                    v-model="expense.vatpercent"
                    @input="calculateTax"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div class="border border-top-0">
              <div class="d-flex px-2">
                <div class="w-90 border-end text-end py-1 px-2">
                  <p class="mb-0 fs-12 font-weight-600">Vat(+)</p>
                </div>
                <div class="w-10 py-1 text-end">
                  <p class="mb-0 fs-12">
                    {{ parseFloat(vatAmount).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="border border-top-0">
              <div class="d-flex px-2">
                <div class="w-90 border-end text-end py-1 px-2">
                  <p class="mb-0 fs-12 font-weight-600">Grand Total</p>
                </div>
                <div class="w-10 py-1 text-end">
                  <p class="mb-0 fs-12">{{ adjustedTotal }}</p>
                </div>
              </div>
            </div>

            <div class="col-lg-3 my-3">
              <button
                @click="updatePayment"
                class="border-0 w-100 action-button py-1"
              >
                Update
              </button>
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
import { ToWords } from "to-words";
import router from "@/router";

export default {
  props: [" ex_id "],
  name: "expenseoverview",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      id: "",
      expense: [],
      expense_item: [],
      v_id: "",
      v_loc: "",
      v_poc: "",
      v_poc_contact: "",

      vatAmount: 0,

      subTotalPriceNew: 0,
      totalTaxAmount: 0,
      imageURL: process.env.VUE_APP_IMAGE_SERVER,
      // expense_itemWithPrice: [],

      toWords: new ToWords({
        localeCode: "en-BD",
        converterOptions: {
          currency: true,
          ignoreDecimal: false,
          ignoreZeroCurrency: false,
          doNotAddOnly: false,
          currencyOptions: {
            name: "BDT",
            plural: "BDT",
            symbol: "BDT",
            fractionalUnit: {
              name: "Paisa",
              plural: "Paisa",
              symbol: "",
            },
          },
        },
      }),
    };
  },

  methods: {
    auth() {
      if (!this.viewPrivilege.includes("expenselist")) {
        this.$router.push("/dashboard");
      }
    },
    calculateTax() {
      const taxper = parseFloat(this.expense.vatpercent) || 0;

      const subTPrice = parseFloat(this.subTotalPrice) || 0;

      const vatAmount = +subTPrice * (taxper / 100);

      this.vatAmount = +vatAmount.toFixed(2);
    },

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    getexAllData() {
      this.ex_id = this.$route.params.id;
      console.log(this.id);

      const data = new FormData();
      data.append("ex_id", this.ex_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getExpenseAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.expense = data.message[0];
          this.vatAmount = data.message[0].t_tax;
          this.expense_item = data.message2;
        })
        .catch((err) => console.log(err.message));
    },

    submitOtherInfo() {
      this.updateOtherInfo;
    },

    updatePrice(item) {
      const amount = parseFloat(item.amount) || 0;

      const taxAmount = (amount * item.tax) / 100;

      item.amount = amount.toFixed(2);
      item.taxAmount = taxAmount.toFixed(2);

      this.calculateTax();
    },

    deleteExpenseFunc() {
      this.ex_id = this.$route.params.id;
      const data = new FormData();
      data.append("ex_id", this.ex_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/DeleteExpense`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            if (this.expense.p_mode === "bank") {
              this.deleteBankTransaction();
            } else {
              router.push(`/expenselist`);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteBankTransaction() {
      this.ex_id = this.$route.params.id;
      const data = new FormData();
      data.append("payID", this.ex_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteBankTransaction`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          router.push(`/expenselist`);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* submitHandler() {
      this.updatePayment();
    }, */

    async updatePayment() {
      this.ex_id = this.$route.params.id;

      const data = new FormData();

      data.append("ex_id", this.ex_id);
      data.append("st_amount", this.subTotalPriceNew);
      data.append("t_tax", this.vatAmount);
      data.append("vatpercent", this.expense.vatpercent);
      data.append("t_amount", this.subTotalPriceNew + this.vatAmount);

      data.append("date", this.expense.cdate.slice(0, 10));
      data.append(
        "description",
        this.expense.ex_des + "," + this.expense.empoloyee_name
      );
      data.append("p_mode", this.expense.p_mode);
      data.append("ehead", this.expense.ehead);
      data.append("user", this.userInfo.username);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/updateExpenseinfo`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        console.log(res.message);

        if (res.message == true) {
          this.updatePayment_items();
          if (this.expense.p_mode === "bank") {
            this.updateBankTransaction();
          }
        }
      } catch (error) {
        console.error(error);
      }
    },

    updateBankTransaction() {
      this.ex_id = this.$route.params.id;
      const data = new FormData();
      data.append("payID", this.ex_id);
      data.append("credit", "0");
      data.append("debit", this.subTotalPriceNew + this.vatAmount);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateBankTransaction`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.update = this.update + 1;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePayment_items() {
      this.expense_item.map((item) => {
        const data = new FormData();
        data.append("id", item.id);
        data.append("item", item.item);
        data.append("des", item.des);
        data.append("tax", item.tax);
        data.append("amount", item.amount);

        fetch(`${process.env.VUE_APP_SERVER_URL}/updateExpenseItem`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.message);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    updateOtherInfo() {
      const data = new FormData();
      this.ex_id = this.$route.params.id;
      data.append("cdate", this.expense.cdate);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateExpenseDate`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    printView(divID) {
      const printSection = document.querySelector(".print_section");
      const targetDiv = document.getElementById(divID);

      if (printSection && targetDiv) {
        printSection.innerHTML = targetDiv.innerHTML;
      }
      window.print();
    },

    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate();
      const month = formatedDate.getMonth() + 1;
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  async mounted() {
    this.getexAllData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  updated() {},

  computed: {
    expense_itemWithPrice() {
      return this.expense_item.map((item) => {
        const amount = parseFloat(item.amount) || 0;
        const taxAmount = (amount * item.tax) / 100;
        return {
          ...item,
          amount: amount.toFixed(2),
          taxAmount: taxAmount.toFixed(2),
        };
      });
    },

    convertToWordsWithCurrency() {
      const amount = parseFloat(this.expense.t_amount);

      if (!isNaN(amount) && isFinite(amount)) {
        return this.toWords.convert(amount);
      } else {
        return "Invalid amount";
      }
    },

    subTotalPrice() {
      this.subTotalPriceNew = this.expense_item.reduce(
        (total, item) => total + +item.amount,
        0
      );
      return this.expense_item.reduce((total, item) => total + +item.amount, 0);
    },
    /* totalTax() {
      this.totalTaxAmount = this.expense_item.reduce(
        (total, item) => total + (+item.taxAmount || 0),
        0
      );
      return this.expense_item.reduce(
        (total, item) => total + (+item.taxAmount || 0),
        0
      );
    }, */

    adjustedTotal() {
      return this.subTotalPriceNew + this.vatAmount;
    },

    ...mapState(["userInfo"]),
    ...mapState(["orgInfo"]),
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
  },
};
</script>
<style>
.offcanvas {
  width: 55% !important;
}
</style>
