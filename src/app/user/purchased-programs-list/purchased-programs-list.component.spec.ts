import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedProgramsListComponent } from './purchased-programs-list.component';

describe('PurchasedProgramsListComponent', () => {
  let component: PurchasedProgramsListComponent;
  let fixture: ComponentFixture<PurchasedProgramsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasedProgramsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchasedProgramsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
