import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-attributes-dialog',
  templateUrl: './attributes-dialog.component.html',
  styleUrl: './attributes-dialog.component.css',
})
export class AttributesDialogComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<AttributesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  ngAfterViewInit(): void {}
}

export interface DialogData {
  attributesMap: Map<any, string[]>;
}
