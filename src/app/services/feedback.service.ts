import {Injectable} from "@angular/core";
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Feedback, FeedbackCreateInput} from "../data/feedback";

@Injectable(
  {providedIn: "root"}
)
export class FeedbackService {
  private feedbackURL = `${environment.apiUrl}/v1/feedbacks`;

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackURL);
  }

  getFeedbacksByEventId(eventId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.feedbackURL}/by-event`, { params: { eventId: eventId } })
      .pipe(catchError(this.handleError<Feedback[]>('getFeedbacksByEventId')));
  }

  getFeedbacksByUserId(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.feedbackURL}/by-user`, { params: { userId: userId } })
      .pipe(catchError(this.handleError<Feedback[]>('getFeedbacksByUserId')));
  }

  createFeedback(feedback: FeedbackCreateInput) : Observable<Feedback> {
    return this.http.post<Feedback>(this.feedbackURL, feedback);
  }

  updateFeedback(feedback: Feedback) : Observable<Feedback> {
    return this.http.put<Feedback>(this.feedbackURL, feedback)
      .pipe(catchError(this.handleError<Feedback>('update', feedback)));
  }

  deleteFeedback(feedback: Feedback) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.feedbackURL}/${feedback.id}`);
  }

  protected handleError<T>(operation= 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return of(result as T);
    };
  }
}
