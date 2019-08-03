import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Lobby } from "./lobby";
import { LobbyService } from "./lobby.service";
import { EventData, isAndroid, borderTopRightRadiusProperty } from "tns-core-modules/ui/page/page";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { WebViewUtils } from "nativescript-webview-utils";
import { AuthenticationService } from "../sites/authentication.service";


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

        if (this.spotifyId !== undefined) {
            this.lobby = await this.lobbyService.getLobbyFromUser(this.spotifyId);
        }
        console.log("Init with Spotify ID: " + this.spotifyId);
    }

    onCreateLobby() {
        console.log("CREATE");
    }

    onJoinLobby() {
        console.log("JOIN");
    }

    onLeaveLobby() {
        console.log("LEAVE");
    }
}
