import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './sites/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayerComponent } from './player/player.component';
import { LobbyComponent } from './lobby/lobby.component';
import { SearchSongComponent } from './sites/search-song/search-song.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FriendsComponent } from './friends/friends.component';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { JoinComponent } from './lobby/join/join.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationGuard } from './sites/authentication.guard';
import { InvitationComponent } from './sites/invitation/invitation.component';
import { NotfoundComponent } from './sites/notfound/notfound.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search-song', component: SearchSongComponent },
  { path: 'invitation/:id', component: InvitationComponent, canActivate: [AuthenticationGuard] },
  { path: 'test', component: TestComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    // Parts
    NavbarComponent,
    PlayerComponent,
    LobbyComponent,
    FriendsComponent,
    // Sites
    HomeComponent,
    SearchSongComponent,
    FriendsComponent,
    TestComponent,
    JoinComponent,
    InvitationComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    NgbModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatGridListModule,
    MatDividerModule,
    MatSliderModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule
  ],
  entryComponents: [
    JoinComponent
  ],
  providers: [
    AuthenticationGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
