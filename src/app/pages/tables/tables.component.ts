import { Component, OnInit } from "@angular/core";
import { ColDef } from 'ag-grid-community';

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {

  columnDefs: ColDef[] = [

    { field: 'Client_Name',sortable: true,filter: true },
    { field: 'Last_Service',sortable: true,filter: true },
    { field: 'Next_Service',sortable: true,filter: true },
    
    

];

rowData = [
    { Client_Name: 'Tyler',Last_Service: '10/21/2021',Next_Service: '11/15/2021', },
    { Client_Name: 'Spencer',Last_Service: '05/12/2021',Next_Service: '05/29/2021', },
    { Client_Name: 'Jacob',Last_Service: '1/1/2019',Next_Service: '1/15/2019', },
];
  constructor() {}

  ngOnInit() {}
}
