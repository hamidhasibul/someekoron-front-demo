<template>
  <nav class="navbar navbar-expand-lg navbar-white shadow-1 bg-light sticky-top position-fixed w-100 p-0">
    <div class="container-fluid" style="padding: 0">
      <div class="nav-start d-flex align-items-center logoitem">
        <div class="text-center nav-img">
          <router-link to="/dashboard" class="navbar-brand d-flex ms-3 my-0 align-items-center">
            <img src="../assets/image/Someekoron.svg" class="booklogo me-2" alt="" srcset="" />
          </router-link>
        </div>
        <div class="timeitem">
          <p class="mb-0 fw-bold text-white text-muted" style="font-size: 13px">
            {{ dayOfWeek }}
          </p>
          <p class="mb-0 text-muted" style="font-size: 12px">
            {{ currentDate }}
          </p>
        </div>
      </div>

      <div class="nav-right px-4 d-flex align-items-center">
        <div class="dropdown">
          <div
            class="rounded-pill text-white nav-create"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <p class="m-0 fs-14 px-3 py-1 font-weight-600">+ Create New</p>
          </div>
          <div class="dropdown-menu create-dropdown px-2" aria-labelledby="dropdownMenuButton">
            <router-link to="/customeradd" class="dropdown-item create-item fs-12 mb-2"> + Add Customer</router-link>

            <router-link to="/projectque" class="dropdown-item create-item fs-12 mb-2"> + Add Quote</router-link>
            <router-link to="/projectadd" class="dropdown-item create-item fs-12 mb-2"> + Add Project</router-link>
            <router-link to="/addResource" class="dropdown-item create-item fs-12 mb-2"> + Add Resource</router-link>
            <router-link to="/purchaseorderview" class="dropdown-item create-item fs-12 mb-2">
              + Add Purchase Order</router-link
            >
            <router-link to="/invoice" class="dropdown-item create-item fs-12 mb-2"> + Add Invoice</router-link>
            <router-link to="/accounts_receivable" class="dropdown-item create-item fs-12 mb-2">
              + Add Received Payment</router-link
            >
            <router-link to="/billview" class="dropdown-item create-item fs-12 mb-2"> + Add Received Bill</router-link>
            <router-link to="/makepayment" class="dropdown-item create-item fs-12 mb-2">
              + Add Make Payment</router-link
            >
            <router-link to="/expense" class="dropdown-item create-item fs-12 mb-2 border-0">
              + Add Expense</router-link
            >
          </div>
        </div>
        <div class="navright-item d-flex align-items-center px-2 ms-3">
          <h6 class="mx-3 mb-0 text-muted fw-bold">{{ name }}</h6>
          <router-link to="/usersettings" class="btn rounded-circle user-iconav px-2 border-0 shadow-none">
            <i class="fa-solid fa-gear"> </i
          ></router-link>

          <a href="#" class="btn rounded-circle ps-2 me-2 user-iconav border-0 shadow-none">
            <i class="fa-regular fa-bell"></i>
          </a>

          <div class="dropdown">
            <p
              class="user-nav m-0 text-end shadow-none"
              type="button"
              id="userdropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="mx-2 ms-0">{{ userInfo.username }}</span>
              <i class="fa-regular fa-user"></i>
            </p>
            <div class="dropdown-menu user-dropdown p-0" aria-labelledby="userdropdownMenuButton">
              <div class="container">
                <div class="row bg-light p-2">
                  <div class="col-lg-12 px-0 bg-white rounded">
                    <p class="p-2 mb-1 fs-14 font-weight-600">
                      {{ userInfo.username }}<br />
                      <span class="fs-10 font-weight-300">{{ userInfo.role }}</span>
                    </p>
                    <div class="bg-light p-1 px-2">
                      <p class="my-1 p-2 fs-12 text-muted border-bottom cursor-pointer">
                        <i class="fa-solid fa-circle-info me-2 text-warning"></i>Help
                      </p>
                      <p class="my-1 p-2 fs-12 text-muted border-bottom cursor-pointer">
                        <i class="fa-solid fa-shield me-2 text-primary"></i>Security & Privacy
                      </p>

                      <p class="my-1 p-2 pb-0 fs-12 text-muted cursor-pointer" @click="logout">
                        <i class="fa-solid fa-right-from-bracket me-2 text-danger"></i>Logout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <ChatBot /> -->
  </nav>
</template>

<script>
// import ChatBot from "../components/ChatBot.vue";
import { mapState } from "vuex";

export default {
  name: "TopNav",
  // components: { ChatBot },
  data() {
    return {
      dayOfWeek: "",
      currentDate: "",
      name: "",
      update: 0,
    };
  },

  computed: {
    ...mapState(["userInfo"]),
  },

  created() {},
  methods: {
    fetchData() {
      this.$store.dispatch("fetchUserInfo");
    },
    logout() {
      localStorage.removeItem("token");
      this.update = this.update + 1;
      this.$router.push("/");
    },

    updateClock() {
      const now = new Date();
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      this.dayOfWeek = daysOfWeek[now.getDay()];
      this.currentDate = now.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },

  mounted() {
    fetch(`${process.env.VUE_APP_SERVER_URL}/getORGinfo`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        this.name = res.message[0].org_name;
      })
      .catch((error) => {
        console.log(error);
      });

    this.fetchData();

    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  },

  updated() {},
};
</script>

<style></style>
