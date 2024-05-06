// reclam-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from 'src/app/Model/Reclamation';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';
import { ReclamationUserAdmin } from 'src/app/Service/ReclamationUserAdmin';

@Component({
  selector: 'app-reclam-user',
  templateUrl: './reclam-user.component.html',
  styleUrls: ['./reclam-user.component.scss']
})
export class ReclamUserComponent implements OnInit {
  reclamationForm: FormGroup;
  decodedToken:any;




  constructor(private formBuilder: FormBuilder, private reclamationService: ReclamationUserAdmin, private jwtDecodeService:JwtDecodeService ,private toastr: ToastrService , private router:Router ) { }

  ngOnInit(): void {

    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedToken = this.jwtDecodeService.decodeToken(); // Assign decoded token to decodedToken property
      console.log('Decoded token:', this.decodedToken);
    } else {
      console.log('Token not found in local storage');
    }

    this.reclamationForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.reclamationForm.valid) {
      const reclamation: Reclamation = {
        title: this.reclamationForm.value.title,
        content: this.reclamationForm.value.content,
        userName: this.decodedToken.fullName,
        email: this.decodedToken.sub
      };

      this.reclamationService.addreclamation(reclamation).subscribe(
        (response) => {
          this.toastr.success('reclamation added successfully', 'Success');
          console.log('Reclamation added:', response);
          // Reset the form after successful submission

          this.router.navigateByUrl('/reclamationListUser');


        },
        (error) => {
          console.error('Error adding reclamation:', error);

        }
      );
    } else {
      this.toastr.error('Failed to add reclamation', 'Error', { closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'increasing', tapToDismiss: false, toastClass: 'ngx-toastr error-toast' });
      // Mark all form fields as touched to display validation errors
      this.markFormGroupTouched(this.reclamationForm);
    }
  }

  // Helper method to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
