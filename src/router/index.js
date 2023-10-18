import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { requiresAuth: false },
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: false },
  },

  // customer
  {
    path: "/customerlist",
    name: "customerlist",
    component: () => import("../views/CustomerList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/customerlistview/:id",
    name: "customerlistview",
    component: () => import("../views/CustomerListView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/customeradd",
    name: "customeradd",
    component: () => import("../views/CustomerAdd.vue"),
    meta: { requiresAuth: true },
  },

  // project quotation
  {
    path: "/projectquery",
    name: "projectquery",
    component: () => import("../views/ProjectQuery.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/RFQ",
    name: "RFQ",
    component: () => import("../views/RFQ.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/projectqueryview/:id",
    name: "projectqueryview",
    component: () => import("../views/ProjectQueryView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/projectlist",
    name: "projectlist",
    component: () => import("../views/ProjectList.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/projectlistview/:id",
    name: "projectlistview",
    component: () => import("../views/ProjectListView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/taskflow",
    name: "taskflow",
    component: () => import("../views/TaskFlowView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/collaboration",
    name: "collaboration",
    component: () => import("../views/Collaboration.vue"),
    meta: { requiresAuth: true },
  },

  // {
  //   path: "/singlestatus",
  //   name: "singlestatus",
  //   component: () => import("../views/SingleStatusView.vue"),
  // meta: { requiresAuth: true },
  // },
  {
    path: "/resourcelist",
    name: "resourcelist",
    component: () => import("../views/ResourceList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/addresource",
    name: "addresource",
    component: () => import("../views/AddResource.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/accounts",
    name: "accounts",
    component: () => import("../views/AccountsView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/bankadd",
    name: "bankadd",
    component: () => import("../views/BankAddView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/bankoverview/:id",
    name: "bankoverview",
    component: () => import("../views/BankOverviewView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/projectadd",
    name: "projectadd",
    component: () => import("../views/ProjectAddView.vue"),
    meta: { requiresAuth: true },
  },

  // {
  //   path: "/projectoverview",
  //   name: "projectoverview",
  //   component: () => import("../views/ProjectsOverView.vue"),
  // meta: { requiresAuth: true },
  // },

  {
    path: "/projectque",
    name: "projectque",
    component: () => import("../views/ProjectsQue.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/projectedit/:id",
    name: "projectedit",
    component: () => import("../views/ProjectEditView.vue"),
    meta: { requiresAuth: true },
  },

  // PO

  {
    path: "/purchaseorderlist",
    name: "purchadeorderlist",
    component: () => import("../views/PurchaseOrderListView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/purchaseorderview",
    name: "purchaseorderview",
    component: () => import("../views/PurchaseOrderView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/purchaseorderoverview/:id",
    name: "purchaseorderoverview",
    component: () => import("../views/PurchaseOrderOverview.vue"),
    meta: { requiresAuth: true },
  },

  // {
  //   path: "/poedit/:id",
  //   name: "purchaseorderedit",
  //   component: () => import("../views/PurchaseOrderEditView.vue"),
  // meta: { requiresAuth: true },
  // },

  // RFD Page

  {
    path: "/addRFQ",
    name: "addRFQ",
    component: () => import("../views/addRFQ.vue"),
    meta: { requiresAuth: true },
  },

  // usersetting
  {
    path: "/usersettings",
    name: "usersettings",
    component: () => import("../views/UserSettingsView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/vendoradd",
    name: "vendoradd",
    component: () => import("../views/VendorAddView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/vendorlist",
    name: "vendorlist",
    component: () => import("../views/VendorListView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/vendorview/:id",
    name: "vendorview",
    component: () => import("../views/VendorView.vue"),
    meta: { requiresAuth: true },
  },

  // {
  //   path: "/vendoredit/:id",
  //   name: "vendoredit",
  //   component: () => import("../views/VendorEditView.vue"),
  // meta: { requiresAuth: true },
  // },

  {
    path: "/employeeadd",
    name: "employeeadd",
    component: () => import("../views/EmployeeAddView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/banklist",
    name: "banklist",
    component: () => import("../views/BankList.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/attachmentlist",
    name: "attachmentlist",
    component: () => import("../views/AttachmentlistView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/attachmentadd",
    name: "attachmentadd",
    component: () => import("../views/AttachmentAddView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/employeelist",
    name: "employeelist",
    component: () => import("../views/EmployeeListView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/employeeedit/:id",
    name: "employeeedit",
    component: () => import("../views/EmployeeEditView.vue"),
    meta: { requiresAuth: true },
  },

  // Make Payment
  {
    path: "/makepaylist",
    name: "makepaylist",
    component: () => import("../views/MakePaymentListView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/makepayment",
    name: "makepayment",
    component: () => import("../views/MakePaymentView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/makepayoverview/:id",
    name: "makepayoverview",
    component: () => import("../views/MakePaymentOverview.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/apedit/:id",
    name: "accpayableedit",
    component: () => import("../views/AccPayableEditView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/accounts_receivable_list",
    name: "arlist",
    component: () => import("../views/AccReceivableListView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/accounts_receivable",
    name: "ar",
    component: () => import("../views/AccReceivableView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/arlist/:id",
    name: "accreceivableoverview",
    component: () => import("../views/AccReceivableOverview.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/aredit/:id",
    name: "accreceivableedit",
    component: () => import("../views/AccReceivableEditView.vue"),
    meta: { requiresAuth: true },
  },

  // Invoice Section
  {
    path: "/invoice",
    name: "invoice",
    component: () => import("../views/InvoiceView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/invoicelist",
    name: "invoicelist",
    component: () => import("../views/InvoiceList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/invoiceoverview/:id",
    name: "invoiceoverview",
    component: () => import("../views/InvoiceOverview.vue"),
    meta: { requiresAuth: true },
  },

  // Bill
  {
    path: "/billview",
    name: "billview",
    component: () => import("../views/BillView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/billlist",
    name: "billlist",
    component: () => import("../views/BillList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/billoverview/:id",
    name: "billoverview",
    component: () => import("../views/BillOverview.vue"),
    meta: { requiresAuth: true },
  },

  // Report Section
  {
    path: "/report",
    name: "report",
    component: () => import("../views/Report.vue"),
    meta: { requiresAuth: true },
  },

  // Expense section
  {
    path: "/expense",
    name: "expense",
    component: () => import("../views/ExpenseAdd.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/expenselist",
    name: "expenselist",
    component: () => import("../views/ExpenseList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/expenseoverview/:id",
    name: "expenseoverview",
    component: () => import("../views/ExpenseOverview.vue"),
    meta: { requiresAuth: true },
  },

  // Accounts Head Section

  {
    path: "/accountshead",
    name: "accountshead",
    component: () => import("../views/AccountsHeadList.vue"),
    meta: { requiresAuth: true },
  },

  // Reports Section

  {
    path: "/report/projectlist",
    name: "projectlistreport",
    component: () => import("../views/reports/projects/ProjectListReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/activitylog",
    name: "activitylogreport",
    component: () =>
      import("../views/reports/activitylog/AllactivityLogReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/pendingprojects",
    name: "pendingprojects",
    component: () =>
      import("../views/reports/projects/PendingProjectReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/completedprojects",
    name: "completedprojects",
    component: () => import("../views/reports/projects/CompletedProjects.vue"),
    meta: { requiresAuth: true },
  },

  // Expenses Report

  {
    path: "/report/officeexpenses",
    name: "officeexpenses",
    component: () => import("../views/reports/expense/OfficeExpenseReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/projectexpenses",
    name: "projectexpenses",
    component: () =>
      import("../views/reports/expense/ProjectExpenseReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/allexpenses",
    name: "allexpenses",
    component: () => import("../views/reports/expense/AllExpenseReport.vue"),
    meta: { requiresAuth: true },
  },

  // Accounts Report

  {
    path: "/report/generalledger",
    name: "generalledger",
    component: () =>
      import("../views/reports/accounts/GeneralLedgerReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/journal",
    name: "journal",
    component: () => import("../views/reports/accounts/JournalReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/taxpayable",
    name: "taxpayable",
    component: () => import("../views/reports/accounts/TaxPayableReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/taxreceivable",
    name: "taxreceivable",
    component: () =>
      import("../views/reports/accounts/TaxReceivableReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/totaltransaction",
    name: "totaltransaction",
    component: () =>
      import("../views/reports/accounts/TotalTransactionReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/trialbalance",
    name: "trialbalance",
    component: () => import("../views/reports/accounts/TrialBalanceReport.vue"),
    meta: { requiresAuth: true },
  },

  // Suppliers Report

  {
    path: "/report/totalsuppliers",
    name: "totalsuppliers",
    component: () => import("../views/reports/suppliers/TotalSuppliers.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/report/supplierstotalpaid",
    name: "supplierstotalpaid",
    component: () =>
      import("../views/reports/suppliers/SuppliersTotalPaid.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/supplierstotaldue",
    name: "supplierstotaldue",
    component: () => import("../views/reports/suppliers/SuppliersTotalDue.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/incomestatement",
    name: "incomestatement",
    component: () => import("../views/reports/accounts/IncomeStatement.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/balancesheet",
    name: "balancesheet",
    component: () => import("../views/reports/accounts/BalanceSheet.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/report/totalincoming",
    name: "totalincoming",
    component: () => import("../views/reports/transactions/TotalIncoming.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/totaloutgoing",
    name: "totaloutgoing",
    component: () => import("../views/reports/transactions/TotalOutgoing.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/report/totalreceivable",
    name: "totalreceivable",
    component: () =>
      import("../views/reports/transactions/TotalReceivable.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/report/totalresource",
    name: "totalresource",
    component: () => import("../views/reports/resources/AllResources.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/report/transferedresource",
    name: "transferedresource",
    component: () =>
      import("../views/reports/resources/TransferedResources.vue"),
    meta: { requiresAuth: true },
  },

  // User privilege

  {
    path: "/userprivilege/:id",
    name: "userprivilege",
    component: () => import("../views/UserPrivilege.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isAuthenticated = false;
  const token = localStorage.getItem("token");
  const data = new FormData();
  data.append("token", token);

  try {
    const response = await fetch(
      `${process.env.VUE_APP_SERVER_URL}/getUsersByToken`,
      {
        method: "POST",
        body: data,
      }
    );

    const res = await response.json();
    if (res.message.length > 0) {
      isAuthenticated = true;
    } else {
      localStorage.removeItem("token");
      isAuthenticated = false;
    }
  } catch (error) {
    console.error(error);
    isAuthenticated = false;
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    next("/");
  } else {
    next();
  }
});

export default router;
