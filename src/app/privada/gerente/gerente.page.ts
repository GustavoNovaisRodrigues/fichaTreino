import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.page.html',
  styleUrls: ['./gerente.page.scss'],
})
export class GerentePage implements OnInit {


  pages = [
    {
      title: 'dashboard',
      url: '/gerente/dashboard'
    },
    {
      title: 'usuario',
      url: '/gerente/usuarios'
    },
    {
      title: 'professores',
      url: '/gerente/professores'
    },
  ]
  selectedPath = ''
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url
    })
  }

  ngOnInit() {
  }

}
