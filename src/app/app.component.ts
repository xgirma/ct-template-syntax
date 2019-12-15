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
  @ViewChild('firstName', { static: false }) nameInputRef: ElementRef;
  currentCustomer = 'Foo';
  cars: ICar[] = [
    new Car(1969, 'Kia'),
    new Car(2069, 'Fiat')
  ];
  fullName: string;
  customers = [
    new Customer(1, 'Foo'),
    new Customer(2, 'Bar')
  ];
  text = 'Text Not submitted yet.';
  flower = 'https://images.unsplash.com/photo-1519058497187-7167f17c6daf';
  myStyles = {
    'background-color': 'lime',
    'font-size': '20px',
    'font-weight': 'bold'
  };
  message = 'Type here';

  getVal() {
    return 100;
  }

  show(firstNameInput: HTMLInputElement) {
    this.fullName = firstNameInput.value + ' ' + 'Foo';
  }

  deleteCustomer(id) {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }

  submitText($event) {
    this.text = 'Text Submitted successfully!';
  }

  hasError() {
    return true;
  }
}
