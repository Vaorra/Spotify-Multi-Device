import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  endpoint = 'https://api.smd.intnet.ch/player';

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {

  }

  previous(lobbyId: string) {
    return this.http.patch<{ songId: string }>(this.endpoint + '/previous', { lobbyId }, {
      headers: this.header
    }).pipe(
      map((result) => {
        return result.songId;
      })
    );
  }

  next(lobbyId: string) {
    return this.http.patch<{ songId: string }>(this.endpoint + '/next', { lobbyId }, {
      headers: this.header
    }).pipe(
      map((result) => {
        return result.songId;
      })
    );
  }

  pause(lobbyId: string) {
    return this.http.patch<void>(this.endpoint + '/pause', { lobbyId }, {
      headers: this.header
    });
  }

  resume(lobbyId: string) {
    return this.http.patch<void>(this.endpoint + '/resume', { lobbyId }, {
      headers: this.header
    });
  }

  jump(lobbyId: string, position: number) {
    return this.http.patch<void>(this.endpoint + '/jump', { lobbyId, position }, {
      headers: this.header
    });
  }
}
