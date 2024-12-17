import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // RxJS operator to handle errors



import { Trip } from '../models/trips';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';



@Injectable({
  providedIn: 'root' // Added providedIn: 'root' for tree-shakable service
})
export class TripDataService {



  private apiBaseUrl = 'http://localhost:3000/api';
  private tripsUrl = `${this.apiBaseUrl}/trips/`;
  private tripUrl = `${this.apiBaseUrl}/trip/`;



  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }



  // Add trip (POST)
  public addTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    return this.http
      .post<Trip>(this.tripsUrl, formData, httpOptions)
      .pipe(catchError(this.handleError)); // Handle error using RxJS catchError
  }



  // Get single trip (GET by tripCode)
  public getTrip(tripCode: string): Observable<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get<Trip>(this.tripUrl + tripCode)
      .pipe(catchError(this.handleError)); // Handle error using RxJS catchError
  }



  // Get all trips (GET)
  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    return this.http
      .get<Trip[]>(this.tripsUrl, httpOptions)
      .pipe(catchError(this.handleError)); // Handle error using RxJS catchError
  }

  // Update trip (PUT)
  public updateTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#updateTrip');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    return this.http
      .put<Trip>(this.tripUrl + formData.code, formData, httpOptions)
      .pipe(catchError(this.handleError)); // Handle error using RxJS catchError
  }

  // Delete trip (DELETE)
  public deleteTrip(tripCode: string): Observable<Trip> {
    console.log('Inside TripDataService#deleteTrip(tripCode)');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    return this.http
      .delete<Trip>(this.tripUrl + tripCode, httpOptions)
      .pipe(catchError(this.handleError)); // Handle error using RxJS catchError
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    console.error('Something went wrong', error);
    return throwError(error.message || 'Server Error'); // Return an observable that throws an error
  }

  // Authentication: Login
  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  // Authentication: Register
  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  // Helper method for login and register API calls
  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    console.log('Inside makeAuthApiCall');
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .pipe(catchError(this.handleError)); // Handle error using RxJS catchError
  }
}