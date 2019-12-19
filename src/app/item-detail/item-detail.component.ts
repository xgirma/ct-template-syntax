import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() childItem: string;
  @Input() item: string;
  @Output() request: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.request.emit('I need a car');
  }
}
