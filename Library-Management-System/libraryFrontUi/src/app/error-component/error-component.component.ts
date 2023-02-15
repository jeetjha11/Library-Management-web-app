import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})
export class ErrorComponentComponent {

  constructor(public dialogRef: MatDialogRef<ErrorComponentComponent>, @Inject(MAT_DIALOG_DATA) public errorMsg: string) {}
}
