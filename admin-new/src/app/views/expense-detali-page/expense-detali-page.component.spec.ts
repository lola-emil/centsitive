import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDetaliPageComponent } from './expense-detali-page.component';

describe('ExpenseDetaliPageComponent', () => {
  let component: ExpenseDetaliPageComponent;
  let fixture: ComponentFixture<ExpenseDetaliPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseDetaliPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseDetaliPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
