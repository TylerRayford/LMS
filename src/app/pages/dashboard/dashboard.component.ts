import { Component, OnInit } from "@angular/core";
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from "ag-grid-angular";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    public colDefs;
    public gridApi;
    public gridColumnApi;
    public searchValue;


  /* columnDefs: ColDef[] = [
    { field: 'client_Name',sortable: true,filter: true, resizable: true, checkboxSelection: true },
    { field: 'client_Address',sortable: true,filter: true, resizable: true },
    { field: 'client_Region',sortable: true,filter: true, resizable: true},
    { field: 'client_Zip_Code',sortable: true,filter: true, resizable: true},
    { field: 'client_Contact_Name',sortable: true,filter: true, resizable: true},
    { field: 'client_Contact_Email',sortable: true,filter: true, resizable: true},
    { field: 'client_Phone_Number',sortable: true,filter: true, resizable: true},
    { field: 'client_Active',sortable: true,filter: true, resizable: true},
    { field: 'client_Service',sortable: true,filter: true, resizable: true},
    { field: 'client_Intervals',sortable: true,filter: true, resizable: true},
    { field: 'client_Availability',sortable: true,filter: true, resizable: true},
    { field: 'client_Notes',sortable: true,filter: true, resizable: true},
]; */

/* rowData: Observable<any[]>; */


  constructor(private http: HttpClient) {
    /* this.rowData = this.http.get<any[]>('https://localhost:44301/api/client'); */
    
    
  }

  ngOnInit() {
    this.colDefs=[
      {
        headerName:"Client Name",
        field:"client_Name",
        sortable: true,filter: true, resizable: true, checkboxSelection: true
      },
      {
        headerName:"Client Address",
        field:"client_Address",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Region",
        field:"client_Region",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Zip Code",
        field:"client_Zip_Code",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Contact Name",
        field:"client_Contact_Name",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Contact Email",
        field:"client_Contact_Email",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Phone Number",
        field:"clieclient_Phone_Numbernt_Name",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Active",
        field:"client_Active",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Service",
        field:"client_Service",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Intervals",
        field:"client_Intervals",
        sortable: true,filter: true, resizable: true
      },
      
      {
        headerName:"Client Availability",
        field:"client_Availability",
        sortable: true,filter: true, resizable: true
      },
      {
        headerName:"Client Notes",
        field:"client_Notes",
        sortable: true,filter: true, resizable: true
      }
      
    ]

  }
  onGridReady(params){
    this.gridApi=params.api;
    this.gridColumnApi=params.columnApi;
    this.http
    .get("https://localhost:44301/api/client")
    .subscribe(data=>{
      params.api.setRowData(data)
    })

  }
  quickSearch(){
    this.gridApi.setQuickFilter(this.searchValue);
  }
  
}
