import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Comments } from 'src/app/Model/comments';
import { CommentsService } from 'src/app/Service/comments.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'] 
})
export class AddCommentComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comments = new Comments();

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    // Initialize current date
    const currentDate = new Date().toISOString().substring(0, 10);

    this.commentForm = new FormGroup({
      content: new FormControl('', [Validators.required, this.forbiddenWordsValidator(["yosser", "chbinou"])]),
      description: new FormControl('', [Validators.required , this.forbiddenWordsValidator(["yosser", "chbinou"])]),
      datePub: new FormControl(currentDate, [Validators.required]), 

    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.comment.content = this.commentForm.get('content').value;
      this.comment.description = this.commentForm.get('description').value;
      this.comment.datePub = this.commentForm.get('datePub').value;
      
      this.commentsService.save(this.comment).subscribe(
        (response) => {
          console.log('New comment added:', response);
          this.commentForm.reset();
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.commentForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  forbiddenWordsValidator(words: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = words.some(word => new RegExp('\\b' + word + '\\b', 'i').test(control.value));
      return forbidden ? {'forbiddenWords': {value: control.value}} : null;
    };
  }
}
