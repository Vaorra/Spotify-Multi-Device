import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, LocalUser } from '../lobby/lobby.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  endpoint = 'https://api.smd.intnet.ch';
  private localUser: BehaviorSubject<LocalUser>;
  public onLocalUserChange: Observable<LocalUser>;

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
    this.localUser = new BehaviorSubject(undefined);
    this.onLocalUserChange = this.localUser.asObservable();

    const state = localStorage.getItem('state');

    if (state) {
      this.authenticate(state).subscribe();
    }
  }

  getLocalUserId(): string {
    return this.localUser.value.spotifyId;
  }

  getLoginUrl(origin?: string): string {
    if (origin) {
      return this.endpoint + '/login?origin=' + encodeURIComponent(origin);
    }

    return this.endpoint + '/login';
  }

  get isLoggedIn(): boolean {
    return this.localUser.value ? true : false;
  }

  authenticate(state: string, code?: string) {
    return this.http.post<{ authorized: boolean, user: LocalUser }>(this.endpoint + '/authenticate/', { state, code }, {
      headers: this.header
    }).pipe(
      map((result) => {
        if (result.authorized && result.user) {
          this.localUser.next(result.user);
          localStorage.setItem('state', state);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('state');
    this.localUser.next(undefined);
  }
}
