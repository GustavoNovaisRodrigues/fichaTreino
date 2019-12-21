import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit() {

  }
  get usuario() {
    return this.authService.usuario$
  }

  deslogar() {
    this.authService.deslogar()
  }
}
