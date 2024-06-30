import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Event, EventCreateInput} from "../data/event";
import {environment} from "../environment/environment";

@Injectable(
  {providedIn: "root"}
)
export class EventService {
  private eventURL = `${environment.apiUrl}/v1/events`;

  constructor(private http: HttpClient) {}

  getAllEvents(eventTitle: string): Observable<Event[]> {
    const params = eventTitle != '' ? { params: { eventTitle } } : {};
    return this.http.get<Event[]>(this.eventURL, params);
  }

  getEventsByCity(eventCity: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventURL}/by-city`, { params: { eventCity: eventCity } })
      .pipe(catchError(this.handleError<Event[]>('getEventsByCity')));
  }

  createEvent(event: EventCreateInput) : Observable<Event> {
    return this.http.post<Event>(this.eventURL, event);
  }

  updateEvent(event: Event) : Observable<Event> {
    return this.http.put<Event>(this.eventURL, event)
      .pipe(catchError(this.handleError<Event>('update', event)));
  }

  deleteEvent(event: Event) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.eventURL}/${event.id}`);
  }

  protected handleError<T>(operation= 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return of(result as T);
    };
  }
}
