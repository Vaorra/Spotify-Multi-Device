import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../lobby/lobby';

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
    this.spotifyIdSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.spotifyId = this.spotifyIdSubject.asObservable();
    // REMOVE THIS IN PRODUCTION
    // this.spotifyId = "colin8442";
    // this.spotifyId = 'ks5ey129m3sazez0xb4eo01kd';
  }

  getSpotifyId(): string {
    return this.spotifyIdSubject.value;
  }

  getLoginUrl(): string {
    return this.endpoint + '/login';
  }

  login(spotifyId: string) {
    localStorage.setItem('currentUser', JSON.stringify(spotifyId));
    this.spotifyIdSubject.next(spotifyId);
  }

  logout() {
    this.http.post(this.endpoint + '/logout/' + this.spotifyIdSubject.value, { headers: this.header }).subscribe(() => {
      localStorage.removeItem('currentUser');
      this.spotifyIdSubject.next(undefined);
    });
  }
}
