import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ListItemComponent } from './list-item/list-item.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, ListItemComponent, ItemDetailComponent
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

  it('template $event object', async () => {
    expect(compiled.querySelector('#eventObject > p').textContent)
      .toEqual('Text Not submitted yet.');
    const submitText = fixture.debugElement.query(By.css('#eventObject > button'));
    submitText.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('#eventObject > p').textContent)
      .toEqual('Text Submitted successfully!');
  });

  it('two-way binding', async () => {
    expect(compiled.querySelector('#twoWayBinding > p').textContent)
      .toEqual('Type here');

    const inputBox = fixture.debugElement.query(By.css('#twoWayBinding > input')).nativeElement;
    inputBox.value = 'Foo Bar';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('#twoWayBinding > p').textContent)
      .toEqual('Foo Bar');
  });

  it('HTML attribute vs DOM property', async () => {
    const inputBox = fixture.debugElement.query(By.css('#htmlAtt > input')).nativeElement;
    expect(inputBox.getAttribute('value')).toEqual('Sarah');
    expect(inputBox.value).toEqual('Sarah');

    inputBox.value = 'Foo';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const inputBoxNow = fixture.debugElement.query(By.css('#htmlAtt > input')).nativeElement;
    expect(inputBoxNow.getAttribute('value')).toEqual('Sarah');
    expect(inputBoxNow.value).toEqual('Foo');
  });

  it('should toggle using ngClass and ngStyle', async () => {
    component.isSpecial = true;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('.special').textContent).toEqual('This div is special');
    expect(compiled.querySelector('#styleTest').getAttribute('style'))
      .toEqual('font-size: x-large;');
  });

  it('should toggle using ngClass and ngStyle', async () => {
    component.isSpecial = false;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('.special')).toEqual(null);
    expect(compiled.querySelector('#styleTest').getAttribute('style'))
      .toEqual('font-size: smaller;');
  });

  it('ngModel', async () => {
    const placeHolder = 'Item name place holder';
    component.itemName = placeHolder;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('#teaPot > p').textContent)
      .toEqual(`Item name: ${placeHolder}`);

    const inputBox = fixture.debugElement.query(By.css('#teaPot > input')).nativeElement;
    inputBox.value = 'Foo Bar';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('#teaPot > p').textContent)
      .toEqual(`Item name: Foo Bar`);
  });
});
