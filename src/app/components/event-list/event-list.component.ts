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

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    })
  }
}
