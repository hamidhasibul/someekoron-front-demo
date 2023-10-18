<template>
  <div
    class="tab-pane fade p-3"
    id="nav-preview"
    role="tabpanel"
    aria-labelledby="nav-preview"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6">
          <div class="fs-14 fw-bold pb-2" style="color: coral">
            Project Overview
          </div>

          <div class="card bg-light border-0 fs-12">
            <div class="card-body d-flex flex-column fs-13">
              <span> Project Name: </span>
              <span class="pt-2"> Organization Name: </span>
              <span class="py-2">Contact Person:</span>
              <span class="pb-2">Contact Email:</span>
              <span> Address: </span>
            </div>
          </div>

          <div class="pb-2">
            <div class="card bg-light border-0 mt-4" style="padding: none">
              <div class="card-body d-flex flex-column fs-13">
                <span class=""> Total Amount: </span>
                <span class="py-2"> Project Duration: </span>
                <span>Quotation Validity:</span>
              </div>
            </div>
          </div>

          <br />

          <!-- <div class="fs-13 mt-6" style="color: coral">Send Quotation</div>
          <p class="fs-12 text-muted">
            You can directly send this Quotation to project's contact person.
          </p>

          <div class="container">
            <div class="row">
              <div class="col-sm-8 px-0">
                <input
                  id="send_quote" v-model="send_quote"
                  type="text"
                  class="w-100 bg-light form-control shadow-none rounded-0"
                  style="height: 32px"

                />
              </div>

              <div class="col-lg-4 ps-2">
                <button @click="submitForm" class="border-0 w-100 action-button">Send</button>
              </div>
            </div>
          </div> -->
        </div>

        <div class="col-lg-6 p-2">
          <div class="border bg-light" style="height: 422px"></div>
        </div>

        <div class="col-lg-3 col-auto offset-9 px-0 pe-2 mt-4">
          <button
            @click="submitForm2"
            class="border-0 w-100 action-button py-1"
          >
            Save & Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preview",
  data() {
    return {
      send_quote: "",
    };
  },

  methods: {
    submitForm() {
      const data = new FormData();
      data.append("project_duration", this.project_dur);
      data.append("quotation_exp", this.quote_ex);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationAllData'`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // document.getElementById("nav-project-budget-tab").click()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm2() {},
  },
};
</script>

<style></style>
