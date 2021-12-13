import { Routes } from "@angular/router";
import { RegisterUserComponent } from "src/app/authentication/register-user/register-user.component";

import { HistoryComponent } from "src/app/pages/history/history.component";
import { InactiveComponent } from "src/app/pages/inactive/inactive.component";
import { InactiveloginusersComponent } from "src/app/pages/inactiveloginusers/inactiveloginusers.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { ManageusersComponent } from "src/app/pages/manageusers/manageusers.component";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

import { MapComponent } from "../../pages/map/map.component";

import { TablesComponent } from "../../pages/tables/tables.component";

/* This adds the route to the certain page on the sidebar */
export const AdminLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "dashboard", component: DashboardComponent },
  { path: "maps", component: MapComponent },
  { path: "tables", component: TablesComponent },
  { path: "history", component: HistoryComponent},
  { path: "register", component: RegisterUserComponent},
  { path: "inactive", component: InactiveComponent},
  { path: "manageusers", component: ManageusersComponent},
  { path: "inactiveloginusers", component: InactiveloginusersComponent}
  
];
