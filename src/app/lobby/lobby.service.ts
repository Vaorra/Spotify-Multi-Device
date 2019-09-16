import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Lobby } from "./lobby";

@Injectable({
    providedIn: "root"
})
export class LobbyService {

    endpoint: string = "https://api.smd.neture.dev";

    header: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private http: HttpClient) {
    }

    async getLobbyFromUser(spotifId: string) {
        return await this.http.get<Lobby>(this.endpoint + "/lobbies", { headers: this.header, params: { "userId": spotifId }}).toPromise();
    }

    async createLobby(spotifId: string) {
        return await this.http.post(this.endpoint + "/lobbies/create", { "leaderSpotifyId": spotifId }, { headers: this.header }).toPromise();
    }

    async joinLobby(spotifId: string, lobbyId: string) {

    }
}
