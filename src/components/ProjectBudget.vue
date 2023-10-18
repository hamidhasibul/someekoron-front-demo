<template>
  <div class="container">
    <div class="row px-2">
      <div class="col-lg-12">
        <div class="d-flex">
          <p class="mb-0 font-18 font-weight-600">Budget Item</p>
          <span
            @click="toggleIsEdit"
            class="mx-2 font-10"
            style="cursor: pointer"
          >
            <small class="fs-12 text-primary text-decoration-underline"
              ><i class="fa-solid fa-pen"></i> Edit</small
            >
          </span>
        </div>

        <div v-if="!isEdit" class="row">
          <div class="col-lg-12 px-0 mt-2">
            <div class="">
              <div v-if="budget_record && budget_record.length === 0">
                <div colspan="100%" class="border-0">
                  <div class="row justify-content-center my-5">
                    <img
                      class="col-12 img-fluid"
                      src="../assets/image/noData.png"
                      alt="No Project"
                      style="width: 140px; opacity: 1"
                    />
                    <p class="col-12 fs-14 text-center my-3 text-muted">
                      There is no budget record data available!<br />
                    </p>
                  </div>
                </div>
              </div>
              <div v-else class="container">
                <div
                  class="d-flex py-1 pb-2 fs-12 font-family thead-color font-weight-600"
                >
                  <div class="w-5 text-start px-2">SL</div>
                  <div class="w-25 text-start px-2">Budget Particular</div>
                  <div class="w-55 text-start px-2">Description</div>
                  <div class="w-15 text-end px-2">Estimated Cost</div>
                </div>

                <div
                  class="d-flex mb-0 border-bottom fs-12"
                  v-for="(item, index) in budget_record"
                  :key="index"
                >
                  <div class="w-5 py-2 border-end text-start text-muted px-2">
                    {{ index + 1 }}
                  </div>
                  <div class="w-25 py-2 border-end text-start text-muted px-2">
                    {{ item.budget_particular }}
                  </div>
                  <div class="w-55 py-2 border-end text-start text-muted px-2">
                    {{ item.description }}
                  </div>

                  <div class="w-15 py-2 text-end text-muted px-2">
                    {{ item.estimated_cost }}
                  </div>
                </div>

                <div class="row pb-2">
                  <div class="col-lg-6"></div>
                  <div class="col-lg-3">
                    <div class="fs-14 py-2 font-weight-700 text-end">
                      TOTAL Estimated Cost ({{ orgInfo.currency }})
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div
                      class="fs-14 py-2 px-2 text-end text-muted fw-bold px-2"
                    >
                      {{ totalEstimatedCost }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="container mt-2">
            <div
              class="row mb-0 fs-12 font-family border-top border-bottom"
              style="background-color: #f5f5f5"
            >
              <div
                class="col-lg-1 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1 ps-2"
              >
                SL
              </div>
              <div
                class="col-lg-3 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1"
              >
                Budget Particular<span class="fs-15 text-danger">*</span>
              </div>
              <div
                class="col-lg-5 text-start border-0 fs-12 text-muted font-weight-500 py-1 px-1"
              >
                Description<span class="fs-15 text-danger">*</span>
              </div>
              <div
                class="col-lg-2 text-end border-0 fs-12 text-muted font-weight-500 py-1 px-1"
              >
                Estimated Cost<span class="fs-15 text-danger">*</span>
              </div>
              <div
                class="col-lg-1 text-center border-0 fs-12 text-muted font-weight-500 py-1 px-1"
              >
                Action
              </div>
            </div>

            <div
              class="row mb-0 border-bottom fs-12"
              v-for="(item, index) in budget_record"
              :key="index"
            >
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

              <div
                class="col-lg-1 py-2 text-center text-muted"
                @click="deleteBudgetItem(index)"
              >
                <i
                  class="fa-regular fa-trash-can py-1"
                  style="cursor: pointer"
                ></i>
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
                <div class="fs-14 py-2 font-weight-700 text-end">
                  TOTAL Estimated Cost ({{ orgInfo.currency }})
                </div>
              </div>
              <div class="col-lg-2 px-0">
                <div class="fs-12 py-2 px-3 text-end text-muted">
                  {{ totalEstimatedCost }}
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-2 col-auto offset-10 mt-4">
            <button
              @click="submitProjectBudget"
              class="border-0 w-100 action-button py-1"
            >
              {{ isLoading ? "Processing . . ." : "Update" }}
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="col-lg-4 mt-4">
        <div class="bg-light rounded p-3">
          <div class="d-flex bg-white border rounded">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Project Budget</p>
            <p class="fs-14 m-0 p-2">{{ totalBudget }} {{ orgInfo.currency }}</p>
          </div>

          <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Total Outgoing</p>
            <p class="fs-14 m-0 p-2">{{ totalDebit }} {{ orgInfo.currency }}</p>
          </div>
          <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Total Incomming</p>
            <p class="fs-14 m-0 p-2">{{ totalCredit }} {{ orgInfo.currency }}</p>
          </div>
          <div class="d-flex my-2 dashed-border">
            <p class="fw-bold p-2 fs-14 m-0 w-50 border-end">Net Profit</p>
            <p class="fs-14 m-0 p-2">{{ totalCredit - totalDebit }} {{ orgInfo.currency }}</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "ProjectBudget",
  data() {
    return {
      p_id: "",
      isEdit: false,
      budget_record: [],
    };
  },

  methods: {
    toggleIsEdit() {
      this.isEdit = !this.isEdit;
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
    addbudgetItem() {
      this.p_id = this.$route.params.id;
      this.budget_record.push({
        p_id: this.p_id,
        budget_particular: "",
        description: "",
        estimated_cost: 0,
      });
    },
    deleteBudgetItem(index) {
      this.budget_record.splice(index, 1);
    },

    submitProjectBudget() {
      this.toggleIsEdit();
      if (this.budget_record.length == 0) {
        this.warningMsg("Project Budget Required!!");

        return false;
      }
      this.p_id = this.$route.params.id;
      this.isLoading = true;
      const DLdata = new FormData();

      DLdata.append("p_id", this.p_id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteProjectBudget`, {
        method: "POST",
        body: DLdata,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            const data = new FormData();
            console.log("check ", this.budget_record);
            data.append(
              "budget_item_array",
              JSON.stringify(this.budget_record)
            );

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
                    this.successMsg("Project Budget Updated Successfully!");
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
    formatDate(date) {
      const formatedDate = new Date(date);
      const day = formatedDate.getDate(); // Get the day of the month
      const month = formatedDate.getMonth() + 1; // Month is zero-based, so add 1
      const year = formatedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async getProjectBudget() {
      this.p_id = this.$route.params.id;

      const data = new FormData();
      data.append("p_id", this.p_id);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/getProjectAllData`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();
        this.budget_record = res.message3;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchOrgInfo");

    this.getProjectBudget();
  },

  computed: {
    ...mapState(["orgInfo"]),
    totalEstimatedCost() {
      return this.budget_record?.reduce(
        (total, item) => total + +item.estimated_cost,
        0
      );
    },
  },

  updated() {},
  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>
