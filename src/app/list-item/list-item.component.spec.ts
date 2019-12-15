import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListItemComponent } from './list-item.component';
import { Item } from '../models/item';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let compiled: any;
  const mockItems: Item[] = [
    {
      id: 12,
      name: 'phone'
    },
    {
      id: 13,
      name: 'iPad'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.childItems = mockItems;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have items', () => {
    const items = fixture.debugElement.queryAll(By.css('ul > li'));
    expect(items[0].nativeElement.textContent).toEqual('12 phone');
    expect(items[1].nativeElement.textContent).toEqual('13 iPad');
  });
});
