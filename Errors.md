# Errors

```text
Failed: Template parse errors:
Can't bind to 'formControl' since it isn't a known property of 'input'. ("
<label>
  First Name:
  <input type="text" [ERROR ->][formControl]="firstName" #firstNameInput>
  <button (click)="show(firstNameInput)">Show</button>
</l"): ng:///DynamicTestModule/AppComponent.html@22:21
```
Add: import { ReactiveFormsModule } from '@angular/forms';
 
