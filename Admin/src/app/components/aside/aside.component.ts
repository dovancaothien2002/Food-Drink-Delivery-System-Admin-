import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  account: any;
  ngOnInit(): void {
    var json = sessionStorage.getItem('auth');
    if (json) {
      this.account = JSON.parse(json);
    }
  }
  onLogOut() {
    this.account = null;
    sessionStorage.removeItem('auth');
    window.location.reload();
  }
}
