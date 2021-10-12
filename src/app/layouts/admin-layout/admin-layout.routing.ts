import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

import { MapComponent } from "../../pages/map/map.component";

import { TablesComponent } from "../../pages/tables/tables.component";


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "maps", component: MapComponent },
  { path: "tables", component: TablesComponent },
];
