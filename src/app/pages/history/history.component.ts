import { Component, OnInit } from "@angular/core";
import { ColDef } from "ag-grid-community";


@Component({
  selector: "app-history",
  templateUrl: "history.component.html"
})
export class HistoryComponent implements OnInit {

  columnDefs: ColDef[] = [

    { field: 'Client_Name',sortable: true,filter: true },
    { field: 'Product',sortable: true,filter: true },
    { field: 'Delivered_By',sortable: true,filter: true },
    { field: 'Last_Service',sortable: true,filter: true },
    { field: 'Next_Service',sortable: true,filter: true },
    
    

];

rowData = [
    { Client_Name: 'Tyler',Product: 'AED' ,Delivered_By: 'Nicole',Last_Service: '10/21/2021',Next_Service: '11/15/2021', },
    { Client_Name: 'Spencer',Product: 'PPE' ,Delivered_By: 'Nicole',Last_Service: '05/12/2021',Next_Service: '05/29/2021', },
    { Client_Name: 'Jacob',Product: 'Eye-Wash' ,Delivered_By: 'Nicole',Last_Service: '1/1/2019',Next_Service: '1/15/2019', },
];
  constructor() {}

  ngOnInit() {}
}
