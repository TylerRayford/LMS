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
import { EditmodalComponent } from "src/app/components/editmodal/editmodal.component";
import { HelpmodalComponent } from "src/app/components/helpmodal/helpmodal.component";
import { environment } from "../../../environments/environment";

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
    baseURL = environment.urlAddress;

  

  constructor(private http: HttpClient, public dialog: MatDialog, @Inject(LOCALE_ID) private locale: string,public modal: MatDialog) {
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
        suppressSizeToFit: true
      },
      {
        headerName:"Client Name",
        field:"client_Name",
        sortable: true,filter: true, resizable: true,suppressSizeToFit: true
      },
      {
        headerName:"Address",
        field:"client_Address",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true
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
      {
        headerName:"Service",
        field:"client_Service",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true
      },
      {
        headerName:"Notes",
        field:"client_Notes",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true
      },
      {
        headerName:"Contact Name",
        field:"client_Contact_Name",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true
      },
      {
        headerName:"Contact Email",
        field:"client_Contact_Email",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true/* ,cellRenderer: (params) => {
          var link = document.createElement('a');
          link.href = '#';
          link.innerText = params.value;
          link.addEventListener('click', (e) => {
              e.preventDefault();
              console.log(params.data.id);
          });
          return link;
        } */
      },
      {
        headerName:"Phone Number",
        field:"client_Contact_Number",
        sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true
      },
      
      
    ]
    this.defaultColDef = {
      editable: true
    };
    this.rowData = null;
    /* this.colDefs.cellRenderer = function(params) {
      return '<b>' + params.value.toUpperCase() + '</b>';
  } */

  }
  
  onGridReady(params){
    this.gridApi=params.api;
    this.gridColumnApi=params.columnApi;
    params.api.sizeColumnsToFit();
    this.http
    .get(this.baseURL + "/client", options)
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
        let id =params.data.id;
        this.dialog.open(EditmodalComponent,{
          data: {
            id: id
          },
          width: '500px',disableClose: true 
        });
        
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
        let id = params.data.id;
      this.http.post<any>(this.baseURL + "/client/delete/"+id,null, options).subscribe(/* data => this.Id = data.id */);
      }

      if (action === "update") {
        params.api.stopEditing(false);
        
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }

  }
  

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
      this.http.put<any>(this.baseURL + "/client/"+id, params.data, options).subscribe(/* data => this.Id = data.id */);
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

  openModal(): void {
    console.log('help')
    const dialogRef = this.modal.open(HelpmodalComponent,{
      width: '640px',disableClose: true 
      
    });

  }

  /* closeModal(){
      this.dialog.closeAll();
    
  } */

}
  
