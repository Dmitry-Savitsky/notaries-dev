import Employees from "./pages/EmployeesPage";
import Accounting from "./pages/AccountingPage";
import Services from "./pages/ServicesPage";
import Auth from "./pages/Auth";
import Main from "./pages/MainPage";
import FAQ from "./pages/FAQPage";

import {
  ACCOUNTING_ROUTE,
  EMPLOYEES_ROUTE,
  FAQ_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SERVICES_ROUTE,
  MAIN_ROUTE
} from "./utils/consts";

export const authRoutes = [
  {
    path: EMPLOYEES_ROUTE,
    Component: Employees,
  },
  {
    path: ACCOUNTING_ROUTE,
    Component: Accounting,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: SERVICES_ROUTE,
    Component: Services,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: FAQ_ROUTE,
    Component: FAQ,
  }
];
