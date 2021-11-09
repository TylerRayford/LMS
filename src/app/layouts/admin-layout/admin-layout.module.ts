import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { MapComponent } from "../../pages/map/map.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AgGridAngular, AgGridModule } from "ag-grid-angular";
import { HistoryComponent } from "src/app/pages/history/history.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    AgGridModule,
    /* HttpClient */
  ],
  declarations: [
    DashboardComponent,
    TablesComponent,
    MapComponent,
    HistoryComponent,
  ]
})
export class AdminLayoutModule {}
