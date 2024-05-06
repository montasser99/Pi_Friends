import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/Model/Reclamation';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';
import { ReclamationUserAdmin } from 'src/app/Service/ReclamationUserAdmin';


@Component({
  selector: 'app-reclam-userlist',
  templateUrl: './reclam-userlist.component.html',
  styleUrls: ['./reclam-userlist.component.scss']
})
export class ReclamUserlistComponent implements OnInit {
  reclamations: any[];
  decodedToken : any;
  constructor(private reclamationService: ReclamationUserAdmin , private jwtDecodeService: JwtDecodeService , private router:Router) { }

  ngOnInit(): void {

    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedToken = this.jwtDecodeService.decodeToken(); // Assign decoded token to decodedToken property
      console.log('Decoded token:', this.decodedToken);
    } else {
      console.log('Token not found in local storage');
    }

    // Fetch reclamation list by email
    this.reclamationService.findByEmail(this.decodedToken.sub).subscribe(
      (data:any) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Error fetching reclamation list:', error);
      }
    );
  }


   navigateToAddReclamation() {
    this.router.navigateByUrl('/reclamationUser');
  }
}
