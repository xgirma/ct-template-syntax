# Components & Templates: Template Syntax

## HTML in templates
HTML is the language of the Angular template. Almost all HTML syntax is valid template syntax. 

    The <script> element is a notable exception; it is forbidden, eliminating the risk of script injection attacks. In practice, <script> is ignored and a warning appears in the browser console. See the Security page for details.

## Interpolation {{...}}link
Interpolation refers to embedding expressions into marked up text.
```html
<h3>Current customer: {{ currentCustomer }}</h3>
<p>The sum of 1 + 1 is {{1 + 1}}.</p>
<p>The sum of 1 + 1 is not {{1 + 1 + getVal()}}.</p>

```

## Expression guidelines
When using template expressions follow these guidelines:

    Simplicity
    
    Quick execution
    
    No visible side effects
    
Angular executes template expressions after every change detection cycle. Change detection cycles are triggered by many asynchronous activities such as promise resolutions, HTTP results, timer events, key presses and mouse moves.
Expressions should finish quickly or the user experience may drag, especially on slower devices. Consider caching values when their computation is expensive.

A template expression should not change any application state other than the value of the target property.

## Template statements
A template statement responds to an **event** raised by a binding target such as an element, component, or directive.

    Template expressions cannot refer to anything in the global namespace, except undefined. They can't refer to window or document. Additionally, they can't call console.log() or Math.max() and they are restricted to referencing members of the expression context.

    A template statement has a side effect. That's the whole point of an event. It's how you update application state from user action.
    
Responding to events is the other side of Angular's "unidirectional data flow". You're free to change anything, anywhere, during this turn of the event loop.

However, certain JavaScript syntax is not allowed:

    new
    
    increment and decrement operators, ++ and --
    
    operator assignment, such as += and -=
    
    the bitwise operators | and &

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

## Binding syntax: an overview
Data-binding is a mechanism for coordinating what users see, specifically with application data values.

Angular provides many kinds of data-binding. Binding types can be grouped into three categories distinguished by the direction of data flow:

    From the source-to-view
    
    From view-to-source
    
    Two-way sequence: view-to-source-to-view


### One-way from data source to view target

| Type  | Syntax  |
|:---|:---|
| Interpolation, Property  | {{expression}}  |
| Attribute, Class  | [target]="expression" |
| Style | bind-target="expression" |

```html
<div>
  <p>Button disabled state bound to isUnchanged property</p>
  <button [disabled]="isUnchanged">Disabled</button>
</div>

```

### One-way from view target to data source

| Type  | Syntax  |
|:---|:---|
| Event  | (target)="statement"  |
|  | on-target="statement" |

```html
<div (keyup)="0">
  <h3>One-way from view target to data source: HTML attributes and DOM properties</h3>
  <p>1. Use the inspector to see the HTML attribute and DOM property values. Click the buttons to log values to the console.</p>

  <label>HTML Attribute Initializes to "Sarah":
    <input type="text" value="Sarah" #bindingInput></label>
  <div>
    <button (click)="getHTMLAttributeValue()">Get HTML attribute value</button> Won't change.
  </div>

  <div>
    <button (click)="getDOMPropertyValue()">Get DOM property value</button> Changeable. Angular works with these.
  </div>

  <p>2. Change the name in the input and click the buttons again.</p>
</div>

```

### Two-way

| Type  | Syntax  |
|:---|:---|
| Two-way  | [(target)]="expression"  |
|  | bindon-target="expression" |

```html
<div>
  <h3>Disabled property vs. attribute</h3>
  <p>Use the inspector to see the Test Button work and its disabled property toggle.</p>
  <div>
    <button id="testButton" (click)="working()">Test Button</button>
  </div>
  <div>
    <button (click)="toggleDisabled()">Toggle disabled property for Test Button</button>
  </div>
</div>

```
Binding types other than interpolation have a target name to the left of the equal sign, either surrounded by punctuation, [] or (), or preceded by a prefix: **bind-, on-, bindon-**.



## Source
[Angular Documentation](https://angular.io/guide/template-syntax)
