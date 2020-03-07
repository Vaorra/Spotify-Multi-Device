import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  endpoint = 'https://api.smd.intnet.ch';
  private spotifyId: BehaviorSubject<string>;
  public onSpotifyIdChange: Observable<string>;

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
    this.spotifyId = new BehaviorSubject(undefined);
    this.onSpotifyIdChange = this.spotifyId.asObservable();

    const state = localStorage.getItem('state');

    if (state) {
      this.authenticate(state).subscribe();
    }
    // REMOVE THIS IN PRODUCTION
    // colin8442;
    // ks5ey129m3sazez0xb4eo01kd
  }

  getSpotifyId(): string {
    return this.spotifyId.value;
  }

  getLoginUrl(): string {
    return this.endpoint + '/login';
  }

  isLoggedIn(): boolean {
    return this.spotifyId.value ? true : false;
  }

  authenticate(state: string, code?: string) {
    return this.http.post<{ authorized: boolean, spotifyId: string }>(this.endpoint + '/authenticate/', { state, code }, {
      headers: this.header
    }).pipe(
      map((result) => {
        if (result.authorized && result.spotifyId) {
          this.spotifyId.next(result.spotifyId);
          localStorage.setItem('state', state);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('state');
    this.spotifyId.next(undefined);
  }
}
