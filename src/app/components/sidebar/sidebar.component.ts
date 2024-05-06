import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  subRoutes?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/getallsubscription', title: 'subscribe',  icon:'ni-paper-diploma text-dark', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/users', title: 'users',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/tables', title: 'Posts',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/comments', title: 'Comments',  icon:'ni-chat-round text-green', class: '' },
    { path: '/reclamationListUser', title: 'Reclamation',  icon:'ni-chat-round text-green', class: '' }, //reclam user
    { path: '/reclamationAdmin', title: 'Reclamation Admin',  icon:'ni-chat-round text-green', class: '' }, //reclam user
    { path: '/feedbackUser', title: 'Feedback',  icon:'ni-chat-round text-green', class: '' }, //reclam user
    { path: '/feedbackAdmin', title: 'Feedback Admin',  icon:'ni-chat-round text-green', class: '' } //reclam user

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}