import { Component, OnInit } from '@angular/core';
import { get } from 'http';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';
import { ReclamationUserAdmin } from 'src/app/Service/ReclamationUserAdmin';

@Component({
  selector: 'app-reclam-admin',
  templateUrl: './reclam-admin.component.html',
  styleUrls: ['./reclam-admin.component.scss']
})
export class ReclamAdminComponent implements OnInit {
  reclamations: any[];


  //pagination code here
  paginatedSubscriptions: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number;
  pages: number[] = [];

  constructor(private reclamationService: ReclamationUserAdmin, private jwtDecodeService: JwtDecodeService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getall();

  }


  getall() {
    this.reclamationService.findAll().subscribe(
      (data: any) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Error fetching reclamation list:', error);
      }
    );
  }



  acceptReclamation(email: string) {
    this.reclamationService.Treat(email).subscribe(() => {
      this.getall();
      this.toastr.success('reclamation Treated successfully', 'Success');
    })
  }


  rejectReclamation(email: string) {
    this.reclamationService.Reject(email).subscribe(() => {
      this.getall();
      this.toastr.success('reclamation Rejected successfully', 'Success');
    })
  }
}