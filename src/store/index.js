import { createStore } from "vuex";
import { router } from "@/router/index";
export default createStore({
  state: {
    count: 0,
    username: "",
    userInfo: [],
    orgInfo: [],
    userPrivilege: [],
    viewPrivilege: [],
    createPrivilege: [],
    editPrivilege: [],
    deletePrivilege: [],
  },
  getters: {
    /* isAuthenticated: () => {
      const token = localStorage.getItem("token");
      return !!token; // Convert to boolean
    }, */
  },
  mutations: {
    setUser: (state, user) => {
      state.userInfo = user;
    },
    clearUser: (state, user) => {
      state.userInfo = [];
    },
    setOrg: (state, org) => {
      state.orgInfo = org;
    },

    setPrivilege: (state, privilege) => {
      state.userPrivilege = privilege;
    },

    setViewPrivilege: (state, viewPrivilege) => {
      state.viewPrivilege = viewPrivilege;
    },

    setCreatePrivilege: (state, createPrivilege) => {
      state.createPrivilege = createPrivilege;
    },
    setEditPrivilege: (state, editPrivilege) => {
      state.editPrivilege = editPrivilege;
    },
    setDeletePrivilege: (state, deletePrivilege) => {
      state.deletePrivilege = deletePrivilege;
    },
  },
  actions: {
    logout: (context) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      context.commit("clearUser");
      router.push("/");
    },
    fetchUserInfo: async (context) => {
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
        console.log(res.message.length);
        if (res.message.length > 0) {
          context.commit("setUser", res.message[0]);
        } else {
          localStorage.removeItem("token");
          context.dispatch("logout");
          // this.$router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    },

    fetchOrgInfo: async (context) => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/getORGinfo`,
          {
            method: "POST",
          }
        );

        const res = await response.json();

        if (res.message.length > 0) {
          context.commit("setOrg", res.message[0]);
        }
      } catch (error) {
        console.error(error);
      }
    },

    fetchUserPrivilege: async (context, id) => {
      try {
        const data = new FormData();
        data.append("userID", id);
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/getUserPrivilege`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        if (res.message.length > 0) {
          context.commit("setPrivilege", res.message[0]);
          context.commit("setViewPrivilege", JSON.parse(res.message[0].Read));
          context.commit(
            "setCreatePrivilege",
            JSON.parse(res.message[0].Create)
          );
          context.commit("setEditPrivilege", JSON.parse(res.message[0].Update));
          context.commit(
            "setDeletePrivilege",
            JSON.parse(res.message[0].Delete)
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
