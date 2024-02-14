import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContComponent } from './add.component';

describe('AddContComponent', () => {
  let component: AddContComponent;
  let fixture: ComponentFixture<AddContComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContComponent]
    });
    fixture = TestBed.createComponent(AddContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
