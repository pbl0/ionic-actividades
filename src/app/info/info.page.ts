import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private router: Router,
    private callNumber: CallNumber) { }

  ngOnInit() {
  }

  navigateToInfo() {
    this.router.navigate(["/info/"]);

  }

  navigateToMapa() {
    this.router.navigate(["/mapa/"]);

  }


  llamar() {
    this.callNumber.callNumber("111222333", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
