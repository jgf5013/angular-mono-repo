import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'brightcomputing-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'support-tickets-interface';
  constructor() { }

  ngOnInit(): void {
  }

}
