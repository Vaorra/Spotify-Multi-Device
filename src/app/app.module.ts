import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./sites/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { FriendComponent } from "./friends/friends.component";
import { PlayerComponent } from "./player/player.component";
import { LoginComponent } from "./sites/login.component";
import { SongSearchComponent } from "./sites/search/song.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        //Parts
        NavbarComponent,
        PlayerComponent,
        LobbyComponent,
        FriendComponent,
        //Sites
        HomeComponent,
        LoginComponent,
        SongSearchComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
