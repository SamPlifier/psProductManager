import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';
    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log(`All: ${JSON.stringify(data)}`)),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // a client-side error occurred
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // backend returned unsuccessfule response HttpClientModule
            errorMessage = `Server returned code: ${err.status}. Error Message: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
