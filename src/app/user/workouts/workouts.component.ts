import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from '../services/workouts.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css',
})
export class WorkoutsComponent implements OnInit {
  excercises: any[] = [];
  pagedExcercises: any[] = [];
  length: number = 0;
  pageSize: number = 2;
  pageSizeOptions: number[] = [2];

  constructor(private workoutsService: WorkoutsService) {}

  ngOnInit(): void {
    this.loadExcercises();
  }

  private loadExcercises(): void {
    this.workoutsService.getworkouts().subscribe(
      (data: any) => {
        data.forEach(
          (element: { name: any; instructions: any; difficulty: any }) => {
            this.excercises.push({
              name: element.name,
              instructions: element.instructions,
              difficulty: element.difficulty.toUpperCase(),
            });
          }
        );
        this.pagedExcercises = this.excercises.slice(0, 2);
        this.length = this.excercises.length;
      },
      (error: any) => {
        console.error('Error consuming excercises api:', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedExcercises = this.excercises.slice(startIndex, endIndex);
  }
}
