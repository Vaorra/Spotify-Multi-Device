import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from 'src/app/api/song';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private endpoint = 'https://api.smd.intnet.ch/search';

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  searchSong(query: string, market: string, limit: number) {
    return this.http.get<Song[]>(this.endpoint + '/song?query=' + encodeURIComponent(query)
    + '&market=' + encodeURIComponent(market)
    + '&limit=' + encodeURIComponent(limit), {
      headers: this.header
    });
  }
}
