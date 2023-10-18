<template>
  <div class="row border-bottom px-2 align-items-center justify-content-between py-0">
    <div class="col-lg-4 d-flex">
      <input type="date" class="form-control rounded-0 fs-14 inputa" v-model="startDate" />
      <p class="m-0 mx-2">-</p>
      <input type="date" class="form-control rounded-0 fs-14 inputa" v-model="endDate" />
    </div>
    <div class="col-lg-1 border-start py-3 bg-light text-center">
      <p class="m-0 text-muted fs-12" @click="printView('printID')" style="cursor: pointer">
        <i class="fa-solid fa-print me-1"></i>Print
      </p>
    </div>
  </div>
  <div class="container my-3">
    <div class="row justify-content-center">
      <div class="col-lg-10 py-4 print_view" id="printID">
        <div class="view_hide">
          <p class="fs-18 mb-0 text-center">Voltec Engineering Ltd.</p>
          <p class="fs-14 text-center mb-0">Activity Log</p>
        </div>
        <p class="fs-12 ps-4" v-if="startDate">Filtered Date: {{ startDate }} - {{ endDate }}</p>
        <!-- <p class="fs-12 ps-4" v-else>
          Date: {{ formatDate(currentDate) }} (Alltime Data)
        </p> -->

        <div class="card border-0 px-3" v-for="(item, index) in filteredData" :key="index">
          <div class="p-2 mb-2">
            <b class="fs-13 text-muted fw-bold">{{ dateFormat(item.date) }}</b>
          </div>

          <div class="card-body p-0 mb-2" v-for="(activity, index) in item.data" :key="index">
            <div class="d-flex bd-highlight mb-3">
              <div class="ps-2 py-2 flex-fill activityt">
                <div class="bg-white">
                  <p class="mb-0 pb-0 fs-11 text-muted">
                    {{ timeFormat(activity.date) }}
                  </p>
                </div>
              </div>

              <div class="bd-highlight ps-2 flex-fill activityt2">
                <div class="cardelementA ps-2 bg-white">
                  <p class="mb-0 fw-bold text-muted fs-12">
                    {{ activity.type }}
                  </p>

                  <p class="mb-0 fs-10 text-muted">
                    {{ activity.des }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityLogReport",
  data() {
    return {
      activitylogdata: [],
      startDate: "",
      endDate: "",
      currentDate: new Date(),
    };
  },

  methods: {
    activity() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getactivityAllData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.activitylogdata = res.message;
          console.log(res.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },

    printView(divID) {
      const printSection = document.querySelector(".print_section");
      const targetDiv = document.getElementById(divID);

      if (printSection && targetDiv) {
        printSection.innerHTML = targetDiv.innerHTML;
      }
      window.print();
    },
    timeFormat(time) {
      const givenTime = new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return `${givenTime}`;
    },
    dateFormat(date) {
      const options = { day: "2-digit", month: "long", year: "numeric" };
      const givendate = new Date(date).toLocaleDateString("en-US", options);
      return `${givendate}`;
    },
  },

  computed: {
    filteredData() {
      const { startDate, endDate, activitylogdata } = this;

      return activitylogdata.filter(({ date }) => {
        return (startDate <= date && endDate >= date) || startDate === "";
      });
    },
  },

  mounted() {
    this.activity();
  },

  updated() {
    console.log(this.filteredData);
  },
};
</script>

<style></style>
