import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIndexComponent } from './category-index.component';

describe('CategoryIndexComponent', () => {
  let component: CategoryIndexComponent;
  let fixture: ComponentFixture<CategoryIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryIndexComponent]
    });
    fixture = TestBed.createComponent(CategoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
