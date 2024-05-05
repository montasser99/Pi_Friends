import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Import NgForm
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = ''; // Define email property
  password: string = ''; // Define password property
  rememberMe: boolean = false; // Define rememberMe property

  
  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit() {}


  // Define the login method
  login(loginForm: NgForm) {
    const user = { email: this.email, password: this.password};
  
    // Call the login method from AuthService
    this.authService.login(user).subscribe(
      response => {
        // Handle successful login
        
        const token = response.token;
        this.authService.setToken(token);
        
        // Show success notification using Swal
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          timer: 2000, // Close alert after 2 seconds
          timerProgressBar: true,
          showConfirmButton: false
        });
  this.redirectBasedOnRole();
        // You can also navigate to another page upon successful login if needed
      },
      error => {
        // Handle login error
        console.error('Login failed:', error);
  
        // Show error notification using Swal
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: 'An error occurred while logging in. Please try again later.',
          showConfirmButton: true
        });
      }
    );
  
    // Reset the form after submission
    loginForm.reset();
  }
  redirectBasedOnRole() {
    const token = this.authService.getToken();
console.log('token is :',token);
    if (token) {
      const decodedToken = this.authService.decodeToken(token);
      const authorities: string[] = decodedToken.authorities;
      console.log('authorities is :',authorities);

      if (authorities.includes('Admin')) {
        this.router.navigate(['/dashbord']); // Redirect to admin dashboard
      } else if (authorities.includes('SubscribedClient')) {
        this.router.navigate(['/client-dashboard']); // Redirect to client dashboard
      } else {
        this.router.navigate(['/dashboard']); // Redirect to user dashboard
      }
    } else {
      this.router.navigate(['/login']); // Token not found, redirect to login page
    }



  }

}