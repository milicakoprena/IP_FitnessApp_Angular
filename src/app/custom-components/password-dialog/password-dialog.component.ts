import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PasswordRequest } from '../../model/password-request';
import { UserService } from '../../user/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.css',
})
export class PasswordDialogComponent implements OnInit {
  public form: FormGroup;
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    private userService: UserService,
    public fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
    this.form = fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  public changePassword(): void {
    let passwordRequest: PasswordRequest = {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
    };
    this.userService
      .changePassword(passwordRequest, this.data.userId)
      .subscribe((data) => {
        if (data === true) {
          this.snackBar.open('Password changed!', undefined, {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Password change failed!', undefined, {
            duration: 2000,
          });
        }
        this.form.reset();
        this.dialogRef.close();
      });
  }
}

export interface DialogData {
  userId: number;
}
