import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from '../add/add.component';

describe('TechnologieDialogComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent]
    });
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
