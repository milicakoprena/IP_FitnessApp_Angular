import { Component, OnInit } from '@angular/core';
import { Program } from '../../model/program';
import { UserService } from '../services/user.service';
import { ImageService } from '../../services/image.service';
import { LoginService } from '../../auth/services/login.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-purchased-programs-list',
  templateUrl: './purchased-programs-list.component.html',
  styleUrl: './purchased-programs-list.component.css',
})
export class PurchasedProgramsListComponent implements OnInit {
  programs: Program[] = [];
  listTitle: string = 'Purchased workout programs';
  userId: number = 0;

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUser().id;
    this.loadPrograms();
  }

  private loadImages(images: any[], programImages: any[]): void {
    const observables = images.map((image) =>
      this.imageService.getImageUrl(image.imageUrl)
    );

    forkJoin(observables).subscribe(
      (data) => {
        data.forEach((image) => {
          programImages.push(image);
        });
      },
      (error) => {
        console.error('Error while getting images:', error);
      }
    );
  }

  private loadPrograms(): void {
    let userId = this.loginService.getUser().id;
    this.userService.getProgramsByUserId(userId).subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          const programObservables = data.map((programData: any) => {
            const programImages: any[] = [];
            if (programData.images.length > 0) {
              this.loadImages(programData.images, programImages);
            }

            return this.userService
              .userCompletedProgram(this.userId, programData.id)
              .pipe(
                map((completed: boolean) => {
                  const program = new Program(
                    programData.id,
                    programData.title,
                    programData.description,
                    programData.price,
                    programData.difficultyLevel,
                    programData.duration,
                    programData.location,
                    programData.instructorName,
                    programData.instructorContact,
                    programData.videoUrl,
                    programData.category.name,
                    programData.userCreator,
                    programImages
                  );
                  program.completed = completed;
                  console.log(program);
                  return program;
                })
              );
          });

          forkJoin(programObservables).subscribe(
            (programs: Program[]) => {
              this.programs = programs;
              this.sortPrograms();
            },
            (error: any) => {
              console.error('Error loading completed status:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error consuming programs:', error);
      }
    );
  }

  private sortPrograms(): void {
    this.programs.sort((a, b) => {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    });
  }
}
