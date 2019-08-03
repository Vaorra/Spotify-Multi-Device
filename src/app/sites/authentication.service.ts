import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "tns-core-modules/ui/page/page";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
    endpoint: string = "https://api.smd.neture.dev/";
    spotifyId: string = undefined;

    header: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private http: HttpClient) {

    }

    isLoggedIn() {
        return this.spotifyId !== undefined;
    }

    getUserSpotifyId(): string {
        return this.spotifyId;
    }

    async register(state: string) {
        await this.http.get(this.endpoint + "identification/" + state, { headers: this.header }).toPromise().then((result) => {
            this.spotifyId = result["spotifyId"];
        }, (error) => {
            console.log(error);
        });
    }

    async logout() {
        await this.http.get(this.endpoint + "logout/" + this.spotifyId, { headers: this.header }).toPromise();
        this.spotifyId = undefined;
    }
}
