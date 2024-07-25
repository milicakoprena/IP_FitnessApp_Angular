import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../auth/services/login.service';
import { UserHasProgramService } from '../services/user-has-program.service';
import { UserHasProgramRequest } from '../../model/user-has-program-request';

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrl: './buy-dialog.component.css',
})
export class BuyDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public userId: number = 0;
  public cardSelected: boolean = false;
  public selectedMethod: string = '';
  @Output() purchaseComplete = new EventEmitter<void>();
  constructor(
    public dialogRef: MatDialogRef<BuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userHasProgramService: UserHasProgramService
  ) {}
  ngOnInit(): void {
    this.userId = this.loginService.getUser().id;
    this.form = this.formBuilder.group({
      method: [null, Validators.required],
      card: [null],
    });
  }

  setCardSelected() {
    if (this.selectedMethod === 'Card' || this.selectedMethod === 'PayPal')
      this.cardSelected = true;
    else this.cardSelected = false;
  }

  submitForm() {
    const userHasProgramRequest: UserHasProgramRequest = {
      userId: this.userId,
      programId: this.data.programId,
    };
    this.userHasProgramService
      .addUserHasProgram(userHasProgramRequest)
      .subscribe({
        next: (data) => {
          this.form.reset();
        },
        error: () =>
          this.snackBar.open('An error occured!', undefined, {
            duration: 2000,
          }),
        complete: () => {
          this.snackBar.open('Program bought sucessfully!', undefined, {
            duration: 4000,
          });
          this.purchaseComplete.emit();
          this.dialogRef.close();
        },
      });
  }
}

export interface DialogData {
  programId: number;
}
