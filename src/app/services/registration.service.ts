import {Injectable} from "@angular/core";
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Registration, RegistrationCreateInput} from "../data/registration";

@Injectable(
  {providedIn: "root"}
)
export class RegistrationService {
  private registrationURL = `${environment.apiUrl}/v1/registrations`;

  constructor(private http: HttpClient) {}

  getAllRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.registrationURL);
  }

  getRegistrationsByEventId(eventId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.registrationURL}/by-event`, { params: { eventId: eventId } })
      .pipe(catchError(this.handleError<Registration[]>('getRegistrationsByEventId')));
  }

  getRegistrationsByUserId(userId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.registrationURL}/by-user`, { params: { userId: userId } })
      .pipe(catchError(this.handleError<Registration[]>('getRegistrationsByUserId')));
  }

  createRegistration(registration: RegistrationCreateInput) : Observable<Registration> {
    return this.http.post<Registration>(this.registrationURL, registration);
  }

  updateRegistration(registration: Registration) : Observable<Registration> {
    return this.http.put<Registration>(this.registrationURL, registration)
      .pipe(catchError(this.handleError<Registration>('update', registration)));
  }

  deleteRegistration(registration: Registration) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.registrationURL}/${registration.id}`);
  }

  protected handleError<T>(operation= 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return of(result as T);
    };
  }
}
