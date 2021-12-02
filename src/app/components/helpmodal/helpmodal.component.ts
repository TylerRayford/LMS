import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-helpmodal',
  templateUrl: './helpmodal.component.html',
  styleUrls: ['./helpmodal.component.scss']
})
export class HelpmodalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

}
