import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private endpoint = 'https://api.smd.intnet.ch/queue';

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  add(lobbyId: string, queuerId: string, songId: string) {
    return this.http.post<void>(this.endpoint + '/add', {
      lobbyId,
      queuerId,
      songId
    }, {
      headers: this.header
    });
  }
}
