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
  currentCustomer = 'Foo';
  cars: ICar[] = [
    new Car(1969, 'Kia'),
    new Car(2069, 'Fiat')
  ];

  fullName: string;
  // Reference firstNameInput variable inside Component
  @ViewChild('firstName', { static: false }) nameInputRef: ElementRef;

  customers = [
    new Customer(1, 'Foo'),
    new Customer(2, 'Bar')
  ];

  getVal() {
    return 100;
  }

  show(firstNameInput: HTMLInputElement) {
    this.fullName = firstNameInput.value + ' ' + 'Foo';
  }

  deleteCustomer(id) {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }
}
