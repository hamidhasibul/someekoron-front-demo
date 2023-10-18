<template>
  
  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right py-4 px-5">
        <div class="row">
          <div class="col-md-10">
            <h4 class="text-dark mb-3">Accounts Receivable</h4>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="project-summery-canvas bg-white shadowC">
              <div class="project-summery-content p-4">
                <div class="row mb-4 px-1">
                  <div class="col-md-10">
                    <p class="text-dark">
                      <b>Accounts Receivable ID : {{ ar.arID }}</b>
                    </p>
                  </div>
                  <div class="col-md-2">
                    <input type="date" class="form-control rounded-0" />
                  </div>
                </div>
                <div class="row px-2 mb-4">
                  <!-- AR section 1 -->
                  <div class="col-md-12">
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Project Name</b></div>

                      <div class="col-md-4">
                        <select class="form-select form-select-sm rounded-0 border-secondary" v-model="projectName"
                          disabled>
                          <option selected>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div class="col-md-2"><b>Pay Requisition</b></div>

                      <div class="col-md-4">
                        <input type="text" class="form-control form-control-sm rounded-0 border-secondary"
                          v-model="payRequisition" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Add Item</b></div>

                      <div class="col-md-4">
                        <select class="form-select form-select-sm rounded-0 border-secondary" v-model="item">
                          <option selected>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div class="col-md-2"><b>Paid to</b></div>

                      <div class="col-md-4">
                        <select class="form-select form-select-sm rounded-0 border-secondary" v-model="paidTo" disabled>
                          <option selected>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-12">
                    <table class="table text-center align-middle mb-1">
                      <thead>
                        <tr class="thead-color border border-4 border-bottom border-white">
                          <th scope="col" class="border-0">Item Description</th>
                          <th scope="col" class="border-0">Quantity</th>
                          <th scope="col" class="border-0">Unit</th>
                          <th scope="col" class="border-0">Labor</th>
                          <th scope="col" class="border-0">Material</th>
                          <th scope="col" class="border-0">Equipment</th>
                          <th scope="col" class="border-0">Sub-Contractor</th>
                          <th scope="col" class="border-0">Rental</th>
                          <th scope="col" class="border-0">Others</th>
                          <th scope="col" class="border-0">Budget</th>
                        </tr>
                      </thead>
                      <tbody class="border-0">
                        <tr class="bg-light border border-4 border-bottom border-white">
                          <td class="border-0">Mobilization</td>
                          <td class="border-0">1</td>
                          <td class="border-0">LS</td>
                          <td class="border-0">$5000</td>
                          <td class="border-0">$6220</td>
                          <td class="border-0"></td>
                          <td class="border-0">$10000</td>
                          <td class="border-0"></td>
                          <td class="border-0"></td>
                          <td class="border-0">$66250</td>
                        </tr>
                        <tr class="bg-light border border-4 border-bottom border-white">
                          <td class="border-0">Project Manager</td>
                          <td class="border-0">1</td>
                          <td class="border-0">LS</td>
                          <td class="border-0">$84030</td>
                          <td class="border-0"></td>
                          <td class="border-0">$5000</td>
                          <td class="border-0"></td>
                          <td class="border-0"></td>
                          <td class="border-0">$3000</td>
                          <td class="border-0">$92030</td>
                        </tr>
                      </tbody>
                    </table>
                    <hr class="mt-0" />
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-1 offset-md-10">
                    <p><b>Total</b></p>
                  </div>
                  <div class="col-md-1 ps-0">
                    <p class="border border-dark">$158280</p>
                  </div>
                </div>
                <div class="row px-2 mb-4">
                  <div class="col-lg-12">
                    <label for="" class="form-label fw-bold"> Status : </label>
                    <span class="fw-normal ms-2">{{ ar.status }}</span>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 offset-md-6">
                    <div class="row">
                      <div class="col-md-3 offset-md-5">
                        <button class="btn btn-secondary rounded-0 w-100">
                          Cancel
                        </button>
                      </div>
                      <div class="col-md-4">
                        <button class="btn action-button rounded-0 w-100">
                          Make & Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import TopNav from '../components/TopNav.vue';
import SideBar from '../components/Sidebar.vue';
import Footer from '../components/FooterView.vue';
export default {
  name: 'ArEdit',
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      ar: [],
      terms: [],
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;

    fetch(`http://localhost:3000/arList/${this.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.ar = data;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
<style></style>
