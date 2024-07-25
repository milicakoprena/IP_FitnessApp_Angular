import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comment } from '../../model/comment';
import { ProgramsService } from '../services/programs.service';
import { LoginService } from '../../auth/services/login.service';
import { CommentRequest } from '../../model/comment-request';
import { CommentService } from '../services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.css',
})
export class CommentsDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public userId: number = 0;
  public comments: Comment[] = [];
  constructor(
    public dialogRef: MatDialogRef<CommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private programsService: ProgramsService,
    private loginService: LoginService,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.userId = loginService.getUser().id;
    this.loadComments();
  }

  private loadComments() {
    this.comments = [];
    this.programsService.getCommentsByProgramId(this.data.programId).subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.comments = data.map((commentData: any) => {
            return new Comment(
              commentData.user.username,
              commentData.content,
              commentData.dateTime
            );
          });
          this.comments.sort((a: Comment, b: Comment) => {
            return (
              new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
            );
          });
        }
      },
      (error: any) => {
        console.error('Error consuming comments:', error);
      }
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: [null, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    const commentRequest: CommentRequest = {
      content: this.form.value.content,
      userId: this.userId,
      programId: this.data.programId,
    };
    console.log(commentRequest);
    this.commentService.addComments(commentRequest).subscribe({
      next: (data) => {
        this.loadComments();
        this.form.reset();
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
      complete: () => {
        this.snackBar.open('Comment added sucessfully!', undefined, {
          duration: 4000,
        });
      },
    });
  }
}
export interface DialogData {
  programId: number;
}
