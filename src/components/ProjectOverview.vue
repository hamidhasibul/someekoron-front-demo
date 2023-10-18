<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 border-end p-0">
        <div class="p-3 pb-0">
          <p class="fs-16 font-weight-600 mb-0">
            {{ projectData.project_name }}
          </p>

          <p class="fs-12 mb-0">
            {{ parseFloat(projectData.amount).toFixed(2) }}
            {{ orgInfo.currency }}
          </p>
          <p class="fs-12 mb-0">Duration: {{ projectData.duration }}</p>
        </div>

        <div class="p-3">
          <p class="fs-16 font-weight-600 mb-0">
            {{ projectData.org_name }}
          </p>
          <p class="fs-12 mb-0" style="white-space: pre-line">
            <i class="fa-solid fa-location-dot me-1"></i>
            {{ projectData.org_location }}
          </p>
        </div>
        <div class="bg-light p-3 py-2">
          <p class="mb-1 fs-13">Person of Contact</p>
          <p class="fs-12 font-weight-600 mb-0">
            {{ projectData.contact_pname }}
          </p>
          <p class="fs-12 mb-0"><i class="fa-solid fa-mobile-screen me-1"></i>{{ projectData.contact_pmobile }}</p>
        </div>

        <div class="pb-2">
          <p class="mb-0 py-1 px-3 fs-13 border-top border-bottom font-weight-600">
            Other Info
            <span
              class="mx-2"
              data-bs-toggle="modal"
              data-bs-target="#otherInfoModal"
              style="cursor: pointer"
              v-if="editPrivilege.includes('projectlist')"
            >
              <small class="fs-12 text-primary text-decoration-underline"
                ><i class="fa-solid fa-pen me-1"></i>Edit</small
              >
            </span>
          </p>

          <!-- modal -->
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
                  <img src="../assets/image/updated.png" class="update-icon me-2" alt="" srcset="" />
                  <p class="fs-16 m-0 font-weight-600" id="otherInfoModalLabel">Update Other Info</p>
                </div>
                <div class="modal-body">
                  <label class="form-label text-muted fs-13 fw-bold">Amount </label>
                  <input
                    class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                    type="number"
                    v-model="projectData.amount"
                  />
                  <label class="form-label text-muted fs-13 fw-bold">Project Duration </label>
                  <input
                    class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                    type="text"
                    v-model="projectData.duration"
                  />
                  <label class="form-label text-muted fs-13 fw-bold">Start Date </label>
                  <input
                    class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                    type="date"
                    v-model="projectData.sdate"
                  />
                  <label class="form-label text-muted fs-13 fw-bold">Completion Date </label>
                  <input
                    class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                    type="date"
                    v-model="projectData.cdate"
                  />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn close-button" data-bs-dismiss="modal">
                    <i class="fa-regular fa-circle-xmark me-1"></i>
                    Close
                  </button>
                  <button data-bs-dismiss="modal" type="button" class="btn action-button" @click="otherinfoupdate">
                    <i class="fa-regular fa-circle-check me-1"></i>Update changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- modal -->

          <div class="px-3 py-2">
            <p class="fs-12 mb-0">Project ID: {{ projectData.p_id }}</p>
            <p class="fs-12 mb-0">
              Quotation ID:
              <router-link :to="`/projectqueryview/${projectData.quotation_id}`" class="fw-56">
                <span class="text-primary">{{ projectData.quotation_id }}</span>
              </router-link>
            </p>

            <p class="fs-12 mb-0">Start Date: {{ projectData.sdate }}</p>
            <p class="fs-12 mb-0">Completion Date: {{ projectData.cdate }}</p>

            <div class="rounded bg-teambox p-2 mt-3">
              <div class="d-flex justify-content-between align-items-center border-bottom mb-2 pb-2">
                <p class="fs-12 mb-0">
                  <i class="fa-solid fa-user-gear me-1"></i>Project Manager: <b>{{ projectData.project_manager }}</b>
                </p>
                <p
                  class="mb-0"
                  data-bs-toggle="modal"
                  data-bs-target="#memberModal"
                  style="cursor: pointer"
                  v-if="editPrivilege.includes('projectlist')"
                >
                  <small class="fs-11 text-primary text-decoration-underline"
                    ><i class="fa-solid fa-pen me-1"></i>Edit</small
                  >
                </p>
              </div>
              <!-- modal -->
              <div
                class="modal fade"
                id="memberModal"
                tabindex="-1"
                aria-labelledby="otherInfoModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-custom">
                  <div class="modal-content modal-content-custom">
                    <div class="d-flex align-items-center p-2 py-3 border-bottom">
                      <img src="../assets/image/updated.png" class="update-icon me-2" alt="" srcset="" />
                      <p class="fs-16 m-0 font-weight-600" id="otherInfoModalLabel">Update Project Manager & Member</p>
                    </div>
                    <div class="modal-body row">
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
                            <input
                              type="text"
                              v-model="searchQueryMember"
                              placeholder="Search..."
                              class="dropdown-search"
                            />

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
                            <div class="col-lg-6 my-2" v-for="(item, index) in proeject_members_array" :key="index">
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
                    <div class="modal-footer">
                      <button type="button" class="btn close-button" data-bs-dismiss="modal">
                        <i class="fa-regular fa-circle-xmark me-1"></i>
                        Close
                      </button>
                      <button data-bs-dismiss="modal" type="button" class="btn action-button" @click="memberinfoupdate">
                        <i class="fa-regular fa-circle-check me-1"></i>Update Members
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- modal -->
              <div class="fs-12">
                <div v-if="projectData.project_members">
                  <div v-for="(item, index) in JSON.parse(projectData.project_members)" :key="index" class="d-flex">
                    <p class="rounded m-0 mb-1 bg-white p-1 px-2 me-1">
                      <i class="fa-solid fa-circle-user me-1"></i> {{ item.username }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="px-3 py-2">
            <p v-if="+projectData.status === 1" class="fs-12 mb-0">Status: Completed</p>
            <span v-else>
              <button
                class="mb-0 btn action-button"
                data-bs-toggle="modal"
                data-bs-target="#confirmProjectModal"
                v-if="editPrivilege.includes('projectlist')"
              >
                Mark as Done
              </button>
              <p v-else class="fs-12 mb-0">Not Completed</p>
            </span>
          </div>
        </div>
      </div>

      <div class="col-lg-8 py-3">
        <div class="row align-items-center pe-3">
          <div class="col-3 d-flex align-items-center fs-12">
            <div class="mb-0 fs-16 font-weight-600">Task Item</div>

            <span
              class="mx-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#TaskEditOffcanvas"
              aria-controls="offcanvasRight"
              style="cursor: pointer"
              v-if="editPrivilege.includes('projectlist') && taskProgress < 100"
            >
              <small class="fs-12 font-weight-600 text-primary text-decoration-underline"
                ><i class="fa-solid fa-pen me-1"></i>Edit</small
              >
            </span>

            <div
              class="offcanvas w-75 offcanvas-end"
              tabindex="-1"
              id="TaskEditOffcanvas"
              aria-labelledby="offcanvasRightLabel"
            >
              <div class="">
                <div class="d-flex align-items-center p-2 py-3 border-bottom">
                      <img src="../assets/image/updated.png" class="update-icon me-2" alt="" srcset="" />
                      <p class="fs-16 m-0 font-weight-600" id="otherInfoModalLabel">Update Project Task</p>
                    </div>
                
              </div>
              <div class="offcanvas-body">
                <div>
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
                      

                      <div class="col-lg-2 text-end border-0 fs-12 text-muted font-weight-500 py-1 px-1">
                        Completion Date<span class="fs-15 text-danger">*</span>
                      </div>
                      <div class="col-lg-1 text-center border-0 fs-12 text-muted font-weight-500 py-1 px-1">Action</div>
                    </div>

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
                                  : "Select Member UserName"
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
                        

                        <div class="col-lg-2 px-1 border-end py-1">
                          <input
                            type="date"
                            class="form-control rounded-0 border-0 shadow-none inputa px-1"
                            id="pr_date"
                            v-model="pr_date"
                            aria-describedby=""
                          />
                        </div>
                        <div class="col-lg-1 px-1 py-1">
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
                        v-for="(task_name, index) in updateProjectTasks"
                        :key="index"
                        class="d-flex justify-content-between border-bottom pt-2"
                      >
                        <div class="d-flex ps-2">
                          <div>
                            <p class="mb-0 pb-0" style="font-size: 14px; color: #10b793; font-weight: 600">
                              {{ task_name.task_name }}
                            </p>
                            <p class="mb-1" style="font-size: 12px; color: #565656">
                              {{ task_name.task_des }}
                            </p>
                          </div>
                        </div>
                        <div>
                          
                          
                        </div>
                        <div class="d-flex align-items-center">
                          <p class="py-1 px-3 bg-primary text-white rounded m-0 me-2 fs-12">{{ task_name.task_credit }} %</p>

                          <p class="m-0 fs-12 me-2">
                  <span class="button-blue px-2 py-1 font-weight-600"
                    ><i class="fa-regular fa-flag me-1"></i> {{ task_name.sdate }}</span
                  >
                </p>

                          <p class="m-0 fs-12">
                  <span class="button-red px-2 py-1 font-weight-600"
                    ><i class="fa-solid fa-flag me-1"></i> {{ task_name.date }}</span
                  >
                </p>

                          

                          <span class="py-1 px-4 fs-12 rounded-pill" @click="deleteTask(index)">
                            <i class="fa-regular fa-trash-can"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 col-auto offset-8 mt-4">
                    <div class="d-flex">
                      <button type="button" class="btn close-button w-50 me-2" data-bs-dismiss="offcanvas">
                        <i class="fa-regular fa-circle-xmark me-1"></i>
                        Close
                      </button>
                    <button data-bs-dismiss="offcanvas" @click="updateTask" class="border-0 w-50 action-button py-1">
                      Update
                    </button>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-9 progress p-0">
            <div
              class="progress-bar"
              role="progressbar"
              :style="`width: ${taskProgress}%`"
              :aria-valuenow="taskProgress"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ taskProgress }}%
            </div>
          </div>
        </div>

        <div class="col-lg-12 my-2" v-for="item in projectTasks" :key="item.id">
          <div class="card p-2 px-3">
            <div class="d-flex align-items-center">
              <div class="w-75">
                <div class="d-flex">
                  <p class="m-0 fs-13 font-weight-600">
                  {{ item.task_name }}
                </p>
                  <p class="m-0 fs-11 ms-2">
                  <span class="bg-primary text-white rounded font-weight-600 px-2"> {{ item.task_credit }}% </span>
                </p>
                </div>
                

                <p class="m-0 fs-11">{{ item.task_des }}</p>
              </div>
              <div class="w-35 d-flex">
                <p class="m-0 fs-12">
                  <span class="button-blue px-2 font-weight-600"
                    ><i class="fa-regular fa-flag me-1"></i> {{ item.sdate }}</span
                  >
                </p>
                
                <p class="m-0 fs-12 ms-2">
                  <span class="button-red font-weight-600 px-2">
                    <i class="fa-solid fa-flag me-1"></i> {{ item.date }}
                  </span>
                </p>
              </div>

              <!-- <div class="w-25">
                      <i
                        v-if="
                          item.status === 0 &&
                          item.assignedMember === userInfo.username
                        "
                        class="fa-solid fa-circle-check text-primary"
                        @click="setActive(item.id)"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmTaskModal"
                        style="cursor: pointer"
                      ></i>
                      <p
                        v-else-if="item.assignedMember !== userInfo.username"
                        class="m-0 fs-12 text-muted"
                      >
                        <i class="fa-solid fa-circle-check"></i>
                      </p>
                      <p class="m-0 fs-12 text-success" v-else>
                        <i class="fa-regular fa-circle-check"></i>
                        Completed
                      </p>
                    </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm Task Modal -->
  <div
    class="modal fade"
    id="confirmTaskModal"
    tabindex="-1"
    aria-labelledby="confirmTaskModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-custom">
      <div class="modal-content modal-content-custom">
        <div class="modal-header">
          <p class="fs-16 mb-1" id="confirmTaskModalLabel">
            <img src="../assets/image/alert.png" class="alert-icon me-1" alt="" srcset="" />
            Mark this task as complete! Are you sure?
          </p>
        </div>

        <div class="p-2 d-flex justify-content-end">
          <button type="button" class="btn close-button me-2" data-bs-dismiss="modal">
            <i class="fa-regular fa-circle-xmark me-1"></i> No
          </button>
          <button data-bs-dismiss="modal" type="button" class="btn action-button" @click="markDoneTask">
            <i class="fa-regular fa-circle-check me-1"></i>Confirm
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm Project Modal -->
  <div
    class="modal fade"
    id="confirmProjectModal"
    tabindex="-1"
    aria-labelledby="confirmProjectModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-custom">
      <div class="modal-content modal-content-custom">
        <div class="modal-header">
          <p class="fs-16 mb-1" id="confirmProjectModalLabel">
            <img src="../assets/image/alert.png" class="alert-icon me-1" alt="" srcset="" />
            Mark this project as complete! Are you sure?
          </p>
        </div>
        <div class="p-2 d-flex justify-content-end">
          <button type="button" class="btn close-button me-2" data-bs-dismiss="modal">
            <i class="fa-regular fa-circle-xmark me-1"></i> No
          </button>
          <button type="button" class="btn action-button" data-bs-dismiss="modal" @click="markDoneProject">
            <i class="fa-regular fa-circle-check me-1"></i>Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "ProjectOverview",
  data() {
    return {
      id: "",
      projectData: [],
      projectTasks: [],
      projectBudget: [],
      MemberData: [],
      updateProjectTasks: [],
      selectedOptionMember: 0,
      searchQueryMember: "",
      isDropdownOpenMember: false,
      task_name: "",
      task_description: "",
      task_credit: 0,
      budget_number: 0,
      sdate: "",
      pr_date: "",
      activeID: 0,
      taskProgress: 0,
      update: 0,

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
      project_manager: "",
    };
  },
  methods: {
    selectOptionMember(Member) {
      this.selectedOptionMember = Member;
      this.isDropdownOpenMember = false;
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

    fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchUserPrivilege", id);
      this.$store.dispatch("fetchOrgInfo");
    },
    getProjectData() {
      this.p_id = this.$route.params.id;

      const data = new FormData();
      data.append("p_id", this.p_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getProjectAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.projectData = data.message[0];
          this.projectTasks = data.message2;
          this.projectBudget = data.message3;
          this.updateProjectTasks = data.message2;
          this.proeject_members_array = JSON.parse(data.message[0].project_members);
          this.project_manager = data.message[0].project_manager;
          this.searchQueryProjectManager = data.message[0].project_manager;
        })
        .catch((err) => console.log(err.message));
    },

    // updateinfo

    setActive(id) {
      this.activeID = id;
    },

    markDoneProject() {
      this.p_id = this.$route.params.id;

      const data = new FormData();
      data.append("p_id", this.p_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateProjectMarkasDone`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          this.update = this.update + 1;
        })
        .catch((err) => console.log(err.message));
    },

    otherinfoupdate() {
      const data = new FormData();

      data.append("duration", this.projectData.duration);
      data.append("amount", this.projectData.amount);
      data.append("p_id", this.p_id);
      data.append("sdate", this.projectData.sdate);
      data.append("cdate", this.projectData.cdate);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateProjectOtherinfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            this.successMsg(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    memberinfoupdate() {
      this.p_id = this.$route.params.id;
      const data = new FormData();

      data.append("p_id", this.p_id);
      data.append("project_manager", this.project_manager);
      data.append("project_members", JSON.stringify(this.proeject_members_array));
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateProjectMemberinfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            console.log(res);
            this.successMsg(res.message);
            this.update = this.update + 1;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    markDoneTask() {
      const data = new FormData();

      data.append("id", this.activeID);

      fetch(`${process.env.VUE_APP_SERVER_URL}/updateProjectTaskasDone`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.update = this.update + 1;
        })
        .catch((err) => console.log(err.message));
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

    addItems(e) {
      e.preventDefault();

      if (
        this.p_id === "" ||
        this.task_name === "" ||
        this.task_description === "" ||
        this.task_credit <= 0 ||
        this.selectedOptionMember.username === "" ||
        this.sdate === "" ||
        this.pr_date === ""
      ) {
        return false;
      }

      const newObject = {
        p_id: this.p_id,
        task_name: this.task_name,
        task_des: this.task_description,
        task_credit: this.task_credit,
        // assignedMember: this.selectedOptionMember.username,
        sdate: this.sdate,
        date: this.pr_date,
      };

      const totalCredits = this.updateProjectTasks.reduce((sum, item) => sum + parseFloat(item.task_credit), 0);

      if (totalCredits + this.task_credit > 100) {
        alert("Task credit exceeded 100%");
        console.log(totalCredits);
        return;
      } else {
        this.updateProjectTasks = [...this.updateProjectTasks, newObject];
      }

      this.task_name = "";
      this.task_description = "";
      this.task_credit = 0;
      this.selectedOptionMember = "";
      this.sdate = "";
      this.pr_date = "";
    },

    updateTask() {
      if (this.updateProjectTasks.length == 0) {
        this.warningMsg("Task Item Required!!");
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
            console.log(this.updateProjectTasks);
            data.append("task_array", JSON.stringify(this.updateProjectTasks));

            fetch(`${process.env.VUE_APP_SERVER_URL}/addProjectTasks`, {
              method: "POST",
              body: data,
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                if (res.message === true) {
                  this.successMsg("Update Task Complete");
                  this.getProjectData();
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
              // this.errMsg("error delete");
              console.log(res.message);
            }, 1000);
          }
        });
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

    deleteTask(index) {
      this.updateProjectTasks.splice(index, 1);
    },
  },

  computed: {
    ...mapState(["orgInfo"]),
    filteredOptionsProjectManager() {
      if (!this.searchQueryProjectManager) {
        return this.MemberData;
      }
      const query = this.searchQueryProjectManager.toLowerCase();
      return this.MemberData.filter((Member) => Member.username.toLowerCase().includes(query));
    },

    filteredOptionsMember() {
      if (!this.searchQueryMember) {
        return this.MemberData;
      }
      const query = this.searchQueryMember.toLowerCase();
      return this.MemberData.filter((Member) => Member.username.toLowerCase().includes(query));
    },
    calculateTotalProgress() {
      return this.projectTasks
        .filter((item) => {
          return +item.status === 1;
        })
        .reduce((sum, item) => sum + +item.task_credit, 0);
    },

    ...mapState(["viewPrivilege"]),
    ...mapState(["createPrivilege"]),
    ...mapState(["editPrivilege"]),
    ...mapState(["userInfo"]),
  },

  watch: {
    "$route.params.id": function (newId) {
      this.p_id = newId;
      this.getProjectData();
    },
    projectTasks: {
      handler() {
        this.taskProgress = this.calculateTotalProgress;
      },
      deep: true,
    },

    update(newVal, oldVal) {
      this.getProjectData();
    },
  },

  mounted() {
    this.getMemberData();
    this.p_id = this.$route.params.id;
    this.getProjectData();
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>
<style scoped>
.bg-teambox {
  background-color: rgb(230, 243, 253);
}
</style>
