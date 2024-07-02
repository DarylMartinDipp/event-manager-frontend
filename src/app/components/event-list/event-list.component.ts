import { Component, OnInit } from "@angular/core";
import { Event } from "../../data/event";
import { EventService } from "../../services/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  eventTitle: string = '';
  eventCity: string = '';
  showUpcomingOnly: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents('');
  }

  private loadEvents(eventTitle: string): void {
    if (this.showUpcomingOnly)
      this.loadUpcomingEvents()
    else
      this.eventService.getAllEvents(eventTitle).subscribe(events => {
        this.events = events;
      });
  }

  searchEvents(): void {
    this.loadEvents(this.eventTitle.trim());
  }

  clearSearch(): void {
    this.eventTitle = '';
    this.loadEvents('');
  }

  filterEventsByCity(): void {
    if (this.eventCity.trim() !== '')
      this.eventService.getEventsByCity(this.eventCity).subscribe(events => {
        this.events = events;
      });
    else
      this.clearFilter();
  }

  clearFilter(): void {
    this.eventCity = '';
    this.loadEvents('');
  }

  private loadUpcomingEvents(): void {
    this.eventService.getUpcomingEvents().subscribe(events => {
      this.events = events;
    });
  }

  protected toggleUpcomingEvents(): void {
    this.showUpcomingOnly = !this.showUpcomingOnly;
    this.eventTitle = '';
    this.eventCity = '';
    this.loadEvents(this.eventTitle);
  }
}
