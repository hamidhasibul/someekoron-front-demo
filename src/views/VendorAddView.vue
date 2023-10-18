<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 px-2 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Add Vendor</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Kindly review the following information carefully before adding a <b>Vendor</b> into the software. <br />
              <span class="note-space"
                >Neglecting this step could potentially lead to delays or errors during the processing of your
                project.</span
              >
            </p>
          </div>
          <div class="p-3 ps-4">
            <div class="row w-75">
              <div class="col-lg-6 mb-2">
                <label for="vendorID" class="form-label text-muted fs-13 fw-bold"
                  >Vendor ID <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="vendorID"
                  v-model="vendorID"
                  name="vendorID"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="Ex. XXXXXXXX"
                />
              </div>
              <div class="col-lg-6"></div>
              <div class="col-lg-6 mb-2">
                <label for="vendorname" class="form-label text-muted fs-13 fw-bold"
                  >Vendor Name <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="resource_id"
                  v-model="vendorname"
                  name="vendorname"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="Ex. mPair Technologies Ltd."
                />
              </div>
              <div class="col-lg-6"></div>

              <div class="col-lg-6 mb-4">
                <label for="venAddress" class="form-label text-muted fs-13 fw-bold"
                  >Vendor Address <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="venAddress"
                  v-model="venAddress"
                  name="venAddress"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="Ex. Chattogram, Bangladesh"
                />
              </div>
            </div>

            <div class="col-lg-12">
              <div
                class="nav nav-tabs mb-2"
                id="nav-tab-project-quotation"
                role="tablist"
                style="text-align: center; border-bottom: 1px solid gainsboro"
              >
                <button
                  class="nav-link rounded-0 text-muted2 fs-14 active"
                  style="text-align: center"
                  id="nav-address-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-address"
                  type="button"
                  role="tab"
                  aria-controls="nav-address"
                  aria-selected="true"
                >
                  Billing Address
                </button>
                <button
                  class="nav-link rounded-0 text-muted2 fs-14"
                  style="text-align: center"
                  id="nav-contact-person-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact-person"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact-person"
                  aria-selected="false"
                >
                  Contact Person
                </button>
              </div>

              <div class="tab-content p-0 bg-white" id="nav-tabContent">
                <!-- <Address /> -->

                <div
                  class="tab-pane py-3 fade active show"
                  id="nav-address"
                  role="tabpanel"
                  aria-labelledby="nav-address-tab"
                >
                  <div class="row w-100 mb-0">
                    <div class="col-lg-6">
                      <div class="row">
                        <div class="col-lg-3 mb-2">
                          <label for="bill_country" class="form-label text-muted fs-13 fw-bold"
                            >Country/Region <span class="fs-15 text-danger">*</span></label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <select id="bill_country" v-model="bill_country" name="bill_country" class="form-control">
                            <option value="" Selected>Select Country</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, The Democratic Republic of The">
                              Congo, The Democratic Republic of The
                            </option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-bissau">Guinea-bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, Democratic People's Republic of">
                              Korea, Democratic People's Republic of
                            </option>
                            <option value="Korea, Republic of">Korea, Republic of</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, The Former Yugoslav Republic of">
                              Macedonia, The Former Yugoslav Republic of
                            </option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                            <option value="Moldova, Republic of">Moldova, Republic of</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and The South Sandwich Islands">
                              South Georgia and The South Sandwich Islands
                            </option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-leste">Timor-leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">
                              United States Minor Outlying Islands
                            </option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">Virgin Islands, British</option>
                            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                            <option value="Wallis and Futuna">Wallis and Futuna</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label for="bill_address" class="form-label text-muted fs-13 fw-bold"
                            >Address <span class="fs-15 text-danger">*</span></label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <textarea
                            id="bill_address"
                            v-model="bill_address"
                            rows="4"
                            class="form-control rounded-0 border-muted shadow-none"
                            placeholder="Type address here . . ."
                          ></textarea>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label for="bill_city" class="form-label text-muted fs-13 fw-bold"
                            >City <span class="fs-15 text-danger">*</span></label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="bill_city"
                            v-model="bill_city"
                            type="text"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="Ex. Chattogram"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label for="bill_zip" class="form-label text-muted fs-13 fw-bold"
                            >Zip Code <span class="fs-15 text-danger">*</span></label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="bill_zip"
                            v-model="bill_zip"
                            type="number"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="Ex. 4000"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label for="bill_phone" class="form-label text-muted fs-13 fw-bold"
                            >Phone <span class="fs-15 text-danger">*</span></label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="bill_phone"
                            v-model="bill_phone"
                            type="tel"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="XXXXXXXXXXX"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label for="bill_fax" class="form-label text-muted fs-13 fw-bold">Fax</label>
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="bill_fax"
                            v-model="bill_fax"
                            type="number"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="XXX-XXX-XXXXX"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <ContactPerson /> -->
                <div
                  class="tab-pane py-3 fade"
                  id="nav-contact-person"
                  role="tabpanel"
                  aria-labelledby="nav-contact-person-tab"
                >
                  <div class="col-lg-4 mb-2">
                    <label for="pocname" class="form-label text-muted fs-13 fw-bold"
                      >POC Name <span class="fs-15 text-danger">*</span></label
                    >
                    <input
                      id="pocname"
                      v-model="pocname"
                      name="pocname"
                      type="text"
                      class="form-control rounded-0 border-muted shadow-none inputa"
                    />
                  </div>
                  <div class="col-lg-4 mb-2">
                    <label for="poc_contact" class="form-label text-muted fs-13 fw-bold"
                      >POC Contact Number <span class="fs-15 text-danger">*</span></label
                    >
                    <input
                      id="poc_contact"
                      v-model="poc_contact"
                      name="poc_contact"
                      type="tel"
                      class="form-control rounded-0 border-muted shadow-none inputa"
                    />
                  </div>

                  <div class="col-lg-4 mb-2">
                    <label for="poc_email" class="form-label text-muted fs-13 fw-bold"
                      >POC Email <span class="fs-15 text-danger">*</span></label
                    >
                    <input
                      id="poc_email"
                      v-model="poc_email"
                      name="poc_email"
                      type="email"
                      class="form-control rounded-0 border-muted shadow-none inputa"
                    />
                  </div>
                  <!-- <div class="col-lg-4 mb-2">
                    <label
                      for="balance"
                      class="form-label text-muted fs-13 fw-bold"
                      >Opening Balance
                    </label>
                    <input
                      id="balance"
                      v-model="balance"
                      type="number"
                      class="form-control rounded-0 border-muted shadow-none inputa"
                    />
                  </div> -->
                </div>
              </div>
            </div>
            <hr />
            <button @click="submitForm" class="btn action-button w-25" :disabled="loading">
              <span v-if="loading">Loading...</span>
              <span v-else>Add Vendor</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import TopNav from "../components/TopNav.vue";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import { useToast } from "vue-toastification";
