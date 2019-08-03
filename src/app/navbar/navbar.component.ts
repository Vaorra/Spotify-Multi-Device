import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../sites/authentication.service";

@Component({
    selector: "ns-navbar",
    moduleId: module.id,
    templateUrl: "navbar.component.html",
    styleUrls: ["navbar.component.css"]
})
export class NavbarComponent implements OnInit {

    @Input() back: string;
    loggedIn: boolean;

    constructor(private router: Router, private authenticationService: AuthenticationService) {

    }

    async ngOnInit() {
        this.loggedIn = this.authenticationService.isLoggedIn();
        console.log("Logged in Nav: " + this.loggedIn);
    }

    onLogin() {
        this.router.navigate(["login"]);
    }

    onLogout() {
        this.authenticationService.logout().then(() => {
            this.router.navigate(["home/reload"]);
        });
    }

    goBack() {
        this.router.navigate([this.back]);
    }
}
