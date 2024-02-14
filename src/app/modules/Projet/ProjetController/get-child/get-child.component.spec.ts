import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetChildComponent } from './get-child.component';

describe('GetChildComponent', () => {
  let component: GetChildComponent;
  let fixture: ComponentFixture<GetChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
