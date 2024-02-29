import Company from "./pages/CompanyPage";
import ClientPage from "./pages/ClientPage";
import ServicesPage from "./pages/ServicesPage";
import Auth from "./pages/Auth";
import Main from "./pages/MainPage";
import FAQ from "./pages/FAQPage";

import {
  CLIENT_ROUTE,
  COMPANY_ROUTE,
  FAQ_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SERVICES_ROUTE,
  SERVICE_ROUTE,
  MAIN_ROUTE
} from "./utils/consts";

export const authRoutes = [
  {
    path: COMPANY_ROUTE,
    Component: Company,
  },
  {
    path: CLIENT_ROUTE,
    Component: ClientPage,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: SERVICES_ROUTE,
    Component: ServicesPage,
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
