import { Component, OnInit, Input } from '@angular/core';
import { Lobby, Song } from '../lobby/lobby';
import { LobbyService } from '../lobby/lobby.service';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  lobby: Lobby;
  song: Song;

  playerCurrentSeconds = 0;

  playerCurrentTimeText = '0:00';
  playerMaxTimeText = '0:00';

  constructor(private lobbyService: LobbyService, private playerService: PlayerService) {
    lobbyService.onLobbyChange.subscribe((lobby) => {
      this.lobby = lobby;
      if (lobby) {
        this.song = lobby.queuedSongs[lobby.currentSongIndex];
        this.playerCurrentSeconds = lobby.currentPlayerPosition;

        this.playerCurrentTimeText = this.getCurrentTime();
        this.playerMaxTimeText = this.getMaxTime();
      }
    });
  }

  ngOnInit() {
  }

  onPrevious() {
    this.playerService.previous(this.lobby.id).subscribe((songId) => {
      this.song = this.lobby.queuedSongs.find((song) => {
        return song.spotifyId === songId;
      });
    });
    console.log('PREVIOUS');
  }

  onNext() {
    this.playerService.next(this.lobby.id).subscribe((songId) => {
      this.song = this.lobby.queuedSongs.find((song) => {
        return song.spotifyId === songId;
      });
    });
    console.log('NEXT');
  }

  onPause() {
    this.lobby.isSongPlaying = false;
    this.playerService.pause(this.lobby.id).subscribe();
    console.log('PAUSE');
  }

  onResume() {
    this.lobby.isSongPlaying = true;
    this.playerService.resume(this.lobby.id).subscribe();
    console.log('RESUME');
  }

  onJump() {
    this.playerService.jump(this.lobby.id, this.playerCurrentSeconds).subscribe();
    console.log('JUMP ' + this.playerCurrentSeconds);
  }

  private getCurrentTime() {
    return this.getMinutes(this.playerCurrentSeconds) + ':' + this.getSeconds(this.playerCurrentSeconds);
  }

  private getMaxTime() {
    return this.getMinutes(this.song.duration) + ':' + this.getSeconds(this.song.duration);
  }

  private getMinutes(seconds: number) {
    return Math.floor(seconds / 60).toFixed();
  }

  private getSeconds(seconds: number) {
    let secondsLeft = seconds % 60;

    if (secondsLeft < 10) {
      return '0' + secondsLeft.toFixed();
    }
    return secondsLeft.toFixed();
  }
}
