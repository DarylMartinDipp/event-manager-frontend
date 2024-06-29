import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {User, UserCreateInput} from "../data/user";
import {environment} from "../environment/environment";

@Injectable(
  {providedIn: "root"}
)
export class UserService {
  private userURL = `${environment.apiUrl}/v1/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL);
  }

  getUserByEmail(userEmail: string): Observable<User> {
    return this.http.get<User>(`${this.userURL}/by-email`, { params: { userEmail: userEmail } })
      .pipe(catchError(this.handleError<User>('getUserByEmail')));
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.userURL}/by-username`, { params: { username } })
      .pipe(catchError(this.handleError<User>('getUserByUsername')));
  }

  createUser(user: UserCreateInput) : Observable<User> {
    return this.http.post<User>(this.userURL, user);
  }

  updateUser(user: User) : Observable<User> {
    return this.http.put<User>(this.userURL, user)
      .pipe(catchError(this.handleError<User>('update', user)));
  }

  deleteUser(user: User) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.userURL}/${user.id}`);
  }

  protected handleError<T>(operation= 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return of(result as T);
    };
  }
}
