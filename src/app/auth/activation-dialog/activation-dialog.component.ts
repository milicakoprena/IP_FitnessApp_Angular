import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activation-dialog',
  templateUrl: './activation-dialog.component.html',
  styleUrl: './activation-dialog.component.css',
})
export class ActivationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ActivationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  pin: string;
}
