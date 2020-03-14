import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/lobby/lobby.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Spotify-Multi-Device';
  user: User;

  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.authenticationService.onLocalUserChange.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  ngOnInit() {
  }

}
