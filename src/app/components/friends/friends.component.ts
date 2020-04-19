import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends = [
    'Beat',
    'Michi',
    'Michu',
    'Samuel',
    'Quentin',
    'Kostya',
    'Pascal',
    'Nicolas',
    'Matteo',
    'Felix'
  ];

  constructor() { }

  ngOnInit() {
  }

}
