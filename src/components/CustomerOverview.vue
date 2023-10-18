<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-5 border-end p-0">
        <div class="p-3">
          <p class="fs-16 font-weight-600 mb-0">
            {{ customerInfo.cname }}
            <span
              v-if="editPrivilege.includes('customerlist')"
              class="mx-2 font-10"
              data-bs-toggle="modal"
              data-bs-target="#customerInfoEditModal"
              style="cursor: pointer"
            >
              <small class="fs-12 text-primary text-decoration-underline"
                ><i class="fa-solid fa-pen"></i> Edit</small
              >
            </span>
          </p>

          <div
            class="modal fade"
            id="customerInfoEditModal"
            tabindex="-1"
            aria-labelledby="ContactInfoLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-custom">
              <div class="modal-content modal-content-custom">
                <div class="d-flex align-items-center p-2 py-3 border-bottom">
                  <img
                    src="../assets/image/updated.png"
                    class="update-icon me-2"
                    alt=""
                    srcset=""
                  />
                  <p class="fs-16 m-0 font-weight-600" id="ContactInfoLabel">
                    Update Customer Info
                  </p>
                </div>
                <div class="modal-body">
                  <div class="row w-100 mb-0">
                    <div class="col-lg-12">
                      <!-- ANCHOR POC -->
                      <div class="row">
                        <div class="col-lg-12 mb-2">
                          <label
                            for="poc_email"
                            class="form-label text-muted fs-13 fw-bold"
                            >Customer Address</label
                          >
                          <input
                            id="poc_email"
                            type="email"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            v-model="customerInfo.cadd"
                          />
                        </div>
                        <div class="col-lg-12 mb-2">
                          <label
                            for="poc_phone"
                            class="form-label text-muted fs-13 fw-bold"
                            >Customer Website</label
                          >
                          <input
                            id="poc_phone"
                            type="email"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            v-model="customerInfo.cwebsite"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer py-2">
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
                    @click="UpdateCustomerOverView"
                  >
                    {{ isLoading ? "Loading" : "Update changes" }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p class="fs-12 mb-0">
            {{ customerInfo.cwebsite }}
          </p>
          <p class="fs-12 mb-0">
            <i class="fa-solid fa-location-dot me-1"></i>{{ customerInfo.cadd }}
          </p>
        </div>
        <div class="bg-light p-3 py-2">
          <div class="d-flex">
            <p class="mb-1 fs-13">Person of Contact</p>
          </div>

          <div class="bg-light mb-2" v-for="item in customerPOC" :key="item.id">
            <div class="d-flex border-bottom pb-2 justify-content-between">
              <div class="me-3">
                <p class="fs-13 font-weight-600 mb-0">{{ item.poc_name }}</p>
                <p class="fs-10 mb-0">
                  {{ item.poc_designation }}
                </p>
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-mobile-screen me-1"></i
                  >{{ item.poc_mobile }}
                </p>
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-envelope me-1"></i>{{ item.poc_email }}
                </p>
              </div>
              <div>
                <span
                  @click="setUpCustomerPOC(item)"
                  v-if="editPrivilege.includes('customerlist')"
                  class="mx-2 fs-10"
                  data-bs-toggle="modal"
                  :data-bs-target="`#ContactInfoEdit${item.id}`"
                  style="cursor: pointer"
                >
                  <small class="fs-10 text-primary text-decoration-underline"
                    ><i class="fa-solid fa-pen me-1"></i>Edit
                  </small>
                </span>
                <span
                  v-if="editPrivilege.includes('customerlist')"
                  data-bs-toggle="modal"
                  :data-bs-target="`#ContactInfoDelete${item.id}`"
                  style="cursor: pointer"
                >
                  <small class="fs-10 text-primary text-decoration-underline"
                    ><i class="fa-solid fa-trash-can text-muted me-1"></i>
                  </small>
                </span>
              </div>
            </div>

            <div
              :id="'ContactInfoDelete' + item.id"
              class="modal fade"
              tabindex="-1"
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
                      Mark this POC as Deleted! Are you sure?
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
                      @click="deletePOC(item.id)"
                      type="button"
                      class="btn action-button"
                    >
                      <i class="fa-regular fa-circle-check me-1"></i>Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="modal fade"
              :id="`ContactInfoEdit${item.id}`"
              tabindex="-1"
              aria-labelledby="ContactInfoLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-custom">
                <div class="modal-content modal-content-custom">
                  <div class="d-flex align-items-center p-2 py-3 border-bottom">
                    <img
                      src="../assets/image/updated.png"
                      class="update-icon me-2"
                      alt=""
                      srcset=""
                    />
                    <p class="fs-16 m-0 font-weight-600">Update Customer POC</p>
                  </div>
                  <div class="modal-body">
                    <div class="row w-100 mb-0">
                      <div class="col-lg-12">
                        <div class="row">
                          <div class="col-lg-12 mb-2">
                            <label
                              for="first_name"
                              class="form-label text-muted fs-13 fw-bold"
                              >Full Name</label
                            >
                            <input
                              id="first_name"
                              type="text"
                              class="form-control rounded-0 border-muted shadow-none inputa"
                              v-model="upcustomerPOC.poc_name"
                            />
                          </div>
                          <div class="col-lg-12 mb-2">
                            <label
                              for="first_name"
                              class="form-label text-muted fs-13 fw-bold"
                              >Designation</label
                            >
                            <input
                              id="designation"
                              type="text"
                              class="form-control rounded-0 border-muted shadow-none inputa"
                              v-model="upcustomerPOC.designation"
                            />
                          </div>

                          <div class="col-lg-12 mb-2">
                            <label
                              for="poc_email"
                              class="form-label text-muted fs-13 fw-bold"
                              >Email</label
                            >
                            <input
                              id="poc_email"
                              type="email"
                              class="form-control rounded-0 border-muted shadow-none inputa"
                              v-model="upcustomerPOC.poc_email"
                            />
                          </div>
                          <div class="col-lg-12 mb-2">
                            <label
                              for="poc_phone"
                              class="form-label text-muted fs-13 fw-bold"
                              >Phone</label
                            >
                            <input
                              id="poc_phone"
                              type="email"
                              class="form-control rounded-0 border-muted shadow-none inputa"
                              v-model="upcustomerPOC.poc_mobile"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer py-2">
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
                      @click="updatePOC"
                    >
                      {{ isLoading ? "Loading" : "Update changes" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="" v-if="editPrivilege.includes('customerlist')">
            <p
              class="fs-12 mb-0 mt-1 text-primary font-weight-600"
              v-if="customerPOC.length < 3"
              data-bs-toggle="modal"
              data-bs-target="#pocModal"
              style="cursor: pointer"
            >
              + Add New
            </p>
          </div>
        </div>

        <div class="pb-2">
          <p
            class="mb-0 py-1 px-3 fs-13 border-top border-bottom font-weight-600"
          >
            Address
            <span
              v-if="editPrivilege.includes('customerlist')"
              class="mx-2"
              data-bs-toggle="modal"
              data-bs-target="#otherInfoModal"
              style="cursor: pointer"
            >
              <small class="font-10 text-primary text-decoration-underline"
                ><i class="fa-solid fa-pen me-1"></i> Edit</small
              >
            </span>
          </p>

          <div class="px-3">
            <div class="mt-2 d-flex">
              <p class="mb-1 fs-13">Billing Address</p>
            </div>
            <div class="mt-2 pb-2 border-bottom">
              <p class="fs-12 mb-0">
                {{ customerInfo.badd }}
              </p>
              <p class="fs-12 mb-0">
                {{ customerInfo.bcity }} - {{ customerInfo.bzip }},
              </p>
              <p class="fs-12 mb-0">
                {{ customerInfo.bcountry }}
              </p>
              <p class="fs-12 mb-0">Mobile: {{ customerInfo.bphone }}</p>
              <p class="fs-12 mb-0">Fax: {{ customerInfo.bfax }}</p>
            </div>
          </div>

          <div class="px-3">
            <div class="mt-2 d-flex">
              <p class="mb-1 fs-13">Shipping Address</p>
              <!-- <p class="mb-1 fs-13 px-3" style="color: rgb(116, 116, 116)">
                <i class="fa-solid fa-pen-to-square"></i>
              </p> -->
            </div>
            <div class="mt-2 pb-2">
              <p class="fs-12 mb-0">
                {{ customerInfo.sadd }}
              </p>
              <p class="fs-12 mb-0">
                {{ customerInfo.scity }} - {{ customerInfo.szip }},
              </p>
              <p class="fs-12 mb-0">
                {{ customerInfo.scountry }}
              </p>
              <p class="fs-12 mb-0">Mobile: {{ customerInfo.sphone }}</p>
              <p class="fs-12 mb-0">Fax: {{ customerInfo.sfax }}</p>
            </div>
          </div>
          <p
            class="mb-0 py-1 px-3 fs-13 border-top border-bottom font-weight-600"
          >
            Other Info
          </p>

          <div class="px-3 py-2">
            <p class="fs-12 mb-0">Customer ID: {{ customerInfo.c_id }}</p>
            <p class="fs-12 mb-0">Create Date: {{ createdate }}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <div class="d-flex border-bottom">
          <div class="p-3">
            <p class="fs-18 font-weight-600 mb-0">
              {{ (otherInfo && otherInfo.inv) || 0 }}
            </p>
            <p class="fs-13 mb-0 text-muted">Pending Invoice</p>
          </div>

          <div class="p-3">
            <p class="fs-18 font-weight-600 mb-0">
              {{ (otherInfo && parseFloat(otherInfo.due).toFixed(2)) || 0 }}
              {{ orgInfo.currency }}
            </p>
            <p class="fs-13 mb-0 text-muted">Due Payment</p>
          </div>
        </div>
        <div class="py-3">
          <p class="fs-16 font-weight-600 mb-0">Received Payment</p>
          <p class="fs-11 text-muted w-75">
            This chart displays the received payments across different invoices,
            providing a visual representation of your payment history and
            transaction progress.
          </p>
          <div class="mb-0 text-muted fs-6" style="height: 270px">
            <canvas id="myChart" class=""></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->

  <div
    class="modal fade"
    id="otherInfoModal"
    tabindex="-1"
    aria-labelledby="otherInfoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-custom modal-xl">
      <div class="modal-content modal-content-custom">
        <div class="d-flex align-items-center p-2 py-3 border-bottom">
          <img
            src="../assets/image/updated.png"
            class="update-icon me-2"
            alt=""
            srcset=""
          />
          <p class="fs-16 m-0 font-weight-600" id="otherInfoModalLabel">
            Update Customer Address
          </p>
        </div>
        <div class="modal-body">
          <div class="row w-100 mb-0">
            <div class="col-lg-6">
              <!-- ANCHOR Billing -->
              <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-11 fs-14 mb-2">
                  <p class="fs-15 font-weight-600 text-muted">
                    Billing Address
                  </p>
                </div>

                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="bill_address"
                    class="form-label text-muted fs-13 fw-bold"
                    >Address</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <textarea
                    id="bill_address"
                    v-model="customerInfo.badd"
                    rows="4"
                    class="form-control rounded-0 border-muted shadow-none"
                  ></textarea>
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="bill_city"
                    class="form-label text-muted fs-13 fw-bold"
                    >City</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <input
                    id="bill_city"
                    v-model="customerInfo.bcity"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="bill_zip"
                    class="form-label text-muted fs-13 fw-bold"
                    >Zip Code</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <input
                    id="bill_zip"
                    v-model="customerInfo.bzip"
                    type="number"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="bill_phone"
                    class="form-label text-muted fs-13 fw-bold"
                    >Phone</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <input
                    id="bill_phone"
                    v-model="customerInfo.bphone"
                    type="tel"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="bill_fax"
                    class="form-label text-muted fs-13 fw-bold"
                    >Fax</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <input
                    id="bill_fax"
                    v-model="customerInfo.bfax"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-2"></div>
              </div>
            </div>

            <div class="col-lg-6">
              <!-- ANCHOR Shipping -->
              <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-11 fs-14 mb-2">
                  <p class="fs-15 font-weight-600 text-muted">
                    Shipping Address
                  </p>
                </div>

                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="ship_address"
                    class="form-label text-muted fs-13 fw-bold"
                    >Address</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <textarea
                    id="ship_address"
                    v-model="customerInfo.sadd"
                    rows="4"
                    class="form-control rounded-0 border-muted shadow-none"
                  ></textarea>
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="ship_city"
                    class="form-label text-muted fs-13 fw-bold"
                    >City</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <input
                    id="ship_city"
                    v-model="customerInfo.scity"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="ship_zip"
                    class="form-label text-muted fs-13 fw-bold"
                    >Zip Code</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <input
                    id="ship_zip"
                    v-model="customerInfo.szip"
                    type="number"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="ship_phone"
                    class="form-label text-muted fs-13 fw-bold"
                    >Phone</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <input
                    id="ship_phone"
                    v-model="customerInfo.sphone"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="ship_fax"
                    class="form-label text-muted fs-13 fw-bold"
                    >Fax</label
                  >
                </div>
                <div class="col-lg-8 mb-2">
                  <input
                    id="ship_fax"
                    v-model="customerInfo.sfax"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer py-2">
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
            @click="updateAddressData"
          >
            {{ isLoading ? "Loading" : "Save changes" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- POC Modal -->

  <div
    class="modal fade"
    id="pocModal"
    tabindex="-1"
    aria-labelledby="pocModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-custom modal-xl">
      <div class="modal-content modal-content-custom">
        <div class="d-flex align-items-center p-2 py-3 border-bottom">
                  <img
                    src="../assets/image/add-user.png"
                    class="update-icon me-2"
                    alt=""
                    srcset=""
                  />
                  <p class="fs-16 m-0 font-weight-600" id="pocModalLabel">
                    Add New POC
                  </p>
                </div>
        <div class="modal-body">
          <div class="row w-100 mb-0">
            <div class="col-lg-12">
              <!-- ANCHOR POC -->

              <div class="row">
                <div class="col-lg-12 mb-2">
                  <p class="mb-0 fs-12">
                    <span class="text-primary font-weight-600">*Note:</span>
                    Before entering <b>Customer POC</b> information into the
                    software, please ensure to carefully read and verify the
                    following details.
                    <br />
                    <span class="note-space"></span> Failing to do so may lead
                    to delays or errors in processing your project.
                  </p>
                </div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="first_name"
                    class="form-label text-muted fs-13 fw-bold"
                    >First Name<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="first_name"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                    v-model="poc_firstName"
                  />
                </div>
                <div class="col-lg-3 mb-2">
                  <label
                    for="last_name"
                    class="form-label text-muted fs-13 fw-bold"
                    >Last Name<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="last_name"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                    v-model="poc_lastName"
                  />
                </div>
                <div class="col-lg-2 mb-2">
                  <label
                    for="poc_email"
                    class="form-label text-muted fs-13 fw-bold"
                    >Designation<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="designation"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                    v-model="designation"
                  />
                </div>
                <div class="col-lg-2 mb-2">
                  <label
                    for="poc_email"
                    class="form-label text-muted fs-13 fw-bold"
                    >Email<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="poc_email"
                    type="email"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                    v-model="poc_email"
                  />
                </div>
                <div class="col-lg-2 mb-2">
                  <label
                    for="poc_phone"
                    class="form-label text-muted fs-13 fw-bold"
                    >Phone<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="poc_phone"
                    type="email"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                    v-model="poc_phone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer py-2">
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
            @click="addPOC"
          >
            {{ isLoading ? "Loading" : "Save changes" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "CustomerOverview",
  data() {
    return {
      customerInfo: [],
      customerPOC: [],
      upcustomerPOC: {
        id: "",
        poc_name: "",
        designation: "",
        poc_email: "",
        poc_mobile: "",
      },
      otherInfo: [],
      update: 0,
      createdate: "",
      createdDate: "",
      isLoading: false,
      transactionReport: [],
      poc_firstName: "",
      poc_lastName: "",
      designation: "",
      poc_email: "",
      poc_phone: "",
    };
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchOrgInfo");
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserPrivilege", id);
    },
    otherData() {
      this.c_id = this.$route.params.id;
      const data = new FormData();
      data.append("c_id", this.c_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerDatainduData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.otherInfo = data.message[0];
        })
        .catch((err) => console.log(err.message));
    },

    getCustomerData() {
      this.c_id = this.$route.params.id;

      const data = new FormData();
      data.append("c_id", this.c_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.customerInfo = data.message[0];

          this.customerPOC = data.message2;
          // this.upcustomerPOC = data.message2;
          this.createdate = new Date(data.message[0]?.date)
            .toString()
            .slice(0, 24);
        })
        .catch((err) => console.log(err.message));
    },

    getCustomerTransactions() {
      this.c_id = this.$route.params.id;

      const data = new FormData();
      data.append("c_id", this.c_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getmonthlytransaction`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.transactionReport = data.message;

          this.myChart.data.datasets[0].data = this.transactionReport;
          this.myChart.update();
        })
        .catch((err) => console.log(err.message));
    },

    updateAddressData() {
      this.isLoading = true;
      this.c_id = this.$route.params.id;
      const data = new FormData();

      data.append("c_id", this.c_id);
      data.append("cname", this.customerInfo.cname);
      data.append("cadd", this.customerInfo.cadd);
      data.append("cwebsite", this.customerInfo.cwebsite);
      data.append("bcountry", this.customerInfo.bcountry);
      data.append("badd", this.customerInfo.badd);
      data.append("bcity", this.customerInfo.bcity);
      data.append("bzip", this.customerInfo.bzip);
      data.append("bphone", this.customerInfo.bphone);
      data.append("bfax", this.customerInfo.bfax);
      data.append("scountry", this.customerInfo.scountry);
      data.append("sadd", this.customerInfo.sadd);
      data.append("scity", this.customerInfo.scity);
      data.append("szip", this.customerInfo.szip);
      data.append("sphone", this.customerInfo.sphone);
      data.append("sfax", this.customerInfo.sfax);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UpdateCustomerAddress`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.update = this.update + 1;

          if (data.message === true) {
            setTimeout(() => {
              this.successMsg("Customer");
              this.isLoading = false;
            }, 1000);
          } else {
            this.isLoading = false;
            this.errMsg(data.message);
          }
        })
        .catch((err) => console.log(err.message));
    },

    successMsg(msg) {
      this.toast.success(`${msg}!`, {
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

    errMsg(error) {
      this.toast.error(`Something went wrong!! ${error}`, {
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

    createChart() {
      const ctx = document.getElementById("myChart");

      const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "",
            data: [80, 90, 70, 20, 15, 48, 92, 60, 40, 20, 64, 87], // Initialize with empty array
            fill: false,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
            borderColor: "rgb(75, 192, 192)",
            tension: 0,
          },
        ],
      };

      this.myChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    },

    async addPOC() {
      this.c_id = this.$route.params.id;

      const data = new FormData();
      data.append("c_id", this.c_id);
      data.append("poc_name", this.poc_firstName + " " + this.poc_lastName);
      data.append("poc_designation", this.designation);
      data.append("poc_email", this.poc_email);
      data.append("poc_mobile", this.poc_phone);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/addCustomerPoc`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        this.update = this.update + 1;
      } catch (error) {
        console.error(error);
      }
    },

    UpdateCustomerOverView() {
      this.isLoading = true;
      this.c_id = this.$route.params.id;
      const data = new FormData();
      console.log(this.customerInfo);
      data.append("cname", this.customerInfo.cname);
      data.append("cadd", this.customerInfo.cadd);
      data.append("cwebsite", this.customerInfo.cwebsite);
      data.append("c_id", this.c_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UpdateCustomerOverView`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.update = this.update + 1;

          if (data.message === true) {
            setTimeout(() => {
              this.successMsg("Customer OverView");
              this.isLoading = false;
            }, 1000);
          } else {
            this.isLoading = false;
            this.errMsg(data.message);
            console.log(data.message);
          }
        })
        .catch((err) => console.log(err.message));
    },
    setUpCustomerPOC(item) {
      this.upcustomerPOC.poc_name = item.poc_name;
      this.upcustomerPOC.designation = item.poc_designation;
      this.upcustomerPOC.poc_email = item.poc_email;
      this.upcustomerPOC.poc_mobile = item.poc_mobile;
      this.upcustomerPOC.id = item.id;
    },

    deletePOC(id) {
      this.isLoading = true;
      this.c_id = this.$route.params.id;
      const data = new FormData();
      data.append("id", id);
      data.append("c_id", this.c_id);
      data.append("user", this.userInfo.username);
      fetch(`${process.env.VUE_APP_SERVER_URL}/deletePOC`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.update = this.update + 1;

          if (data.ok) {
            setTimeout(() => {
              this.successMsg("POC Deleted");
              this.isLoading = false;
            }, 1000);
          } else {
            this.isLoading = false;
            this.errMsg(data.message);
            console.log(data.message);
          }
        })
        .catch((err) => console.log(err.message));
    },
    updatePOC() {
      this.isLoading = true;
      this.c_id = this.$route.params.id;
      const data = new FormData();
      console.log(this.customerPOC);

      data.append("poc_name", this.upcustomerPOC.poc_name);
      data.append("poc_designation", this.upcustomerPOC.designation);
      data.append("poc_email", this.upcustomerPOC.poc_email);
      data.append("poc_mobile", this.upcustomerPOC.poc_mobile);
      data.append("user", this.userInfo.username);
      data.append("c_id", this.c_id);
      data.append("id", this.upcustomerPOC.id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UpdatePOC`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.update = this.update + 1;

          if (data.message === true) {
            setTimeout(() => {
              this.successMsg("POC Updated");
              this.isLoading = false;
            }, 1000);
          } else {
            this.isLoading = false;
            this.errMsg(data.message);
            console.log(data.message);
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.getCustomerTransactions();
    this.createChart();
    this.getCustomerData();
    this.otherData();
    this.fetchData();
  },

  watch: {
    update() {
      this.getCustomerData();
      this.otherData();
    },
  },

  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["editPrivilege"]),
    ...mapState(["orgInfo"]),
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>
