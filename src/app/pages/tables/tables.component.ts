import { Component, OnInit } from "@angular/core";
import { ColDef, Module } from 'ag-grid-community';
import { AgGridAngular } from "ag-grid-angular";
import { catchError, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

/* function actionCellRenderer(params) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
<button  class="action-button update"  data-action="update"> update  </button>
<button  class="action-button cancel"  data-action="cancel" > cancel </button>
`;
  } else {
    eGui.innerHTML = `
<button class="action-button edit"  data-action="edit" > edit  </button>
<button class="action-button delete" data-action="delete" > delete </button>
`;
  }

  return eGui;
} */


@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {
  public colDefs;
  public gridApi;
  public gridColumnApi;
  public searchValue;
  public defaultColDef;
  public rowData: [];
  private Id;
  public paginationPageSize;
  public pagination;



constructor(private http: HttpClient) {
  this.pagination = true;

// sets 10 rows per page (default is 100)
this.paginationPageSize = 10;
}


ngOnInit() {
  this.colDefs=[
    {
      headerName:"Client Name",
      field:"client_Name",
      sortable: true,filter: true, resizable: true, checkboxSelection: true/* , editable:true */
    },
    {
      headerName:"Client Address",
      field:"client_Address",
      sortable: true,filter: true, resizable: true, editable: true
    },
    {
      headerName:"Last Service",
      field:"client_Next_Service_Date",
      sortable: true,filter: true, resizable: true, editable: true,cellEditor: 'datePicker'
    },
    {
      headerName:"Next Service",
      field:"next_Service",
      sortable: true,filter: true, resizable: true, editable: true
    },
    {
      headerName:"Client Intervals",
      field:"client_Intervals",
      sortable: true,filter: true, resizable: true, editable: true
    },
    
     {
       headerName:"Client Availability",
       field:"client_Availability",
       sortable: true,filter: true, resizable: true, editable: true
     },
    {
      headerName:"Client Notes",
      field:"client_Notes",
      sortable: true,filter: true, resizable: true, editable: true
    },
     {
       headerName:"Category",
       field:"CategoryID",
       sortable: true,filter: true, resizable: true, editable: true
     }

    
  ]
  this.defaultColDef = {
    editable: true
  };
  this.rowData = null;
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
  console.log('test')
}

}
