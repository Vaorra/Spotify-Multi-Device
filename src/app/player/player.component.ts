import { Component, Input, OnInit } from "@angular/core";
import { Lobby } from "../lobby/lobby";

@Component({
    selector: "ns-player",
    moduleId: module.id,
    templateUrl: "player.component.html",
    styleUrls: ["player.component.css"]
})
export class PlayerComponent implements OnInit {
    @Input() lobby: Lobby;

    songName: string;
    artistNames: string[];

    playerCurrentSeconds = 70;
    playerMaxSeconds = 300;

    ngOnInit() {
        this.loadInfo();
    }

    onPrevious() {
        console.log("PREVIOUS");
    }

    onPlay() {
        console.log("PLAY");
    }

    onPause() {
        console.log("PAUSE");
    }

    onNext() {
        console.log("NEXT");
    }

    getMinutes() {
        return Math.floor(this.playerCurrentSeconds / 60);
    }

    getSeconds() {
        let seconds = this.playerCurrentSeconds % 60;
        if (seconds < 10) {
            return "0" + seconds;
        }
        return seconds;
    }

    loadInfo() {
        let song = this.lobby.queuedSongs.find(song => song.spotifyId === this.lobby.currentSongId);
        this.songName = song.name;
        this.artistNames = song.artistNames;
    }
}
