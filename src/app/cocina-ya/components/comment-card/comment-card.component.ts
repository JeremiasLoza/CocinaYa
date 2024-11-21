import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { AuthLoginService } from '../../services/auth.login.service';
import { CommentService } from '../../services/comment.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent implements OnInit {


  @Input() comment !: { id: string, recipeId: string, userId: string,text: string, date: string };
  @Output() commentDeleted = new EventEmitter<string>();
  
  isLogged = false;
  userId : string = '';

  constructor(private commentService : CommentService, private auth : AuthLoginService){}

  user !: User;

  ngOnInit(): void {
    this.userId = localStorage.getItem('token')??'';
    this.auth.searchById(this.comment.userId).subscribe(user =>{
      this.user = user[0];
    });
    
  }

  
  deleteComment(): void {
    this.commentDeleted.emit(this.comment.id);
    this.commentService.deleteComment(this.comment.id).subscribe(data=>
      console.log('ELIMINADO',data)
    );
  }
}
