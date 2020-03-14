import { Component, OnInit, Input } from '@angular/core';
import { Lobby, Song } from '../lobby/lobby.model';
import { LobbyService } from '../lobby/lobby.service';
import { PlayerService } from './player.service';
import { Player } from './player.model';
import { timer, Observable, Subscribable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  player: Player;
  currentSong: Song;

  playerCurrentTimeText = '0:00';
  playerMaxTimeText = '0:00';

  refreshRate = 200;

  onTick: Observable<void>; // clock Interval
  clock: Subscription;

  constructor(private playerService: PlayerService) {
    playerService.onPlayerChange.subscribe((player) => {
      if (player) {
        this.player = player;

        if (this.player.queue.length > 0) {
          this.currentSong = this.player.queue[this.player.queuePosition];

          this.updateCurrentTime();
          this.updateMaxTime();
        }
      }
    });

    playerService.onPlayerPositionChange.subscribe((position) => {
      if (position) {
        this.player.position = position;

        this.updateCurrentTime();
      }
    });
  }

  ngOnInit() {
  }

  onSelectDevice() {
    this.playerService.selectDevice(this.player.id, this.player.currentDeviceId).subscribe();
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
    this.playerService.jump(this.player.id, this.player.position).subscribe();
  }


  private updateCurrentTime() {
    this.playerCurrentTimeText = this.getMinutes(this.player.position) + ':' + this.getSeconds(this.player.position);
  }

  private updateMaxTime() {
    this.playerMaxTimeText = this.getMinutes(this.currentSong.duration) + ':' + this.getSeconds(this.currentSong.duration);
  }

  private getMinutes(ms: number) {
    return Math.floor(ms / 60000).toFixed();
  }

  private getSeconds(ms: number) {
    let secondsLeft = Math.floor(ms % 60000 / 1000);

    if (secondsLeft < 10) {
      return '0' + secondsLeft.toFixed();
    }
    return secondsLeft.toFixed();
  }
}
