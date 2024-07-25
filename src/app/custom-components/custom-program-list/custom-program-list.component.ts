import { Component, Input } from '@angular/core';
import { Program } from '../../model/program';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-custom-program-list',
  templateUrl: './custom-program-list.component.html',
  styleUrls: ['./custom-program-list.component.css'],
})
export class CustomProgramListComponent {
  @Input() programs: Program[] = [];
  ogPrograms: Program[] = [];
  @Input() listTitle: string = '';
  pagedPrograms: Program[] = [];
  length: number = 0;
  pageSize: number = 2;
  pageSizeOptions: number[] = [2];

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.updatePagedPrograms(this.programs);
    this.ogPrograms = this.programs;
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = Math.min(startIndex + event.pageSize, this.length);
    this.pagedPrograms = this.programs.slice(startIndex, endIndex);
  }

  openProgramDetails(item: Program) {
    this.router.navigate(['/programs/program-details', item.id], {
      state: { program: item },
    });
  }

  public showSearchDialog() {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      data: { programs: this.programs },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.programs = result;
        this.updatePagedPrograms(this.programs);
      }
    });
  }

  public showFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: { programs: this.programs },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.programs = result;
        this.updatePagedPrograms(this.programs);
      }
    });
  }

  private updatePagedPrograms(programs: Program[]) {
    this.length = programs.length;
    this.pagedPrograms = programs.slice(0, this.pageSize);
  }

  public resetPrograms() {
    this.programs = this.ogPrograms;
    this.updatePagedPrograms(this.programs);
  }
}
