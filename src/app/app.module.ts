import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ListItemComponent } from './list-item/list-item.component';
import { SizerComponent } from './sizer/sizer.component';

@NgModule({
  declarations: [ AppComponent, ItemDetailComponent, ListItemComponent, SizerComponent ],
  imports: [ BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
