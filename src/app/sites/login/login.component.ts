import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] && params['state']) {
        this.authenticationService.authenticate(params['state'], params['code']).subscribe(() => {
          router.navigate(['home']);
        });
      }
    });
  }

  ngOnInit() {
  }

}
