import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css'],
})
export class SearchDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
    this.form = fb.group({
      title: [''],
      description: [''],
      price: [null],
      duration: [null],
      creator: [''],
      instructorName: [''],
    });
  }

  ngOnInit(): void {}

  public search(): void {
    const filterValues = this.form.value;
    const filteredPrograms = this.data.programs.filter((program) => {
      return (
        (!filterValues.title ||
          program.title
            .toLowerCase()
            .includes(filterValues.title.toLowerCase())) &&
        (!filterValues.description ||
          program.description
            .toLowerCase()
            .includes(filterValues.description.toLowerCase())) &&
        (!filterValues.price || program.price == filterValues.price) &&
        (!filterValues.duration || program.duration == filterValues.duration) &&
        (!filterValues.creator ||
          program.userCreator.firstName
            .toLowerCase()
            .includes(filterValues.creator.toLowerCase())) &&
        (!filterValues.instructorName ||
          program.instructorName
            .toLowerCase()
            .includes(filterValues.instructorName.toLowerCase()))
      );
    });

    this.dialogRef.close(filteredPrograms);
  }
}

export interface DialogData {
  programs: any[];
}
