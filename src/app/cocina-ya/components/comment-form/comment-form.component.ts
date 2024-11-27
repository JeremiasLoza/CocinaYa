import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadImageService } from '../../services/upload-image.service';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @Input() userId!: string; // ID del usuario actual
  @Output() commentAdded = new EventEmitter<{ text: string, userId: string, imageUrl: string | null }>();

  commentText: string = '';
  selectedFile : File | null = null;
  isValidImage: boolean = true;

  constructor(private uploadService : UploadImageService){}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];

      // Validar si el archivo es una imagen
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validTypes.includes(file.type)) {
        this.selectedFile = file;
        this.isValidImage = true;
      } else {
        this.isValidImage = false;
        alert('Please select a valid image file (JPEG, PNG, GIF).');
        this.selectedFile = null;
      }
    }
  }

  onSubmit(): void {
    if (this.commentText.trim() && this.isValidImage) {
      // Emitir el comentario con la imagen adjunta
      if(this.selectedFile){
        this.uploadService.upload(this.selectedFile).subscribe(response=>{
          this.commentAdded.emit({
            text: this.commentText,
            userId: this.userId,
            imageUrl: response.data.url,
          });
          this.commentText = '';
          this.selectedFile = null;
        })
      }else{
        this.commentAdded.emit({
          text: this.commentText,
          userId: this.userId,
          imageUrl: null,
        });
        this.commentText = '';
        this.selectedFile = null;
      }
      
    }
  }

}
