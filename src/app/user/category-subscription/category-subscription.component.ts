import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../programs/services/category.service';
import { UserHasCategoryService } from '../services/user-has-category.service';
import { LoginService } from '../../auth/services/login.service';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-subscription',
  templateUrl: './category-subscription.component.html',
  styleUrls: ['./category-subscription.component.css'],
})
export class CategorySubscriptionComponent implements OnInit {
  categories: { id: number; name: string; selected: boolean }[] = [];
  initialCategories: { id: number; selected: boolean }[] = [];
  userId: number = 0;

  constructor(
    private categoryService: CategoryService,
    private userHasCategoryService: UserHasCategoryService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUser().id;
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        this.categories.forEach((category) => {
          this.userHasCategoryService
            .userHasCategory(this.userId, category.id)
            .subscribe((isSelected: boolean) => {
              category.selected = isSelected;
              this.initialCategories.push({
                id: category.id,
                selected: isSelected,
              });
            });
        });
      },
      (error: any) => {
        console.error('Error consuming categories', error);
      }
    );
  }

  onSelectionChange(event: MatSelectionListChange) {
    const selectedOptions = event.source.options.toArray();
    selectedOptions.forEach((option) => {
      const selectedOptionId = option.value;
      const selectedCategory = this.categories.find(
        (category) => category.id === selectedOptionId
      );
      if (selectedCategory) {
        selectedCategory.selected = option.selected;
      }
    });
  }

  saveChanges() {
    this.categories.forEach((category) => {
      const initialCategory = this.initialCategories.find(
        (c) => c.id === category.id
      );
      if (initialCategory && initialCategory.selected !== category.selected) {
        if (category.selected) {
          this.userHasCategoryService
            .addUserCategory(this.userId, category.id)
            .subscribe({
              next: () => {
                this.snackBar.open(
                  `Category ${category.name} added successfully.`,
                  undefined,
                  { duration: 2000 }
                );
                initialCategory.selected = true;
              },
              error: (err) => {
                this.snackBar.open('Error adding category', undefined, {
                  duration: 2000,
                });
              },
            });
        } else {
          this.userHasCategoryService
            .removeUserCategory(this.userId, category.id)
            .subscribe({
              next: () => {
                this.snackBar.open(
                  `Category ${category.name} removed successfully.`,
                  undefined,
                  { duration: 2000 }
                );
                initialCategory.selected = false;
              },
              error: (err) => {
                this.snackBar.open('Error removing category', undefined, {
                  duration: 2000,
                });
              },
            });
        }
      }
    });
  }
}
