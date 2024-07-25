import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImageRequest } from '../../model/image-request';
import { ProgramRequest } from '../../model/program-request';
import { LoginService } from '../../auth/services/login.service';
import { User } from '../../model/user';
import { ProgramsService } from '../../programs/services/programs.service';
import { ImageService } from '../../services/image.service';
import { Category } from '../../model/category';
import { CategoryService } from '../../programs/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../../programs/category-dialog/category-dialog.component';
import { ProgramHasAttributeRequest } from '../../model/program-has-attribute-request';
import { ProgramHasAttributeService } from '../../programs/services/program-has-attribute.service';
@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrl: './new-program.component.css',
})
export class NewProgramComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  private images: ImageRequest[] = [];
  private user: User = this.loginService.getUser();
  private imageFiles: File[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  selectedAttributeValues: Map<number, any[]> = new Map<number, any[]>();
  private programId: number = 0;

  @ViewChild('videoUrlField') videoUrlField: any;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private programService: ProgramsService,
    private loginService: LoginService,
    private imageService: ImageService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private programHasAttributeService: ProgramHasAttributeService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      duration: [null, Validators.required],
      instructorName: [null, Validators.required],
      instructorContact: [null, Validators.required],
      category: [null, Validators.required],
      difficultyLevel: [null, Validators.required],
      location: [null, Validators.required],
      selectedImages: [[]],
      videoUrl: [null],
    });
    this.loadCategories();

    this.form.get('location')?.valueChanges.subscribe((value) => {
      if (value === 'ONLINE') {
        this.form.get('videoUrl')?.setValidators([Validators.required]);
      } else {
        this.form.get('videoUrl')?.clearValidators();
      }

      this.form.get('videoUrl')?.updateValueAndValidity();
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.categories = data.map((categoryData: any) => {
            return new Category(categoryData.id, categoryData.name);
          });
        }
      },
      (error: any) => {
        console.error('Error consuming categories:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        this.images.push({
          imageUrl: file.name,
          programId: 0,
        });
        this.imageFiles.push(file);
      }
    }
  }

  addNewProgram() {
    const programRequest: ProgramRequest = {
      title: this.form.value.title,
      description: this.form.value.description,
      price: this.form.value.price,
      difficultyLevel: this.form.value.difficultyLevel,
      duration: this.form.value.duration,
      location: this.form.value.location,
      instructorName: this.form.value.instructorName,
      instructorContact: this.form.value.instructorContact,
      videoUrl: this.form.value.videoUrl ? this.form.value.videoUrl : '',
      categoryId: this.form.value.category,
      userCreatorId: this.user.id,
      images: this.images,
    };
    this.programService.addNewProgram(programRequest).subscribe({
      next: (data) => {
        this.programId = data.id;
        this.uploadImages();
        this.addAttributeValues();
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
      complete: () => {
        this.snackBar.open('Program created sucessfully!', undefined, {
          duration: 4000,
        });
      },
    });
  }

  private uploadImages() {
    for (const file of this.imageFiles) {
      this.imageService.uploadFile(file).subscribe({
        next: () => {},
        error: () =>
          this.snackBar.open(
            'An error occurred while uploading photo!',
            undefined,
            { duration: 2000 }
          ),
        complete: () => {
          this.snackBar.open('Photo successfully uploaded!', undefined, {
            duration: 4000,
          });
        },
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: { category: this.selectedCategory },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.selectedAttributeValues = result;
      console.log(result);
    });
  }

  private addAttributeValues() {
    this.selectedAttributeValues.forEach((value, key) => {
      for (let element of value) {
        const programHasAttributeRequest: ProgramHasAttributeRequest = {
          programId: this.programId,
          attributeId: key,
          value: element,
        };

        this.programHasAttributeService
          .addNewValue(programHasAttributeRequest)
          .subscribe({
            next: () => {},
            error: () =>
              this.snackBar.open('An error occured!', undefined, {
                duration: 2000,
              }),
            complete: () => {
              this.snackBar.open(
                'Attribute value added sucessfully!',
                undefined,
                {
                  duration: 4000,
                }
              );
            },
          });
      }
    });
  }
}
