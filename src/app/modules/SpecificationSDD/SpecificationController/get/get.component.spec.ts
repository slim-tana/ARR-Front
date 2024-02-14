import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GetComponent } from './get.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [GetComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GetComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FrontEnd'`, () => {
    const fixture = TestBed.createComponent(GetComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FrontEnd');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(GetComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('FrontEnd app is running!');
  });
});
