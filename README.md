# Components & Templates: Template Syntax
[![Build Status](https://travis-ci.com/xgirma/ct-template-syntax.svg?branch=master)](https://travis-ci.com/xgirma/ct-template-syntax)

[Live Demo](https://xgirma.github.io/ct-template-syntax/)
## HTML in templates
HTML is the language of the Angular template. Almost all HTML syntax is valid template syntax. 

The \<script\> element is a notable exception; it is forbidden, eliminating the risk of script injection attacks. 
    
In practice, \<script\> is ignored and a warning appears in the browser console.

## Interpolation {{...}} link
Interpolation refers to embedding expressions into marked up text.
```html
<h3>Current customer: {{ currentCustomer }}</h3>

```

The text between the braces is a template expression that Angular first evaluates and then converts to a string.
```html
<p>The sum of 1 + 1 is {{1 + 1}}.</p>
<p>The sum of 1 + 1 is not {{1 + 1 + getVal()}}.</p>

```

An expression may also refer to properties of the template's context such as a **template input variable**, 
let _cars_, or a **template reference variable**, #firstNameInput.


```html
<ul>
  <li *ngFor="let car of cars">{{car.make}} {{car.year}}</li>
</ul>

```
_template input variable_

    The customer in {{car.make}} refers to the template input variable, not the component's property.

```html
<p *ngIf="fullName" id="fullName">Full Name: {{fullName}}</p>
<label id="templateRefVariable">
  First Name:
  <input type="text" #firstNameInput>
  <button (click)="show(firstNameInput)">Show</button>
</label>

```
_template reference variable_

**Template expressions cannot refer to anything in the global namespace**, except undefined. They can't refer to window or document. Additionally, **they can't call console.log() or Math.max()** and they are restricted to referencing members of the expression context.

## Expression guidelines
When using template expressions follow these guidelines:

1. Simplicity
   
2. Quick execution
    
3. No visible side effects
    
Angular executes template expressions after every change detection cycle. Change detection cycles are triggered by many asynchronous activities such as promise resolutions, HTTP results, timer events, key presses and mouse moves.
Expressions should finish quickly or the user experience may drag, especially on slower devices. Consider caching values when their computation is expensive.

A template expression should not change any application state other than the value of the target property.

## Template statements
A template statement responds to an **event** raised by a binding target such as an element, component, or directive. 
Template statement appearing in quotes to the right of the = symbol as in (event)="statement". e.g. _(click)="deleteCustomer(customer.id)"_

```html
<ul>
  <li *ngFor="let customer of customers">
    {{customer.name}} :
    <button (click)="deleteCustomer(customer.id)">Delete {{customer.name}}</button></li>
</ul>

```

Template expressions cannot refer to anything in the global namespace, except undefined. 
They can't refer to window or document. Additionally, they can't call console.log() or 
Math.max() and they are restricted to referencing members of the expression context.

A template statement has a side effect. That's the whole point of an event. 

It's how you update application state from user action.
    
Responding to events is the other side of Angular's "unidirectional data flow". You're free to change anything, anywhere, during this turn of the event loop.

However, certain JavaScript syntax is not allowed:

1. new

2. increment and decrement operators, ++ and --

3. operator assignment, such as += and -=

4.the bitwise operators | and &

## Statement context
As with expressions, statements can refer only to what's in the statement context such as an event handling method of the component instance.
The statement context is typically the component instance. The deleteHero in (click)="deleteCustomer(customer.id)" is a method of the data-bound component.

```html
<ul>
  <li *ngFor="let customer of customers">
    {{customer.name}} :
    <button (click)="deleteCustomer(customer.id)">Delete {{customer.name}}</button></li>
</ul>

```

The statement context may also refer to properties of the template's own context
    
1. template $event object
     
2. template input variable (let customer), and 
    
3. template reference variable (#firstNameInput)

### The template $event object
```html
<div>
  <p>{{ text }}</p>
  <button class="btn" (click)='submit($event)'>Submit</button>
</div>

```

### A template input variable (let hero)

```html
<ul id="templateStatements">
  <li *ngFor="let customer of customer">
    {{customer.name}} :
    <button (click)="deleteCustomer(customer.id)">Delete {{customer.name}}</button>
  </li>
</ul>

```

### a template reference variable (#firstNameInput)

```html
<label id="templateRefVariable">
  First Name:
  <input type="text" #firstNameInput>
  <button (click)="show(firstNameInput)">Show</button>
</label>

```
Template statements cannot refer to anything in the global namespace. They can't refer to window or document. They can't call console.log or Math.max.

As with expressions, avoid writing complex template statements. A method call or simple property assignment should be the norm.

## Binding syntax: an overview
You could push values to and pull values from HTML. 

Angular provides many kinds of data-binding

1. source-to-view

2. view-to-source

3. view-to-source-to-view

### source-to-view
| Type  | Syntax |
|---|---|
| Interpolation  | {{expression}}  |
| Property  | \[target\]="expression"  |
| Attribute | bind-target="expression" |
| Class  |   |
| Style  |   |

```html
<p>The sum of 1 + 1 is {{1 + 1}}.</p>

```
_binding: interpolation_

```html
<p id="interpolation">Current customer: {{ currentCustomer }}</p>

```
_binding: property_

```html
<div>
  <img [src]="itemImageUrl" height="250px" />
</div>

```
_binding: attribute_

```html
<div [className]="hasError()? 'red' : 'green'">Class binding</div>

```
_binding: class_

```html
<p [ngStyle]="myStyles">
  Quite something!
</p>

```
_binding: style_

### view-to-source
| Type  | Syntax |
|---|---|
| Event  | \(target\)="statement"  |
|  | on-target="statement" |

```html
<ul id="templateStatements">
  <li *ngFor="let customer of customers">
    {{customer.name}} :
    <button (click)="deleteCustomer(customer.id)">Delete {{customer.name}}</button>
  </li>
</ul>
```
_binding: event_

### view-to-source-to-view
| Type  | Syntax |
|---|---|
| Two-way  | \[\(target\)\)="expression"  |
|  | bindon-target="expression" |

```html
<label>
  <p>{{message}}</p>
  <input type="text" [(ngModel)]="message">
</label>
```
_binding: two-way_

Binding types other than interpolation have a target name to the left of the equal sign, either surrounded by punctuation, **[] or ()**, or preceded by a prefix: **bind-, on-, bindon-**.

The target of a binding is the property or event inside the binding punctuation: **[], () or \[()\]**.

## HTML attributes vs. DOM property
The distinction between an **HTML attribute** and a **DOM property** is key to understanding how Angular binding works.

It is important to remember that HTML attribute and the DOM property are different things, even when they have the same name. In Angular, **the only role of HTML attributes is to initialize element and directive state.**

Attributes initialize DOM properties and then they are done. Property values can change; attribute values can't.

```html
<label id="htmlAtt">
  Enter your name:
  <input type="text" value="Sarah">
</label>

```

```javascript
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

```
_example test for html attribute vs dom property_

When the user enters "Sally" into the <input>, the DOM element value property becomes "Sally". However, if you look at the HTML attribute value using input.getAttribute('value'), you can see that the attribute remains unchanged—it returns "Sarah".

```html
<input [disabled]="condition ? true : false">
<input [attr.disabled]="condition ? 'disabled' : null">

```

Use property binding over attribute binding as it is more intuitive (being a boolean value), has a shorter syntax, and is more performant.

## Property binding [property]
Use property binding to set properties of target elements or directive @Input() decorators.

**Property binding flows a value in one direction, from a component's property into a target element property.**

```html
<img [src]="itemImageUrl" height="250px" />

```
There's also the bind- prefix alternative:

```html
<img bind-src="itemImageUrl">
```

Here's an example of binding to the colSpan property. 
**Notice that it's not colspan**, which is the attribute, spelled with a lowercase s

```html
<table>
  <tr>
    <th>Month</th><th>Savings</th>
  </tr>
  <tr>
    <td>January</td><td>$100</td>
  </tr>
  <tr>
    <td>February</td><td>$80</td>
  </tr>
  <tr>
    <td [colSpan]="2">Sum: $180</td>
  </tr>
</table>

```
### Avoid side effects
Evaluation of a template expression should have no visible side effects.

As a best practice, stick to properties and to methods that return values and avoid side effects.

### Return the proper type

The template expression should evaluate to the type of value that the target property expects.

#### Passing String
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  parentItem = 'Parent item passed to child';

}

```
_app.component.ts_

```html
<app-item-detail [childItem]="parentItem"></app-item-detail>
```
_app.component.html_

```javascript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() childItem: string;
}

```
_item-detail.component.ts_

```html
<p>{{childItem}}</p>
```
_item-detail.component.html_

#### Passing object
```javascript
import { Component, ViewChild, ElementRef } from '@angular/core';

import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
}

```
_app.component.ts_

```html
<app-list-item [childItems]="parentItems"></app-list-item>

```
_app.component.html_

```javascript
import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../models/item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() childItems: Item[];
}
```
_list-item.component.ts_

```html
<ul *ngFor="let childItem of childItems">
  <li>{{childItem.id}} {{childItem.name}}</li>
