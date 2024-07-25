import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../model/category';
import { CategoryService } from '../../programs/services/category.service';
import { ProgramsService } from '../../programs/services/programs.service';
import { forkJoin } from 'rxjs';
import { AttributeService } from '../../programs/services/attribute.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css'],
})
export class FilterDialogComponent implements OnInit {
  public form: FormGroup;
  categories: Category[] = [];
  selectedCategory: number = 0;
  attributes: any[] = [];
  selectedAttribute: any[] = [];
  values: any[] = [];
  selectedAttributeValues: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    public fb: FormBuilder,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
    private programsService: ProgramsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
    this.form = fb.group({
      category: [''],
      difficultyLevel: [''],
      location: [''],
      duration: [null],
      creator: [''],
      instructorName: [''],
      attribute: [[]],
      attributeValue: [[]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  public showAttributes(): void {
    this.categoryService
      .getAttributesByCategoryId(this.selectedCategory)
      .subscribe(
        (data: any[]) => {
          if (data.length > 0) {
            this.attributes = data;
            this.form.get('attribute')?.setValue([]);
          }
        },
        (error: any) => {
          console.error('Error consuming attributes:', error);
        }
      );
  }

  public showValues(): void {
    this.values = [];
    this.selectedAttribute.forEach((value) => {
      this.attributeService.getAttributeValuesByAttributeId(value).subscribe(
        (data: any[]) => {
          if (data.length > 0) {
            data.forEach((d) => {
              this.values.push(d);
            });
            this.form.get('attributeValue')?.setValue([]);
          }
        },
        (error: any) => {
          console.error('Error consuming values:', error);
        }
      );
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

  public filter(): void {
    const filterValues = this.form.value;
    const categoryName = this.categories.find((category) => {
      return category.id === this.selectedCategory;
    })?.name;
    const selectedValues: any[] = [];
    this.selectedAttributeValues.forEach((sV) => {
      this.values.map((v) => {
        if (v.id === sV) selectedValues.push(v.value);
      });
    });

    const programAttributesObservables = this.data.programs.map((program) =>
      this.programsService.getAttributesByProgramId(program.id)
    );

    forkJoin(programAttributesObservables).subscribe((programAttributes) => {
      const filteredPrograms = this.data.programs.filter((program, index) => {
        const programAttrs = programAttributes[index].map(
          (attr) => attr.attribute.id
        );

        const programValues = programAttributes[index].map(
          (attr) => attr.value
        );

        return (
          (!filterValues.category || program.category == categoryName) &&
          (!filterValues.difficultyLevel ||
            program.difficultyLevel === filterValues.difficultyLevel) &&
          (!filterValues.location ||
            program.location === filterValues.location) &&
          (filterValues.attribute.length === 0 ||
            (filterValues.attribute.every((attr: any) => {
              return programAttrs.includes(attr);
            }) &&
              (selectedValues.length === 0 ||
                selectedValues.every((value: any) => {
                  return programValues.includes(value);
                }))))
        );
      });

      this.dialogRef.close(filteredPrograms);
    });
  }
}

export interface DialogData {
  programs: any[];
}
