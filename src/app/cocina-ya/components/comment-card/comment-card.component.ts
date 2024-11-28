import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { AuthLoginService } from '../../services/auth.login.service';
import { CommentService } from '../../services/comment.service';
import { User } from '../../models/user';
import { Commentary } from '../../models/commentary';
import { UploadImageService } from '../../services/upload-image.service';
@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent implements OnInit {


  @Input() comment : Commentary = {
    id: '',
    recipeId: '',
    userId: '',
    text: '',
    date: ''
  };
  @Output() commentDeleted = new EventEmitter<string>();
  
  isLogged = false;
  userId : string = '';
  selectedImage : string | undefined= '';
  isModalOpen:boolean=false;

  constructor(private commentService : CommentService, private auth : AuthLoginService,private imageService : UploadImageService){}

  user !: User;

  ngOnInit(): void {
    this.userId = localStorage.getItem('token')??'';
    this.auth.searchById(this.comment.userId).subscribe(user =>{
      this.user = user[0];
    });
    
  }

  openModal(imageUrl: string | undefined): void {
    this.selectedImage = imageUrl;
    this.isModalOpen = true;
  }

  closeModal():void{
    this.isModalOpen=false;
  }

  deleteComment(): void {
    this.commentDeleted.emit(this.comment.id);
    this.commentService.deleteComment(this.comment.id).subscribe();
  }
}
