<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-5 border-end p-0">
        <div class="p-3">
          <div class="d-flex justify-content-between">
            <div>
              <p class="fs-16 font-weight-600 mb-1">{{ vendor.vname }}</p>
            </div>
            <div class="">
              <p class="mb-0 px-0" style="color: rgb(116, 116, 116)">
                <i
                  class="fa-solid fa-pen-to-square"
                  :data-bs-toggle="'modal'"
                  :data-bs-target="'#vendorUpdate'"
                  style="cursor: pointer"
                ></i>
              </p>

              <!-- modal edit -->
              <div
                class="modal fade"
                :id="'vendorUpdate'"
                tabindex="-1"
                :aria-labelledby="'vendorUpdatelabel_'"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-custom modal-xl">
                  <div class="modal-content modal-content-custom">
                    <div class="modal-header">
                      <h6
                        class="modal-title text-start"
                        id="staticBackdropLabel"
                      >
                        Vendor Edit
                      </h6>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-lg-12 mb-3 ps-4 text-start">
                          <p class="mb-0 fs-12">
                            <span class="text-primary font-weight-600"
                              >*Note:</span
                            >
                            Please carefully read and check the following
                            information before updating stock in the system. May
                            result in delays or errors in processing your
                            project.
                          </p>
                        </div>

                        <div class="col-lg-6">
                          <div class="row text-start">
                            <div class="col-lg-1"></div>
                            <div class="col-lg-3 pe-0">
                              <p class="mt-1 fs-14">Vendor ID</p>
                            </div>
                            <div class="col-lg-6">
                              <p
                                class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                              >
                                {{ eVendor.v_id }}
                              </p>
                            </div>
                            <div class="col-lg-2"></div>

                            <div class="col-lg-1"></div>
                            <div class="col-lg-3 pe-0">
                              <p class="mt-1 fs-14">Vendor Name</p>
                            </div>
                            <div class="col-lg-6">
                              <p
                                class="form-control rounded-0 border-muted shadow-none inputa bg-muted"
                              >
                                {{ eVendor.vname }}
                              </p>
                            </div>
                            <div class="col-lg-2"></div>

                            <div class="col-lg-1"></div>
                            <div class="col-lg-3 pe-0">
                              <p class="mt-1 fs-14">Vendor Location</p>
                            </div>
                            <div class="col-lg-6">
                              <input
                                id="up_date"
                                v-model="eVendor.v_location"
                                type="text"
                                class="form-control rounded-0 border-muted shadow-none inputa"
                              />
                            </div>
                            <div class="col-lg-2"></div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="row text-start">
                            <div class="col-lg-3 pe-0">
                              <p class="mt-1 fs-14">POC</p>
                            </div>
                            <div class="col-lg-6">
                              <input
                                id="up_date"
                                v-model="eVendor.poc_name"
                                type="text"
                                class="form-control rounded-0 border-muted shadow-none inputa"
                              />
                            </div>
                            <div class="col-lg-3"></div>

                            <div class="col-lg-3 pe-0">
                              <p class="mt-1 fs-14">POC Contact</p>
                            </div>
                            <div class="col-lg-6">
                              <input
                                id="up_date"
                                v-model="eVendor.poc_contact"
                                type="text"
                                class="form-control rounded-0 border-muted shadow-none inputa"
                              />
                            </div>
                            <div class="col-lg-3"></div>

                            <div class="col-lg-3 pe-0">
                              <p class="mt-1 fs-14">POC Email</p>
                            </div>
                            <div class="col-lg-6">
                              <input
                                id="stock"
                                v-model="eVendor.poc_email"
                                type="text"
                                class="form-control rounded-0 border-muted shadow-none inputa"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn close-button"
                        data-bs-dismiss="modal"
                      >
                        <i class="fa-regular fa-circle-xmark me-1"></i>
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn action-button"
                        data-bs-dismiss="modal"
                        @click="
                          updateVendor(
                            eVendor.id,
                            eVendor.v_id,
                            eVendor.v_location,
                            eVendor.poc_name,
                            eVendor.poc_contact,
                            eVendor.poc_email
                          )
                        "
                      >
                        {{ isLoading ? "Loading" : "Save changes" }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="fs-12 mb-0">
            <i class="fa-solid fa-location-dot me-1"></i>{{ vendor.v_location }}
          </p>
        </div>
        <div class="bg-light p-3 py-2">
          <p class="mb-1 fs-13">Person of Contact</p>
          <p class="fs-12 font-weight-600 mb-0">{{ vendor.poc_name }}</p>
          <p class="fs-12 mb-0">
            <i class="fa-solid fa-mobile-screen me-1"></i
            >{{ vendor.poc_contact }}
          </p>
          <p class="fs-12 mb-0">
            <i class="fa-solid fa-envelope me-1"></i>{{ vendor.poc_email }}
          </p>
        </div>

        <div class="pb-2">
          <p
            class="mb-0 py-1 px-3 fs-13 border-top border-bottom font-weight-600"
          >
            Address
            <span
              class="mx-2"
              data-bs-toggle="modal"
              data-bs-target="#otherInfoModal"
              style="cursor: pointer"
            >
              <small class="font-10 text-primary text-decoration-underline"
                ><i class="fa-solid fa-pen me-1"></i> Edit</small
              >
            </span>
          </p>

          <div class="px-3">
            <div class="mt-2 d-flex">
              <p class="mb-1 fs-13">Billing Address</p>
            </div>
            <div class="mt-2 pb-2">
              <p class="fs-12 mb-0">
                {{ vendor.badd }}
              </p>
              <p class="fs-12 mb-0">{{ vendor.bcity }} - {{ vendor.bzip }},</p>
              <p class="fs-12 mb-0">
                {{ vendor.bcountry }}
              </p>
              <p class="fs-12 mb-0">Mobile: {{ vendor.bphone }}</p>
              <p class="fs-12 mb-0">Fax: {{ vendor.bfax }}</p>
            </div>
          </div>
          <p
            class="mb-0 py-1 px-3 fs-13 border-top border-bottom font-weight-600"
          >
            Other Info
          </p>

          <div class="px-3 py-2">
            <p class="fs-12 mb-0">Vendor ID:{{ vendor.v_id }}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <div class="d-flex border-bottom">
          <div class="p-3">
            <p class="fs-18 font-weight-600 mb-0">
              <!-- {{ (otherInfo && otherInfo.inv) || 0 }} -->

              {{ invoice === "" ? 0 : invoice }}
            </p>
            <p class="fs-13 mb-0 text-muted">Pending Bill</p>
          </div>

          <div class="p-3">
            <p class="fs-18 font-weight-600 mb-0">
              <!-- {{ (otherInfo && otherInfo.due) || 0 }} {{ orgInfo.currency }} -->
              {{ dueInvoice === "" ? 0 : dueInvoice }} {{ orgInfo.currency }}
            </p>
            <p class="fs-13 mb-0 text-muted">Bill Amount</p>
          </div>
        </div>

        <div class="py-3">
          <p class="fs-16 font-weight-600 mb-0">Received Payment</p>
          <p class="fs-11 text-muted w-75">
            This chart displays the received payments across different invoices,
            providing a visual representation of your payment history and
            transaction progress.
          </p>
          <div class="mb-0 text-muted fs-6" style="height: 270px">
            <canvas id="myChart" class=""></canvas>
          </div>
        </div>
      </div>
      <!-- Edit Modal -->

      <div
        class="modal fade"
        id="otherInfoModal"
        tabindex="-1"
        aria-labelledby="otherInfoModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-custom">
          <div class="modal-content modal-content-custom">
            <div class="d-flex align-items-center p-2 py-3 border-bottom">
              <img
                src="../assets/image/updated.png"
                class="update-icon me-2"
                alt=""
                srcset=""
              />
              <p class="fs-16 m-0 font-weight-600" id="otherInfoModalLabel">
                Update Vendor Address
              </p>
            </div>
            <div class="modal-body">
              <div class="row w-100 mb-0">
                <div class="col-lg-12">
                  <!-- ANCHOR Billing -->
                  <div class="row">
                    <div class="col-lg-12 fs-14 mb-2">
                      <p class="font-14 font-weight-600 text-muted">
                        Billing Address
                      </p>
                    </div>

                    <div class="col-lg-3 mb-2">
                      <label
                        for="bill_city"
                        class="form-label text-muted fs-13 fw-bold"
                        >Country</label
                      >
                    </div>
                    <div class="col-lg-9 mb-2">
                      <select
                        id="bill_country"
                        v-model="vendor.bcountry"
                        name="bill_country"
                        class="form-control"
                      >
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
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
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
                        <option value="Bosnia and Herzegovina">
                          Bosnia and Herzegovina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">
                          British Indian Ocean Territory
                        </option>
                        <option value="Brunei Darussalam">
                          Brunei Darussalam
                        </option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos (Keeling) Islands">
                          Cocos (Keeling) Islands
                        </option>
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
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands (Malvinas)">
                          Falkland Islands (Malvinas)
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Territories">
                          French Southern Territories
                        </option>
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
                        <option value="Heard Island and Mcdonald Islands">
                          Heard Island and Mcdonald Islands
                        </option>
                        <option value="Holy See (Vatican City State)">
                          Holy See (Vatican City State)
                        </option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran, Islamic Republic of">
                          Iran, Islamic Republic of
                        </option>
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
                        <option value="Korea, Republic of">
                          Korea, Republic of
                        </option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao People's Democratic Republic">
                          Lao People's Democratic Republic
                        </option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">
                          Libyan Arab Jamahiriya
                        </option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macao">Macao</option>
                        <option
                          value="Macedonia, The Former Yugoslav Republic of"
                        >
                          Macedonia, The Former Yugoslav Republic of
                        </option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia, Federated States of">
                          Micronesia, Federated States of
                        </option>
                        <option value="Moldova, Republic of">
                          Moldova, Republic of
                        </option>
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
                        <option value="Netherlands Antilles">
                          Netherlands Antilles
                        </option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestinian Territory, Occupied">
                          Palestinian Territory, Occupied
                        </option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
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
                        <option value="Russian Federation">
                          Russian Federation
                        </option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Helena">Saint Helena</option>
                        <option value="Saint Kitts and Nevis">
                          Saint Kitts and Nevis
                        </option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Pierre and Miquelon">
                          Saint Pierre and Miquelon
                        </option>
                        <option value="Saint Vincent and The Grenadines">
                          Saint Vincent and The Grenadines
                        </option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">
                          Sao Tome and Principe
                        </option>
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
                        <option
                          value="South Georgia and The South Sandwich Islands"
                        >
                          South Georgia and The South Sandwich Islands
                        </option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard and Jan Mayen">
                          Svalbard and Jan Mayen
                        </option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syrian Arab Republic">
                          Syrian Arab Republic
                        </option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania, United Republic of">
                          Tanzania, United Republic of
                        </option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-leste">Timor-leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">
                          Trinidad and Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos Islands">
                          Turks and Caicos Islands
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
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
                        <option value="Virgin Islands, British">
                          Virgin Islands, British
                        </option>
                        <option value="Virgin Islands, U.S.">
                          Virgin Islands, U.S.
                        </option>
                        <option value="Wallis and Futuna">
                          Wallis and Futuna
                        </option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </div>

                    <div class="col-lg-3 mb-2">
                      <label
                        for="bill_address"
                        class="form-label text-muted fs-13 fw-bold"
                        >Address</label
                      >
                    </div>
                    <div class="col-lg-9 mb-2">
                      <textarea
                        id="bill_address"
                        v-model="vendor.badd"
                        rows="4"
                        class="form-control rounded-0 border-muted shadow-none"
                      ></textarea>
                    </div>

                    <div class="col-lg-3 mb-2">
                      <label
                        for="bill_city"
                        class="form-label text-muted fs-13 fw-bold"
                        >City</label
                      >
                    </div>
                    <div class="col-lg-9 mb-2">
                      <input
                        id="bill_city"
                        v-model="vendor.bcity"
                        type="text"
                        class="form-control rounded-0 border-muted shadow-none inputa"
                      />
                    </div>

                    <div class="col-lg-3 mb-2">
                      <label
                        for="bill_zip"
                        class="form-label text-muted fs-13 fw-bold"
                        >Zip Code</label
                      >
                    </div>
                    <div class="col-lg-9 mb-2">
                      <input
                        id="bill_zip"
                        v-model="vendor.bzip"
                        class="form-control rounded-0 border-muted shadow-none inputa"
                      />
                    </div>

                    <div class="col-lg-3 mb-2">
                      <label
                        for="bill_phone"
                        class="form-label text-muted fs-13 fw-bold"
                        >Phone</label
                      >
                    </div>
                    <div class="col-lg-9 mb-2">
                      <input
                        id="bill_phone"
                        v-model="vendor.bphone"
                        type="tel"
                        class="form-control rounded-0 border-muted shadow-none inputa"
                      />
                    </div>

                    <div class="col-lg-3 mb-2">
                      <label
                        for="bill_fax"
                        class="form-label text-muted fs-13 fw-bold"
                        >Fax</label
                      >
                    </div>
                    <div class="col-lg-9 mb-2">
                      <input
                        id="bill_fax"
                        v-model="vendor.bfax"
                        type="text"
                        class="form-control rounded-0 border-muted shadow-none inputa"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer py-2">
              <button
                type="button"
                class="btn close-button"
                data-bs-dismiss="modal"
              >
                <i class="fa-regular fa-circle-xmark me-1"></i>
                Close
              </button>
              <button
                type="button"
                class="btn action-button"
                data-bs-dismiss="modal"
                @click="updateAddressData"
              >
                {{ isLoading ? "Loading" : "Update changes" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "VendorView",

  data() {
    return {
      vendor: [],
      eVendor: [],
      isLoading: false,
      update: 0,
      transactionReport: [],
      invoice: 0,
      dueInvoice: 0,
    };
  },

  methods: {
    fetchData() {
      this.$store.dispatch("fetchUserInfo");
    },

    // modal

    updateVendor(id, v_id, v_location, poc_name, poc_contact, poc_email) {
      if (
        v_id == "" ||
        id == "" ||
        v_location == "" ||
        poc_name == "" ||
        poc_contact == "" ||
        poc_email == ""
      ) {
        this.warningMsg("Add All Required Information");
        return false;
      }

      this.isLoading = true;
      const data = new FormData();

      data.append("id", id);
      data.append("v_id", v_id);
      data.append("v_location", v_location);
      data.append("poc_name", poc_name);
      data.append("poc_contact", poc_contact);
      data.append("poc_email", poc_email);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UpdateVendorInfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          if (res.message === true) {
            setTimeout(() => {
              this.isLoading = false;
              this.successMsg("Vendor Info ");
              this.getVendorData();

              this.update = this.update + 1;
            }, 1000);
          } else {
            this.errMsg();
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.isLoading = false;
        });
    },

    successMsg(msg) {
      this.toast.success(`${msg} Updated!`, {
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

    otherData() {
      this.c_id = this.$route.params.id;

      const data = new FormData();
      data.append("c_id", this.c_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerDatainduData`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.otherInfo = data.message[0];
        })
        .catch((err) => console.log(err.message));
    },

    updateAddressData() {
      this.isLoading = true;
      this.v_id = this.$route.params.id;

      console.log("s", this.v_id);
      const data = new FormData();

      data.append("v_id", this.v_id);

      data.append("bcountry", this.vendor.bcountry);
      data.append("badd", this.vendor.badd);
      data.append("bcity", this.vendor.bcity);
      data.append("bzip", this.vendor.bzip);
      data.append("bphone", this.vendor.bphone);
      data.append("bfax", this.vendor.bfax);

      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/UpdateVendorBillInfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          this.update = this.update + 1;

          if (data.message === true) {
            setTimeout(() => {
              this.successMsg("Success!!");
              this.isLoading = false;
            }, 1000);
          } else {
            this.isLoading = false;
            this.errMsg(data.message);
          }
        })
        .catch((err) => console.log(err.message));
    },

    getVendorData() {
      this.v_id = this.$route.params.id;
      console.log("s", this.v_id);
      const data = new FormData();
      data.append("v_id", this.v_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getVendorDataByID`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.vendor = data.message[0];
          this.eVendor = data.message[0];
          console.log(data.message);
        })
        .catch((err) => console.log(err.message));
    },

    getVendorInvoiceData() {
      this.v_id = this.$route.params.id;
      console.log("s", this.v_id);
      const data = new FormData();
      data.append("v_id", this.v_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getvendorDueStats`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.invoice = data.invoice;
          this.dueInvoice = data.totaldue;
        })
        .catch((err) => console.log(err.message));
    },

    getVendorTransactions() {
      this.v_id = this.$route.params.id;

      const data = new FormData();
      data.append("v_id", this.v_id);

      fetch(`${process.env.VUE_APP_SERVER_URL}/getmonthlyVendorTransaction`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.transactionReport = data.message;

          this.myChart.data.datasets[0].data = this.transactionReport;
          this.myChart.update();
        })
        .catch((err) => console.log(err.message));
    },

    createChart() {
      const ctx = document.getElementById("myChart");

      const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "",
            data: [], // Initialize with empty array
            fill: false,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
            borderColor: "rgb(75, 192, 192)",
            tension: 0,
          },
        ],
      };

      this.myChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.getVendorData();
    this.getVendorInvoiceData();
    this.createChart();
    this.otherData();
    this.fetchData();
    this.getVendorTransactions();
  },
  watch: {
    update() {
      this.getVendorData();
      this.getVendorInvoiceData();

      this.updateAddressData();
    },
  },

  computed: {
    ...mapState(["orgInfo"]),

    ...mapState(["userInfo"]),
    ...mapState(["editPrivilege"]),
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>

<style></style>
