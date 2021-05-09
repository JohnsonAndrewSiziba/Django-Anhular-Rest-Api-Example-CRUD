import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Customer} from './customer';
import {Message} from './message';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://127.0.0.1:8000/api/customers/';

  constructor(private http: HttpClient) { 
  	
  }

  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  createCustomer(customer: Customer): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}`, customer)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  retrieveAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  updateCustomer(customer: Customer): Observable<Message> {
  console.log("Here:")
  console.log(customer)
    return this.http.put<Message> (`${this.baseUrl}` + customer.id + '/', customer)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteCustomer(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}` + id + '/')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

}
