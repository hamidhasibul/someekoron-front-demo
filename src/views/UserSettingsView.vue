<template class="vh-100">
  <div class="print_section"></div>
  <div class="view-section">
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-7">
              <p class="mb-0 text-color fs-20">Organization Settings</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 px-0">
              <div
                class="nav nav-tabs"
                id="nav-tab-project-quotation"
                role="tablist"
                style="text-align: center; border-bottom: 1px solid gainsboro"
              >
                <button
                  class="nav-link rounded-0 text-muted2 fs-14 active"
                  style="text-align: center"
                  id="user-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#user-profile"
                  type="button"
                  role="tab"
                  aria-controls="user-profile"
                  aria-selected="true"
                >
                  User Profile
                </button>
                <button
                  class="nav-link rounded-0 text-muted2 fs-14"
                  style="text-align: center"
                  id="admin-role-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#admin-role"
                  type="button"
                  role="tab"
                  aria-controls="admin-role"
                  aria-selected="false"
                  v-if="userInfo.role === 'Admin'"
                >
                  User Role
                </button>
                <button
                  class="nav-link rounded-0 text-muted2 fs-14"
                  style="text-align: center"
                  id="activity-log-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#activity-log"
                  type="button"
                  role="tab"
                  aria-controls="activity-log"
                  aria-selected="false"
                  v-if="userInfo.role === 'Admin'"
                >
                  Activity Log
                </button>
              </div>

              <div class="tab-content p-0 bg-white" id="pills-tabContent">
                <!-- tab pane -->

                <div
                  class="tab-pane p-4 fade active show"
                  id="user-profile"
                  role="tabpanel"
                  aria-labelledby="user-profile-tab"
                >
                  <div class="row w-75 mb-0">
                    <div class="col-lg-12 mb-2">
                      <div class="row">
                        <p class="mb-0 fs-20">
                          Welcome <b>{{ fullorginfo?.org_name }}</b>
                        </p>
                        <p class="m-0 mb-4 fs-12 text-muted">
                          Your organization information recorded here. you can
                          change if required.
                        </p>

                        <div class="col-lg-12 mt-2">
                          <table class="table">
                            <thead></thead>
                            <tbody>
                              <tr class="">
                                <td width="27%">
                                  <p
                                    class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                  >
                                    Logo
                                  </p>
                                </td>
                                <td width="35%">
                                  <div
                                    class="logobox text-center position-relative"
                                  >
                                    <img
                                      v-if="fullorginfo?.logo"
                                      :src="`${this.imageURL}/${fullorginfo?.logo}`"
                                      alt="No Image"
                                      class="img-circle"
                                    />
                                    <img
                                      v-else
                                      src="../assets/image/Image_not_available.png"
                                      alt="No Image"
                                      class="img-circle"
                                    />
                                    <div class="edit-position">
                                      <label
                                        class="fs-12 text-primary text-decoration-underline cursor-pointer"
                                      >
                                        <input
                                          @change="userPhotoChange"
                                          type="file"
                                          class="form-control d-none"
                                          placeholder=""
                                        />
                                        <i
                                          class="fa-solid fa-pen fs-10 text-danger me-1"
                                        ></i>
                                      </label>
                                    </div>
                                  </div>
                                  <p class="fs-11 m-0 mt-1">
                                    This logo will appear on transactions
                                    reports and all print documents.
                                  </p>
                                  <p class="fs-10 m-0 text-primary">
                                    Preferred Image Size: 512px x 512px @ 150
                                    DPI Maximum size of 1MB.
                                  </p>
                                </td>
                              </tr>
                              <tr class="border-white">
                                <td></td>
                                <td class="text-end">
                                  <div v-if="isEditing">
                                    <button
                                      type="button"
                                      class="btn action-button"
                                      @click="updateOrgInfo"
                                    >
                                      {{
                                        isLoading ? "Loading" : "Update Info"
                                      }}
                                    </button>
                                    <small
                                      class="ms-2 fs-12 text-primary text-decoration-underline cursor-pointer"
                                      @click="toggleEditing"
                                    >
                                      <i
                                        class="fa-solid fa-times fs-10 me-1"
                                      ></i
                                      >Cancel
                                    </small>
                                  </div>
                                  <small
                                    v-else
                                    class="fs-12 text-primary text-decoration-underline cursor-pointer"
                                    @click="toggleEditing"
                                  >
                                    <i class="fa-solid fa-pen fs-10 me-1"></i
                                    >Update Oragnization Info
                                  </small>
                                </td>
                              </tr>
                              <tr class="">
                                <td width="">
                                  <p
                                    class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                  >
                                    Organization Name
                                  </p>
                                </td>

                                <td width="65%">
                                  <div v-if="!isEditing">
                                    <p class="mb-0 align-middle py-2 fs-14">
                                      {{ fullorginfo?.org_name }}
                                    </p>
                                  </div>
                                  <div v-else>
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder=""
                                      v-model="uname"
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr class="">
                                <td>
                                  <p
                                    class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                  >
                                    Organization Location
                                  </p>
                                </td>
                                <td>
                                  <div v-if="!isEditing">
                                    <p class="mb-0 align-middle py-2 fs-14">
                                      {{ fullorginfo?.org_country }} <br />
                                      {{ fullorginfo?.org_address }} <br />
                                      {{ fullorginfo?.org_city }} <br />
                                      {{ fullorginfo?.org_zipCode }}
                                      <br />
                                    </p>
                                  </div>
                                  <div v-else>
                                    <select
                                      id="uorg_country"
                                      name="uorg_country"
                                      v-model="uorg_country"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                    >
                                      <option value="" Selected>
                                        Select Country
                                      </option>
                                      <option value="Afghanistan">
                                        Afghanistan
                                      </option>
                                      <option value="Åland Islands">
                                        Åland Islands
                                      </option>
                                      <option value="Albania">Albania</option>
                                      <option value="Algeria">Algeria</option>
                                      <option value="American Samoa">
                                        American Samoa
                                      </option>
                                      <option value="Andorra">Andorra</option>
                                      <option value="Angola">Angola</option>
                                      <option value="Anguilla">Anguilla</option>
                                      <option value="Antarctica">
                                        Antarctica
                                      </option>
                                      <option value="Antigua and Barbuda">
                                        Antigua and Barbuda
                                      </option>
                                      <option value="Argentina">
                                        Argentina
                                      </option>
                                      <option value="Armenia">Armenia</option>
                                      <option value="Aruba">Aruba</option>
                                      <option value="Australia">
                                        Australia
                                      </option>
                                      <option value="Austria">Austria</option>
                                      <option value="Azerbaijan">
                                        Azerbaijan
                                      </option>
                                      <option value="Bahamas">Bahamas</option>
                                      <option value="Bahrain">Bahrain</option>
                                      <option value="Bangladesh">
                                        Bangladesh
                                      </option>
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
                                      <option value="Bouvet Island">
                                        Bouvet Island
                                      </option>
                                      <option value="Brazil">Brazil</option>
                                      <option
                                        value="British Indian Ocean Territory"
                                      >
                                        British Indian Ocean Territory
                                      </option>
                                      <option value="Brunei Darussalam">
                                        Brunei Darussalam
                                      </option>
                                      <option value="Bulgaria">Bulgaria</option>
                                      <option value="Burkina Faso">
                                        Burkina Faso
                                      </option>
                                      <option value="Burundi">Burundi</option>
                                      <option value="Cambodia">Cambodia</option>
                                      <option value="Cameroon">Cameroon</option>
                                      <option value="Canada">Canada</option>
                                      <option value="Cape Verde">
                                        Cape Verde
                                      </option>
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
                                      <option value="Cook Islands">
                                        Cook Islands
                                      </option>
                                      <option value="Costa Rica">
                                        Costa Rica
                                      </option>
                                      <option value="Cote D'ivoire">
                                        Cote D'ivoire
                                      </option>
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
                                      <option value="El Salvador">
                                        El Salvador
                                      </option>
                                      <option value="Equatorial Guinea">
                                        Equatorial Guinea
                                      </option>
                                      <option value="Eritrea">Eritrea</option>
                                      <option value="Estonia">Estonia</option>
                                      <option value="Ethiopia">Ethiopia</option>
                                      <option
                                        value="Falkland Islands (Malvinas)"
                                      >
                                        Falkland Islands (Malvinas)
                                      </option>
                                      <option value="Faroe Islands">
                                        Faroe Islands
                                      </option>
                                      <option value="Fiji">Fiji</option>
                                      <option value="Finland">Finland</option>
                                      <option value="France">France</option>
                                      <option value="French Guiana">
                                        French Guiana
                                      </option>
                                      <option value="French Polynesia">
                                        French Polynesia
                                      </option>
                                      <option
                                        value="French Southern Territories"
                                      >
                                        French Southern Territories
                                      </option>
                                      <option value="Gabon">Gabon</option>
                                      <option value="Gambia">Gambia</option>
                                      <option value="Georgia">Georgia</option>
                                      <option value="Germany">Germany</option>
                                      <option value="Ghana">Ghana</option>
                                      <option value="Gibraltar">
                                        Gibraltar
                                      </option>
                                      <option value="Greece">Greece</option>
                                      <option value="Greenland">
                                        Greenland
                                      </option>
                                      <option value="Grenada">Grenada</option>
                                      <option value="Guadeloupe">
                                        Guadeloupe
                                      </option>
                                      <option value="Guam">Guam</option>
                                      <option value="Guatemala">
                                        Guatemala
                                      </option>
                                      <option value="Guernsey">Guernsey</option>
                                      <option value="Guinea">Guinea</option>
                                      <option value="Guinea-bissau">
                                        Guinea-bissau
                                      </option>
                                      <option value="Guyana">Guyana</option>
                                      <option value="Haiti">Haiti</option>
                                      <option
                                        value="Heard Island and Mcdonald Islands"
                                      >
                                        Heard Island and Mcdonald Islands
                                      </option>
                                      <option
                                        value="Holy See (Vatican City State)"
                                      >
                                        Holy See (Vatican City State)
                                      </option>
                                      <option value="Honduras">Honduras</option>
                                      <option value="Hong Kong">
                                        Hong Kong
                                      </option>
                                      <option value="Hungary">Hungary</option>
                                      <option value="Iceland">Iceland</option>
                                      <option value="India">India</option>
                                      <option value="Indonesia">
                                        Indonesia
                                      </option>
                                      <option value="Iran, Islamic Republic of">
                                        Iran, Islamic Republic of
                                      </option>
                                      <option value="Iraq">Iraq</option>
                                      <option value="Ireland">Ireland</option>
                                      <option value="Isle of Man">
                                        Isle of Man
                                      </option>
                                      <option value="Israel">Israel</option>
                                      <option value="Italy">Italy</option>
                                      <option value="Jamaica">Jamaica</option>
                                      <option value="Japan">Japan</option>
                                      <option value="Jersey">Jersey</option>
                                      <option value="Jordan">Jordan</option>
                                      <option value="Kazakhstan">
                                        Kazakhstan
                                      </option>
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
                                      <option value="Kyrgyzstan">
                                        Kyrgyzstan
                                      </option>
                                      <option
                                        value="Lao People's Democratic Republic"
                                      >
                                        Lao People's Democratic Republic
                                      </option>
                                      <option value="Latvia">Latvia</option>
                                      <option value="Lebanon">Lebanon</option>
                                      <option value="Lesotho">Lesotho</option>
                                      <option value="Liberia">Liberia</option>
                                      <option value="Libyan Arab Jamahiriya">
                                        Libyan Arab Jamahiriya
                                      </option>
                                      <option value="Liechtenstein">
                                        Liechtenstein
                                      </option>
                                      <option value="Lithuania">
                                        Lithuania
                                      </option>
                                      <option value="Luxembourg">
                                        Luxembourg
                                      </option>
                                      <option value="Macao">Macao</option>
                                      <option
                                        value="Macedonia, The Former Yugoslav Republic of"
                                      >
                                        Macedonia, The Former Yugoslav Republic
                                        of
                                      </option>
                                      <option value="Madagascar">
                                        Madagascar
                                      </option>
                                      <option value="Malawi">Malawi</option>
                                      <option value="Malaysia">Malaysia</option>
                                      <option value="Maldives">Maldives</option>
                                      <option value="Mali">Mali</option>
                                      <option value="Malta">Malta</option>
                                      <option value="Marshall Islands">
                                        Marshall Islands
                                      </option>
                                      <option value="Martinique">
                                        Martinique
                                      </option>
                                      <option value="Mauritania">
                                        Mauritania
                                      </option>
                                      <option value="Mauritius">
                                        Mauritius
                                      </option>
                                      <option value="Mayotte">Mayotte</option>
                                      <option value="Mexico">Mexico</option>
                                      <option
                                        value="Micronesia, Federated States of"
                                      >
                                        Micronesia, Federated States of
                                      </option>
                                      <option value="Moldova, Republic of">
                                        Moldova, Republic of
                                      </option>
                                      <option value="Monaco">Monaco</option>
                                      <option value="Mongolia">Mongolia</option>
                                      <option value="Montenegro">
                                        Montenegro
                                      </option>
                                      <option value="Montserrat">
                                        Montserrat
                                      </option>
                                      <option value="Morocco">Morocco</option>
                                      <option value="Mozambique">
                                        Mozambique
                                      </option>
                                      <option value="Myanmar">Myanmar</option>
                                      <option value="Namibia">Namibia</option>
                                      <option value="Nauru">Nauru</option>
                                      <option value="Nepal">Nepal</option>
                                      <option value="Netherlands">
                                        Netherlands
                                      </option>
                                      <option value="Netherlands Antilles">
                                        Netherlands Antilles
                                      </option>
                                      <option value="New Caledonia">
                                        New Caledonia
                                      </option>
                                      <option value="New Zealand">
                                        New Zealand
                                      </option>
                                      <option value="Nicaragua">
                                        Nicaragua
                                      </option>
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
                                      <option
                                        value="Palestinian Territory, Occupied"
                                      >
                                        Palestinian Territory, Occupied
                                      </option>
                                      <option value="Panama">Panama</option>
                                      <option value="Papua New Guinea">
                                        Papua New Guinea
                                      </option>
                                      <option value="Paraguay">Paraguay</option>
                                      <option value="Peru">Peru</option>
                                      <option value="Philippines">
                                        Philippines
                                      </option>
                                      <option value="Pitcairn">Pitcairn</option>
                                      <option value="Poland">Poland</option>
                                      <option value="Portugal">Portugal</option>
                                      <option value="Puerto Rico">
                                        Puerto Rico
                                      </option>
                                      <option value="Qatar">Qatar</option>
                                      <option value="Reunion">Reunion</option>
                                      <option value="Romania">Romania</option>
                                      <option value="Russian Federation">
                                        Russian Federation
                                      </option>
                                      <option value="Rwanda">Rwanda</option>
                                      <option value="Saint Helena">
                                        Saint Helena
                                      </option>
                                      <option value="Saint Kitts and Nevis">
                                        Saint Kitts and Nevis
                                      </option>
                                      <option value="Saint Lucia">
                                        Saint Lucia
                                      </option>
                                      <option value="Saint Pierre and Miquelon">
                                        Saint Pierre and Miquelon
                                      </option>
                                      <option
                                        value="Saint Vincent and The Grenadines"
                                      >
                                        Saint Vincent and The Grenadines
                                      </option>
                                      <option value="Samoa">Samoa</option>
                                      <option value="San Marino">
                                        San Marino
                                      </option>
                                      <option value="Sao Tome and Principe">
                                        Sao Tome and Principe
                                      </option>
                                      <option value="Saudi Arabia">
                                        Saudi Arabia
                                      </option>
                                      <option value="Senegal">Senegal</option>
                                      <option value="Serbia">Serbia</option>
                                      <option value="Seychelles">
                                        Seychelles
                                      </option>
                                      <option value="Sierra Leone">
                                        Sierra Leone
                                      </option>
                                      <option value="Singapore">
                                        Singapore
                                      </option>
                                      <option value="Slovakia">Slovakia</option>
                                      <option value="Slovenia">Slovenia</option>
                                      <option value="Solomon Islands">
                                        Solomon Islands
                                      </option>
                                      <option value="Somalia">Somalia</option>
                                      <option value="South Africa">
                                        South Africa
                                      </option>
                                      <option
                                        value="South Georgia and The South Sandwich Islands"
                                      >
                                        South Georgia and The South Sandwich
                                        Islands
                                      </option>
                                      <option value="Spain">Spain</option>
                                      <option value="Sri Lanka">
                                        Sri Lanka
                                      </option>
                                      <option value="Sudan">Sudan</option>
                                      <option value="Suriname">Suriname</option>
                                      <option value="Svalbard and Jan Mayen">
                                        Svalbard and Jan Mayen
                                      </option>
                                      <option value="Swaziland">
                                        Swaziland
                                      </option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Switzerland">
                                        Switzerland
                                      </option>
                                      <option value="Syrian Arab Republic">
                                        Syrian Arab Republic
                                      </option>
                                      <option value="Taiwan">Taiwan</option>
                                      <option value="Tajikistan">
                                        Tajikistan
                                      </option>
                                      <option
                                        value="Tanzania, United Republic of"
                                      >
                                        Tanzania, United Republic of
                                      </option>
                                      <option value="Thailand">Thailand</option>
                                      <option value="Timor-leste">
                                        Timor-leste
                                      </option>
                                      <option value="Togo">Togo</option>
                                      <option value="Tokelau">Tokelau</option>
                                      <option value="Tonga">Tonga</option>
                                      <option value="Trinidad and Tobago">
                                        Trinidad and Tobago
                                      </option>
                                      <option value="Tunisia">Tunisia</option>
                                      <option value="Turkey">Turkey</option>
                                      <option value="Turkmenistan">
                                        Turkmenistan
                                      </option>
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
                                      <option value="United States">
                                        United States
                                      </option>
                                      <option
                                        value="United States Minor Outlying Islands"
                                      >
                                        United States Minor Outlying Islands
                                      </option>
                                      <option value="Uruguay">Uruguay</option>
                                      <option value="Uzbekistan">
                                        Uzbekistan
                                      </option>
                                      <option value="Vanuatu">Vanuatu</option>
                                      <option value="Venezuela">
                                        Venezuela
                                      </option>
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
                                    <!-- <input type="text" class="m-2" placeholder="" v-model="uorg_country" /> -->
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder="Street Address"
                                      v-model="uorg_address"
                                    />
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder="City"
                                      v-model="uorg_city"
                                    />
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder="Zip Code"
                                      v-model="uorg_zipCode"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <!-- Another Location -->

                              <!-- <tr class="">
                                <td>
                                  <p class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted">
                                    Another Location
                                  </p>
                                </td>
                                <td>
                                  <div v-if="!isEditing">
                                    <p class="mb-0 align-middle py-2 fs-14">
                                      {{ fullorginfo?.anorg_country }} <br />
                                      {{ fullorginfo?.anorg_address }} <br />
                                      {{ fullorginfo?.anorg_city }} <br />
                                      {{ fullorginfo?.anorg_zipCode }}
                                      <br />
                                    </p>
                                  </div>
                                  <div v-else>
                                    <select
                                      id="auorg_country"
                                      name="auorg_country"
                                      v-model="fullorginfo.anorg_country"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
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
                                      <option value="British Indian Ocean Territory">
                                        British Indian Ocean Territory
                                      </option>
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
                                      <option value="Lao People's Democratic Republic">
                                        Lao People's Democratic Republic
                                      </option>
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
                                      <option value="Micronesia, Federated States of">
                                        Micronesia, Federated States of
                                      </option>
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
                                      <option value="Palestinian Territory, Occupied">
                                        Palestinian Territory, Occupied
                                      </option>
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
                                      <option value="Saint Vincent and The Grenadines">
                                        Saint Vincent and The Grenadines
                                      </option>
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
                                     <input type="text" class="m-2" placeholder="" v-model="uorg_country" />
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder="Street Address"
                                      v-model="fullorginfo.anorg_address"
                                    />
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder="City"
                                      v-model="fullorginfo.anorg_city"
                                    />
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder="Zip Code"
                                      v-model="fullorginfo.anorg_zipCode"
                                    />
                                  </div>
                                </td>
                              </tr> -->

                              <!-- Another Location -->

                              <tr class="">
                                <td>
                                  <p
                                    class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                  >
                                    Business Email
                                  </p>
                                </td>
                                <td>
                                  <div v-if="!isEditing">
                                    <p class="mb-0 align-middle py-2 fs-14">
                                      {{ fullorginfo?.email }}
                                    </p>
                                  </div>
                                  <div v-else>
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder=""
                                      v-model="uemail"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr class="">
                                <td>
                                  <p
                                    class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                  >
                                    Webiste
                                  </p>
                                </td>
                                <td>
                                  <div v-if="!isEditing">
                                    <p class="mb-0 align-middle py-2 fs-14">
                                      {{ fullorginfo?.website }}
                                    </p>
                                  </div>
                                  <div v-else>
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder=""
                                      v-model="uwebsite"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr class="">
                                <td>
                                  <p
                                    class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                  >
                                    Primary Contact
                                  </p>
                                </td>
                                <td>
                                  <div v-if="!isEditing">
                                    <p class="mb-0 align-middle py-2 fs-14">
                                      {{ fullorginfo?.phone }}
                                    </p>
                                  </div>
                                  <div v-else>
                                    <input
                                      type="text"
                                      class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                      placeholder=""
                                      v-model="uphone"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <div
                            class="accordion accordion-flush"
                            id="accordionFlushExample"
                          >
                            <div class="accordion-item">
                              <p
                                class="mb-0 align-middle p-2 fs-14 font-weight-600 text-muted"
                                id="flush-headingOne"
                              >
                                <button
                                  class="m-0 p-0 accordion-button text-primary collapsed fs-14 font-weight-600"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseOne"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseOne"
                                >
                                  See Other Settings
                                </button>
                              </p>
                              <div
                                id="flush-collapseOne"
                                class="m-0 p-0 accordion-collapse collapse"
                                aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div class="m-0 p-0 accordion-body">
                                  <div class="bg-light rounded p-3">
                                    <div class="d-flex justify-content-end">
                                      <div v-if="isOtherEditing">
                                        <button
                                          type="button"
                                          class="btn action-button"
                                          @click="updateOrgInfo"
                                        >
                                          {{
                                            isLoading
                                              ? "Loading"
                                              : "Update Info"
                                          }}
                                        </button>
                                        <small
                                          class="ms-2 fs-12 text-primary text-decoration-underline cursor-pointer"
                                          @click="toggleOtherEditing"
                                        >
                                          <i
                                            class="fa-solid fa-times fs-10 me-1"
                                          ></i
                                          >Cancel
                                        </small>
                                      </div>
                                      <small
                                        v-else
                                        class="fs-12 text-primary text-decoration-underline cursor-pointer"
                                        @click="toggleOtherEditing"
                                      >
                                        <i
                                          class="fa-solid fa-pen fs-10 me-1"
                                        ></i
                                        >Update Other Info
                                      </small>
                                    </div>
                                    <div class="d-flex">
                                      <div class="w-25">
                                        <p
                                          class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                        >
                                          Select Currency
                                        </p>
                                      </div>
                                      <div>
                                        <select
                                          class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                          v-model="ucurrency"
                                          @change="
                                            updateOrgInfo()
                                            // toggleEditing();
                                          "
                                        >
                                          <option value="">
                                            Select Currency
                                          </option>
                                          <option value="BDT">BDT</option>
                                          <option value="USD">USD</option>
                                          <option value="EUR">EUR</option>
                                          <!-- Add more currency options as needed -->
                                        </select>
                                      </div>
                                    </div>

                                    <div class="d-flex">
                                      <div class="w-25">
                                        <p
                                          class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                        >
                                          Business ID
                                        </p>
                                      </div>
                                      <div>
                                        <div v-if="!isOtherEditing">
                                          <p
                                            class="mb-0 align-middle py-2 fs-14"
                                          >
                                            {{ fullorginfo?.bin }}
                                          </p>
                                        </div>
                                        <div v-else>
                                          <input
                                            type="text"
                                            class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                            placeholder=""
                                            v-model="ubin"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div class="d-flex">
                                      <div class="w-25">
                                        <p
                                          class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                        >
                                          Tax ID
                                        </p>
                                      </div>
                                      <div>
                                        <div v-if="!isOtherEditing">
                                          <p
                                            class="mb-0 align-middle py-2 fs-14"
                                          >
                                            {{ fullorginfo?.tin }}
                                          </p>
                                        </div>
                                        <div v-else>
                                          <input
                                            type="text"
                                            class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                            placeholder=""
                                            v-model="utin"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div class="border-top py-2 mt-2">
                                      <p
                                        class="m-0 fs-14 text-primary font-weight-600"
                                      >
                                        Quotation Signatory
                                      </p>
                                      <div class="d-flex">
                                        <div class="w-25">
                                          <p
                                            class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                          >
                                            Name
                                          </p>
                                        </div>
                                        <div>
                                          <div v-if="!isOtherEditing">
                                            <p
                                              class="mb-0 align-middle py-2 fs-14"
                                            >
                                              {{ fullorginfo?.sealName }}
                                            </p>
                                          </div>
                                          <div v-else>
                                            <input
                                              type="text"
                                              class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                              placeholder=""
                                              v-model="usealName"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="d-flex">
                                        <div class="w-25">
                                          <p
                                            class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                          >
                                            Designation
                                          </p>
                                        </div>
                                        <div>
                                          <div v-if="!isOtherEditing">
                                            <p
                                              class="mb-0 align-middle py-2 fs-14"
                                            >
                                              {{ fullorginfo?.sealDesignation }}
                                            </p>
                                          </div>
                                          <div v-else>
                                            <input
                                              type="text"
                                              class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                              placeholder=""
                                              v-model="usealDesignation"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="d-flex">
                                        <div class="w-25">
                                          <p
                                            class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                          >
                                            Authorized Seal
                                          </p>
                                        </div>
                                        <div>
                                          <div
                                            class="logobox bg-white text-center position-relative"
                                          >
                                            <img
                                              v-if="fullorginfo?.seal"
                                              :src="`${this.imageURL}/${fullorginfo?.seal}`"
                                              alt="No Image"
                                              class="img-circle"
                                            />
                                            <img
                                              v-else
                                              src="../assets/image/Image_not_available.png"
                                              alt="No Image"
                                              class="img-circle"
                                            />
                                            <div class="edit-position">
                                              <label
                                                class="fs-12 text-primary text-decoration-underline cursor-pointer"
                                              >
                                                <input
                                                  @change="orgSealChange"
                                                  type="file"
                                                  class="form-control d-none"
                                                  placeholder=""
                                                />
                                                <i
                                                  class="fa-solid fa-pen fs-10 text-danger me-1"
                                                ></i>
                                              </label>
                                            </div>
                                          </div>
                                          <p class="fs-11 m-0 mt-1">
                                            This logo will appear on
                                            transactions reports and all print
                                            documents.
                                          </p>
                                          <p class="fs-10 m-0 text-primary">
                                            Preferred Image Size: 512px x 512px
                                            @ 150 DPI Maximum size of 1MB.
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div class="border-top py-2 mt-2">
                                      <p
                                        class="m-0 fs-14 text-primary font-weight-600"
                                      >
                                        Purchase Order Signatory
                                      </p>
                                      <div class="d-flex">
                                        <div class="w-25">
                                          <p
                                            class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                          >
                                            Name
                                          </p>
                                        </div>
                                        <div>
                                          <div v-if="!isOtherEditing">
                                            <p
                                              class="mb-0 align-middle py-2 fs-14"
                                            >
                                              {{
                                                fullorginfo?.purchaseSealName
                                              }}
                                            </p>
                                          </div>
                                          <div v-else>
                                            <input
                                              type="text"
                                              class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                              placeholder=""
                                              v-model="upurchaseSealName"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="d-flex">
                                        <div class="w-25">
                                          <p
                                            class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                          >
                                            Designation
                                          </p>
                                        </div>
                                        <div>
                                          <div v-if="!isOtherEditing">
                                            <p
                                              class="mb-0 align-middle py-2 fs-14"
                                            >
                                              {{
                                                fullorginfo?.purchaseSealDesignation
                                              }}
                                            </p>
                                          </div>
                                          <div v-else>
                                            <input
                                              type="text"
                                              class="form-control rounded-0 border-muted shadow-none inputa my-1"
                                              placeholder=""
                                              v-model="upurchaseSealDesignation"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="d-flex">
                                        <div class="w-25">
                                          <p
                                            class="mb-0 align-middle py-2 fs-14 font-weight-600 text-muted"
                                          >
                                            Authorized Seal
                                          </p>
                                        </div>
                                        <div>
                                          <div
                                            class="logobox bg-white text-center position-relative"
                                          >
                                            <img
                                              v-if="fullorginfo?.purchaseSeal"
                                              :src="`${this.imageURL}/${fullorginfo?.purchaseSeal}`"
                                              alt="No Image"
                                              class="img-circle"
                                            />
                                            <img
                                              v-else
                                              src="../assets/image/Image_not_available.png"
                                              alt="No Image"
                                              class="img-circle"
                                            />
                                            <div class="edit-position">
                                              <label
                                                class="fs-12 text-primary text-decoration-underline cursor-pointer"
                                              >
                                                <input
                                                  @change="
                                                    orgpurchaseSealChange
                                                  "
                                                  type="file"
                                                  class="form-control d-none"
                                                  placeholder=""
                                                />
                                                <i
                                                  class="fa-solid fa-pen fs-10 text-danger me-1"
                                                ></i>
                                              </label>
                                            </div>
                                          </div>
                                          <p class="fs-11 m-0 mt-1">
                                            This logo will appear on
                                            transactions reports and all print
                                            documents.
                                          </p>
                                          <p class="fs-10 m-0 text-primary">
                                            Preferred Image Size: 512px x 512px
                                            @ 150 DPI Maximum size of 1MB.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade ps-3"
                  id="admin-role"
                  role="tabpanel"
                  aria-labelledby="admin-role-tab"
                >
                  <div class="row">
                    <div class="col-lg-4 pt-3 border-end">
                      <div class="row mb-3">
                        <div class="col-lg-4">
                          <p class="text-muted fs-13 fw-bold">User Name</p>
                        </div>
                        <div class="col-lg-8">
                          <input
                            type="text"
                            v-model="username"
                            placeholder="ex: Sarfaraj Rahman"
                            class="form-control rounded-0 border-muted shadow-none inputa my-1"
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-lg-4">
                          <p class="text-muted fs-13 fw-bold">Email</p>
                        </div>
                        <div class="col-lg-8">
                          <input
                            type="email"
                            v-model="addemail"
                            class="form-control rounded-0 border-muted shadow-none inputa my-1"
                            placeholder="ex: demo@demo.com"
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-lg-4">
                          <p class="text-muted fs-13 fw-bold">Phone</p>
                        </div>
                        <div class="col-lg-8">
                          <input
                            type="tel"
                            v-model="addphone"
                            class="form-control rounded-0 border-muted shadow-none inputa my-1"
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-lg-4">
                          <p class="text-muted fs-13 fw-bold">Password</p>
                        </div>
                        <div class="col-lg-8">
                          <input
                            type="password"
                            v-model="addpass"
                            class="form-control rounded-0 border-muted shadow-none inputa my-1"
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-lg-4">
                          <p class="text-muted fs-13 fw-bold">Role</p>
                        </div>
                        <div class="col-lg-8">
                          <select
                            class="form-control rounded-0 border-muted shadow-none inputa my-1"
                            v-model="role"
                          >
                            <option value="" selected>Select Role</option>
                            <option>Accountant</option>
                            <option>Project Manager</option>
                            <option>Sales Manager</option>
                            <option>Team Member</option>
                          </select>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-lg-8 offset-md-4">
                          <button
                            @click="newUser()"
                            class="btn action-button rounded-0 w-100"
                            :disabled="loading"
                          >
                            <span v-if="loading">Loading...</span>
                            <span v-else>Add User</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-8 ps-0">
                      <table class="table bordered">
                        <thead>
                          <tr class="thead-color border">
                            <td
                              scope="col"
                              class="border-0 fs-13 fw-bold text-muted"
                            >
                              User Name
                            </td>
                            <td
                              scope="col"
                              class="border-0 fs-13 fw-bold text-muted"
                            >
                              Role
                            </td>
                            <td
                              scope="col"
                              class="border-0 fs-13 fw-bold text-muted"
                            >
                              Phone Number
                            </td>
                            <td
                              scope="col"
                              class="border-0 fs-13 fw-bold text-muted"
                            >
                              Email
                            </td>

                            <td
                              scope="col"
                              class="border-0 fs-13 fw-bold text-muted"
                            >
                              Action
                            </td>
                          </tr>
                        </thead>
                        <tbody class="fs-12">
                          <tr class="" v-for="user in allusers" :key="user.id">
                            <td class="">{{ user.username }}</td>
                            <td class="">
                              <span class="rounded-pill bg-light1 px-2">{{
                                user.role
                              }}</span>
                            </td>
                            <td class="">{{ user.phone }}</td>
                            <td class="">{{ user.email }}</td>

                            <td class="">
                              <router-link
                                :to="`/userprivilege/${user.id}`"
                                class="btn action-button rounded-0"
                                ><i class="fa-solid fa-universal-access"></i
                              ></router-link>
                              <button
                                class="btn action-button rounded-0"
                                data-bs-toggle="modal"
                                :data-bs-target="`#changePassModal${user.id}`"
                                style="cursor: pointer"
                                @click="fetchUserData(user.id)"
                              >
                                <i class="fa-solid fa-pen-to-square"></i>
                              </button>
                              <div
                                class="modal fade"
                                :id="`changePassModal${user.id}`"
                                tabindex="-1"
                                aria-labelledby="changePassModalLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog modal-dialog-custom">
                                  <div
                                    class="modal-content modal-content-custom"
                                  >
                                    <div class="modal-header">
                                      <p
                                        class="modal-title font-weight-600"
                                        id="changePassModalLabel"
                                      >
                                        Edit Password
                                      </p>
                                    </div>
                                    <div class="modal-body">
                                      <p class="mb-0 fs-12">
                                        <span
                                          class="text-primary font-weight-600"
                                          >*Note:</span
                                        >
                                        Before entering
                                        <b> New Password </b> for the user,
                                        kindly review and check twice.
                                      </p>
                                      <div class="w-50 mt-3 card ps-2 py-2">
                                        <div class="font-weight-600">
                                          <span>{{ user.username }}</span>
                                        </div>
                                        <div class="fs-11">
                                          <i>{{ user.role }} </i>
                                        </div>
                                        <div>{{ user.phone }}</div>
                                      </div>
                                      <div class="w-50 mt-3">
                                        <label
                                          class="form-label text-muted fs-13 fw-bold"
                                          >New Password
                                        </label>
                                        <input
                                          class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                                          type="password"
                                          v-model="editPassword"
                                        />
                                        <label
                                          class="form-label text-muted fs-13 fw-bold"
                                          >Re-type New Password</label
                                        >
                                        <input
                                          class="form-control text-start rounded-0 shadow-none inputa px-1 bg-light"
                                          type="password"
                                          v-model="editRePassword"
                                        />
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="btn close-button"
                                        data-bs-dismiss="modal"
                                      >
                                        <i
                                          class="fa-regular fa-circle-xmark me-1"
                                        ></i>
                                        Close
                                      </button>
                                      <button
                                        data-bs-dismiss="modal"
                                        type="button"
                                        class="btn action-button"
                                        @click="updateUserPassword"
                                      >
                                        <i
                                          class="fa-regular fa-circle-check me-1"
                                        ></i
                                        >Save changes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button
                                v-if="user.role === 'Admin'"
                                @click="
                                  warningMsg(
                                    `Sorry you can't deleted this admin account`
                                  )
                                "
                                class="btn action-button rounded-0"
                              >
                                <i class="fa-solid fa-trash"></i>
                              </button>
                              <button
                                v-else
                                data-bs-toggle="modal"
                                :data-bs-target="`#UserDelete${user.id}`"
                                class="btn action-button rounded-0"
                              >
                                <i class="fa-solid fa-trash"></i>
                              </button>
                              <div
                                v-if="user.role !== 'Admin'"
                                :id="`UserDelete${user.id}`"
                                class="modal fade"
                                tabindex="1"
                                aria-labelledby=""
                                aria-hidden="true"
                              >
                                <div class="modal-dialog modal-dialog-custom">
                                  <div
                                    class="modal-content modal-content-custom"
                                  >
                                    <div class="modal-header">
                                      <p
                                        class="fs-16 mb-1"
                                        id="confirmRFQStatusLabel"
                                      >
                                        <img
                                          src="../assets/image/alert.png"
                                          class="alert-icon me-1"
                                          alt=""
                                          srcset=""
                                        />
                                        Are you sure you want to delete
                                        {{ user.username }}?
                                      </p>
                                    </div>
                                    <div class="p-2 d-flex justify-content-end">
                                      <button
                                        type="button"
                                        class="btn close-button me-2"
                                        data-bs-dismiss="modal"
                                      >
                                        <i
                                          class="fa-regular fa-circle-xmark me-1"
                                        ></i>
                                        No
                                      </button>
                                      <button
                                        data-bs-dismiss="modal"
                                        @click="deleteUserByID(user.id)"
                                        type="button"
                                        class="btn action-button"
                                      >
                                        <i
                                          class="fa-regular fa-circle-check me-1"
                                        ></i
                                        >Confirm
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="activity-log"
                  role="tabpanel"
                  aria-labelledby="activity-log-tab"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <ActivityLogReport />
                    </div>
                  </div>
                </div>
                <!-- tab pane -->
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>

  <!-- Modal -->
