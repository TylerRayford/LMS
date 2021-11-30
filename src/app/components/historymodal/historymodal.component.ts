import { Component, Inject, LOCALE_ID, OnInit } from "@angular/core";
import { ColDef, Module } from 'ag-grid-community';
import { AgGridAngular } from "ag-grid-angular";
import { catchError, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { MatSelect } from '@angular/material/select';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { formatDate } from "@angular/common";


let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem("token")}`
});

let options = { headers: headers };
@Component({
  selector: 'app-historymodal',
  templateUrl: './historymodal.component.html',
  styleUrls: ['./historymodal.component.scss']
})


export class HistorymodalComponent implements OnInit {
  public colDefs;
  public gridApi;
  public gridColumnApi;
  public searchValue;
  public defaultColDef;
  public rowData: [];
  private Id;
  public paginationPageSize;
  public pagination;
  public gridOptions;
  public girdColumnApi;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    @Inject(LOCALE_ID) private locale: string
    ) 
    {
    this.pagination = true;
    this.paginationPageSize = 10;
  }

  ngOnInit(): void {
    this.colDefs = [
      {
        headerName: "Last Service",
        field: "last_Service",
        sortable: true, filter: true, resizable: true, editable: true, suppressSizeToFit: false,
        cellRenderer: (data) => {
          return  formatDate(data.value, 'MM/dd/yyyy', this.locale);
        }
      },
      {
        headerName: "Next Service",
        field: "next_Service",
        sortable: true, filter: true, resizable: true, editable: true, suppressSizeToFit: false,
        cellRenderer: (data) => {
          return  formatDate(data.value, 'MM/dd/yyyy', this.locale);
        }
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
    params.api.sizeColumnsToFit();
    this.http
    .get("https://localhost:44301/api/client/servicehistory/"+this.data.id, options)
    .subscribe(data=>{
      params.api.setRowData(data)
    })
  }

}