</ul>

```
_list-item.component.html_

### Remember the brackets
The brackets, \[\], tell Angular to evaluate the template expression. If you omit the brackets, Angular treats the string as a constant

```html
<app-item-detail childItem="Passing a constant directly"></app-item-detail>

```


### One-time string initialization
You should omit the brackets when all of the following are true:

    1. The target property accepts a string value.

    2. The string is a fixed value that you can put directly into the template.
    
    3. This initial value never changes
    
```html
<app-item-detail childItem="Passing a constant directly"></app-item-detail>

```

### Property binding vs. interpolation
You often have a choice between interpolation and property binding.

```html
<div><img [src]="itemImageUrl" height="250px" /></div>
<div><img src={{itemImageUrl}} height="250px" /></div>
```

Interpolation is a convenient alternative to property binding in many cases. 
When rendering data values as strings, there is no technical reason to prefer one form to the other, though readability tends to favor interpolation. 
However, **when setting an element property to a non-string data value, you must use property binding**.

## Attribute, class, and style bindings

### Attribute binding
Attribute binding syntax resembles property binding, but instead of an element property between brackets, start with the prefix attr, followed by a dot (.), and the name of the attribute. You then set the attribute value, using an expression that resolves to a string, or remove the attribute when the expression resolves to null.

One of the primary use cases for attribute binding is to set ARIA attributes, as in this example: **attr.aria-label** and **colspan**.
```html
<!-- create and set an aria attribute for assistive technology -->
<button [attr.aria-label]="actionName">{{actionName}} with Aria</button>
<table>
  <tr>
    <th>Month</th><th>Savings</th>
  </tr>
  <tr>
    <td>January</td><td>$100</td>
  </tr>
  <tr>
    <td>February</td><td>$80</td>
  </tr>
  <tr>
    <td [colSpan]="2">Sum: $180</td>
  </tr>
