import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { AttributeService } from '../services/attribute.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.css',
})
export class CategoryDialogComponent {
  attributes: any[] = [];
  attributeValuesMap: Map<number, any[]> = new Map<number, any[]>();
  selectedAttributes: any[] = [];
  selectedAttributeValues: Map<number, any[]> = new Map<number, any[]>();

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private categoryService: CategoryService,
    private attributeService: AttributeService
  ) {
    this.getAttributesByCategoryId();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(): void {
    this.dialogRef.close(this.selectedAttributeValues);
  }

  private getAttributesByCategoryId() {
    this.categoryService
      .getAttributesByCategoryId(this.data.category)
      .subscribe((data) => {
        this.attributes = data;
        this.attributes.forEach((attribute) => {
          this.attributeValuesMap.set(attribute.id, []);
          this.getValues(attribute.id);
        });
      });
  }

  getValues(attributeId: number): void {
    this.attributeService
      .getAttributeValuesByAttributeId(attributeId)
      .subscribe((data) => {
        if (data.length > 0) {
          const currentValues = this.attributeValuesMap.get(attributeId) || [];
          currentValues.push(...data);
          this.attributeValuesMap.set(attributeId, currentValues);
        }
      });
  }

  onValueChange(selectedValues: any[], attributeId: number): void {
    this.selectedAttributeValues.set(attributeId, selectedValues);
  }
}

export interface DialogData {
  category: number;
}
