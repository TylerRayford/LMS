import { Component, OnInit } from "@angular/core";
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

let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem("token")}`
});

let options = { headers: headers };

export interface User {
  name: string;
}



@Component({
  selector: "app-history",
  templateUrl: "history.component.html"
})
export class HistoryComponent implements OnInit {
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

  myControl = new FormControl();
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;

  constructor(private http: HttpClient, private route: ActivatedRoute,) {
    this.pagination = true;
    this.paginationPageSize = 10;
  }


  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );

    this.colDefs = [
      {
        headerName: "Last Service",
        field: "last_Service",
        sortable: true, filter: true, resizable: true, editable: true, suppressSizeToFit: false
      },
      {
        headerName: "Next Service",
        field: "next_Service",
        sortable: true, filter: true, resizable: true, editable: true, suppressSizeToFit: true
      }

    ]
    this.defaultColDef = {
      editable: true
    };
    this.rowData = null;

  }
  onGridReady(params) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this.http
      .get("https://localhost:44301/api/client/servicehistory/"+ id, options)
      .subscribe(data => {
        params.api.setRowData(data)
      })
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
