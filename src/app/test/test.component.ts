import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  testVariable: number = 1;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.testVariable = this.testVariable += 1;
    }, 1000);
  }

}
