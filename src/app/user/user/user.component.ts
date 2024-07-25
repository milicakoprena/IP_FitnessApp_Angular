import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from '../../services/image.service';
import { UserRequest } from '../../model/user-request';
import { UserService } from '../services/user.service';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  form: FormGroup = new FormGroup({});
  update: boolean = true;
  constructor(
    private snackBar: MatSnackBar,
    private imageService: ImageService,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  username: string = '';
  pin: string = '';

  public updateUser(userData: any) {
    if (userData.avatarChanged && userData.avatarFile)
      this.addImage(userData.avatarFile);
    const userRequest: UserRequest = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      mail: userData.mail,
      city: userData.city,
      avatarUrl: userData.avatarUrl,
    };
    console.log(userRequest);

    this.userService.updateUser(userRequest, userData.id).subscribe({
      next: (data) => {
        this.form.reset();
        this.loginService.saveUser(data);
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
      complete: () => {
        this.snackBar.open('Account updated sucessfully!.', undefined, {
          duration: 4000,
        });
      },
    });
  }
  private addImage(avatarFile: File) {
    this.imageService.uploadFile(avatarFile).subscribe({
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
}
