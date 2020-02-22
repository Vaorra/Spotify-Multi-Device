import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Spotify-Multi-Device';
  spotifyId: string;

  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.authenticationService.onSpotifyIdChange.subscribe((newSpotifyId) => {
      this.spotifyId = newSpotifyId;
    });
  }

  ngOnInit() {
  }

}
