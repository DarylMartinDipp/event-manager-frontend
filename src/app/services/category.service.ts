import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Category, CategoryCreateInput} from "../data/category";
import {environment} from "../environment/environment";

@Injectable()
export class CategoryService {
  private categoriesURL = `${environment.apiUrl}/v1/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL);
  }

  createCategory(category: CategoryCreateInput) : Observable<Category> {
    return this.http.post<Category>(this.categoriesURL, category);
  }

  updateCategory(category: Category) : Observable<Category> {
    return this.http.put<Category>(this.categoriesURL, category)
      .pipe(catchError(this.handleError<Category>('update', category)));
  }

  deleteCategory(category: Category) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.categoriesURL}/${category.id}`);
  }

  protected handleError<T>(operation= 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return of(result as T);
    };
  }
}