</table>

```

### Class binding
Add and remove CSS class names from an element's class attribute with a class binding.

```html
<div class="item clearance special">Item clearance special</div>

```

### Style binding
```html
<button [style.color]="isSpecial ? 'red': 'green'">Red</button>
<button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>

```
This technique is suitable for setting a single style, but consider the NgStyle directive when setting several inline styles at the same time.

## Event binding (event)
Event binding allows you to listen for certain events such as keystrokes, mouse movements, clicks, and touches. 

```html
<button (click)="onSave($event)">Save</button>
<button on-click="onSave($event)">on-click Save</button>

```

## Built-in directives
Angular offers two kinds of built-in directives: attribute directives and structural directives.

### Built-in attribute directives
Attribute directive listen to and modify the behaviour of other HTML elements, attributes, properties, and components. 

    1. NgClass—adds and removes a set of CSS classes.
    
    2. NgStyle—adds and removes a set of HTML styles.
    
    3. NgModel—adds two-way data binding to an HTML form element.

#### ngClass
```html
<div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>

```

#### ngStyle
```html
<div id="styleTest" [style.font-size]="isSpecial ? 'x-large' : 'smaller'">
  This div is x-large or smaller.
</div>

```

#### ngModel
```html
<div id="teaPot">
  <p>Item name: {{itemName}}</p>
  <label for="example-ngModel">[(ngModel)]:</label>
  <input [(ngModel)]="itemName" id="example-ngModel">
</div>

```

### Built-in structural directives
Structural directives are responsible for HTML layout.

    1. NgIf—conditionally creates or destroys subviews from the template.
    
    2. NgFor—repeat a node for each item in a list.
    
    3. NgSwitch—a set of directives that switch among alternative views.
   
#### ngIf
```html
<app-item-detail *ngIf="isActive" [item]="item"></app-item-detail>

``` 

#### Show/hide vs. ngIf
Hiding an element is different from removing it with `ngIf`. 
When you hide an element, that element and all of its descendants remain in the DOM. 
All components for those elements stay in memory and Angular may continue to check for changes.

```html
<app-item-detail [class.hidden]="isSpecial"></app-item-detail>

```
ngIf works differently. When ngIf is false. Angular removes the element and its descendants from the DOM.
It destroys their components, freeing up resources, which results in a better user experience.

Another advantage of ngIf is that you can use it to **guard against null**.

#### ngFor
```html
<div *ngFor="let item of items">{{item.name}}</div>

```
The string assigned to *ngFor is not a template expression. 
Rather, it's a **microsyntax** — a little language of its own that Angular interprets.

#### *ngFor with index
```html
<div *ngFor="let item of items; let i=index">{{i + 1}} - {{item.name}}</div>

```

#### *ngSwitch
NgSwitch is a set of three cooperating directives: **NgSwitch**, **NgSwitchCase**, and **NgSwitchDefault**.

he NgSwitchCase and NgSwitchDefault directives are **structural directives** because they add or remove elements from the DOM.

```html
<div *ngFor="let item of items">
  <div [ngSwitch]="item">
    <p *ngSwitchCase="'Car'" [style.color]="red">Red car</p>
    <p *ngSwitchCase="'Boat'" [style.color]="blue">Blue Boat</p>
    <p *ngSwitchDefault [style.color]="green">Green item</p>
  </div>
</div>

```
## Template Reference variable
```html
<div>
  <form #itemForm="ngForm" (ngSubmit)="onSubmit(itemForm)">
    <label for="name">
      Name: <input class="form-control" name="name" ngModel required />
    </label>
    <button type="submit">Submit</button>
  </form>

  <div [hidden]="!itemForm.form.valid">
    <p>{{submitMessage}}</p>
  </div>
</div>

```



## Source
[Angular Documentation](https://angular.io/guide/template-syntax)

[Working with Angular 5 Template Reference Variables](https://itnext.io/working-with-angular-5-template-reference-variable-e5aa59fb9af)

[Style Binding & NgStyle in Angular 2](https://alligator.io/angular/style-binding-ngstyle-angular/)

[Angular Mastery: Template Syntax](https://medium.com/angular-in-depth/angular-mastery-template-syntax-194bffe2ad6f)

