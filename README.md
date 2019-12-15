# Components & Templates: Template Syntax

## HTML in templates
HTML is the language of the Angular template. Almost all HTML syntax is valid template syntax. 

The \<script\> element is a notable exception; it is forbidden, eliminating the risk of script injection attacks. 
    
In practice, \<script\> is ignored and a warning appears in the browser console.

## Interpolation {{...}}link
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
  <img [src]="flower" height="250px" />
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

    inputBox.value = 'Sally';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputBox.getAttribute('value')).toEqual('Sally');
    expect(inputBox.value).toEqual('Foo');
  });

```
_example test for html attribute vs dom property_

When the user enters "Sally" into the <input>, the DOM element value property becomes "Sally". However, if you look at the HTML attribute value using input.getAttribute('value'), you can see that the attribute remains unchanged—it returns "Sarah".

```html
<input [disabled]="condition ? true : false">
<input [attr.disabled]="condition ? 'disabled' : null">

```

Use property binding over attribute binding as it is more intuitive (being a boolean value), has a shorter syntax, and is more performant.


## Source
[Angular Documentation](https://angular.io/guide/template-syntax)

[Working with Angular 5 Template Reference Variables](https://itnext.io/working-with-angular-5-template-reference-variable-e5aa59fb9af)

[Style Binding & NgStyle in Angular 2](https://alligator.io/angular/style-binding-ngstyle-angular/)
