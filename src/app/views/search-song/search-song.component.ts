import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LobbyService } from 'src/app/components/lobby/lobby.service';
import { Song } from 'src/app/api/song';
import { SearchService } from 'src/app/core/search/search.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { QueueService } from 'src/app/core/queue/queue.service';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {

  query = '';
  searchResults: Song[];

  constructor(private router: Router,
              private authenticationService: AuthenticationService, private searchService: SearchService,
              private lobbyService: LobbyService, private queueService: QueueService) {
    this.searchResults = [];

    // Leave the song search if user leaves the lobby
    this.lobbyService.onLobbyChange.subscribe((newLobby) => {
      if (!newLobby) {
        this.onBack();
      }
    });
  }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['home']);
  }

  onSearch() {
    if (this.query) {
      this.searchService.searchSong(this.query, 'CH', 20).subscribe((songs) => {
        this.searchResults = songs;
      });
    } else {
      this.query = '';
    }
  }

  onAddToQueue(songId: string) {
    this.queueService.add(this.lobbyService.getLobby().id,
    this.authenticationService.getLocalUserId(),
    songId).subscribe(() => {
      this.query = '';
      this.searchResults = [];
    });
  }
}
