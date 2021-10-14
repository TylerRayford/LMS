import { Component, OnInit } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: [ "dashboard.scss"]
})

export class DashboardComponent implements OnInit {

  columnDefs = 
  [
    {headerName: "Make", field: "make"},
    {headerName: "Model", field: "model"},
    {headerName: "Price", field: "price"}
  ];

  rowData =
  [
    {make: 'Toyota', model: 'Celica', price: 35000 },
    {make: 'Ford', model: 'Modeo', price: 32000 },
    {make: 'Porche', model: 'Boxter', price: 72000 }
  ]
  constructor() 
  {
    {
     

    }

  }

  ngOnInit() {}
  
}
