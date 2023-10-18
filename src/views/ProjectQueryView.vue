<template>
  <div class="print_section"></div>

  <div class="view-section">
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar-container-right scroll-content">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Quote Overview</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 py-0 px-0 border-end">
              <div class="p-3 pb-0">
                <p class="fs-16 font-weight-600 mb-0">
                  {{ quotationData.project_name }}
                </p>

                <p class="fs-12 mb-0">
                  {{ parseFloat(quotationData.tamount).toFixed(2) }}
                  {{ orgInfo.currency }}
                </p>
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-circle-info me-1"></i>
                  {{ quotationData.project_des }}
                </p>
              </div>

              <div class="bg-light p-3 py-2 mt-3">
                <p class="fs-14 font-weight-600 mb-0">
                  {{ quotationData.org_name }}
                </p>
                <p class="fs-12 mb-0" style="white-space: pre-line">
                  <i class="fa-solid fa-location-dot me-1"></i>
                  {{ quotationData.org_location }}
                </p>
                <p class="mb-1 fs-13 mt-2 font-weight-600">Person of Contact</p>
                <p class="fs-12 font-weight-600 mb-0">
                  {{ quotationData.contact }}
                </p>
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-mobile-screen me-1"></i
                  >{{ quotationData.cp_phone }}
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
                    v-if="editPrivilege.includes('projectquery')"
                  >
                    <small
                      class="font-10 text-primary text-decoration-underline"
                      ><i class="fa-solid fa-pen me-1"></i>Edit</small
                    >
                  </span>
                </p>

                <div class="px-3 py-2">
                  <p class="fs-12 mb-0">
                    Quotation ID: {{ quotationData.q_id }}
                  </p>
                  <p class="fs-12 mb-0">
                    Expiary Date: {{ formatDate(quotationData.quotation_exp) }}
                  </p>
                  <p class="fs-12 mb-0">
                    Duration: {{ quotationData.project_duration }}
                  </p>
                  <p
                    class="fs-12 mt-1 mb-0 text-primary text-decoration-underline"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteInvoiceModal"
                    style="cursor: pointer"
                  >
                    Delete Quote
                  </p>
                </div>

                <div
                  class="modal fade"
                  id="deleteInvoiceModal"
                  tabindex="-1"
                  aria-labelledby="deleteInvoiceModallLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-custom">
                    <div class="modal-content modal-content-custom">
                      <div class="modal-header">
                        <p class="fs-16 mb-1" id="deleteInvoiceModalLabel">
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
                          @click="deleteQuoteFunc"
                        >
                          <i class="fa-regular fa-circle-check me-1"></i>Delete
                          Quote
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
                    @click="handleEdit"
                    class="m-0 text-muted fs-12"
                    style="cursor: pointer"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#updateDataCanvas"
                    v-if="editPrivilege.includes('projectquery')"
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
                  <p
                    class="m-0 text-muted fs-12"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style="cursor: pointer"
                  >
                    <i class="fa-solid fa-chevron-down me-1"></i>Mark As
                  </p>

                  <div
                    class="dropdown-menu markas-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="toggleApprove('approved')"
                      ><i class="fa-regular fa-circle-check me-1"></i
                      >Approved</a
                    >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="toggleApprove('disapproved')"
                      ><i class="fa-regular fa-circle-xmark me-1"></i>Not
                      Approved</a
                    >
                  </div>
                </div>
              </div>

              <div class="p-4">
                <div
                  id="printID"
                  class="print_view p-5"
                  style="position: relative"
                >
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
                                <p class="fs-40 mb-0">Quotation</p>
                                <p class="fs-14 m-0">
                                  #{{ quotationData.q_id }}
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
                          <table class="table">
                            <tr>
                              <th
                                class="fs-12 py-1 bg-light px-2 w-50 border-end"
                              >
                                Client Info
                              </th>
                              <th class="fs-12 py-1 bg-light px-2 w-50">
                                Quotation Info
                              </th>
                            </tr>
                            <tr>
                              <td class="border-end">
                                <p class="fs-12 font-weight-600 mb-0 pb-0 px-2">
                                  To, <br />{{ quotationData.kind_attention }}
                                </p>
                                <p class="fs-12 mb-0 px-2 py-0 pb-2">
                                  {{ quotationData.kind_designation }}, {{ quotationData.org_name }}
                                </p>
                                <!-- <p
                                  class="m-0 px-2 fs-12 font-weight-600 py-0 pb-2"
                                >
                                  {{ quotationData.org_name }}
                                </p> -->
                                <p
                                  class="m-0 fs-11 px-2 py-0"
                                  style="white-space: pre-line"
                                >
                                  <i class="fa-solid fa-location-dot me-1"></i>
                                  {{ quotationData.org_location }}
                                </p>
                              </td>
                              <td class="px-0">
                                <table class="inner-table w-100">
                                  <tr>
                                    <th
                                      class="fs-11 py-1 px-2"
                                      width="45%"
                                    >
                                      Create Date
                                    </th>
                                    <td
                                      class="fs-11 py-1 px-2"
                                      width="55%"
                                    >
                                      : {{ formatDate(quotationData.date) }}
                                    </td>
                                  </tr>

                                  <tr>
                                    <th
                                      class="fs-11 py-1 px-2 "
                                      width="45%"
                                    >
                                      Quotation Expiry
                                    </th>
                                    <td
                                      class="fs-11 py-1 px-2 "
                                      width="55%"
                                    >
                                      :
                                      {{
                                        formatDate(quotationData.quotation_exp)
                                      }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      class="fs-11 py-1 px-2"
                                      width="45%"
                                    >
                                      Completion Period
                                    </th>
                                    <td
                                      class="fs-11 py-1 px-2"
                                      width="55%"
                                    >
                                      : {{ quotationData.project_duration }}
                                    </td>
                                  </tr>
                                  <!-- <tr>
                                    <th class="fs-11 py-1 px-2" width="45%">
                                      Customer PR
                                    </th>
                                    <td class="fs-11 py-1 px-2" width="55%">
                                      : {{ quotationData.customer_PR }}
                                    </td>
                                  </tr> -->
                                  <!-- <tr>
                                    <th class="fs-12 py-1 px-2" width="45%">
                                      Prepared By
                                    </th>
                                    <td class="fs-12 py-1 px-2" width="55%">
                                      : {{ userInfo.username }}
                                    </td>
                                  </tr> -->
                                </table>
                              </td>
                            </tr>
                          </table>

                          <table
                            class="table table-bordered mb-3"
                            style="border: 1px solid #eeeeee"
                          >
                            <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="20%">
                                Quotation For
                              </th>

                              <td class="fs-12 py-1 px-2" width="80%">
                                {{ quotationData.project_name }}
                              </td>
                            </tr>
                            <!-- <tr>
                        <th class="fs-12 py-1 bg-light px-2" width="20%">
                          Description
                        </th>
                        <td class="fs-12 py-1 px-2" width="80%">
                          {{ quotationData.project_des }}
                        </td>
                      </tr> -->
                          </table>
                        </div>

                        <div class="row mb-3">
                          <div class="col-lg-12">
                            <div class="border px-2 py-1">
                              <p class="mb-0 fs-13 font-weight-600">
                                Quotation Item
                              </p>
                            </div>
                            <div class="bg-light border border-top-0">
                              <div class="d-flex px-2">
                                <div class="py-1 w-5">
                                  <p class="mb-0 fs-12 font-weight-600">SL</p>
                                </div>
                                <div class="py-1 w-25">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Item Name
                                  </p>
                                </div>
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Item Description
                                  </p>
                                </div>
                                <div class="py-1 w-10">
                                  <p
                                    class="mb-0 fs-12 font-weight-600 text-end"
                                  >
                                    Rate
                                  </p>
                                </div>
                                <div class="py-1 w-10">
                                  <p
                                    class="mb-0 fs-12 font-weight-600 text-end"
                                  >
                                    Qty
                                  </p>
                                </div>

                                <div class="py-1 w-10">
                                  <p
                                    class="mb-0 fs-12 font-weight-600 text-end"
                                  >
                                    Unit
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
                              v-for="(item, index) in quotationItem"
                              :key="item"
                            >
                              <div class="d-flex px-2">
                                <div class="py-1 w-5">
                                  <p class="mb-0 fs-12">{{ index + 1 }}</p>
                                </div>
                                <div class="py-1 w-25">
                                  <p class="mb-0 fs-12">{{ item.item }}</p>
                                </div>
                                <div class="py-1 w-30">
                                  <p class="mb-0 fs-12">{{ item.des }}</p>
                                </div>
                                <div class="py-1 w-10">
                                  <p class="mb-0 fs-12 text-end">
                                    {{ item.rate }}
                                  </p>
                                </div>
                                <div class="py-1 w-10 text-end">
                                  <p class="mb-0 fs-12">{{ item.qty }}</p>
                                </div>

                                <div class="py-1 w-10 text-end">
                                  <p class="mb-0 fs-12">{{ item.item_unit }}</p>
                                </div>
                                <!-- <div class="py-1 w-10 text-end">
                            <p class="mb-0 fs-12">{{ item.discount }}</p>
                          </div> -->

                                <div class="py-1 w-10 text-end">
                                  <p class="mb-0 fs-12">{{ item.price }}</p>
                                </div>
                              </div>
                            </div>
                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Total
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{ quotationData.stotal_amount }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    VAT({{ quotationData.vatpercent }}%)
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      formatCurrency(quotationData.vatandtax)
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <!-- <div class="border border-top-0">
                        <div class="d-flex px-2">
                          <div class="w-90 border-end text-end py-1 px-2">
                            <p class="mb-0 fs-12 font-weight-600">
                              Discount (%)
                            </p>
                          </div>
                          <div class="w-10 py-1 text-end">
                            <p class="mb-0 fs-12">
                              {{ quotationData.discount }}
                            </p>
                          </div>
                        </div>
                      </div> -->

                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Adjustment(-)
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{ quotationData.adjustment }}
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
                                      parseFloat(quotationData.tamount).toFixed(
                                        2
                                      )
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="border mb-3">
                          <div class="d-flex">
                            <div class="w-20 border-end bg-light py-1 px-2">
                              <p class="mb-0 fs-12 font-weight-600">In words</p>
                            </div>
                            <div class="w-80 py-1 font-weight-600">
                              <p class="mb-0 fs-12 px-2 text-uppercase">
                                {{ convertToWordsWithCurrency }}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div class="my-2">
                          <p class="fs-14 font-weight-600 border-bottom">
                            Terms & Condition
                          </p>
                          <table>
                            <tr>
                              <td class="fs-12 py-1 px-2">
                                <span v-if="quotationTnc">
                                  <span
                                    class="term-text fs-12"
                                    v-html="quotationTnc"
                                  ></span>
                                </span>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <div class="authrity w-40 mt-5">
                          <div class="m-0 fs-12 border-bottom">
                            <img
                              :src="`${this.imageURL}/${orgInfo.seal}`"
                              class="booklogo me-2"
                              alt=""
                              srcset=""
                            />

                            <p class="m-0 fs-12 font-weight-600 py-0">
                              {{ orgInfo.sealName }}
                            </p>

                            <span class="fst-italic fs-10">
                              {{ orgInfo.sealDesignation }},
                              {{ orgInfo.org_name }}
                            </span>
                          </div>
                          <p class="m-0 fs-12">Signature</p>
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
                            Registered Office:
                          </p>
                          <p class="m-0 fs-10">
                            {{ orgInfo.org_address }}, {{ orgInfo.org_city }}
                            -
                            {{ orgInfo.org_zipCode }},
                            {{ orgInfo.org_country }}
                          </p>
                        </div>
                        <!-- 
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
                        </div> -->
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

    <!-- Canvas Modal -->

    <!-- Update Quote Info -->

    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="updateDataCanvas"
      aria-labelledby="updateDataCanvasLabel"
    >
      <div class="offcanvas-header border-bottom">
        <div class="d-flex align-items-center">
          <img
            src="../assets/image/updated.png"
            class="update-icon me-2"
            alt=""
            srcset=""
          />
          <p class="fs-16 m-0 font-weight-600" id="ContactInfoLabel">
            Update Quote
          </p>
        </div>
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
            {{ quotationData.project_name }}
          </p>

          <p class="fs-12 mb-0">
            {{ quotationData.tamount }} {{ orgInfo.currency }}
          </p>
          <p class="fs-12 mb-0">
            <i class="fa-solid fa-circle-info me-1"></i>
            {{ quotationData.project_des }}
          </p>
        </div>
        <div>
          <div class="bg-light border border-top">
            <div class="d-flex px-2">
              <div class="py-1 w-25">
                <p class="mb-0 fs-12 font-weight-600">Item Name</p>
              </div>
              <div class="py-1 w-35">
                <p class="mb-0 fs-12 font-weight-600">Item Description</p>
              </div>
              <div class="py-1 w-10">
                <p class="mb-0 fs-12 font-weight-600 text-end">Rate</p>
              </div>
              <div class="py-1 w-10">
                <p class="mb-0 fs-12 font-weight-600 text-end">Qty</p>
              </div>
              <div class="py-1 w-10">
                <p class="mb-0 fs-12 font-weight-600 text-end">Unit</p>
              </div>

              <div class="py-1 w-10 text-end">
                <p class="mb-0 fs-12 font-weight-600">Price</p>
              </div>
            </div>
          </div>
          <div
            class="border border-top-0"
            v-for="item in quotationItem"
            :key="item.id"
          >
            <div class="d-flex px-2">
              <div class="py-1 w-25 border-end">
                <p class="mb-0 fs-12">
                  <input
                    class="form-control text-start rounded-0 border-0 shadow-none inputa px-1"
                    v-model="item.item"
                  />
                </p>
              </div>
              <div class="py-1 w-35 border-end">
                <p class="mb-0 fs-12">
                  <input
                    class="form-control text-start rounded-0 border-0 shadow-none inputa px-1"
                    v-model="item.des"
                  />
                </p>
              </div>
              <div class="py-1 w-10 text-end border-end">
                <p class="mb-0 fs-12 text-end">
                  <input
                    class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                    v-model="item.rate"
                    @input="updatePrice(item)"
                  />
                </p>
              </div>
              <div class="py-1 w-10 text-end border-end">
                <p class="mb-0 fs-12">
                  <input
                    class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                    v-model="item.qty"
                    @input="updatePrice(item)"
                  />
                </p>
              </div>
              <div class="py-1 w-10 text-end border-end">
                <p class="mb-0 fs-12">
                  <!-- <input class="form-control text-end rounded-0 border-0 shadow-none inputa px-1" v-model="item.item_unit"
                    @input="updatePrice(item)" /> -->

                  <select
                    class="form-select text-start rounded-0 border-0 shadow-none inputa px-2"
                    id="item_unit"
                    v-model="item.item_unit"
                  >
                    <option value="Piece" selected>Piece</option>
                    <option value="Dozen">Dozen</option>
                    <option value="Litter">Litter</option>
                    <option value="Kilogram">Kilogram</option>
                    <option value="Pounds">Pounds</option>
                    <option value="Ton">Ton</option>
                    <option value="Meter">Meter</option>
                    <option value="Feet">Feet</option>
                    <option value="Set">Set</option>
                    <option value="Packet">Packet</option>
                  </select>
                </p>
              </div>
              <!--  <div class="py-1 w-10 text-end border-end">
                <p class="mb-0 fs-12">
                  <input
                    class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                    v-model="item.discount"
                    @input="updatePrice(item)"
                  />
                </p>
              </div> -->
              <!-- <div class="py-1 w-10 text-end border-end">
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
                    class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                    v-model="item.price"
                  />
                </p>
              </div>
            </div>
          </div>

          <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">Total</p>
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
              <div class="w-80 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">VAT (%)</p>
              </div>
              <div class="w-10 py-1 border-end px-2 text-end">
                <input
                  class="form-control text-end border-0 rounded-0 shadow-none inputas px-0 py-0"
                  type="number"
                  v-model="quotationData.vatpercent"
                  @input="calculateTax"
                  step="0.01"
                />
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
                <p class="mb-0 fs-12 font-weight-600">Adjustment(-)</p>
              </div>
              <div class="w-10 py-0 text-end">
                <input
                  class="form-control text-end border-0 rounded-0 shadow-none inputa px-0"
                  type="number"
                  v-model="adjustment"
                />
              </div>
            </div>
          </div>

          <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">Grand Total</p>
              </div>
              <div class="w-10 py-1 text-end">
                <p class="mb-0 fs-12">
                  {{ adjustedTotal }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="">
              <div class="p-2">
                <p class="mb-0 fs-14 font-weight-600">Terms & Condition</p>
              </div>
              <div class="">
                <div>
                  <quill-editor
                    ref="quillEditor"
                    @text-change="handleTermDataChange"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 my-3">
            <button
              @click="submitHandler"
              class="border-0 w-100 action-button py-1"
            >
              {{ isLoading === true ? "Loading..." : "Update" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Other Info -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="otherInfoModal"
      tabindex="-1"
      aria-labelledby="otherInfoModalLabel"
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
            <p class="fs-16 m-0 font-weight-600" id="otherInfoModalLabel">
              Update Other Info
            </p>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6">
                <label class="form-label text-muted fs-13 fw-bold"
                  >Expiry Date
                </label>
                <input
                  class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                  type="date"
                  v-model="quotationData.quotation_exp"
                />
              </div>
              <div class="col-lg-6">
                <label class="form-label text-muted fs-13 fw-bold"
                  >Duration
                </label>
                <input
                  class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                  v-model="quotationData.project_duration"
                />
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
              @click="updateOtherInfo"
            >
              <i class="fa-regular fa-circle-check me-1"></i>
              Update changes
            </button>
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
import { useToast } from "vue-toastification";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ToWords } from "to-words";
import router from "@/router";

export default {
  props: [" q_id "],
  name: "projectQueryView",

  components: { TopNav, SideBar, Footer, QuillEditor },

  data() {
    return {
      editorOptions: {
        modules: {},
        placeholder: "Write here following your company policy...",
        theme: "snow",
      },
      id: "",
      quotationData: [],
      quotationItem: [],
      quotationTnc: "",

      quotetcID: "",

      subTotalPriceNew: 0,
      totalTaxAmount: 0,
      t_discount: 0,
      adjustment: 0,
      totalDiscount: 0,
      imageURL: process.env.VUE_APP_IMAGE_SERVER,
      isLoading: false,
      update: 0,

      vatAmount: 0,

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
    formatCurrency(amount) {
      const amountNew = +amount;

      return amountNew.toFixed(2);
    },
    handleTermDataChange() {
      this.quotationTnc = this.$refs.quillEditor.getHTML();
    },
    auth() {
      if (!this.viewPrivilege.includes("projectquery")) {
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

    calculateTax() {
      const taxper = parseFloat(this.quotationData.vatpercent) || 0;

      const subTPrice = parseFloat(this.subTotalPrice) || 0;

      const vatAmount = +subTPrice * (taxper / 100);

      this.vatAmount = +vatAmount.toFixed(2);
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
      this.toast.error(`${error}`, {
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

    getQuotationAllinfo() {
      this.q_id = this.$route.params.id;

      const data = new FormData();
      data.append("q_id", this.q_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.t_discount = data.message[0].discount;
          this.quotationData = data.message[0];
          this.vatAmount = data.message[0].vatandtax;
          this.adjustment = data.message[0].adjustment;

          this.quotationItem = data.message2.map((item) => {
            const taxAmount = (item.price * item.tax) / 100;

            return {
              ...item,
              taxAmount,
            };
          });

          this.quotationTnc = data.message3[0].tandc;
          this.quotetcID = data.message3[0].id;
        })
        .catch((err) => console.log(err.message));
    },

    updatePrice(item) {
      const rate = parseFloat(item.rate) || 0;
      const qty = parseFloat(item.qty) || 0;

      const amount = rate * qty;

      // const discountAmount = (+item.discount / 100) * amount;

      const price = amount;

      const taxAmount = (price * +item.tax) / 100;

      item.price = price.toFixed(2);
      item.taxAmount = taxAmount.toFixed(2);

      this.calculateTax();
    },

    async submitHandler() {
      await this.updateQuotation();
      await this.updateQuotationItems();
      await this.updateTC();
      this.isLoading = true;
    },

    async updateQuotation() {
      this.q_id = this.$route.params.id;
      const data = new FormData();
      data.append("q_id", this.q_id);
      data.append("stotal_amount", this.subTotalPriceNew);
      data.append("vatandtax", this.vatAmount);
      data.append("vatpercent", this.quotationData.vatpercent);
      data.append("discount", this.t_discount);
      data.append("adjustment", this.adjustment);
      data.append(
        "tamount",
        +this.subTotalPriceNew + +this.vatAmount - +this.adjustment
      );
      data.append("user", this.userInfo.username);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/updateQuotation`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        if (res.message === true) {
          setTimeout(() => {
            this.isLoading = false;
            this.successMsg("Quotation Updated");
            this.update = this.update + 1;
          }, 1000);
        } else {
          setTimeout(() => {
            this.isLoading = false;
            this.errMsg(res.message);
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    },

    deleteQuoteFunc() {
      this.q_id = this.$route.params.id;
      const data = new FormData();
      data.append("q_id", this.q_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/DeleteQuotation`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            this.successMsg(res.message);
            router.push(`/projectquery`);
          } else {
            this.errMsg(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateQuotationItems() {
      for (const item of this.quotationItem) {
        const data = new FormData();
        data.append("id", item.id);
        data.append("item", item.item);
        data.append("des", item.des);
        data.append("rate", item.rate);
        data.append("qty", item.qty);
        data.append("item_unit", item.item_unit);
        data.append("tax", item.tax);
        data.append("price", item.price);
        data.append("user", this.userInfo.username);

        try {
          const response = await fetch(
            `${process.env.VUE_APP_SERVER_URL}/updateQuotationItems`,
            {
              method: "POST",
              body: data,
            }
          );

          const res = await response.json();
          console.log(res.message);
          this.update = this.update + 1;
        } catch (error) {
          console.error(error);
        }
      }
    },

    async updateTC() {
      const data = new FormData();
      data.append("id", this.quotetcID);
      data.append("tandc", this.quotationTnc);
      data.append("user", this.userInfo.username);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/updateQuotationTC`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();
        console.log(res.message);
        this.update = this.update + 1;
      } catch (error) {
        console.log(error);
      }

      /* fetch(`${process.env.VUE_APP_SERVER_URL}/updateQuotationTC`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.update = this.update + 1;
        })
        .catch((error) => {
          console.log(error);
        }); */
    },

    updateOtherInfo() {
      const data = new FormData();
      data.append("q_id", this.q_id);
      data.append("quotation_exp", this.quotationData.quotation_exp);
      data.append("project_duration", this.quotationData.project_duration);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateQuotationOtherInfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.update = this.update + 1;
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

    handleEdit() {
      const quill = this.$refs.quillEditor;
      quill.setHTML(this.quotationTnc);
    },

    toggleApprove(status) {
      this.q_id = this.$route.params.id;

      const data = new FormData();
      data.append("q_id", this.q_id);
      data.append("approvel_status", status);

      fetch(`${process.env.VUE_APP_SERVER_URL}/ApprovedQuotation`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            if (status === "approved") {
              this.successMsg(`Quotation mark as ${status}`);
            } else {
              this.errMsg(`Quotation mark as ${status}`);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
    this.getQuotationAllinfo();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    quotationItemWithPrice() {
      return this.quotationItem.map((item) => {
        const rate = +item.rate || 0;

        const qty = +item.qty || 0;

        // const discountAmount = (+item.discount / 100) * amount;

        const price = rate * qty;

        const taxAmount = (price * +item.tax) / 100;
        return {
          ...item,
          price: price.toFixed(2),
          taxAmount: taxAmount.toFixed(2),
        };
      });
    },

    subTotalPrice() {
      this.subTotalPriceNew = this.quotationItem.reduce(
        (total, item) => total + +item.price,
        0
      );
      return this.quotationItem.reduce((total, item) => total + +item.price, 0);
    },

    adjustedTotal() {
      return +this.subTotalPriceNew + +this.vatAmount - +this.adjustment;
    },

    ...mapState(["userInfo"]),
    ...mapState(["orgInfo"]),
    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),

    convertToWordsWithCurrency() {
      const amount = parseFloat(this.quotationData.tamount);

      if (!isNaN(amount) && isFinite(amount)) {
        return this.toWords.convert(amount);
      } else {
        return "Invalid amount";
      }
    },
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  watch: {
    update() {
      this.getQuotationAllinfo();
    },
  },
};
</script>
<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #eeeeee;
  padding: 2px;
  text-align: left;
}

.inner-table th,
.inner-table td {
  border: none;
  padding: 2px;
  text-align: left;
  background-color: #fff !important;
}

.table th {
  background-color: #f0f0f0;
  font-size: 12px;
}

.table td {
  font-size: 12px;
}

.offcanvas {
  width: 55% !important;
}
</style>
