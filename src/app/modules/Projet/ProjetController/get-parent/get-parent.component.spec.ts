import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetParentComponent } from './get-parent.component';

describe('GetParentComponent', () => {
  let component: GetParentComponent;
  let fixture: ComponentFixture<GetParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
