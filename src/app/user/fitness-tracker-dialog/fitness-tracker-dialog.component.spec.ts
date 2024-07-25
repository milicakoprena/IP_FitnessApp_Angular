import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessTrackerDialogComponent } from './fitness-tracker-dialog.component';

describe('FitnessTrackerDialogComponent', () => {
  let component: FitnessTrackerDialogComponent;
  let fixture: ComponentFixture<FitnessTrackerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FitnessTrackerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FitnessTrackerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
