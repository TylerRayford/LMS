import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ModalComponent } from './modal/modal.component';
import { DeleteComponent } from './delete/delete.component';
import { MaterialModule } from "../material/material.module";
import { DialogComponent } from './dialog/dialog.component';
import { SavedialogComponent } from './savedialog/savedialog.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule,MaterialModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, DialogComponent, SavedialogComponent, /* ModalComponent, DeleteComponent */],
  exports: [FooterComponent, NavbarComponent, SidebarComponent]
})
export class ComponentsModule {}
