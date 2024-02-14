import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddSpecComponent;
  let fixture: ComponentFixture<AddSpecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSpecComponent]
    });
    fixture = TestBed.createComponent(AddSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
