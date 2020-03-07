import { Component, OnInit, Input } from '@angular/core';
import { Lobby, Song } from '../lobby/lobby.model';
import { LobbyService } from '../lobby/lobby.service';
import { PlayerService } from './player.service';
import { Player } from './player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  player: Player;
  currentSong: Song;

  currentPosition: number; // in ms

  playerCurrentTimeText = '0:00';
  playerMaxTimeText = '0:00';

  constructor(private playerService: PlayerService) {
    playerService.onPlayerChange.subscribe((player) => {
      if (player) {
        this.player = player;
        if (this.player.queue.length > 0) {
          this.currentSong = this.player.queue[this.player.queuePosition];
          this.currentPosition = this.player.position;

          this.playerCurrentTimeText = this.getCurrentTime();
          this.playerMaxTimeText = this.getMaxTime();
        }
      }
    });
  }

  ngOnInit() {
  }

  onPrevious() {
    this.playerService.previous(this.player.id).subscribe();
  }

  onNext() {
    this.playerService.next(this.player.id).subscribe();
  }

  onPause() {
    this.playerService.pause(this.player.id).subscribe();
  }

  onResume() {
    this.playerService.resume(this.player.id).subscribe();
  }

  onJump() {
    this.playerService.jump(this.player.id, this.currentPosition).subscribe();
  }

  private getCurrentTime() {
    return this.getMinutes(this.currentPosition) + ':' + this.getSeconds(this.currentPosition);
  }

  private getMaxTime() {
    return this.getMinutes(this.currentSong.duration) + ':' + this.getSeconds(this.currentSong.duration);
  }

  private getMinutes(ms: number) {
    return Math.floor(ms / 60000).toFixed();
  }

  private getSeconds(ms: number) {
    let secondsLeft = ms % 60000 / 1000;

    if (secondsLeft < 10) {
      return '0' + secondsLeft.toFixed();
    }
    return secondsLeft.toFixed();
  }
}
