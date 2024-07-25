import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { RegisterRequest } from '../../model/register-request';
import { MatDialog } from '@angular/material/dialog';
import { ActivationDialogComponent } from '../activation-dialog/activation-dialog.component';
import { AccountActivationRequest } from '../../model/account-activation-request';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({});
  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private imageService: ImageService
  ) {}

  username: string = '';
  pin: string = '';

  openDialog(): void {
    const dialogRef = this.dialog.open(ActivationDialogComponent, {
      data: { pin: this.pin },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed ' + result);
      this.pin = result;
      this.activateAccount();
    });
  }

  public addimage(image: File) {
    this.imageService.uploadFile(image).subscribe({
      next: () => {},
      error: () =>
        this.snackBar.open(
          'An error occured while uploading profile photo!',
          undefined,
          { duration: 2000 }
        ),
      complete: () => {
        this.snackBar.open('Profile photo successfully uploaded!', undefined, {
          duration: 4000,
        });
      },
    });
  }

  public activateAccount() {
    const accountActivationRequest: AccountActivationRequest = {
      username: this.username,
      pin: this.pin,
    };
    this.registerService.activate(accountActivationRequest).subscribe({
      next: () => {},
      error: () =>
        this.snackBar.open(
          'An error occured while activating your account!',
          undefined,
          { duration: 2000 }
        ),
      complete: () => {
        this.snackBar.open(
          'Your account was activated successfully!',
          undefined,
          {
            duration: 4000,
          }
        );
        this.router.navigate(['/auth/login']).then(() => {});
      },
    });
  }

  public register(userData: any) {
    console.log(userData);
    if (userData.avatarFile) this.addimage(userData.avatarFile);
    const registerRequest: RegisterRequest = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      password: userData.password,
      mail: userData.mail,
      city: userData.city,
      avatarUrl: userData.avatarUrl,
    };

    this.username = userData.username;
    this.registerService.register(registerRequest).subscribe({
      next: () => {
        this.openDialog();
        this.form.reset();
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
      complete: () => {
        this.snackBar.open(
          'Account created sucessfully! PIN has been sent to your e-mail. Please activate account.',
          undefined,
          {
            duration: 4000,
          }
        );
      },
    });
  }
}
