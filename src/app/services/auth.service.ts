import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { IProduct } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  public BASE_URL = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http
      .post<User>(url, { email, password }, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http
      .post<User>(url, { email, password }, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getSignUpData(): Observable<IProduct[]> {
    const url = `${this.BASE_URL}/register`;
    return this.http
      .get<IProduct[]>(url, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getAllProducts(): Observable<IProduct[]> {
    const url = `${this.BASE_URL}/products`;
    return this.http
      .get<IProduct[]>(url, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getProductById(id: number): Observable<IProduct> {
    const url = `${this.BASE_URL}/products/`;
    return this.http
      .get<IProduct>(url + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  createProduct(
    productName: string,
    productNumber: number,
    productCategory: string,
    productPrice: number
  ): Observable<IProduct> {
    const url = `${this.BASE_URL}/products`;
    return this.http
      .post<IProduct>(
        url,
        { productName, productNumber, productCategory, productPrice },
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.BASE_URL}/products`;
    return this.http
      .delete(`${this.BASE_URL}/` + 'products/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  updateProduct(id, user): Observable<IProduct> {
    const url = `${this.BASE_URL}/products/`;
    return this.http
      .put<IProduct>(url + id, user, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // tslint:disable-next-line:typedef
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
