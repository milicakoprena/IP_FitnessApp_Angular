import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Program } from '../../model/program';
import { MatDialog } from '@angular/material/dialog';
import { CustomImageGalleryComponent } from '../../custom-components/custom-image-gallery/custom-image-gallery.component';
import { ProgramsService } from '../services/programs.service';
import { AttributesDialogComponent } from '../attributes-dialog/attributes-dialog.component';
import { LoginService } from '../../auth/services/login.service';
import { UserService } from '../../user/services/user.service';
import { CommentsDialogComponent } from '../comments-dialog/comments-dialog.component';
import { BuyDialogComponent } from '../buy-dialog/buy-dialog.component';
import { VideoDialogComponent } from '../../custom-components/video-dialog/video-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.css',
})
export class ProgramDetailsComponent implements OnInit {
  @Output() program: Program | null = null;
  attributesMap: Map<any, string[]> = new Map<any, string[]>();
  isLoggedIn: boolean = false;
  userId: number = 0;
  userHasProgram: boolean = false;
  userCreatedProgram: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private programsService: ProgramsService,
    private loginService: LoginService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.program =
      this.router.getCurrentNavigation()?.extras.state?.['program'];
    if (loginService.isAuthenticated()) {
      this.isLoggedIn = true;
      this.userId = loginService.getUser().id;
      if (this.program) {
        userService
          .userHasProgram(this.userId, this.program.id)
          .subscribe((data) => {
            this.userHasProgram = data;
          });
      }
      this.userCreatedProgram = this.userId === this.program?.userCreator.id;
    }
  }

  ngOnInit(): void {}

  showPhotoAlbum() {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(CustomImageGalleryComponent, {
      panelClass: 'dialogPanel',
      data: { images: this.program?.images },
    });
  }

  openCommentsDialog(): void {
    this.dialog.open(CommentsDialogComponent, {
      data: { programId: this.program?.id },
      width: '600px',
    });
  }

  openBuyDialog() {
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      data: { programId: this.program?.id },
      width: '400px',
    });

    dialogRef.componentInstance.purchaseComplete.subscribe(() => {
      this.userHasProgram = true;
    });
  }

  isProgramOnline() {
    return this.program?.location.toString() === 'ONLINE';
  }

  openVideoDialog() {
    console.log('open');
  }

  public showVideo() {
    this.dialog.open(VideoDialogComponent, {
      data: { videoUrl: this.program?.videoUrl },
    });
  }

  showAttributes() {
    const programId = this.program?.id;
    if (programId) {
      this.programsService
        .getAttributesByProgramId(programId)
        .subscribe((data) => {
          if (data.length > 0) {
            const resultMap = data.reduce((map, element) => {
              const { attribute, value } = element;
              if (!map.has(attribute.name)) {
                map.set(attribute.name, []);
              }
              map.get(attribute.name)?.push(value);
              return map;
            }, new Map<any, string[]>());

            this.dialog.open(AttributesDialogComponent, {
              data: { attributesMap: resultMap },
            });
          }
        });
    } else {
      console.error('Program Id is undefined.');
    }
  }

  public deleteProgram() {
    this.programsService.delete(this.program?.id!).subscribe((error) => {
      console.log(error);
    });
    this.snackBar.open('Program deleted', undefined, {
      duration: 4000,
    });
    this.router.navigateByUrl('/user/my-programs');
  }
}
