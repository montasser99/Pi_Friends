import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public decodedToken: any; // Declare decodedToken property

  constructor(location: Location, private element: ElementRef, private router: Router, private jwtDecodeService: JwtDecodeService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    //this using for get data from localstorage
    //si tu veux tester sur admin or no use decodedToken.authorities[0]
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedToken = this.jwtDecodeService.decodeToken(); // Assign decoded token to decodedToken property
      console.log('Decoded token:', this.decodedToken);
    } else {
      console.log('Token not found in local storage');
    }
  
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#') {
        titlee = titlee.slice(1);
    }

    for(var item = 0; item < this.listTitles.length; item++) {
        if(this.listTitles[item].path === titlee) {
            return this.listTitles[item].title;
        }
    }
    return this.listTitles[item].title;
  }

  logout() {
    // Clear token from application storage
    localStorage.removeItem('jwt_token');
    // Redirect to the login page or any other desired route
    this.router.navigate(['/login']);
  }
}
