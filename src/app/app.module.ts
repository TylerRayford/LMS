import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from "@angular/platform-browser";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { LoginComponent } from './pages/login/login.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';
import {MatRadioModule} from '@angular/material/radio';
import { ModalComponent } from "./components/modal/modal.component";
import { DeleteComponent } from "./components/delete/delete.component";
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';

import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import { InactiveComponent } from './pages/inactive/inactive.component';




/* import { ReponseComponent } from './_interfaces/reponse/reponse.component'; */

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    ComponentsModule,
    FlexLayoutModule,
    NgbModule,
    AppRoutingModule,
    /* HttpClient, */
    BrowserModule,
    AgGridModule.withComponents(
      [DashboardComponent]
    ),
    ToastrModule.forRoot(),
    MaterialModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent,LoginComponent, InactiveComponent, /* ReponseComponent */],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
