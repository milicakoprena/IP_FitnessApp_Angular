import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProgramListComponent } from './custom-program-list.component';

describe('CustomProgramListComponent', () => {
  let component: CustomProgramListComponent;
  let fixture: ComponentFixture<CustomProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomProgramListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
