import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/Model/Feedback';
import { trigger, style, transition, animate } from '@angular/animations';
import { feedbackService } from 'src/app/Service/feedbackService';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';

@Component({
    selector: 'app-feedback-user',
    templateUrl: './feedback-user.component.html',
    styleUrls: ['./feedback-user.component.scss'],
    animations: [
        trigger('starAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0.5)', opacity: 0 }),
                animate('300ms', style({ transform: 'scale(1)', opacity: 1 })),
            ]),
        ]),
    ],
})
export class FeedbackUserComponent implements OnInit {
    feedback: Feedback = new Feedback();
    submitted = false;
    stars: number[] = [1, 2, 3, 4, 5]; // Array to generate stars
    starState = '';
    decodedToken:any;
    constructor(private feedbackService: feedbackService , private jwtDecodeService : JwtDecodeService) {}

    ngOnInit(): void {
        // Initialize the original rating
        this.feedback.rating = 0;
        const token = localStorage.getItem('jwt_token');
        if (token) {
          this.decodedToken = this.jwtDecodeService.decodeToken(); // Assign decoded token to decodedToken property
          console.log('Decoded token:', this.decodedToken);
        } else {
          console.log('Token not found in local storage');
        }
    }

    addFeedback(): void {
      this.feedback.email=this.decodedToken.sub;
        this.feedbackService.addFeedback(this.feedback).subscribe({
            next: response => {
                console.log(response);
                this.submitted = true;
            },
            error: error => {
                console.log(error);
            },
        });
    }

    newFeedback(): void {
        this.submitted = false;
        this.feedback = new Feedback();
    }

    setRating(rating: number): void {
        this.feedback.rating = rating;
    }
}
