<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <div class="d-flex justify-content-center pt-5 mt-5 px-4">
          <div class="login-card align-items-center">
            <div class="card-body p-4 text-black py-5">
              <div class="d-flex align-items-center">
                <img
                  src="../assets/image/Someekoron.svg"
                  class="booklogo_login me-2"
                  alt=""
                  srcset=""
                />
              </div>
              <h5 class="font-weight-700 fw-56 mt-4">Welcome!</h5>
              <p class="my-4 mt-2 font-weight-400">Log In to Continue...</p>
              <form @submit.prevent="login">
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    v-model="phoneNumber"
                    class="form-control form-control-lg shadow-none rounded fs-s"
                    placeholder="Mobile Number"
                  />
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="password"
                    v-model="password"
                    class="form-control form-control-lg shadow-none rounded fs-s"
                    placeholder="Password"
                  />
                </div>
                <div class="pt-1 mb-4">
                  <button
                    type="submit"
                    class="text-white btn action-button btn-lg btn-block w-100 py-1 rounded-0 fw-bold"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-3">
          <small>Powered by</small>
          <img
          src="../assets//mpair_logo.png"
            class="mx-2"
            alt=""
            srcset=""
            style="height: 25px"
          />
        </div>
      </div>
      <div class="col-lg-6 logpart pt-4 text-center">
        <p class="px-5 mb-0 mt-5" style="font-size: 50px">
          Manage Your <br /><span style="font-weight: 700"
            >Project Accounts</span
          >
        </p>
        <p class="fs-4 mb-5">With Intelligent Features of Someekoron</p>
        <img
          src="../assets/image/logview.png"
          class="loginimg"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";
export default {
  name: "LoginView",
  data() {
    return {
      phoneNumber: "",
      password: "",
      loading: false,
      loadingTime: 2000,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    errMsg() {
      this.loading = false;

      this.toast.error("Wrong Account Information!", {
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

    login() {
      const data = new FormData();
      data.append("phone", this.phoneNumber);
      data.append("password", this.password);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UserLogin`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == true) {
            localStorage.setItem("token", data.token);
            console.log("this.$router.currentRoute.meta.requiresAuth");
            this.$router.push("/dashboard");
            localStorage.setItem("token", data.token);
            localStorage.setItem("userID", data.userID);
          } else {
            this.errMsg();
          }
        })
        .catch((error) => {
          console.error("Login request failed:", error);
        });
    },
  },

  computed: {
    isAuthenticated: async function () {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("token", token);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/getUsersByToken`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();
        console.log("asgs", res);
        if (res.message.length > 0) {
          this.$router.push("/dashboard");
          return true;
        } else {
          localStorage.removeItem("token");
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },

  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped></style>
