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
import { HistorymodalComponent } from './historymodal/historymodal.component';
import { LinkComponent } from './link/link.component';
import { EditmodalComponent } from './editmodal/editmodal.component';
import { HelpmodalComponent } from './helpmodal/helpmodal.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule,MaterialModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, DialogComponent, SavedialogComponent, LinkComponent, HelpmodalComponent, /* HistorymodalComponent, */ /* ModalComponent, DeleteComponent */],
  exports: [FooterComponent, NavbarComponent, SidebarComponent]
})
export class ComponentsModule {}
