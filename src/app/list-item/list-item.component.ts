import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../models/item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() childItems: Item[];

  constructor() { }

  ngOnInit() {
  }

}
