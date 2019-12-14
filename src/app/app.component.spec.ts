import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ FormsModule, ReactiveFormsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('interpolation', () => {
    expect(compiled.querySelector('#interpolation').textContent).toContain(component.currentCustomer);
  });

  it('interpolation: expression', () => {
    expect(compiled.querySelector('#expression').textContent).toContain('102');
  });

  it('template input variable', () => {
    expect(component.cars.length).toEqual(2);
    const cars = fixture.debugElement.queryAll(By.css('.cars'));
    expect(cars[0].nativeElement.textContent).toContain(component.cars[0].make);
  });

  it('template reference variable', async () => {
    expect(compiled.querySelector('#fullName')).toBeNull();
    const inputBox = fixture.debugElement.query(By.css('#templateRefVariable > input')).nativeElement;
    inputBox.value = 'Bar';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const show = fixture.debugElement.query(By.css('#templateRefVariable > button'));
    show.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('#fullName').textContent).toContain('Bar');
  });

  it('template statements', async () => {
    const customers = fixture.debugElement.queryAll(By.css('#templateStatements > li > button'));
    expect(customers.length).toEqual(2);
    customers[0].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const customersNow = fixture.debugElement.queryAll(By.css('#templateStatements > li > button'));
    expect(customersNow.length).toEqual(1);
  });
});
