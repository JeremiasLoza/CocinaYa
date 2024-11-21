import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {

  @Input() userId!: string; // ID del usuario actual
  @Output() commentAdded = new EventEmitter<{ text: string, userId: string }>();
  commentText: string = '';

  onSubmit(): void {
    if (this.commentText.trim()) {
      // Emitir el nuevo comentario
      this.commentAdded.emit({
        text: this.commentText,
        userId: this.userId
      });
      this.commentText = ''; // Limpiar el input
    }
  }
}