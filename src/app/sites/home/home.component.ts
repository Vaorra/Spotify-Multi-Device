import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Spotify-Multi-Device';
  spotifyId: string = undefined;

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.route.queryParams.subscribe((params) => {
      if (params['user']) {
        this.authenticationService.login(params['user']);
      }
    });

    this.authenticationService.spotifyId.subscribe((spotifyId) => {
      this.spotifyId = spotifyId;
    });
  }

  ngOnInit() {
  }

}
