<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Resource List</p>
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
          <div class="col-lg-2" v-if="createPrivilege.includes('resourcelist')">
            <router-link to="/addResource" class="btn action-button w-100"
              ><i class="fa-solid fa-circle-plus me-1"></i>Add
              Resource</router-link
            >
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <table class="table text-center align-middle mb-0">
              <thead>
                <tr
                  class="thead-color border border-0 border-bottom border-white text-start"
                >
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600 ps-4"
                    width="10%"
                  >
                    #ID
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="20%"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="20%"
                  >
                    Project Name
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                  >
                    Entry Date
                  </th>

                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                  >
                    Vendor
                  </th>

                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                  >
                    A c t i o n
                  </th>
                </tr>
              </thead>
              <tbody class="border-0 text-start">
                <tr v-if="items && items.length == 0">
                  <td colspan="100%" class="border-0">
                    <div class="row justify-content-center my-5">
                      <img
                        class="col-12 img-fluid"
                        src="../assets/image/noResourse.png"
                        alt="No Project"
                        style="width: 140px; opacity: 1"
                      />
                      <p class="col-12 fs-14 text-center my-3 text-muted">
                        There is no resourse item available!<br />
                        <span class="fs-12"
                          >Click the 'Add Resource' button to add new resource
                          and populate the table</span
                        >
                      </p>
                    </div>
                  </td>
                </tr>
                <tr
                  v-else
                  class="shadowItem"
                  v-for="item in items"
                  :key="item.id"
                >
                  <td class="border-0 fs-12 ps-4">{{ item.rid }}</td>
                  <td class="border-0 fs-12 font-weight-600">
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 250px; color: #119074"
                      >{{ item.rname }}
                    </span>
                  </td>
                  <!-- <td class="border-0 fs-12">
                    <div class="d-flex">
                      <p class="m-0">{{ truncateText(item.pname || "General", 35) }}</p>
                      <i v-if="item.transfer_project" class="fa-solid ms-2 mt-2 mb-1 fa-turn-down text-primary"></i>
                    </div>

                    <span v-if="item.transfer_project" v-for="stransfer_project in JSON.parse(item.transfer_project)"
                      class="border-0 fs-10 font-weight-600 m-0 px-1 mx-1" style="
                    color: #fff;
                    border-radius: 5px;
                    background-color: rgb(7, 179, 36);
                    padding-block: 1px;">


                      {{ truncateText(stransfer_project, 35) }}
                    </span>
                  </td> -->

                  <td class="border-0 fs-12">
                    <div class="d-flex">
                      <p class="m-0">
                        {{ truncateText(item.pname || "General Stock", 35) }}
                      </p>
                      <i
                        v-if="item.transfer_project_List"
                        class="fa-solid ms-2 mt-2 mb-1 fa-turn-down text-primary"
                      ></i>
                    </div>

                    <span
                      v-if="item.transfer_project_List"
                      v-for="(
                        project, index
                      ) in item.transfer_project_List.split(',')"
                      class="border-0 fs-10 font-weight-600 m-0 px-1 mx-1"
                      style="
                        color: #fff;
                        border-radius: 5px;
                        background-color: rgb(7, 179, 36);
                        padding-block: 1px;
                      "
                    >
                      {{ project.trim() }}
                      <span> </span>
                    </span>
                  </td>

                  <td class="border-0 fs-12">
                    <span class="py-1 px-2 fs-11 font-weight-600 button-blue">
                      {{ item.qty }} {{ item.ptype }}
                    </span>
                  </td>
                  <td class="border-0 fs-12">{{ formatDate(item.edate) }}</td>
                  <td class="border-0 fs-12 font-weight-600" width="15%">
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 250px"
                      >{{ item.vname }}</span
                    >
                  </td>

                  <td class="border-0 fs-12 d-flex">
                    <i
                      class="fa-solid fa-arrow-right-arrow-left px-0 me-2"
                      :data-bs-toggle="'modal'"
                      :data-bs-target="'#resource_transfer_' + item.id"
                      style="cursor: pointer; color: rgb(116, 116, 116)"
                      v-if="editPrivilege.includes('resourcelist')"
                    ></i>

                    <!-- Resource transfer Modal -->

                    <div
                      v-for="item in items"
                      :key="item.id"
                      class="modal fade"
                      :id="'resource_transfer_' + item.id"
                      tabindex="-1"
                      aria-labelledby="'resource_transfer_label_' + item.id"
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
                              id="staticBackdropLabel"
                            >
                              Resource Transfer
                            </p>
                          </div>

                          <div class="modal-body">
                            <div class="row text-start border-bottom">
                              <div class="col-lg-12 mb-3">
                                <p class="mb-0 fs-12">
                                  <span class="text-primary font-weight-600"
                                    >*Note:</span
                                  >
                                  Please carefully read and check the following
                                  information before transferring resources in
                                  the software. May result in delays or errors
                                  in processing your project.
                                </p>
                              </div>
                              <div class="col-lg-3 pe-0">
                                <p class="fs-12 mb-1 font-weight-600">
                                  Resource ID
                                </p>
                              </div>
                              <div class="col-lg-9">
                                <!-- <input
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                  v-model="item.rid"
                                /> -->
                                <p class="fs-12 mb-1">: {{ item.rid }}</p>
                              </div>

                              <div class="col-lg-3 pe-0">
                                <p class="fs-12 mb-1 font-weight-600">
                                  Resource Name
                                </p>
                              </div>
                              <div class="col-lg-9">
                                <p class="fs-12 mb-1">: {{ item.rname }}</p>
                              </div>
                              <div class="col-lg-3 pe-0">
                                <p class="fs-12 mb-1 font-weight-600">
                                  Resource QTY
                                </p>
                              </div>
                              <div class="col-lg-9">
                                <p class="fs-12 mb-1">
                                  : {{ item.qty }} {{ item.ptype }}
                                </p>
                              </div>
                              <div class="col-lg-3 pe-0">
                                <p class="fs-12 mb-1 font-weight-600">
                                  Total Cost
                                </p>
                              </div>
                              <div class="col-lg-9">
                                <p class="fs-12 mb-1">
                                  :
                                  {{ item.tcost || totalCost }}
                                  {{ orgInfo.currency }}
                                </p>
                              </div>

                              <div class="col-lg-3 pe-0">
                                <p class="fs-12 mb-1 font-weight-600">
                                  Unit Cost
                                </p>
                              </div>
                              <div class="col-lg-9">
                                <!-- <input
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                  v-model="item.unitCost"
                                  @input="
                                    calcTotalCost(item.unitCost, item.qty)
                                  "
                                /> -->
                                <p class="fs-12 mb-1">
                                  : {{ item.unitCost }} {{ orgInfo.currency }}
                                </p>
                              </div>

                              <div class="col-lg-3 pe-0">
                                <p class="fs-12 mb-1 font-weight-600">
                                  Entry Date
                                </p>
                              </div>
                              <div class="col-lg-9">
                                <!-- <input
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                  v-model="item.edate"
                                  type="date"
                                /> -->
                                <p class="fs-12 mb-1">: {{ item.edate }}</p>
                              </div>

                              <div class="col-lg-3 pe-0">
                                <p class="fs-12 mb-1 font-weight-600">Vendor</p>
                              </div>
                              <div class="col-lg-9">
                                <!-- <input
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                  v-model="item.vname"
                                /> -->
                                <p class="fs-12 mb-1">: {{ item.vname }}</p>
                              </div>

                              <div class="col-lg-3 pe-0">
                                <p class="fs-12 mb-1 font-weight-600">
                                  Current Location
                                </p>
                              </div>
                              <div class="col-lg-9">
                                <p class="fs-12 mb-1">
                                  :
                                  {{ item.rType }}
                                </p>
                              </div>
                            </div>

                            <!-- Transfer Type -->
                            <div class="text-start fs-14 my-4">
                              <label class="pe-3">Transfer to </label>
                              <div class="form-check form-check-inline">
                                <input
                                  name="resource_type"
                                  id="general_stock"
                                  v-model="resource_type"
                                  class="form-check-input"
                                  type="radio"
                                  value="General_Stock"
                                  :checked="resource_type === 'General_Stock'"
                                  @change="handleResourceTypeChange"
                                />
                                <label
                                  for="general_stock"
                                  class="form-check-label fs-14"
                                  >General</label
                                >
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  id="project_resource"
                                  v-model="resource_type"
                                  class="form-check-input"
                                  type="radio"
                                  name="resourceType"
                                  value="Project_Resource"
                                  :checked="
                                    resource_type === 'Project_Resource'
                                  "
                                  @change="handleResourceTypeChange"
                                />
                                <label
                                  for="project_resource"
                                  class="form-check-label fs-14"
                                  >Project</label
                                >
                              </div>
                            </div>
                            <div
                              class="row text-start"
                              v-if="showProjectNameField"
                            >
                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Project Name :</p>
                              </div>
                              <div class="col-lg-6">
                                <div class="dropdown">
                                  <div
                                    @click="toggleDropdown"
                                    @custom-event="
                                      handleCustomEvent(
                                        selectedOption.project_name
                                      )
                                    "
                                    class="border rounded form-select py-1"
                                  >
                                    {{
                                      selectedOption
                                        ? selectedOption.project_name
                                        : "Select Project Name"
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
                                      v-for="project in filteredOptions"
                                      :key="project.id"
                                      @click="selectOption(project)"
                                      class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                                    >
                                      <span class="fs-14">{{
                                        project.project_name
                                      }}</span
                                      ><br />
                                      <span class="fs-11">{{
                                        project.org_name
                                      }}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-3"></div>
                            </div>
                            <div class="row text-start">
                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Stock :</p>
                              </div>
                              <div class="col-lg-6">
                                <input
                                  id="stock"
                                  v-model="totalQty"
                                  type="text"
                                  class="form-control rounded-0 border-muted shadow-none inputa"
                                  @input="
                                    calcTotalCost(item.unitCost, this.totalQty);
                                    calcRemainingStock(item.qty, this.totalQty);
                                  "
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
                              data-bs-dismiss="modal"
                              @click="
                                transferResources(
                                  item.id,
                                  item.rid,
                                  item.transfer_amount
                                )
                              "
                            >
                              Transfer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <i
                      class="fa-solid fa-layer-group px-0 me-2"
                      :data-bs-toggle="'modal'"
                      :data-bs-target="'#stock_update_' + item.id"
                      style="cursor: pointer; color: rgb(116, 116, 116)"
                      v-if="editPrivilege.includes('resourcelist')"
                    ></i>

                    <!-- Stock Update Modal -->

                    <div
                      v-for="item in items"
                      :key="item.id"
                      class="modal fade"
                      :id="'stock_update_' + item.id"
                      tabindex="-1"
                      :aria-labelledby="'stock_update_label_' + item.id"
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
                            <p class="fs-16 m-0 font-weight-600">
                              Stock Update
                            </p>
                          </div>
                          <div class="modal-body">
                            <div class="row text-start border-bottom">
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

                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Resource Type</p>
                              </div>
                              <div class="col-lg-6">
                                <p
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                >
                                  {{ item.rType }}
                                </p>
                              </div>
                              <div class="col-lg-3"></div>

                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Resource ID</p>
                              </div>
                              <div class="col-lg-6">
                                <p
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                >
                                  {{ item.rid }}
                                </p>
                              </div>
                              <div class="col-lg-3"></div>

                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Resource Name</p>
                              </div>
                              <div class="col-lg-6">
                                <p
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                >
                                  {{ item.rname }}
                                </p>
                              </div>
                              <div class="col-lg-3"></div>

                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Vendor</p>
                              </div>
                              <div class="col-lg-6">
                                <p
                                  class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                                >
                                  {{ item.vname }}
                                </p>
                              </div>
                            </div>
                            <div class="row text-start mt-3">
                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Update Date</p>
                              </div>
                              <div class="col-lg-6">
                                <input
                                  id="up_date"
                                  v-model="item.edate"
                                  type="date"
                                  class="form-control rounded-0 border-muted shadow-none inputa"
                                />
                              </div>
                              <div class="col-lg-3"></div>
                            </div>
                            <div class="row text-start">
                              <div class="col-lg-3 pe-0">
                                <p class="mt-1 fs-14">Stock</p>
                              </div>
                              <div class="col-lg-6">
                                <input
                                  id="stock"
                                  v-model="item.qty"
                                  type="text"
                                  class="form-control rounded-0 border-muted shadow-none inputa"
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
                              data-bs-dismiss="modal"
                              @click="
                                updateStock(item.rid, item.edate, item.qty)
                              "
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <i
                      class="fa-solid fa-eye text-muted px-0"
                      style="cursor: pointer; color: rgb(116, 116, 116)"
                      @click="showOffcanvas(item.id)"
                      v-if="viewPrivilege.includes('resourcelist')"
                    ></i>

                    <!-- Resource Info Canvas -->

                    <div
                      class="offcanvas offcanvas-end"
                      tabindex="-1"
                      v-bind:id="'offcanvasRight_' + item.id"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div class="offcanvas-header py-3">
                        <p id="offcanvasRightLabel" class="fs-16 mb-0">
                          Resource Information
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
                        <div class="row text-center my-4">
                          <div class="col-lg-4">
                            <img src="" alt="" />
                          </div>
                          <div class="col-lg-4 mb-1">
                            <p class="m-0 rounded-pill bg-primary text-white">
                              {{ item.rid }}
                            </p>
                          </div>
                          <div class="col-lg-12">
                            <p class="m-0 fs-18 text-muted font-weight-600">
                              {{ item.rname }}
                            </p>
                          </div>
                        </div>

                        <div>
                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Project Name
                            </p>
                            <p class="m-0">{{ item.pname || "General" }}</p>
                          </div>
                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Quantity
                            </p>
                            <p class="m-0">{{ item.qty }} {{ item.ptype }}</p>
                          </div>

                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Total Cost
                            </p>
                            <p class="m-0">
                              {{ item.tcost }} {{ orgInfo.currency }}
                            </p>
                          </div>

                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Per Unit Cost
                            </p>
                            <p class="m-0">
                              {{ item.unitCost }} {{ orgInfo.currency }}
                            </p>
                          </div>

                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">
                              Entry Date
                            </p>
                            <p class="m-0">{{ item.edate }}</p>
                          </div>
                          <div
                            class="d-flex align-items-center border-bottom py-2"
                          >
                            <p class="w-50 m-0 fs-12 font-weight-600">Vendor</p>
                            <p class="m-0">{{ item.vname }}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Resource info canvas -->

                    <i
                      class="ms-2 fa-solid fa-trash-can text-muted px-0"
                      style="cursor: pointer; color: rgb(116, 116, 116)"
                      v-if="
                        deletePrivilege.includes('resourcelist') &&
                        !item.transfer_project_List
                      "
                      data-bs-toggle="modal"
                      :data-bs-target="`#deleteResource${item.id}`"
                    />
                    <i
                      @click="warningMsg('You cant delete this resource')"
                      class="ms-2 fa-solid fa-trash-can text-muted px-0"
                      style="cursor: pointer; color: rgb(116, 116, 116)"
                      v-else
                    />

                    <div
                      :id="'deleteResource' + item.id"
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
                              Mark this Resource ({{ item.rid }}) as Deleted!
                              Are you sure?
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
                              @click="
                                deleteResource(
                                  item.rid,
                                  item.id,
                                  item.qty,
                                  item.transfer_from,
                                  item.pid,
                                  item.pname
                                )
                              "
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

          <div v-if="items && items.length != 0" class="col-lg-12">
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
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { customAlphabet } from "nanoid";
import { useToast } from "vue-toastification";
import { mapState } from "vuex";

export default {
  name: "ResourceList",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      resource_type: "",
      items: "",
      showProjectNameField: true,
      resource_id: "",
      up_date: "",
      update: 0,
      totalCost: 0,
      newStock: 0,
      totalQty: 0,
      isDropdownOpen: false,
      newStock: 0,
      searchQuery: "",
      selectedOption: 0,
      transferProject: "",
      transferProjectName: "",
      transferProjectID: "",
      totalPages: 1,
      currentPage: 1,
      searchText: "",
    };
  },
  async mounted() {
    this.getResources(this.currentPage);
    this.getProjectData();
    this.generateResourceID();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    errMsg(msg) {
      this.loading = false;

      this.toast.error(msg, {
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
      this.toast.warning(msg, {
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

    successMsg(msg) {
      this.toast.success(msg, {
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

    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    },

    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate();
      const month = formatedDate.getMonth() + 1;
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },

    auth() {
      if (!this.viewPrivilege.includes("resourcelist")) {
        this.$router.push("/dashboard");
      }
    },
    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchOrgInfo");
      this.$store.dispatch("fetchUserInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    // offcanvas

    showOffcanvas(bankId) {
      const offcanvas = document.getElementById("offcanvasRight_" + bankId);
      offcanvas.classList.add("show");
    },
    closeOffcanvas(bankId) {
      const offcanvas = document.getElementById("offcanvasRight_" + bankId);
      offcanvas.classList.remove("show");
    },

    deleteResource(rid, id, qty, transfer_from, pid, pname) {
      const data = new FormData();

      data.append("r_id", rid);
      data.append("id", id);
      data.append("qty", qty);
      data.append("transfer_from", transfer_from);
      data.append("pid", pid);
      data.append("pname", pname);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteResource`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message) {
            this.update = this.update + 1;
          }
          this.getResources(this.currentPage);
          this.generateResourceID();
        })
        .catch((err) => console.log(err.message));
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(project) {
      this.transferProjectID = project.p_id;
      this.transferProjectName = project.project_name;
      this.selectedOption = project;
      this.isDropdownOpen = false;
    },
    handleResourceTypeChange() {
      if (this.resource_type === "General_Stock") {
        this.showProjectNameField = false;
        this.project_name = "";
      } else if (this.resource_type === "Project_Resource") {
        this.showProjectNameField = true;
      }
    },

    // Get Resources Function

    getResources(page) {
      const data = new FormData();
      data.append("searchText", this.searchText);
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/getSortedResourceData?page=${page}`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.items = data.message;
          this.totalPages = data.totalPages;
          this.currentPage = page;
        })
        .catch((err) => console.log(err.message));
    },

    updateStock(id, date, qty) {
      const data = new FormData();

      data.append("rid", id);
      data.append("edate", date);
      data.append("qty", qty);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateResourceStockById`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.update = this.update + 1;
          this.getResources(this.currentPage);
          this.generateResourceID();
        })
        .catch((err) => console.log(err.message));
    },

    transferResources(id, rsID, currentTrQTY) {
      this.items
        .filter((item) => {
          return item.id === id;
        })
        .map((item) => {
          const data = new FormData();
          this.generateResourceID();
          data.append("rid", this.resource_id);

          data.append("rname", item.rname);
          data.append("rType", this.resource_type);
          data.append("transfer_from", rsID);
          data.append("pname", this.transferProjectName);
          data.append("pid", this.transferProjectID);
          data.append("qty", this.totalQty);
          data.append("ptype", item.ptype);
          data.append("tcost", this.totalCost);
          data.append("unitCost", item.unitCost);
          data.append("edate", item.edate);
          data.append("invoice", item.invoice);
          data.append("vname", item.vname);

          fetch(`${process.env.VUE_APP_SERVER_URL}/transferResourceData`, {
            method: "POST",
            body: data,
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.message) {
                this.update = this.update + 1;
                this.getResources(this.currentPage);
                this.generateResourceID();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        });

      this.items
        .filter((item) => {
          return item.id === id;
        })
        .map((item) => {
          const data = new FormData();

          data.append("id", item.id);
          data.append("qty", this.newStock);
          data.append("transfer_project", this.transferProject);
          data.append("transfer_project_id", this.transferProjectID);
          data.append("transfer_amount", +currentTrQTY + +this.totalQty);
          data.append("tcost", item.tcost - this.totalCost);

          fetch(`${process.env.VUE_APP_SERVER_URL}/updateResourceDataStock`, {
            method: "POST",
            body: data,
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              if (res.message) {
                this.update = this.update + 1;
                this.getResources(this.currentPage);
                this.generateResourceID();

                this.resource_type = "";
                this.items = "";
                this.showProjectNameField = true;
                this.resource_id = "";
                this.up_date = "";
                this.update = 0;
                this.totalCost = 0;
                this.newStock = 0;
                this.totalQty = 0;
                this.isDropdownOpen = false;
                this.newStock = 0;
                this.searchQuery = "";
                this.selectedOption = 0;
                this.transferProject = "";
                this.transferProjectName = "";
                this.transferProjectID = "";
                this.totalPages = 1;
                this.currentPage = 1;
                this.searchText = "";
              } else {
                console.log(res);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        });
    },

    calcRemainingStock(prevVal, newVal) {
      this.newStock = prevVal - newVal;
    },

    calcTotalCost(unitCost, qty) {
      const unitPrice = +unitCost || 0;
      const unitqty = +qty || 0;

      this.totalCost = unitPrice * unitqty;
    },

    getProjectData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.projectData = data.message;
        })
        .catch((err) => console.error(err.message));
    },

    handleSelectedOptionChange(value) {
      this.transferProject = value;
    },

    async generateResourceID() {
      // const date = new Date();
      // const year = String(date.getFullYear()).slice(-2);
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const timestamp = String(date.getTime()).slice(-5);
      // this.resource_id = `R${year}${month}${day}${timestamp}`;

      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getResourceLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.resource_id = `R${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },
  },

  watch: {
    update() {
      this.getResources(this.currentPage);
    },

    "selectedOption.project_name": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  updated() {
    if (this.resource_type === "General_Stock") {
      this.transferProject = "General";
    } else {
      this.resource_type = "Project_Resource";
      this.transferProject = this.transferProjectName;
    }
  },

  computed: {
    ...mapState(["orgInfo"]),

    filteredOptions() {
      if (!this.searchQuery) {
        return this.projectData;
      }
      const query = this.searchQuery.toLowerCase();
      return this.projectData.filter((project) =>
        project.project_name.toLowerCase().includes(query)
      );
    },

    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
    ...mapState(["deletePrivilege"]),
    ...mapState(["userInfo"]),
  },
  watch: {
    searchText(newVal) {
      this.getResources(this.currentPage);
    },
  },
};
</script>
<style></style>
