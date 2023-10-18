<template>
  
  <div class="container-fluid">
    <div class="row">
      
      <div class="sidebar-container-right py-4 px-5">
        <div class="row">
          <div class="col-md-10">
            <h4 class="text-dark mb-3">Edit Project</h4>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="project-summery-canvas bg-white shadowC">
              <div class="project-summery-content p-4">
                <div class="row mb-4 px-1">
                  <div class="col-md-10">
                    <p class="text-dark">
                      <b>Project ID : {{ project.id }}</b>
                    </p>
                  </div>
                  <div class="col-md-2">
                    <input type="date" class="form-control rounded-0" />
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Project Name</b>
                      </div>
                      <div class="col-md-8">
                        <input type="text" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="projectName" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Contract Number</b>
                      </div>
                      <div class="col-md-8">
                        <input type="text" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="contractName" disabled />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-2">
                        <b>Project Address</b>
                      </div>
                      <div class="col-md-10">
                        <textarea class="form-control rounded-0 border-secondary shadow-none" v-model="projectAddress"
                          disabled></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Duration</b>
                      </div>
                      <div class="col-md-8">
                        <input type="text" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="duration" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Award Amount</b>
                      </div>
                      <div class="col-md-8">
                        <input type="email" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="awardAmount" disabled />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Project Manager</b>
                      </div>
                      <div class="col-md-8">
                        <input type="text" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="projectManager" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6"></div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Owner Name</b>
                      </div>
                      <div class="col-md-8">
                        <input type="text" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="ownerName" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6"></div>
                </div>
                <div class="row my-3">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-2">
                        <b>Owner Address</b>
                      </div>
                      <div class="col-md-10">
                        <textarea class="form-control rounded-0 border-secondary shadow-none"
                          v-model="ownerAddress"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Owner Contact Name</b>
                      </div>
                      <div class="col-md-8">
                        <input type="text" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="ownerContactName" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Owner Contact Email</b>
                      </div>
                      <div class="col-md-8">
                        <input type="email" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="ownerContactEmail" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Owner Number</b>
                      </div>
                      <div class="col-md-8">
                        <input type="text" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="ownerContactName" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Bid Date</b>
                      </div>
                      <div class="col-md-8">
                        <input type="date" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="bidDate" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6"></div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Award Date</b>
                      </div>
                      <div class="col-md-8">
                        <input type="date" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="awardDate" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>NTP Date</b>
                      </div>
                      <div class="col-md-8">
                        <input type="date" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="ntpDate" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Start Date</b>
                      </div>
                      <div class="col-md-8">
                        <input type="date" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="startDate" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-4">
                        <b>Completion Date</b>
                      </div>
                      <div class="col-md-8">
                        <input type="date" class="form-control py-1 rounded-0 border-secondary shadow-none"
                          v-model="completionDate" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-6 offset-md-6">
                    <div class="row">
                      <div class="col-md-3 offset-md-5">
                        <button class="btn btn-secondary rounded-0 w-100">
                          Cancel
                        </button>
                      </div>
                      <div class="col-md-4">
                        <button class="btn action-button rounded-0 w-100">
                          Edit & Save
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
  name: 'ProjectEdit',
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      project: '',
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;

    fetch(`http://localhost:3000/projectList/${this.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.project = data;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>

<style></style>
