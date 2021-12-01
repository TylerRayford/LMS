import { Component, OnDestroy } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnDestroy {
  private params: any;
    public url = 'http://foo/bar';
    agInit(params: any): void {
        this.params = params;
    }
  constructor() { }


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  

}
