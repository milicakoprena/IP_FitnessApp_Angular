import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  animations: [
    trigger('expandContent', [
      state(
        'expanded',
        style({
          marginLeft: '252px',
        })
      ),
      state(
        'collapsed',
        style({
          marginLeft: '72px',
        })
      ),
      transition('expanded <=> collapsed', animate('0.5s ease-out')),
    ]),
  ],
})
export class UserDashboardComponent implements OnInit {
  isExpanded: boolean = true;

  dashboardItems = [
    { name: 'My account', route: 'account', icon: 'account_circle' },
    { name: 'My programs', route: 'my-programs', icon: 'list_alt' },
    {
      name: 'Purchased programs',
      route: 'programs',
      icon: 'paid',
    },
    {
      name: 'Create a new program',
      route: 'new-program',
      icon: 'assignment_add',
    },
    {
      name: 'Contact a consultant',
      route: 'consultant',
      icon: 'forum',
    },
    {
      name: 'Chat with users',
      route: 'chat',
      icon: 'person_search',
    },
    {
      name: 'Workouts',
      route: 'workouts',
      icon: 'fitness_center',
    },
    {
      name: 'Fitness tracker',
      route: 'fitness-tracker',
      icon: 'monitor_heart',
    },
    {
      name: 'Category subscriptions',
      route: 'categories',
      icon: 'subscriptions',
    },
  ];

  ngOnInit(): void {}
}
