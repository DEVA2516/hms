import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportingstaffdashboardComponent } from './supportingstaffdashboard.component';

describe('SupportingstaffdashboardComponent', () => {
  let component: SupportingstaffdashboardComponent;
  let fixture: ComponentFixture<SupportingstaffdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportingstaffdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportingstaffdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
