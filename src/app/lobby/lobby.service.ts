import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Lobby } from "./lobby";

@Injectable({
    providedIn: "root"
})
export class LobbyService {

    endpoint: string = "https://api.smd.neture.dev/lobbies";

    header: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private http: HttpClient) {
    }

    async getLobbyFromUser(spotifId: string) {
        let lobbyIdObject = await this.http.get<String>(this.endpoint + "/search", { params: { "participantId": spotifId }, headers: this.header }).toPromise();
        if (lobbyIdObject === null) {
            return null;
        }
        return await this.http.get<Lobby>(this.endpoint + "/get/" + lobbyIdObject["lobbyId"]).toPromise();
    }

    async createLobby(spotifId: string) {
        return await this.http.post(this.endpoint + "/create", {}, { params: { "leaderId": spotifId }, headers: this.header }).toPromise();
    }

    async joinLobby(spotifId: string, lobbyId: string) {
        return await this.http.patch(this.endpoint + "/join", {}, { params: { "participantId": spotifId, "lobbyId": lobbyId }, headers: this.header }).toPromise();
    }

    async leaveLobby(spotifId: string, lobbyId: string) {
        return await this.http.patch(this.endpoint + "/leave", {}, { params: { "participantId": spotifId, "lobbyId": lobbyId }, headers: this.header }).toPromise();
    }

    async closeLobby(lobbyId: string) {
        return await this.http.delete(this.endpoint + "/close", { params: { "lobbyId": lobbyId }, headers: this.header }).toPromise();
    }
}
