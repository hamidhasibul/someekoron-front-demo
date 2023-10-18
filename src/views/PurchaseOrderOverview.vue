<template>
  <div class="print_section"></div>

  <div class="view-section">
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar-container-right scroll-content">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-12">
              <p class="mb-0 text-color fs-20">Purchase Order Overview</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 py-0 px-0 border-end">
              <div class="p-3 pb-0">
                <p class="fs-16 font-weight-600 mb-0">
                  {{ purchase.vname }}
                </p>

                <p class="fs-12 mb-0">
                  {{ parseFloat(purchase.t_amount).toFixed(2) }}
                  {{ orgInfo.currency }}
                </p>
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-circle-info me-1"></i>
                  {{ terms.po_des }}
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
                    v-if="editPrivilege.includes('purchaseorderlist')"
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
                          v-model="purchase.c_date"
                        />

                        <label class="form-label text-muted fs-13 fw-bold"
                          >User</label
                        >
                        <input
                          class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                          type="text"
                          v-model="user"
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
                  <p class="fs-12 mb-0">Quotation ID: {{ purchase.po_id }}</p>
                  <p class="fs-12 mb-0">
                    Create Date: {{ formatDate(purchase.c_date) }}
                  </p>
                  <p
                    class="fs-12 mt-1 mb-0 text-primary text-decoration-underline"
                    data-bs-toggle="modal"
                    data-bs-target="#deletePOModal"
                    style="cursor: pointer"
                  >
                    Delete PO
                  </p>
                </div>

                <div
                  class="modal fade"
                  id="deletePOModal"
                  tabindex="-1"
                  aria-labelledby="deletePOModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-custom">
                    <div class="modal-content modal-content-custom">
                      <div class="modal-header">
                        <p class="fs-16 mb-1" id="deletePOModalLabel">
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
                          class="btn action-button"
                          data-bs-dismiss="modal"
                          @click="deletePOFunc"
                        >
                          <i class="fa-regular fa-circle-check me-1"></i>Delete
                          PO
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
                    v-if="editPrivilege.includes('purchaseorderlist')"
                  >
                    <i class="fa-solid fa-pen me-1"></i>Edit
                  </p>
                </div>

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
                      >Complete</a
                    >
                    <!-- <a
                      class="dropdown-item"
                      href="#"
                      @click="toggleApprove('disapproved')"
                      ><i class="fa-regular fa-circle-xmark me-1"></i>Not
                      Approved</a
                    > -->
                  </div>
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
                                <p class="fs-40 mb-1">Purchase Order</p>
                                <p class="fs-14 m-0">#{{ purchase.po_id }}</p>
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
                                Supplier Info
                              </th>
                              <th class="fs-12 py-1 bg-light px-2 w-50">
                                PO Info
                              </th>
                            </tr>
                            <tr>
                              <td class="border-end">
                                <p class="m-0 px-2 fs-14 font-weight-600 pb-0">
                                  {{ purchase.vname }}
                                </p>
                                <p class="m-0 fs-11 px-2 py-0">
                                  <i class="fa-solid fa-location-dot me-1"></i>
                                  {{ v_loc }}
                                </p>
                                <p class="fs-12 font-weight-600 mb-0 pb-0 px-2">
                                  C/P- {{ v_poc }}
                                </p>
                                <p class="fs-12 mb-0 px-2 py-0 pb-1">
                                  <i class="fa-solid fa-mobile-screen me-1"></i>
                                  {{ v_poc_contact }}
                                </p>
                              </td>
                              <td class="px-0">
                                <table class="inner-table w-100">
                                  <tr>
                                    <th
                                      class="fs-11 py-1 px-2 border-bottom"
                                      width="45%"
                                    >
                                      Create Date
                                    </th>
                                    <td
                                      class="fs-11 py-1 px-2 border-bottom"
                                      width="55%"
                                    >
                                      : {{ formatDate(purchase.c_date) }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      class="fs-11 py-1 px-2 border-bottom"
                                      width="45%"
                                    >
                                      Expected Delivery
                                    </th>
                                    <td
                                      class="fs-11 py-1 px-2 border-bottom"
                                      width="55%"
                                    >
                                      :
                                      {{ formatDate(purchase.edate) }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th class="fs-12 py-1 px-2" width="45%">
                                      Prepared By
                                    </th>
                                    <td class="fs-12 py-1 px-2" width="55%">
                                      : {{ userInfo.username }}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!-- 
                          <table
                            class="table table-bordered mb-3"
                            style="border: 1px solid #eeeeee"
                          >
                            <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Supplier
                              </th>
                              <td class="fs-12 py-1 px-2" width="40%">
                                {{ purchase.vname }}
                              </td>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Create Date
                              </th>
                              <td class="fs-12 py-1 px-2">
                                {{ purchase.c_date }}
                              </td>
                            </tr>
                            <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Location
                              </th>
                              <td class="fs-12 py-1 px-2" width="40%">
                                {{ v_loc }}
                              </td>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Expiary Date
                              </th>
                              <td class="fs-12 py-1 px-2">
                                {{ purchase.c_date }}
                              </td>
                            </tr>
                            <tr>
                              <th class="fs-12 py-1 bg-light px-2" width="15%">
                                Description
                              </th>
                              <td class="fs-12 py-1 px-2" colspan="3">
                                {{ terms.po_des }}
                              </td>
                            </tr>
                          </table> -->
                        </div>

                        <div class="row mb-3">
                          <div class="col-lg-12">
                            <div class="border px-2 py-1">
                              <p class="mb-0 fs-13 font-weight-600">PO Item</p>
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
                                  <p class="mb-0 fs-12 font-weight-600 ps-4">
                                    Unit
                                  </p>
                                </div>
                                <!-- <div class="py-1 w-10">
                            <p class="mb-0 fs-12 font-weight-600 text-end">
                              Disc(%)
                            </p>
                          </div> -->

                                <div class="py-1 w-20 text-end">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Price
                                  </p>
                                </div>
                              </div>
                            </div>

                            <!-- map item -->
                            <div
                              class="border border-top-0"
                              v-for="(item, index) in POItem"
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
                                <div class="py-1 w-10 ps-4">
                                  <p class="mb-0 fs-12">{{ item.unit }}</p>
                                </div>
                                <!-- <div class="py-1 w-10">
                            <p class="mb-0 fs-12 text-end">
                              {{ item.discount }}
                            </p>
                          </div> -->

                                <div class="py-1 w-20 text-end">
                                  <p class="mb-0 fs-12">{{ item.amount }}</p>
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
                                      parseFloat(purchase.st_amount).toFixed(2)
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
                                      parseFloat(purchase.vatpercent).toFixed(
                                        2
                                      )
                                    }}%)
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{ parseFloat(purchase.t_tax).toFixed(2) }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="border border-top-0">
                              <div class="d-flex px-2">
                                <div class="w-90 border-end text-end py-1 px-2">
                                  <p class="mb-0 fs-12 font-weight-600">
                                    Adjustment(-)
                                  </p>
                                </div>
                                <div class="w-10 py-1 text-end">
                                  <p class="mb-0 fs-12">
                                    {{
                                      parseFloat(purchase.adjustment).toFixed(2)
                                    }}
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
                                      parseFloat(purchase.t_amount).toFixed(2)
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
                          </div>
                        </div>

                        <div class="my-2">
                          <p class="fs-14 font-weight-600 border-bottom">
                            Terms & Condition
                          </p>
                          <table>
                            <tr>
                              <td class="fs-12 py-1 px-2">
                                <span v-if="terms">
                                  <span
                                    class="term-text fs-12"
                                    v-html="terms"
                                  ></span>
                                </span>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <div class="authrity w-30 mt-5">
                          <div class="m-0 fs-12 border-bottom">
                            <img
                              :src="`${this.imageURL}/${orgInfo.seal}`"
                              class="booklogo me-2"
                              alt=""
                              srcset=""
                            />

                            <p class="m-0 fs-11">{{ userInfo.username }}</p>

                            <span class="fst-italic fs-10">
                              {{ userInfo.role }}, {{ orgInfo.org_name }}
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
          Update PO Item
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
            {{ purchase.pr_name }}
          </p>

          <p class="fs-12 mb-0">
            {{ parseFloat(purchase.t_amount).toFixed(2) }}
            {{ orgInfo.currency }}
          </p>
          <p class="fs-12 mb-0">
            <i class="fa-solid fa-circle-info me-1"></i>
          </p>
        </div>
        <div>
          <div class="bg-light border border-top">
            <div class="d-flex px-2">
              <div class="py-1 w-30">
                <p class="mb-0 fs-12 font-weight-600">Item Name</p>
              </div>
              <div class="py-1 w-40">
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
            v-for="item in POItem"
            :key="item.id"
          >
            <div class="d-flex px-2">
              <div class="py-1 w-30 border-end">
                <p class="mb-0 fs-12">
                  <input
                    class="form-control text-start rounded-0 border-0 shadow-none inputa px-1"
                    v-model="item.item"
                  />
                </p>
              </div>
              <div class="py-1 w-40 border-end">
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
                  <select
                    class="form-select text-start rounded-0 border-0 shadow-none inputa px-2"
                    id="item_unit"
                    v-model="item.unit"
                  >
                    <option value="Piece">Piece</option>
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
                    v-model="item.amount"
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
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">VAT (%)</p>
              </div>
              <div class="w-10 py-0 text-end">
                <input
                  class="form-control text-end border-0 rounded-0 shadow-none inputa px-0"
                  type="number"
                  v-model="purchase.vatpercent"
                  @input="calculateTax"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">VAT(+)</p>
              </div>
              <div class="w-10 py-1 text-end">
                <p class="mb-0 fs-12">
                  {{ vatAmount }}
                </p>
              </div>
            </div>
          </div>

          <!-- <div class="border border-top-0">
            <div class="d-flex px-2">
              <div class="w-90 border-end text-end py-1 px-2">
                <p class="mb-0 fs-12 font-weight-600">Discount (%)</p>
              </div>
              <div class="w-10 py-1 text-end">
                <input
                  class="form-control text-end border-0 rounded-0 shadow-none inputa px-0"
                  type="number"
                  v-model="t_discount"
                />
              </div>
            </div>
          </div> -->

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

          <div class="my-2">
            <div class="w-20 py-1">
              <p class="mb-0 fs-12 font-weight-600">Terms & Condition</p>
            </div>
            <div class="w-100 py-1">
              <!-- <ul>
                  <li class="mb-1" v-for="item in terms" :key="item.id">
                    <input class="form-control text-start rounded-0 border-0 shadow-none inputa px-1"
                      v-model="item.tandc" />
                  </li>
                </ul> -->
              <div>
                <quill-editor
                  ref="quillEditor"
                  :options="editorOptions"
                  @text-change="handleTermDataChange"
                />
              </div>
            </div>
          </div>

          <div class="col-lg-3 my-3">
            <button
              data-bs-dismiss="offcanvas"
              @click="submitHandler"
              class="border-0 w-100 action-button py-1"
            >
              {{ isLoading === true ? "Loading..." : "Update" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { useToast } from "vue-toastification";
import { mapState } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ToWords } from "to-words";

export default {
  props: [" po_id "],
  name: "purchaseorderoverview",
  components: { TopNav, SideBar, Footer, QuillEditor },
  data() {
    return {
      id: "",
      imageURL: process.env.VUE_APP_IMAGE_SERVER,
      purchase: [],
      POItem: [],
      terms: "",
      v_id: "",
      v_loc: "",
      v_poc: "",
      v_poc_contact: "",

      user: "",

      // offcanvas stuff
      pOtcID: "",

      subTotalPriceNew: 0,
      totalTaxAmount: 0,
      t_discount: 0,
      adjustment: 0,
      totalDiscount: 0,

      // toast
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
    auth() {
      if (!this.viewPrivilege.includes("purchaseorderlist")) {
        this.$router.push("/dashboard");
      }
    },
    calculateTax() {
      const taxper = parseFloat(this.purchase.vatpercent) || 0;

      const subTPrice = parseFloat(this.subTotalPrice) || 0;

      const vatAmount = +subTPrice * (taxper / 100);

      this.vatAmount = +vatAmount.toFixed(2);
    },
    handleTermDataChange() {
      this.terms = this.$refs.quillEditor.getHTML();
    },
    handleEdit() {
      const quill = this.$refs.quillEditor;
      quill.setHTML(this.terms);
    },

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
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
        timeout: 3000,
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

    getPOAllData() {
      this.po_id = this.$route.params.id;
      console.log(this.id);

      const data = new FormData();
      data.append("po_id", this.po_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getPOAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.t_discount = data.message[0].discount;
          this.purchase = data.message[0];
          this.vatAmount = data.message[0].t_tax;
          this.adjustment = data.message[0].adjustment;
          this.POItem = data.message2.map((item) => {
            const taxAmount = (item.amount * item.tax) / 100;

            return {
              ...item,
              taxAmount,
            };
          });
          this.terms = data.message3[0].tandc;
          this.pOtcID = data.message3[0].id;

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
        })
        .catch((err) => console.log(err.message));
    },

    toggleApprove(status) {
      this.po_id = this.$route.params.id;

      const data = new FormData();
      data.append("po_id", this.po_id);
      data.append("user", this.userInfo.username);
      fetch(`${process.env.VUE_APP_SERVER_URL}/ApprovedPO`, {
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

    deletePOFunc() {
      this.po_id = this.$route.params.id;
      const data = new FormData();
      data.append("po_id", this.po_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/DeletePurchaseOrder`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            this.successMsg(res.message);
            router.push(`/purchaseorderlist`);
          } else {
            this.errMsg(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePrice(item) {
      const rate = parseFloat(item.rate) || 0;
      const qty = parseFloat(item.qty) || 0;

      const amount = rate * qty;

      // const discountAmount = (item.discount / 100) * amount;

      // const price = amount;

      const taxAmount = (amount * item.tax) / 100;

      item.amount = amount.toFixed(2);
      item.taxAmount = taxAmount.toFixed(2);
      this.calculateTax();
    },

    submitHandler() {
      this.updatePO();
      this.isLoading = true;
    },

    updatePO() {
      this.po_id = this.$route.params.id;

      const data = new FormData();
      data.append("po_id", this.po_id);
      data.append("st_amount", this.subTotalPriceNew);
      data.append("t_tax", this.vatAmount);
      data.append("vatpercent", this.purchase.vatpercent);
      data.append("discount", this.t_discount);
      data.append("adjustment", this.adjustment);
      data.append(
        "t_amount",
        this.subTotalPriceNew + this.vatAmount - this.adjustment
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/updatePO`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          if (res.message === true) {
            setTimeout(() => {
              this.isLoading = false;
              this.successMsg("PO Updated");
              this.update = this.update + 1;
            }, 1000);

            this.updatePOItems();
            this.updateTC();
          } else {
            state;
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg(res.message);
            }, 1000);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updatePOItems() {
      this.POItem.map((item) => {
        const data = new FormData();
        data.append("id", item.id);
        data.append("item", item.item);
        data.append("des", item.des);
        data.append("rate", item.rate);
        data.append("qty", item.qty);
        data.append("unit", item.unit);

        data.append("tax", 0);
        data.append("amount", item.amount);

        fetch(`${process.env.VUE_APP_SERVER_URL}/updatePOItem`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.message);
            this.update = this.update + 1;
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },

    updateTC() {
      const data = new FormData();
      data.append("id", this.pOtcID);
      data.append("tandc", this.terms);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updatePOTC`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.update = this.update + 1;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateOtherInfo() {
      const data = new FormData();
      data.append("po_id", this.po_id);
      data.append("c_date", this.purchase.c_date);
      data.append("user", this.userInfo.username);
      fetch(`${process.env.VUE_APP_SERVER_URL}/updatePOotherinfo`, {
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

    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate();
      const month = formatedDate.getMonth() + 1;
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  async mounted() {
    this.getPOAllData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
  updated() {
    console.log(this.t_discount);
  },

  computed: {
    POItemWithPrice() {
      return this.POItem.map((item) => {
        const rate = +item.rate || 0;

        const qty = +item.qty || 0;

        const amount = rate * qty;

        // const discountAmount = (item.discount / 100) * amount;

        // amount - discountAmount;

        const taxAmount = (amount * item.tax) / 100;
        return {
          ...item,
          amount: +amount.toFixed(2),
          taxAmount: +taxAmount.toFixed(2),
        };
      });
    },

    subTotalPrice() {
      this.subTotalPriceNew = this.POItem.reduce(
        (total, item) => total + +item.amount,
        0
      );
      return this.POItem.reduce((total, item) => total + +item.amount, 0);
    },
    /* totalTax() {
      this.totalTaxAmount = this.POItem.reduce(
        (total, item) => total + (+item.taxAmount || 0),
        0
      );
      return this.POItem.reduce(
        (total, item) => total + (+item.taxAmount || 0),
        0
      );
    }, */

    adjustedTotal() {
      return this.subTotalPriceNew + this.vatAmount - this.adjustment;
    },

    ...mapState(["userInfo"]),
    ...mapState(["orgInfo"]),

    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),

    convertToWordsWithCurrency() {
      const amount = parseFloat(this.purchase.t_amount);

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
      this.getPOAllData();
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
