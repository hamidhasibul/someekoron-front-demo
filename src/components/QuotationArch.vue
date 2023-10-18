<template>
  <div class="col-lg-3">
    <div
      class="card shadow-sm text-center py-2 rounded-0 border-0"
      style="height: 600px"
    >
      <span
        class="px-2 pb-1 fs-16"
        style="text-align: start; border-bottom: 3px solid gainsboro"
      >
        Quotation Archive
      </span>

      <div class="container border-bottom" style="text-align: start">
        <b class="fs-12 pt-2 fw-bold">Dr. Appointment Web Application</b>
        <div class="d-flex justify-content-between">
          <p class="fs-11">Park View</p>
          <button
            class="border-0 w-20 btn-QA pb-1 px-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight1"
            aria-controls="offcanvasRight"
          >
            View
          </button>

          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight1"
            aria-labelledby="offcanvasRightLabel"
            style="width: 500px"
          >
            <div class="offcanvas-header border-bottom pb-1 py-2">
              <h6 id="offcanvasRightLabel">Quotation Summary</h6>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div class="offcanvas-body py-1 pt-2">
              <div class="fs-14 pb-2" style="color: coral">
                Project Overview
              </div>

              <div class="container">
                <div class="row card bg-light border-0 fs-12">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-column fs-12">
                        <span> Project Name: </span>
                        <span class="py-2">ORG Name:</span>
                        <span> Contact Person </span>
                      </div>

                      <div class="d-flex flex-column fs-12 pe-5 me-4">
                        <span> Total Amount: </span>
                        <span class="py-2">Project Duration:</span>
                        <span> Quotation Validity </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-2 px-0 py-0"></div>
                <div class="col-8 text-center py-3 px-0">
                  <input
                    type="text"
                    class="mt-2 rounded-0 border border-muted shadow-none quote-summary-box"
                  />
                </div>
                <div class="col-2 pe-3 py-3 px-0">
                  <button class="border-0 bg-white text-center pt-1">
                    <i class="fas fa-edit"></i>
                  </button>
                </div>
              </div>

              <div class="row py-2">
                <div class="col-2"></div>
                <div class="col-4 pe-1">
                  <button class="border-0 w-100 quote-summary-print">
                    Print
                  </button>
                </div>

                <div class="col-4 ps-2">
                  <button class="border-0 w-100 quote-summary-download">
                    Download
                  </button>
                </div>
                <div class="col-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid border-bottom" style="text-align: start">
        <b class="fs-12 pt-2 fw-bold">Dr. Appointment Web Application</b>
        <div class="d-flex justify-content-between">
          <p class="fs-11">Park View</p>
          <button class="border-0 w-20 btn-QA pb-1 px-2">View</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuotationArch",
};
</script>

<style></style>
