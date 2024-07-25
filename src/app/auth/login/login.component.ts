import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginRequest } from '../../model/login-request';
import { MatDialog } from '@angular/material/dialog';
import { ActivationDialogComponent } from '../activation-dialog/activation-dialog.component';
import { RegisterService } from '../services/register.service';
import { AccountActivationRequest } from '../../model/account-activation-request';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  username: string = '';
  password: string = '';
  pin: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

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
      },
    });
  }

  public login() {
    const request: LoginRequest = {
      username: this.form.value.username,
      password: this.form.value.password,
    };
    this.username = this.form.value.username;

    this.loginService.login(request).subscribe({
      next: (response: any) => {
        if (response === null) {
          this.snackBar.open('Please activate your account first.', undefined, {
            duration: 2000,
          });
          this.openDialog();
        } else {
          this.loginService.saveAccessToken(response.token);
          const loggedInUser: User = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            username: response.username,
            city: response.city,
            avatarUrl: response.avatarUrl,
            mail: response.mail,
            status: response.status,
          };
          this.loginService.saveUser(loggedInUser);
          this.snackBar.open('Succesfull login!', undefined, {
            duration: 2000,
          });
          this.router.navigate(['/user/account']);
        }
      },
    });
  }
}
