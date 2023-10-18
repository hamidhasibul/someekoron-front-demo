<template>
  <div
    class="tab-pane fade p-3"
    id="nav-project-budget"
    role="tabpanel"
    aria-labelledby="nav-project-budget-tab"
  >
    <div class="row">
      <p class="form-label text-muted fs-16 font-weight-400">Project Items</p>
    </div>

    <div class="container-fluid">
      <div
        class="row mb-0 fs-12 font-family border-top border-bottom"
        style="background-color: #f5f5f5"
      >
        <div
          class="col-lg-3 text-start border-0 border-end fs-12 text-muted font-weight-500 py-1 px-1"
        >
          Item Name
        </div>
        <div
          class="col-lg-4 text-start border-0 border-end fs-12 text-muted font-weight-500 py-1 px-1"
        >
          Item Description
        </div>
        <div
          class="col-lg-1 text-end border-0 border-end fs-12 text-muted font-weight-500 py-1 px-1"
        >
          Rate
        </div>
        <div
          class="col-lg-1 text-end border-0 border-end fs-12 text-muted font-weight-500 py-1 px-1"
        >
          Qty
        </div>
        <div
          class="col-lg-1 text-end border-0 border-end fs-12 text-muted font-weight-500 py-1 px-1"
        >
          Unit
        </div>

        <!-- <div
          class="col-lg-1 text-end border-0 border-end fs-12 text-muted font-weight-500 py-1 px-1"
        >
          Vat (%)
        </div> -->

        <div
          class="col-lg-1 text-end border-0 border-end fs-12 text-muted font-weight-500 py-1 px-1"
        >
          Amount
        </div>

        <div
          class="col-lg-1 text-center border-0 fs-13 text-muted font-weight-500 py-1 px-1"
        >
          Action
        </div>
      </div>

      <form v-on:submit="addItem">
        <div class="row">
          <div class="col-lg-3 px-1 border-end py-1">
            <input
              type="text"
              class="form-control rounded-0 border-0 shadow-none inputa px-1"
              id="item_name"
              placeholder="Type item name"
              v-model="item_name"
              aria-describedby=""
            />
          </div>

          <div class="col-lg-4 px-1 border-end py-1">
            <textarea
              type="text"
              class="form-control rounded-0 border-0 shadow-none px-1"
              id="item_desc"
              placeholder="Type description"
              row="2"
              v-model="item_desc"
              aria-describedby=""
            >
            </textarea>
          </div>

          <div class="col-lg-1 px-1 border-end py-1">
            <input
              type="number"
              class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
              id="item_rate"
              placeholder="1"
              v-model="item_rate"
              step="0.01"
              aria-describedby=""
              @input="calculatePrice"
            />
          </div>

          <div class="col-lg-1 px-1 border-end py-1">
            <input
              type="number"
              class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
              id="item_qty"
              placeholder="1"
              v-model="item_qty"
              aria-describedby=""
              @input="calculatePrice"
            />
          </div>

          <div class="col-lg-1 px-1 border-end py-1">
            <!-- <input
              type="number"
              class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
              id="item_unit"
              placeholder="1"
              v-model="item_unit"
            /> -->

            <select
              class="form-select text-start rounded-0 border-0 shadow-none inputa px-2"
              id="item_unit"
              v-model="item_unit"
            >
              <option value="Piece" selected>Piece</option>
              <option value="Dozen">Dozen</option>
              <option value="Litter">Litter</option>
              <option value="Kilogram">Kilogram</option>
              <option value="Pounds">Pounds</option>
              <option value="Ton">Ton</option>
              <option value="Meter">Meter</option>
              <option value="Feet">Feet</option>
              <option value="Set">Set</option>
              <option value="Packet">Packet</option>
            </select>
          </div>

          <!-- <div class="col-lg-1 border-end px-1 py-1">
            <input
              type="number"
              class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
              id="tax"
              placeholder="1"
              v-model="item_tax"
              aria-describedby=""
              @input="calculatePrice"
            />
          </div> -->

          <div class="col-lg-1 px-1 border-end py-1">
            <input
              type="text"
              class="form-control text-end rounded-0 border-0 shadow-none inputa px-1"
              id="price"
              placeholder="1"
              v-model="price"
              aria-describedby=""
              readonly
            />
          </div>

          <div class="col-lg-1 px-1 py-1">
            <button
              type="submit"
              class="w-100 border-0 text-white fs-13 rounded-1 shadow-none"
              style="
                background-color: #10b793;
                border-color: #10b793;
                height: 1.8rem;
              "
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="col-lg-12">
      <div class="bg-white border-0">
        <div class="container border-top">
          <div
            class="row mb-0 border-bottom fs-12 bg-light"
            v-for="(item, index) in item_array"
            :key="index"
          >
            <div class="col-lg-3 py-2 border-end text-start text-muted">
              {{ item.item }}
            </div>
            <div class="col-lg-4 py-2 border-end text-start text-muted">
              {{ item.des }}
            </div>
            <div class="col-lg-1 py-2 border-end text-end text-muted">
              {{ item.rate }}
            </div>
            <div class="col-lg-1 py-2 border-end text-end text-muted">
              {{ item.qty }}
            </div>

            <div class="col-lg-1 py-2 border-end text-end text-muted">
              {{ item.item_unit }}
            </div>

            <!-- <div class="col-lg-1 py-2 border-end text-end text-muted">
              {{ item.tax }}
            </div> -->
            <div class="col-lg-1 py-2 border-end text-end text-muted">
              {{ item.price }}
            </div>
            <div
              class="col-lg-1 py-2 text-center text-muted"
              @click="deleteTask(index)"
            >
              <i class="fa-regular fa-trash-can" style="cursor: pointer"></i>
            </div>
          </div>
        </div>

        <div class="bg-light mb-3">
          <div class="container">
            <div class="row pb-2">
              <div class="col-lg-7"></div>
              <div class="col-lg-2">
                <div class="fs-12 py-2 text-muted">
                  SUB TOTAL ({{ orgInfo.currency }})
                </div>
                <div class="fs-12 py-2 text-muted">VAT (+)</div>

                <div class="fs-12 py-2 text-muted">ADJUSTMENT (-)</div>
                <div class="fs-16 py-2 font-weight-700">
                  TOTAL ({{ orgInfo.currency }})
                </div>
              </div>
              <div class="col-lg-2 px-0">
                <div class="fs-12 py-2 px-2 text-end text-muted">
                  {{ subTotalPrice }}
                </div>

                <!-- <div class="fs-12 py-2 px-2 text-end text-muted">
                  {{ totalTax }}
                </div> -->
                <!-- <input type="number" class="form-control text-end rounded-0 border bg-light shadow-none inputa px-2 mb-1"
                  id="tdiscount" placeholder="0" v-model="t_discount" aria-describedby="" @input="calculatePrice" /> -->
                <div class="d-flex justify-content-between">
                  <input
                    type="number"
                    class="w-50 form-control text-end rounded-0 border bg-light shadow-none inputa px-2 mb-1"
                    id="adjustment"
                    v-model="vattax"
                    aria-describedby=""
                    @input="calculateTax"
                    step="0.01"
                  />
                  <div class="fs-12 py-2 px-2 text-end text-muted ms-2">
                    {{ (adjustedTotal - subTotalPrice).toFixed(2) }}
                  </div>
                </div>
                <input
                  type="number"
                  class="form-control text-end rounded-0 border bg-light shadow-none inputa px-2"
                  id="adjustment"
                  v-model="adjustment"
                  aria-describedby=""
                />
                <div class="fs-16 py-2 px-2 text-end font-weight-700">
                  {{ adjustedTotal.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 mt-4">
          <button @click="submitForm" class="border-0 w-100 action-button py-1">
            {{ isLoading ? "Processing . . ." : "Save & Next" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useToast } from "vue-toastification";
export default {
  name: "Projectdetails",

  props: ["changeState", "clientinfoData"],

  data() {
    return {
      serial: 0,
      item_array: [],
      item_name: "",
      item_desc: "",
      item_rate: 0,
      item_qty: 0,
      item_unit: "Piece",
      item_discount: 0,
      item_tax: 0,

      vattax: 0,
      vatAmount: 0,
      price: 0,
      discountAmount: 0,
      subtotal: 0,
      subTotalPriceNew: 0,
      vat: 0,
      total: 0,
      t_discount: 0,
      totalDiscount: 0,
      taxAmount: 0,
      adjustment: 0,
      totalTaxAmount: 0,
      itemConditions: [
        localStorage.getItem("q_id") === "",
        this.item_name === "",
        this.item_desc === "",
        this.item_rate,
        this.item_qty,
        this.item_discount,
        this.item_tax,
        this.price,
      ],

      isLoading: false,
    };
  },

  methods: {
    fetchData() {
      this.$store.dispatch("fetchUserInfo");
      this.$store.dispatch("fetchOrgInfo");
    },
    addItem(e) {
      e.preventDefault();

      if (
        localStorage.getItem("q_id") === "" ||
        this.item_name === "" ||
        this.item_desc === "" ||
        this.item_rate === "" ||
        this.item_qty === "" ||
        this.item_discount === "" ||
        this.price === ""
      ) {
        this.warningMsg("Please fillup all field");
        return false;
      }

      const newObject = {
        q_id: localStorage.getItem("q_id"),
        item: this.item_name,
        des: this.item_desc,
        rate: this.item_rate,
        qty: this.item_qty,
        item_unit: this.item_unit,
        discount: this.item_discount,
        discountAmount: this.discountAmount,
        tax: this.item_tax,
        taxAmount: (this.price * this.item_tax) / 100,
        price: this.price,
      };

      this.item_array = [...this.item_array, newObject];

      this.item_name = "";
      this.item_desc = "";
      this.item_rate = 0;
      this.item_qty = 0;
      this.item_unit = "Piece";
      this.item_discount = 0;
      this.item_tax = 0;
      this.price = 0;
    },

    successMsg(msg) {
      this.showToast(`${msg} Added!`, "success");
    },

    errMsg(error) {
      this.showToast(`Something went wrong!! ${error}`, "error");
    },

    warningMsg(msg) {
      this.showToast(msg, "warning");
    },

    showToast(message, type) {
      this.toast[type](message, {
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

    submitForm() {
      if (!this.clientinfoData) {
        this.warningMsg("Please fill up Client section!");

        return false;
      } else if (this.item_array.length == 0) {
        this.warningMsg("Please select items!");

        return false;
      }

      this.isLoading = true;
      const DLdata = new FormData();
      DLdata.append("q_id", localStorage.getItem("q_id"));
      fetch(`${process.env.VUE_APP_SERVER_URL}/deleteQuotationItem`, {
        method: "POST",
        body: DLdata,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            this.item_array.map((item) => {
              const data = new FormData();
              data.append("q_id", localStorage.getItem("q_id"));
              data.append("item", item.item);
              data.append("des", item.des);
              data.append("rate", item.rate);
              data.append("qty", item.qty);
              data.append("item_unit", item.item_unit);
              data.append("tax", item.tax);
              data.append("price", parseFloat(item.price));

              fetch(`${process.env.VUE_APP_SERVER_URL}/addQuotationItem`, {
                method: "POST",
                body: data,
              })
                .then((res) => res.json())
                .then((res) => {
                  if (res.message === true) {
                    setTimeout(() => {
                      this.isLoading = false;
                    }, 1000);

                    this.updateVatTax();

                    this.changeState();

                    document.getElementById("nav-terms-condition-tab").click();
                  } else {
                    setTimeout(() => {
                      this.isLoading = false;
                      this.errMsg(res.message);
                      console.log(res.message);
                    }, 1000);
                  }
                })
                .catch((error) => {
                  console.error(error);
                  this.isLoading = false;
                  this.errMsg(error);
                });
            });
          } else {
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg("error delete");
              console.log(res.message);
            }, 1000);
          }
        });

      this.successMsg("Quotation Items");
    },

    updateVatTax() {
      console.log(this.vatAmount);
      const data = new FormData();
      data.append("q_id", localStorage.getItem("q_id"));
      data.append("stotal_amount", this.subTotalPriceNew);
      data.append("vatandtax", this.vatAmount);
      data.append("vatpercent", this.vattax);
      data.append("adjustment", this.adjustment);
      data.append("discount", this.t_discount);
      data.append(
        "tamount",
        this.subTotalPriceNew +
          this.vatAmount -
          this.totalDiscount -
          this.adjustment
      );

      fetch(`${process.env.VUE_APP_SERVER_URL}/addQuotationVatTax`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.isLoading = false;
              this.successMsg("Quotation Amount Details");
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
    },

    deleteTask(index) {
      this.item_array.splice(index, 1);
    },

    calculateTax() {
      const taxper = parseFloat(this.vattax) || 0;

      const subTPrice = parseFloat(this.subTotalPrice) || 0;

      const vatAmount = subTPrice * (taxper / 100);

      this.vatAmount = +vatAmount.toFixed(2);
    },

    calculatePrice() {
      const qty = parseFloat(this.item_qty) || 0;
      const rate = parseFloat(this.item_rate) || 0;
      const discount = parseFloat(this.item_discount) || 0;
      const tdiscount = parseFloat(this.t_discount) || 0;

      const amount = qty * rate;
      const discountAmount = (+discount / 100) * +amount;

      this.discountAmount = discountAmount;

      this.price = amount - discountAmount;

      const totalDiscount =
        (tdiscount / 100) * (this.subTotalPrice + this.vatAmount);
      this.totalDiscount = totalDiscount;
    },
  },

  computed: {
    ...mapState(["orgInfo"]),

    subTotalPrice() {
      this.subTotalPriceNew = this.item_array.reduce(
        (total, item) => total + +item.price,
        0
      );
      return this.item_array.reduce((total, item) => total + +item.price, 0);
    },

    /* totalTax() {
      this.totalTaxAmount = this.item_array.reduce(
        (total, item) => total + +item.taxAmount,
        0
      );
      return this.item_array.reduce(
        (total, item) => total + +item.taxAmount,
        0
      );
    }, */

    adjustedTotal() {
      return (
        this.subTotalPriceNew +
        this.vatAmount -
        this.totalDiscount -
        this.adjustment
      );
    },

    ...mapState(["userInfo"]),
  },

  mounted() {
    this.fetchData();

    if (this.$route.query.editq_id) {
      this.quotation_id = localStorage.getItem("q_id");

      const data = new FormData();
      data.append("q_id", this.quotation_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getQuotationAllData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("as", data);
          this.item_array = data.message2;
        })
        .catch((err) => console.error(err.message));
    }
  },
  setup() {
    const toast = useToast();
    return { toast };
  },

  updated() {
    console.log(this.vatAmount);
  },
};
</script>

<style scoped></style>
