import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lobby } from './lobby';
import { LobbyService } from './lobby.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../sites/authentication.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  spotifyId: string;
  lobby: Lobby;

  updaterId: number;

  constructor(private lobbyService: LobbyService, private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.spotifyId.subscribe((spotifyId) => {
      this.spotifyId = spotifyId;

      if (this.spotifyId) {
        this.lobbyService.getLobbyFromUser(this.spotifyId).subscribe((lobby) => {
          this.lobby = lobby;
        });
      }
    });
  }

  ngOnInit() {
  }

  onQueueSong() {
    this.router.navigate(['search']);
  }

  onCreateLobby() {
    this.lobbyService.createLobby(this.spotifyId).subscribe((lobby) => {
      this.lobby = lobby;
    });
  }

  onJoinLobby() {
    /*let options: PromptOptions = {
      title: "Join Lobby",
      message: "Enter the lobby's ID",
      okButtonText: "Join",
      cancelButtonText: "Cancle",
      cancelable: true,
      inputType: inputType.text,
      capitalizationType: capitalizationType.none
    }

    prompt(options).then(async (result: PromptResult) => {
      if (result.result) {
        let lobbyId = result.text;

        if (/([0-9]|[a-f]){24}/.test(lobbyId)) {
          this.lobbyService.joinLobby(this.spotifyId, lobbyId).then(() => {
            this.updateLobby();
            alert({
              title: "Success",
              message: "You have successfully joined the lobby: " + lobbyId,
              okButtonText: "OK"
            });
          }, (error) => {
            alert({
              title: "Failure",
              message: "You could not join the lobby!",
              okButtonText: "OK"
            });
          });
        }
        else {
          alert({
            title: "Failure",
            message: "This is no valid lobby ID!",
            okButtonText: "OK"
          });
        }
      }
    });*/
  }

  onLeaveLobby() {
    this.lobbyService.leaveLobby(this.spotifyId, this.lobby.id).subscribe(() => {
      this.lobby = null;
    });
  }

  onCloseLobby() {
    this.lobbyService.closeLobby(this.lobby.id).subscribe(() => {
      this.lobby = null;
    });
  }
}
