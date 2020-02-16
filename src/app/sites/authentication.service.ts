import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, empty } from 'rxjs';
import { User } from '../lobby/lobby';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  endpoint = 'https://api.smd.neture.dev';
  private spotifyIdSubject: BehaviorSubject<string>;
  public spotifyId: Observable<string>;

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
    this.spotifyIdSubject = new BehaviorSubject(undefined);
    this.spotifyId = this.spotifyIdSubject.asObservable();

    const state = localStorage.getItem('state');

    if (state) {
      this.authenticate(state);
    }
    // REMOVE THIS IN PRODUCTION
    // colin8442;
    // ks5ey129m3sazez0xb4eo01kd
  }

  getSpotifyId(): string {
    return this.spotifyIdSubject.value;
  }

  getLoginUrl(): string {
    return this.endpoint + '/login';
  }

  authenticate(state: string, code?: string) {
    this.http.post<{ spotifyId: string }>(this.endpoint + '/authenticate/', { state, code }, {
      headers: this.header
    }).subscribe((result) => {
      if (result.spotifyId) {
        this.spotifyIdSubject.next(result.spotifyId);
        localStorage.setItem('state', state);
      }
    });
  }

  logout() {
    localStorage.removeItem('state');
    this.spotifyIdSubject.next(undefined);
  }
}
