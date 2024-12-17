import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { TripDataService } from './trip-data.service';



@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {



  private apiBaseUrl = 'http://localhost:3000/api'; // Base URL for authentication-related API endpoints



  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService,
    private http: HttpClient
  ) { }



  /**
  * Get the token from localStorage
  */
  public getToken(): string | null {
    return this.storage.getItem('travlr-token');
  }



  /**
  * Save the token to localStorage
  * @param token - The authentication token
  */
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }



  /**
  * Log the user in by calling the tripDataService login method
  * @param user - The user object
  */
  public login(user: User): Observable<AuthResponse> {
    return this.tripDataService.login(user).pipe(
      map((authResp: AuthResponse) => {
        if (authResp?.token) {
          this.saveToken(authResp.token);
        }
        return authResp;
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error; // Propagate error for UI handling
      })
    );
  }



  /**
  * Register the user by calling the tripDataService register method
  * @param user - The user object
  */
  public register(user: User): Observable<AuthResponse> {
    return this.tripDataService.register(user).pipe(
      map((authResp: AuthResponse) => {
        if (authResp?.token) {
          this.saveToken(authResp.token);
        }
        return authResp;
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        throw error; // Propagate error for UI handling
      })
    );
  }

  /**
  * Log the user out by removing the token from localStorage
  */
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  /**
  * Check if the user is logged in by verifying the token's expiration date
  * @returns {boolean} - Whether the user is logged in
  */
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const payload = this.decodeToken(token);
        // Check if the token is expired
        return payload?.exp > (Date.now() / 1000);
      } catch (e) {
        console.error('Invalid token:', e);
        return false;
      }
    }
    return false;
  }

  /**
  * Decode the JWT token
  * @param token - The JWT token string
  * @returns {any} - Decoded token payload
  */
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    if (!payload) return null;
    return JSON.parse(atob(payload));
  }

  /**
  * Get the current logged-in user based on the decoded token
  * @returns {User} - The current user object
  */
  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      if (token) {
        try {
          const { email, name } = this.decodeToken(token) || {};
          return { email: email || '', name: name || '' };
        } catch (e) {
          console.error('Error decoding token:', e);
          return { email: '', name: '' };
        }
      }
    }
    return { email: '', name: '' };
  }
}