import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  links = [
    {path: '/dashboard', text: 'Overview'},
    {path: 'user', text: 'User'},
    {path: 'verification', text: 'Verification'}
  ]

  constructor() {
  }

  ngOnInit(): void {
  }
}