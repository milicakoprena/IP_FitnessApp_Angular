import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgramsListComponent } from './my-programs-list.component';

describe('MyProgramsListComponent', () => {
  let component: MyProgramsListComponent;
  let fixture: ComponentFixture<MyProgramsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProgramsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgramsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
