<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-container-right">
        <div class="row border-bottom py-3 align-items-center">
          <div class="col-lg-10">
            <p class="mb-0 text-color fs-20">Add Customer</p>
          </div>
        </div>

        <div class="row py-3 px-2">
          <div class="col-lg-12 mb-2">
            <p class="mb-0 fs-12">
              <span class="text-primary font-weight-600">*Note:</span>
              Before entering <b>Customer</b> information into the software,
              please ensure to carefully read and verify the following details.
              <br />
              <span class="note-space"></span> Failing to do so may lead to
              delays or errors in processing your project.
            </p>
          </div>
          <div class="p-3 ps-4">
            <div class="row w-75">
              <div class="col-lg-6 mb-2">
                <label
                  for="cus_name"
                  class="form-label text-muted fs-13 fw-bold"
                  >Customer Name <span class="fs-15 text-danger">*</span></label
                >
                <input
                  id="cus_name"
                  v-model="cus_name"
                  name="cus_name"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="Ex. mPair Technologies Ltd."
                />
              </div>
              <div class="col-lg-6"></div>
              <div class="col-lg-6 mb-2">
                <label for="cus_loc" class="form-label text-muted fs-13 fw-bold"
                  >Customer Location<span class="fs-15 text-danger"
                    >*</span
                  ></label
                >
                <input
                  id="cus_loc"
                  v-model="cus_loc"
                  name="cus_loc"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="Ex. Chattogram, Bangladesh"
                />
              </div>
              <div class="col-lg-6"></div>
              <div class="col-lg-6 mb-2">
                <label for="website" class="form-label text-muted fs-13 fw-bold"
                  >Website</label
                >
                <input
                  id="website"
                  v-model="website"
                  name="website"
                  type="text"
                  class="form-control rounded-0 border-muted shadow-none inputa"
                  placeholder="www.example.com"
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
                  Address
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
                        <div class="col-lg-12 fs-14 mb-2">
                          <p class="font-14 font-weight-600 text-muted">
                            Billing Address
                          </p>
                        </div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="bill_country"
                            class="form-label text-muted fs-13 fw-bold"
                            >Country/Region
                            <span class="fs-15 text-danger">*</span></label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <select
                            id="bill_country"
                            v-model="bill_country"
                            name="bill_country"
                            class="form-control"
                          >
                            <option value="" Selected>Select Country</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
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
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
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
                            <option
                              value="Congo, The Democratic Republic of The"
                            >
                              Congo, The Democratic Republic of The
                            </option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
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
                            <option
                              value="Korea, Democratic People's Republic of"
                            >
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
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
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
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
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
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option
                              value="United States Minor Outlying Islands"
                            >
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
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="bill_address"
                            class="form-label text-muted fs-13 fw-bold"
                            >Address
                            <span class="fs-15 text-danger">*</span></label
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
                          <label
                            for="bill_city"
                            class="form-label text-muted fs-13 fw-bold"
                            >City
                            <span class="fs-15 text-danger">*</span></label
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
                          <label
                            for="bill_zip"
                            class="form-label text-muted fs-13 fw-bold"
                            >Zip Code
                            <span class="fs-15 text-danger">*</span></label
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
                          <label
                            for="bill_phone"
                            class="form-label text-muted fs-13 fw-bold"
                            >Phone
                            <span class="fs-15 text-danger">*</span></label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="bill_phone"
                            v-model="bill_phone"
                            type="text"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="XXXXXXXXXXX"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="bill_fax"
                            class="form-label text-muted fs-13 fw-bold"
                            >Fax</label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="bill_fax"
                            v-model="bill_fax"
                            type="text"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="XXX-XXX-XXXXX"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="row">
                        <div class="col-lg-12 fs-14 mb-2">
                          <p class="font-14 font-weight-600 text-muted">
                            Shipping Address
                          </p>
                        </div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="ship_country"
                            class="form-label text-muted fs-13 fw-bold"
                            >Country/Region</label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <select
                            id="ship_country"
                            name="ship_country"
                            v-model="ship_country"
                            class="form-control"
                          >
                            <option value="" Selected>Select Country</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
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
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
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
                            <option
                              value="Congo, The Democratic Republic of The"
                            >
                              Congo, The Democratic Republic of The
                            </option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
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
                            <option
                              value="Korea, Democratic People's Republic of"
                            >
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
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
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
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
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
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option
                              value="United States Minor Outlying Islands"
                            >
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
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="ship_address"
                            class="form-label text-muted fs-13 fw-bold"
                            >Address</label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <textarea
                            id="ship_address"
                            v-model="ship_address"
                            rows="4"
                            class="form-control rounded-0 border-muted shadow-none"
                            placeholder="Type address here . . ."
                          ></textarea>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="ship_city"
                            class="form-label text-muted fs-13 fw-bold"
                            >City</label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="ship_city"
                            v-model="ship_city"
                            type="text"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="Ex. Chattogram"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="ship_zip"
                            class="form-label text-muted fs-13 fw-bold"
                            >Zip Code</label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="ship_zip"
                            v-model="ship_zip"
                            type="number"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="Ex. 4000"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="ship_phone"
                            class="form-label text-muted fs-13 fw-bold"
                            >Phone</label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="ship_phone"
                            v-model="ship_phone"
                            type="text"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="XXXXXXXXXXX"
                          />
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 mb-2">
                          <label
                            for="ship_fax"
                            class="form-label text-muted fs-13 fw-bold"
                            >Fax</label
                          >
                        </div>
                        <div class="col-lg-7 mb-2">
                          <input
                            id="ship_fax"
                            v-model="ship_fax"
                            type="text"
                            class="form-control rounded-0 border-muted shadow-none inputa"
                            placeholder="XXX-XXX-XXXXX"
                          />
                        </div>
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
                  <div class="col-lg-12 mt-2">
                    <p class="mb-0 fs-12 pb-4">
                      <span class="text-primary font-weight-600">*Note:</span>
                      Person of contact is required for further communication.
                      Please carefully read and check the following information.
                    </p>
                    <div class="bg-white border">
                      <div class="container">
                        <div
                          class="row py-1 pb-2 fs-13 font-family thead-color font-weight-600"
                        >
                          <div class="col-lg-3 text-start">
                            First Name<span class="fs-15 text-danger">*</span>
                          </div>
                          <div class="col-lg-2 text-start">
                            Last Name<span class="fs-15 text-danger">*</span>
                          </div>
                          <div class="col-lg-2 text-start">
                            Designation<span class="fs-15 text-danger">*</span>
                          </div>
                          <div class="col-lg-2 text-start">
                            Email<span class="fs-15 text-danger">*</span>
                          </div>
                          <div class="col-lg-2 text-start">
                            Mobile Number<span class="fs-15 text-danger"
                              >*</span
                            >
                          </div>
                          <div class="col-lg-1 text-center">Action</div>
                        </div>

                        <form v-on:submit="addItem">
                          <div class="row">
                            <div class="col-lg-3 px-1 border-end py-1">
                              <input
                                type="text"
                                class="form-control rounded-0 border-0 shadow-none inputa px-1"
                                id="first_name"
                                placeholder="Type First Name"
                                v-model="first_name"
                                aria-describedby=""
                              />
                            </div>

                            <div class="col-lg-2 px-1 border-end py-1">
                              <input
                                type="text"
                                class="form-control rounded-0 border-0 shadow-none px-1"
                                id="last_name"
                                rows="2"
                                placeholder="Type Last Name"
                                v-model="last_name"
                                aria-describedby=""
                              />
                            </div>

                            <div class="col-lg-2 px-1 border-end py-1">
                              <input
                                type="text"
                                class="form-control rounded-0 border-0 shadow-none px-1"
                                id="designation"
                                rows="2"
                                placeholder="Head of Purchase"
                                v-model="designation"
                                aria-describedby=""
                              />
                            </div>

                            <div class="col-lg-2 px-1 border-end py-1">
                              <input
                                type="email"
                                class="form-control rounded-0 border-0 shadow-none inputa px-1"
                                id="cpemail"
                                placeholder="ex@mail.com"
                                v-model="cpemail"
                                aria-describedby=""
                              />
                            </div>

                            <div class="col-lg-2 px-1 text-end border-end py-1">
                              <input
                                type="text"
                                class="form-control rounded-0 border-0 shadow-none inputa px-1"
                                id="cpmobile"
                                v-model="cpmobile"
                                placeholder="XXXXXXXXXXX"
                                aria-describedby=""
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
                                <!-- style="height: 32px;" -->
                                Add
                              </button>
                            </div>
                          </div>
                        </form>

                        <div
                          class="row mb-0 border-top fs-12"
                          v-for="(cp_info, index) in cp_array"
                          :key="index"
                        >
                          <div
                            class="col-lg-3 py-2 border-end text-start text-muted"
                          >
                            {{ cp_info.first_name }}
                          </div>
                          <div
                            class="col-lg-2 py-2 border-end text-start text-muted"
                          >
                            {{ cp_info.last_name }}
                          </div>
                          <div
                            class="col-lg-2 py-2 border-end text-start text-muted"
                          >
                            {{ cp_info.designation }}
                          </div>
                          <div
                            class="col-lg-2 py-2 border-end text-start text-muted"
                          >
                            {{ cp_info.cpemail }}
                          </div>
                          <div
                            class="col-lg-2 py-2 border-end text-start text-muted"
                          >
                            {{ cp_info.cpmobile }}
                          </div>

                          <div
                            class="col-lg-1 py-2 text-center text-muted"
                            @click="deleteTask(index)"
                          >
                            <i
                              class="fa-regular fa-trash-can"
                              style="cursor: pointer"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <Remarks /> -->
              </div>
              <hr />
              <button
                @click="submitForm"
                class="border-0 w-25 action-button py-1"
                variant="warning"
              >
                {{ isLoading === true ? "Loading..." : "Submit" }}
              </button>
            </div>
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
import { mapState } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "customeradd",
  components: { TopNav, SideBar, Footer },
  data() {
    return {
      poc_id: "",
      cus_id: "",
      cus_name: "",
      cus_loc: "",
      website: "",

      bill_country: "",
      bill_address: "",
      bill_city: "",
      bill_zip: "",
      bill_phone: "",
      bill_fax: "",

      ship_country: "",
      ship_address: "",
      ship_city: "",
      ship_zip: "",
      ship_phone: "",
      ship_fax: "",

      first_name: "",
      last_name: "",
      designation: "",
      cpemail: "",
      cpmobile: "",
      cp_array: [],

      isLoading: false,

      itemConditions: [
        localStorage.getItem("c_id") === "",
        this.first_name === "",
        this.last_name === "",
        this.designation === "",
        this.cpemail === "",
        this.cpmobile === "",
      ],
    };
  },

  methods: {
    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
    auth() {
      if (!this.createPrivilege.includes("customerlist")) {
        this.$router.push("/dashboard");
      }
    },

    generateCustomerID() {
      const date = new Date();
      const year = String(date.getFullYear());

      fetch(`${process.env.VUE_APP_SERVER_URL}/getCustomerLastID`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          this.cus_id = `C${year}${data.message}`;
          console.log(this.cus_id);
        })
        .catch((err) => console.error(err.message));
    },

    submitForm() {
      const phoneRegex = /\d{6,20}/;
      if (
        this.cus_name == "" ||
        this.cus_loc == "" ||
        this.bill_country == "" ||
        this.bill_address == "" ||
        this.bill_city == "" ||
        this.bill_zip == "" ||
        !phoneRegex.test(this.bill_phone)
      ) {
        this.warningMsg("Fill up the Required Fields!!");
        return false;
      }

      if (this.cp_array.length == 0) {
        this.warningMsg("Add Contact Person Before Submit!");

        return false;
      }

      if (this.ship_phone !== "") {
        if (!phoneRegex.test(this.ship_phone)) {
          this.warningMsg("Invalid Shipping Number");
          return false;
        }
      }

      this.isLoading = true;

      const data = new FormData();
      data.append("c_id", this.cus_id);
      data.append("cname", this.cus_name);
      data.append("cadd", this.cus_loc);
      data.append("cwebsite", this.website);

      data.append("bcountry", this.bill_country);
      data.append("badd", this.bill_address);
      data.append("bcity", this.bill_city);
      data.append("bzip", this.bill_zip);
      data.append("bphone", this.bill_phone);
      data.append("bfax", this.bill_fax);

      data.append("scountry", this.ship_country);
      data.append("sadd", this.ship_address);
      data.append("scity", this.ship_city);
      data.append("szip", this.ship_zip);
      data.append("sphone", this.ship_phone);
      data.append("sfax", this.ship_fax);
      data.append("user", this.userInfo.username);

      fetch(`${process.env.VUE_APP_SERVER_URL}/addCustomer`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.message === true) {
            this.submitPOC();
            setTimeout(() => {
              this.isLoading = false;
              this.successMsg("Customer");

              this.resetStates();
            }, 1000);
          } else {
            // state;
            setTimeout(() => {
              this.isLoading = false;
              this.errMsg(res.message);
            }, 1000);
          }

          localStorage.setItem("c_id", this.cus_id);
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.errMsg(error);
        });
    },

    addItem(e) {
      e.preventDefault();

      const phoneRegex = /\d{6,20}/;

      if (
        this.first_name === "" ||
        this.last_name === "" ||
        this.designation === "" ||
        this.cpemail === "" ||
        !phoneRegex.test(this.cpmobile)
      ) {
        return false;
      }

      const newObject = {
        first_name: this.first_name,
        last_name: this.last_name,
        designation: this.designation,
        cpemail: this.cpemail,
        cpmobile: this.cpmobile,
      };

      this.cp_array = [...this.cp_array, newObject];

      this.first_name = "";
      this.last_name = "";
      this.designation = "";
      this.cpemail = "";
      this.cpmobile = 0;
    },

    submitPOC() {
      this.poc_id = Math.floor(100000 + Math.random() * 900000);

      this.cp_array.map((item) => {
        const data = new FormData();
        data.append("c_id", this.cus_id);
        data.append("poc_id", this.poc_id);
        data.append("poc_name", item.first_name + " " + item.last_name);
        data.append("poc_designation", item.designation);
        data.append("poc_email", item.cpemail);
        data.append("poc_mobile", item.cpmobile);

        fetch(`${process.env.VUE_APP_SERVER_URL}/addCustomerPoc`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      this.cp_array = [];
    },

    deleteTask(index) {
      this.cp_array.splice(index, 1);
    },

    resetStates() {
      this.cus_id = "";
      this.generateCustomerID();
      this.cus_name = "";
      this.cus_loc = "";
      this.website = "";
      this.bill_country = "";
      this.bill_address = "";
      this.bill_city = "";
      this.bill_zip = "";
      this.bill_phone = "";
      this.bill_fax = "";
      this.ship_country = "";
      this.ship_address = "";
      this.ship_city = "";
      this.ship_zip = "";
      this.ship_phone = "";
      this.ship_fax = "";
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
  },

  async mounted() {
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
    this.generateCustomerID();
  },

  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["createPrivilege"]),
  },

  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>
<style></style>
