import { Component, OnInit, Input } from '@angular/core';
import { Lobby, Song } from '../lobby/lobby';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() lobby: Lobby;

  song: Song;

  playerCurrentSeconds = 70;
  playerMaxSeconds = 300;

  ngOnInit() {
      this.initializeSong();
  }

  onPrevious() {
      console.log('PREVIOUS');
  }

  onPlay() {
      console.log('PLAY');
  }

  onPause() {
      console.log('PAUSE');
  }

  onNext() {
      console.log('NEXT');
  }

  getMinutes() {
      return Math.floor(this.playerCurrentSeconds / 60);
  }

  getSeconds() {
      const seconds = this.playerCurrentSeconds % 60;
      if (seconds < 10) {
          return '0' + seconds;
      }
      return seconds;
  }

  initializeSong() {
      this.song = this.lobby.queuedSongs.find(song => song.spotifyId === this.lobby.currentSongId);
  }
}
