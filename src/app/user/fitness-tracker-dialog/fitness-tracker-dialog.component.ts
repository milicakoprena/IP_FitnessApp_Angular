import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FitnessTrackerService } from '../services/fitness-tracker.service';
import {
  ExerciseType,
  FitnessTrackerRequest,
  Intensity,
} from '../../model/fitness-tracker-request';

@Component({
  selector: 'app-fitness-tracker-dialog',
  templateUrl: './fitness-tracker-dialog.component.html',
  styleUrl: './fitness-tracker-dialog.component.css',
})
export class FitnessTrackerDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public exerciseTypes: string[] = Object.keys(ExerciseType).filter((item) => {
    return isNaN(Number(item));
  });
  public intensities: string[] = Object.keys(Intensity).filter((item) => {
    return isNaN(Number(item));
  });
  public averageDuration = 60;
  @Output() entryComplete = new EventEmitter<void>();
  constructor(
    public dialogRef: MatDialogRef<FitnessTrackerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private fitnessTrackerService: FitnessTrackerService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      exerciseType: [null, Validators.required],
      intensity: [null, Validators.required],
      weight: [null, Validators.required],
      duration: [null, Validators.required],
    });
    this.form.patchValue({
      weight: this.data.latestWeight,
      duration: this.averageDuration,
    });
  }

  submitForm() {
    const fitnessTrackerRequest: FitnessTrackerRequest = {
      exerciseType: this.form.value.exerciseType,
      intensity: this.form.value.intensity,
      weight: this.form.value.weight,
      duration: this.form.value.duration,
      userId: this.data.userId,
    };
    console.log(fitnessTrackerRequest);
    this.fitnessTrackerService.addTracker(fitnessTrackerRequest).subscribe({
      next: (data) => {
        this.form.reset();
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, {
          duration: 2000,
        }),
      complete: () => {
        this.snackBar.open('Entry added sucessfully!', undefined, {
          duration: 4000,
        });
        this.entryComplete.emit();
        this.dialogRef.close();
      },
    });
  }
}

export interface DialogData {
  userId: number;
  latestWeight: number;
}
