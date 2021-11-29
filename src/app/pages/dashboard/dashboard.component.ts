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
}


@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
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

  constructor(private http: HttpClient, public dialog: MatDialog, @Inject(LOCALE_ID) private locale: string) {
    // enables pagination in the grid
        this.pagination = true;

// sets 10 rows per page (default is 100)
      this.paginationPageSize = 10;

  }

  ngOnInit() {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    
    this.colDefs=[

      {
        headerName: "",
        minWidth: 150,
        cellRenderer: actionCellRenderer,
        editable: false,
        colId: "action",
        suppressSizeToFit: false
      },
      {
        headerName:"Client Name",
        field:"client_Name",
        sortable: true,filter: true, resizable: true,suppressSizeToFit: false
      },
      {
        headerName:"Address",
        field:"client_Address",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: false
      },
      {
        headerName:"Intervals",
        field:"client_Intervals",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true
      },
      {
        headerName:"Next Service",
        field:"client_Next_Service_Date",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true,
        cellRenderer: (data) => {
          return  formatDate(data.value, 'MM/dd/yyyy', this.locale);
        }
      },
      /* {
        headerName:"Region",
        field:"client_Region",
        sortable: true,filter: true, resizable: true, editable: true
      },
      {
        headerName:"Zip Code",
        field:"client_Zip_Code",
        sortable: true,filter: true, resizable: true, editable: true
      }, */
      {
        headerName:"Contact Name",
        field:"client_Contact_Name",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: false
      },
      {
        headerName:"Contact Email",
        field:"client_Contact_Email",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: false
      },
      {
        headerName:"Phone Number",
        field:"client_Phone_Number",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: false
      },
      /* {
        headerName:"Active",
        field:"client_Active",
        sortable: true,filter: true, resizable: true, editable: true
      }, */
      /* {
        headerName:"Availability",
        field:"client_Availability",
        sortable: true,filter: true, resizable: true, editable: true
      }, */
      {
        headerName:"Notes",
        field:"client_Notes",
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
    .get("https://localhost:44301/api/client", options)
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
      this.http.post<any>("https://localhost:44301/api/client/delete/"+id,null, options).subscribe(/* data => this.Id = data.id */);
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
      this.http.put<any>("https://localhost:44301/api/client/"+id, params.data, options).subscribe(/* data => this.Id = data.id */);
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
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent,{
      width: '640px',disableClose: true 
      
    });

  }

}
  
