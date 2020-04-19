import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Invitation } from 'src/app/api/invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private endpoint = 'https://api.smd.intnet.ch/invitation';

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  createInvitation(lobbyId: string) {
    return this.http.post<Invitation>(this.endpoint + '/generate', { lobbyId }, {
      headers: this.header
    });
  }

  verifyInvitation(invitationId: string) {
    return this.http.get<{ verified: boolean}>(this.endpoint + '/verify/' + invitationId, {
      headers: this.header
    }).pipe(
      map((result) => {
        return result.verified;
      })
    );
  }
}
