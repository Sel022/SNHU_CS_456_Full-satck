import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trips';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(private http: HttpClient) { }
  
  url = 'http://localhost:3000/api/trip';
  getTrip(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url)
  }
  addTrip(formData:Trip): Observable<Trip[]> {
    return this.http.post<Trip[]>(this.url, formData)
  }
  getTrips(tripCode:string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/${tripCode}`)
  }
  updateTrip(formData:Trip): Observable<Trip[]>{
    return this.http.put<Trip[]>(`${this.url}/${formData.code}`,formData)
    }
}