<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right scroll-content">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-12">
            <p class="mb-0 text-color fs-20">Add New Project</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Before adding the <b>Project</b> to the software, please take the time to thoroughly review and verify the
              following information
              <br />
              <span class="note-space">Failure to do so may lead to delays or errors in processing your project.</span>
            </p>
          </div>
          <div class="col-lg-12">
            <div
              class="nav nav-tabs mb-2"
              id="nav-tab"
              role="tablist"
              style="text-align: center; border-bottom: 1px solid gainsboro"
            >
              <button
                class="nav-link rounded-0 text-muted2 fs-14 active"
                id="nav-project-details-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-project-details"
                type="button"
                role="tab"
                aria-controls="nav-project-details"
                aria-selected="true"
              >
                Project Info
              </button>

              <button
                class="nav-link rounded-0 fs-14 text-muted2"
                id="nav-project-budget-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-project-budget"
                type="button"
                role="tab"
                aria-controls="nav-project-budget"
                aria-selected="false"
              >
                Project Budget
              </button>

              <button
                class="nav-link rounded-0 fs-14 text-muted2"
                id="nav-project-task-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-project-task"
                type="button"
                role="tab"
                aria-controls="nav-project-task"
                aria-selected="false"
              >
                Project Task
              </button>
            </div>
          </div>

          <!-- Project Info Section -->

          <div class="tab-content bg-white" id="nav-tabContent">
            <div
              class="tab-pane p-3 fade active show"
              id="nav-project-details"
              role="tabpanel"
              aria-labelledby="nav-project-details-tab"
            >
              <div class="row w-75">
                <div class="col-lg-6 mb-2">
                  <label for="project_id" class="form-label text-muted fs-13 fw-bold"
                    >Project ID<span class="fs-15 text-danger">*</span>
                  </label>
                  <input
                    disabled
                    id="project_id"
                    v-model="project_id"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="quotation_number" class="form-label text-muted fs-13 fw-bold"
                    >Quotation Number<span class="fs-15 text-danger">*</span>
                    <span class="fs-14 text-muted"
                      ><b-button v-b-tooltip.hover title="This list displays only approved quotation numbers.">
                        <i class="fa-solid fa-circle-info ms-1"></i> </b-button></span
                  ></label>
                  <div class="dropdown">
                    <div
                      @click="toggleDropdown"
                      @custom-event="handleCustomEvent(selectedOption.q_id)"
                      class="border rounded form-select py-1"
                      style="cursor: pointer"
                    >
                      {{
                        selectedOption
                          ? selectedOption.q_id
                          : this.searchQuery
                          ? this.searchQuery
                          : "Select Quotation ID"
                      }}
                    </div>

                    <div
                      v-show="isDropdownOpen"
                      class="position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                    >
                      <input type="text" v-model="searchQuery" placeholder="Search..." class="dropdown-search" />

                      <p
                        v-for="quotation in filteredOptions"
                        :key="quotation.id"
                        @click="selectOption(quotation)"
                        class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                      >
                        <span class="fs-14">{{ quotation.q_id }}</span
                        ><br />
                        <span class="fs-11">{{ quotation.org_name }}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 mb-2">
                  <label for="project_name" class="form-label text-muted fs-13 fw-bold"
                    >Project Name<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="project_name"
                    v-model="project_name"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                    disabled
                  />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="organization_name" class="form-label text-muted fs-13 fw-bold"
                    >Organization Name<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="organization_name"
                    v-model="organization_name"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                    disabled
                  />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="organization_loc" class="form-label text-muted fs-13 fw-bold"
                    >Organization Location<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="organization_loc"
                    type="text"
                    v-model="organization_loc"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-6">
                  <label for="contact_person" class="form-label text-muted fs-13 fw-bold"
                    >Contact Person<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="contact_person"
                    v-model="contact_person"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="contact_person_mobile" class="form-label text-muted fs-13 fw-bold"
                    >Contact Person Mobile<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="contact_person_mobile"
                    placeholder="XXXXXXXXXXX"
                    v-model="contact_person_mobile"
                    type="phone"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-12">
                  <hr class="mt-3" />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="duration" class="form-label text-muted fs-13 fw-bold"
                    >Duration<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="duration"
                    v-model="duration"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="amount" class="form-label text-muted fs-13 fw-bold"
                    >Amount<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="amount"
                    v-model="amount"
                    type="number"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="start_date" class="form-label text-muted fs-13 fw-bold"
                    >Start Date<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="start_date"
                    v-model="start_date"
                    type="date"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="completion_date" class="form-label text-muted fs-13 fw-bold"
                    >Completion Date<span class="fs-15 text-danger">*</span></label
                  >
                  <input
                    id="completion_date"
                    v-model="completion_date"
                    type="date"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-6 mb-2">
                  <label for="customerPOref" class="form-label text-muted fs-13 fw-bold">Customer PO Ref.</label>
                  <input
                    id="customerPOref"
                    v-model="customerPoRef"
                    type="text"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>
                <div class="col-lg-6 mb-2">
                  <label for="customerPODate" class="form-label text-muted fs-13 fw-bold">Customer PO Date</label>
                  <input
                    id="customerPODate"
                    v-model="customerPoDate"
                    type="date"
                    class="form-control rounded-0 border-muted shadow-none inputa"
                  />
                </div>

                <div class="col-lg-12">
                  <hr class="mt-3" />
                </div>

                <p class="fs-12">
                  <b class="text-primary">Note: </b> Only Project Manager and Project members can access the project
                  task and collaboration section. Please review it carefully before submitting.
                </p>

                <div class="col-lg-6 mb-2">
                  <label for="project_manager" class="form-label text-muted fs-13 fw-bold"
                    >Project Manager<span class="fs-15 text-danger">*</span>
                    <span class="fs-14 text-muted"
                      ><b-button v-b-tooltip.hover title="This list displays only approved quotation numbers.">
                      </b-button></span
                  ></label>
                  <div class="dropdown">
                    <div
                      @click="toggleDropdownMember"
                      @custom-event="handleCustomEvent(selectedProjectManager.username)"
                      class="border rounded form-select py-1"
                      style="cursor: pointer"
                    >
                      {{
                        selectedProjectManager
                          ? selectedProjectManager.username
                          : this.searchQueryProjectManager
                          ? this.searchQueryProjectManager
                          : "Choose Project Manager"
                      }}
                    </div>

                    <div
                      v-show="isDropdownOpenMember"
                      class="position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                    >
                      <input
                        type="text"
                        v-model="searchQueryProjectManager"
                        placeholder="Search..."
                        class="dropdown-search"
                      />

                      <p
                        v-for="Member in filteredOptionsProjectManager"
                        :key="Member.id"
                        @click="selectProjectManager(Member)"
                        class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                      >
                        <span class="fs-14">{{ Member.username }}</span
                        ><br />
                        <span class="fs-11">{{ Member.email }}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 mb-2">
                  <label for="quotation_number" class="form-label text-muted fs-13 fw-bold"
                    >Project Members<span class="fs-15 text-danger">*</span> <span class="fs-14 text-muted"></span
                  ></label>
                  <div class="dropdown">
                    <div
                      @click="toggleDropdownProjectMember"
                      @custom-event="handleCustomEvent(selectedProjectMember.username)"
                      class="border rounded form-select py-1"
                      style="cursor: pointer"
                    >
                      {{
                        selectedProjectMember
                          ? selectedProjectMember.username
                          : this.searchQueryMember
                          ? this.searchQueryMember
                          : "Choose Project Members"
                      }}
                    </div>

                    <div
                      v-show="isDropdownOpenProjectMember"
                      class="position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                    >
                      <input type="text" v-model="searchQueryMember" placeholder="Search..." class="dropdown-search" />

                      <p
                        v-for="Member in filteredOptionsMember"
                        :key="Member.id"
                        @click="selectProjectMember(Member)"
                        class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                      >
                        <span class="fs-14">{{ Member.username }}</span
                        ><br />
                        <span class="fs-11">{{ Member.email }}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 mb-4 mt-2">
                  <div class="bg-light1 rounded p-2">
                    <p class="fs-14 font-weight-600 m-0">Project Members List</p>
                    <div class="" v-if="proeject_members_array == ''">
                      <p class="fs-12 mt-2 fst-italic">Selected members list will be displayed here. . .</p>
                    </div>
                    <div v-else class="row align-items-center">
                      <div class="col-lg-3 my-2" v-for="(item, index) in proeject_members_array" :key="index">
                        <div
                          class="d-flex align-items-center justify-content-between p-2 bg-white rounded"
                          style="border: 1px solid #64c1ec"
                        >
                          <div>
                            <p class="fs-12 font-weight-600 m-0 p-0">
                              <i class="fa-solid fa-circle-user me-1"></i>
                              {{ item.username }}
                            </p>
                            <p class="fs-10 m-0 p-0">{{ item.email }}</p>
                          </div>
                          <i
                            class="fa fa-xmark ms-3 cursor-pointer"
                            @click="proeject_members_array.splice(index, 1)"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row justify-content-between align-items-center mt-3">
                <div class="col-lg-3">
                  <button @click="submitProjectInfo" class="border-0 w-100 action-button py-1">
                    {{ isLoading ? "Processing . . ." : "Save & Next" }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Project Budget Section -->

            <div
              class="tab-pane fade p-3"
              id="nav-project-budget"
              role="tabpanel"
              aria-labelledby="nav-project-budget-tab"
            >
              <div class="row">
                <p class="form-label text-muted fs-16 font-weight-400">Project Budget</p>
              </div>

              <div class="container">
                <div class="row mb-0 fs-12 font-family border-top border-bottom" style="background-color: #f5f5f5">
                  <div class="col-lg-1 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1 ps-2">SL</div>
                  <div class="col-lg-3 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Budget Particular<span class="fs-15 text-danger">*</span>
                  </div>
                  <div class="col-lg-5 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Description<span class="fs-15 text-danger">*</span>
                  </div>
                  <div class="col-lg-2 text-end border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Estimated Cost<span class="fs-15 text-danger">*</span>
                  </div>
                  <div class="col-lg-1 text-center border-0 fs-12 text-muted font-weight-500 py-1 px-1">Action</div>
                </div>

                <div class="row mb-0 border-bottom fs-12" v-for="(item, index) in budget_item_array" :key="index">
                  <div class="col-lg-1 py-2 border-end text-start text-muted">
                    {{ index + 1 }}
                  </div>
                  <div class="col-lg-3 py-2 border-end text-start text-muted">
                    <input
                      class="form-control rounded-0 border-0 shadow-none inputa px-1"
                      type="text"
                      v-model="item.budget_particular"
                    />
                  </div>
                  <div class="col-lg-5 py-2 border-end text-start text-muted">
                    <input
                      class="form-control rounded-0 border-0 shadow-none inputa px-1"
                      type="text"
                      v-model="item.description"
                    />
                  </div>

                  <div class="col-lg-2 py-2 border-end text-end text-muted">
                    <input
                      class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
                      type="number"
                      v-model="item.estimated_cost"
                    />
                  </div>

                  <div class="col-lg-1 py-2 text-center text-muted" @click="deleteBudgetItem(index)">
                    <i class="fa-regular fa-trash-can py-1" style="cursor: pointer"></i>
                  </div>
                </div>

                <div class="row pb-2">
                  <div class="col-lg-6 px-0">
                    <button
                      @click="addbudgetItem"
                      type="submit"
                      class="border-0 w-25 mt-2 btn-sm fs-13 rounded-1"
                      style="
                        background-color: white !important;
                        color: #10b793;
                        border: 1px solid #10b793 !important;
                        height: 1.8rem;
                        font-weight: 600;
                      "
                    >
                      Add More Item
                    </button>
                  </div>
                  <div class="col-lg-3">
                    <div class="fs-14 py-2 font-weight-700 text-end">TOTAL Estimated Cost ({{ orgInfo.currency }})</div>
                  </div>
                  <div class="col-lg-2 px-0">
                    <div class="fs-12 py-2 px-3 text-end text-muted">
                      {{ totalEstimatedCost }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-2 col-auto offset-10 mt-4">
                <button @click="submitProjectBudget" class="border-0 w-100 action-button py-1">
                  {{ isLoading ? "Processing . . ." : "Save & Next" }}
                </button>
              </div>
            </div>

            <!-- Project Task Section -->

            <div class="tab-pane fade p-3" id="nav-project-task" role="tabpanel" aria-labelledby="nav-project-task-tab">
              <div class="row">
                <p class="form-label text-muted fs-16 font-weight-400">Project Task</p>
              </div>

              <div class="container-fluid">
                <div class="row mb-0 fs-12 font-family border-top border-bottom" style="background-color: #f5f5f5">
                  <div class="col-lg-3 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Task Name<span class="fs-15 text-danger">*</span>
                  </div>
                  <div class="col-lg-3 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Task Description<span class="fs-15 text-danger">*</span>
                  </div>
                  <!-- <div class="col-lg-2 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Task Assign<span class="fs-15 text-danger">*</span>
                  </div> -->

                  <div class="col-lg-1 text-center border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Credit (%)<span class="fs-15 text-danger">*</span>
                  </div>
                  <div class="col-lg-2 text-end border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Start Date<span class="fs-15 text-danger">*</span>
                  </div>
                  <!-- <div class="col-lg-1 text-center border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Budget<span class="fs-15 text-danger">*</span>
                  </div> -->
                  <div class="col-lg-2 text-end border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                    Completion Date<span class="fs-15 text-danger">*</span>
                  </div>
                  <div class="col-lg-1 text-center border-0 fs-12 text-muted font-weight-500 py-1 px-1">Action</div>
                </div>

                <!-- Add Items Section -->

                <form v-on:submit="addItems">
                  <div class="row">
                    <div class="col-lg-3 px-1 border-end py-1">
                      <input
                        type="text"
                        class="form-control rounded-0 border-0 shadow-none inputa px-1"
                        id="task_name"
                        placeholder="Type task name"
                        v-model="task_name"
                        aria-describedby=""
                      />
                    </div>

                    <div class="col-lg-3 px-1 border-end py-1">
                      <input
                        type="text"
                        class="form-control rounded-0 border-0 shadow-none inputa px-1"
                        id="Task_Description"
                        placeholder="Type task description"
                        v-model="task_description"
                        aria-describedby=""
                      />
                    </div>

                    <!-- <div class="col-lg-2 px-1 border-end py-1">
                      <div class="dropdown">
                        <div
                          @click="toggleDropdownMember"
                          @custom-event="handleCustomEvent(selectedOptionMember.username)"
                          class="border rounded form-select py-1"
                          style="cursor: pointer"
                        >
                          {{
                            selectedOptionMember
                              ? selectedOptionMember.username
                              : this.searchQueryMember
                              ? this.searchQueryMember
                              : "Choose User"
                          }}
                        </div>

                        <div
                          v-show="isDropdownOpenMember"
                          class="position-absolute sizing border border-1 rounded-bottom p-1 w-100"
                        >
                          <input
                            type="text"
                            v-model="searchQueryMember"
                            placeholder="Search..."
                            class="dropdown-search"
                          />

                          <p
                            v-for="Member in filteredOptionsMember"
                            :key="Member.id"
                            @click="selectOptionMember(Member)"
                            class="my-2 px-2 dropclass lineheight mx-1 rounded py-2"
                          >
                            <span class="fs-14">{{ Member.username }}</span
                            ><br />
                            <span class="fs-11">{{ Member.email }}</span>
                          </p>
                        </div>
                      </div>
                    </div> -->

                    <div class="col-lg-1 px-1 border-end py-1">
                      <input
                        type="number"
                        class="form-control rounded-0 border-0 shadow-none inputa px-2 text-end"
                        id="task_credit"
                        v-model="task_credit"
                        aria-describedby=""
                      />
                    </div>
                    <div class="col-lg-2 px-1 border-end py-1">
                      <input
                        type="date"
                        class="form-control rounded-0 border-0 shadow-none inputa px-2 text-end"
                        id="sdate"
                        v-model="sdate"
                        aria-describedby=""
                      />
                    </div>

                    <!-- <div class="col-lg-1 px-1 border-end py-1">
                      <input
                        type="number"
                        class="form-control rounded-0 border-0 shadow-none inputa px-2 text-end"
                        id="budget_number"
                        v-model="budget_number"
                        aria-describedby=""
                      />
                    </div> -->
                    <div class="col-lg-2 px-1 border-end py-1">
                      <input
                        type="date"
                        class="form-control rounded-0 border-0 shadow-none inputa px-1 text-end"
                        id="pr_date"
                        v-model="pr_date"
                        aria-describedby=""
                      />
                    </div>
                    <div class="col-lg-1 px-1 border-end py-1">
                      <button
                        type="submit"
                        class="border-0 w-75 ms-2 btn-sm fs-13 text-white rounded-1"
                        style="background-color: #10b793; border-color: #10b793; height: 1.8rem"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div class="col-lg-12">
                <div class="bg-white border-top">
                  <div class="bg-light p-1">
                    <p class="mb-0 px-1 fs-14">Task List</p>
                  </div>
                  <div
                    v-for="(task_name, index) in task_array"
                    :key="index"
                    class="d-flex justify-content-between align-items-center border-bottom pt-2"
                  >
                    <div class="ps-2">
                      <p class="mb-0 pb-0" style="font-size: 14px; color: #10b793; font-weight: 500">
                        {{ task_name.task_name }}
                      </p>
                      <p class="mb-1" style="font-size: 12px; color: #565656">
                        {{ task_name.task_des }}
                      </p>
                    </div>

                    <div class="d-flex">
                      <!-- <p class="py-1 px-3 button-blue font-weight-600 me-3 fs-12">
                        <i class="fa-regular fa-user me-1"></i>
                        {{ task_name.assignedMember }}
                      </p> -->
                      <p class="py-1 px-3 button-red font-weight-600 me-3 fs-12">{{ task_name.task_credit }} %</p>
                      <p class="py-1 px-3 button-blue font-weight-600 me-3 fs-12">
                        <i class="fa-regular fa-flag me-1"></i>
                        {{ task_name.sdate }}
                      </p>

                      <p class="py-1 px-3 fs-12 button-violate font-weight-600">
                        <i class="fa-solid fa-flag me-1"></i>
                        {{ task_name.date }}
                      </p>

                      <span class="py-1 px-4 fs-12 rounded-pill" @click="deleteTask(index)">
                        <i class="fa-regular fa-trash-can"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-2 col-auto offset-10 mt-4">
                <button @click="addProject" class="border-0 w-100 action-button py-1">Add Project</button>
              </div>
            </div>
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
import { customAlphabet } from "nanoid";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "projectadd",
  components: { TopNav, SideBar },

  data() {
    return {
      selectedOption: 0,
      searchQuery: "",
      isDropdownOpen: false,
      selectedOptionMember: 0,
      selectedProjectManager: 0,
      selectedProjectMember: 0,
      proeject_members_array: [],
      searchQueryMember: "",
      searchQueryProjectManager: "",
      isDropdownOpenMember: false,
      isDropdownOpenProjectMember: false,
      project_id: "",
      project_manager: "",
      contact_number: "",
      quotation_number: "",
      quotationData: [],
      MemberData: [],
      budget_item_array: [],
      project_name: "",
      organization_name: "",
      organization_loc: "",
      contact_person: "",
      contact_person_mobile: "",
      duration: "",
      amount: 0,
      start_date: "",
      completion_date: "",
      customerID: "",
      task_array: [],
      task_name: "",
      task_description: "",
      task_credit: 0,
      budget_number: 0,
      sdate: "",
      pr_date: "",
      totalCreditCount: 0,

      isLoading: false,

      customerPoRef: "",
      customerPoDate: "",

      itemConditions: [
        localStorage.getItem("p_id") === "",
        this.task_name === "",
        this.task_description === "",
        this.task_credit === "",
        this.budget_number === "",
      ],
    };
  },

  computed: {
    ...mapState(["orgInfo"]),

    totalEstimatedCost() {
      return this.budget_item_array.reduce((total, item) => total + +item.estimated_cost, 0);
    },
    filteredOptions() {
      if (!this.searchQuery) {
        return this.quotationData.filter((item) => {
          return item.approvel_status == "approved";
        });
      }
      const query = this.searchQuery.toLowerCase();
      return this.quotationData.filter(
        (quotation) => quotation.q_id.toLowerCase().includes(query) && quotation.approvel_status == "approved"
      );
    },
    filteredOptionsMember() {
      if (!this.searchQueryMember) {
        return this.MemberData;
      }
      const query = this.searchQueryMember.toLowerCase();
      return this.MemberData.filter((Member) => Member.username.toLowerCase().includes(query));
    },
    filteredOptionsProjectManager() {
      if (!this.searchQueryProjectManager) {
        return this.MemberData;
      }
      const query = this.searchQueryProjectManager.toLowerCase();
      return this.MemberData.filter((Member) => Member.username.toLowerCase().includes(query));
    },

    ...mapState(["userInfo"]),
    ...mapState(["createPrivilege"]),
  },

  watch: {
    "selectedOption.q_id": function (newVal, oldVal) {
      this.handleSelectedOptionChange(newVal);
    },
  },

  methods: {
    deleteBudgetItem(index) {
      this.budget_item_array.splice(index, 1);
    },

    auth() {
      if (!this.createPrivilege.includes("projectlist")) {
        this.$router.push("/dashboard");
      }
    },
    successMsg(msg) {
      this.showToast(`${msg} Added!`, "success");
    },

    errMsg(error) {
      this.showToast(`${error}`, "error");
    },

    warningMsg(msg) {
      this.showToast(msg, "warning");
    },

    showToast(message, type) {
      this.toast[type](message, {
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

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchOrgInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleDropdownMember() {
      this.isDropdownOpenMember = !this.isDropdownOpenMember;
    },
    toggleDropdownProjectMember() {
      this.isDropdownOpenProjectMember = !this.isDropdownOpenProjectMember;
    },
    selectOption(quotation) {
      this.selectedOption = quotation;
      this.isDropdownOpen = false;
    },
    selectOptionMember(Member) {
      this.selectedOptionMember = Member;
      this.isDropdownOpenMember = false;
    },
    selectProjectManager(Member) {
      this.selectedProjectManager = Member;
      this.project_manager = Member.username;
      this.isDropdownOpenMember = false;
    },
    selectProjectMember(Member) {
      this.selectedProjectMember = Member;
      const memberToPush = {
        username: Member.username,
        id: Member.id,
        email: Member.email,
      };
      const memberExists = this.proeject_members_array.some((member) => member.id === memberToPush.id);
      if (!memberExists) {
        this.proeject_members_array.push(memberToPush);
      }
      this.isDropdownOpenProjectMember = false;
    },

    handleSelectedOptionChange(value) {
      const data = new FormData();
      data.append("q_id", value);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.quotation_number = value;
          this.contact_person = res.message[0].contact;
          this.project_name = res.message[0].project_name;
          this.organization_name = res.message[0].org_name;
          this.organization_loc = res.message[0].org_location;
          this.contact_person_mobile = res.message[0].cp_phone;
          this.duration = res.message[0].project_duration;
          this.amount = res.message[0].tamount;
          this.start_date = res.message[0].date;
          this.customerID = res.message[0].c_id;

          // this.budget_item_array = res.message2;
          res.message2.forEach((item, index) => {
            const newItem = {
              p_id: this.project_id,
              budget_particular: item.item,
              description: item.des,
              estimated_cost: 0,
            };
            this.budget_item_array.push(newItem);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    submitProjectInfo() {
      if (
        this.project_id == "" ||
        this.quotation_number == "" ||
        this.project_name == "" ||
        this.organization_name == "" ||
        this.organization_loc == "" ||
        this.contact_person == "" ||
        this.contact_person_mobile == "" ||
        this.duration == "" ||
        this.amount == "" ||
        this.start_date == "" ||
        this.completion_date == ""
      ) {
        this.warningMsg("Fill up the Required Fields!!");
        return false;
      }

      this.isLoading = true;

      const data = new FormData();

      data.append("p_id", this.project_id);
      data.append("project_manager", this.project_manager);
      data.append("project_members", JSON.stringify(this.proeject_members_array));
      data.append("c_id", this.customerID);
      data.append("contact", this.contact_number);
      data.append("quotation_id", this.quotation_number);
      data.append("project_name", this.project_name);
      data.append("org_name", this.organization_name);
      data.append("org_location", this.organization_loc);
      data.append("contact_pname", this.contact_person);
      data.append("contact_pmobile", this.contact_person_mobile);
      data.append("duration", this.duration);
      data.append("amount", this.amount);
      data.append("sdate", this.start_date);
      data.append("cdate", this.completion_date);
      data.append("cpoRef", this.customerPoRef);
      data.append("cpoDate", this.customerPoDate);

      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addProjectData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.isLoading = false;
              this.successMsg("Project Info");
              localStorage.setItem("p_id", this.project_id);
              document.getElementById("nav-project-budget-tab").click();
            }, 1000);
          } else {
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg(res.message);
            }, 1000);
          }
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.errMsg(error);
        });
    },

    addItems(e) {
      e.preventDefault();

      if (
        localStorage.getItem("p_id") === "" ||
        this.task_name === "" ||
        this.task_description === "" ||
        this.task_credit <= 0 ||
        this.sdate === "" ||
        this.pr_date === ""
      ) {
        this.warningMsg("Please check required field");
        return false;
      }

      const newObject = {
        p_id: localStorage.getItem("p_id"),
        task_name: this.task_name,
        task_des: this.task_description,
        task_credit: this.task_credit,
        sdate: this.sdate,
        date: this.pr_date,
        assignedMember: this.selectedOptionMember.username,
      };

      const totalCredits = this.task_array.reduce((sum, item) => sum + item.task_credit, 0);

      // this.totalCreditCount = totalCredits;

      if (totalCredits + this.task_credit > 100) {
        // alert("Task credit exceeded 100%");
        this.errMsg("Task credit exceeded 100%");
        return;
      } else {
        this.task_array = [...this.task_array, newObject];
      }

      this.task_name = "";
      this.task_description = "";
      this.task_credit = 0;
      this.pr_date = "";
      this.sdate === "";
      this.selectedOptionMember = "";
    },
    addbudgetItem() {
      this.budget_item_array.push({
        p_id: localStorage.getItem("p_id"),
        budget_particular: "",
        description: "",
        estimated_cost: 0,
      });
    },
    submitProjectBudget() {
      if (
        this.project_id == "" ||
        this.quotation_number == "" ||
        this.project_name == "" ||
        this.organization_name == "" ||
        this.organization_loc == "" ||
        this.contact_person == "" ||
        this.contact_person_mobile == "" ||
        this.duration == "" ||
        this.amount == "" ||
        this.start_date == "" ||
        this.completion_date == ""
      ) {
        this.warningMsg("Fill up the Previous Section!!");
        return false;
      } else if (this.budget_item_array.length == 0) {
        this.warningMsg("Project Budget Required!!");

        return false;
      }

      this.isLoading = true;
      const DLdata = new FormData();
      DLdata.append("p_id", this.project_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteProjectBudget`, {
        method: "POST",
        body: DLdata,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            const data = new FormData();
            console.log("check ", this.budget_item_array);
            data.append("budget_item_array", JSON.stringify(this.budget_item_array));

            fetch(`${process.env.VUE_APP_SERVER_URL}/addProjectBudget`, {
              method: "POST",
              body: data,
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                if (res.message === true) {
                  setTimeout(() => {
                    this.isLoading = false;
                    this.successMsg("Project Info");
                    document.getElementById("nav-project-task-tab").click();
                  }, 1000);
                } else {
                  setTimeout(() => {
                    this.isLoading = false;
                    // this.errMsg(res.message);
                    console.log(res);
                  }, 1000);
                }
              })
              .catch((error) => {
                console.log(error);
                this.isLoading = false;
                // this.errMsg(error);
              });
          } else {
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg("error delete");
              console.log(res.message);
            }, 1000);
          }
        });
    },

    addProject() {
      const totalCredits = this.task_array.reduce((sum, item) => sum + item.task_credit, 0);
      console.log(this.task_array);
      if (
        this.project_id == "" ||
        this.quotation_number == "" ||
        this.project_name == "" ||
        this.organization_name == "" ||
        this.organization_loc == "" ||
        this.contact_person == "" ||
        this.contact_person_mobile == "" ||
        this.duration == "" ||
        this.amount == "" ||
        this.start_date == "" ||
        this.completion_date == "" ||
        this.budget_item_array.length === 0
      ) {
        this.warningMsg("Fill up the Previous Section!!");
        return false;
      } else if (this.task_array.length == 0) {
        this.warningMsg("Task Item Required!!");

        return false;
      } else if (this.budget_item_array.length == 0) {
        this.warningMsg("Fill up the Previous Section!!");

        return false;
      } else if (totalCredits < 100) {
        this.warningMsg(`Task credit must be 100%`);

        return false;
      }

      this.isLoading = true;
      const DLdata = new FormData();
      DLdata.append("p_id", this.p_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteProjectTasks`, {
        method: "POST",
        body: DLdata,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            const data = new FormData();
            data.append("task_array", JSON.stringify(this.task_array));

            fetch(`${process.env.VUE_APP_SERVER_URL}/addProjectTasks`, {
              method: "POST",
              body: data,
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                if (res.message === true) {
                  setTimeout(() => {
                    this.isLoading = true;

                    router.push(`/projectlistview/${this.task_array[0].p_id}`);
                    localStorage.removeItem("p_id");
                  }, 1000);
                } else {
                  setTimeout(() => {
                    this.isLoading = false;
                    // this.errMsg(res.message);
                  }, 1000);
                }
              })
              .catch((error) => {
                console.log(error);
                this.isLoading = false;
                // this.errMsg(error);
              });
          } else {
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg("error delete");
              console.log(res.message);
            }, 1000);
          }
        });
    },

    deleteTask(index) {
      this.task_array.splice(index, 1);
    },

    generateProjectID() {
      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.project_id = `P${year}${data.message}`;
        })
        .catch((err) => console.error(err.message));
    },

    getQuotationData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationAllinfo`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.quotationData = data.message;
        })
        .catch((err) => console.error(err.message));
    },
    getMemberData() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getAllMemberinfo`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.MemberData = data.message;
        })
        .catch((err) => console.error(err.message));
    },
  },
  async mounted() {
    this.getQuotationData();
    this.getMemberData();
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }

    const editid = this.$route.query.editid;

    if (editid) {
      const data = new FormData();
      data.append("p_id", editid);
      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("p_id", data.message[0].p_id);
          console.log(data);
          this.project_id = data.message[0].p_id;
          this.proeject_members_array = JSON.parse(data.message[0].project_members);
          this.project_manager = data.message[0].project_manager;
          this.searchQueryProjectManager = data.message[0].project_manager;

          this.customerID = data.message[0].c_id;
          this.contact_number = data.message[0].contact;
          this.quotation_number = data.message[0].quotation_id;
          this.searchQuery = data.message[0].quotation_id;
          this.project_name = data.message[0].project_name;
          this.organization_name = data.message[0].org_name;
          this.organization_loc = data.message[0].org_location;
          this.contact_person = data.message[0].contact_pname;
          this.contact_person_mobile = data.message[0].contact_pmobile;
          this.duration = data.message[0].duration;
          this.amount = data.message[0].amount;
          this.start_date = data.message[0].sdate;
          this.completion_date = data.message[0].cdate;
          this.customerPoRef = data.message[0].cpoRef;
          this.customerPoDate = data.message[0].cpoDate;
          this.budget_item_array = data.message3;
        })
        .catch((err) => console.error(err.message));
    } else {
      this.generateProjectID();
    }
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>
