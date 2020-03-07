import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Player } from './player.model';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { LobbyService } from '../lobby/lobby.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  endpoint = 'https://api.smd.intnet.ch/player';
  refreshRate = 500;

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private player: BehaviorSubject<Player>;
  public onPlayerChange: Observable<Player>;

  public onUpdate: Observable<void>;
  private updater: Subscription;

  constructor(private http: HttpClient, private lobbyService: LobbyService) {
    this.player = new BehaviorSubject(null);
    this.onPlayerChange = this.player.asObservable();

    // Player update interval
    this.onUpdate = timer(0, this.refreshRate).pipe(
      map(() => {
        const playerId = this.lobbyService.getLobby().playerId;

        this.getPlayerVersion(playerId).subscribe((version) => {
          if (!this.player.value || version > this.player.value.version) {
            this.setPlayer(playerId);
          }
        });
      })
    );

    this.lobbyService.onLobbyChange.subscribe((newLobby) => {
      if (newLobby) {
        this.updater = this.onUpdate.subscribe();
      } else {
        this.updater.unsubscribe();
      }
    });
  }

  private getPlayerVersion(playerId: string) {
    return this.http.get<{ version: number }>(this.endpoint + '/version/' + playerId, {
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

  private setPlayer(playerId: string) {
    if (playerId) {
      this.http.get<Player>(this.endpoint + '/get/' + playerId, {
        headers: this.header
      }).pipe(
        map((player) => {
          this.player.next(player);
        })
      ).subscribe();
    } else {
      this.player.next(null);
    }
  }

  previous(playerId: string) {
    return this.http.patch<{ queuePosition: number }>(this.endpoint + '/previous', { playerId }, {
      headers: this.header
    }).pipe(
      map((result) => {
        this.player.value.queuePosition = result.queuePosition;
        this.player.next(this.player.value);
      })
    );
  }

  next(playerId: string) {
    return this.http.patch<{ queuePosition: number }>(this.endpoint + '/next', { playerId }, {
      headers: this.header
    }).pipe(
      map((result) => {
        this.player.value.queuePosition = result.queuePosition;
        this.player.next(this.player.value);
      })
    );
  }

  pause(playerId: string) {
    return this.http.patch<void>(this.endpoint + '/pause', { playerId }, {
      headers: this.header
    }).pipe(
      map(() => {
        this.player.value.isSongPlaying = false;
        this.player.next(this.player.value);
      })
    );
  }

  resume(playerId: string) {
    return this.http.patch<void>(this.endpoint + '/resume', { playerId }, {
      headers: this.header
    }).pipe(
      map(() => {
        this.player.value.isSongPlaying = true;
        this.player.next(this.player.value);
      })
    );
  }

  jump(playerId: string, position: number) {
    return this.http.patch<void>(this.endpoint + '/jump', { playerId, position }, {
      headers: this.header
    }).pipe(
      map(() => {
        this.player.value.position = position;
        this.player.next(this.player.value);
      })
    );
  }
}
