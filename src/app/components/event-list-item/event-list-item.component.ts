import {Component, Input} from "@angular/core";
import {Event} from "../../data/event";

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css']
})
export class EventListItemComponent {
  @Input()
  event!: Event;
}
