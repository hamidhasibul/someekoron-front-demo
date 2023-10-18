<template>
  <div>
    <div class="view-section">
      <TopNav v-if="!isLoginRoute" />
      <Sidebar v-if="!isLoginRoute" />
    </div>

    <router-view />
  </div>
</template>
<script>
import TopNav from "./components/TopNav.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    TopNav,
    Sidebar,
  },
  data() {
    return {
      isLoginRoute: false,
    };
  },
  watch: {
    $route(to, from) {
      this.isLoginRoute = to.path === "/" && to.name === "login";
    },
  },
};
</script>
<style></style>
