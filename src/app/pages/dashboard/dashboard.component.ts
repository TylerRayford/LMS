import { Component, OnInit } from "@angular/core";
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from "ag-grid-angular";



@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html"
})

export class DashboardComponent implements OnInit {

  columnDefs: ColDef[] = [
    { field: 'Client_Name',sortable: true,filter: true },
    { field: 'Client_Address',sortable: true,filter: true },
    { field: 'Client_Region',sortable: true,filter: true},
    { field: 'Client_Zip_Code',sortable: true,filter: true},
    { field: 'Client_Contact_Name',sortable: true,filter: true},
    { field: 'Client_Contact_Email',sortable: true,filter: true},
    { field: 'Client_Phone_Number',sortable: true,filter: true},
    { field: 'Client_Active',sortable: true,filter: true},
    { field: 'Client_Service',sortable: true,filter: true},
    { field: 'Client_Intervals',sortable: true,filter: true},
    { field: 'Client_Availability',sortable: true,filter: true},
    { field: 'Client_Notes',sortable: true,filter: true},
    
    

];

rowData = [
    { Client_Name: 'Tyler', Client_Address: 'Bossier', Client_Region: 'Dogwood', Client_Zip_Code: '64467',Client_Contact_Name: 'Jacob',Client_Contact_Email: 'testssssssssssssssssss@gmail.com',Client_Phone_Number: '318-426-9822', },
    { Client_Name: 'Scott', Client_Address: 'Shreveport', Client_Region: 'University City', Client_Zip_Code: '63367',Client_Contact_Name: 'Charles',Client_Contact_Email: 'test@yahoo.com',Client_Phone_Number: '318-426-9822', },
    { Client_Name: 'Ashley', Client_Address: 'New Orleans', Client_Region: 'St. Charles', Client_Zip_Code: '22212',Client_Contact_Name: 'Rayford',Client_Contact_Email: 'test@hotmail.com',Client_Phone_Number: '318-426-9822', }
];
  constructor() {
    
  }

  ngOnInit()
  {
    
  }
  
  
}
