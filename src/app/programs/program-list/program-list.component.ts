import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../services/programs.service';
import { Program } from '../../model/program';
import { ImageService } from '../../services/image.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.css',
})
export class ProgramListComponent implements OnInit {
  programs: Program[] = [];
  listTitle: string = 'Workout programs';

  constructor(
    private programsService: ProgramsService,
    private imageService: ImageService
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
    this.programsService.getPrograms().subscribe(
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
