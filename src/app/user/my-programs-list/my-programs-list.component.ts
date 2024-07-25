import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ImageService } from '../../services/image.service';
import { Program } from '../../model/program';
import { forkJoin } from 'rxjs';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-my-programs-list',
  templateUrl: './my-programs-list.component.html',
  styleUrl: './my-programs-list.component.css',
})
export class MyProgramsListComponent {
  programs: Program[] = [];
  listTitle: string = 'Workout programs';

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
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
        console.error('Eror while getting images:', error);
      }
    );
  }

  private loadPrograms(): void {
    let userId = this.loginService.getUser().id;
    this.userService.getProgramsByCreatorId(userId).subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.programs = data.map((programData: any) => {
            const programImages: any[] = [];
            if (programData.images.length > 0) {
              this.loadImages(programData.images, programImages);
            }
            return new Program(
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
          });
        }
      },
      (error: any) => {
        console.error('Error consuming programs:', error);
      }
    );
  }
}
