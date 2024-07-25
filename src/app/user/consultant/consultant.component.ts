import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../auth/services/login.service';
import { MessageRequest } from '../../model/message-request';
import { MessageService } from '../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrl: './consultant.component.css',
})
export class ConsultantComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  private userId: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUser().id;
    this.form = this.formBuilder.group({
      content: [null, Validators.required],
    });
  }

  submitForm() {
    const messageRequest: MessageRequest = {
      content: this.form.value.content,
      userId: this.userId,
    };
    this.messageService.addMessage(messageRequest).subscribe({
      next: (data) => {
        this.form.reset();
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
      complete: () => {
        this.snackBar.open('Message sent sucessfully!', undefined, {
          duration: 4000,
        });
      },
    });
  }
}
