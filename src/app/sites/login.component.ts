import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone } from "@angular/core";
import { EventData } from "tns-core-modules/ui/page/page";
import { AuthenticationService } from "./authentication.service";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view/web-view";
import { Router } from "@angular/router";


@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})
export class LoginComponent implements AfterViewInit {

    @ViewChild("loginView", { read: ElementRef, static: false }) webViewRef: ElementRef;

    constructor(private ngZone: NgZone, private router: Router, private authenticationService: AuthenticationService) {
    }

    ngAfterViewInit(): void {
        let loginWebView: WebView = <WebView>this.webViewRef.nativeElement;

        loginWebView.on(WebView.loadFinishedEvent, (data: LoadEventData) => {
            if (!data.error) {

                const endpoint = "https://api.smd.neture.dev/callback";
                if (data.url.substr(0, endpoint.length) === endpoint) {
                    let state = /&state=[\w\d]{8}(-[\w\d]{4}){3}-[\w\d]{12}/.exec(data.url).toString().substr(7, 36);

                    this.authenticationService.register(state).then(() => {
                        this.ngZone.run(() => this.router.navigate(["home"]));
                    });
                }
            }
            else {
                console.log("Failed to load: " + data.url + " because of: " + data.error);
            }
        });
    }
}
