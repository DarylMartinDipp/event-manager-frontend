import {Component, OnInit} from "@angular/core";
import {Event} from "../../data/event";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  eventTitle: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents('');
  }

  private loadEvents(eventTitle: string): void {
    if (eventTitle == '') {
      this.eventService.getAllEvents('').subscribe(events => {
        this.events = events;
      });
    } else {
      this.eventService.getAllEvents(eventTitle).subscribe(events => {
        this.events = events;
      });
    }
  }

  searchEvents(): void {
    this.loadEvents(this.eventTitle);
  }

  clearSearch(): void {
    this.eventTitle = '';
    this.loadEvents('');
  }
}
