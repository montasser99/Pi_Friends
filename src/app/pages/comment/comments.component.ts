import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/Model/comments';
import { CommentsService } from 'src/app/Service/comments.service'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; // Importez Router depuis '@angular/router'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: any[];

  constructor(
    private commentsService: CommentsService,
    private toastr: ToastrService,
    private router: Router // Injectez Router dans votre constructeur
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentsService.findAll().subscribe(data => {
      this.comments = data;
    })
  }

  deleteComment(id: number) {
    this.commentsService.deleteComment(id).subscribe(
      (response) => {
        console.log('Comment deleted successfully:', response);
        this.loadComments();
        this.toastr.success('Comment deleted successfully', 'Success');
      },
      (error) => {
        console.error('Error deleting comment:', error);
        this.toastr.error('Failed to delete comment', 'Error');
      }
    );
  }

  updateComment(comment: Comments) {
    this.commentsService.update(comment).subscribe(
      () => {
        console.log('Comment updated successfully');
        this.loadComments();
      },
      (error) => {
        console.error('Error updating comment:', error);
      }
    );
  }

  addComment(comment: Comments) {
    this.commentsService.save(comment).subscribe(
      () => {
        console.log('Comment added successfully');
        this.loadComments();
      },
      (error) => {
        console.error('Error adding comment:', error);
        this.toastr.error('Failed to add comment', 'Error');
      }
    );
  }

  updateSelectedComment(comment: Comments) {
    // Stocker le commentaire sélectionné dans le service ou le stockage local pour y accéder dans le composant de mise à jour
    this.commentsService.setSelectedComment(comment);
    // Naviguer vers le composant de mise à jour avec l'ID du commentaire en tant que paramètre
    this.router.navigate(['/update-comment', comment.idComm]);
  }
}
