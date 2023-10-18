<template>
  <div class="print_section"></div>

  <div class="view-section">
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar-container-right scroll-content">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Paid Bill Overview</p>
            </div>
          </div>
          <!-- projects budget -->
          <div class="row">
            <div class="col-lg-4 py-0 px-0 border-end">
              <div class="p-3 pb-0">
                <p class="fs-16 font-weight-600 mb-0">
                  {{ paid_bill.vname }}
                </p>

                <p class="fs-12 mb-0">
                  {{ paid_bill.t_amount }} {{ orgInfo.currency }}
                </p>
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-sack-dollar me-1"></i>
                  <span class="text-capitalize">
                    {{
                      paid_bill.p_mode === "bank"
                        ? paid_bill.bname + " (" + this.branch_name + ")"
                        : paid_bill.p_mode
                    }}</span
                  >
                </p>
              </div>

              <div class="bg-light p-3 py-2 mt-3">
                <p class="mb-1 fs-13 font-weight-600">Person of Contact</p>
                <p class="fs-12 font-weight-600 mb-0">
                  {{ v_poc }}
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
                    v-if="editPrivilege.includes('makepaylist')"
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
                          >Create Date
                        </label>
                        <input
                          class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                          type="date"
                          v-model="paid_bill.cdate"
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
                <!-- modal -->

                <div class="px-3 py-2">
                  <p class="fs-12 mb-0">Bill ID: {{ paid_bill.bill_id }}</p>
                  <p class="fs-12 mb-0">
                    Create Date: {{ formatDate(paid_bill.cdate) }}
                  </p>
                  <p class="fs-12 mb-0">
                    <strong>#REF: </strong>
                    {{
                      paid_bill.reference === "" ? "N/A" : paid_bill.reference
                    }}
                  </p>

                  <p
                    class="fs-12 mt-1 mb-0 text-primary text-decoration-underline"
                    data-bs-toggle="modal"
                    data-bs-target="#deletePayModal"
                    style="cursor: pointer"
                  >
                    Delete Payment
                  </p>
                </div>

                <div
                  class="modal fade"
                  id="deletePayModal"
                  tabindex="-1"
                  aria-labelledby="deletePayModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-custom">
                    <div class="modal-content modal-content-custom">
                      <div class="modal-header">
                        <p class="fs-16 mb-1" id="deletePayModalLabel">
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
                          type="button"
                          data-bs-dismiss="modal"
                          class="btn action-button"
                          @click="deletePaidBillFunc"
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
                    data-bs-target="#updateDataCanvas" v-if="editPrivilege.includes('makepaylist')">
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
                                <p class="fs-40 mb-1">Paid Bill</p>
                                <p class="fs-14 m-0">#{{ paid_bill.pay_id }}</p>
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
                                Supplier
                              </th>
                              <td class="fs-12 py-1 px-2" width="40%">
                                {{ paid_bill.vname }}
                              </td>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Create Date
                              </th>
                              <td class="fs-12 py-1 px-2">
                                {{ formatDate(paid_bill.cdate) }}
                              </td>
                            </tr>
                            <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Location
                              </th>
                              <td class="fs-12 py-1 px-2" width="40%">
                                {{ v_loc }}
                              </td>
                            </tr>
                            <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Reference
                              </th>
                              <td class="fs-12 py-1 px-2" colspan="3">
                                {{ paid_bill.reference }}
                              </td>
                            </tr>
                          </table>
                        </div>

                        <div class="row mb-3">
                          <div class="col-lg-12">
                            <div class="border px-2 py-1">
                              <p class="mb-0 fs-13 font-weight-600">
                                Paid Item
                              </p>
                            </div>
                            <div class="bg-light border border-top-0">
                              <div class="d-flex px-2">
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Bill Number
                                  </p>
                                </div>
                                <div class="py-1 w-40">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Bill Amount
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
                                    {{ paid_bill.bill_id }}
                                  </p>
                                </div>
                                <div class="py-1 w-40">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(paid_bill.t_amount).toFixed(2)
                                    }}
                                  </p>
                                </div>
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 text-end">
                                    {{
                                      parseFloat(paid_bill.st_amount).toFixed(2)
                                    }}
                                  </p>
                                </div>
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 text-end">
                                    {{ parseFloat(paid_bill.t_tax).toFixed(2) }}
                                  </p>
                                </div>
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 text-end">
                                    {{
                                      parseFloat(paid_bill.tax_amount).toFixed(
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
                                    Received Amount
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(paid_bill.st_amount).toFixed(2)
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
                                    {{ parseFloat(paid_bill.t_tax).toFixed(2) }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Tax Amount
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(paid_bill.tax_amount).toFixed(
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
                                  <p class="mb-0 fs-12 font-weight-600">Due</p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{ parseFloat(paid_bill.due).toFixed(2) }}
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
        <Footer />
      </div>
    </div>
  </div>

  <!-- Update Canvas Modal -->

  <!-- Canvas Modal -->

  <!-- <div class="offcanvas offcanvas-end" tabindex="-1" id="updateDataCanvas" aria-labelledby="updateDataCanvasLabel">
    <div class="offcanvas-header border-bottom">
      <p class="offcanvas-title fs-16" id="updateDataCanvasLabel">
        Update Quote Item
      </p>
      <button type="button" class="btn-close text-muted" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="p-3 bg-light mb-3 rounded">
        <p class="fs-16 font-weight-600 mb-0">
          {{ paid_bill.project_name }}
        </p>

        <p class="fs-12 mb-0">{{ paid_bill.t_amount }} {{ orgInfo.currency }}</p>
        <p class="fs-12 mb-0">
          <i class="fa-solid fa-circle-info me-1"></i>
          {{ paid_bill.reference }}
        </p>
      </div>
      <div>
        <div class="bg-light border border-top">
          <div class="d-flex px-2">
            <div class="py-1 w-30">
              <p class="mb-0 fs-12 font-weight-600">Bill Number</p>
            </div>
            <div class="py-1 w-40 text-end">
              <p class="mb-0 fs-12 font-weight-600">Bill Amount</p>
            </div>
            <div class="py-1 w-30">
              <p class="mb-0 fs-12 font-weight-600 text-end">Received Amount</p>
            </div>
            <div class="py-1 w-30">
              <p class="mb-0 fs-12 font-weight-600 text-end">VAT Amount</p>
            </div>
            <div class="py-1 w-30">
              <p class="mb-0 fs-12 font-weight-600 text-end">TAX Amount</p>
            </div>
          </div>
        </div>
        <div class="border border-top-0">
          <div class="d-flex px-2">
            <div class="py-1 w-30 border-end">
              <p class="mb-0 fs-12">
                <input class="form-control text-start rounded-0 border-0 shadow-none inputa px-1" disabled
                  v-model="paid_bill.bill_id" />
              </p>
            </div>

            <div class="py-1 w-40 text-end border-end">
              <p class="mb-0 fs-12 text-end">
                <input class="form-control text-end rounded-0 border-0 shadow-none inputa px-1" disabled
                  v-model="paid_bill.t_amount" />
              </p>
            </div>
            <div class="py-1 w-30 text-end border-end">
              <p class="mb-0 fs-12">
                <input class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                  v-model="paid_bill.st_amount" @input="calculatedDue(this.paid_bill)" />
              </p>
            </div>
            <div class="py-1 w-30 text-end border-end">
              <p class="mb-0 fs-12">
                <input class="form-control text-end rounded-0 border-0 shadow-none inputa px-1" v-model="paid_bill.t_tax"
                  @input="calculatedDue(this.paid_bill)" />
              </p>
            </div>
            <div class="py-1 w-30 text-end ">
              <p class="mb-0 fs-12">
                <input class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                  v-model="paid_bill.tax_amount" @input="calculatedDue(this.paid_bill)" />
              </p>
            </div>
          </div>
        </div>

        <div class="border border-top-0">
          <div class="d-flex px-2">
            <div class="w-90 border-end text-end py-1 px-2">
              <p class="mb-0 fs-12 font-weight-600">Received Amount</p>
            </div>
            <div class="w-10 py-1 text-end">
              <p class="mb-0 fs-12">
                {{ paid_bill.st_amount }}
              </p>
            </div>
          </div>
        </div>
        <div class="border border-top-0">
          <div class="d-flex px-2">
            <div class="w-90 border-end text-end py-1 px-2">
              <p class="mb-0 fs-12 font-weight-600">VAT Amount</p>
            </div>
            <div class="w-10 py-1 text-end">
              <p class="mb-0 fs-12">
                {{ paid_bill.t_tax }}
              </p>
            </div>
          </div>

        </div>

        <div class="border border-top-0">
          <div class="d-flex px-2">
            <div class="w-90 border-end text-end py-1 px-2">
              <p class="mb-0 fs-12 font-weight-600">Tax Amount</p>
            </div>
            <div class="w-10 py-1 text-end">
              <p class="mb-0 fs-12">
                {{ paid_bill.tax_amount }}
              </p>
            </div>
          </div>

        </div>
        <div class="border border-top-0">
          <div class="d-flex px-2">
            <div class="w-90 border-end text-end py-1 px-2">
              <p class="mb-0 fs-12 font-weight-600">DUE</p>
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

  <!-- canvas modal -->
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { mapState } from "vuex";
import router from "@/router";

export default {
  props: [" pay_id "],
  name: "paymentoverview",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      branch_name: "",
      id: null,
      paid_bill: [],
      pb_item: [],

      v_id: "",
      v_loc: "",
      v_poc: "",
      v_poc_contact: "",

      // canvas

      subTotalPriceNew: 0,
      totalTaxAmount: 0,

      adjustment: 0,
      imageURL: process.env.VUE_APP_IMAGE_SERVER,
      calcDue: 0,
      update: 0,
    };
  },

  methods: {
    auth() {
      if (!this.viewPrivilege.includes("makepaylist")) {
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
    getpaymentAllData() {
      this.pay_id = this.$route.params.id;

      const data = new FormData();
      data.append("pay_id", this.pay_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPBAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message[0]);
          this.paid_bill = data.message[0];
          this.calcDue = data.message[0].due;

          this.v_id = data.message[0].v_id;

          const data2 = new FormData();
          data2.append("v_id", this.v_id);

          fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorData`, {
            method: "POST",
            body: data2,
          })
            .then((res) => res.json())
            .then((data) => {
              this.v_loc = data.message[0].v_location;
              this.v_poc = data.message[0].poc_name;
              this.v_poc_contact = data.message[0].poc_contact;
            });

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
        })
        .catch((err) => console.log(err.message));
    },

    calculatedDue(item) {
      const receivedAmount = +item.st_amount;
      const receivedVatAmount = +item.t_tax;
      const receivedTaxAmount = +item.tax_amount;

      this.calcDue =
        +item.t_amount -
        (receivedAmount + receivedVatAmount + receivedTaxAmount);
    },

    submitHandler() {
      this.updatePayment();
      // this.updatePayment_items();
    },

    deletePaidBillFunc() {
      this.pay_id = this.$route.params.id;
      const data = new FormData();
      data.append("pay_id", this.pay_id);
      data.append("bill_id", this.paid_bill.bill_id);
      data.append("t_amount", this.paid_bill.t_amount);
      fetch(`${process.env.VUE_APP_SERVER_URL}/DeletePaidBill`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            this.deleteVendorTransaction();

            if (this.paid_bill.p_mode === "bank") {
              this.deleteBankTransaction();
            } else {
              router.push(`/makepaylist`);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteVendorTransaction() {
      this.pay_id = this.$route.params.id;
      const data = new FormData();
      data.append("payID", this.pay_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteVendorTransaction`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          router.push(`/makepaylist`);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteBankTransaction() {
      this.pay_id = this.$route.params.id;
      const data = new FormData();
      data.append("payID", this.pay_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteBankTransaction`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          router.push(`/makepaylist`);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePayment() {
      this.pay_id = this.$route.params.id;
      const data = new FormData();
      data.append("pay_id", this.pay_id);
      data.append("st_amount", this.paid_bill.st_amount);
      data.append("t_tax", this.paid_bill.t_tax);
      data.append("tax_amount", this.paid_bill.tax_amount);
      data.append("due", this.calcDue);

      data.append("user", "test");
      data.append("p_mode", this.paid_bill.p_mode);
      data.append("date", this.paid_bill.cdate.slice(0, 10));
      data.append(
        "t_amount",
        +this.paid_bill.st_amount +
          +this.paid_bill.t_tax +
          +this.paid_bill.tax_amount
      );

      data.append(
        "description",
        this.paid_bill.project_name + " " + this.paid_bill.vname
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/updatePaidBill`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.update = this.update + 1;

          this.updateVendorTransaction();
          if (this.paid_bill.p_mode === "bank") {
            this.updateBankTransaction();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateVendorTransaction() {
      this.pay_id = this.$route.params.id;
      const data = new FormData();
      data.append("payID", this.pay_id);
      data.append("payable", "0");
      data.append(
        "paid",
        +this.paid_bill.st_amount +
          +this.paid_bill.t_tax +
          +this.paid_bill.tax_amount
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateVendorTransaction`, {
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
    updateBankTransaction() {
      this.pay_id = this.$route.params.id;
      const data = new FormData();
      data.append("payID", this.pay_id);
      data.append("credit", "0");
      data.append(
        "debit",
        +this.paid_bill.st_amount +
          +this.paid_bill.t_tax +
          +this.paid_bill.tax_amount
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
    updatePayment_items() {
      this.pb_item.map((item) => {
        const data = new FormData();
        data.append("id", item.id);
        data.append("item", item.item);
        data.append("des", item.des);
        data.append("rate", item.rate);
        data.append("qty", item.qty);

        data.append("tax", item.tax);
        data.append("amount", item.amount);

        fetch(`${process.env.VUE_APP_SERVER_URL}/updatePBItem`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res.message);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    updateOtherInfo() {
      const data = new FormData();
      data.append("pay_id", this.pay_id);
      data.append("cdate", this.paid_bill.cdate);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updatePaidBillOtherInfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.message);
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
    this.getpaymentAllData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    pb_itemWithPrice() {
      return this.pb_item.map((item) => {
        const rate = +item.rate || 0;

        const qty = +item.qty || 0;

        const amount = rate * qty;

        // const discount_amount = (item.discount / 100) * amount;

        // const price = amount - discount_amount;

        const taxAmount = (amount * item.tax) / 100;
        return {
          ...item,
          amount: +amount.toFixed(2),
          taxAmount: +taxAmount.toFixed(2),
        };
      });
    },

    subTotalPrice() {
      this.subTotalPriceNew = this.pb_item.reduce(
        (total, item) => total + +item.amount,
        0
      );
      return this.pb_item.reduce((total, item) => total + +item.amount, 0);
    },

    totalTax() {
      this.totalTaxAmount = this.pb_item.reduce(
        (total, item) => total + (+item.taxAmount || 0),
        0
      );
      return this.pb_item.reduce(
        (total, item) => total + (+item.taxAmount || 0),
        0
      );
    },

    adjustedTotal() {
      const t_discount = +this.t_discount || 0;

      this.totalDiscount =
        (t_discount / 100) * (this.subTotalPrice + this.totalTax);
      return (
        this.subTotalPriceNew +
        this.totalTaxAmount -
        this.totalDiscount -
        this.adjustment
      );
    },

    ...mapState(["userInfo"]),
    ...mapState(["orgInfo"]),
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
  },

  watch: {
    update() {
      setTimeout(() => {
        this.getpaymentAllData();
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
