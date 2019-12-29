import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  data = {
    verificado: true,
    level: 'Professor',
    nome: "Gustavo Novais Rodrigues",
    email: 'professor@email.com'
  }
  data2 = {
    verificado: false,
    level: 'Cliente',
    nome: "Gustavo Novais Rodrigues",
    email: 'Cliente@email.com'
  }
  // data3 = [this.data, this.data2]
  professores = this.shuffle([...new Array(5).fill(this.data), ...new Array(5).fill(this.data2)]);
  constructor() { }

  ngOnInit() {
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
