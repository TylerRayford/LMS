import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { MapComponent } from "../../pages/map/map.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AgGridAngular, AgGridModule } from "ag-grid-angular";
import { HistoryComponent } from "src/app/pages/history/history.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { ModalDismissReasons, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "src/app/pages/login/login.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ModalComponent } from "src/app/components/modal/modal.component";
import { DeleteComponent } from "src/app/components/delete/delete.component";
import { MaterialModule } from "src/app/material/material.module";
import { RegisterUserComponent } from "src/app/authentication/register-user/register-user.component";

@NgModule({
  imports: [
    
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AgGridModule,
    
    MaterialModule
    /* HttpClient */
  ],
  declarations: [
    /* LoginComponent, */
    DashboardComponent,
    TablesComponent,
    MapComponent,
    HistoryComponent,
    ModalComponent,
    DeleteComponent,
    /* RegisterUserComponent */
  ]
})
export class AdminLayoutModule {}
