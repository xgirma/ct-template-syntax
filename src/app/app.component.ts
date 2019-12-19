import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Customer } from './customer';
import { Car } from './cars';
import { ICar } from './models/car';
import { Item } from './models/item';

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
  itemImageUrl = 'https://images.unsplash.com/photo-1519058497187-7167f17c6daf';
  myStyles = {
    'background-color': 'lime',
    'font-size': '20px',
    'font-weight': 'bold'
  };
  message = 'Type here';
  parentItem = 'Parent item passed to child';
  parentItems: Item[] = [
    {
      id: 21,
      name: 'phone'
    },
    {
      id: 22,
      name: 'iPad'
    }
  ];
  evilTitle = 'Template <script>alert("evil never sleeps")</script> Syntax';
  isSpecial = true;
  itemName = 'ItemName';
  items = ['Car', 'Boat', 'Private Jet'];
  red: any = 'red';
  blue: any = 'blue';
  green: any = 'green';
  submitMessage;

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

  onSubmit(itemForm) {
    this.submitMessage = itemForm.value.name;
  }
}
