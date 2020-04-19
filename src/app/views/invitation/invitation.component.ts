import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from 'src/app/components/lobby/lobby.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private authenticationService: AuthenticationService, private lobbyService: LobbyService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.lobbyService.joinLobby(this.authenticationService.getLocalUserId(), params.get('id')).subscribe(() => {
        this.router.navigate(['/home']);
      });
    });
  }

}
