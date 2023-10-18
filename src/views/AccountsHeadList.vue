<template>
  

  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-7">
            <p class="mb-0 text-color fs-20">Accounts Head List</p>
          </div>

          <div class="col-lg-3">
            <div class="input-group rounded">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="col-lg-2">
            <button
              class="btn action-button w-100"
              data-bs-toggle="modal"
              data-bs-target="#addAccHeadModal"
            >
              Add Accounts Head
            </button>
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-lg-12 px-0">
            <table class="table">
              <thead>
                <tr class="thead-color border">
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600 ps-4"
                    width="15%"
                  >
                    SL#
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 text-muted font-weight-600"
                    width="20%"
                  >
                    Accounts Name
                  </th>
                  <th
                    scope="col"
                    class="border-0 fs-13 tesxt-start text-muted font-weight-600"
                    width="20%"
                  >
                    Accounts Type
                  </th>
                </tr>
              </thead>
              <tbody class="border-0">
                <tr
                  class="shadowItem"
                  v-for="(item, index) in accountHeads"
                  :key="item.id"
                >
                  <td class="border-0 fs-12 text-start ps-4">
                    {{ index + 1 }}
                  </td>
                  <td class="border-0 fs-12 fw-bold text-start" width="15%">
                    {{ item.account_name }}
                  </td>
                  <td class="border-0 fs-12 text-start">
                    {{ item.account_type }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Side Projects -->
        </div>
      </div>
      <Footer />
    </div>
  </div>

  <!-- Add Accounts Head Modal -->

  <div class="modal fade" tabindex="-1" id="addAccHeadModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-custom">
      <div class="modal-content modal-content-custom">
        <div class="modal-header">
          <h6 class="modal-title text-start" id="addAccHeadModalLabel">
            Add Accounts Head
          </h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row text-start">
            <div class="col-lg-12 mb-3">
              <p class="mb-0 fs-12">
                <span class="text-primary font-weight-600">*Note:</span>
                Please carefully read and check the following information before
                adding Accounts Head in the system. May result in delays or
                errors in processing your project.
              </p>
            </div>

            <div class="row text-start">
              <div class="col-lg-3 pe-0">
                <p class="mt-1 fs-14">Accounts Name</p>
              </div>
              <div class="col-lg-9">
                <input
                  type="text"
                  v-model="accName"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                />
              </div>
            </div>

            <div class="row text-start">
              <div class="col-lg-3 pe-0">
                <p class="mt-1 fs-14">Accounts Type</p>
              </div>
              <div class="col-lg-9">
                <select
                  class="form-select rounded-0 border-muted shadow-none inputa"
                  v-model="accType"
                >
                  <option selected value="">Select</option>
                  <option value="Assets">Assets</option>
                  <option value="Liabilities">Liabilities</option>
                  <option value="Equity">Equity</option>
                  <option value="Revenue">Revenue</option>
                  <option value="Expenses">Expenses</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="border-0 w-50 action-button fs-13 py-1"
            style="margin-top: 28px; height: 1.8rem"
            data-bs-dismiss="modal"
            @click="addAccountsHead"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/FooterView.vue";
export default {
  name: "Accounts Head List",
  components: { TopNav, Sidebar, Footer },
  data() {
    return {
      accName: "",
      accType: "",
      accCode: 0,
      update: 0,
      accountHeads: [],
    };
  },

  mounted() {
    this.getAccountsList();
  },

  methods: {
    async addAccountsHead() {
      const data = new FormData();

      data.append("account_name", this.accName);
      data.append("account_type", this.accType);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/addAccountHead`,
          { method: "POST", body: data }
        );

        const res = await response.json();

        if (res.message) {
          this.update = this.update + 1;
        }
      } catch (error) {
        console.error(error);
      }
    },

    getAccountsList() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getAccountHead`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.accountHeads = res.message;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  updated() {},

  watch: {
    update() {
      this.getAccountsList();
    },
  },
};
</script>

<style></style>
