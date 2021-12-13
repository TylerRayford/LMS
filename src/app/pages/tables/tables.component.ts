import { Component, Inject, LOCALE_ID, OnInit } from "@angular/core";
import { ColDef, Module } from 'ag-grid-community';
import { AgGridAngular } from "ag-grid-angular";
import { catchError, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { DatePipe, formatDate } from "@angular/common";
import { Router } from "@angular/router";
import { ModalComponent } from "src/app/components/modal/modal.component";
import { MatDialog } from "@angular/material/dialog";
import { HistorymodalComponent } from "src/app/components/historymodal/historymodal.component";
import { environment } from "../../../environments/environment";
import { googlemapsComponent } from "../googlemaps/googlemaps.component";
import { NextservicehelpmodalComponent } from "src/app/components/nextservicehelpmodal/nextservicehelpmodal.component";

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
<button  class="action-button update"  data-action="update"> Confirm  </button>
<button  class="action-button cancel"  data-action="cancel" > Cancel </button>
`;
  } else {
    eGui.innerHTML = `
<button class="action-button edit"  data-action="edit" > Serviced  </button>
<button class="action-button edit"  data-action="history" > History  </button>
<button class="action-button edit"  data-action="directions" > Directions  </button>
`;
  }

  return eGui;
}


@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html",
  providers: [DatePipe]
})
export class TablesComponent implements OnInit {
  public colDefs;
  public gridApi;
  public gridColumnApi;
  public searchValue;
  public defaultColDef;
  private Id;
  public paginationPageSize;
  public pagination;
  public destinationAddress;
  baseURL = environment.urlAddress;
    
  dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  }, {validators: this.dateLessThan('start', 'end')});

  dateLessThan(from: string, to: string) {
    console.log('dateless');
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[from];
     let t = group.controls[to];
     if (f.value > t.value) {
       console.log('dateerror');
       return {
         dates: "Start Date should be less than End Date"
       };
     }
     return {};
    }
  }


constructor(private http: HttpClient, private datePipe: DatePipe, public dialog: MatDialog ,@Inject(LOCALE_ID) private locale: string, private router: Router,public modal: MatDialog) {
  this.pagination = true;

// sets 10 rows per page (default is 100)
this.paginationPageSize = 30;
}


ngOnInit() {

  this.colDefs=[
    {
      headerName: "",
      minWidth: 320,
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action",
      suppressSizeToFit: false,
      resizable: false
    },
    {
      headerName:"Client Name",
      field:"client_Name",
      sortable: true,filter: true, resizable: true, checkboxSelection: false, editable: false,suppressSizeToFit: false
    },
    {
      headerName:"Client Address",
      field:"client_Address",
      sortable: true,filter: true, resizable: true, editable: false,suppressSizeToFit: false
    },
    {
      headerName:"Last Service",
      field:"client_Last_Service_Date",
      sortable: true,filter: true, resizable: true, editable: false,
      cellRenderer: (data) => {
        console.log('date' + data.value);
        if(data.value !== '0001-01-01T00:00:00') {
          return  formatDate(data.value, 'MM/dd/yyyy', this.locale);
        }
      }
    },
    {
      headerName:"Next Service",
      field:"client_Next_Service_Date",
      sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true,
      cellRenderer: (data) => {
        if(data.value !== '1900-01-01T00:00:00') {
          return  formatDate(data.value, 'MM/dd/yyyy', this.locale);
        }
      }
    },
    {
      headerName:"Client Intervals",
      field:"client_Intervals",
      sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: true
    },
    {
      headerName:"Client Notes",
      field:"client_Notes",
      sortable: true,filter: true, resizable: true, editable: true,suppressSizeToFit: false
    }

    
  ]
  this.defaultColDef = {
    editable: true
  };
  
  
}

onGridReady(params){
   this.gridApi=params.api;
  this.gridColumnApi=params.columnApi;
  params.api.sizeColumnsToFit();
 }

public validateControl = (controlName: string) => {
  return this.dateRange.controls[controlName].invalid && this.dateRange.controls[controlName].touched
}

public hasError = (controlName: string, errorName: string) => {
  return this.dateRange.controls[controlName].hasError(errorName)
}

quickSearch(){
  this.gridApi.setQuickFilter(this.searchValue);
}

rowData: Observable<any[]>;

generateReport(){
  console.log('generatereport');
  let startDate = this.dateRange.get('start').value;
  let endDate = this.dateRange.get('end').value;
  startDate = this.datePipe.transform(startDate, "MM/dd/yyyy");
  endDate = this.datePipe.transform(endDate, "MM/dd/yyyy");
  
  let params = new HttpParams();
  params = params.append ('startdate', startDate);
  params = params.append('enddate', endDate);

  this.rowData = this.http
  .get<any>(this.baseURL + "/client/nextService", {headers: headers, params: params });
  
  
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
    this.http.post<any>(this.baseURL + "/client/delete/"+id,null, options).subscribe(/* data => this.Id = data.id */);
    }

    if (action === "update") {
      params.api.stopEditing(false);
      
    }

    if (action === "cancel") {
      params.api.stopEditing(true);
    }
    if (action === "history") {
      let id =params.data.id;
      this.dialog.open(HistorymodalComponent,{
        data: {
          id: id
        },
        width: '500px',disableClose: true 
      });
      
    }
    if (action === "directions") {
      let address =params.data.client_Address;
      this.dialog.open(googlemapsComponent,{
        data: {
            destinationAddress: address
        },
        width: '1000px',disableClose: false 
      });
      
    }
    
  }
}

onRowEditingStarted(params) {
  params.api.refreshCells({
    columns: ["action"],
    rowNodes: [params.node],
    force: true
  });
}
onRowEditingStopped(params) {
  this.gridApi=params.gridApi;
    this.gridColumnApi=params.columnApi;
    let id = params.data.id;
    this.http.post<any>(this.baseURL + "/client/serviceconfirmation/"+id, params.data, options).subscribe();
    
    
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
  const dialogRef = this.modal.open(NextservicehelpmodalComponent,{
    width: '640px',disableClose: true 
    
  });

}

}
