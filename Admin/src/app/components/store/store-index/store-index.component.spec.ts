import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreIndexComponent } from './store-index.component';

describe('StoreIndexComponent', () => {
  let component: StoreIndexComponent;
  let fixture: ComponentFixture<StoreIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreIndexComponent]
    });
    fixture = TestBed.createComponent(StoreIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
