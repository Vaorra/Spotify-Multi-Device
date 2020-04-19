import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, timer, Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { PlayerService } from '../player/player.service';
import { Lobby } from 'src/app/api/lobby';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  private endpoint = 'https://api.smd.intnet.ch/lobbies';
  private refreshRate = 1000;

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private lobby: BehaviorSubject<Lobby>;
  public onLobbyChange: Observable<Lobby>;

  public onUpdate: Observable<void>;
  private updater: Subscription;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.lobby = new BehaviorSubject(null);
    this.onLobbyChange = this.lobby.asObservable();

    // Lobby update interval (every 1 seconds)
    this.onUpdate = timer(0, this.refreshRate).pipe(
      map(() => {
        this.getLobbyFromUser(authenticationService.getLocalUserId()).subscribe((lobbyId) => {
          if (lobbyId) {
            this.getLobbyVersion(lobbyId).subscribe((version) => {
              if (!this.lobby.value || version > this.lobby.value.version) {
                this.setLobby(lobbyId);
              }
            });
          } else {
            this.setLobby(null);
          }
        });
      })
    );

    // Start updater on Login
    this.authenticationService.onLocalUserChange.subscribe((newSpotifyId) => {
      if (newSpotifyId) {
        this.updater = this.onUpdate.subscribe();
      } else {
        this.updater.unsubscribe();
      }
    });
  }

  getLobby() {
    return this.lobby.value;
  }

  private getLobbyVersion(lobbyId: string) {
    return this.http.get<{ version: number }>(this.endpoint + '/version/' + lobbyId, {
      headers: this.header
    }).pipe(
      map((result) => {
        if (result) {
          return result.version;
        }

        return null;
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
          this.lobby.next(lobby);
        })
      ).subscribe();
    } else {
      this.lobby.next(null);
    }
  }

  validateLobbyId(lobbyId: string) {
    return this.http.get<any>(this.endpoint + '/search', {
      headers: this.header,
      params: { lobbyId }
    }).pipe(
      map((result) => {
        return result ? true : false;
      })
    );
  }

  createLobby(spotifId: string) {
    return this.http.post<{ lobbyId: string }>(this.endpoint + '/create', { leaderId: spotifId }, {
      headers: this.header
    }).pipe(
      map((result) => {
        this.setLobby(result.lobbyId);
      })
    );
  }

  joinLobby(spotifId: string, lobbyId: string) {
    return this.http.patch<any>(this.endpoint + '/join', { participantId: spotifId, lobbyId }, {
      headers: this.header
    }).pipe(
      map(() => {
        this.setLobby(lobbyId);
      })
    );
  }

  leaveLobby(spotifId: string, lobbyId: string) {
    return this.http.patch<any>(this.endpoint + '/leave', { participantId: spotifId, lobbyId }, {
      headers: this.header
    }).pipe(
      map(() => {
        this.setLobby(null);
      })
    );
  }

  closeLobby(lobbyId: string) {
    return this.http.delete<any>(this.endpoint + '/close/' + lobbyId, {
      headers: this.header
    }).pipe(
      map(() => {
        this.setLobby(null);
      })
    );
  }
}