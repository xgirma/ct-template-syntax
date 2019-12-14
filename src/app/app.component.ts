import { Component, ViewChild, ElementRef } from '@angular/core';

import { Customer } from './customer';
import { Car } from './cars';
import { ICar } from './models/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('bindingInput', { static: false }) bindingInput: ElementRef;
  title = 'ct-template-syntax';
  currentCustomer = 'Foo';
  isUnchanged = true;
  customers = [
    new Customer(1, 'Foo'),
    new Customer(2, 'Bar')
  ];

  cars: ICar[] = [
    new Car(1969, 'Kia'),
    new Car(2069, 'Fiat')
  ];

  getVal() {
    return 100;
  }

  deleteCustomer(id) {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }

  getHTMLAttributeValue(): any {
    console.warn('HTML attribute value: ' + this.bindingInput.nativeElement.getAttribute('value'));
  }

  getDOMPropertyValue(): any {
    console.warn('DOM property value: ' + this.bindingInput.nativeElement.value);
  }

  toggleDisabled(): any {
    const testButton = document.getElementById('testButton') as HTMLInputElement;
    testButton.disabled = !testButton.disabled;
    console.warn(testButton.disabled);
  }

  working(): any {
    console.warn('Test Button works!');
  }
}
