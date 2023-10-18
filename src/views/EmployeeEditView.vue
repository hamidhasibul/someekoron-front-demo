<template>
  
  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right py-4 px-5">
        <div class="row">
          <div class="col-md-12">
            <h4 class="text-dark mb-3">Edit Employee</h4>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="project-summery-canvas bg-white shadowC">
              <div class="project-summery-content p-4">
                <div class="row px-5 mb-4">
                  <!-- AR section 1 -->
                  <div class="col-md-12">
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Employee ID</b></div>

                      <div class="col-md-10">
                        <input type="text" class="form-control rounded-0 border-secondary shadow-none"
                          v-model="employeeID" disabled />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Employee Name</b></div>

                      <div class="col-md-10">
                        <input type="text" class="form-control rounded-0 border-secondary shadow-none"
                          v-model="employeeName" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Address</b></div>

                      <div class="col-md-10">
                        <textarea name="" id="" class="form-control rounded-0 border-secondary shadow-none"
                          v-model="employeeAddress"></textarea>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Employee Phone</b></div>

                      <div class="col-md-10">
                        <input type="tel" class="form-control rounded-0 border-secondary shadow-none"
                          v-model="employeePhone" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Employee Fax</b></div>

                      <div class="col-md-10">
                        <input type="tel" class="form-control rounded-0 border-secondary shadow-none"
                          v-model="employeeFax" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Employee Email</b></div>

                      <div class="col-md-10">
                        <input type="email" class="form-control rounded-0 border-secondary shadow-none"
                          v-model="employeeEmail" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>SSN</b></div>

                      <div class="col-md-10">
                        <input type="text" class="form-control rounded-0 border-secondary shadow-none" v-model="ssn" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Union</b></div>

                      <div class="col-md-10">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="union" value="option1" />
                          <label class="form-check-label">Yes</label>
                        </div>
                        <div class="form-check form-check-inline ms-5">
                          <input class="form-check-input" type="radio" name="union" value="option2" />
                          <label class="form-check-label">No</label>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Prevaling Wage</b></div>

                      <div class="col-md-10">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="union" value="option1" />
                          <label class="form-check-label">Yes</label>
                        </div>
                        <div class="form-check form-check-inline ms-5">
                          <input class="form-check-input" type="radio" name="union" value="option2" />
                          <label class="form-check-label">No</label>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2"><b>Insert Document</b></div>

                      <div class="col-md-4">
                        <input type="file" class="form-control form-control-sm rounded-0 border-secondary shadow-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 offset-md-6">
                    <div class="row">
                      <div class="col-md-6 offset-md-5">
                        <button class="btn action-button rounded-0 w-100">
                          Save
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
  name: 'EmployeeEdit',
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      employee: [],
      employeeID: '',
      employeeName: '',
      employeeAddress: '',
      employeePhone: '',
      employeeFax: '',
      employeeEmail: '',
      ssn: '',
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;

    fetch(`http://localhost:3000/employeeList/${this.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.employee = data;
        this.employeeID = data.employeeID;
        this.employeeName = data.employeeName;
        this.employeeAddress = data.employeeAddress;
        this.employeePhone = data.employeePhone;
        this.employeeFax = data.employeeFax;
        this.employeeEmail = data.employeeEmail;
        this.ssn = data.ssn;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
<style></style>
