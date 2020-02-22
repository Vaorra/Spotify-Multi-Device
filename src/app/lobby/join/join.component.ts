import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/sites/authentication.service';
import { LobbyService } from '../lobby.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JoinComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {

  }

  ngOnInit() {
  }
}
