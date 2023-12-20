import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddComponent } from './store-add.component';

describe('StoreAddComponent', () => {
  let component: StoreAddComponent;
  let fixture: ComponentFixture<StoreAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreAddComponent]
    });
    fixture = TestBed.createComponent(StoreAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
