<template class="vh-100">
  <div class="print_section"></div>
  <div class="view-section">
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar-container-right">
          <div class="row border-bottom py-3 px-2 align-items-center">
            <div class="col-lg-7">
              <p class="mb-0 text-color fs-20">User Privilege</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 px-0">
              <table class="table fs-13">
                <thead>
                  <tr>
                    <th class="ps-4" scope="col">Main Section</th>
                    <th scope="col">Feature</th>
                    <th scope="col">Access</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- All Sections -->

                  <tr>
                    <th scope="row" className="bg-light ps-4">All</th>
                    <td className="bg-light">All Features</td>
                    <td className="bg-light">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="allAdd"
                          v-model="allAddChecked"
                          @change="toggleAllAdd"
                        />
                        <label class="form-check-label" for="allAdd"> Add </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="allView"
                          v-model="allViewChecked"
                          @change="toggleAllView"
                        />
                        <label class="form-check-label" for="allView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="allEdit"
                          v-model="allEditChecked"
                          @change="toggleAllEdit"
                        />
                        <label class="form-check-label" for="allEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="allDelete"
                          v-model="allDeleteChecked"
                          @change="toggleAllDelete"
                        />
                        <label class="form-check-label" for="allDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Customer -->
                  <tr>
                    <th scope="row" class="ps-4">Customer</th>
                    <td>Customer</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="customerlistAdd"
                          value="customerlist"
                          v-model="addArr"
                          :checked="addArr.includes('customerlist')"
                        />
                        <label class="form-check-label" for="customerlistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="customerlistView"
                          value="customerlist"
                          v-model="viewArr"
                          :checked="viewArr.includes('customerlist')"
                        />
                        <label class="form-check-label" for="customerlistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="customerlistEdit"
                          value="customerlist"
                          v-model="editArr"
                          :checked="editArr.includes('customerlist')"
                        />
                        <label class="form-check-label" for="customerlistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="customerlistDelete"
                          value="customerlist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('customerlist')"
                        />
                        <label class="form-check-label" for="customerlistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Project Quote -->

                  <tr>
                    <th scope="row" class="ps-4 border-0">Quotation</th>
                    <td>Project Quote</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="projectqueryAdd"
                          value="projectquery"
                          v-model="addArr"
                          :checked="addArr.includes('projectquery')"
                        />
                        <label class="form-check-label" for="projectqueryAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="projectqueryView"
                          value="projectquery"
                          v-model="viewArr"
                          :checked="viewArr.includes('projectquery')"
                        />
                        <label class="form-check-label" for="projectqueryView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="projectqueryEdit"
                          value="projectquery"
                          v-model="editArr"
                          :checked="editArr.includes('projectquery')"
                        />
                        <label class="form-check-label" for="projectqueryEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="projectqueryDelete"
                          value="projectquery"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('projectquery')"
                        />
                        <label class="form-check-label" for="projectqueryDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>


                  <tr>
                    <th scope="row" class="ps-4"></th>
                    <td>RFQ</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rfqAdd"
                          value="rfq"
                          v-model="addArr"
                          :checked="addArr.includes('rfq')"
                        />
                        <label class="form-check-label" for="rfqAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rfqView"
                          value="rfq"
                          v-model="viewArr"
                          :checked="viewArr.includes('rfq')"
                        />
                        <label class="form-check-label" for="rfqView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rfqEdit"
                          value="rfq"
                          v-model="editArr"
                          :checked="editArr.includes('rfq')"
                        />
                        <label class="form-check-label" for="rfqEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rfqDelete"
                          value="rfq"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('rfq')"
                        />
                        <label class="form-check-label" for="rfqDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Projects -->

                  <tr>
                    <th scope="row" class="ps-4 border-0">Projects</th>
                    <td>Project Info</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="projectlistAdd"
                          value="projectlist"
                          v-model="addArr"
                          :checked="addArr.includes('projectlist')"
                        />
                        <label class="form-check-label" for="projectlistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="projectlistView"
                          value="projectlist"
                          v-model="viewArr"
                          :checked="viewArr.includes('projectlist')"
                        />
                        <label class="form-check-label" for="projectlistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="projectlistEdit"
                          value="projectlist"
                          v-model="editArr"
                          :checked="editArr.includes('projectlist')"
                        />
                        <label class="form-check-label" for="projectlistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="projectlistDelete"
                          value="projectlist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('projectlist')"
                        />
                        <label class="form-check-label" for="projectlistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row" class="ps-4 border-0"></th>
                    <td>Task Flow</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="taskflowAdd"
                          value="taskflow"
                          v-model="addArr"
                          :checked="addArr.includes('taskflow')"
                          disabled
                        />
                        <label class="form-check-label" for="taskflowAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="taskflowView"
                          value="taskflow"
                          v-model="viewArr"
                          :checked="viewArr.includes('taskflow')"
                        />
                        <label class="form-check-label" for="taskflowView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="taskflowEdit"
                          value="taskflow"
                          v-model="editArr"
                          :checked="editArr.includes('taskflow')"
                          disabled
                        />
                        <label class="form-check-label" for="taskflowEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="taskflowDelete"
                          value="taskflow"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('taskflow')"
                          disabled
                        />
                        <label class="form-check-label" for="taskflowDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row" class="ps-4 border-0"></th>
                    <td>Collaboration</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="collabAdd"
                          value="collab"
                          v-model="addArr"
                          :checked="addArr.includes('collab')"
                          disabled
                        />
                        <label class="form-check-label" for="collabAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="collabView"
                          value="collab"
                          v-model="viewArr"
                          :checked="viewArr.includes('collab')"
                        />
                        <label class="form-check-label" for="collabView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="collabEdit"
                          value="collab"
                          v-model="editArr"
                          :checked="editArr.includes('collab')"
                          disabled
                        />
                        <label class="form-check-label" for="collabEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="collabDelete"
                          value="collab"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('collab')"
                          disabled
                        />
                        <label class="form-check-label" for="collabDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Invoice -->

                  <tr>
                    <th scope="row" class="ps-4 border-0"></th>
                    <td>Invoice</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="invoicelistAdd"
                          value="invoicelist"
                          v-model="addArr"
                          :checked="addArr.includes('invoicelist')"
                        />
                        <label class="form-check-label" for="invoicelistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="invoicelistView"
                          value="invoicelist"
                          v-model="viewArr"
                          :checked="viewArr.includes('invoicelist')"
                        />
                        <label class="form-check-label" for="invoicelistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="invoicelistEdit"
                          value="invoicelist"
                          v-model="editArr"
                          :checked="editArr.includes('invoicelist')"
                        />
                        <label class="form-check-label" for="invoicelistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="invoicelistDelete"
                          value="invoicelist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('invoicelist')"
                        />
                        <label class="form-check-label" for="invoicelistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Payment Received -->

                  <tr>
                    <th scope="row" class="ps-4"></th>
                    <td>Payment Received</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="accounts_receivable_listAdd"
                          value="accounts_receivable_list"
                          v-model="addArr"
                          :checked="addArr.includes('accounts_receivable_list')"
                        />
                        <label class="form-check-label" for="accounts_receivable_listAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="accounts_receivable_listView"
                          value="accounts_receivable_list"
                          v-model="viewArr"
                          :checked="viewArr.includes('accounts_receivable_list')"
                        />
                        <label class="form-check-label" for="accounts_receivable_listView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="accounts_receivable_listEdit"
                          value="accounts_receivable_list"
                          v-model="editArr"
                          :checked="editArr.includes('accounts_receivable_list')"
                        />
                        <label class="form-check-label" for="accounts_receivable_listEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="accounts_receivable_listDelete"
                          value="accounts_receivable_list"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('accounts_receivable_list')"
                        />
                        <label class="form-check-label" for="accounts_receivable_listDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>
                  


                  <!-- Vendors -->

                  <tr>
                    <th scope="row" class="ps-4">Vendors</th>
                    <td>Vendors</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="vendorlistAdd"
                          value="vendorlist"
                          v-model="addArr"
                          :checked="addArr.includes('vendorlist')"
                        />
                        <label class="form-check-label" for="vendorlistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="vendorlistView"
                          value="vendorlist"
                          v-model="viewArr"
                          :checked="viewArr.includes('vendorlist')"
                        />
                        <label class="form-check-label" for="vendorlistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="vendorlistEdit"
                          value="vendorlist"
                          v-model="editArr"
                          :checked="editArr.includes('vendorlist')"
                        />
                        <label class="form-check-label" for="vendorlistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="vendorlistDelete"
                          value="vendorlist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('vendorlist')"
                        />
                        <label class="form-check-label" for="vendorlistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>
                  

                  <!-- Purchase Order -->

                  <tr>
                    <th scope="row" class="ps-4 border-0">Purchase Order</th>
                    <td>Purchase Order</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="purchaseorderlistAdd"
                          value="purchaseorderlist"
                          v-model="addArr"
                          :checked="addArr.includes('purchaseorderlist')"
                        />
                        <label class="form-check-label" for="purchaseorderlistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="purchaseorderlistView"
                          value="purchaseorderlist"
                          v-model="viewArr"
                          :checked="viewArr.includes('purchaseorderlist')"
                        />
                        <label class="form-check-label" for="purchaseorderlistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="purchaseorderlistEdit"
                          value="purchaseorderlist"
                          v-model="editArr"
                          :checked="editArr.includes('purchaseorderlist')"
                        />
                        <label class="form-check-label" for="purchaseorderlistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="purchaseorderlistDelete"
                          value="purchaseorderlist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('purchaseorderlist')"
                        />
                        <label class="form-check-label" for="purchaseorderlistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  

                  <!-- Received Bills -->

                  <tr>
                    <th scope="row" class="ps-4 border-0"></th>
                    <td>Received Bills</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="billlistAdd"
                          value="billlist"
                          v-model="addArr"
                          :checked="addArr.includes('billlist')"
                        />
                        <label class="form-check-label" for="billlistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="billlistView"
                          value="billlist"
                          v-model="viewArr"
                          :checked="viewArr.includes('billlist')"
                        />
                        <label class="form-check-label" for="billlistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="billlistEdit"
                          value="billlist"
                          v-model="editArr"
                          :checked="editArr.includes('billlist')"
                        />
                        <label class="form-check-label" for="billlistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="billlistDelete"
                          value="billlist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('billlist')"
                        />
                        <label class="form-check-label" for="billlistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Make Payment -->

                  <tr>
                    <th scope="row" class="ps-4"></th>
                    <td>Make Payment</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="makepaylistAdd"
                          value="makepaylist"
                          v-model="addArr"
                          :checked="addArr.includes('makepaylist')"
                        />
                        <label class="form-check-label" for="makepaylistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="makepaylistView"
                          value="makepaylist"
                          v-model="viewArr"
                          :checked="viewArr.includes('makepaylist')"
                        />
                        <label class="form-check-label" for="makepaylistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="makepaylistEdit"
                          value="makepaylist"
                          v-model="editArr"
                          :checked="editArr.includes('makepaylist')"
                        />
                        <label class="form-check-label" for="makepaylistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="makepaylistDelete"
                          value="makepaylist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('makepaylist')"
                        />
                        <label class="form-check-label" for="makepaylistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Resources -->
                  <tr>
                    <th scope="row" class="ps-4">Resources</th>
                    <td>Resources</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="resourcelistAdd"
                          value="resourcelist"
                          v-model="addArr"
                          :checked="addArr.includes('resourcelist')"
                        />
                        <label class="form-check-label" for="resourcelistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="resourcelistView"
                          value="resourcelist"
                          v-model="viewArr"
                          :checked="viewArr.includes('resourcelist')"
                        />
                        <label class="form-check-label" for="resourcelistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="resourcelistEdit"
                          value="resourcelist"
                          v-model="editArr"
                          :checked="editArr.includes('resourcelist')"
                        />
                        <label class="form-check-label" for="resourcelistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="resourcelistDelete"
                          value="resourcelist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('resourcelist')"
                        />
                        <label class="form-check-label" for="resourcelistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Expense -->

                  <tr>
                    <th scope="row" class="ps-4 border-0">Accounts</th>
                    <td>Expense</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="expenselistAdd"
                          value="expenselist"
                          v-model="addArr"
                          :checked="addArr.includes('expenselist')"
                        />
                        <label class="form-check-label" for="expenselistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="expenselistView"
                          value="expenselist"
                          v-model="viewArr"
                          :checked="viewArr.includes('expenselist')"
                        />
                        <label class="form-check-label" for="expenselistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="expenselistEdit"
                          value="expenselist"
                          v-model="editArr"
                          :checked="editArr.includes('expenselist')"
                        />
                        <label class="form-check-label" for="expenselistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="expenselistDelete"
                          value="expenselist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('expenselist')"
                        />
                        <label class="form-check-label" for="expenselistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  

                  

                  <!-- Banking -->

                  <tr>
                    <th scope="row" class="ps-4 border-0"></th>
                    <td>Banking</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="banklistAdd"
                          value="banklist"
                          v-model="addArr"
                          :checked="addArr.includes('banklist')"
                        />
                        <label class="form-check-label" for="banklistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="banklistView"
                          value="banklist"
                          v-model="viewArr"
                          :checked="viewArr.includes('banklist')"
                        />
                        <label class="form-check-label" for="banklistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="banklistEdit"
                          value="banklist"
                          v-model="editArr"
                          :checked="editArr.includes('banklist')"
                        />
                        <label class="form-check-label" for="banklistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="banklistDelete"
                          value="banklist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('banklist')"
                        />
                        <label class="form-check-label" for="banklistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>

                  <!-- Report -->

                  <tr>
                    <th scope="row" class="ps-4"></th>
                    <td>Reports</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="reportAdd"
                          value="report"
                          v-model="addArr"
                          :checked="addArr.includes('report')"
                        />
                        <label class="form-check-label" for="reportAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="reportView"
                          value="report"
                          v-model="viewArr"
                          :checked="viewArr.includes('report')"
                        />
                        <label class="form-check-label" for="reportView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="reportEdit"
                          value="report"
                          v-model="editArr"
                          :checked="editArr.includes('report')"
                        />
                        <label class="form-check-label" for="reportEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="reportDelete"
                          value="report"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('report')"
                        />
                        <label class="form-check-label" for="reportDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>


                  <!-- Documents -->

                  <tr>
                    <th scope="row" class="ps-4">Documents</th>
                    <td>Documents</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="documentAdd"
                          value="document"
                          v-model="addArr"
                          :checked="addArr.includes('document')"
                        />
                        <label class="form-check-label" for="documentAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="documentView"
                          value="document"
                          v-model="viewArr"
                          :checked="viewArr.includes('document')"
                        />
                        <label class="form-check-label" for="documentView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="documentEdit"
                          value="document"
                          v-model="editArr"
                          :checked="editArr.includes('document')"
                          disabled
                        />
                        <label class="form-check-label" for="documentEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="documentDelete"
                          value="document"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('document')"
                        />
                        <label class="form-check-label" for="documentDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>


                  <!-- Team -->

                  <tr>
                    <th scope="row" class="ps-4">Team</th>
                    <td>Team</td>
                    <td>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="employeelistAdd"
                          value="employeelist"
                          v-model="addArr"
                          :checked="addArr.includes('employeelist')"
                        />
                        <label class="form-check-label" for="employeelistAdd"> Add </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="employeelistView"
                          value="employeelist"
                          v-model="viewArr"
                          :checked="viewArr.includes('employeelist')"
                        />
                        <label class="form-check-label" for="employeelistView"> View </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="employeelistEdit"
                          value="employeelist"
                          v-model="editArr"
                          :checked="editArr.includes('employeelist')"
                        />
                        <label class="form-check-label" for="employeelistEdit"> Edit </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="employeelistDelete"
                          value="employeelist"
                          v-model="deleteArr"
                          :checked="deleteArr.includes('employeelist')"
                        />
                        <label class="form-check-label" for="employeelistDelete"> Delete </label>
                      </div>
                    </td>
                  </tr>


                </tbody>
              </table>

              <div className="row my-2 ps-2 mb-4">
                <div class="col-lg-12 ps-4">
                  <p class="fs-12 text-muted mb-">
                    <span class="text-primary font-weight-600">*Note:</span>
                    Please verify once again before adding or updating. Users can access based on the privileges you
                    have assigned.
                  </p>
                </div>
                <div className="col-lg-4 ps-4">
                  <button
                    className="btn action-button w-100"
                    type="submit"
                    @click="submitPrivilegeHandler"
                    v-if="!privilegeExists"
                  >
                    Add Privilege
                  </button>
                  <button
                    className="btn action-button w-100"
                    type="submit"
                    v-if="privilegeExists"
                    @click="updatePrivilegeHandler"
                  >
                    Update Privilege
                  </button>
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
import TopNav from "../components/TopNav.vue";
import { mapState } from "vuex";
import SideBar from "../components/Sidebar.vue";


