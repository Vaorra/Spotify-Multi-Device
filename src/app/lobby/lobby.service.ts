import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lobby } from './lobby';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  endpoint = 'https://api.smd.neture.dev/lobbies';

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  getLobbyFromUser(spotifId: string) {
    return this.http.get<{ lobbyId: string }>(this.endpoint + '/search', {
      params: { participantId: spotifId },
      headers: this.header
    }).pipe(
      map((result) => {
        if (!result) {
          return null;
        }

        return result.lobbyId;
      }), switchMap((lobbyId) => {
        if (!lobbyId) {
          return of<null>(null);
        }

        return this.http.get<Lobby>(this.endpoint + '/get/' + lobbyId);
      })
    );
  }

  createLobby(spotifId: string) {
    return this.http.post<{ lobbyId: string }>(this.endpoint + '/create', {}, {
      params: { leaderId: spotifId },
      headers: this.header
    }).pipe(
      switchMap((result) => {
        return this.http.get<Lobby>(this.endpoint + '/get/' + result.lobbyId);
      })
    );
  }

  joinLobby(spotifId: string, lobbyId: string) {
    return this.http.patch<any>(this.endpoint + '/join', {}, {
      params: { participantId: spotifId, lobbyId},
      headers: this.header
    });
  }

  leaveLobby(spotifId: string, lobbyId: string) {
    return this.http.patch<any>(this.endpoint + '/leave', {}, {
      params: { participantId: spotifId, lobbyId },
      headers: this.header
    });
  }

  closeLobby(lobbyId: string) {
    return this.http.delete<any>(this.endpoint + '/close', {
      params: { lobbyId },
      headers: this.header
    });
  }
}
