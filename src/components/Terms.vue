<template>
  <div class="tab-pane p-3 fade" id="nav-terms-condition" role="tabpanel" aria-labelledby="nav-terms-condition">
    <div class="row w-75">
      <div class="col-lg-6 mb-2">
        <label for="project_dur" class="form-label text-muted fs-13 fw-bold"
          >Project Duration<span class="fs-15 text-danger">*</span></label
        >
        <input
          id="project_dur"
          v-model="project_dur"
          type="text"
          placeholder="EX@ Three Months"
          class="form-control rounded-0 border-muted shadow-none inputa"
        />
      </div>

      <div class="col-lg-6 mb-2">
        <label for="quote_ex" class="form-label text-muted fs-13 fw-bold"
          >Quotation Expiry<span class="fs-15 text-danger">*</span></label
        >
        <input
          id="quote_ex"
          v-model="quote_ex"
          type="date"
          class="form-control rounded-0 border-muted shadow-none inputa"
        />
      </div>

      <form v-on:submit="submitForm">
        <div class="row font-family fs-13">
          <div class="col-lg-10 mb-2">
            <label for="terms" class="form-label text-muted fs-13 fw-bold"
              >Terms & Condition<span class="fs-15 text-danger">*</span></label
            >

            <div>
              <quill-editor ref="quillEditor" :options="editorOptions" />
            </div>

            <div></div>
          </div>

          <div class="col-lg-2">
            <button class="border-0 w-100 action-button fs-13 py-1" style="margin-top: 28px; height: 1.8rem">
              + Add
            </button>
          </div>
        </div>
      </form>

      <div class="col-lg-12 my-2 mt-0">
        <p class="fs-12 text-muted mb-2">
          <span class="text-primary font-weight-600">*Note:</span> Please carefully write and check the following terms
          and conditions before make the Quotation. By accessing <br />or submitting the Quotation, you agree to be
          bound by these Terms.
        </p>
        <div class="bg-light p-2 px-3 mt-3">
          <p class="fw-bold font-14 text-muted mb-1">Terms & Condition</p>
          <small class="text-muted2 fs-13 d-flex" v-if="terms">
            <span v-html="terms"></span>
            <br />
          </small>
        </div>
      </div>
    </div>

    <div class="col-lg-3 mt-3">
      <button @click="submitForm2" class="border-0 w-100 action-button py-1">
        {{ isLoading ? "Processing" : "Submit" }}
      </button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "Terms",
  props: ["projectDetailsData"],

  components: {
    QuillEditor,
  },

  data() {
    return {
      terms: "",
      terms_array: [],
      project_dur: "",
      quote_ex: "",
      isLoading: false,
      editorOptions: {
        modules: {
          // toolbar: ["bold", "italic", "underline"],
        },
        placeholder: "Write here following your company policy...",
        theme: "snow",
      },
    };
  },

  methods: {
    fetchData() {
      this.$store.dispatch("fetchUserInfo");
    },

    successMsg(msg) {
      this.toast.success(`${msg} Added!`, {
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

    errMsg(error) {
      this.toast.error(`Something went wrong!! ${error}`, {
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

    warningMsg(msg) {
      this.toast.warning(`${msg}`, {
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
    submitForm(e) {
      e.preventDefault();
      this.terms = this.$refs.quillEditor.getHTML();
      if (this.terms === "") {
        this.warningMsg("Please add terms!");
        return false;
      } else {
        this.successMsg("Terms");
      }
    },

    submitForm2() {
      if (!this.projectDetailsData) {
        this.warningMsg("Please fill up Project Details section!");

        return false;
      } else if (this.project_dur == "" || this.quote_ex == "") {
        this.warningMsg("Please fill up the required fields!");
        return false;
      }

      this.isLoading = true;

      const data = new FormData();
      data.append("q_id", localStorage.getItem("q_id"));
      data.append("project_duration", this.project_dur);
      data.append("quotation_exp", this.quote_ex);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addQuotationNext`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.isLoading = false;
              this.successMsg("Complete Quatation");
            }, 1000);
          } else {
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg(res.message);
            }, 1000);
          }
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.errMsg(error);
        });

      const data2 = new FormData();

      data2.append("q_id", localStorage.getItem("q_id"));
      data2.append("tandc", this.terms);
      fetch(`${process.env.VUE_APP_SERVER_URL}/addQuotationTandC`, {
        method: "POST",
        body: data2,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.isLoading = false;
              router.push(`/projectqueryview/${localStorage.getItem("q_id")}`);
              localStorage.removeItem("q_id");
            }, 1000);
          } else {
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg(res.message);
            }, 1000);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getquotationdata() {
      const data = new FormData();
      data.append("q_id", localStorage.getItem("q_id"));

      fetch("https://admin.voltecbd.com/voltec/getQuotationAllData", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  computed: {
    ...mapState(["userInfo"]),
  },

  mounted() {
    this.fetchData();
  },

  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>

<style></style>
