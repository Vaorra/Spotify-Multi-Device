import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lobby } from './lobby';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, BehaviorSubject, timer, interval } from 'rxjs';
import { AuthenticationService } from '../sites/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  endpoint = 'https://api.smd.neture.dev/lobbies';

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private lobbySubject: BehaviorSubject<Lobby>;
  public lobby: Observable<Lobby>;
  public updater: Observable<void>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.lobbySubject = new BehaviorSubject(null);
    this.lobby = this.lobbySubject.asObservable();

    this.updater = interval(10000).pipe(
      map(() => {
        this.getLobbyFromUser(authenticationService.getSpotifyId()).subscribe((lobbyId) => {
          this.setLobby(lobbyId);
        });
      })
    );
  }

  private getLobbyFromUser(spotifId: string) {
    return this.http.get<{ lobbyId: string }>(this.endpoint + '/search', {
      params: { participantId: spotifId },
      headers: this.header
    }).pipe(
      map((result) => {
        if (!result) {
          return null;
        }

        return result.lobbyId;
      })
    );
  }

  private setLobby(lobbyId: string) {
    if (lobbyId) {
      this.http.get<Lobby>(this.endpoint + '/get/' + lobbyId, {
        headers: this.header
      }).pipe(
        map((lobby) => {
          this.lobbySubject.next(lobby);
        })
      ).subscribe();
    } else {
      this.lobbySubject.next(null);
    }
  }

  createLobby(spotifId: string) {
    return this.http.post<{ lobbyId: string }>(this.endpoint + '/create', {}, {
      params: { leaderId: spotifId },
      headers: this.header
    }).pipe(
      map((result) => {
        this.setLobby(result.lobbyId);
      })
    );
  }

  joinLobby(spotifId: string, lobbyId: string) {
    return this.http.patch<any>(this.endpoint + '/join', {}, {
      params: { participantId: spotifId, lobbyId},
      headers: this.header
    }).pipe(
      map((result) => {
        this.setLobby(lobbyId);
      })
    );
  }

  leaveLobby(spotifId: string, lobbyId: string) {
    return this.http.patch<any>(this.endpoint + '/leave', {}, {
      params: { participantId: spotifId, lobbyId },
      headers: this.header
    }).pipe(
      map((result) => {
        this.setLobby(null);
      })
    );
  }

  closeLobby(lobbyId: string) {
    return this.http.delete<any>(this.endpoint + '/close', {
      params: { lobbyId },
      headers: this.header
    }).pipe(
      map((result) => {
        this.setLobby(null);
      })
    );
  }
}
