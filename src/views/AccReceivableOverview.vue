<template>
  <div class="print_section"></div>

  <div class="view-section">
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar-container-right scroll-content">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Payment Receipt Overview</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 py-0 px-0 border-end">
              <div class="p-3 pb-0">
                <p class="fs-16 font-weight-600 mb-0">
                  {{ payment_receipt.org_name }}
                </p>

                <p class="fs-12 mb-0">
                  {{ parseFloat(payment_receipt.t_amount).toFixed(2) }}
                  {{ orgInfo.currency }}
                </p>
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-sack-dollar me-1"></i>
                  <span class="text-capitalize">
                    {{
                      payment_receipt.p_mode === "bank"
                        ? payment_receipt.bname + " (" + this.branch_name + ")"
                        : payment_receipt.p_mode
                    }}</span
                  >
                </p>
                <p class="fs-12 mb-0">
                  <strong>#REF: </strong>
                  {{ payment_receipt.reference }}
                </p>
              </div>

              <div class="bg-light p-3 py-2 mt-3">
                <p class="mb-1 fs-13 font-weight-600">Person of Contact</p>
                <p class="fs-12 font-weight-600 mb-0">
                  {{ payment_receipt.sales_person }}
                </p>
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-mobile-screen me-1"></i
                  >{{ v_poc_contact }}
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
                    v-if="editPrivilege.includes('accounts_receivable_list')"
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
                          >Completion Date
                        </label>
                        <input
                          class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                          type="date"
                          v-model="payment_receipt.cdate"
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
                          @click="updateOtherInfo"
                        >
                          <i class="fa-regular fa-circle-check me-1"></i>Update
                          changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="px-3 py-2">
                  <p class="fs-12 mb-0">
                    Invoice ID: {{ payment_receipt.in_id }}
                  </p>
                  <p class="fs-12 mb-0">
                    Completion Date: {{ formatDate(payment_receipt.cdate) }}
                  </p>
                  <p
                    class="fs-12 mt-1 mb-0 text-primary text-decoration-underline"
                    data-bs-toggle="modal"
                    data-bs-target="#deletePRModal"
                    style="cursor: pointer"
                  >
                    Delete Payment
                  </p>
                </div>

                <div
                  class="modal fade"
                  id="deletePRModal"
                  tabindex="-1"
                  aria-labelledby="deletePRModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-custom">
                    <div class="modal-content modal-content-custom">
                      <div class="modal-header">
                        <p class="fs-16 mb-1" id="deletePRModalLabel">
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
                          @click="deletePaymentFunc"
                        >
                          <i class="fa-regular fa-circle-check me-1"></i>Delete
                          Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8 px-0">
              <div class="d-flex bg-light border-bottom">
                <!-- <div class="py-2 px-3 border-end">
                  <p class="m-0 text-muted fs-12" style="cursor: pointer" data-bs-toggle="offcanvas"
                    data-bs-target="#updateDataCanvas" v-if="editPrivilege.includes('accounts_receivable_list')">
                    <i class="fa-solid fa-pen me-1"></i>Edit
                  </p>
                </div> -->

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
                                <p class="fs-40 mb-1">Payment Receipt</p>
                                <p class="fs-14 m-0">
                                  #{{ payment_receipt.preceipt_id }}
                                </p>
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
                                Customer
                              </th>
                              <td class="fs-12 py-1 px-2" width="40%">
                                {{ payment_receipt.org_name }}
                              </td>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Create Date
                              </th>
                              <td class="fs-12 py-1 px-2">
                                {{ formatDate(payment_receipt.cdate) }}
                              </td>
                            </tr>
                            <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Project Name
                              </th>
                              <td class="fs-12 py-1 px-2" width="40%">
                                {{ payment_receipt.project_name }}
                              </td>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Reference
                              </th>
                              <td class="fs-12 py-1 px-2">
                                {{ payment_receipt.reference }}
                              </td>
                            </tr>
                          </table>
                        </div>

                        <div class="row mb-3">
                          <div class="col-lg-12">
                            <div class="border px-2 py-1">
                              <p class="mb-0 fs-13 font-weight-600">
                                Receipt Item
                              </p>
                            </div>
                            <div class="bg-light border border-top-0">
                              <div class="d-flex px-2">
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Invoice Number
                                  </p>
                                </div>
                                <div class="py-1 w-40">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Invoice Due Amount
                                  </p>
                                </div>

                                <div class="py-1 w-30">
                                  <p
                                    class="mb-0 fs-12 font-weight-600 text-end"
                                  >
                                    Received Amount
                                  </p>
                                </div>
                                <div class="py-1 w-30">
                                  <p
                                    class="mb-0 fs-12 font-weight-600 text-end"
                                  >
                                    VAT Amount
                                  </p>
                                </div>
                                <div class="py-1 w-30">
                                  <p
                                    class="mb-0 fs-12 font-weight-600 text-end"
                                  >
                                    Tax Amount
                                  </p>
                                </div>
                              </div>
                            </div>

                            <!-- map item -->
                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12">
                                    {{ payment_receipt.in_id }}
                                  </p>
                                </div>
                                <div class="py-1 w-40">
                                  <p class="mb-0 fs-12">
                                    {{
                                      (
                                        +payment_receipt.t_amount +
                                        +payment_receipt.due
                                      ).toFixed(2)
                                    }}
                                  </p>
                                </div>
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 text-end">
                                    {{
                                      parseFloat(
                                        payment_receipt.st_amount
                                      ).toFixed(2)
                                    }}
                                  </p>
                                </div>

                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 text-end">
                                    {{
                                      parseFloat(payment_receipt.t_tax).toFixed(
                                        2
                                      )
                                    }}
                                  </p>
                                </div>

                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 text-end">
                                    {{
                                      parseFloat(
                                        payment_receipt.tax_amount
                                      ).toFixed(2)
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Received Amount
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(
                                        payment_receipt.st_amount
                                      ).toFixed(2)
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    VAT Amount
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(payment_receipt.t_tax).toFixed(
                                        2
                                      )
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    TAX Amount
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(
                                        payment_receipt.tax_amount
                                      ).toFixed(2)
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">Due</p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(payment_receipt.due).toFixed(2)
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="authrity w-30 pt-5 mt-5">
                          <p class="m-0 fs-12 border-top">Signature</p>
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
                      <div class="rowtext-center">
                        <div class="col-lg-12 text-center">
                          <p class="m-0 fs-11">
                            <i class="fa-solid fa-location-dot me-1"></i
                            >{{ orgInfo.org_address }},
                            {{ orgInfo.org_city }}
                            -
                            {{ orgInfo.org_zipCode }},
                            {{ orgInfo.org_country }}
                          </p>
                        </div>
                        <div class="col-lg-12 text-center">
                          <span class="m-0 fs-11 me-2">
                            <i class="fa-solid fa-square-phone me-1"></i
                            >{{ orgInfo.phone }}
                          </span>
                          <span class="m-0 fs-11">
                            <i class="fa-solid fa-square-envelope me-1"></i
                            >{{ orgInfo.email }}
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
        <Footer />
      </div>
    </div>

    <!-- offcanvas -->
    <!-- 
    <div class="offcanvas offcanvas-end" tabindex="-1" id="updateDataCanvas" aria-labelledby="updateDataCanvasLabel">
      <div class="offcanvas-header border-bottom">
        <p class="offcanvas-title fs-16" id="updateDataCanvasLabel">
          Update PO Item
        </p>
        <button type="button" class="btn-close text-muted" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="p-3 bg-light mb-3 rounded">
          <p class="fs-16 font-weight-600 mb-0">
            {{ payment_receipt.project_name }}
          </p>

          <p class="fs-12 mb-0">{{ payment_receipt.t_amount }} {{ orgInfo.currency }}</p>
          <p class="fs-12 mb-0">
            <i class="fa-solid fa-circle-info me-1"></i>
          </p>
        </div>
        <div>
          <div class="bg-light border border-top">
            <div class="d-flex px-2">
              <div class="py-1 w-30">
                <p class="mb-0 fs-12 font-weight-600">Invoice Number</p>
              </div>
              <div class="py-1 w-40">
                <p class="mb-0 fs-12 font-weight-600">Invoice Due Amount</p>
              </div>

              <div class="py-1 w-30">
                <p class="mb-0 fs-12 font-weight-600 text-end">
                  Received Amount
                </p>
              </div>
              <div class="py-1 w-30">
                <p class="mb-0 fs-12 font-weight-600 text-end">VAT Amount</p>
              </div>
              <div class="py-1 w-30">
                <p class="mb-0 fs-12 font-weight-600 text-end">Tax Amount</p>
              </div>
            </div>
          </div>
          <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="py-1 w-30 border-end">
                <p class="mb-0 fs-12">
                  <input class="form-control text-start rounded-0 border-0 shadow-none inputa px-1"
                    v-model="payment_receipt.in_id" disabled />
                </p>
              </div>
              <div class="py-1 w-40 border-end">
                <p class="mb-0 fs-12">
                  <input class="form-control text-start rounded-0 border-0 shadow-none inputa px-1"
                    :value="+payment_receipt.t_amount + +payment_receipt.due" disabled />
                </p>
              </div>
              <div class="py-1 w-30 text-end border-end">
                <p class="mb-0 fs-12 text-end">
                  <input class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                    v-model="payment_receipt.st_amount" @input="calculatedDue(this.payment_receipt)" />
                </p>
              </div>
              <div class="py-1 w-30 text-end">
                <p class="mb-0 fs-12">
                  <input class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                    v-model="payment_receipt.t_tax" @input="calculatedDue(this.payment_receipt)" />
                </p>
              </div>
              <div class="py-1 w-30 text-end">
                <p class="mb-0 fs-12">
                  <input class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                    v-model="payment_receipt.tax_amount" @input="calculatedDue(this.payment_receipt)" />
                </p>
              </div>
            </div>
          </div>

          <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">Received Amount</p>
              </div>
              <div class="w-10 py-0 text-end">
                <input class="form-control text-end border-0 rounded-0 shadow-none inputa px-0" type="number"
                  v-model="payment_receipt.st_amount" disabled />
              </div>
            </div>
          </div>
          <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">VAT Amount</p>
              </div>
              <div class="w-10 py-0 text-end">
                <input class="form-control text-end border-0 rounded-0 shadow-none inputa px-0" disabled type="number"
                  v-model="payment_receipt.t_tax" />
              </div>
            </div>
          </div>
          <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">TAX Amount</p>
              </div>
              <div class="w-10 py-0 text-end">
                <input class="form-control text-end border-0 rounded-0 shadow-none inputa px-0" disabled type="number"
                  v-model="payment_receipt.tax_amount" />
              </div>
            </div>
          </div>

          <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">Due</p>
              </div>
              <div class="w-10 py-1 text-end">
                <p class="mb-0 fs-12">
                  {{ calcDue }}
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 my-3">
            <button @click="submitHandler" class="border-0 w-100 action-button py-1">
              Update
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { mapState } from "vuex";
import router from "@/router";

export default {
  props: [" preceipt_id "],
  name: "accreceivableoverview",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      branch_name: "",
      id: null,
      payment_receipt: [],
      receipt_item: [],

      v_id: "",
      v_loc: "",
      v_poc: "",
      v_poc_contact: "",

      // canvas
      subTotalPriceNew: 0,
      totalTaxAmount: 0,

      calcDue: 0,

      adjustment: 0,
      imageURL: process.env.VUE_APP_IMAGE_SERVER,
      update: 0,
    };
  },

  methods: {
    auth() {
      if (!this.viewPrivilege.includes("accounts_receivable_list")) {
        this.$router.push("/dashboard");
      }
    },

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    getPReceiptAllData() {
      this.preceipt_id = this.$route.params.id;

      const data = new FormData();
      data.append("preceipt_id", this.preceipt_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPReceiptAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          this.payment_receipt = data.message[0];
          this.calcDue = data.message[0].due;
          console.log(data);
          if (data.message[0].bank_ID) {
            const bankID = new FormData();
            bankID.append("b_id", data.message[0].bank_ID);

            fetch(`${process.env.VUE_APP_SERVER_URL}/getBankbalanceData`, {
              method: "POST",
              body: bankID,
            })
              .then((res) => res.json())
              .then((data) => {
                this.branch_name = data.message[0].branch_name;
              });
          }

          this.receipt_item = data.message2.map((item) => {
            const taxAmount = (item.amount * item.tax) / 100;

            return {
              ...item,
              taxAmount,
            };
          });
        })
        .catch((err) => console.log(err.message));
    },

    updatePrice(item) {
      const rate = parseFloat(item.rate) || 0;
      const qty = parseFloat(item.qty) || 0;

      const amount = rate * qty;

      const discount_amount = (item.discount / 100) * amount;

      const price = amount - discount_amount;

      const taxAmount = (price * item.tax) / 100;

      item.amount = price.toFixed(2);
      item.taxAmount = taxAmount.toFixed(2);
    },

    submitHandler() {
      this.updateAR();
      // this.updateAR_items();
    },

    calculatedDue(item) {
      const receivedAmount = +item.st_amount;
      const receivedVatAmount = +item.t_tax;
      const receivedTaxAmount = +item.tax_amount;

      this.calcDue =
        +item.t_amount +
        +item.due -
        (receivedAmount + receivedVatAmount + receivedTaxAmount);
    },

    updateAR() {
      this.preceipt_id = this.$route.params.id;

      const data = new FormData();
      data.append("preceipt_id", this.preceipt_id);
      data.append("st_amount", this.payment_receipt.st_amount);
      data.append("t_tax", this.payment_receipt.t_tax);
      data.append("tax_amount", this.payment_receipt.tax_amount);
      data.append("due", this.calcDue);
      data.append("user", this.userInfo.username);
      data.append("p_mode", this.payment_receipt.p_mode);
      data.append("date", this.payment_receipt.cdate.slice(0, 10));
      data.append(
        "t_amount",
        +this.payment_receipt.st_amount +
          +this.payment_receipt.t_tax +
          +this.payment_receipt.tax_amount
      );
      data.append(
        "description",
        this.payment_receipt.project_name + " " + this.payment_receipt.org_name
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/updatePaymentReceipt`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.message === true) {
            this.update = this.update + 1;
            if (this.payment_receipt.p_mode === "bank") {
              this.updateBankTransaction();
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateBankTransaction() {
      this.preceipt_id = this.$route.params.id;
      const data = new FormData();
      data.append("payID", this.preceipt_id);
      data.append("debit", "0");
      data.append(
        "credit",
        +this.payment_receipt.st_amount +
          +this.payment_receipt.t_tax +
          +this.payment_receipt.tax_amount
      );

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
    updateAR_items() {
      this.receipt_item.map((item) => {
        const data = new FormData();
        data.append("id", item.id);
        data.append("item", item.item);
        data.append("des", item.des);
        data.append("rate", item.rate);
        data.append("qty", item.qty);

        data.append("tax", item.tax);
        data.append("amount", item.amount);

        fetch(`${process.env.VUE_APP_SERVER_URL}/updateReceiptItems`, {
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

    deletePaymentFunc() {
      this.preceipt_id = this.$route.params.id;

      const data = new FormData();
      data.append("preceipt_id", this.preceipt_id);
      data.append("t_amount", this.payment_receipt.t_amount);
      data.append("in_id", this.payment_receipt.in_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/DeletePaymentReceipt`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            if (this.payment_receipt.p_mode === "bank") {
              this.deleteBankTransaction();
            } else {
              router.push(`/accounts_receivable_list`);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteBankTransaction() {
      this.preceipt_id = this.$route.params.id;
      const data = new FormData();
      data.append("payID", this.preceipt_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteBankTransaction`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          router.push(`/accounts_receivable_list`);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateOtherInfo() {
      const data = new FormData();
      data.append("preceipt_id", this.preceipt_id);
      data.append("cdate", this.payment_receipt.cdate);
      data.append("project_duration", this.payment_receipt.project_duration);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updatePaymentReceiptOtherInfo`, {
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
    this.getPReceiptAllData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    receipt_itemWithPrice() {
      return this.receipt_item.map((item) => {
        const rate = parseFloat(item.rate) || 0;

        const qty = parseFloat(item.qty) || 0;

        const amount = rate * qty;

        const discount_amount = (item.discount / 100) * amount;

        const price = amount - discount_amount;

        const taxAmount = (price * item.tax) / 100;
        return {
          ...item,
          price: +price.toFixed(2),
          taxAmount: +taxAmount.toFixed(2),
        };
      });
    },

    subTotalPrice() {
      this.subTotalPriceNew = this.receipt_item.reduce(
        (total, item) => total + +item.amount,
        0
      );
      return this.receipt_item.reduce((total, item) => total + +item.amount, 0);
    },
    totalTax() {
      this.totalTaxAmount = this.receipt_item.reduce(
        (total, item) => total + (+item.taxAmount || 0),
        0
      );
      return this.receipt_item.reduce(
        (total, item) => total + (+item.taxAmount || 0),
        0
      );
    },

    adjustedTotal() {
      return this.subTotalPriceNew + this.totalTaxAmount - this.adjustment;
    },

    ...mapState(["orgInfo"]),
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
    ...mapState(["userInfo"]),
  },

  watch: {
    update() {
      setTimeout(() => {
        this.getPReceiptAllData();
      }, 2000);
    },
  },
};
</script>
<style scoped>
.offcanvas {
  width: 55% !important;
}
</style>
