import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisplayComponent } from './admin-display.component';

describe('AdminDisplayComponent', () => {
  let component: AdminDisplayComponent;
  let fixture: ComponentFixture<AdminDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