export default {
  name: "User Privilege",
  components: { TopNav, SideBar},
  data() {
    return {
      addArr: [],
      viewArr: [],
      editArr: [],
      deleteArr: [],
      privilegeExists: false,
      activeID: "",
      update: 0,
      allAddChecked: false,
      allViewChecked: false,
      allEditChecked: false,
      allDeleteChecked: false,
      featuresArr: [
        "customerlist",
        "projectquery",
        "rfq",
        "projectlist",
        "taskflow",
        "collab",
        "resourcelist",
        "purchaseorderlist",
        "invoicelist",
        "accounts_receivable_list",
        "billlist",
        "makepaylist",
        "expenselist",
        "vendorlist",
        "report",
        "banklist",
        "document",
        "employeelist",
      ],
    };
  },

  methods: {
    // auth() {
    //   if (!this.canView) {
    //     this.$router.push("/dashboard");
    //   }
    // },
    toggleAllAdd() {
      if (this.allAddChecked) {
        this.addArr = this.featuresArr;
      } else {
        this.addArr = [];
      }
    },
    toggleAllEdit() {
      if (this.allEditChecked) {
        this.editArr = this.featuresArr;
      } else {
        this.editArr = [];
      }
    },

    toggleAllView() {
      if (this.allViewChecked) {
        this.viewArr = this.featuresArr;
      } else {
        this.viewArr = [];
      }
    },

    toggleAllDelete() {
      if (this.allDeleteChecked) {
        this.deleteArr = this.featuresArr;
      } else {
        this.deleteArr = [];
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

    async fetchData() {
      const id = localStorage.getItem("userID");
      this.$store.dispatch("fetchUserInfo");
      // await
      await this.$store.dispatch("fetchUserPrivilege", id);
    },

    async fetchPrivilegeData() {
      this.activeID = this.$route.params.id;
      const data = new FormData();

      data.append("userID", this.activeID);

      try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/getUserPrivilege`, {
          method: "POST",
          body: data,
        });

        const res = await response.json();

        if (res.message.length) {
          this.privilegeExists = true;

          this.addArr = JSON.parse(res.message[0].Create);
          this.viewArr = JSON.parse(res.message[0].Read);
          this.editArr = JSON.parse(res.message[0].Update);
          this.deleteArr = JSON.parse(res.message[0].Delete);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async submitPrivilegeHandler() {
      this.activeID = this.$route.params.id;
      const data = new FormData();

      data.append("userID", this.activeID);
      data.append("Create", JSON.stringify(this.addArr));
      data.append("Read", JSON.stringify(this.viewArr));
      data.append("Update", JSON.stringify(this.editArr));
      data.append("Delete", JSON.stringify(this.deleteArr));
      data.append("user", this.userInfo.username);

      try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/addPrivileges`, { method: "POST", body: data });

        const res = await response.json();

        if (res.message === true) {
          this.update = this.update + 1;
        }

        console.log(res.message);
      } catch (error) {
        console.error(error);
      }
    },

    async updatePrivilegeHandler() {
      this.activeID = this.$route.params.id;
      const data = new FormData();

      data.append("userID", this.activeID);
      data.append("Create", JSON.stringify(this.addArr));
      data.append("Read", JSON.stringify(this.viewArr));
      data.append("Update", JSON.stringify(this.editArr));
      data.append("Delete", JSON.stringify(this.deleteArr));
      data.append("user", this.userInfo.username);

      try {
        const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/updatePrivilege`, {
          method: "POST",
          body: data,
        });

        const res = await response.json();

        console.log(res.message);

        if (res.message === true) {
          this.update = this.update + 1;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    try {
      await this.fetchData();

      this.auth();
    } catch (error) {
      console.log(error);
    }
    this.fetchPrivilegeData();
  },

  watch: {
    update() {
      this.fetchPrivilegeData();
    },
  },

  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["viewPrivilege"]),
    // canView() {
    //   return this.viewPrivilege.includes("customerlist");
    // },
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
</style>
