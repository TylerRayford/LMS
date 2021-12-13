import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from "@angular/core";
import { ColDef, Module } from 'ag-grid-community';
import { AgGridAngular } from "ag-grid-angular";
import { catchError, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalComponent } from "src/app/components/modal/modal.component";
import { DeleteComponent } from "src/app/components/delete/delete.component";
import { formatDate } from "@angular/common";
import { environment } from "../../../environments/environment";
import { ManageusershelpmodalComponent } from "src/app/components/manageusershelpmodal/manageusershelpmodal.component";

let headers = new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': `Bearer ${localStorage.getItem("token")}`
});

let options = {headers: headers};


function actionCellRenderer(params) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
<button  class="action-button update"  data-action="update"> Submit  </button>
<button  class="action-button cancel"  data-action="cancel" > cancel </button>
`;
  } else {
    eGui.innerHTML = `
<button class="action-button delete" data-action="delete" > delete </button>
`;
  }

  return eGui;
}

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.scss']
})
export class ManageusersComponent implements OnInit {
    public colDefs;
    public gridApi;
    public gridColumnApi;
    public searchValue;
    public defaultColDef;
    public rowData: [];
    private Id;
    public paginationPageSize;
    public pagination;
    public components;
    baseURL = environment.urlAddress;

  constructor(private http: HttpClient, public dialog: MatDialog, @Inject(LOCALE_ID) private locale: string,public modal: MatDialog) {
    // enables pagination in the grid
        this.pagination = true;

// sets 10 rows per page (default is 100)
      this.paginationPageSize = 10;

  }

  ngOnInit(): void {
    this.colDefs=[

      {
        headerName: "",
        minWidth: 150,
        cellRenderer: actionCellRenderer,
        editable: false,
        colId: "action",
        suppressSizeToFit: true
      },
      {
        headerName:"Username",
        field:"userName",
        sortable: true,filter: true, resizable: true, editable: false,suppressSizeToFit: false
      },
      {
        headerName:"First Name",
        field:"firstName",
        sortable: true,filter: true, resizable: true,suppressSizeToFit: false
      },
      {
        headerName:"Last Name",
        field:"lastName",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: false
      },
    ]
    this.defaultColDef = {
      editable: true
    };
    /* this.components = { datePicker: getDatePicker() }; */
    this.rowData = null;
  }
  onGridReady(params){
    this.gridApi=params.api;
    this.gridColumnApi=params.columnApi;
    params.api.sizeColumnsToFit();
    this.http
    .get(this.baseURL + "/accounts/ActiveUsers", options)
    .subscribe(data=>{
      params.api.setRowData(data)
    })
    

  }
  quickSearch(){
    this.gridApi.setQuickFilter(this.searchValue);
    
  }
  onCellClicked(params) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
        let id = params.data.id;
      this.http.post<any>(this.baseURL + "/accounts/delete/"+id,null, options).subscribe(/* data => this.Id = data.id */);
      }

      if (action === "update") {
        params.api.stopEditing(false);
        
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }

  }
  
  /* onRowClicked(event: any) {

    this.dialog.open(ModalComponent);
  } */

  onRowEditingStarted(params) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true,

    
    });
  }
  onRowEditingStopped(params) {
    this.gridApi=params.gridApi;
      this.gridColumnApi=params.columnApi;
      let id = params.data.id;
      this.http.put<any>(this.baseURL + "/accounts/"+id, params.data, options).subscribe(/* data => this.Id = data.id */);
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true,
    });
    setTimeout(
      function(){ 
      location.reload(); 
      }, 1000);
  }
  openModal(): void {
    console.log('help')
    const dialogRef = this.modal.open(ManageusershelpmodalComponent,{
      width: '640px',disableClose: true 
      
    });

  }

}
