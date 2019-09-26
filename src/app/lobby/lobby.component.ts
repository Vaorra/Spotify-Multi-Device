import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Lobby } from "./lobby";
import { LobbyService } from "./lobby.service";
import { EventData, isAndroid, borderTopRightRadiusProperty } from "tns-core-modules/ui/page/page";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { WebViewUtils } from "nativescript-webview-utils";
import { AuthenticationService } from "../sites/authentication.service";
import { PromptOptions, inputType, capitalizationType, PromptResult, prompt, alert } from "tns-core-modules/ui/dialogs/dialogs";
import { async } from "rxjs/internal/scheduler/async";


@Component({
    selector: "ns-lobby",
    moduleId: module.id,
    templateUrl: "lobby.component.html",
    styleUrls: ["lobby.component.css"]
})
export class LobbyComponent implements OnInit {
    spotifyId: string;
    lobby: Lobby;

    constructor(private lobbyService: LobbyService, private authenticationService: AuthenticationService) {

    }

    async ngOnInit() {
        this.spotifyId = this.authenticationService.getUserSpotifyId();

        this.updateLobby();
    }

    onCreateLobby() {
        this.lobbyService.createLobby(this.spotifyId).then(async (lobbyId) => {
            this.updateLobby();
        });
    }

    onJoinLobby() {
        let options: PromptOptions = {
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
        });
    }

    onLeaveLobby() {
        this.lobbyService.leaveLobby(this.spotifyId, this.lobby.id).then(async () => {
            this.updateLobby();
        });
    }

    onCloseLobby() {
        this.lobbyService.closeLobby(this.lobby.id).then(async () => {
            this.updateLobby();
        });
    }

    async updateLobby() {
        if (this.spotifyId !== undefined) {
            this.lobby = await this.lobbyService.getLobbyFromUser(this.spotifyId);
        }
    }
}
