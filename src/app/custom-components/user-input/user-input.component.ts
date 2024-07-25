import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../model/user';
import { LoginService } from '../../auth/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent implements OnInit {
  @Input() update: boolean = false;
  user: User | null = null;
  hidePassword: boolean = true;

  public form: FormGroup = new FormGroup({});
  resetAvatar: boolean = false;
  file: string = '';
  public image!: File;
  imageName: string = '';
  avatarChanged: boolean = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private imageService: ImageService,
    private dialog: MatDialog
  ) {}

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  submitForm() {
    this.formSubmitted.emit({
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.username,
      password: this.form.value.password,
      mail: this.form.value.mail,
      city: this.form.value.city,
      avatarUrl: this.imageName,
      avatarFile: this.image,
      avatarChanged: this.avatarChanged,
      id: this.user?.id,
    });
  }

  ngOnInit(): void {
    if (this.update) this.loadUser();
    else {
      this.form = this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        mail: [null, Validators.required],
        username: [null, Validators.required],
        password: [null, Validators.required],
        city: [null, Validators.required],
        avatarFile: [null],
      });
    }

    this.resetAvatar = false;
  }

  private loadUser() {
    this.user = this.loginService.getUser();
    this.form = this.formBuilder.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      mail: [this.user?.mail, Validators.required],
      username: [
        { value: this.user?.username, disabled: true },
        Validators.required,
      ],
      password: [null, Validators.required],
      city: [this.user?.city, Validators.required],
      avatarFile: [null],
    });

    if (this.user?.avatarUrl) {
      this.loadImageUrl(this.user.avatarUrl);
    }
  }

  private loadImageUrl(avatarUrl: string) {
    this.imageService.getImageUrl(avatarUrl).subscribe((data) => {
      this.file = data!;
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.image = files[0];
      this.imageName = files[0].name;
      this.avatarChanged = true;
      this.resetInput();
    }
  }

  resetInput() {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  public openPasswordDialog() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      data: { userId: this.user?.id },
      width: '350px',
    });
  }
}
