import { Component, OnInit, ViewChild, ElementRef, DoCheck, OnDestroy } from "@angular/core";
import { Lobby } from "./lobby";
import { LobbyService } from "./lobby.service";
import { EventData, isAndroid, borderTopRightRadiusProperty } from "tns-core-modules/ui/page/page";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { WebViewUtils } from "nativescript-webview-utils";
import { AuthenticationService } from "../sites/authentication.service";
import { PromptOptions, inputType, capitalizationType, PromptResult, prompt, alert } from "tns-core-modules/ui/dialogs/dialogs";
import { async } from "rxjs/internal/scheduler/async";
import { Router } from "@angular/router";

import * as updater from "tns-core-modules/timer";


@Component({
    selector: "ns-lobby",
    moduleId: module.id,
    templateUrl: "lobby.component.html",
    styleUrls: ["lobby.component.css"]
})
export class LobbyComponent implements OnInit, OnDestroy {
    spotifyId: string;
    lobby: Lobby;

    updaterId: number;

    constructor(private lobbyService: LobbyService, private router: Router, private authenticationService: AuthenticationService) {
    }

    async ngOnInit() {
        this.spotifyId = this.authenticationService.getUserSpotifyId();

        let counter = 0;
        this.updaterId = updater.setInterval(async () => {
            console.log(counter);
            counter++;
        }, 5000);

        this.updateLobby();
    }

    async ngOnDestroy() {
        updater.clearInterval(this.updaterId);
    }

    onQueueSong() {
        this.router.navigate(["search"])
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
