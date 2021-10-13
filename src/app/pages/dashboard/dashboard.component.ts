import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    {
      const columnDefs = [
        { headerName: "Make", field: 'make' },
        { headerName: "Model", field: 'model' },
        { headerName: "Price", field: 'price' }
    ];
  
    const rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
    }
  
  }
}