import { mapState } from "vuex";
import router from "@/router";

export default {
  name: "VendorAdd",
  components: { TopNav, SideBar, Footer },

  data() {
    return {
      vendorID: "",
      vendorname: "",
      venAddress: "",

      // POC
      pocname: "",
      poc_contact: "",
      poc_email: "",
      balance: 0,

      // bill address
      bill_country: "",
      bill_address: "",
      bill_city: "",
      bill_zip: "",
      bill_phone: "",
      bill_fax: "",

      // toast property
      loading: false,
      loadingTime: 1000,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    auth() {
      if (!this.createPrivilege.includes("vendorlist")) {
        this.$router.push("/dashboard");
      }
    },
    async fetchData() {
      const id = localStorage.getItem("userID");

      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    errMsg() {
      this.loading = false;

      this.toast.error("Something went wrong!!", {
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

    successMsg() {
      this.toast.success("Vendor Added!", {
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
      const phoneRegex = /\d{6,20}/;
      if (
        this.vendorID == "" ||
        this.vendorname == "" ||
        this.venAddress == "" ||
        this.pocname == "" ||
        !phoneRegex.test(this.poc_contact) ||
        this.poc_email == "" ||
        !phoneRegex.test(this.bill_phone)
      ) {
        this.toast.warning("Add All Required Information", {
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
        return false;
      }
      console.log("first");
      this.loading = true;

      e.preventDefault();

      const data = new FormData();

      data.append("v_id", this.vendorID);
      data.append("vname", this.vendorname);
      data.append("v_location", this.venAddress);
      data.append("poc_name", this.pocname);
      data.append("poc_contact", this.poc_contact);
      data.append("poc_email", this.poc_email);
      data.append("bcountry", this.bill_country);
      data.append("badd", this.bill_address);
      data.append("bcity", this.bill_city);
      data.append("bzip", this.bill_zip);
      data.append("bphone", this.bill_phone);
      data.append("bfax", this.bill_fax);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addVendor`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg();
              router.push(`/vendorview/${this.vendorID}`);

              this.vendorID = "";
              this.vendorname = "";
              this.venAddress = "";
              this.pocname = "";
              this.poc_contact = "";
              this.poc_email = "";
            }, this.loadingTime);
          } else {
            this.errMsg();
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    ...mapState(["createPrivilege"]),
    ...mapState(["userInfo"]),
  },

  async mounted() {
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>