</template>
<script>
import TopNav from "../components/TopNav.vue";
import { mapState } from "vuex";
import { useToast } from "vue-toastification";
import SideBar from "../components/Sidebar.vue";
import Footer from "../components/FooterView.vue";
import ActivityLogReport from "../views/reports/activitylog/AllactivityLogReport.vue";

export default {
  name: "UserSettings",
  components: { TopNav, SideBar, Footer, ActivityLogReport },
  data() {
    return {
      fullorginfo: [],
      allusers: [],
      users: [],
      activitylogdata: [],
      email: "",
      phone: "",
      org_country: "",
      uorg_country: "",
      org_address: "",
      uorg_address: "",
      org_city: "",
      uorg_city: "",
      org_zipCode: "",
      uorg_zipCode: "",
      logo: "",
      seal: "",
      purchaseSeal: "",
      tin: "",
      utin: "",
      sealDesignation: "",
      usealDesignation: "",
      purchaseSealDesignation: "",
      upurchaseSealDesignation: "",
      currency: "",
      ucurrency: "",
      sealName: "",
      usealName: "",
      purchaseSealName: "",
      upurchaseSealName: "",
      bin: "",
      ubin: "",
      name: "",
      uemail: "",
      uwebsite: "",
      uphone: "",
      uaddress: "",
      ulogo: "",
      useal: "",
      uname: "",
      id: "",
      update: 0,
      username: "",
      addemail: "",
      addphone: "",
      role: "",
      addpass: "",
      isEditing: false,
      isOtherEditing: false,
      activeID: "",
      imageURL: process.env.VUE_APP_IMAGE_SERVER,
      editPassword: "",
      editRePassword: "",

      auorg_country: "",
      auorg_address: "",
      auorg_city: "",
      auorg_zipCode: "",

      // toast property
      loading: false,
      loadingTime: 1000,
    };
  },

  mounted() {
    this.orginfo();
    this.getalluser();
    this.activity();
  },

  methods: {
    async deleteUserByID(id) {
      const data = new FormData();
      data.append("id", id);
      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/deleteUserByID`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        if (res.ok) {
          this.errMsg("User Deleted");
          this.getalluser();
        } else {
          this.errMsg(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    auth() {
      if (this.userInfo.role !== "Admin") {
        this.$router.push("/dashboard");
      }
    },

    errMsg(msg) {
      this.loading = false;

      this.toast.error(msg, {
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
      this.loading = false;

      this.toast.warning(msg, {
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

    successMsg(msg) {
      this.toast.success(msg, {
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

    async updateUserPassword() {
      if (this.editPassword !== this.editRePassword) {
        this.warningMsg("Passwords do not match!");
        return false;
      }

      if (this.editPassword.length < 8) {
        this.warningMsg("please enter minimum 8 charecter");
        return false;
      }

      const data = new FormData();

      data.append("id", this.activeID);
      data.append("password", this.editPassword);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/updateUserPass`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        if (res.message) {
          this.successMsg("Password update successfully");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUserData(id) {
      const data = new FormData();

      data.append("id", id);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/getUserDatabyID`,
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        this.activeID = res.message[0].id;
      } catch (error) {
        console.error(error);
      }
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    toggleOtherEditing() {
      this.isOtherEditing = !this.isOtherEditing;
    },

    userPhotoChange(e) {
      if (e.target.files[0]?.name !== undefined) {
        const fileInput = e.target.files[0];

        if (fileInput) {
          const allowedFileTypes = ["jpg", "jpeg", "png"];
          const fileType = fileInput.name.split(".").pop().toLowerCase();

          if (!allowedFileTypes.includes(fileType)) {
            this.warningMsg("File type must be jpg or png");
          } else {
            const maxSizeInBytes = 1024 * 1024;
            if (fileInput.size > maxSizeInBytes) {
              this.warningMsg("Maximum file size is 1MB");
            } else {
              const img = new Image();
              img.src = URL.createObjectURL(fileInput);

              img.onload = () => {
                const width = img.width;
                const height = img.height;

                if (width > 512 && height > 512) {
                  this.warningMsg("Preferred image size is 512px x 512px");
                } else {
                  this.ulogo = e.target.files[0];
                  this.updateOrgInfo();
                  // this.toggleEditing();
                }
              };
            }
          }
        }
      }
    },

    orgSealChange(e) {
      if (e.target.files[0]?.name !== undefined) {
        const fileInput = e.target.files[0];

        if (fileInput) {
          const allowedFileTypes = ["jpg", "jpeg", "png"];
          const fileType = fileInput.name.split(".").pop().toLowerCase();

          if (!allowedFileTypes.includes(fileType)) {
            this.warningMsg("File type must be jpg or png");
          } else {
            const maxSizeInBytes = 1024 * 1024;
            if (fileInput.size > maxSizeInBytes) {
              this.warningMsg("Maximum file size is 1MB");
            } else {
              const img = new Image();
              img.src = URL.createObjectURL(fileInput);

              img.onload = () => {
                const width = img.width;
                const height = img.height;

                if (width > 512 && height > 512) {
                  this.warningMsg("Preferred image size is 512px x 512px");
                } else {
                  this.useal = e.target.files[0];
                  this.updateOrgInfo();
                  this.isOtherEditing = false;
                }
              };
            }
          }
        }
      }
    },
    orgpurchaseSealChange(e) {
      if (e.target.files[0]?.name !== undefined) {
        const fileInput = e.target.files[0];

        if (fileInput) {
          const allowedFileTypes = ["jpg", "jpeg", "png"];
          const fileType = fileInput.name.split(".").pop().toLowerCase();

          if (!allowedFileTypes.includes(fileType)) {
            this.warningMsg("File type must be jpg or png");
          } else {
            const maxSizeInBytes = 1024 * 1024;
            if (fileInput.size > maxSizeInBytes) {
              this.warningMsg("Maximum file size is 1MB");
            } else {
              const img = new Image();
              img.src = URL.createObjectURL(fileInput);

              img.onload = () => {
                const width = img.width;
                const height = img.height;

                if (width > 512 && height > 512) {
                  this.warningMsg("Preferred image size is 512px x 512px");
                } else {
                  this.upurchaseSeal = e.target.files[0];
                  this.updateOrgInfo();
                  this.isOtherEditing = false;
                }
              };
            }
          }
        }
      }
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

    newUser() {
      console.log(this.username);
      if (
        this.username == "" ||
        this.addemail == "" ||
        this.addphone == "" ||
        this.addpass == "" ||
        this.role == ""
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

      this.loading = true;

      const data = new FormData();
      data.append("username", this.username);
      data.append("email", this.addemail);
      data.append("phone", this.addphone);
      data.append("password", this.addpass);
      data.append("role", this.role);
      data.append("user", this.userInfo.username);
      fetch(`${process.env.VUE_APP_SERVER_URL}/addUsers`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === true) {
            setTimeout(() => {
              this.loading = false;
              this.successMsg("User Added!");
              this.username = "";
              this.addemail = "";
              this.addphone = "";
              this.addpass = "";
              this.role = "";
            }, this.loadingTime);
            this.update = this.update + 1;
          } else {
            this.errMsg(res.message);
          }
          // alert(data.message);
          // this.update = this.update + 1;
        })
        .catch((err) => console.log(err.message));
    },
    updateOrgInfo() {
      this.isEditing = false;
      this.isOtherEditing = false;
      console.log(this.auorg_country);
      const data = new FormData();
      data.append("org_name", this.uname);
      data.append("org_country", this.uorg_country);
      data.append("org_address", this.uorg_address);
      data.append("org_city", this.uorg_city);
      data.append("org_zipCode", this.uorg_zipCode);
      data.append("anorg_country", this.fullorginfo.anorg_country);
      data.append("anorg_address", this.fullorginfo.anorg_address);
      data.append("anorg_city", this.fullorginfo.anorg_city);
      data.append("anorg_zipCode", this.fullorginfo.anorg_zipCode);
      data.append("phone", this.uphone);
      data.append("email", this.uemail);
      data.append("website", this.uwebsite);
      data.append("bin", this.ubin);
      data.append("tin", this.utin);
      data.append("currency", this.ucurrency);
      data.append("sealName", this.usealName);
      data.append("sealDesignation", this.usealDesignation);
      data.append("purchaseSealName", this.upurchaseSealName);
      data.append("purchaseSealDesignation", this.upurchaseSealDesignation);
      data.append("logo", this.ulogo);
      data.append("oldLogo", this.logo);
      data.append("seal", this.useal);
      data.append("oldSeal", this.seal);
      data.append("purchaseSeal", this.upurchaseSeal);
      data.append("oldpurchaseSeal", this.purchaseSeal);
      data.append("user", this.userInfo.username);
      fetch(`${process.env.VUE_APP_SERVER_URL}/updateOrgInfo`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          console.log(res);
          this.update = this.update + 1;
        })
        .catch((err) => console.log(err.message));
    },
    orginfo() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getORGinfo`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.fullorginfo = res.message[0];
          this.name = res.message[0].org_name;
          this.uname = res.message[0].org_name;
          this.address = res.message[0].org_location;
          this.uaddress = res.message[0].org_location;
          this.phone = res.message[0].phone;
          this.uphone = res.message[0].phone;
          this.email = res.message[0].email;
          this.uemail = res.message[0].email;
          this.uwebsite = res.message[0].website;
          this.logo = res.message[0].logo;
          this.seal = res.message[0].seal;
          this.purchaseSeal = res.message[0].purchaseSeal;
          this.tin = res.message[0].tin;
          this.utin = res.message[0].tin;
          this.currency = res.message[0].currency;
          this.ucurrency = res.message[0].currency;
          this.sealName = res.message[0].sealName;
          this.usealName = res.message[0].sealName;
          this.sealDesignation = res.message[0].sealDesignation;
          this.usealDesignation = res.message[0].sealDesignation;
          this.purchaseSealName = res.message[0].purchaseSealName;
          this.upurchaseSealName = res.message[0].purchaseSealName;
          this.purchaseSealDesignation = res.message[0].purchaseSealDesignation;
          this.upurchaseSealDesignation =
            res.message[0].purchaseSealDesignation;
          this.bin = res.message[0].bin;
          this.ubin = res.message[0].bin;
          this.org_country = res.message[0].org_country;
          this.uorg_country = res.message[0].org_country;
          this.org_address = res.message[0].org_address;
          this.uorg_address = res.message[0].org_address;
          this.org_city = res.message[0].org_city;
          this.uorg_city = res.message[0].org_city;
          this.org_zipCode = res.message[0].org_zipCode;
          this.uorg_zipCode = res.message[0].org_zipCode;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getalluser() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getUsers`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.allusers = res.message;
          console.log(res.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    activity() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/getactivityAllData`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          this.activitylogdata = res.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },
  },
  async mounted() {
    this.orginfo();
    this.getalluser();

    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
  },

  watch: {
    update() {
      this.orginfo();
      this.getalluser();
    },
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  computed: {
    ...mapState(["userInfo"]),
  },

  updated() {},
};
</script>
<style scoped>
.nav-link {
  color: black;
}

.activity-navlink.active {
  background-color: grey;
}
.accordion-button:not(.collapsed) {
  background-color: white !important;
  color: rgb(77, 77, 255);
  outline: none !important;
  box-shadow: none !important;
}
.accordion-button:focus {
  outline: none !important;
  box-shadow: none !important;
}
.accordion-button:after {
  order: 1;
  margin-left: 10px;
  }
</style>
