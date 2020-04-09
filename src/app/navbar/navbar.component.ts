import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../sites/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() back: string;
  @Input() isLoggedIn: boolean;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.authenticationService.login().subscribe(() => {
      console.log('Finished');
    });
  }

  onLogout() {
    this.authenticationService.logout();
  }

  goBack() {
    this.router.navigate([this.back]);
  }

}
